import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Residential Real Estate in Northwest Arkansas | CRD Real Estate & Development",
  description: "Local expertise and thoughtful guidance for buyers, sellers, and investors across Northwest Arkansas. Homes for sale in Bentonville, Rogers, Springdale, and Fayetteville.",
};

export default function ResidentialPage() {
  // NOTE: The listings below are placeholder listings and will be replaced with live MLS or CMS-driven data in the future.
  // imageSrc can be null for placeholder listings or point to actual listing images when available.
  const listings = [
    {
      id: "example-property-1",
      title: "Example Property – Bentonville",
      price: "$XXX,XXX",
      location: "Bentonville, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "A well-located residential property offering strong livability and long-term value in one of Northwest Arkansas's most desirable areas.",
      bullets: [
        "X bedrooms / X bathrooms",
        "Approx. XXXX sq ft",
        "Residential neighborhood",
        "Convenient access to schools, amenities, and major corridors",
      ],
      href: "/residential/listings/example-property-1",
    },
    {
      id: "example-property-2",
      title: "Example Property – Rogers",
      price: "$XXX,XXX",
      location: "Rogers, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "A thoughtfully positioned home offering comfort, functionality, and proximity to key destinations throughout the region.",
      bullets: [
        "X bedrooms / X bathrooms",
        "Approx. XXXX sq ft",
        "Established neighborhood",
        "Easy access to Downtown Rogers",
      ],
      href: "/residential/listings/example-property-2",
    },
    {
      id: "example-property-3",
      title: "Example Property – Fayetteville",
      price: "$XXX,XXX",
      location: "Fayetteville, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "A residential opportunity well-suited for buyers seeking location, character, and long-term value.",
      bullets: [
        "X bedrooms / X bathrooms",
        "Approx. XXXX sq ft",
        "Residential zoning",
        "Close to dining, shopping, and local amenities",
      ],
      href: "/residential/listings/example-property-3",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-32 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                Residential Real Estate in Northwest Arkansas
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Local expertise and thoughtful guidance for buyers, sellers, and investors across Northwest Arkansas.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="#listings" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  View Current Listings
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-black text-base md:text-lg leading-relaxed mb-6">
                CRD Real Estate & Development provides residential real estate representation rooted in deep local knowledge and genuine client advocacy. Serving Bentonville, Rogers, Springdale, Fayetteville, and surrounding communities, our team helps clients navigate buying, selling, and investing decisions with clarity and confidence.
              </p>
              <p className="text-black text-base md:text-lg leading-relaxed">
                Because we live and work in Northwest Arkansas, we understand how neighborhoods, schools, amenities, and long-term growth plans shape real estate value. Our approach is personal, strategic, and focused on outcomes that make sense both today and long term.
              </p>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section id="listings" className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Current Residential Listings
              </h2>
              <p className="text-sm text-gray-600 uppercase tracking-wider">
                Explore a selection of available homes and properties across Northwest Arkansas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={listing.href}
                  className="group bg-white border-2 border-gray-200 rounded-sm hover:border-black transition-colors duration-200 flex flex-col h-full overflow-hidden"
                >
                  {/* Cover Image */}
                  <div className="w-full h-64 bg-gray-200 relative overflow-hidden">
                    {listing.imageSrc ? (
                      <Image
                        src={listing.imageSrc}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-black mb-2">
                        {listing.title}
                      </h3>
                      <p className="text-2xl font-bold text-black mb-2">
                        {listing.price}
                      </p>
                      <p className="text-gray-600 text-sm font-medium">
                        {listing.location}
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                      {listing.summary}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {listing.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-black font-semibold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <span className="text-black font-semibold text-sm uppercase tracking-wide inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Listing
                        <svg 
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Residential Services Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
              How We Support Residential Clients
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              Our residential clients work directly with experienced professionals who guide every step of the process — from first showing through closing and beyond. CRD provides clear communication, strong negotiation, and local insight tailored to each client's goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Buyer representation</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Seller representation</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Residential investment properties</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Relocation support</span>
              </div>
              <div className="flex items-start gap-3 md:col-span-2 md:justify-center">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Market pricing and negotiation strategy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why CRD Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              Why CRD
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Local Knowledge That Matters
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We understand Northwest Arkansas neighborhoods because we live here — and that insight helps clients make better decisions.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Client-First Representation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every transaction is handled with care, transparency, and a focus on what's best for the client.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Clear, Confident Guidance
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  From offer to close, we help clients move forward with clarity and confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Looking for a Home in Northwest Arkansas?
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Whether you're buying your first home, relocating, or investing, our team is ready to help you find the right fit.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="#listings" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  View Listings
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
