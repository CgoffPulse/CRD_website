import Image from "next/image";
import { Suspense } from "react";
import { getResidentialListings } from "@/app/admin/actions/residentialListings";
import AnimatedUnderline from "@/components/AnimatedUnderline";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ListingsSkeleton } from "./ListingsSkeleton";
import ResidentialAfterListings from "./ResidentialAfterListings";
import ResidentialHero from "./ResidentialHero";
import ResidentialListings from "./ResidentialListings";

// Async component that fetches data inside Suspense boundary for proper streaming
async function ResidentialListingsSection() {
  const listings = await getResidentialListings();
  return <ResidentialListings listings={listings} />;
}

export default async function ResidentialPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <ResidentialHero />

        {/* Intro Section */}
        <section className="relative bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="group relative border-2 border-black bg-white p-8 shadow-xl md:p-12">
              {/* Corner accents with red and navy */}
              <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 transition-colors duration-300 group-hover:border-brand-red-700" />
              <div className="absolute top-0 right-0 h-6 w-6 border-navy-700 border-t-2 border-r-2 transition-colors duration-300 group-hover:border-navy-900" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-navy-700 border-b-2 border-l-2 transition-colors duration-300 group-hover:border-navy-900" />
              <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 transition-colors duration-300 group-hover:border-brand-red-700" />
              {/* Red and navy accent lines */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-20 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-navy-700 opacity-20 transition-opacity duration-300 group-hover:opacity-40" />

              {/* Logo - Inside Card */}
              <div className="mb-10 flex justify-center md:mb-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-black/5 blur-xl" />
                  <Image
                    alt="RESIDE - Residential Real Estate"
                    className="relative z-10 h-40 w-auto md:h-56 lg:h-64 xl:h-72"
                    height={150}
                    priority
                    sizes="(max-width: 768px) 90vw, 500px"
                    src="/images/RESIDE_LOGO_COLOR.svg"
                    width={500}
                  />
                </div>
              </div>

              <div className="prose prose-lg relative z-10 max-w-none">
                <p className="mb-8 text-black text-lg leading-relaxed md:text-xl">
                  CRD Real Estate & Development provides residential real estate
                  representation rooted in deep local knowledge and genuine
                  client advocacy. Serving Bentonville, Rogers, Springdale,
                  Fayetteville, and surrounding communities, our team helps
                  clients navigate buying, selling, and investing decisions with
                  clarity and confidence.
                </p>
                <p className="text-black text-lg leading-relaxed md:text-xl">
                  Because we live and work in Northwest Arkansas, we understand
                  how neighborhoods, schools, amenities, and long-term growth
                  plans shape real estate value. Our approach is personal,
                  strategic, and focused on outcomes that make sense both today
                  and long term.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section - Data fetching happens inside Suspense for streaming */}
        <section className="relative bg-white py-12 md:py-16" id="listings">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-block">
                <span className="relative border-black border-b-2 pb-2 font-semibold text-gray-600 text-xs uppercase tracking-widest md:text-sm">
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-brand-red-700 opacity-30" />
                  AVAILABLE PROPERTIES
                </span>
              </div>
              <h2 className="mb-4 font-bold font-display text-3xl text-black sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                Current Residential Listings
              </h2>
              <div className="mb-6">
                <AnimatedUnderline width="w-40" delay={200} />
              </div>
              <p className="text-base text-gray-600 uppercase tracking-wider md:text-lg">
                Explore a selection of available homes and properties across
                Northwest Arkansas.
              </p>
            </div>
            <Suspense fallback={<ListingsSkeleton />}>
              <ResidentialListingsSection />
            </Suspense>
          </div>
        </section>
        <ResidentialAfterListings />
      </main>
      <Footer />
    </>
  );
}
