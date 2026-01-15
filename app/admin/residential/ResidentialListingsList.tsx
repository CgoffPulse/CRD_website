'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deleteResidentialListing } from '../actions/residentialListings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResidentialListingEditForm } from './ResidentialListingEditForm';
import type { ResidentialListing } from '../types/listings';

interface ResidentialListingsListProps {
  listings: ResidentialListing[];
}

export function ResidentialListingsList({ listings }: ResidentialListingsListProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<string | null>(null);
  const [editingListing, setEditingListing] = useState<ResidentialListing | null>(null);

  const handleDelete = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return;
    }

    setIsPending(listingId);

    try {
      const result = await deleteResidentialListing(listingId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to delete listing');
        setIsPending(null);
      }
    } catch (error) {
      alert('An error occurred while deleting the listing');
      setIsPending(null);
    }
  };

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No listings found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <CardTitle className="text-base">{listing.title}</CardTitle>
              <CardDescription>
                {listing.location}
                {listing.mlsNumber && (
                  <span className="ml-2 text-xs">MLS#: {listing.mlsNumber}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                {listing.imageSrc ? (
                  listing.imageSrc.startsWith('https://') ? (
                    <Image
                      src={listing.imageSrc}
                      alt={listing.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <img
                      src={listing.imageSrc}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground text-sm">No image</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">{listing.price}</p>
                {listing.galleryImages && listing.galleryImages.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {listing.galleryImages.length} gallery image{listing.galleryImages.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingListing(listing);
                  }}
                  className="w-full cursor-pointer"
                >
                  Edit Listing
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    handleDelete(listing.id);
                  }}
                  disabled={isPending === listing.id}
                  className="w-full cursor-pointer"
                >
                  {isPending === listing.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingListing && (
        <ResidentialListingEditForm
          listing={editingListing}
          open={!!editingListing}
          onOpenChange={(open) => {
            if (!open) {
              setEditingListing(null);
            }
          }}
        />
      )}
    </>
  );
}
