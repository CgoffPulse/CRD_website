"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadPromoImage } from "../actions/promoPopup";

const promoImageSchema = z.object({
  alt: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Image description is required"
          : "Invalid value",
    })
    .min(1),
});

interface UploadState {
  success?: boolean;
  error?: string;
  imageId?: string;
}

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full cursor-pointer" disabled={pending} type="submit">
      {pending ? "Uploading..." : "Upload Promo Image"}
    </Button>
  );
}

export function PromoImageUploadForm() {
  const router = useRouter();
  const [state, formAction] = useActionState<UploadState, FormData>(
    uploadPromoImage,
    {}
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFile = (file: File) => {
    setClientError(null);

    if (!file.type.startsWith("image/")) {
      setClientError("File must be an image");
      return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setClientError("Image size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
      if (fileInputRef.current) {
        try {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(files[0]);
          fileInputRef.current.files = dataTransfer.files;
          const event = new Event("change", { bubbles: true });
          fileInputRef.current.dispatchEvent(event);
        } catch (error) {
          console.warn("Could not set file input value:", error);
        }
      }
    }
  };

  // Handle successful upload
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setPreview(null);
      setClientError(null);
      setTimeout(() => {
        router.refresh();
      }, 500);
    }
  }, [state, router]);

  // Clear client error when state changes
  useEffect(() => {
    if (state?.error || state?.success) {
      setClientError(null);
    }
  }, [state]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Promo Image</CardTitle>
        <CardDescription>
          Upload promotional images for the homepage popup. Upload multiple
          images to create a carousel.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData: FormData) => {
            // Client-side validation with Zod v4
            const alt = formData.get("alt") as string;

            const result = promoImageSchema.safeParse({ alt });

            if (!result.success) {
              const firstError = result.error.issues[0];
              if (firstError) {
                setClientError(firstError.message || "Validation failed");
              }
              return;
            }

            // File validation
            const fileInput = formRef.current?.querySelector(
              'input[type="file"]'
            ) as HTMLInputElement;
            if (!fileInput?.files || fileInput.files.length === 0) {
              setClientError("Image is required");
              return;
            }

            const file = fileInput.files[0];
            if (!file.type.startsWith("image/")) {
              setClientError("File must be an image");
              return;
            }

            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
              setClientError("Image size must be less than 10MB");
              return;
            }

            setClientError(null);
            await formAction(formData);
          }}
          className="space-y-4"
          ref={formRef}
        >
          <div className="space-y-2">
            <Label htmlFor="alt">Image Description (Alt Text)</Label>
            <Input
              className="bg-background text-foreground"
              id="alt"
              name="alt"
              placeholder="e.g., Special Offer - 20% Off"
              required
              type="text"
            />
            <p className="text-muted-foreground text-xs">
              This will be used as the alt text for accessibility
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Promo Image</Label>
            <div
              aria-label="Upload image file"
              className={`rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200 ${isDragging ? "scale-[1.02] border-primary bg-primary/10" : "border-muted-foreground/25"}cursor-pointer hover:border-primary/50 hover:bg-muted/50`}
              onClick={() => {
                fileInputRef.current?.click();
              }}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              ref={dropZoneRef}
              role="button"
              tabIndex={0}
            >
              <input
                accept="image/*"
                className="hidden"
                id="image"
                name="image"
                onChange={handleFileChange}
                ref={fileInputRef}
                required
                type="file"
              />
              <div className="space-y-2">
                <p className="font-medium text-sm">
                  {isDragging ? (
                    <span className="text-primary">Drop image here</span>
                  ) : (
                    "Drag and drop an image here, or click to select"
                  )}
                </p>
                <p className="text-muted-foreground text-xs">
                  Maximum file size: 10MB per image. Supported formats: JPG,
                  PNG, WebP
                </p>
              </div>
            </div>
          </div>

          {preview && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="max-w-md overflow-hidden rounded-lg border">
                <img alt="Preview" className="h-auto w-full" src={preview} />
              </div>
            </div>
          )}

          {clientError && (
            <p className="font-medium text-destructive text-sm">
              {clientError}
            </p>
          )}
          {state?.error && (
            <p className="font-medium text-destructive text-sm">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="font-medium text-green-600 text-sm">
              Promo image uploaded successfully!
            </p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
