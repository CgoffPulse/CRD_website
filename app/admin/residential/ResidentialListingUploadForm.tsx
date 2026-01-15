'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState, useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { createResidentialListing } from '../actions/residentialListings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

type UploadState = {
  success?: boolean;
  error?: string;
  listingId?: string;
};

type OptimisticListing = {
  id: string;
  title: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full cursor-pointer">
      {pending ? 'Creating...' : 'Create Listing'}
    </Button>
  );
}

export function ResidentialListingUploadForm() {
  const router = useRouter();
  const [state, formAction] = useActionState<UploadState, FormData>(
    createResidentialListing,
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
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [bullets, setBullets] = useState<string[]>(['']);
  const [agents, setAgents] = useState<Array<{ name: string; email?: string; phone?: string }>>([{ name: '' }]);
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
      setAgents([{ name: '' }]);
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Residential Listing</CardTitle>
        <CardDescription>
          Add a new residential property listing with all details
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
                  <span className="text-gray-600">Residential</span>
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
              },
            });
            formData.set('bullets', JSON.stringify(bullets.filter((b) => b.trim())));
            formData.set('agents', JSON.stringify(agents.filter((a) => a.name.trim())));
            await formAction(formData);
          }}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" required className="bg-background text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input id="price" name="price" placeholder="$160,000" required className="bg-background text-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input id="location" name="location" placeholder="21548 Walnut St, Garfield, AR 72732" required className="bg-background text-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={6} className="bg-background text-foreground" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mlsNumber">MLS Number</Label>
              <Input id="mlsNumber" name="mlsNumber" className="bg-background text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="office">Office</Label>
              <Input id="office" name="office" className="bg-background text-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="officePhone">Office Phone</Label>
            <Input id="officePhone" name="officePhone" className="bg-background text-foreground" />
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
            <Label>Agents</Label>
            {agents.map((agent, index) => (
              <div key={`${index}-${agent.name}`} className="grid gap-2 md:grid-cols-3 border p-2 rounded">
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

          <div className="space-y-2">
            <Label htmlFor="propertyDetails">Property Details (JSON)</Label>
            <Textarea
              id="propertyDetails"
              name="propertyDetails"
              rows={10}
              placeholder='{"interior": {"heating": "Central"}, "property": {"levels": "Two"}}'
              className="bg-background text-foreground font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Enter property details as JSON. Leave empty if not needed.
            </p>
          </div>

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
