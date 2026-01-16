export function ListingsSkeleton() {
  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
