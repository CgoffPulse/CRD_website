'use server';

import { put, del } from '@vercel/blob';
import { cookies } from 'next/headers';
import { unstable_noStore } from 'next/cache';
import { z } from 'zod';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import type { ResidentialListing } from '../types/listings';

const RESIDENTIAL_LISTINGS_FILE_PATH = process.env.CMS_RESIDENTIAL_LISTINGS_FILE_PATH || join(process.cwd(), 'app/data/residentialListings.json');
const RESIDENTIAL_LISTINGS_BLOB_PATH = process.env.CMS_RESIDENTIAL_LISTINGS_BLOB_PATH || 'data/residentialListings.json';

// Authentication helper
export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('cms-auth');
  const expectedPassword = process.env.CMS_PASSWORD;

  if (!expectedPassword) {
    return false;
  }

  if (!authCookie) {
    return false;
  }

  return authCookie.value === expectedPassword;
}

export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  const expectedPassword = process.env.CMS_PASSWORD;

  if (!expectedPassword) {
    return {
      success: false,
      error: 'CMS password not configured',
    };
  }

  if (password !== expectedPassword) {
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
export async function getResidentialListings(): Promise<ResidentialListing[]> {
  unstable_noStore();
  
  if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
    let blobListings: ResidentialListing[] = [];
    let fileListings: ResidentialListing[] = [];
    
    try {
      const { list } = await import('@vercel/blob');
      const blobs = await list({
        prefix: RESIDENTIAL_LISTINGS_BLOB_PATH,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      
      if (blobs.blobs.length > 0) {
        const blob = blobs.blobs[0];
        const response = await fetch(blob.url);
        const fileContents = await response.text();
        blobListings = JSON.parse(fileContents) as ResidentialListing[];
      }
    } catch (error) {
      console.error('Error reading residential listings from blob:', error);
    }
    
    try {
      const fileContents = await readFile(RESIDENTIAL_LISTINGS_FILE_PATH, 'utf-8');
      fileListings = JSON.parse(fileContents) as ResidentialListing[];
    } catch (fileError) {
      if (!(fileError instanceof Error && 'code' in fileError && fileError.code === 'ENOENT')) {
        console.error('Error reading residential listings from file:', fileError);
      }
    }
    
    const allListingsMap = new Map<string, ResidentialListing>();
    
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
          await saveResidentialListings(mergedListings);
        } catch (migrationError) {
          console.error('Error migrating residential listings to blob:', migrationError);
        }
      }
    }
    
    return mergedListings;
  }
  
  try {
    const fileContents = await readFile(RESIDENTIAL_LISTINGS_FILE_PATH, 'utf-8');
    const listings = JSON.parse(fileContents) as ResidentialListing[];
    return listings;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading residential listings:', error);
    return [];
  }
}

async function saveResidentialListings(listings: ResidentialListing[]): Promise<void> {
  const listingsJson = JSON.stringify(listings, null, 2);
  
  if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const buffer = Buffer.from(listingsJson, 'utf-8');
      await put(RESIDENTIAL_LISTINGS_BLOB_PATH, buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: 'application/json',
        allowOverwrite: true,
      });
      return;
    } catch (error) {
      console.error('Error saving residential listings to blob:', error);
      throw new Error(`Failed to save residential listings to blob storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  try {
    await writeFile(RESIDENTIAL_LISTINGS_FILE_PATH, listingsJson, 'utf-8');
  } catch (error) {
    console.error('Error saving residential listings:', error);
    throw new Error('Failed to save residential listings');
  }
}

// Create new residential listing
export async function createResidentialListing(
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
    const price = formData.get('price') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string || '';
    const summary = formData.get('summary') as string || '';
    const mlsNumber = formData.get('mlsNumber') as string || '';
    const office = formData.get('office') as string || '';
    const officePhone = formData.get('officePhone') as string || '';
    const bulletsStr = formData.get('bullets') as string || '[]';
    const propertyDetailsStr = formData.get('propertyDetails') as string || '{}';
    const agentsStr = formData.get('agents') as string || '[]';
    
    const coverImage = formData.get('coverImage') as File | null;
    const galleryImages = formData.getAll('galleryImages').filter((img) => img instanceof File && img.size > 0) as File[];

    if (!title || !price || !location) {
      return {
        success: false,
        error: 'Title, price, and location are required',
      };
    }

    const listings = await getResidentialListings();
    const id = `residential-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
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

      const filename = `residential-${id}-cover.webp`;
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

      const filename = `residential-${id}-gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
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
      summary: summary || undefined,
      bullets,
      href: `/residential/listings/${id}`,
      mlsNumber: mlsNumber || undefined,
      agents: agents.length > 0 ? agents : undefined,
      office: office || undefined,
      officePhone: officePhone || undefined,
      galleryImages: galleryImageUrls.length > 0 ? galleryImageUrls : undefined,
      propertyDetails: Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
    };

    listings.push(newListing);
    await saveResidentialListings(listings);

    return {
      success: true,
      listingId: id,
    };
  } catch (error) {
    console.error('Error creating residential listing:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create listing',
    };
  }
}

// Update residential listing
export async function updateResidentialListing(
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

    const listings = await getResidentialListings();
    const listingIndex = listings.findIndex((l) => l.id === id);

    if (listingIndex === -1) {
      return {
        success: false,
        error: 'Listing not found',
      };
    }

    const existingListing = listings[listingIndex];
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string || '';
    const summary = formData.get('summary') as string || '';
    const mlsNumber = formData.get('mlsNumber') as string || '';
    const office = formData.get('office') as string || '';
    const officePhone = formData.get('officePhone') as string || '';
    const bulletsStr = formData.get('bullets') as string || '[]';
    const propertyDetailsStr = formData.get('propertyDetails') as string || '{}';
    const agentsStr = formData.get('agents') as string || '[]';

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

      const filename = `residential-${id}-cover.webp`;
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

        const filename = `residential-${id}-gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
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
      summary: summary || undefined,
      bullets,
      mlsNumber: mlsNumber || undefined,
      agents: agents.length > 0 ? agents : undefined,
      office: office || undefined,
      officePhone: officePhone || undefined,
      galleryImages: galleryImageUrls.length > 0 ? galleryImageUrls : undefined,
      propertyDetails: Object.keys(propertyDetails).length > 0 ? propertyDetails : undefined,
    };

    await saveResidentialListings(listings);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating residential listing:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update listing',
    };
  }
}

// Delete residential listing
export async function deleteResidentialListing(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  try {
    const listings = await getResidentialListings();
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
    await saveResidentialListings(listings);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting residential listing:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete listing',
    };
  }
}
