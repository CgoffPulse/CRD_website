export function ListingsSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
  );
}
