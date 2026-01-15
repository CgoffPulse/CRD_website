'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deletePromoImage } from '../actions/promoPopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { PromoImage } from '../actions/promoPopup';
import { EditPromoDialog } from './EditPromoDialog';

interface PromoImagesListProps {
  images: PromoImage[];
  linkUrl?: string | null;
  linkText?: string | null;
}

export function PromoImagesList({ images, linkUrl, linkText }: PromoImagesListProps) {
  const router = useRouter();
  const [archivingId, setArchivingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleArchive = async (imageId: string) => {
    if (!confirm('Are you sure you want to archive this promo image? It will be moved to past promos and can be reinstated later.')) {
      return;
    }

    setArchivingId(imageId);

    try {
      const result = await deletePromoImage(imageId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to archive promo image');
        setArchivingId(null);
      }
    } catch (error) {
      alert('An error occurred while archiving the promo image');
      setArchivingId(null);
    }
  };

  if (images.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No promo images uploaded yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => {
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
                  <p className="text-xs text-muted-foreground">
                    Image {index + 1} of {images.length}
                  </p>
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
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        handleArchive(image.id);
                      }}
                      disabled={archivingId === image.id}
                      className="w-full cursor-pointer"
                    >
                      {archivingId === image.id ? 'Archiving...' : 'Archive Image'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {editingId && (
        <EditPromoDialog
          imageId={editingId}
          image={images.find((img) => {
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
