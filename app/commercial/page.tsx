import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Commercial Real Estate in Northwest Arkansas | CRD Real Estate & Development",
  description: "Strategic guidance for buying, leasing, and selling commercial property across Northwest Arkansas. Commercial property for sale and lease in Bentonville, Rogers, Springdale, and Fayetteville.",
};

export default function CommercialPage() {
  // NOTE: The Buy listings below are placeholder listings and will be replaced with live MLS or CMS-driven data in the future.
  const buyListings = [
    {
      id: "buy-example-property-1",
      title: "Example Property – Office | Bentonville",
      price: "$X,XXX,XXX",
      location: "Bentonville, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "A well-located commercial property offering strong visibility and long-term investment potential.",
      bullets: [
        "Approx. XXXX sq ft",
        "Office / Commercial use",
        "Zoned for commercial use",
        "Proximity to major corridors",
      ],
      href: "/commercial/buy/example-property-1",
    },
    {
      id: "buy-example-property-2",
      title: "Example Property – Industrial | Rogers",
      price: "$X,XXX,XXX",
      location: "Rogers, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "An industrial property positioned for operational efficiency and regional access.",
      bullets: [
        "Approx. XXXX sq ft",
        "Industrial / Warehouse use",
        "Easy highway access",
        "Suitable for owner-users or investors",
      ],
      href: "/commercial/buy/example-property-2",
    },
    {
      id: "buy-example-property-3",
      title: "Example Property – Warehouse | Springdale",
      price: "$X,XXX,XXX",
      location: "Springdale, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "A warehouse facility offering functional space and strategic location for distribution or storage operations.",
      bullets: [
        "Approx. XXXX sq ft",
        "Warehouse / Distribution use",
        "Loading docks available",
        "Ideal for logistics or manufacturing",
      ],
      href: "/commercial/buy/example-property-3",
    },
  ];

  // NOTE: The Lease listings below are placeholder listings and will be replaced with live MLS or CMS-driven data in the future.
  const leaseListings = [
    {
      id: "lease-example-property-1",
      title: "Example Space – Retail | Downtown Rogers",
      leaseRate: "$XX / SF",
      location: "Rogers, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "A commercial lease opportunity in a high-traffic area ideal for retail or service-based businesses.",
      bullets: [
        "Approx. XXXX sq ft",
        "Retail / Commercial use",
        "Downtown location",
        "Strong visibility and access",
      ],
      href: "/commercial/lease/example-property-1",
    },
    {
      id: "lease-example-property-2",
      title: "Example Space – Medical / Office | Fayetteville",
      leaseRate: "$XX / SF",
      location: "Fayetteville, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "A flexible office or medical space suited for professional or healthcare users.",
      bullets: [
        "Approx. XXXX sq ft",
        "Medical / Office use",
        "Parking available",
        "Convenient access to amenities",
      ],
      href: "/commercial/lease/example-property-2",
    },
    {
      id: "lease-example-property-3",
      title: "Example Space – Office | Bentonville",
      leaseRate: "$XX / SF",
      location: "Bentonville, AR",
      imageSrc: null, // Replace with actual image path when available
      summary: "A modern office space in a growing commercial district, ideal for professional services or corporate offices.",
      bullets: [
        "Approx. XXXX sq ft",
        "Office / Professional use",
        "Modern amenities and finishes",
        "Located in established business district",
      ],
      href: "/commercial/lease/example-property-3",
    },
  ];

  // Shared listing card component for Buy and Lease listings
  const ListingCard = ({ listing, isLease = false }: { listing: any; isLease?: boolean }) => (
    <Link
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
          {isLease ? (
            <p className="text-2xl font-bold text-black mb-2">
              {listing.leaseRate}
            </p>
          ) : (
            <p className="text-2xl font-bold text-black mb-2">
              {listing.price}
            </p>
          )}
          <p className="text-gray-600 text-sm font-medium">
            {listing.location}
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
          {listing.summary}
        </p>
        <ul className="space-y-2 mb-6">
          {listing.bullets.map((bullet: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-black font-semibold">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <span className="text-black font-semibold text-sm uppercase tracking-wide inline-flex items-center gap-2 group-hover:gap-3 transition-all">
            {isLease ? "View Space" : "View Property"}
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
  );

  return (
    <>
      <Header />
      <main className="pt-32 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                Commercial Real Estate in Northwest Arkansas
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Strategic guidance for buying, leasing, and selling commercial property across Northwest Arkansas.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="#buy-listings" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  View Commercial Listings
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  Talk With Our Team
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
                CRD Real Estate & Development provides full-service commercial real estate guidance across Northwest Arkansas, supporting property owners, investors, tenants, and developers at every stage of the transaction. Our team brings hands-on market knowledge, disciplined strategy, and an ownership mindset to each engagement.
              </p>
              <p className="text-black text-base md:text-lg leading-relaxed">
                From office and industrial properties to medical, warehouse, land, and redevelopment opportunities, CRD helps clients evaluate options, reduce risk, and execute decisions aligned with long-term business and investment goals.
              </p>
            </div>
          </div>
        </section>

        {/* Buy Commercial Properties Section */}
        <section id="buy-listings" className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Buy Commercial Property
              </h2>
              <p className="text-sm text-gray-600 uppercase tracking-wider">
                Explore available commercial properties for purchase across Northwest Arkansas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {buyListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} isLease={false} />
              ))}
            </div>
          </div>
        </section>

        {/* Lease Commercial Properties Section */}
        <section id="lease-listings" className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Lease Commercial Space
              </h2>
              <p className="text-sm text-gray-600 uppercase tracking-wider">
                Available commercial spaces for lease throughout Northwest Arkansas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaseListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} isLease={true} />
              ))}
            </div>
          </div>
        </section>

        {/* Sell Commercial Property Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Thinking About Selling Commercial Property?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-black text-base md:text-lg leading-relaxed mb-6">
                Selling commercial real estate requires more than listing a property — it requires positioning, market insight, and a clear strategy. CRD works directly with property owners and landowners to evaluate opportunities, price assets accurately, and bring properties to market with intention.
              </p>
              <p className="text-black text-base md:text-lg leading-relaxed mb-8">
                Whether you're selling an income-producing property, vacant land, or a redevelopment opportunity, our team provides guidance grounded in market data, local demand, and real-world execution experience. Our goal is to help owners make informed decisions and achieve outcomes aligned with their financial and long-term objectives.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Commercial property owners</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Landowners considering sale or redevelopment</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Owners evaluating timing and market conditions</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Investors repositioning or exiting assets</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
              >
                Discuss Selling Your Property
              </Link>
              <Link 
                href="/contact" 
                className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
              >
                Contact Our Commercial Team
              </Link>
            </div>
          </div>
        </section>

        {/* Why CRD Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              Why CRD
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Ownership-Level Insight
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our commercial team understands transactions from an owner and investor perspective, not just a brokerage lens.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Local Market Knowledge
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We operate daily across Northwest Arkansas and understand the nuances of its submarkets and growth patterns.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Strategy Before Transactions
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every recommendation is built around clarity, positioning, and long-term value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Let's Talk About Your Commercial Real Estate Goals
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Whether you're buying, leasing, or selling, our team is ready to help you evaluate opportunities and move forward with confidence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="#buy-listings" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  View Commercial Listings
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
