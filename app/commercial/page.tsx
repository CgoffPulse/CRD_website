import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import CommercialListings from "./CommercialListings";

export const metadata = {
  title: "Commercial Real Estate in Northwest Arkansas | CRD Real Estate & Development",
  description: "Strategic guidance for buying, leasing, and selling commercial property across Northwest Arkansas. Commercial property for sale and lease in Bentonville, Rogers, Springdale, and Fayetteville.",
};

export default function CommercialPage() {
  // NOTE: The Buy listings below are placeholder listings and will be replaced with live MLS or CMS-driven data in the future.
  const buyListings = [
    {
      id: "201-e-walnut-st-11",
      title: "Development Lot – Downtown Rogers",
      price: "$1",
      location: "201 E Walnut St #11, Rogers, AR 72756",
      imageSrc: "/images/201_e_Walnut_St_11_View.webp",
      summary: "Prime hard corner development lot in rapidly growing and thriving Downtown Rogers. T5.2 zoning allows for high density development with multiple uses. Positioned in the middle of several active and future development projects, this site provides unlimited investment opportunities. Accepting offers: proof of funds and intended use required with offer submitted.",
      bullets: [
        "6,969.6 sq ft lot",
        "Unimproved Land",
        "T5.2 zoning - High density development",
        "Multiple uses allowed",
        "Hard corner development lot",
        "Central Business District location",
        "MLS#: 1301467",
        "Annual tax: $693",
      ],
      href: "/commercial/buy/201-e-walnut-st-11",
      galleryImages: [
        "/images/201_e_Walnut_St_11_View.webp",
        "/images/201_E_Walnut_St_11_Commercial_Lot_In_Rogers_For_Sale.webp",
        "/images/201_e_walnut_st_11_Zoomed_out_map.webp",
        "/images/201_e_walnut_st_land_lot.webp",
      ],
      mlsNumber: "1301467",
      propertyDetails: {
        lot: {
          size: "6,969.6 Square Feet",
          features: "Central Business District, City Lot, Level, Other, See Remarks",
        },
        property: {
          fencing: "Partial",
          exteriorFeatures: "Cleared",
        },
        details: {
          parcelNumber: "0202198000",
        },
        construction: {
          homeType: "Unimproved Land",
        },
        location: {
          region: "Rogers",
        },
        financial: {
          annualTaxAmount: "$693",
          dateOnMarket: "3/17/2025",
        },
      },
    },
  ];

  // NOTE: The Lease listings below are placeholder listings and will be replaced with live MLS or CMS-driven data in the future.
  const leaseListings: any[] = [];


  return (
    <>
      <Header />
      <main className="pt-0 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[500px] md:h-[70vh] md:min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/Rogers_Skyline.webp"
              alt="Rogers, Arkansas Skyline - Commercial Real Estate"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Overlaid Content */}
          <div className="relative z-10 container mx-auto px-6 max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-lg leading-tight">
              Commercial Real Estate in Northwest Arkansas
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-5xl mx-auto mb-10 drop-shadow-md leading-relaxed">
              Strategic guidance for buying, leasing, and selling commercial property across Northwest Arkansas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="#buy-listings" 
                className="bg-white text-black border-2 border-white hover:bg-gray-100 inline-flex items-center justify-center px-8 py-3 rounded-none text-sm font-semibold transition-colors"
              >
                View Commercial Listings
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black inline-flex items-center justify-center px-8 py-3 rounded-none text-sm font-semibold transition-colors"
              >
                Talk With Our Team
              </Link>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
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

        {/* Commercial Listings Section */}
        <CommercialListings buyListings={buyListings} leaseListings={leaseListings} />

        {/* Sell Commercial Property Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                Thinking About Selling Commercial Property?
              </h2>
              {/* Divider with red accent */}
              <div className="flex items-center justify-center mb-10">
                <div className="w-24 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
                <div className="w-2 h-2 bg-black mx-2 relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
                </div>
                <div className="w-24 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-black text-lg md:text-xl leading-relaxed mb-8">
                Selling commercial real estate requires more than listing a property — it requires positioning, market insight, and a clear strategy. CRD works directly with property owners and landowners to evaluate opportunities, price assets accurately, and bring properties to market with intention.
              </p>
              <p className="text-black text-lg md:text-xl leading-relaxed mb-10">
                Whether you're selling an income-producing property, vacant land, or a redevelopment opportunity, our team provides guidance grounded in market data, local demand, and real-world execution experience. Our goal is to help owners make informed decisions and achieve outcomes aligned with their financial and long-term objectives.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
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
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8">
                Why CRD
              </h2>
              {/* Divider with red accent */}
              <div className="flex items-center justify-center mb-12">
                <div className="w-24 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
                <div className="w-2 h-2 bg-black mx-2 relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
                </div>
                <div className="w-24 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                {/* Corner accents with red */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Divider with red accent */}
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Ownership-Level Insight
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Our commercial team understands transactions from an owner and investor perspective, not just a brokerage lens.
                  </p>
                </div>
              </div>
              
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                {/* Corner accents with red */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Divider with red accent */}
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Local Market Knowledge
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    We operate daily across Northwest Arkansas and understand the nuances of its submarkets and growth patterns.
                  </p>
                </div>
              </div>
              
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                {/* Corner accents with red */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Divider with red accent */}
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Strategy Before Transactions
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Every recommendation is built around clarity, positioning, and long-term value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                Let's Talk About Your Commercial Real Estate Goals
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
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
