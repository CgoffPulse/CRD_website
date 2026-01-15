import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialListings from "./CommercialListings";
import CommercialHero from "./CommercialHero";
import CommercialAfterListings from "./CommercialAfterListings";
import { ListingsSkeleton } from "./ListingsSkeleton";
import { getCommercialListings } from "@/app/admin/actions/commercialListings";

// Async component that fetches data inside Suspense boundary for proper streaming
async function CommercialListingsSection() {
  const allListings = await getCommercialListings();
  const buyListings = allListings.filter((listing) => !listing.isLease);
  const leaseListings = allListings.filter((listing) => listing.isLease);

  return <CommercialListings buyListings={buyListings} leaseListings={leaseListings} />;
}

export default async function CommercialPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <CommercialHero />

        {/* Intro Section */}
        <section className="py-10 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-20"></div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-black text-lg md:text-xl leading-relaxed mb-8">
                CRD Real Estate & Development provides full-service commercial real estate guidance across Northwest Arkansas, supporting property owners, investors, tenants, and developers at every stage of the transaction. Our team brings hands-on market knowledge, disciplined strategy, and an ownership mindset to each engagement.
              </p>
              <p className="text-black text-lg md:text-xl leading-relaxed">
                From office and industrial properties to medical, warehouse, land, and redevelopment opportunities, CRD helps clients evaluate options, reduce risk, and execute decisions aligned with long-term business and investment goals.
              </p>
            </div>
          </div>
        </section>

        {/* Commercial Listings Section - Data fetching happens inside Suspense for streaming */}
        <Suspense fallback={<ListingsSkeleton />}>
          <CommercialListingsSection />
        </Suspense>

        <CommercialAfterListings />
      </main>
      <Footer />
    </>
  );
}
