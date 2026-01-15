'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import Image from 'next/image';
import { updateEvent } from '../actions/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { EventPoster } from '../types/eventPosters';
import { groupEventPosters } from '../types/eventPosters';

const eventEditSchema = z.object({
  name: z.string({ error: (issue) => issue.input === undefined ? 'Event name is required' : 'Invalid value' }).min(1),
  eventDate: z.string({ error: (issue) => issue.input === undefined ? 'Event date is required' : 'Invalid value' }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  goLiveDays: z.string().optional(),
});

type UpdateState = {
  success?: boolean;
  error?: string;
  eventId?: string;
};

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full cursor-pointer">
      {pending ? 'Updating...' : 'Update Event'}
    </Button>
  );
}

interface EventEditFormProps {
  event: EventPoster;
  allEvents: EventPoster[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventEditForm({ event, allEvents, open, onOpenChange }: EventEditFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState<UpdateState, FormData>(
    updateEvent,
    {}
  );
  
  // Determine if this is a multi-page event
  const NUMERIC_SUFFIX_REGEX = /\d+$/;
  const baseId = event.id.replace(NUMERIC_SUFFIX_REGEX, '');
  const groupedEvents = groupEventPosters(allEvents);
  const eventGroup = groupedEvents.find((g) => {
    return g.baseId === baseId;
  });
  const isMultiPage = eventGroup ? eventGroup.posters.length > 1 : false;
  
  const [flyerType, setFlyerType] = useState<'single' | 'multi'>(isMultiPage ? 'multi' : 'single');
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
        fileInputRef.current.value = '';
      }
      setFlyerType(isMultiPage ? 'multi' : 'single');
    }
  }, [open, event.id, isMultiPage]);

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
      if (!file.type.startsWith('image/')) {
        setClientError('All files must be images');
        return;
      }

      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setClientError('Each image size must be less than 10MB');
        return;
      }
    }

    // Read all files
    if (flyerType === 'single') {
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
      if (flyerType === 'single' && files.length > 1) {
        setClientError('Please select only one image for single-page flyer');
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
      if (flyerType === 'single' && files.length > 1) {
        setClientError('Please drop only one image for single-page flyer');
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
          console.warn('Could not set file input value:', error);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update event details. You can optionally replace the images.
          </DialogDescription>
        </DialogHeader>
        <form 
          ref={formRef} 
          action={async (formData: FormData) => {
            // Client-side validation with Zod v4
            const name = formData.get('name') as string;
            const eventDate = formData.get('eventDate') as string;
            const goLiveDays = formData.get('goLiveDays') as string;

            const result = eventEditSchema.safeParse({
              name,
              eventDate,
              goLiveDays,
            });

            if (!result.success) {
              const firstError = result.error.issues[0];
              if (firstError) {
                setClientError(firstError.message || 'Validation failed');
              }
              return;
            }

            setClientError(null);
            await formAction(formData);
          }}
          className="space-y-4"
        >
          <input type="hidden" name="eventId" value={event.id} />
          <input type="hidden" name="flyerType" value={flyerType} />
          <input type="hidden" name="hasNewImages" value={replaceImages ? 'true' : 'false'} />
          <div className="space-y-2">
            <Label htmlFor="edit-name">Event Name (Alt Text)</Label>
            <Input
              id="edit-name"
              name="name"
              type="text"
              defaultValue={event.alt}
              required
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-eventDate">Event Date</Label>
            <Input
              id="edit-eventDate"
              name="eventDate"
              type="date"
              defaultValue={event.eventDate}
              required
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-goLiveDays">Go Live Days</Label>
            <Input
              id="edit-goLiveDays"
              name="goLiveDays"
              type="number"
              min="1"
              defaultValue={event.goLiveDays || 15}
              className="bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Number of days before the event date to show the flyer (default: 15 days)
            </p>
          </div>

          {/* Current Images Display */}
          <div className="space-y-2">
            <Label>Current Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {currentImages.map((img) => {
                return (
                  <div key={img.id} className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
                    {img.src.startsWith('https://') ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Replace Images Checkbox */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={replaceImages}
                onChange={(e) => {
                  setReplaceImages(e.target.checked);
                  if (!e.target.checked) {
                    setPreview(null);
                    setPreviews([]);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }
                }}
                className="w-4 h-4"
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
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="edit-flyerType"
                      value="single"
                      checked={flyerType === 'single'}
                      onChange={(e) => {
                        setFlyerType(e.target.value as 'single' | 'multi');
                        setPreview(null);
                        setPreviews([]);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Single-page</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="edit-flyerType"
                      value="multi"
                      checked={flyerType === 'multi'}
                      onChange={(e) => {
                        setFlyerType(e.target.value as 'single' | 'multi');
                        setPreview(null);
                        setPreviews([]);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Multi-page</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">
                  {flyerType === 'single' ? 'Image' : 'Images'}
                </Label>
                <div
                  ref={dropZoneRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/10'
                      : 'border-muted-foreground/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    id="edit-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    multiple={flyerType === 'multi'}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-image"
                    className="cursor-pointer block"
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      {flyerType === 'single'
                        ? 'Click to upload or drag and drop'
                        : 'Click to upload multiple images or drag and drop'}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }}
                      className="cursor-pointer"
                    >
                      Select {flyerType === 'single' ? 'Image' : 'Images'}
                    </Button>
                  </label>
                </div>

                {/* Preview Section */}
                {preview && (
                  <div className="mt-4">
                    <Label>Preview</Label>
                    <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg border mt-2">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {previews.length > 0 && (
                  <div className="mt-4">
                    <Label>Previews ({previews.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {previews.map((previewUrl, index) => {
                        return (
                          <div
                            key={index}
                            className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border"
                          >
                            <img
                              src={previewUrl}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
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
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {clientError}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
              }}
              className="cursor-pointer"
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
