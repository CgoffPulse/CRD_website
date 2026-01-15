'use server';

import { put, del } from '@vercel/blob';
import { cookies } from 'next/headers';
import { unstable_cache, revalidatePath, revalidateTag, unstable_noStore } from 'next/cache';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import type { CommercialListing } from '../types/listings';

const COMMERCIAL_LISTINGS_FILE_PATH = process.env.CMS_COMMERCIAL_LISTINGS_FILE_PATH || join(process.cwd(), 'app/data/commercialListings.json');
const COMMERCIAL_LISTINGS_BLOB_PATH = process.env.CMS_COMMERCIAL_LISTINGS_BLOB_PATH || 'data/commercialListings.json';

// Authentication helper
export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('cms-auth');
  const expectedPassword = process.env.CMS_PASSWORD?.trim();

  if (!expectedPassword || expectedPassword.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('CMS_PASSWORD is not set in environment variables');
    }
    return false;
  }

  if (!authCookie) {
    return false;
  }

  // Simple comparison - in production, use proper hashing
  return authCookie.value.trim() === expectedPassword;
}

export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  // Prevent caching to ensure fresh env var access
  unstable_noStore();
  
  const expectedPassword = process.env.CMS_PASSWORD?.trim();

  if (!expectedPassword || expectedPassword.length === 0) {
    // Log in production to help debug (without exposing the actual value)
    console.error('[CMS Auth] CMS_PASSWORD is not set or is empty. Env var exists:', !!process.env.CMS_PASSWORD);
    return {
      success: false,
      error: 'CMS password not configured. Please set CMS_PASSWORD in your environment variables and redeploy.',
    };
  }

  if (password.trim() !== expectedPassword) {
    return {
      success: false,
      error: 'Invalid password',
    };
  }

  const cookieStore = await cookies();
  cookieStore.set('cms-auth', password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    success: true,
  };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('cms-auth');
}

// Read listings from JSON file or Blob Storage
export const getCommercialListings = unstable_cache(async (): Promise<CommercialListing[]> => {
  if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
    const blobPromise = (async () => {
      try {
        const { list } = await import('@vercel/blob');
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
        console.error('Error reading commercial listings from blob:', error);
      }
      return [];
    })();

    const filePromise = (async () => {
      try {
        const fileContents = await readFile(COMMERCIAL_LISTINGS_FILE_PATH, 'utf-8');
        return JSON.parse(fileContents) as CommercialListing[];
      } catch (fileError) {
        if (!(fileError instanceof Error && 'code' in fileError && fileError.code === 'ENOENT')) {
          console.error('Error reading commercial listings from file:', fileError);
        }
      }
      return [];
    })();

    const [blobListings, fileListings] = await Promise.all([blobPromise, filePromise]);

    const allListingsMap = new Map<string, CommercialListing>();

    for (const listing of fileListings) {
      allListingsMap.set(listing.id, listing);
    }

    for (const listing of blobListings) {
      allListingsMap.set(listing.id, listing);
    }

    const mergedListings = Array.from(allListingsMap.values());

    if (mergedListings.length > 0) {
      if (blobListings.length === 0 || mergedListings.length > blobListings.length) {
        try {
          await saveCommercialListings(mergedListings);
        } catch (migrationError) {
          console.error('Error migrating commercial listings to blob:', migrationError);
        }
      }
    }

    return mergedListings;
  }

  try {
    const fileContents = await readFile(COMMERCIAL_LISTINGS_FILE_PATH, 'utf-8');
    const listings = JSON.parse(fileContents) as CommercialListing[];
    return listings;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading commercial listings:', error);
    return [];
  }
}, ['commercial-listings'], { tags: ['commercial-listings'], revalidate: 60 });

async function saveCommercialListings(listings: CommercialListing[]): Promise<void> {
  const listingsJson = JSON.stringify(listings, null, 2);
  
  if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const buffer = Buffer.from(listingsJson, 'utf-8');
      await put(COMMERCIAL_LISTINGS_BLOB_PATH, buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: 'application/json',
        allowOverwrite: true,
      });
      return;
    } catch (error) {
      console.error('Error saving commercial listings to blob:', error);
      throw new Error(`Failed to save commercial listings to blob storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  try {
    await writeFile(COMMERCIAL_LISTINGS_FILE_PATH, listingsJson, 'utf-8');
  } catch (error) {
    console.error('Error saving commercial listings:', error);
    throw new Error('Failed to save commercial listings');
  }
}

// Create new commercial listing
export async function createCommercialListing(
  prevState: { success?: boolean; error?: string; listingId?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string; listingId?: string }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      error: 'Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN.',
    };
  }

  try {
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string || '';
    const mlsNumber = formData.get('mlsNumber') as string || '';
    const isLeaseStr = formData.get('isLease') as string;
    const isLease = isLeaseStr === 'true' || isLeaseStr === 'on';
    const price = formData.get('price') as string || '';
    const leaseRate = formData.get('leaseRate') as string || '';
    const bulletsStr = formData.get('bullets') as string || '[]';
    const propertyDetailsStr = formData.get('propertyDetails') as string || '{}';
    
    const coverImage = formData.get('coverImage') as File | null;
    const galleryImages = formData.getAll('galleryImages').filter((img) => img instanceof File && img.size > 0) as File[];

    if (!title || !location) {
      return {
        success: false,
        error: 'Title and location are required',
      };
    }

    if (!isLease && !price) {
      return {
        success: false,
        error: 'Price is required for buy listings',
      };
    }

    if (isLease && !leaseRate) {
      return {
        success: false,
        error: 'Lease rate is required for lease listings',
      };
    }

    const listings = await getCommercialListings();
    const id = `commercial-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    let imageSrc: string | null = null;
    const galleryImageUrls: string[] = [];

    // Upload cover image
    if (coverImage && coverImage.size > 0) {
      const maxSize = 10 * 1024 * 1024;
      if (coverImage.size > maxSize) {
        return {
          success: false,
          error: 'Cover image size must be less than 10MB',
        };
      }

      const imageBuffer = Buffer.from(await coverImage.arrayBuffer());
      const processedImage = await sharp(imageBuffer)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const filename = `commercial-${id}-cover.webp`;
      const blob = await put(filename, processedImage, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: 'image/webp',
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
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const filename = `commercial-${id}-gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
      const blob = await put(filename, processedImage, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: 'image/webp',
      });
      galleryImageUrls.push(blob.url);
    }

    let bullets: string[] = [];
    try {
      bullets = JSON.parse(bulletsStr);
    } catch {
      bullets = bulletsStr.split('\n').filter((b) => b.trim());
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
      href: `/commercial/${isLease ? 'lease' : 'buy'}/${id}`,
      mlsNumber: mlsNumber || undefined,
      galleryImages: galleryImageUrls.length > 0 ? galleryImageUrls : undefined,
      propertyDetails: Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
      isLease,
      price: !isLease && price ? price : undefined,
      leaseRate: isLease && leaseRate ? leaseRate : undefined,
    };

    listings.push(newListing);
    await saveCommercialListings(listings);
    revalidatePath('/commercial');
    revalidateTag('commercial-listings', 'max');

    return {
      success: true,
      listingId: id,
    };
  } catch (error) {
    console.error('Error creating commercial listing:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create listing',
    };
  }
}

// Update commercial listing
export async function updateCommercialListing(
  prevState: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  try {
    const id = formData.get('id') as string;
    if (!id) {
      return {
        success: false,
        error: 'Listing ID is required',
      };
    }

    const listings = await getCommercialListings();
    const listingIndex = listings.findIndex((l) => l.id === id);

    if (listingIndex === -1) {
      return {
        success: false,
        error: 'Listing not found',
      };
    }

    const existingListing = listings[listingIndex];
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string || '';
    const mlsNumber = formData.get('mlsNumber') as string || '';
    const isLeaseStr = formData.get('isLease') as string;
    const isLease = isLeaseStr === 'true' || isLeaseStr === 'on';
    const price = formData.get('price') as string || '';
    const leaseRate = formData.get('leaseRate') as string || '';
    const bulletsStr = formData.get('bullets') as string || '[]';
    const propertyDetailsStr = formData.get('propertyDetails') as string || '{}';

    const coverImage = formData.get('coverImage') as File | null;
    const galleryImages = formData.getAll('galleryImages').filter((img) => img instanceof File && img.size > 0) as File[];

    let imageSrc = existingListing.imageSrc;

    if (coverImage && coverImage.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
      const maxSize = 10 * 1024 * 1024;
      if (coverImage.size > maxSize) {
        return {
          success: false,
          error: 'Cover image size must be less than 10MB',
        };
      }

      const imageBuffer = Buffer.from(await coverImage.arrayBuffer());
      const processedImage = await sharp(imageBuffer)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const filename = `commercial-${id}-cover.webp`;
      const blob = await put(filename, processedImage, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: 'image/webp',
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
          .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer();

        const filename = `commercial-${id}-gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
        const blob = await put(filename, processedImage, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
          contentType: 'image/webp',
        });
        galleryImageUrls.push(blob.url);
      }
    }

    let bullets: string[] = [];
    try {
      bullets = JSON.parse(bulletsStr);
    } catch {
      bullets = bulletsStr.split('\n').filter((b) => b.trim());
    }

    let propertyDetails: any = {};
    try {
      propertyDetails = JSON.parse(propertyDetailsStr);
    } catch {
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
      propertyDetails: Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
      isLease,
      price: !isLease && price ? price : undefined,
      leaseRate: isLease && leaseRate ? leaseRate : undefined,
      href: `/commercial/${isLease ? 'lease' : 'buy'}/${id}`,
    };

    await saveCommercialListings(listings);
    revalidatePath('/commercial');
    revalidateTag('commercial-listings', 'max');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating commercial listing:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update listing',
    };
  }
}

// Delete commercial listing
export async function deleteCommercialListing(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  try {
    const listings = await getCommercialListings();
    const listingIndex = listings.findIndex((l) => l.id === id);

    if (listingIndex === -1) {
      return {
        success: false,
        error: 'Listing not found',
      };
    }

    const listing = listings[listingIndex];

    // Delete images from blob storage if configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        if (listing.imageSrc) {
          const imageUrl = new URL(listing.imageSrc);
          const blobPath = imageUrl.pathname.substring(1);
          await del(blobPath, { token: process.env.BLOB_READ_WRITE_TOKEN });
        }
        if (listing.galleryImages) {
          for (const imageUrl of listing.galleryImages) {
            try {
              const url = new URL(imageUrl);
              const blobPath = url.pathname.substring(1);
              await del(blobPath, { token: process.env.BLOB_READ_WRITE_TOKEN });
            } catch (delError) {
              console.error('Error deleting gallery image:', delError);
            }
          }
        }
      } catch (blobError) {
        console.error('Error deleting images from blob:', blobError);
      }
    }

    listings.splice(listingIndex, 1);
    await saveCommercialListings(listings);
    revalidatePath('/commercial');
    revalidateTag('commercial-listings', 'max');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting commercial listing:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete listing',
    };
  }
}

// Import commercial listings from JSON (dev tool)
export async function importCommercialListingsFromJson(
  prevState: { success?: boolean; error?: string; importedCount?: number },
  formData: FormData
): Promise<{ success?: boolean; error?: string; importedCount?: number }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
      importedCount: 0,
    };
  }

  try {
    const jsonData = formData.get('jsonData') as string;
    if (!jsonData || !jsonData.trim()) {
      return {
        success: false,
        error: 'JSON data is required',
        importedCount: 0,
      };
    }

    let importedListings: CommercialListing[];
    try {
      importedListings = JSON.parse(jsonData) as CommercialListing[];
      if (!Array.isArray(importedListings)) {
        return {
          success: false,
          error: 'JSON must be an array of listings',
          importedCount: 0,
        };
      }
    } catch (parseError) {
      return {
        success: false,
        error: `Invalid JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
        importedCount: 0,
      };
    }

    // Validate required fields for each listing
    for (const listing of importedListings) {
      if (!listing.id || !listing.title || !listing.location) {
        return {
          success: false,
          error: `Listing missing required fields (id, title, location). Found: ${JSON.stringify({
            id: listing.id,
            title: listing.title,
            location: listing.location,
          })}`,
          importedCount: 0,
        };
      }
      // Commercial listings need either price or leaseRate
      if (!listing.price && !listing.leaseRate) {
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
    const existingListings = await getCommercialListings();
    const existingIds = new Set(existingListings.map((l) => l.id));

    // Filter out listings that already exist (by ID)
    const newListings = importedListings.filter((listing) => !existingIds.has(listing.id));

    if (newListings.length === 0) {
      return {
        success: false,
        error: 'All listings already exist. No new listings to import.',
        importedCount: 0,
      };
    }

    // Add new listings
    const updatedListings = [...existingListings, ...newListings];
    await saveCommercialListings(updatedListings);
    revalidatePath('/commercial');
    revalidateTag('commercial-listings', 'max');

    return {
      success: true,
      importedCount: newListings.length,
    };
  } catch (error) {
    console.error('Error importing commercial listings from JSON:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to import listings',
      importedCount: 0,
    };
  }
}
