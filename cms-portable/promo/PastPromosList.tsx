'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { permanentlyDeletePromoImage } from '../actions/promoPopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { PromoImage } from '../actions/promoPopup';
import { ReinstatePromoDialog } from './ReinstatePromoDialog';
import { EditPromoDialog } from './EditPromoDialog';

interface PastPromosListProps {
  pastPromos: PromoImage[];
  linkUrl?: string | null;
  linkText?: string | null;
}

export function PastPromosList({ pastPromos, linkUrl, linkText }: PastPromosListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reinstatingId, setReinstatingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handlePermanentDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to permanently delete this promo image? This action cannot be undone and will delete the image file.')) {
      return;
    }

    setDeletingId(imageId);

    try {
      const result = await permanentlyDeletePromoImage(imageId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to delete promo image');
        setDeletingId(null);
      }
    } catch (error) {
      alert('An error occurred while deleting the promo image');
      setDeletingId(null);
    }
  };

  if (pastPromos.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No past promos archived yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pastPromos.map((image) => {
          return (
            <Card key={image.id}>
              <CardContent className="pt-6 space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
                  {image.src.startsWith('https://') ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{image.alt}</p>
                  {image.createdDate && (
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(image.createdDate).toLocaleDateString()}
                    </p>
                  )}
                  {image.lastUsedDate && (
                    <p className="text-xs text-muted-foreground">
                      Last used: {new Date(image.lastUsedDate).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setEditingId(image.id);
                      }}
                      className="w-full cursor-pointer"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setReinstatingId(image.id);
                      }}
                      className="w-full cursor-pointer"
                    >
                      Reinstate
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        handlePermanentDelete(image.id);
                      }}
                      disabled={deletingId === image.id}
                      className="w-full cursor-pointer"
                    >
                      {deletingId === image.id ? 'Deleting...' : 'Delete Permanently'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {reinstatingId && (
        <ReinstatePromoDialog
          imageId={reinstatingId}
          image={pastPromos.find((img) => {
            return img.id === reinstatingId;
          })}
          open={reinstatingId !== null}
          onOpenChange={(open) => {
            if (!open) {
              setReinstatingId(null);
            }
          }}
        />
      )}

      {editingId && (
        <EditPromoDialog
          imageId={editingId}
          image={pastPromos.find((img) => {
            return img.id === editingId;
          })}
          linkUrl={linkUrl}
          linkText={linkText}
          open={editingId !== null}
          onOpenChange={(open) => {
            if (!open) {
              setEditingId(null);
            }
          }}
        />
      )}
    </>
  );
}
