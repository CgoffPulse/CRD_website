'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deleteCommercialListing } from '../actions/commercialListings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CommercialListingEditForm } from './CommercialListingEditForm';
import type { CommercialListing } from '../types/listings';

interface CommercialListingsListProps {
  listings: CommercialListing[];
}

export function CommercialListingsList({ listings }: CommercialListingsListProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<string | null>(null);
  const [editingListing, setEditingListing] = useState<CommercialListing | null>(null);
  const [filter, setFilter] = useState<'all' | 'buy' | 'lease'>('all');

  const handleDelete = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return;
    }

    setIsPending(listingId);

    try {
      const result = await deleteCommercialListing(listingId);
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

  const filteredListings = listings.filter((listing) => {
    if (filter === 'all') return true;
    if (filter === 'buy') return !listing.isLease;
    if (filter === 'lease') return listing.isLease;
    return true;
  });

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
      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({listings.length})
        </Button>
        <Button
          variant={filter === 'buy' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('buy')}
        >
          Buy ({listings.filter((l) => !l.isLease).length})
        </Button>
        <Button
          variant={filter === 'lease' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('lease')}
        >
          Lease ({listings.filter((l) => l.isLease).length})
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{listing.title}</CardTitle>
                {listing.isLease ? (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Lease</span>
                ) : (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Buy</span>
                )}
              </div>
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
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <img
                      src={listing.imageSrc}
                      alt={listing.title}
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground text-sm">No image</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  {listing.isLease ? listing.leaseRate : listing.price}
                </p>
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
        <CommercialListingEditForm
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
