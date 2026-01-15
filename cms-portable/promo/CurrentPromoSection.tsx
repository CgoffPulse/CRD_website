'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deletePromoImage } from '../actions/promoPopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PromoPopupConfig } from '../actions/promoPopup';
import type { GroupedEventPoster } from '../types/eventPosters';
import { EditPromoDialog } from './EditPromoDialog';
import { PromoImageUploadForm } from './PromoImageUploadForm';

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
  isShowingEvents
}: CurrentPromoSectionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleDelete = (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image from the current popup? It will be moved to past promos.')) {
      return;
    }

    setDeletingId(imageId);

    startTransition(async () => {
      try {
        const result = await deletePromoImage(imageId);
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
    });
  };

  const getStatusText = () => {
    if (isShowingPromo && promoPopup.forceGoLive) {
      return 'Force-pushed and currently displaying (overriding events)';
    }
    if (isShowingPromo) {
      return 'Currently displaying on homepage';
    }
    if (isShowingEvents) {
      return 'Currently displaying on homepage (events take priority)';
    }
    return 'Currently displaying on homepage';
  };

  const popupType = isShowingPromo ? 'Promo Popup' : 'Event Flyer';

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
              <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                Current Popup
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isShowingPromo 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {popupType}
                </span>
              </CardTitle>
              <CardDescription>
                {getStatusText()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isShowingPromo ? (
            <>
              {/* Promo Popup Configuration Summary */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Link URL</p>
                  <p className="text-sm text-muted-foreground">
                    {promoPopup.linkUrl || 'Not set'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Link Button Text</p>
                  <p className="text-sm text-muted-foreground">
                    {promoPopup.linkText || 'Not set'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Popup Background Color</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: promoPopup.popupBgColor || '#FFFFFF' }}
                    />
                    <p className="text-sm text-muted-foreground">
                      {promoPopup.popupBgColor || '#FFFFFF'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Button Color</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: promoPopup.buttonColor || '#000000' }}
                    />
                    <p className="text-sm text-muted-foreground">
                      {promoPopup.buttonColor || '#000000'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo Images Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Popup Images</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowUploadForm(!showUploadForm);
                    }}
                    className="cursor-pointer"
                  >
                    {showUploadForm ? 'Hide Upload Form' : 'Add Image'}
                  </Button>
                </div>

                {showUploadForm && (
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <PromoImageUploadForm />
                  </div>
                )}

                {promoPopup.images.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No images in current popup. Add an image to get started.
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {promoPopup.images.map((image, index) => {
                      return (
                        <Card key={image.id}>
                          <CardContent className="pt-6 space-y-4">
                            {/* Image */}
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
                            
                            {/* Text below image */}
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Alt Text</p>
                                <p className="text-sm font-medium">{image.alt}</p>
                              </div>
                              {promoPopup.linkUrl && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Link URL</p>
                                  <p className="text-sm text-muted-foreground break-words">
                                    {promoPopup.linkUrl}
                                  </p>
                                </div>
                              )}
                              {promoPopup.linkText && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Button Text</p>
                                  <p className="text-sm text-muted-foreground">
                                    {promoPopup.linkText}
                                  </p>
                                </div>
                              )}
                              {image.createdDate && (
                                <p className="text-xs text-muted-foreground">
                                  Created: {new Date(image.createdDate).toLocaleDateString()}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Image {index + 1} of {promoPopup.images.length}
                                {promoPopup.images.length > 1 ? ' (carousel)' : ' (single)'}
                              </p>
                            </div>

                            {/* Actions */}
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
                                  handleDelete(image.id);
                                }}
                                disabled={deletingId === image.id}
                                className="w-full cursor-pointer"
                              >
                                {deletingId === image.id ? 'Deleting...' : 'Delete'}
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
                  <h3 className="text-lg font-semibold">Event Flyers</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="cursor-pointer"
                  >
                    <a href="/events">Manage Events</a>
                  </Button>
                </div>

                {allEventPosters.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No active event flyers.
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {allEventPosters.map((poster, index) => {
                      const group = activeGroupedEvents.find((g) => {
                        return g.posters.some((p) => {
                          return p.id === poster.id;
                        });
                      });
                      return (
                        <Card key={poster.id}>
                          <CardContent className="pt-6 space-y-4">
                            {/* Image */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
                              {poster.src.startsWith('https://') ? (
                                <Image
                                  src={poster.src}
                                  alt={poster.alt}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              ) : (
                                <img
                                  src={poster.src}
                                  alt={poster.alt}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            
                            {/* Text below image */}
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Event Name</p>
                                <p className="text-sm font-medium">{poster.alt}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Event Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(poster.eventDate).toLocaleDateString()}
                                </p>
                              </div>
                              {group && group.posters.length > 1 && (
                                <p className="text-xs text-muted-foreground">
                                  Poster {group.posters.findIndex((p) => {
                                    return p.id === poster.id;
                                  }) + 1} of {group.posters.length} in this event
                                </p>
                              )}
                              {poster.forceGoLive && (
                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                  Force Go Live Active
                                </p>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="default"
                                size="sm"
                                asChild
                                className="w-full cursor-pointer"
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
          imageId={editingId}
          image={promoPopup.images.find((img) => {
            return img.id === editingId;
          })}
          linkUrl={promoPopup.linkUrl}
          linkText={promoPopup.linkText}
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
