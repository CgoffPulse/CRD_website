import type { EventPoster, GroupedEventPoster } from '../types/eventPosters';

const DEFAULT_GO_LIVE_DAYS = 15;

/**
 * Calculate the go-live date for an event (eventDate - goLiveDays)
 */
export function getGoLiveDate(event: EventPoster): Date {
  const eventDate = new Date(event.eventDate);
  const goLiveDays = event.goLiveDays ?? DEFAULT_GO_LIVE_DAYS;
  const goLiveDate = new Date(eventDate);
  goLiveDate.setDate(goLiveDate.getDate() - goLiveDays);
  goLiveDate.setHours(0, 0, 0, 0);
  return goLiveDate;
}

/**
 * Check if an event should be shown based on its goLiveDays period
 * If forceGoLive is true, show immediately (as long as event hasn't passed)
 * Events with dates in the past (including today) are automatically excluded
 */
export function shouldShowEvent(event: EventPoster, currentDate: Date = new Date()): boolean {
  const eventDate = new Date(event.eventDate);
  eventDate.setHours(0, 0, 0, 0);
  
  const now = new Date(currentDate);
  now.setHours(0, 0, 0, 0);
  
  // Exclude events with dates in the past (including today)
  if (now >= eventDate) {
    return false;
  }
  
  // If forceGoLive is enabled, show immediately (until event date passes)
  if (event.forceGoLive) {
    return true;
  }
  
  // Otherwise, use normal goLiveDays logic
  const goLiveDate = getGoLiveDate(event);
  
  // Show if current date is between goLiveDate and eventDate (exclusive of eventDate)
  return now >= goLiveDate && now < eventDate;
}

/**
 * Filter events that should be shown based on their goLiveDays period
 */
export function getEventsWithinGoLivePeriod(
  events: EventPoster[],
  currentDate: Date = new Date()
): EventPoster[] {
  return events.filter((event) => {
    return shouldShowEvent(event, currentDate);
  });
}

/**
 * Get events that should be shown in the popup (within their goLiveDays period)
 * Returns events sorted by event date (earliest first)
 */
export function getUpcomingEventsForPopup(
  events: EventPoster[],
  currentDate: Date = new Date()
): EventPoster[] {
  const activeEvents = getEventsWithinGoLivePeriod(events, currentDate);
  
  return activeEvents.sort((a, b) => {
    return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
  });
}

/**
 * Filter grouped events that should be shown based on their goLiveDays period
 */
export function getGroupedEventsWithinGoLivePeriod(
  groupedEvents: GroupedEventPoster[],
  currentDate: Date = new Date()
): GroupedEventPoster[] {
  return groupedEvents.filter((group) => {
    // Check if any poster in the group should be shown
    return group.posters.some((poster) => {
      return shouldShowEvent(poster, currentDate);
    });
  });
}

/**
 * Get the number of days until an event goes live
 * Returns negative number if event has already gone live
 * Returns 0 if forceGoLive is enabled
 */
export function getDaysUntilGoLive(event: EventPoster, currentDate: Date = new Date()): number {
  // If forceGoLive is enabled, event is already live
  if (event.forceGoLive) {
    return 0;
  }
  
  const goLiveDate = getGoLiveDate(event);
  const now = new Date(currentDate);
  now.setHours(0, 0, 0, 0);
  
  const diffTime = goLiveDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}
