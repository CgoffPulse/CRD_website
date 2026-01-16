"use server";

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { del, put } from "@vercel/blob";
import {
  revalidatePath,
  revalidateTag,
  updateTag,
  unstable_cache,
  unstable_noStore,
} from "next/cache";
import { cookies } from "next/headers";
import sharp from "sharp";
import { commercialPropertyDetailsSchema } from "../schemas/propertyDetails";
import type {
  CommercialListing,
  CommercialPropertyDetails,
} from "../types/listings";

const COMMERCIAL_LISTINGS_FILE_PATH =
  process.env.CMS_COMMERCIAL_LISTINGS_FILE_PATH ||
  join(process.cwd(), "app/data/commercialListings.json");
const COMMERCIAL_LISTINGS_BLOB_PATH =
  process.env.CMS_COMMERCIAL_LISTINGS_BLOB_PATH ||
  "data/commercialListings.json";

// Authentication helper
export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("cms-auth");
  const expectedPassword = process.env.CMS_PASSWORD?.trim();

  if (!expectedPassword || expectedPassword.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.warn("CMS_PASSWORD is not set in environment variables");
    }
    return false;
  }

  if (!authCookie) {
    return false;
  }

  // Simple comparison - in production, use proper hashing
  return authCookie.value.trim() === expectedPassword;
}

export async function login(
  password: string
): Promise<{ success: boolean; error?: string }> {
  // Prevent caching to ensure fresh env var access
  unstable_noStore();

  const expectedPassword = process.env.CMS_PASSWORD?.trim();

  if (!expectedPassword || expectedPassword.length === 0) {
    // Log in production to help debug (without exposing the actual value)
    console.error(
      "[CMS Auth] CMS_PASSWORD is not set or is empty. Env var exists:",
      !!process.env.CMS_PASSWORD
    );
    return {
      success: false,
      error:
        "CMS password not configured. Please set CMS_PASSWORD in your environment variables and redeploy.",
    };
  }

  if (password.trim() !== expectedPassword) {
    return {
      success: false,
      error: "Invalid password",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("cms-auth", password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    success: true,
  };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("cms-auth");
}

// Read listings from JSON file or Blob Storage
export const getCommercialListings = unstable_cache(
  async (includeArchived = false): Promise<CommercialListing[]> => {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.BLOB_READ_WRITE_TOKEN
    ) {
      const blobPromise = (async () => {
        try {
          const { list } = await import("@vercel/blob");
          const blobs = await list({
            prefix: COMMERCIAL_LISTINGS_BLOB_PATH,
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });

          if (blobs.blobs.length > 0) {
            const blob = blobs.blobs[0];
            const response = await fetch(blob.url);
            const fileContents = await response.text();
            return JSON.parse(fileContents) as CommercialListing[];
          }
        } catch (error) {
          console.error("Error reading commercial listings from blob:", error);
        }
        return [];
      })();

      const filePromise = (async () => {
        try {
          const fileContents = await readFile(
            COMMERCIAL_LISTINGS_FILE_PATH,
            "utf-8"
          );
          return JSON.parse(fileContents) as CommercialListing[];
        } catch (fileError) {
          if (
            !(
              fileError instanceof Error &&
              "code" in fileError &&
              fileError.code === "ENOENT"
            )
          ) {
            console.error(
              "Error reading commercial listings from file:",
              fileError
            );
          }
        }
        return [];
      })();

      const [blobListings, fileListings] = await Promise.all([
        blobPromise,
        filePromise,
      ]);

      const allListingsMap = new Map<string, CommercialListing>();

      for (const listing of fileListings) {
        allListingsMap.set(listing.id, listing);
      }

      for (const listing of blobListings) {
        allListingsMap.set(listing.id, listing);
      }

      const mergedListings = Array.from(allListingsMap.values());
      const visibleListings = includeArchived
        ? mergedListings
        : mergedListings.filter((listing) => !listing.archived);

      if (
        mergedListings.length > 0 &&
        (blobListings.length === 0 ||
          mergedListings.length > blobListings.length)
      ) {
        try {
          await saveCommercialListings(mergedListings);
        } catch (migrationError) {
          console.error(
            "Error migrating commercial listings to blob:",
            migrationError
          );
        }
      }

      return visibleListings;
    }

    try {
      const fileContents = await readFile(
        COMMERCIAL_LISTINGS_FILE_PATH,
        "utf-8"
      );
      const listings = JSON.parse(fileContents) as CommercialListing[];
      return includeArchived
        ? listings
        : listings.filter((listing) => !listing.archived);
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return [];
      }
      console.error("Error reading commercial listings:", error);
      return [];
    }
  },
  ["commercial-listings"],
  { tags: ["commercial-listings"], revalidate: 60 }
);

async function saveCommercialListings(
  listings: CommercialListing[]
): Promise<void> {
  const listingsJson = JSON.stringify(listings, null, 2);

  if (
    process.env.NODE_ENV === "production" &&
    process.env.BLOB_READ_WRITE_TOKEN
  ) {
    try {
      const buffer = Buffer.from(listingsJson, "utf-8");
      await put(COMMERCIAL_LISTINGS_BLOB_PATH, buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: "application/json",
        allowOverwrite: true,
      });
      return;
    } catch (error) {
      console.error("Error saving commercial listings to blob:", error);
      throw new Error(
        `Failed to save commercial listings to blob storage: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  try {
    await writeFile(COMMERCIAL_LISTINGS_FILE_PATH, listingsJson, "utf-8");
  } catch (error) {
    console.error("Error saving commercial listings:", error);
    throw new Error("Failed to save commercial listings");
  }
}

// Create new commercial listing
export async function createCommercialListing(
  _prevState: { success?: boolean; error?: string; listingId?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string; listingId?: string }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      error:
        "Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN.",
    };
  }

  try {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const description = (formData.get("description") as string) || "";
    const mlsNumber = (formData.get("mlsNumber") as string) || "";
    const isLeaseStr = formData.get("isLease") as string;
    const isLease = isLeaseStr === "true" || isLeaseStr === "on";
    const price = (formData.get("price") as string) || "";
    const leaseRate = (formData.get("leaseRate") as string) || "";
    const bulletsStr = (formData.get("bullets") as string) || "[]";
    const propertyDetailsStr =
      (formData.get("propertyDetails") as string) || "{}";

    const coverImage = formData.get("coverImage") as File | null;
    const galleryImages = formData
      .getAll("galleryImages")
      .filter((img) => img instanceof File && img.size > 0) as File[];

    if (!(title && location)) {
      return {
        success: false,
        error: "Title and location are required",
      };
    }

    if (!(isLease || price)) {
      return {
        success: false,
        error: "Price is required for buy listings",
      };
    }

    if (isLease && !leaseRate) {
      return {
        success: false,
        error: "Lease rate is required for lease listings",
      };
    }

    const listings = await getCommercialListings(true);
    const id = `commercial-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    let imageSrc: string | null = null;
    const galleryImageUrls: string[] = [];

    // Upload cover image
    if (coverImage && coverImage.size > 0) {
      const maxSize = 10 * 1024 * 1024;
      if (coverImage.size > maxSize) {
        return {
          success: false,
          error: "Cover image size must be less than 10MB",
        };
      }

      const imageBuffer = Buffer.from(await coverImage.arrayBuffer());
      const processedImage = await sharp(imageBuffer)
        .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const filename = `commercial-${id}-cover.webp`;
      const blob = await put(filename, processedImage, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: "image/webp",
      });
      imageSrc = blob.url;
    }

    // Upload gallery images
    for (const image of galleryImages) {
      const maxSize = 10 * 1024 * 1024;
      if (image.size > maxSize) {
        continue;
      }

      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const processedImage = await sharp(imageBuffer)
        .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const filename = `commercial-${id}-gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
      const blob = await put(filename, processedImage, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: "image/webp",
      });
      galleryImageUrls.push(blob.url);
    }

    let bullets: string[] = [];
    try {
      bullets = JSON.parse(bulletsStr);
    } catch {
      bullets = bulletsStr.split("\n").filter((b) => b.trim());
    }

    let propertyDetails: any = {};
    try {
      propertyDetails = JSON.parse(propertyDetailsStr);
    } catch {
      // Keep empty object if parsing fails
    }

    const newListing: CommercialListing = {
      id,
      title,
      location,
      imageSrc,
      description: description || undefined,
      bullets,
      href: `/commercial/${isLease ? "lease" : "buy"}/${id}`,
      mlsNumber: mlsNumber || undefined,
      galleryImages: galleryImageUrls.length > 0 ? galleryImageUrls : undefined,
      propertyDetails:
        Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
      isLease,
      price: !isLease && price ? price : undefined,
      leaseRate: isLease && leaseRate ? leaseRate : undefined,
      archived: false,
    };

    listings.push(newListing);
    await saveCommercialListings(listings);
    revalidatePath("/commercial");
    revalidateTag("commercial-listings", "max");

    return {
      success: true,
      listingId: id,
    };
  } catch (error) {
    console.error("Error creating commercial listing:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create listing",
    };
  }
}

// Update commercial listing
export async function updateCommercialListing(
  _prevState: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  try {
    const id = formData.get("id") as string;
    if (!id) {
      return {
        success: false,
        error: "Listing ID is required",
      };
    }

    const listings = await getCommercialListings(true);
    const listingIndex = listings.findIndex((l) => l.id === id);

    if (listingIndex === -1) {
      return {
        success: false,
        error: "Listing not found",
      };
    }

    const existingListing = listings[listingIndex];
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const description = (formData.get("description") as string) || "";
    const mlsNumber = (formData.get("mlsNumber") as string) || "";
    const isLeaseStr = formData.get("isLease") as string;
    const isLease = isLeaseStr === "true" || isLeaseStr === "on";
    const price = (formData.get("price") as string) || "";
    const leaseRate = (formData.get("leaseRate") as string) || "";
    const bulletsStr = (formData.get("bullets") as string) || "[]";
    const propertyDetailsStr =
      (formData.get("propertyDetails") as string) || "{}";

    const coverImage = formData.get("coverImage") as File | null;
    const galleryImages = formData
      .getAll("galleryImages")
      .filter((img) => img instanceof File && img.size > 0) as File[];

    let imageSrc = existingListing.imageSrc;

    if (
      coverImage &&
      coverImage.size > 0 &&
      process.env.BLOB_READ_WRITE_TOKEN
    ) {
      const maxSize = 10 * 1024 * 1024;
      if (coverImage.size > maxSize) {
        return {
          success: false,
          error: "Cover image size must be less than 10MB",
        };
      }

      const imageBuffer = Buffer.from(await coverImage.arrayBuffer());
      const processedImage = await sharp(imageBuffer)
        .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const filename = `commercial-${id}-cover.webp`;
      const blob = await put(filename, processedImage, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: "image/webp",
      });
      imageSrc = blob.url;
    }

    const galleryImageUrls = [...(existingListing.galleryImages || [])];

    if (galleryImages.length > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
      for (const image of galleryImages) {
        const maxSize = 10 * 1024 * 1024;
        if (image.size > maxSize) {
          continue;
        }

        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const processedImage = await sharp(imageBuffer)
          .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer();

        const filename = `commercial-${id}-gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
        const blob = await put(filename, processedImage, {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
          contentType: "image/webp",
        });
        galleryImageUrls.push(blob.url);
      }
    }

    let bullets: string[] = [];
    try {
      bullets = JSON.parse(bulletsStr);
    } catch {
      bullets = bulletsStr.split("\n").filter((b) => b.trim());
    }

    let propertyDetails: any = {};
    try {
      const parsed = JSON.parse(propertyDetailsStr);
      // Validate with Zod v4 schema
      const validationResult =
        commercialPropertyDetailsSchema.safeParse(parsed);
      if (validationResult.success) {
        propertyDetails = validationResult.data;
      } else {
        console.warn(
          "Property details validation failed:",
          validationResult.error.issues
        );
        // Use parsed data anyway but log the validation errors
        propertyDetails = parsed;
      }
    } catch (parseError) {
      // Fall back to existing property details if parsing fails
      console.warn("Failed to parse property details JSON:", parseError);
      propertyDetails = existingListing.propertyDetails || {};
    }

    listings[listingIndex] = {
      ...existingListing,
      title,
      location,
      imageSrc,
      description: description || undefined,
      bullets,
      mlsNumber: mlsNumber || undefined,
      galleryImages: galleryImageUrls.length > 0 ? galleryImageUrls : undefined,
      propertyDetails:
        Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
      isLease,
      price: !isLease && price ? price : undefined,
      leaseRate: isLease && leaseRate ? leaseRate : undefined,
      href: `/commercial/${isLease ? "lease" : "buy"}/${id}`,
    };

    await saveCommercialListings(listings);
    revalidatePath("/commercial");
    revalidateTag("commercial-listings", "max");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating commercial listing:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update listing",
    };
  }
}

// Delete commercial listing
export async function deleteCommercialListing(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  try {
    const listings = await getCommercialListings(true);
    const listingIndex = listings.findIndex((l) => l.id === id);

    if (listingIndex === -1) {
      return {
        success: false,
        error: "Listing not found",
      };
    }

    const listing = listings[listingIndex];
    const isTestListing = id.startsWith("commercial-test");

    if (isTestListing) {
      listings.splice(listingIndex, 1);
    } else {
      listings[listingIndex] = {
        ...listing,
        archived: true,
      };
    }
    await saveCommercialListings(listings);
    revalidatePath("/commercial");
    revalidatePath("/admin/commercial");
    updateTag("commercial-listings");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting commercial listing:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete listing",
    };
  }
}

// Import commercial listings from JSON (dev tool)
export async function importCommercialListingsFromJson(
  _prevState: { success?: boolean; error?: string; importedCount?: number },
  formData: FormData
): Promise<{ success?: boolean; error?: string; importedCount?: number }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
      importedCount: 0,
    };
  }

  try {
    const jsonData = formData.get("jsonData") as string;
    if (!jsonData?.trim()) {
      return {
        success: false,
        error: "JSON data is required",
        importedCount: 0,
      };
    }

    let importedListings: CommercialListing[];
    try {
      importedListings = JSON.parse(jsonData) as CommercialListing[];
      if (!Array.isArray(importedListings)) {
        return {
          success: false,
          error: "JSON must be an array of listings",
          importedCount: 0,
        };
      }
    } catch (parseError) {
      return {
        success: false,
        error: `Invalid JSON: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
        importedCount: 0,
      };
    }

    // Validate required fields for each listing
    for (const listing of importedListings) {
      if (!(listing.id && listing.title && listing.location)) {
        return {
          success: false,
          error: `Listing missing required fields (id, title, location). Found: ${JSON.stringify(
            {
              id: listing.id,
              title: listing.title,
              location: listing.location,
            }
          )}`,
          importedCount: 0,
        };
      }
      // Commercial listings need either price or leaseRate
      if (!(listing.price || listing.leaseRate)) {
        return {
          success: false,
          error: `Listing missing price or leaseRate. Found: ${JSON.stringify({
            id: listing.id,
            price: listing.price,
            leaseRate: listing.leaseRate,
          })}`,
          importedCount: 0,
        };
      }
    }

    // Get existing listings
    const existingListings = await getCommercialListings(true);
    const existingIds = new Set(existingListings.map((l) => l.id));

    // Filter out listings that already exist (by ID)
    const newListings = importedListings.filter(
      (listing) => !existingIds.has(listing.id)
    );

    if (newListings.length === 0) {
      return {
        success: false,
        error: "All listings already exist. No new listings to import.",
        importedCount: 0,
      };
    }

    // Add new listings
    const updatedListings = [...existingListings, ...newListings];
    await saveCommercialListings(updatedListings);
    revalidatePath("/commercial");
    revalidateTag("commercial-listings", "max");

    return {
      success: true,
      importedCount: newListings.length,
    };
  } catch (error) {
    console.error("Error importing commercial listings from JSON:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to import listings",
      importedCount: 0,
    };
  }
}

// Create test commercial listing with random data (dev tool)
export async function createTestCommercialListing(): Promise<{
  success: boolean;
  error?: string;
  listingId?: string;
}> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      error:
        "Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN.",
    };
  }

  try {
    const testTitles = [
      "Prime Retail Space",
      "Office Building",
      "Warehouse Facility",
      "Mixed-Use Property",
      "Commercial Lot",
      "Restaurant Space",
      "Medical Office",
      "Industrial Building",
    ];

    const testLocations = [
      "201 E Walnut St #11, Rogers, AR 72756",
      "500 S Main St, Bentonville, AR 72712",
      "1000 N College Ave, Fayetteville, AR 72701",
      "750 W Sunset Ave, Springdale, AR 72764",
      "300 Commerce Blvd, Bella Vista, AR 72714",
    ];

    const testBuyPrices = [
      "$500,000",
      "$750,000",
      "$1,200,000",
      "$950,000",
      "$1,500,000",
      "$650,000",
    ];

    const testLeaseRates = [
      "$2,500/month",
      "$3,500/month",
      "$5,000/month",
      "$4,200/month",
      "$6,000/month",
      "$2,800/month",
    ];

    const testDescriptions = [
      "Prime commercial location with excellent visibility and access.",
      "Well-maintained property perfect for various business uses.",
      "Spacious facility with modern amenities and parking.",
      "Ideal location in a high-traffic commercial area.",
      "Versatile space suitable for retail, office, or mixed-use.",
    ];

    const testBullets = [
      "3,500 sq ft",
      "Commercial Property",
      "Built in 2000",
      "0.5 Acres lot",
      "High-traffic location",
      "Parking available",
    ];

    const randomTitle =
      testTitles[Math.floor(Math.random() * testTitles.length)];
    const randomLocation =
      testLocations[Math.floor(Math.random() * testLocations.length)];
    const randomDescription =
      testDescriptions[Math.floor(Math.random() * testDescriptions.length)];
    const isLease = Math.random() > 0.5;
    const randomPrice = isLease
      ? undefined
      : testBuyPrices[Math.floor(Math.random() * testBuyPrices.length)];
    const randomLeaseRate = isLease
      ? testLeaseRates[Math.floor(Math.random() * testLeaseRates.length)]
      : undefined;
    const randomMls = `TEST-${Math.floor(Math.random() * 10000)}`;

    const listings = await getCommercialListings(true);
    const id = `commercial-test-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Add MLS to bullets
    const bulletsWithMls = [...testBullets, `MLS#: ${randomMls}`];

    // Comprehensive commercial property details
    const propertyDetails: CommercialPropertyDetails = {
      lot: {
        size: "0.5 Acres",
        features: "Paved, Level, Utilities Available",
      },
      property: {
        fencing: "Chain Link",
        exteriorFeatures: "Parking Lot, Signage Allowed",
      },
      details: {
        parcelNumber: `TEST-${Math.floor(Math.random() * 100000)}`,
        specialConditions: "None",
        subdivision: "Commercial District",
      },
      construction: {
        homeType: "Commercial",
        propertySubtype: isLease ? "Retail Space" : "Office Building",
      },
      location: {
        region: "Northwest Arkansas",
      },
      financial: {
        annualTaxAmount: "$8,500",
        dateOnMarket: new Date().toISOString().split("T")[0],
      },
    };

    const newListing: CommercialListing = {
      id,
      title: `${randomTitle} (Test)`,
      location: randomLocation,
      imageSrc: null,
      description: randomDescription,
      bullets: bulletsWithMls,
      href: `/commercial/${isLease ? "lease" : "buy"}/${id}`,
      mlsNumber: randomMls,
      isLease,
      price: randomPrice,
      leaseRate: randomLeaseRate,
      propertyDetails:
        Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
      archived: false,
    };

    listings.push(newListing);
    await saveCommercialListings(listings);
    revalidatePath("/commercial");
    revalidatePath("/admin/commercial");
    updateTag("commercial-listings");

    return {
      success: true,
      listingId: id,
    };
  } catch (error) {
    console.error("Error creating test commercial listing:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create test listing",
    };
  }
}
