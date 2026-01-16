import { Suspense } from "react";
import { getCommercialListings } from "@/app/admin/actions/commercialListings";
import AnimatedUnderline from "@/components/AnimatedUnderline";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CommercialAfterListings from "./CommercialAfterListings";
import CommercialHero from "./CommercialHero";
import CommercialListings from "./CommercialListings";
import { ListingsSkeleton } from "./ListingsSkeleton";

// Async component that fetches data inside Suspense boundary for proper streaming
async function CommercialListingsSection() {
  const allListings = await getCommercialListings();
  const buyListings = allListings.filter((listing) => !listing.isLease);
  const leaseListings = allListings.filter((listing) => listing.isLease);

  return (
    <CommercialListings
      buyListings={buyListings}
      leaseListings={leaseListings}
    />
  );
}

export default async function CommercialPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <CommercialHero />

        {/* Intro Section */}
        <section className="bg-gray-50 py-8 sm:py-10">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8">
              <AnimatedUnderline width="w-24" />
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="mb-8 text-black text-lg leading-relaxed md:text-xl">
                CRD Real Estate & Development provides full-service commercial
                real estate guidance across Northwest Arkansas, supporting
                property owners, investors, tenants, and developers at every
                stage of the transaction. Our team brings hands-on market
                knowledge, disciplined strategy, and an ownership mindset to
                each engagement.
              </p>
              <p className="text-black text-lg leading-relaxed md:text-xl">
                From office and industrial properties to medical, warehouse,
                land, and redevelopment opportunities, CRD helps clients
                evaluate options, reduce risk, and execute decisions aligned
                with long-term business and investment goals.
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
