export interface EventPoster {
  id: string;
  src: string;
  alt: string;
  height: number;
  width: number;
  eventDate: string; // ISO date string format
  goLiveDays?: number; // Number of days before event date to show flyer (default: 15)
  forceGoLive?: boolean; // If true, bypass goLiveDays logic and show immediately
}

export interface GroupedEventPoster {
  baseId: string;
  posters: EventPoster[];
  eventDate: string;
}

const NUMERIC_SUFFIX_REGEX = /\d+$/;

export function groupEventPosters(
  posters: EventPoster[]
): GroupedEventPoster[] {
  const groups = new Map<string, EventPoster[]>();

  // Group posters by their base ID (removing numeric suffix)
  for (const poster of posters) {
    const baseId = poster.id.replace(NUMERIC_SUFFIX_REGEX, "");
    if (!groups.has(baseId)) {
      groups.set(baseId, []);
    }
    groups.get(baseId)?.push(poster);
  }

  // Sort posters within each group by their numeric suffix
  return Array.from(groups.entries()).map(([baseId, groupPosters]) => {
    const sortedPosters = groupPosters.sort((a, b) => {
      const aNum = Number.parseInt(
        a.id.match(NUMERIC_SUFFIX_REGEX)?.[0] || "0",
        10
      );
      const bNum = Number.parseInt(
        b.id.match(NUMERIC_SUFFIX_REGEX)?.[0] || "0",
        10
      );
      return aNum - bNum;
    });

    return {
      baseId,
      posters: sortedPosters,
      eventDate: sortedPosters[0].eventDate,
    };
  });
}
