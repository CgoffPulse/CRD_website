"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PromoImage } from "../actions/promoPopup";
import { permanentlyDeletePromoImage } from "../actions/promoPopup";
import { EditPromoDialog } from "./EditPromoDialog";
import { ReinstatePromoDialog } from "./ReinstatePromoDialog";

interface PastPromosListProps {
  pastPromos: PromoImage[];
  linkUrl?: string | null;
  linkText?: string | null;
}

export function PastPromosList({
  pastPromos,
  linkUrl,
  linkText,
}: PastPromosListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reinstatingId, setReinstatingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handlePermanentDelete = async (imageId: string) => {
    if (
      !confirm(
        "Are you sure you want to permanently delete this promo image? This action cannot be undone and will delete the image file."
      )
    ) {
      return;
    }

    setDeletingId(imageId);

    try {
      const result = await permanentlyDeletePromoImage(imageId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Failed to delete promo image");
        setDeletingId(null);
      }
    } catch (_error) {
      alert("An error occurred while deleting the promo image");
      setDeletingId(null);
    }
  };

  if (pastPromos.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No past promos archived yet.
          </p>
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
              <CardContent className="space-y-4 pt-6">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
                  {image.src.startsWith("https://") ? (
                    <Image
                      alt={image.alt}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={image.src}
                    />
                  ) : (
                    <img
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      src={image.src}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-sm">{image.alt}</p>
                  {image.createdDate && (
                    <p className="text-muted-foreground text-xs">
                      Created:{" "}
                      {new Date(image.createdDate).toLocaleDateString()}
                    </p>
                  )}
                  {image.lastUsedDate && (
                    <p className="text-muted-foreground text-xs">
                      Last used:{" "}
                      {new Date(image.lastUsedDate).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full cursor-pointer"
                      onClick={() => {
                        setEditingId(image.id);
                      }}
                      size="sm"
                      variant="default"
                    >
                      Edit
                    </Button>
                    <Button
                      className="w-full cursor-pointer"
                      onClick={() => {
                        setReinstatingId(image.id);
                      }}
                      size="sm"
                      variant="default"
                    >
                      Reinstate
                    </Button>
                    <Button
                      className="w-full cursor-pointer"
                      disabled={deletingId === image.id}
                      onClick={() => {
                        handlePermanentDelete(image.id);
                      }}
                      size="sm"
                      variant="destructive"
                    >
                      {deletingId === image.id
                        ? "Deleting..."
                        : "Delete Permanently"}
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
          image={pastPromos.find((img) => {
            return img.id === reinstatingId;
          })}
          imageId={reinstatingId}
          onOpenChange={(open) => {
            if (!open) {
              setReinstatingId(null);
            }
          }}
          open={reinstatingId !== null}
        />
      )}

      {editingId && (
        <EditPromoDialog
          image={pastPromos.find((img) => {
            return img.id === editingId;
          })}
          imageId={editingId}
          linkText={linkText}
          linkUrl={linkUrl}
          onOpenChange={(open) => {
            if (!open) {
              setEditingId(null);
            }
          }}
          open={editingId !== null}
        />
      )}
    </>
  );
}
