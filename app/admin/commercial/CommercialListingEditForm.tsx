'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { updateCommercialListing } from '../actions/commercialListings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PropertyDetailsForm } from '../components/PropertyDetailsForm';
import type { CommercialListing } from '../types/listings';

interface CommercialListingEditFormProps {
  listing: CommercialListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UpdateState = {
  success?: boolean;
  error?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="cursor-pointer">
      {pending ? 'Updating...' : 'Update Listing'}
    </Button>
  );
}

export function CommercialListingEditForm({
  listing,
  open,
  onOpenChange,
}: CommercialListingEditFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState<UpdateState, FormData>(
    updateCommercialListing,
    {}
  );
  const [isLease, setIsLease] = useState(listing.isLease || false);
  const [coverPreview, setCoverPreview] = useState<string | null>(listing.imageSrc);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(listing.galleryImages || []);
  const [bullets, setBullets] = useState<string[]>(
    listing.bullets.length > 0 ? listing.bullets : ['']
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
      onOpenChange(false);
    }
  }, [state, router, onOpenChange]);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Commercial Listing</DialogTitle>
          <DialogDescription>
            Update the listing details below
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          action={async (formData: FormData) => {
            formData.set('id', listing.id);
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
            <Label htmlFor="edit-title">Title *</Label>
            <Input id="edit-title" name="title" defaultValue={listing.title} required className="bg-background text-foreground" />
          </div>

          {isLease ? (
            <div className="space-y-2">
              <Label htmlFor="edit-leaseRate">Lease Rate *</Label>
              <Input id="edit-leaseRate" name="leaseRate" defaultValue={listing.leaseRate || ''} required className="bg-background text-foreground" />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price *</Label>
              <Input id="edit-price" name="price" defaultValue={listing.price || ''} required className="bg-background text-foreground" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="edit-location">Location *</Label>
            <Input id="edit-location" name="location" defaultValue={listing.location} required className="bg-background text-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea id="edit-description" name="description" rows={6} defaultValue={listing.description || ''} className="bg-background text-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-mlsNumber">MLS Number</Label>
            <Input id="edit-mlsNumber" name="mlsNumber" defaultValue={listing.mlsNumber || ''} className="bg-background text-foreground" />
          </div>

          <div className="space-y-2">
            <Label>Bullets</Label>
            {bullets.map((bullet, index) => (
              <div key={index} className="flex gap-2">
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
            <Label htmlFor="edit-coverImage">Cover Image</Label>
            <div
              {...getCoverRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                isCoverDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
              }`}
            >
              <input {...getCoverInputProps({ id: 'edit-coverImage', name: 'coverImage' })} />
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
            <Label htmlFor="edit-galleryImages">Gallery Images</Label>
            <div
              {...getGalleryRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                isGalleryDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
              }`}
            >
              <input {...getGalleryInputProps({ id: 'edit-galleryImages', name: 'galleryImages' })} />
              <p className="text-sm text-muted-foreground">
                Drag and drop gallery images here, or click to select (multiple)
              </p>
            </div>
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {galleryPreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index + 1}`} className="rounded" />
                ))}
              </div>
            )}
          </div>

          <PropertyDetailsForm type="commercial" defaultValue={listing.propertyDetails} />

          {state?.error && (
            <p className="text-sm text-destructive font-medium">{state.error}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
