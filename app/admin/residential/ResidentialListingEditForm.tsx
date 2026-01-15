'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { updateResidentialListing } from '../actions/residentialListings';
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
import type { ResidentialListing } from '../types/listings';

interface ResidentialListingEditFormProps {
  listing: ResidentialListing;
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

export function ResidentialListingEditForm({
  listing,
  open,
  onOpenChange,
}: ResidentialListingEditFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState<UpdateState, FormData>(
    updateResidentialListing,
    {}
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(listing.imageSrc);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(listing.galleryImages || []);
  const [bullets, setBullets] = useState<string[]>(
    listing.bullets.length > 0 ? listing.bullets : ['']
  );
  const [agents, setAgents] = useState<Array<{ name: string; email?: string; phone?: string }>>(
    listing.agents && listing.agents.length > 0 ? listing.agents : [{ name: '' }]
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

  const addAgent = () => {
    setAgents([...agents, { name: '' }]);
  };

  const removeAgent = (index: number) => {
    setAgents(agents.filter((_, i) => i !== index));
  };

  const updateAgent = (index: number, field: 'name' | 'email' | 'phone', value: string) => {
    const newAgents = [...agents];
    newAgents[index] = { ...newAgents[index], [field]: value };
    setAgents(newAgents);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Residential Listing</DialogTitle>
          <DialogDescription>
            Update the listing details below
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          action={async (formData: FormData) => {
            formData.set('id', listing.id);
            formData.set('bullets', JSON.stringify(bullets.filter((b) => b.trim())));
            formData.set('agents', JSON.stringify(agents.filter((a) => a.name.trim())));
            await formAction(formData);
          }}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input id="edit-title" name="title" defaultValue={listing.title} required className="bg-background text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price *</Label>
              <Input id="edit-price" name="price" defaultValue={listing.price} required className="bg-background text-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-location">Location *</Label>
            <Input id="edit-location" name="location" defaultValue={listing.location} required className="bg-background text-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea id="edit-description" name="description" rows={6} defaultValue={listing.description || ''} className="bg-background text-foreground" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-mlsNumber">MLS Number</Label>
              <Input id="edit-mlsNumber" name="mlsNumber" defaultValue={listing.mlsNumber || ''} className="bg-background text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-office">Office</Label>
              <Input id="edit-office" name="office" defaultValue={listing.office || ''} className="bg-background text-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-officePhone">Office Phone</Label>
            <Input id="edit-officePhone" name="officePhone" defaultValue={listing.officePhone || ''} className="bg-background text-foreground" />
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
            <Label>Agents</Label>
            {agents.map((agent, index) => (
              <div key={index} className="grid gap-2 md:grid-cols-3 border p-2 rounded">
                <Input
                  placeholder="Name"
                  value={agent.name}
                  onChange={(e) => updateAgent(index, 'name', e.target.value)}
                  className="bg-background text-foreground"
                />
                <Input
                  placeholder="Email"
                  value={agent.email || ''}
                  onChange={(e) => updateAgent(index, 'email', e.target.value)}
                  className="bg-background text-foreground"
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Phone"
                    value={agent.phone || ''}
                    onChange={(e) => updateAgent(index, 'phone', e.target.value)}
                    className="bg-background text-foreground"
                  />
                  {agents.length > 1 && (
                    <Button type="button" variant="outline" onClick={() => removeAgent(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addAgent}>
              Add Agent
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

          <PropertyDetailsForm type="residential" defaultValue={listing.propertyDetails} />

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
