'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState, useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { createCommercialListing } from '../actions/commercialListings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PropertyDetailsForm } from '../components/PropertyDetailsForm';

type UploadState = {
  success?: boolean;
  error?: string;
  listingId?: string;
};

type OptimisticListing = {
  id: string;
  title: string;
  mode: 'Buy' | 'Lease';
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full cursor-pointer">
      {pending ? 'Creating...' : 'Create Listing'}
    </Button>
  );
}

export function CommercialListingUploadForm() {
  const router = useRouter();
  const [state, formAction] = useActionState<UploadState, FormData>(
    createCommercialListing,
    {}
  );
  const [optimisticListings, updateOptimisticListings] = useOptimistic<
    OptimisticListing[],
    { type: 'add'; listing: OptimisticListing } | { type: 'clear' }
  >([], (current, action) => {
    if (action.type === 'clear') {
      return [];
    }
    return [...current, action.listing];
  });
  const [isLease, setIsLease] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [bullets, setBullets] = useState<string[]>(['']);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverPreview(reader.result as string);
        };
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    multiple: false,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
  });

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps,
    isDragActive: isGalleryDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const readers = acceptedFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then((results) => {
        setGalleryPreviews([...galleryPreviews, ...results]);
      });
    },
    multiple: true,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
  });

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setCoverPreview(null);
      setGalleryPreviews([]);
      setBullets(['']);
      setIsLease(false);
      updateOptimisticListings({ type: 'clear' });
      router.refresh();
    }
  }, [state, router, updateOptimisticListings]);

  const addBullet = () => {
    setBullets([...bullets, '']);
  };

  const removeBullet = (index: number) => {
    setBullets(bullets.filter((_, i) => i !== index));
  };

  const updateBullet = (index: number, value: string) => {
    const newBullets = [...bullets];
    newBullets[index] = value;
    setBullets(newBullets);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Commercial Listing</CardTitle>
        <CardDescription>
          Add a new commercial property listing (buy or lease)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {optimisticListings.length > 0 && (
          <div className="mb-6 rounded border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-black mb-2">Pending uploads</p>
            <ul className="space-y-1 text-sm text-gray-700">
              {optimisticListings.map((listing) => (
                <li key={listing.id} className="flex items-center justify-between">
                  <span className="font-medium text-black">{listing.title}</span>
                  <span className="text-gray-600">{listing.mode}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <form
          ref={formRef}
          action={async (formData: FormData) => {
            const title = (formData.get('title') as string) || 'New Listing';
            updateOptimisticListings({
              type: 'add',
              listing: {
                id: String(Date.now()),
                title,
                mode: isLease ? 'Lease' : 'Buy',
              },
            });
            formData.set('isLease', isLease.toString());
            formData.set('bullets', JSON.stringify(bullets.filter((b) => b.trim())));
            await formAction(formData);
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label>Listing Type</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!isLease}
                  onChange={() => setIsLease(false)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Buy</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isLease}
                  onChange={() => setIsLease(true)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Lease</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" required className="bg-background text-foreground" />
          </div>

          {isLease ? (
            <div className="space-y-2">
              <Label htmlFor="leaseRate">Lease Rate *</Label>
              <Input id="leaseRate" name="leaseRate" placeholder="$X,XXX/month" required className="bg-background text-foreground" />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input id="price" name="price" placeholder="$1,000,000" required className="bg-background text-foreground" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input id="location" name="location" placeholder="201 E Walnut St #11, Rogers, AR 72756" required className="bg-background text-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={6} className="bg-background text-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mlsNumber">MLS Number</Label>
            <Input id="mlsNumber" name="mlsNumber" className="bg-background text-foreground" />
          </div>

          <div className="space-y-2">
            <Label>Bullets</Label>
            {bullets.map((bullet, index) => (
              <div key={`${index}-${bullet}`} className="flex gap-2">
                <Input
                  value={bullet}
                  onChange={(e) => updateBullet(index, e.target.value)}
                  placeholder={`Bullet point ${index + 1}`}
                  className="bg-background text-foreground"
                />
                {bullets.length > 1 && (
                  <Button type="button" variant="outline" onClick={() => removeBullet(index)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addBullet}>
              Add Bullet
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image *</Label>
            <div
              {...getCoverRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                isCoverDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
              }`}
            >
              <input {...getCoverInputProps({ id: 'coverImage', name: 'coverImage', required: true })} />
              {coverPreview ? (
                <img src={coverPreview} alt="Preview" className="max-h-48 mx-auto rounded" />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Drag and drop cover image here, or click to select
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="galleryImages">Gallery Images</Label>
            <div
              {...getGalleryRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                isGalleryDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
              }`}
            >
              <input {...getGalleryInputProps({ id: 'galleryImages', name: 'galleryImages' })} />
              <p className="text-sm text-muted-foreground">
                Drag and drop gallery images here, or click to select (multiple)
              </p>
            </div>
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {galleryPreviews.map((preview, index) => (
                  <img key={preview} src={preview} alt={`Preview ${index + 1}`} className="rounded" />
                ))}
              </div>
            )}
          </div>

          <PropertyDetailsForm type="commercial" />

          {state?.error && (
            <p className="text-sm text-destructive font-medium">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-green-600 font-medium">Listing created successfully!</p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
