import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import ResidentialListings from "./ResidentialListings";

export const metadata = {
  title: "Residential Real Estate in Northwest Arkansas | CRD Real Estate & Development",
  description: "Local expertise and thoughtful guidance for buyers, sellers, and investors across Northwest Arkansas. Homes for sale in Bentonville, Rogers, Springdale, and Fayetteville.",
};

export default function ResidentialPage() {

  return (
    <>
      <Header />
      <main className="pt-0 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[500px] md:h-[70vh] md:min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/Rogers_AR_Hero.jpg"
              alt="Rogers, Arkansas - Residential Real Estate"
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
              Residential Real Estate in Northwest Arkansas
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-5xl mx-auto mb-10 drop-shadow-md leading-relaxed">
              Local expertise and thoughtful guidance for buyers, sellers, and investors across Northwest Arkansas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="#listings" 
                className="bg-white text-black border-2 border-white hover:bg-gray-100 inline-flex items-center justify-center px-8 py-3 rounded-none text-sm font-semibold transition-colors"
              >
                View Current Listings
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black inline-flex items-center justify-center px-8 py-3 rounded-none text-sm font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 relative">
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

        {/* Listings Section */}
        <section id="listings" className="py-16 md:py-20 bg-white relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gray-600 border-b-2 border-black pb-2 relative">
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-30"></span>
                  AVAILABLE PROPERTIES
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
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
            <ResidentialListings />
          </div>
        </section>

        {/* Residential Services Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 text-center">
              How We Support Residential Clients
            </h2>
            <div className="flex items-center justify-center mb-10">
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
              </div>
              <div className="w-2 h-2 bg-black mx-2 relative">
                <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
              </div>
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-navy-700 opacity-30"></div>
              </div>
            </div>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-12 text-center max-w-5xl mx-auto">
              Our residential clients work directly with experienced professionals who guide every step of the process — from first showing through closing and beyond. CRD provides clear communication, strong negotiation, and local insight tailored to each client's goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02]">
                {/* Combined red and navy accent lines on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                  <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Buyer representation</span>
              </div>
              <div className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02]">
                {/* Combined red and navy accent lines on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                  <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Seller representation</span>
              </div>
              <div className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02]">
                {/* Combined red and navy accent lines on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                  <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Residential investment properties</span>
              </div>
              <div className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02]">
                {/* Combined red and navy accent lines on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                  <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Relocation support</span>
              </div>
              <div className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 md:col-span-2 md:justify-center relative overflow-hidden hover:scale-[1.02]">
                {/* Combined red and navy accent lines on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                  <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Market pricing and negotiation strategy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why CRD Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 text-center">
              Why CRD
            </h2>
            <div className="flex items-center justify-center mb-12">
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
              </div>
              <div className="w-2 h-2 bg-black mx-2 relative">
                <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
              </div>
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-navy-700 opacity-30"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-black shadow-lg p-8 md:p-10 hover:shadow-2xl transition-all duration-300 relative group cursor-pointer hover:scale-[1.02] overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-navy-700 transition-all duration-300"></div>
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Local Knowledge That Matters
                </h3>
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg transition-colors duration-300">
                  We understand Northwest Arkansas neighborhoods because we live here — and that insight helps clients make better decisions.
                </p>
              </div>
              <div className="bg-white border-2 border-black shadow-lg p-8 md:p-10 hover:shadow-2xl transition-all duration-300 relative group cursor-pointer hover:scale-[1.02] overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-navy-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Navy accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-navy-700 transition-colors duration-300">
                  Client-First Representation
                </h3>
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg transition-colors duration-300">
                  Every transaction is handled with care, transparency, and a focus on what's best for the client.
                </p>
              </div>
              <div className="bg-white border-2 border-black shadow-lg p-8 md:p-10 hover:shadow-2xl transition-all duration-300 relative group cursor-pointer hover:scale-[1.02] overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-navy-700 transition-all duration-300"></div>
                {/* Combined red and navy accent lines on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Clear, Confident Guidance
                </h3>
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-red-700 to-navy-700 opacity-40"></div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg transition-colors duration-300">
                  From offer to close, we help clients move forward with clarity and confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-32 h-32 border-2 border-black rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-black rounded-full"></div>
          </div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="text-center bg-white border-2 border-black shadow-2xl p-10 md:p-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8">
                Looking for a Home in Northwest Arkansas?
              </h2>
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
                <div className="w-2 h-2 bg-black mx-2 relative">
                  <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
                </div>
                <div className="w-16 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-navy-700 opacity-30"></div>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
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
                  href="mailto:jgill@crdred.com,rhondamooresellsnwa@gmail.com?subject=Residential Real Estate Inquiry" 
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
