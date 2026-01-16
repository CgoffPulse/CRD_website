export function ListingsSkeleton() {
  return (
    <div className="space-y-16">
      {/* Buy Listings Skeleton */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-12">
            <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded bg-gray-200 sm:h-10 md:h-12" />
            <div className="mx-auto mb-6 h-4 w-96 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {[...new Array(6)].map((_, i) => (
              <div className="animate-pulse" key={i}>
                <div className="mb-4 aspect-video rounded bg-gray-200" />
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />
                <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lease Listings Skeleton */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-12">
            <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded bg-gray-200 sm:h-10 md:h-12" />
            <div className="mx-auto mb-6 h-4 w-96 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {[...new Array(6)].map((_, i) => (
              <div className="animate-pulse" key={i}>
                <div className="mb-4 aspect-video rounded bg-gray-200" />
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />
                <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
