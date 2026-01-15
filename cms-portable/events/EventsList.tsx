'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deleteEvent, toggleForceGoLive } from '../actions/events';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EventEditForm } from './EventEditForm';
import { groupEventPosters } from '../types/eventPosters';
import { shouldShowEvent, getDaysUntilGoLive } from '../lib/eventUtils';
import type { EventPoster } from '../types/eventPosters';

interface EventsListProps {
  events: EventPoster[];
}

export function EventsList({ events }: EventsListProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventPoster | null>(null);
  const [forceGoLivePending, setForceGoLivePending] = useState<string | null>(null);

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    setDeletingId(eventId);
    setIsPending(eventId);

    try {
      const result = await deleteEvent(eventId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to delete event');
        setIsPending(null);
      }
    } catch (error) {
      alert('An error occurred while deleting the event');
      setIsPending(null);
    } finally {
      setDeletingId(null);
    }
  };

  const handleForceGoLive = async (eventId: string, currentForceGoLive: boolean) => {
    setForceGoLivePending(eventId);
    try {
      const result = await toggleForceGoLive(eventId, !currentForceGoLive);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to toggle force go live');
      }
    } catch (error) {
      alert('An error occurred while toggling force go live');
    } finally {
      setForceGoLivePending(null);
    }
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No events found.</p>
        </CardContent>
      </Card>
    );
  }

  // Group events to handle multi-page flyers
  const groupedEvents = groupEventPosters(events);
  
  // Group events by date and status for better organization
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Separate events into active, queued, and past
  const active: typeof groupedEvents = [];
  const queued: typeof groupedEvents = [];
  const past: typeof groupedEvents = [];

  groupedEvents.forEach((group) => {
    const firstEvent = group.posters[0];
    const eventDate = new Date(group.eventDate);
    eventDate.setHours(0, 0, 0, 0);

    // Check if event is currently active (shown)
    const isActive = shouldShowEvent(firstEvent, now);

    if (eventDate < now) {
      // Past events
      past.push(group);
    } else if (isActive || firstEvent.forceGoLive) {
      // Active events (within goLiveDays period or forceGoLive enabled)
      active.push(group);
    } else {
      // Queued events (not yet within goLiveDays period)
      queued.push(group);
    }
  });

  // Helper to render event card
  const renderEventCard = (
    group: ReturnType<typeof groupEventPosters>[0],
    showForceGoLive: boolean = false
  ) => {
    const firstEvent = group.posters[0];
    const isMultiPage = group.posters.length > 1;
    const daysUntilGoLive = getDaysUntilGoLive(firstEvent, now);
    const isForceGoLive = firstEvent.forceGoLive || false;
    
    return (
      <Card key={group.baseId}>
        <CardHeader>
          <CardTitle className="text-base">{firstEvent.alt}</CardTitle>
          <CardDescription>
            {new Date(firstEvent.eventDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {isMultiPage && (
              <span className="ml-2 text-xs">({group.posters.length} pages)</span>
            )}
            {showForceGoLive && !isForceGoLive && (
              <span className="ml-2 text-xs text-muted-foreground">
                (Goes live in {daysUntilGoLive} {daysUntilGoLive === 1 ? 'day' : 'days'})
              </span>
            )}
            {isForceGoLive && (
              <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                (Force Go Live Active)
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
            {firstEvent.src.startsWith('https://') ? (
              <Image
                src={firstEvent.src}
                alt={firstEvent.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <img
                src={firstEvent.src}
                alt={firstEvent.alt}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            {showForceGoLive && (
              <Button
                variant={isForceGoLive ? 'default' : 'secondary'}
                size="sm"
                onClick={() => {
                  handleForceGoLive(firstEvent.id, isForceGoLive);
                }}
                disabled={forceGoLivePending === firstEvent.id}
                className="w-full cursor-pointer"
              >
                {forceGoLivePending === firstEvent.id
                  ? 'Updating...'
                  : isForceGoLive
                    ? 'Disable Force Go Live'
                    : 'Force Go Live Now'}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingEvent(firstEvent);
              }}
              className="w-full cursor-pointer"
            >
              Edit Event
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                handleDelete(firstEvent.id);
              }}
              disabled={isPending === firstEvent.id}
              className="w-full cursor-pointer"
            >
              {isPending === firstEvent.id ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="space-y-6">
        {active.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Active Events ({active.length})</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Events currently visible on the website
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {active.map((group) => {
                return renderEventCard(group, false);
              })}
            </div>
          </div>
        )}

        {queued.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Queued Events ({queued.length})</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Events waiting to go live based on their go-live date
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {queued.map((group) => {
                return renderEventCard(group, true);
              })}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Past Events ({past.length})</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {past.map((group) => {
                return renderEventCard(group, false);
              })}
            </div>
          </div>
        )}
      </div>

      {editingEvent && (
        <EventEditForm
          event={editingEvent}
          allEvents={events}
          open={!!editingEvent}
          onOpenChange={(open) => {
            if (!open) {
              setEditingEvent(null);
            }
          }}
        />
      )}
    </>
  );
}
