import { Suspense } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResidentialListings from "./ResidentialListings";
import ResidentialHero from "./ResidentialHero";
import ResidentialAfterListings from "./ResidentialAfterListings";
import { ListingsSkeleton } from "./ListingsSkeleton";
import { getResidentialListings } from "@/app/admin/actions/residentialListings";

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
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 relative">
          <div className="container mx-auto px-6 max-w-6xl">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-black/5 blur-xl"></div>
                <Image
                  src="/images/RESIDE_LOGO_COLOR.svg"
                  alt="RESIDE - Residential Real Estate"
                  width={400}
                  height={120}
                  className="h-24 md:h-32 lg:h-40 w-auto relative z-10"
                  sizes="(max-width: 768px) 80vw, 400px"
                  priority
                />
              </div>
            </div>
            
            <div className="bg-white border-2 border-black shadow-xl p-8 md:p-12 relative group">
              {/* Corner accents with red and navy */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black group-hover:border-brand-red-700 transition-colors duration-300"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-navy-700 group-hover:border-navy-900 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-navy-700 group-hover:border-navy-900 transition-colors duration-300"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black group-hover:border-brand-red-700 transition-colors duration-300"></div>
              {/* Red and navy accent lines */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              
              <div className="prose prose-lg max-w-none relative z-10">
                <p className="text-black text-lg md:text-xl leading-relaxed mb-8">
                  CRD Real Estate & Development provides residential real estate representation rooted in deep local knowledge and genuine client advocacy. Serving Bentonville, Rogers, Springdale, Fayetteville, and surrounding communities, our team helps clients navigate buying, selling, and investing decisions with clarity and confidence.
                </p>
                <p className="text-black text-lg md:text-xl leading-relaxed">
                  Because we live and work in Northwest Arkansas, we understand how neighborhoods, schools, amenities, and long-term growth plans shape real estate value. Our approach is personal, strategic, and focused on outcomes that make sense both today and long term.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section - Data fetching happens inside Suspense for streaming */}
        <section id="listings" className="py-16 md:py-20 bg-white relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gray-600 border-b-2 border-black pb-2 relative">
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-30"></span>
                  AVAILABLE PROPERTIES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
                Current Residential Listings
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
                <div className="w-2 h-2 bg-black relative">
                  <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
                </div>
                <div className="w-16 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-600 uppercase tracking-wider">
                Explore a selection of available homes and properties across Northwest Arkansas.
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
