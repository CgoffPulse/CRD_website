'use server';

import { put, del } from '@vercel/blob';
import { cookies } from 'next/headers';
import { unstable_noStore } from 'next/cache';
import { z } from 'zod';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import type { EventPoster } from '../types/eventPosters';

// Configurable paths - can be overridden via environment variables
const EVENTS_FILE_PATH = process.env.CMS_EVENTS_FILE_PATH || join(process.cwd(), 'app/data/events.json');
const EVENTS_BLOB_PATH = process.env.CMS_EVENTS_BLOB_PATH || 'data/events.json';

const eventSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  image: z.instanceof(File, { message: 'Image is required' }),
});

type EventActionState = {
  success?: boolean;
  error?: string;
  eventId?: string;
};

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

  // Simple comparison - in production, use proper hashing
  return authCookie.value === expectedPassword;
}

const loginSchema = z.object({
  password: z.string({ error: (issue) => issue.input === undefined ? 'Password is required' : 'Invalid value' }).min(1),
});

type LoginState = {
  success?: boolean;
  error?: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get('password') as string;
  
  const validatedFields = loginSchema.safeParse({ password });
  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Password is required',
    };
  }

  return await login(password);
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

// Read events from JSON file or Blob Storage
export async function getEvents(): Promise<EventPoster[]> {
  // Disable caching to ensure fresh data in development
  unstable_noStore();
  
  // In production, use Blob Storage with fallback and merge with committed JSON file
  if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
    let blobEvents: EventPoster[] = [];
    let fileEvents: EventPoster[] = [];
    
    // Try to read from blob storage
    try {
      const { list } = await import('@vercel/blob');
      const blobs = await list({
        prefix: EVENTS_BLOB_PATH,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      
      if (blobs.blobs.length > 0) {
        const blob = blobs.blobs[0];
        const response = await fetch(blob.url);
        const fileContents = await response.text();
        blobEvents = JSON.parse(fileContents) as EventPoster[];
      }
    } catch (error) {
      console.error('Error reading events from blob:', error);
    }
    
    // Try to read from committed JSON file
    try {
      const fileContents = await readFile(EVENTS_FILE_PATH, 'utf-8');
      fileEvents = JSON.parse(fileContents) as EventPoster[];
    } catch (fileError) {
      // File doesn't exist or can't be read - that's okay
      if (!(fileError instanceof Error && 'code' in fileError && fileError.code === 'ENOENT')) {
        console.error('Error reading events from file:', fileError);
      }
    }
    
    // Merge events: combine blob and file events, removing duplicates by ID
    const allEventsMap = new Map<string, EventPoster>();
    
    // First add file events (these are the source of truth for existing data)
    for (const event of fileEvents) {
      allEventsMap.set(event.id, event);
    }
    
    // Then add/override with blob events (these have the latest updates)
    for (const event of blobEvents) {
      allEventsMap.set(event.id, event);
    }
    
    const mergedEvents = Array.from(allEventsMap.values());
    
    // Always ensure blob is up to date with merged data (if we have any events)
    if (mergedEvents.length > 0) {
      // Only migrate if blob is empty or has fewer events than merged
      if (blobEvents.length === 0 || mergedEvents.length > blobEvents.length) {
        try {
          await saveEvents(mergedEvents);
          console.log(`Migrated/updated ${mergedEvents.length} events to blob storage (file: ${fileEvents.length}, blob: ${blobEvents.length})`);
        } catch (migrationError) {
          console.error('Error migrating events to blob:', migrationError);
          // Continue anyway - return merged events
        }
      }
    }
    
    return mergedEvents;
  }
  
  // In development, use local file system
  try {
    const fileContents = await readFile(EVENTS_FILE_PATH, 'utf-8');
    const events = JSON.parse(fileContents) as EventPoster[];
    return events;
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading events:', error);
    return [];
  }
}

// Write events to JSON file or Blob Storage
async function saveEvents(events: EventPoster[]): Promise<void> {
  const eventsJson = JSON.stringify(events, null, 2);
  
  // In production, use Blob Storage
  if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      // Convert JSON string to Buffer for blob storage
      const buffer = Buffer.from(eventsJson, 'utf-8');
      await put(EVENTS_BLOB_PATH, buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: 'application/json',
        allowOverwrite: true,
      });
      return;
    } catch (error) {
      console.error('Error saving events to blob:', error);
      // Log the actual error for debugging
      if (error instanceof Error) {
        console.error('Blob save error details:', error.message, error.stack);
      }
      throw new Error(`Failed to save events to blob storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // In development, use local file system
  try {
    await writeFile(EVENTS_FILE_PATH, eventsJson, 'utf-8');
  } catch (error) {
    console.error('Error saving events:', error);
    throw new Error('Failed to save events');
  }
}

// Upload event flyer
export async function uploadEventFlyer(
  prevState: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  // Check for Vercel Blob token
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      error: 'Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN.',
    };
  }

  try {
    const name = formData.get('name') as string;
    const eventDate = formData.get('eventDate') as string;
    const flyerType = (formData.get('flyerType') as string) || 'single';
    const goLiveDaysStr = formData.get('goLiveDays') as string;
    const goLiveDays = goLiveDaysStr ? Number.parseInt(goLiveDaysStr, 10) : 15;

    // Get all images from FormData
    // When file input has multiple attribute, browser submits all files with same name "image"
    // Use getAll to get all files, or get for single file
    const images: File[] = [];
    
    if (flyerType === 'multi') {
      // Multi-page: try getAll('image') first (natural form submission)
      const allImages = formData.getAll('image');
      const validImages = allImages.filter((img) => {
        return img instanceof File && img.size > 0;
      }) as File[];
      
      if (validImages.length > 0) {
        images.push(...validImages);
      } else {
        // Fallback: try indexed images (image0, image1, etc.) for backward compatibility
        let index = 0;
        while (true) {
          const image = formData.get(`image${index}`) as File | null;
          if (!image || !(image instanceof File) || image.size === 0) {
            break;
          }
          images.push(image);
          index++;
        }
      }
    } else {
      // Single-page: get single image
      const image = formData.get('image') as File;
      if (image && image instanceof File && image.size > 0) {
        images.push(image);
      }
    }

    if (images.length === 0) {
      return {
        success: false,
        error: 'Please select at least one image',
      };
    }

    // Validate all images
    const maxSize = 10 * 1024 * 1024; // 10MB
    for (const image of images) {
      if (!image.type.startsWith('image/')) {
        return {
          success: false,
          error: 'All files must be images',
        };
      }

      if (image.size > maxSize) {
        return {
          success: false,
          error: 'Each image size must be less than 10MB',
        };
      }
    }

    // Validate input (using first image for schema validation)
    const validation = eventSchema.safeParse({
      name,
      eventDate,
      image: images[0],
    });

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || 'Invalid form data',
      };
    }

    // Generate base ID for grouping
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const baseId = `event-${timestamp}-${randomStr}`;

    // Read existing events
    const events = await getEvents();

    // Upload all images and create event objects
    const newEvents: EventPoster[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      // Generate ID with numeric suffix for multi-page (for grouping)
      // Single-page: event-123-abc (no suffix)
      // Multi-page: event-123-abc1, event-123-abc2, etc. (with numeric suffix)
      const eventId = flyerType === 'multi' && images.length > 1
        ? `${baseId}${i + 1}`
        : baseId;

      let width = 1200;
      let height = 1600;

      // Get image dimensions using sharp with error handling
      try {
        const arrayBuffer = await image.arrayBuffer();
        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
          console.error(`Image ${i + 1} has empty or invalid data`);
          return {
            success: false,
            error: `Image ${i + 1} appears to be empty or corrupted. Please try uploading again.`,
          };
        }
        const imageBuffer = Buffer.from(arrayBuffer);
        const metadata = await sharp(imageBuffer).metadata();
        width = metadata.width || 1200;
        height = metadata.height || 1600;
      } catch (sharpError) {
        console.error(`Error processing image ${i + 1} with sharp:`, sharpError);
        // If sharp fails, use default dimensions and continue
        // The image will still be uploaded, just with default dimensions
        // Only fail if it's a critical error (not just dimension extraction)
        if (sharpError instanceof Error && sharpError.message.includes('Input buffer')) {
          return {
            success: false,
            error: `Image ${i + 1} could not be processed. The file may be corrupted or in an unsupported format.`,
          };
        }
      }

      // Upload image to Vercel Blob
      const blobPrefix = process.env.CMS_BLOB_PREFIX || 'events';
      let blob;
      try {
        blob = await put(`${blobPrefix}/${eventId}`, image, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
      } catch (blobError) {
        console.error(`Error uploading image ${i + 1} to blob:`, blobError);
        // Return error immediately instead of throwing
        return {
          success: false,
          error: `Failed to upload image ${i + 1}: ${blobError instanceof Error ? blobError.message : 'Unknown error'}`,
        };
      }

      // Create event object
      const newEvent: EventPoster = {
        id: eventId,
        src: blob.url,
        alt: name,
        height,
        width,
        eventDate,
        goLiveDays: goLiveDays >= 1 ? goLiveDays : 15, // Ensure minimum 1 day, default to 15
      };

      newEvents.push(newEvent);
    }

    // Add all new events
    events.push(...newEvents);

    // Save to JSON file
    await saveEvents(events);

    return {
      success: true,
      eventId: baseId,
    };
  } catch (error) {
    console.error('Error uploading event:', error);
    // Provide more specific error messages
    let errorMessage = 'Failed to upload event';
    if (error instanceof Error) {
      errorMessage = error.message;
      // Check for specific error types
      if (error.message.includes('sharp')) {
        errorMessage = 'Error processing image. The image file may be corrupted or in an unsupported format.';
      } else if (error.message.includes('blob')) {
        errorMessage = 'Error uploading image to storage. Please try again or check your connection.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Upload timed out. The image may be too large. Please try a smaller file.';
      }
    }
    // Ensure we always return a valid response object
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Delete event (deletes entire group for multi-page events)
export async function deleteEvent(
  eventId: string
): Promise<{ success: boolean; error?: string }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  try {
    // Read existing events
    const events = await getEvents();

    // Find all events with matching base ID (handles multi-page events)
    const NUMERIC_SUFFIX_REGEX = /\d+$/;
    const baseId = eventId.replace(NUMERIC_SUFFIX_REGEX, '');
    const eventsToDelete = events.filter((e) => {
      const eBaseId = e.id.replace(NUMERIC_SUFFIX_REGEX, '');
      return eBaseId === baseId;
    });

    if (eventsToDelete.length === 0) {
      return {
        success: false,
        error: 'Event not found',
      };
    }

    // Delete all blob images for this event group
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      for (const eventToDelete of eventsToDelete) {
        if (eventToDelete.src.startsWith('https://')) {
          try {
            // Extract blob pathname from URL
            const url = new URL(eventToDelete.src);
            const blobPath = url.pathname.substring(1); // Remove leading slash
            await del(blobPath, {
              token: process.env.BLOB_READ_WRITE_TOKEN,
            });
          } catch (blobError) {
            // Log but don't fail if blob deletion fails
            console.error('Error deleting blob:', blobError);
          }
        }
      }
    }

    // Remove all events in the group from array
    const filteredEvents = events.filter((e) => {
      const eBaseId = e.id.replace(NUMERIC_SUFFIX_REGEX, '');
      return eBaseId === baseId;
    });

    // Save to JSON file
    await saveEvents(filteredEvents);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete event',
    };
  }
}

// Update event
export async function updateEvent(
  prevState: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  // Check for Vercel Blob token if images are being updated
  const hasNewImages = formData.get('hasNewImages') === 'true';
  if (hasNewImages && !process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      error: 'Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN.',
    };
  }

  try {
    const eventId = formData.get('eventId') as string;
    const name = formData.get('name') as string;
    const eventDate = formData.get('eventDate') as string;
    const goLiveDaysStr = formData.get('goLiveDays') as string;
    const goLiveDays = goLiveDaysStr ? Number.parseInt(goLiveDaysStr, 10) : 15;
    const flyerType = (formData.get('flyerType') as string) || 'single';

    if (!eventId || !name || !eventDate) {
      return {
        success: false,
        error: 'Missing required fields',
      };
    }

    // Validate date format
    const dateValidation = z.string({ error: (issue) => issue.input === undefined ? 'Event date is required' : 'Invalid value' }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').safeParse(eventDate);
    if (!dateValidation.success) {
      return {
        success: false,
        error: 'Date must be in YYYY-MM-DD format',
      };
    }

    // Read existing events
    const events = await getEvents();

    // Find all events with matching base ID (handles multi-page events)
    // For single events, baseId = eventId
    // For multi-page, baseId = eventId without numeric suffix
    const NUMERIC_SUFFIX_REGEX = /\d+$/;
    const baseId = eventId.replace(NUMERIC_SUFFIX_REGEX, '');
    const eventsToUpdate = events.filter((e) => {
      const eBaseId = e.id.replace(NUMERIC_SUFFIX_REGEX, '');
      return eBaseId === baseId;
    });

    if (eventsToUpdate.length === 0) {
      return {
        success: false,
        error: 'Event not found',
      };
    }

    // If new images are provided, handle image replacement
    if (hasNewImages) {
      // Get all new images from FormData
      // Try indexed images first (image0, image1, etc.), then getAll('image'), then single 'image'
      const newImages: File[] = [];
      
      if (flyerType === 'multi') {
        // Multi-page: try to get indexed images first
        let index = 0;
        while (true) {
          const image = formData.get(`image${index}`) as File | null;
          if (!image || !(image instanceof File) || image.size === 0) {
            break;
          }
          newImages.push(image);
          index++;
        }
        
        // If no indexed images found, try getAll('image') for multiple files with same name
        if (newImages.length === 0) {
          const allImages = formData.getAll('image') as File[];
          newImages.push(...allImages.filter((img) => {
            return img instanceof File && img.size > 0;
          }));
        }
      } else {
        // Single-page: get single image
        const image = formData.get('image') as File;
        if (image && image instanceof File && image.size > 0) {
          newImages.push(image);
        }
      }

      if (newImages.length === 0) {
        return {
          success: false,
          error: 'Please select at least one image to replace',
        };
      }

      // Validate all images
      const maxSize = 10 * 1024 * 1024; // 10MB
      for (const image of newImages) {
        if (!image.type.startsWith('image/')) {
          return {
            success: false,
            error: 'All files must be images',
          };
        }

        if (image.size > maxSize) {
          return {
            success: false,
            error: 'Each image size must be less than 10MB',
          };
        }
      }

      // Delete old blob images
      for (const oldEvent of eventsToUpdate) {
        if (
          oldEvent.src.startsWith('https://') &&
          process.env.BLOB_READ_WRITE_TOKEN
        ) {
          try {
            const url = new URL(oldEvent.src);
            const blobPath = url.pathname.substring(1);
            await del(blobPath, {
              token: process.env.BLOB_READ_WRITE_TOKEN,
            });
          } catch (blobError) {
            console.error('Error deleting old blob:', blobError);
            // Continue even if deletion fails
          }
        }
      }

      // Remove old events from array
      const updatedEvents = events.filter((e) => {
        const eBaseId = e.id.replace(NUMERIC_SUFFIX_REGEX, '');
        return eBaseId === baseId;
      });

      // Upload new images and create updated event objects
      const newEvents: EventPoster[] = [];
      const blobPrefix = process.env.CMS_BLOB_PREFIX || 'events';

      for (let i = 0; i < newImages.length; i++) {
        const image = newImages[i];
        
        // Generate ID with numeric suffix for multi-page (for grouping)
        const newEventId = flyerType === 'multi' && newImages.length > 1
          ? `${baseId}${i + 1}`
          : baseId;

        let width = 1200;
        let height = 1600;

        // Get image dimensions using sharp with error handling
        try {
          const arrayBuffer = await image.arrayBuffer();
          if (!arrayBuffer || arrayBuffer.byteLength === 0) {
            console.error(`Image ${i + 1} has empty or invalid data`);
            return {
              success: false,
              error: `Image ${i + 1} appears to be empty or corrupted. Please try uploading again.`,
            };
          }
          const imageBuffer = Buffer.from(arrayBuffer);
          const metadata = await sharp(imageBuffer).metadata();
          width = metadata.width || 1200;
          height = metadata.height || 1600;
        } catch (sharpError) {
          console.error(`Error processing image ${i + 1} with sharp:`, sharpError);
          // If sharp fails, use default dimensions and continue
          // Only fail if it's a critical error (not just dimension extraction)
          if (sharpError instanceof Error && sharpError.message.includes('Input buffer')) {
            return {
              success: false,
              error: `Image ${i + 1} could not be processed. The file may be corrupted or in an unsupported format.`,
            };
          }
        }

        // Upload image to Vercel Blob
        let blob;
        try {
          blob = await put(`${blobPrefix}/${newEventId}`, image, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN!,
          });
        } catch (blobError) {
          console.error(`Error uploading image ${i + 1} to blob:`, blobError);
          // Return error immediately instead of throwing
          return {
            success: false,
            error: `Failed to upload image ${i + 1}: ${blobError instanceof Error ? blobError.message : 'Unknown error'}`,
          };
        }

        // Create updated event object
        const updatedEvent: EventPoster = {
          id: newEventId,
          src: blob.url,
          alt: name,
          height,
          width,
          eventDate,
          goLiveDays: goLiveDays >= 1 ? goLiveDays : 15,
        };

        newEvents.push(updatedEvent);
      }

      // Add updated events
      updatedEvents.push(...newEvents);

      // Save to JSON file
      await saveEvents(updatedEvents);
    } else {
      // No new images, just update metadata
      const updatedEvents = events.map((e) => {
        const eBaseId = e.id.replace(NUMERIC_SUFFIX_REGEX, '');
        if (eBaseId === baseId) {
          return {
            ...e,
            alt: name,
            eventDate,
            goLiveDays: goLiveDays >= 1 ? goLiveDays : 15,
          };
        }
        return e;
      });

      // Save to JSON file
      await saveEvents(updatedEvents);
    }

    return {
      success: true,
      eventId: baseId,
    };
  } catch (error) {
    console.error('Error updating event:', error);
    // Provide more specific error messages
    let errorMessage = 'Failed to update event';
    if (error instanceof Error) {
      errorMessage = error.message;
      // Check for specific error types
      if (error.message.includes('sharp')) {
        errorMessage = 'Error processing image. The image file may be corrupted or in an unsupported format.';
      } else if (error.message.includes('blob')) {
        errorMessage = 'Error uploading image to storage. Please try again or check your connection.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Upload timed out. The image may be too large. Please try a smaller file.';
      }
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Migrate events from JSON file to Blob Storage (manual migration)
export async function migrateEventsToBlob(): Promise<{ success: boolean; error?: string; migrated?: number }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  // Only run in production
  if (process.env.NODE_ENV !== 'production' || !process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      error: 'Migration only works in production with BLOB_READ_WRITE_TOKEN set',
    };
  }

  try {
    // Check if blob already exists
    const { list } = await import('@vercel/blob');
    const blobs = await list({
      prefix: EVENTS_BLOB_PATH,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (blobs.blobs.length > 0) {
      return {
        success: false,
        error: 'Events already migrated to blob storage',
      };
    }

    // Read from JSON file
    const fileContents = await readFile(EVENTS_FILE_PATH, 'utf-8');
    const events = JSON.parse(fileContents) as EventPoster[];

    if (events.length === 0) {
      return {
        success: false,
        error: 'No events found to migrate',
      };
    }

    // Save to blob storage
    await saveEvents(events);

    return {
      success: true,
      migrated: events.length,
    };
  } catch (error) {
    console.error('Error migrating events:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to migrate events',
    };
  }
}

// Toggle forceGoLive for an event (bypasses goLiveDays logic)
export async function toggleForceGoLive(
  eventId: string,
  forceGoLive: boolean
): Promise<{ success: boolean; error?: string }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Unauthorized. Please log in.',
    };
  }

  try {
    // Read existing events
    const events = await getEvents();

    // Find all events with matching base ID (handles multi-page events)
    const NUMERIC_SUFFIX_REGEX = /\d+$/;
    const baseId = eventId.replace(NUMERIC_SUFFIX_REGEX, '');
    
    // Update all events in the group
    const updatedEvents = events.map((e) => {
      const eBaseId = e.id.replace(NUMERIC_SUFFIX_REGEX, '');
      if (eBaseId === baseId) {
        return {
          ...e,
          forceGoLive,
        };
      }
      return e;
    });

    // Save to JSON file
    await saveEvents(updatedEvents);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error toggling force go live:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to toggle force go live',
    };
  }
}

// Force push an event (enable forceGoLive)
export async function forcePushEvent(
  eventId: string
): Promise<{ success: boolean; error?: string }> {
  return toggleForceGoLive(eventId, true);
}
