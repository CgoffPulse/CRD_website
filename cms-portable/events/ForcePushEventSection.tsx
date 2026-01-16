"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { forcePushEvent, toggleForceGoLive } from "../actions/events";
import type { EventPoster } from "../types/eventPosters";
import { groupEventPosters } from "../types/eventPosters";

interface ForcePushEventSectionProps {
  events: EventPoster[];
}

export function ForcePushEventSection({ events }: ForcePushEventSectionProps) {
  const router = useRouter();
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Group events and get unique event groups
  const groupedEvents = groupEventPosters(events);
  const forcePushedEvents = groupedEvents.filter((group) => {
    return group.posters[0]?.forceGoLive === true;
  });

  const handleForcePush = async () => {
    if (!selectedEventId) {
      alert("Please select an event to force push.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await forcePushEvent(selectedEventId);
      if (result.success) {
        router.refresh();
        setSelectedEventId("");
      } else {
        alert(result.error || "Failed to force push event");
      }
    } catch (_error) {
      alert("An error occurred while force pushing the event");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableForcePush = async (eventId: string) => {
    setIsLoading(true);
    try {
      const result = await toggleForceGoLive(eventId, false);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Failed to disable force push");
      }
    } catch (_error) {
      alert("An error occurred while disabling force push");
    } finally {
      setIsLoading(false);
    }
  };

  // Get available events (not already force-pushed)
  const availableEvents = groupedEvents.filter((group) => {
    return !group.posters[0]?.forceGoLive;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Force Push Event</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Force push an event flyer to display immediately, bypassing the normal
          go-live date logic.
        </p>

        {forcePushedEvents.length > 0 && (
          <div className="space-y-2">
            <p className="font-medium text-sm">
              Currently Force-Pushed Events:
            </p>
            {forcePushedEvents.map((group) => {
              const event = group.posters[0];
              if (!event) {
                return null;
              }
              return (
                <div
                  className="flex items-center justify-between rounded-md border p-2"
                  key={event.id}
                >
                  <span className="font-medium text-sm">{event.alt}</span>
                  <Button
                    className="cursor-pointer"
                    disabled={isLoading}
                    onClick={() => {
                      handleDisableForcePush(event.id);
                    }}
                    size="sm"
                    variant="destructive"
                  >
                    {isLoading ? "Disabling..." : "Disable"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {availableEvents.length > 0 && (
          <div className="space-y-2">
            <select
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm",
                "placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                "cursor-pointer"
              )}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
              }}
              value={selectedEventId}
            >
              <option value="">Select an event to force push</option>
              {availableEvents.map((group) => {
                const event = group.posters[0];
                if (!event) {
                  return null;
                }
                return (
                  <option key={event.id} value={event.id}>
                    {event.alt}
                  </option>
                );
              })}
            </select>
            <Button
              className="w-full cursor-pointer"
              disabled={isLoading || !selectedEventId}
              onClick={handleForcePush}
            >
              {isLoading ? "Force Pushing..." : "Force Push Event Now"}
            </Button>
          </div>
        )}

        {availableEvents.length === 0 && forcePushedEvents.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No events available to force push.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
