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
import { residentialPropertyDetailsSchema } from "../schemas/propertyDetails";
import type {
  ResidentialListing,
  ResidentialPropertyDetails,
} from "../types/listings";

const RESIDENTIAL_LISTINGS_FILE_PATH =
  process.env.CMS_RESIDENTIAL_LISTINGS_FILE_PATH ||
  join(process.cwd(), "app/data/residentialListings.json");
const RESIDENTIAL_LISTINGS_BLOB_PATH =
  process.env.CMS_RESIDENTIAL_LISTINGS_BLOB_PATH ||
  "data/residentialListings.json";

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
export const getResidentialListings = unstable_cache(
  async (includeArchived = false): Promise<ResidentialListing[]> => {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.BLOB_READ_WRITE_TOKEN
    ) {
      const blobPromise = (async () => {
        try {
          const { list } = await import("@vercel/blob");
          const blobs = await list({
            prefix: RESIDENTIAL_LISTINGS_BLOB_PATH,
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });

          if (blobs.blobs.length > 0) {
            const blob = blobs.blobs[0];
            const response = await fetch(blob.url);
            const fileContents = await response.text();
            return JSON.parse(fileContents) as ResidentialListing[];
          }
        } catch (error) {
          console.error("Error reading residential listings from blob:", error);
        }
        return [];
      })();

      const filePromise = (async () => {
        try {
          const fileContents = await readFile(
            RESIDENTIAL_LISTINGS_FILE_PATH,
            "utf-8"
          );
          return JSON.parse(fileContents) as ResidentialListing[];
        } catch (fileError) {
          if (
            !(
              fileError instanceof Error &&
              "code" in fileError &&
              fileError.code === "ENOENT"
            )
          ) {
            console.error(
              "Error reading residential listings from file:",
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

      const allListingsMap = new Map<string, ResidentialListing>();

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
          await saveResidentialListings(mergedListings);
        } catch (migrationError) {
          console.error(
            "Error migrating residential listings to blob:",
            migrationError
          );
        }
      }

      return visibleListings;
    }

    try {
      const fileContents = await readFile(
        RESIDENTIAL_LISTINGS_FILE_PATH,
        "utf-8"
      );
      const listings = JSON.parse(fileContents) as ResidentialListing[];
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
      console.error("Error reading residential listings:", error);
      return [];
    }
  },
  ["residential-listings"],
  { tags: ["residential-listings"], revalidate: 60 }
);

async function saveResidentialListings(
  listings: ResidentialListing[]
): Promise<void> {
  const listingsJson = JSON.stringify(listings, null, 2);

  if (
    process.env.NODE_ENV === "production" &&
    process.env.BLOB_READ_WRITE_TOKEN
  ) {
    try {
      const buffer = Buffer.from(listingsJson, "utf-8");
      await put(RESIDENTIAL_LISTINGS_BLOB_PATH, buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: "application/json",
        allowOverwrite: true,
      });
      return;
    } catch (error) {
      console.error("Error saving residential listings to blob:", error);
      throw new Error(
        `Failed to save residential listings to blob storage: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  try {
    await writeFile(RESIDENTIAL_LISTINGS_FILE_PATH, listingsJson, "utf-8");
  } catch (error) {
    console.error("Error saving residential listings:", error);
    throw new Error("Failed to save residential listings");
  }
}

// Create new residential listing
export async function createResidentialListing(
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
    const price = formData.get("price") as string;
    const location = formData.get("location") as string;
    const description = (formData.get("description") as string) || "";
    const mlsNumber = (formData.get("mlsNumber") as string) || "";
    // Auto-populate office info
    const office = "CRD Real Estate & Development";
    const officePhone = "479-445-4501";
    const bulletsStr = (formData.get("bullets") as string) || "[]";
    const propertyDetailsStr =
      (formData.get("propertyDetails") as string) || "{}";
    const agentsStr = (formData.get("agents") as string) || "[]";

    const coverImage = formData.get("coverImage") as File | null;
    const galleryImages = formData
      .getAll("galleryImages")
      .filter((img) => img instanceof File && img.size > 0) as File[];

    if (!(title && price && location)) {
      return {
        success: false,
        error: "Title, price, and location are required",
      };
    }

    const listings = await getResidentialListings(true);
    const id = `residential-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

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

      const filename = `residential-${id}-cover.webp`;
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

      const filename = `residential-${id}-gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
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

    let agents: Array<{ name: string; email?: string; phone?: string }> = [];
    try {
      agents = JSON.parse(agentsStr);
    } catch {
      // Keep empty array if parsing fails
    }

    const newListing: ResidentialListing = {
      id,
      title,
      price,
      location,
      imageSrc,
      description: description || undefined,
      bullets,
      href: `/residential/listings/${id}`,
      mlsNumber: mlsNumber || undefined,
      agents: agents.length > 0 ? agents : undefined,
      office: office || undefined,
      officePhone: officePhone || undefined,
      galleryImages: galleryImageUrls.length > 0 ? galleryImageUrls : undefined,
      propertyDetails:
        Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
      archived: false,
    };

    listings.push(newListing);
    await saveResidentialListings(listings);
    revalidatePath("/residential");
    revalidateTag("residential-listings", "max");

    return {
      success: true,
      listingId: id,
    };
  } catch (error) {
    console.error("Error creating residential listing:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create listing",
    };
  }
}

// Update residential listing
export async function updateResidentialListing(
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

    const listings = await getResidentialListings(true);
    const listingIndex = listings.findIndex((l) => l.id === id);

    if (listingIndex === -1) {
      return {
        success: false,
        error: "Listing not found",
      };
    }

    const existingListing = listings[listingIndex];
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const location = formData.get("location") as string;
    const description = (formData.get("description") as string) || "";
    const mlsNumber = (formData.get("mlsNumber") as string) || "";
    // Auto-populate office info
    const office = "CRD Real Estate & Development";
    const officePhone = "479-445-4501";
    const bulletsStr = (formData.get("bullets") as string) || "[]";
    const propertyDetailsStr =
      (formData.get("propertyDetails") as string) || "{}";
    const agentsStr = (formData.get("agents") as string) || "[]";

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

      const filename = `residential-${id}-cover.webp`;
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

        const filename = `residential-${id}-gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
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
        residentialPropertyDetailsSchema.safeParse(parsed);
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

    let agents: Array<{ name: string; email?: string; phone?: string }> = [];
    try {
      agents = JSON.parse(agentsStr);
    } catch {
      agents = existingListing.agents || [];
    }

    listings[listingIndex] = {
      ...existingListing,
      title,
      price,
      location,
      imageSrc,
      description: description || undefined,
      bullets,
      href: `/residential/listings/${id}`,
      mlsNumber: mlsNumber || undefined,
      agents: agents.length > 0 ? agents : undefined,
      office: office || undefined,
      officePhone: officePhone || undefined,
      galleryImages: galleryImageUrls.length > 0 ? galleryImageUrls : undefined,
      propertyDetails:
        Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
    };

    await saveResidentialListings(listings);
    revalidatePath("/residential");
    revalidateTag("residential-listings", "max");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating residential listing:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update listing",
    };
  }
}

// Delete residential listing
export async function deleteResidentialListing(
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
    const listings = await getResidentialListings(true);
    const listingIndex = listings.findIndex((l) => l.id === id);

    if (listingIndex === -1) {
      return {
        success: false,
        error: "Listing not found",
      };
    }

    const listing = listings[listingIndex];
    const isTestListing = id.startsWith("residential-test");

    if (isTestListing) {
      listings.splice(listingIndex, 1);
    } else {
      listings[listingIndex] = {
        ...listing,
        archived: true,
      };
    }
    await saveResidentialListings(listings);
    revalidatePath("/residential");
    revalidatePath("/admin/residential");
    updateTag("residential-listings");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting residential listing:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete listing",
    };
  }
}

// Unarchive residential listing
export async function unarchiveResidentialListing(
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
    const listings = await getResidentialListings(true);
    const listingIndex = listings.findIndex((l) => l.id === id);

    if (listingIndex === -1) {
      return {
        success: false,
        error: "Listing not found",
      };
    }

    const listing = listings[listingIndex];
    listings[listingIndex] = {
      ...listing,
      archived: false,
    };
    await saveResidentialListings(listings);
    revalidatePath("/residential");
    revalidatePath("/admin/residential");
    updateTag("residential-listings");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error unarchiving residential listing:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to unarchive listing",
    };
  }
}

// Import residential listings from JSON (dev tool)
export async function importResidentialListingsFromJson(
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

    let importedListings: ResidentialListing[];
    try {
      importedListings = JSON.parse(jsonData) as ResidentialListing[];
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
      if (!(listing.id && listing.title && listing.price && listing.location)) {
        return {
          success: false,
          error: `Listing missing required fields (id, title, price, location). Found: ${JSON.stringify(
            {
              id: listing.id,
              title: listing.title,
              price: listing.price,
              location: listing.location,
            }
          )}`,
          importedCount: 0,
        };
      }
    }

    // Get existing listings
    const existingListings = await getResidentialListings(true);
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
    await saveResidentialListings(updatedListings);
    revalidatePath("/residential");
    revalidateTag("residential-listings", "max");

    return {
      success: true,
      importedCount: newListings.length,
    };
  } catch (error) {
    console.error("Error importing residential listings from JSON:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to import listings",
      importedCount: 0,
    };
  }
}

// Create test residential listing with random data (dev tool)
export async function createTestResidentialListing(): Promise<{
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
      "Beautiful Family Home",
      "Cozy Starter Home",
      "Modern Townhouse",
      "Spacious Ranch",
      "Charming Cottage",
      "Luxury Estate",
      "Quaint Bungalow",
      "Contemporary Condo",
    ];

    const testLocations = [
      "123 Main St, Rogers, AR 72756",
      "456 Oak Ave, Bentonville, AR 72712",
      "789 Pine Rd, Fayetteville, AR 72701",
      "321 Elm St, Springdale, AR 72764",
      "654 Maple Dr, Bella Vista, AR 72714",
    ];

    const testPrices = [
      "$150,000",
      "$225,000",
      "$180,000",
      "$275,000",
      "$195,000",
      "$320,000",
      "$145,000",
      "$250,000",
    ];

    const testDescriptions = [
      "This beautiful property features modern amenities and a great location.",
      "Perfect for families looking for a comfortable home in a quiet neighborhood.",
      "Recently updated with new appliances and fresh paint throughout.",
      "Spacious layout with plenty of room for entertaining.",
      "Well-maintained property with great curb appeal.",
    ];

    const testBullets = [
      "1,200 sq ft",
      "Single Family Residence",
      "Built in 1995",
      "0.25 Acres lot",
      "Quiet neighborhood",
      "Updated kitchen",
    ];

    const randomTitle =
      testTitles[Math.floor(Math.random() * testTitles.length)];
    const randomLocation =
      testLocations[Math.floor(Math.random() * testLocations.length)];
    const randomPrice = testPrices[Math.floor(Math.random() * testPrices.length)];
    const randomDescription =
      testDescriptions[Math.floor(Math.random() * testDescriptions.length)];
    const randomMls = `TEST-${Math.floor(Math.random() * 10000)}`;

    const listings = await getResidentialListings(true);
    const id = `residential-test-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Add MLS to bullets
    const bulletsWithMls = [...testBullets, `MLS#: ${randomMls}`];

    // Comprehensive property details
    const propertyDetails: ResidentialPropertyDetails = {
      interior: {
        heating: "Central, Electric",
        cooling: "Central Air, Electric",
        appliances: "Dishwasher, Disposal, Microwave, Range/Oven, Refrigerator",
        flooring: "Carpet, Tile, Wood",
        hasBasement: "No",
        totalStructureArea: "1,200 sq ft",
        totalInteriorLivableArea: "1,200 sq ft",
      },
      property: {
        parking: {
          totalSpaces: "2",
          parkingFeatures: "Garage, Driveway",
          coveredSpaces: "2",
        },
        levels: "One",
        stories: "1",
        exteriorFeatures: "Patio, Porch",
        fencing: "Partial",
      },
      lot: {
        size: "0.25 Acres",
        features: "Level, Trees",
      },
      details: {
        parcelNumber: `TEST-${Math.floor(Math.random() * 100000)}`,
        specialConditions: "None",
      },
      construction: {
        homeType: "Single Family",
        propertySubtype: "Single Family Residence",
        materials: "Brick, Vinyl Siding",
        foundation: "Slab",
        roof: "Composition Shingle",
        newConstruction: "No",
        yearBuilt: "1995",
      },
      community: {
        features: "Park, Playground",
        security: "None",
        subdivision: "Test Subdivision",
      },
      location: {
        region: "Northwest Arkansas",
      },
      financial: {
        pricePerSquareFoot: "$150/sqft",
        annualTaxAmount: "$2,500",
        dateOnMarket: new Date().toISOString().split("T")[0],
      },
    };

    const newListing: ResidentialListing = {
      id,
      title: `${randomTitle} (Test)`,
      price: randomPrice,
      location: randomLocation,
      imageSrc: null,
      description: randomDescription,
      bullets: bulletsWithMls,
      href: `/residential/listings/${id}`,
      mlsNumber: randomMls,
      agents: [
        {
          name: "Test Agent",
          email: "test@example.com",
          phone: "(555) 123-4567",
        },
        {
          name: "Test Agent 2",
          email: "test2@example.com",
          phone: "(555) 234-5678",
        },
      ],
      office: "CRD Real Estate & Development",
      officePhone: "479-445-4501",
      propertyDetails:
        Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
      archived: false,
    };

    listings.push(newListing);
    await saveResidentialListings(listings);
    revalidatePath("/residential");
    revalidatePath("/admin/residential");
    updateTag("residential-listings");

    return {
      success: true,
      listingId: id,
    };
  } catch (error) {
    console.error("Error creating test residential listing:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create test listing",
    };
  }
}
