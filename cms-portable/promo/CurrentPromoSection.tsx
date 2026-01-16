"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PromoPopupConfig } from "../actions/promoPopup";
import { deletePromoImage } from "../actions/promoPopup";
import type { GroupedEventPoster } from "../types/eventPosters";
import { EditPromoDialog } from "./EditPromoDialog";
import { PromoImageUploadForm } from "./PromoImageUploadForm";

interface CurrentPromoSectionProps {
  promoPopup: PromoPopupConfig;
  hasActiveEvents: boolean;
  activeGroupedEvents: GroupedEventPoster[];
  isShowingPromo: boolean;
  isShowingEvents: boolean;
}

export function CurrentPromoSection({
  promoPopup,
  hasActiveEvents,
  activeGroupedEvents,
  isShowingPromo,
  isShowingEvents,
}: CurrentPromoSectionProps) {
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleDelete = (imageId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this image from the current popup? It will be moved to past promos."
      )
    ) {
      return;
    }

    setDeletingId(imageId);

    startTransition(async () => {
      try {
        const result = await deletePromoImage(imageId);
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
    });
  };

  const getStatusText = () => {
    if (isShowingPromo && promoPopup.forceGoLive) {
      return "Force-pushed and currently displaying (overriding events)";
    }
    if (isShowingPromo) {
      return "Currently displaying on homepage";
    }
    if (isShowingEvents) {
      return "Currently displaying on homepage (events take priority)";
    }
    return "Currently displaying on homepage";
  };

  const popupType = isShowingPromo ? "Promo Popup" : "Event Flyer";

  // Flatten all event posters from active groups
  const allEventPosters = activeGroupedEvents.flatMap((group) => {
    return group.posters;
  });

  return (
    <>
      <Card className="border-green-500/50 bg-green-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                Current Popup
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
                    isShowingPromo
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  }`}
                >
                  {popupType}
                </span>
              </CardTitle>
              <CardDescription>{getStatusText()}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isShowingPromo ? (
            <>
              {/* Promo Popup Configuration Summary */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="font-medium text-sm">Link URL</p>
                  <p className="text-muted-foreground text-sm">
                    {promoPopup.linkUrl || "Not set"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-sm">Link Button Text</p>
                  <p className="text-muted-foreground text-sm">
                    {promoPopup.linkText || "Not set"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-sm">Popup Background Color</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-8 w-8 rounded border border-gray-300"
                      style={{
                        backgroundColor: promoPopup.popupBgColor || "#FFFFFF",
                      }}
                    />
                    <p className="text-muted-foreground text-sm">
                      {promoPopup.popupBgColor || "#FFFFFF"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-sm">Button Color</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-8 w-8 rounded border border-gray-300"
                      style={{
                        backgroundColor: promoPopup.buttonColor || "#000000",
                      }}
                    />
                    <p className="text-muted-foreground text-sm">
                      {promoPopup.buttonColor || "#000000"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo Images Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Popup Images</h3>
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      setShowUploadForm(!showUploadForm);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    {showUploadForm ? "Hide Upload Form" : "Add Image"}
                  </Button>
                </div>

                {showUploadForm && (
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <PromoImageUploadForm />
                  </div>
                )}

                {promoPopup.images.length === 0 ? (
                  <p className="py-4 text-center text-muted-foreground text-sm">
                    No images in current popup. Add an image to get started.
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {promoPopup.images.map((image, index) => {
                      return (
                        <Card key={image.id}>
                          <CardContent className="space-y-4 pt-6">
                            {/* Image */}
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

                            {/* Text below image */}
                            <div className="space-y-2">
                              <div>
                                <p className="mb-1 font-medium text-muted-foreground text-xs">
                                  Alt Text
                                </p>
                                <p className="font-medium text-sm">
                                  {image.alt}
                                </p>
                              </div>
                              {promoPopup.linkUrl && (
                                <div>
                                  <p className="mb-1 font-medium text-muted-foreground text-xs">
                                    Link URL
                                  </p>
                                  <p className="break-words text-muted-foreground text-sm">
                                    {promoPopup.linkUrl}
                                  </p>
                                </div>
                              )}
                              {promoPopup.linkText && (
                                <div>
                                  <p className="mb-1 font-medium text-muted-foreground text-xs">
                                    Button Text
                                  </p>
                                  <p className="text-muted-foreground text-sm">
                                    {promoPopup.linkText}
                                  </p>
                                </div>
                              )}
                              {image.createdDate && (
                                <p className="text-muted-foreground text-xs">
                                  Created:{" "}
                                  {new Date(
                                    image.createdDate
                                  ).toLocaleDateString()}
                                </p>
                              )}
                              <p className="text-muted-foreground text-xs">
                                Image {index + 1} of {promoPopup.images.length}
                                {promoPopup.images.length > 1
                                  ? " (carousel)"
                                  : " (single)"}
                              </p>
                            </div>

                            {/* Actions */}
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
                                disabled={deletingId === image.id}
                                onClick={() => {
                                  handleDelete(image.id);
                                }}
                                size="sm"
                                variant="destructive"
                              >
                                {deletingId === image.id
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Event Flyers Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Event Flyers</h3>
                  <Button
                    asChild
                    className="cursor-pointer"
                    size="sm"
                    variant="outline"
                  >
                    <a href="/events">Manage Events</a>
                  </Button>
                </div>

                {allEventPosters.length === 0 ? (
                  <p className="py-4 text-center text-muted-foreground text-sm">
                    No active event flyers.
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {allEventPosters.map((poster, _index) => {
                      const group = activeGroupedEvents.find((g) => {
                        return g.posters.some((p) => {
                          return p.id === poster.id;
                        });
                      });
                      return (
                        <Card key={poster.id}>
                          <CardContent className="space-y-4 pt-6">
                            {/* Image */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
                              {poster.src.startsWith("https://") ? (
                                <Image
                                  alt={poster.alt}
                                  className="object-cover"
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  src={poster.src}
                                />
                              ) : (
                                <img
                                  alt={poster.alt}
                                  className="h-full w-full object-cover"
                                  src={poster.src}
                                />
                              )}
                            </div>

                            {/* Text below image */}
                            <div className="space-y-2">
                              <div>
                                <p className="mb-1 font-medium text-muted-foreground text-xs">
                                  Event Name
                                </p>
                                <p className="font-medium text-sm">
                                  {poster.alt}
                                </p>
                              </div>
                              <div>
                                <p className="mb-1 font-medium text-muted-foreground text-xs">
                                  Event Date
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {new Date(
                                    poster.eventDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              {group && group.posters.length > 1 && (
                                <p className="text-muted-foreground text-xs">
                                  Poster{" "}
                                  {group.posters.findIndex((p) => {
                                    return p.id === poster.id;
                                  }) + 1}{" "}
                                  of {group.posters.length} in this event
                                </p>
                              )}
                              {poster.forceGoLive && (
                                <p className="font-medium text-green-600 text-xs dark:text-green-400">
                                  Force Go Live Active
                                </p>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                              <Button
                                asChild
                                className="w-full cursor-pointer"
                                size="sm"
                                variant="default"
                              >
                                <a href="/cms-portable/events">Edit Event</a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingId && (
        <EditPromoDialog
          image={promoPopup.images.find((img) => {
            return img.id === editingId;
          })}
          imageId={editingId}
          linkText={promoPopup.linkText}
          linkUrl={promoPopup.linkUrl}
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
