export function ListingsSkeleton() {
  return (
    <div className="space-y-16">
      {/* Buy Listings Skeleton */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-8 sm:h-10 md:h-12 bg-gray-200 w-64 mx-auto mb-4 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-96 mx-auto mb-6 animate-pulse rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-video mb-4 rounded"></div>
                <div className="h-6 bg-gray-200 mb-2 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lease Listings Skeleton */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-8 sm:h-10 md:h-12 bg-gray-200 w-64 mx-auto mb-4 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-96 mx-auto mb-6 animate-pulse rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-video mb-4 rounded"></div>
                <div className="h-6 bg-gray-200 mb-2 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
