'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import { uploadEventFlyer } from '../actions/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const eventUploadSchema = z.object({
  name: z.string({ error: (issue) => issue.input === undefined ? 'Event name is required' : 'Invalid value' }).min(1),
  eventDate: z.string({ error: (issue) => issue.input === undefined ? 'Event date is required' : 'Invalid value' }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  goLiveDays: z.string().optional(),
});

type UploadState = {
  success?: boolean;
  error?: string;
  eventId?: string;
};

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full cursor-pointer">
      {pending ? 'Uploading...' : 'Upload Event Flyer'}
    </Button>
  );
}

export function EventUploadForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<UploadState, FormData>(
    uploadEventFlyer,
    {
      success: false,
    }
  );
  const [flyerType, setFlyerType] = useState<'single' | 'multi'>('single');
  const [preview, setPreview] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [clientError, setClientError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Use react-dropzone for file handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setClientError(null);
    
    // Validate files
    for (const file of acceptedFiles) {
      if (!file.type.startsWith('image/')) {
        setClientError('All files must be images');
        return;
      }
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setClientError('Each image size must be less than 10MB');
        return;
      }
    }

    // Check single-page constraint
    if (flyerType === 'single' && acceptedFiles.length > 1) {
      setClientError('Please select only one image for single-page flyer');
      return;
    }

    // Update previews
    if (flyerType === 'single') {
      const file = acceptedFiles[0];
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
      const readers = acceptedFiles.map((file) => {
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
  }, [flyerType]);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: flyerType === 'multi',
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  // Handle successful upload
  useEffect(() => {
    if (state?.success) {
      // Show uploaded image preview(s)
      if (flyerType === 'single' && preview) {
        setUploadedImageUrl(preview);
      } else if (flyerType === 'multi' && previews.length > 0) {
        setUploadedImageUrls(previews);
      }
      // Reset form
      formRef.current?.reset();
      setClientError(null);
      // Clear preview after showing success
      setTimeout(() => {
        setPreview(null);
        setPreviews([]);
        setUploadedImageUrl(null);
        setUploadedImageUrls([]);
      }, 3000);
      router.refresh();
    }
  }, [state, preview, previews, flyerType, router]);

  // Clear client error when state changes
  useEffect(() => {
    if (state?.error || state?.success) {
      setClientError(null);
    }
  }, [state]);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload New Event Flyer</CardTitle>
        <CardDescription>
          Upload a flyer image with a name and event date. The flyer will automatically appear in
          the upcoming events section and move to past events when the date passes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          ref={formRef} 
          action={async (formData: FormData) => {
            // Client-side validation with Zod v4
            const name = formData.get('name') as string;
            const eventDate = formData.get('eventDate') as string;
            const goLiveDays = formData.get('goLiveDays') as string;

            const result = eventUploadSchema.safeParse({
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
          <input type="hidden" name="flyerType" value={flyerType} />
          <div className="space-y-2">
            <Label htmlFor="name">Event Name (Alt Text)</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Summer Event 2025"
              required
              className="bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground">
              This will be used as the alt text for accessibility
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate">Event Date</Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="date"
              required
              className="bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Events will automatically move to past events after this date
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goLiveDays">When to Go Live (# of Days)</Label>
            <Input
              id="goLiveDays"
              name="goLiveDays"
              type="number"
              min="1"
              defaultValue="15"
              className="bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Number of days before the event date to show the flyer (default: 15 days)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Flyer Type</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="flyerType"
                  value="single"
                  checked={flyerType === 'single'}
                  onChange={(e) => {
                    setFlyerType(e.target.value as 'single' | 'multi');
                    setPreview(null);
                    setPreviews([]);
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm">Single-page</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="flyerType"
                  value="multi"
                  checked={flyerType === 'multi'}
                  onChange={(e) => {
                    setFlyerType(e.target.value as 'single' | 'multi');
                    setPreview(null);
                    setPreviews([]);
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm">Multi-page (carousel)</span>
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              {flyerType === 'single'
                ? 'Upload a single image flyer'
                : 'Upload multiple images that will be displayed in a carousel'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Flyer Image{flyerType === 'multi' ? 's' : ''}</Label>
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
                ${isDragActive ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-muted-foreground/25'}
                cursor-pointer hover:border-primary/50 hover:bg-muted/50
              `}
            >
              <input {...getInputProps({ id: 'image', name: 'image', required: true })} />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {isDragActive ? (
                    <span className="text-primary">
                      Drop {flyerType === 'multi' ? 'images' : 'image'} here
                    </span>
                  ) : (
                    `Drag and drop ${flyerType === 'multi' ? 'images' : 'an image'} here, or click to select`
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 10MB per image. Supported formats: JPG, PNG, WebP
                  {flyerType === 'multi' && ' (Select multiple images)'}
                </p>
              </div>
            </div>
          </div>

          {flyerType === 'single' && preview && !uploadedImageUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg overflow-hidden max-w-md">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {flyerType === 'multi' && previews.length > 0 && uploadedImageUrls.length === 0 && (
            <div className="space-y-2">
              <Label>Preview ({previews.length} image{previews.length > 1 ? 's' : ''})</Label>
              <div className="grid grid-cols-2 gap-4 max-w-2xl">
                {previews.map((previewUrl, index) => {
                  return (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <img
                        src={previewUrl}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-auto"
                      />
                      <p className="text-xs text-center p-2 text-muted-foreground">
                        Page {index + 1}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {flyerType === 'single' && uploadedImageUrl && state?.success && (
            <div className="space-y-2">
              <Label>Successfully Uploaded!</Label>
              <div className="border-2 border-green-500 rounded-lg overflow-hidden max-w-md">
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {flyerType === 'multi' && uploadedImageUrls.length > 0 && state?.success && (
            <div className="space-y-2">
              <Label>Successfully Uploaded! ({uploadedImageUrls.length} image{uploadedImageUrls.length > 1 ? 's' : ''})</Label>
              <div className="grid grid-cols-2 gap-4 max-w-2xl">
                {uploadedImageUrls.map((url, index) => {
                  return (
                    <div key={index} className="border-2 border-green-500 rounded-lg overflow-hidden">
                      <img
                        src={url}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-auto"
                      />
                      <p className="text-xs text-center p-2 text-green-600 font-medium">
                        Page {index + 1}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {clientError && (
            <p className="text-sm text-destructive font-medium">{clientError}</p>
          )}
          {state?.error && (
            <p className="text-sm text-destructive font-medium">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-green-600 font-medium">
              Event uploaded successfully!
            </p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
