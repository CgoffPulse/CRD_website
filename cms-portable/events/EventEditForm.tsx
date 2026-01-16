"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEvent } from "../actions/events";
import type { EventPoster } from "../types/eventPosters";
import { groupEventPosters } from "../types/eventPosters";

const eventEditSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Event name is required" : "Invalid value",
    })
    .min(1),
  eventDate: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Event date is required" : "Invalid value",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  goLiveDays: z.string().optional(),
});

interface UpdateState {
  success?: boolean;
  error?: string;
  eventId?: string;
}

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full cursor-pointer" disabled={pending} type="submit">
      {pending ? "Updating..." : "Update Event"}
    </Button>
  );
}

interface EventEditFormProps {
  event: EventPoster;
  allEvents: EventPoster[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventEditForm({
  event,
  allEvents,
  open,
  onOpenChange,
}: EventEditFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState<UpdateState, FormData>(
    updateEvent,
    {}
  );

  // Determine if this is a multi-page event
  const NUMERIC_SUFFIX_REGEX = /\d+$/;
  const baseId = event.id.replace(NUMERIC_SUFFIX_REGEX, "");
  const groupedEvents = groupEventPosters(allEvents);
  const eventGroup = groupedEvents.find((g) => {
    return g.baseId === baseId;
  });
  const isMultiPage = eventGroup ? eventGroup.posters.length > 1 : false;

  const [flyerType, setFlyerType] = useState<"single" | "multi">(
    isMultiPage ? "multi" : "single"
  );
  const [replaceImages, setReplaceImages] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form when dialog opens/closes or event changes
  useEffect(() => {
    if (open) {
      setReplaceImages(false);
      setPreview(null);
      setPreviews([]);
      setClientError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFlyerType(isMultiPage ? "multi" : "single");
    }
  }, [open, isMultiPage]);

  // Handle success/error states
  useEffect(() => {
    if (state?.success) {
      router.refresh();
      onOpenChange(false);
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
      setReplaceImages(false);
      setPreview(null);
      setPreviews([]);
    } else if (state?.error) {
      setClientError(state.error);
    }
  }, [state, router, onOpenChange]);

  const handleFiles = (files: FileList | File[]) => {
    setClientError(null);
    const fileArray = Array.from(files);

    // Validate all files
    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) {
        setClientError("All files must be images");
        return;
      }

      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setClientError("Each image size must be less than 10MB");
        return;
      }
    }

    // Read all files
    if (flyerType === "single") {
      const file = fileArray[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setPreviews([]);
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Multi-page: read all files
      const readers = fileArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((results) => {
        setPreviews(results);
        setPreview(null);
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (flyerType === "single" && files.length > 1) {
        setClientError("Please select only one image for single-page flyer");
        return;
      }
      handleFiles(files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (flyerType === "single" && files.length > 1) {
        setClientError("Please drop only one image for single-page flyer");
        return;
      }

      // Set files to the input
      if (fileInputRef.current) {
        try {
          const dataTransfer = new DataTransfer();
          Array.from(files).forEach((file) => {
            dataTransfer.items.add(file);
          });
          fileInputRef.current.files = dataTransfer.files;
        } catch (error) {
          console.warn("Could not set file input value:", error);
        }
      }

      handleFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Get current images for display
  const currentImages = eventGroup ? eventGroup.posters : [event];

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update event details. You can optionally replace the images.
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (formData: FormData) => {
            // Client-side validation with Zod v4
            const name = formData.get("name") as string;
            const eventDate = formData.get("eventDate") as string;
            const goLiveDays = formData.get("goLiveDays") as string;

            const result = eventEditSchema.safeParse({
              name,
              eventDate,
              goLiveDays,
            });

            if (!result.success) {
              const firstError = result.error.issues[0];
              if (firstError) {
                setClientError(firstError.message || "Validation failed");
              }
              return;
            }

            setClientError(null);
            await formAction(formData);
          }}
          className="space-y-4"
          ref={formRef}
        >
          <input name="eventId" type="hidden" value={event.id} />
          <input name="flyerType" type="hidden" value={flyerType} />
          <input
            name="hasNewImages"
            type="hidden"
            value={replaceImages ? "true" : "false"}
          />
          <div className="space-y-2">
            <Label htmlFor="edit-name">Event Name (Alt Text)</Label>
            <Input
              className="bg-background text-foreground"
              defaultValue={event.alt}
              id="edit-name"
              name="name"
              required
              type="text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-eventDate">Event Date</Label>
            <Input
              className="bg-background text-foreground"
              defaultValue={event.eventDate}
              id="edit-eventDate"
              name="eventDate"
              required
              type="date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-goLiveDays">Go Live Days</Label>
            <Input
              className="bg-background text-foreground"
              defaultValue={event.goLiveDays || 15}
              id="edit-goLiveDays"
              min="1"
              name="goLiveDays"
              type="number"
            />
            <p className="text-muted-foreground text-xs">
              Number of days before the event date to show the flyer (default:
              15 days)
            </p>
          </div>

          {/* Current Images Display */}
          <div className="space-y-2">
            <Label>Current Images</Label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {currentImages.map((img) => {
                return (
                  <div
                    className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border"
                    key={img.id}
                  >
                    {img.src.startsWith("https://") ? (
                      <Image
                        alt={img.alt}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        src={img.src}
                      />
                    ) : (
                      <img
                        alt={img.alt}
                        className="h-full w-full object-cover"
                        src={img.src}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Replace Images Checkbox */}
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                checked={replaceImages}
                className="h-4 w-4"
                onChange={(e) => {
                  setReplaceImages(e.target.checked);
                  if (!e.target.checked) {
                    setPreview(null);
                    setPreviews([]);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }
                }}
                type="checkbox"
              />
              <span className="text-sm">Replace images</span>
            </label>
          </div>

          {/* Image Upload Section (only shown if replaceImages is true) */}
          {replaceImages && (
            <>
              <div className="space-y-2">
                <Label>Flyer Type</Label>
                <div className="flex gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      checked={flyerType === "single"}
                      className="h-4 w-4"
                      name="edit-flyerType"
                      onChange={(e) => {
                        setFlyerType(e.target.value as "single" | "multi");
                        setPreview(null);
                        setPreviews([]);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      type="radio"
                      value="single"
                    />
                    <span className="text-sm">Single-page</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      checked={flyerType === "multi"}
                      className="h-4 w-4"
                      name="edit-flyerType"
                      onChange={(e) => {
                        setFlyerType(e.target.value as "single" | "multi");
                        setPreview(null);
                        setPreviews([]);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      type="radio"
                      value="multi"
                    />
                    <span className="text-sm">Multi-page</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">
                  {flyerType === "single" ? "Image" : "Images"}
                </Label>
                <div
                  className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/10"
                      : "border-muted-foreground/50"
                  }`}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  ref={dropZoneRef}
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="edit-image"
                    multiple={flyerType === "multi"}
                    name="image"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type="file"
                  />
                  <label className="block cursor-pointer" htmlFor="edit-image">
                    <p className="mb-2 text-muted-foreground text-sm">
                      {flyerType === "single"
                        ? "Click to upload or drag and drop"
                        : "Click to upload multiple images or drag and drop"}
                    </p>
                    <Button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }}
                      type="button"
                      variant="outline"
                    >
                      Select {flyerType === "single" ? "Image" : "Images"}
                    </Button>
                  </label>
                </div>

                {/* Preview Section */}
                {preview && (
                  <div className="mt-4">
                    <Label>Preview</Label>
                    <div className="relative mt-2 aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg border">
                      <img
                        alt="Preview"
                        className="h-full w-full object-cover"
                        src={preview}
                      />
                    </div>
                  </div>
                )}

                {previews.length > 0 && (
                  <div className="mt-4">
                    <Label>Previews ({previews.length})</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                      {previews.map((previewUrl, index) => {
                        return (
                          <div
                            className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border"
                            key={index}
                          >
                            <img
                              alt={`Preview ${index + 1}`}
                              className="h-full w-full object-cover"
                              src={previewUrl}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {clientError && (
            <div className="rounded-md bg-destructive/10 p-3 text-destructive text-sm">
              {clientError}
            </div>
          )}

          <DialogFooter>
            <Button
              className="cursor-pointer"
              onClick={() => {
                onOpenChange(false);
              }}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
