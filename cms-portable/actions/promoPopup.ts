"use server";

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { del, put } from "@vercel/blob";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import sharp from "sharp";
import { z } from "zod";

// Configurable paths - can be overridden via environment variables
const PROMO_POPUP_FILE_PATH =
  process.env.CMS_PROMO_FILE_PATH ||
  join(process.cwd(), "app/data/promoPopup.json");
const PROMO_POPUP_BLOB_PATH =
  process.env.CMS_PROMO_BLOB_PATH || "data/promoPopup.json";

export interface PromoImage {
  id: string;
  src: string;
  alt: string;
  height: number;
  width: number;
  createdDate?: string; // ISO date string
  expirationDate?: string; // ISO date string, for reinstatements
  lastUsedDate?: string; // ISO date string
  isArchived?: boolean; // Moved to past promos
}

export interface PromoPopupConfig {
  enabled: boolean;
  type: "single" | "carousel";
  images: PromoImage[]; // Active promos only
  pastPromos: PromoImage[]; // Archived promos
  linkUrl: string | null;
  linkText: string | null;
  popupBgColor?: string; // Background color for popup (hex format, e.g., "#FFFFFF")
  buttonColor?: string; // Color for "Learn More" button (hex format, e.g., "#000000")
  forceGoLive?: boolean; // If true, bypass normal priority logic and show promo even if events are active
}

// Authentication helper (reuse from events)
async function verifyAuth(): Promise<boolean> {
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

// Read promo popup config from JSON file or Blob Storage
export async function getPromoPopup(): Promise<PromoPopupConfig> {
  unstable_noStore();

  const defaultConfig: PromoPopupConfig = {
    enabled: false,
    type: "single",
    images: [],
    pastPromos: [],
    linkUrl: null,
    linkText: null,
    popupBgColor: "#FFFFFF", // Default white color
    buttonColor: "#000000", // Default black color
    forceGoLive: false,
  };

  // In production, use Blob Storage with fallback to committed JSON file
  if (
    process.env.NODE_ENV === "production" &&
    process.env.BLOB_READ_WRITE_TOKEN
  ) {
    try {
      const { list } = await import("@vercel/blob");
      const blobs = await list({
        prefix: PROMO_POPUP_BLOB_PATH,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      if (blobs.blobs.length > 0) {
        const blob = blobs.blobs[0];
        const response = await fetch(blob.url);
        const fileContents = await response.text();
        const config = JSON.parse(fileContents) as PromoPopupConfig;

        // Migrate and process config
        const processedConfig = processPromoConfig(config, defaultConfig);

        // Save if migration occurred
        if (processedConfig.needsSave) {
          try {
            await savePromoPopup(processedConfig.config);
          } catch (saveError) {
            console.error("Error saving migrated config:", saveError);
          }
        }

        return processedConfig.config;
      }

      // Blob doesn't exist yet - try to read from committed JSON file and migrate
      try {
        const fileContents = await readFile(PROMO_POPUP_FILE_PATH, "utf-8");
        const config = JSON.parse(fileContents) as PromoPopupConfig;

        // Migrate and process config
        const processedConfig = processPromoConfig(config, defaultConfig);

        // Auto-migrate: save to blob storage
        try {
          await savePromoPopup(processedConfig.config);
          console.log("Migrated promo popup config to blob storage");
        } catch (migrationError) {
          console.error("Error migrating promo popup to blob:", migrationError);
          // Continue anyway - return the config from file
        }

        return processedConfig.config;
      } catch (fileError) {
        // File doesn't exist or can't be read
        if (
          fileError instanceof Error &&
          "code" in fileError &&
          fileError.code === "ENOENT"
        ) {
          return defaultConfig;
        }
        console.error("Error reading promo popup config from file:", fileError);
        return defaultConfig;
      }
    } catch (error) {
      console.error("Error reading promo popup config from blob:", error);
      // Fallback to file system
      try {
        const fileContents = await readFile(PROMO_POPUP_FILE_PATH, "utf-8");
        const config = JSON.parse(fileContents) as PromoPopupConfig;
        const processedConfig = processPromoConfig(config, defaultConfig);
        return processedConfig.config;
      } catch {
        return defaultConfig;
      }
    }
  }

  // In development, use local file system
  try {
    const fileContents = await readFile(PROMO_POPUP_FILE_PATH, "utf-8");
    const config = JSON.parse(fileContents) as PromoPopupConfig;
    const processedConfig = processPromoConfig(config, defaultConfig);

    // Save if migration occurred
    if (processedConfig.needsSave) {
      try {
        await savePromoPopup(processedConfig.config);
      } catch (saveError) {
        console.error("Error saving migrated config:", saveError);
      }
    }

    return processedConfig.config;
  } catch (error) {
    // If file doesn't exist or is invalid, return default config
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return defaultConfig;
    }
    console.error("Error reading promo popup config:", error);
    return defaultConfig;
  }
}

// Process promo config: handle migration and expiration
function processPromoConfig(
  config: PromoPopupConfig,
  defaultConfig: PromoPopupConfig
): { config: PromoPopupConfig; needsSave: boolean } {
  let needsSave = false;
  const today = new Date().toISOString().split("T")[0];

  // Ensure pastPromos exists
  if (!config.pastPromos) {
    config.pastPromos = [];
    needsSave = true;
  }

  // Ensure forceGoLive exists
  if (config.forceGoLive === undefined) {
    config.forceGoLive = false;
    needsSave = true;
  }

  // Ensure popupBgColor exists
  if (!config.popupBgColor) {
    config.popupBgColor = "#FFFFFF";
    needsSave = true;
  }

  // Ensure buttonColor exists
  if (!config.buttonColor) {
    config.buttonColor = "#000000";
    needsSave = true;
  }

  // Add createdDate to existing images if missing
  const updatedImages = config.images.map((img) => {
    if (!img.createdDate) {
      needsSave = true;
      return {
        ...img,
        createdDate: today,
      };
    }
    return img;
  });

  // Check for expired promos and move to pastPromos
  const activeImages: PromoImage[] = [];
  const expiredImages: PromoImage[] = [];

  for (const img of updatedImages) {
    if (img.expirationDate && img.expirationDate < today) {
      // Expired - move to past promos
      expiredImages.push({
        ...img,
        isArchived: true,
        lastUsedDate: img.lastUsedDate || today,
      });
      needsSave = true;
    } else {
      activeImages.push(img);
    }
  }

  // If expired images found, disable forceGoLive
  if (expiredImages.length > 0 && config.forceGoLive) {
    config.forceGoLive = false;
    needsSave = true;
  }

  // Merge expired images into pastPromos (avoid duplicates)
  const existingPastIds = new Set(
    config.pastPromos.map((p) => {
      return p.id;
    })
  );
  const newPastPromos = [
    ...config.pastPromos,
    ...expiredImages.filter((img) => {
      return !existingPastIds.has(img.id);
    }),
  ];

  return {
    config: {
      ...defaultConfig,
      ...config,
      images: activeImages,
      pastPromos: newPastPromos,
      type: activeImages.length <= 1 ? "single" : "carousel",
      forceGoLive: config.forceGoLive ?? false,
    },
    needsSave,
  };
}

// Write promo popup config to JSON file or Blob Storage
async function savePromoPopup(config: PromoPopupConfig): Promise<void> {
  const configJson = JSON.stringify(config, null, 2);

  // In production, use Blob Storage
  if (
    process.env.NODE_ENV === "production" &&
    process.env.BLOB_READ_WRITE_TOKEN
  ) {
    try {
      // Convert JSON string to Buffer for blob storage
      const buffer = Buffer.from(configJson, "utf-8");
      await put(PROMO_POPUP_BLOB_PATH, buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: "application/json",
        allowOverwrite: true,
      });
      return;
    } catch (error) {
      console.error("Error saving promo popup config to blob:", error);
      // Log the actual error for debugging
      if (error instanceof Error) {
        console.error("Blob save error details:", error.message, error.stack);
      }
      throw new Error(
        `Failed to save promo popup config to blob storage: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  // In development, use local file system
  try {
    await writeFile(PROMO_POPUP_FILE_PATH, configJson, "utf-8");
  } catch (error) {
    console.error("Error saving promo popup config:", error);
    throw new Error("Failed to save promo popup config");
  }
}

const promoImageSchema = z.object({
  image: z.instanceof(File, { message: "Image is required" }),
  alt: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Alt text is required" : "Invalid value",
    })
    .min(1),
});

interface PromoActionState {
  success?: boolean;
  error?: string;
  imageId?: string;
}

// Upload promo image
export async function uploadPromoImage(
  _prevState: PromoActionState,
  formData: FormData
): Promise<PromoActionState> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  // Check for Vercel Blob token
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      error:
        "Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN.",
    };
  }

  try {
    const alt = formData.get("alt") as string;
    const image = formData.get("image") as File;

    // Validate input
    const validation = promoImageSchema.safeParse({
      image,
      alt,
    });

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Invalid form data",
      };
    }

    // Validate image file
    if (!image.type.startsWith("image/")) {
      return {
        success: false,
        error: "File must be an image",
      };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (image.size > maxSize) {
      return {
        success: false,
        error: "Image size must be less than 10MB",
      };
    }

    // Generate unique ID
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const imageId = `promo-${timestamp}-${randomStr}`;

    // Get image dimensions using sharp
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 1200;
    const height = metadata.height || 1600;

    // Upload image to Vercel Blob
    const blobPrefix = process.env.CMS_BLOB_PREFIX || "promo";
    const blob = await put(`${blobPrefix}/${imageId}`, image, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Read existing config
    const config = await getPromoPopup();

    // Add new image with created date
    const today = new Date().toISOString().split("T")[0];
    const newImage: PromoImage = {
      id: imageId,
      src: blob.url,
      alt,
      height,
      width,
      createdDate: today,
      isArchived: false,
    };

    config.images.push(newImage);

    // If only one image, set type to 'single', otherwise 'carousel'
    if (config.images.length === 1) {
      config.type = "single";
    } else {
      config.type = "carousel";
    }

    // Save config
    await savePromoPopup(config);

    return {
      success: true,
      imageId: newImage.id,
    };
  } catch (error) {
    console.error("Error uploading promo image:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to upload promo image",
    };
  }
}

// Archive promo image (moves to pastPromos instead of deleting)
export async function deletePromoImage(
  imageId: string
): Promise<{ success: boolean; error?: string }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  try {
    // Read existing config
    const config = await getPromoPopup();

    // Find image to archive
    const imageToArchive = config.images.find((img) => {
      return img.id === imageId;
    });

    if (!imageToArchive) {
      return {
        success: false,
        error: "Image not found",
      };
    }

    // Don't delete blob - keep it for potential reinstatement
    // Move image to pastPromos with archive metadata
    const today = new Date().toISOString().split("T")[0];
    const archivedImage: PromoImage = {
      ...imageToArchive,
      isArchived: true,
      lastUsedDate: today,
      expirationDate: undefined, // Clear expiration when archiving
    };

    // Remove from active images
    config.images = config.images.filter((img) => {
      return img.id !== imageId;
    });

    // Add to pastPromos (avoid duplicates)
    const existingPastIds = new Set(
      config.pastPromos.map((p) => {
        return p.id;
      })
    );
    if (!existingPastIds.has(imageId)) {
      config.pastPromos.push(archivedImage);
    }

    // Update type if needed
    if (config.images.length === 0) {
      config.type = "single";
    } else if (config.images.length === 1) {
      config.type = "single";
    } else {
      config.type = "carousel";
    }

    // If archiving last image and forceGoLive is enabled, disable it
    if (config.images.length === 0 && config.forceGoLive) {
      config.forceGoLive = false;
    }

    // Save config
    await savePromoPopup(config);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error archiving promo image:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to archive promo image",
    };
  }
}

// Permanently delete a promo image (from pastPromos)
export async function permanentlyDeletePromoImage(
  imageId: string
): Promise<{ success: boolean; error?: string }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  try {
    // Read existing config
    const config = await getPromoPopup();

    // Find image in pastPromos
    const imageToDelete = config.pastPromos.find((img) => {
      return img.id === imageId;
    });

    if (!imageToDelete) {
      return {
        success: false,
        error: "Image not found in past promos",
      };
    }

    // Delete blob if it's a Vercel Blob URL
    if (
      imageToDelete.src.startsWith("https://") &&
      process.env.BLOB_READ_WRITE_TOKEN
    ) {
      try {
        // Extract blob pathname from URL
        const url = new URL(imageToDelete.src);
        const blobPath = url.pathname.substring(1); // Remove leading slash
        await del(blobPath, {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
      } catch (blobError) {
        // Log but don't fail if blob deletion fails
        console.error("Error deleting blob:", blobError);
      }
    }

    // Remove from pastPromos
    config.pastPromos = config.pastPromos.filter((img) => {
      return img.id !== imageId;
    });

    // Save config
    await savePromoPopup(config);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error permanently deleting promo image:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to permanently delete promo image",
    };
  }
}

// Reinstate a past promo image with duration
export async function reinstatePromoImage(
  imageId: string,
  durationDays: number
): Promise<{ success: boolean; error?: string }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  if (durationDays < 1) {
    return {
      success: false,
      error: "Duration must be at least 1 day",
    };
  }

  try {
    // Read existing config
    const config = await getPromoPopup();

    // Find image in pastPromos
    const imageToReinstate = config.pastPromos.find((img) => {
      return img.id === imageId;
    });

    if (!imageToReinstate) {
      return {
        success: false,
        error: "Image not found in past promos",
      };
    }

    // Calculate expiration date
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(expirationDate.getDate() + durationDays);
    const expirationDateStr = expirationDate.toISOString().split("T")[0];

    // Remove from pastPromos
    config.pastPromos = config.pastPromos.filter((img) => {
      return img.id !== imageId;
    });

    // Add to active images with expiration and forceGoLive
    const reinstatedImage: PromoImage = {
      ...imageToReinstate,
      isArchived: false,
      expirationDate: expirationDateStr,
      lastUsedDate: today.toISOString().split("T")[0],
    };

    // Avoid duplicates
    const existingActiveIds = new Set(
      config.images.map((img) => {
        return img.id;
      })
    );
    if (!existingActiveIds.has(imageId)) {
      config.images.push(reinstatedImage);
    }

    // Update type based on active images count
    if (config.images.length === 0) {
      config.type = "single";
    } else if (config.images.length === 1) {
      config.type = "single";
    } else {
      config.type = "carousel";
    }

    // Enable forceGoLive automatically when reinstating
    config.forceGoLive = true;

    // Save config
    await savePromoPopup(config);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error reinstating promo image:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to reinstate promo image",
    };
  }
}

// Update promo image details (alt text, links)
export async function updatePromoImage(
  imageId: string,
  alt?: string,
  linkUrl?: string | null,
  linkText?: string | null
): Promise<{ success: boolean; error?: string }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  try {
    // Read existing config
    const config = await getPromoPopup();

    // Find image in active images or pastPromos
    let imageToUpdate: PromoImage | undefined;
    let isInActive = false;

    imageToUpdate = config.images.find((img) => {
      return img.id === imageId;
    });
    if (imageToUpdate) {
      isInActive = true;
    } else {
      imageToUpdate = config.pastPromos.find((img) => {
        return img.id === imageId;
      });
    }

    if (!imageToUpdate) {
      return {
        success: false,
        error: "Image not found",
      };
    }

    // Update image properties
    const updatedImage: PromoImage = {
      ...imageToUpdate,
      ...(alt !== undefined && { alt }),
    };

    // Update config properties if provided
    if (linkUrl !== undefined) {
      config.linkUrl = linkUrl;
    }
    if (linkText !== undefined) {
      config.linkText = linkText;
    }

    // Replace image in the appropriate array
    if (isInActive) {
      config.images = config.images.map((img) => {
        return img.id === imageId ? updatedImage : img;
      });
    } else {
      config.pastPromos = config.pastPromos.map((img) => {
        return img.id === imageId ? updatedImage : img;
      });
    }

    // Save config
    await savePromoPopup(config);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating promo image:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update promo image",
    };
  }
}

// Update promo popup config
export async function updatePromoPopupConfigAction(
  _prevState: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const enabled = formData.get("enabled") === "true";
  const linkUrl = formData.get("linkUrl") as string | null;
  const linkText = formData.get("linkText") as string | null;
  const popupBgColor = formData.get("popupBgColor") as string | undefined;
  const buttonColor = formData.get("buttonColor") as string | undefined;

  return await updatePromoPopupConfig(
    enabled,
    linkUrl || null,
    linkText || null,
    popupBgColor,
    buttonColor
  );
}

export async function updatePromoPopupConfig(
  enabled: boolean,
  linkUrl: string | null,
  linkText: string | null,
  popupBgColor?: string,
  buttonColor?: string
): Promise<{ success: boolean; error?: string }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  try {
    const config = await getPromoPopup();
    config.enabled = enabled;
    config.linkUrl = linkUrl || null;
    config.linkText = linkText || null;
    if (popupBgColor !== undefined) {
      config.popupBgColor = popupBgColor || "#FFFFFF";
    }
    if (buttonColor !== undefined) {
      config.buttonColor = buttonColor || "#000000";
    }

    await savePromoPopup(config);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating promo popup config:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update promo popup config",
    };
  }
}

// Migrate promo popup from JSON file to Blob Storage (manual migration)
export async function migratePromoToBlob(): Promise<{
  success: boolean;
  error?: string;
}> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  // Only run in production
  if (
    process.env.NODE_ENV !== "production" ||
    !process.env.BLOB_READ_WRITE_TOKEN
  ) {
    return {
      success: false,
      error:
        "Migration only works in production with BLOB_READ_WRITE_TOKEN set",
    };
  }

  try {
    // Check if blob already exists
    const { list } = await import("@vercel/blob");
    const blobs = await list({
      prefix: PROMO_POPUP_BLOB_PATH,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (blobs.blobs.length > 0) {
      return {
        success: false,
        error: "Promo popup already migrated to blob storage",
      };
    }

    // Read from JSON file
    const fileContents = await readFile(PROMO_POPUP_FILE_PATH, "utf-8");
    const config = JSON.parse(fileContents) as PromoPopupConfig;

    // Save to blob storage
    await savePromoPopup({
      enabled: config.enabled ?? false,
      type: config.type ?? "single",
      images: config.images ?? [],
      pastPromos: config.pastPromos ?? [],
      linkUrl: config.linkUrl ?? null,
      linkText: config.linkText ?? null,
      popupBgColor: config.popupBgColor ?? "#FFFFFF",
      buttonColor: config.buttonColor ?? "#000000",
      forceGoLive: config.forceGoLive ?? false,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error migrating promo popup:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to migrate promo popup",
    };
  }
}

// Toggle forceGoLive for promo popup
// Force push promo popup (enable forceGoLive)
export async function forcePushPromo(): Promise<{
  success: boolean;
  error?: string;
}> {
  return togglePromoForceGoLive(true);
}

export async function togglePromoForceGoLive(
  forceGoLive: boolean
): Promise<{ success: boolean; error?: string }> {
  // Check authentication
  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  try {
    const config = await getPromoPopup();
    config.forceGoLive = forceGoLive;

    await savePromoPopup(config);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error toggling promo force go live:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to toggle force go live",
    };
  }
}
