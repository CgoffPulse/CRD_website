import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import ClientLogoBanner from "@/components/ClientLogoBanner";

export const metadata = {
  title: "About CRD Real Estate & Development | Northwest Arkansas",
  description: "Learn about CRD Real Estate & Development, our history, impact, and commitment to Northwest Arkansas. Commercial, residential, and development services across Bentonville, Rogers, Springdale, and Fayetteville.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <Image
                src="/images/CRD_Logo.png"
                alt="CRD Real Estate & Development"
                width={600}
                height={180}
                className="h-32 md:h-48 lg:h-56 w-auto mx-auto mb-8"
                priority
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                About CRD Real Estate & Development
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-5xl mx-auto">
                Local expertise. Ownership mindset. Long-term value across Northwest Arkansas.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Who We Are
              </h2>
              {/* Divider with red accent */}
              <div className="flex items-center justify-center mb-8">
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
            <div className="prose prose-lg max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 max-w-5xl mx-auto">
                <div>
                  <p className="text-black text-base md:text-lg leading-relaxed mb-6">
                    CRD Real Estate & Development is a Northwest Arkansas–based real estate firm providing commercial brokerage, residential representation, and end-to-end development services. Headquartered in Downtown Rogers, CRD works across Bentonville, Rogers, Springdale, Fayetteville, and the surrounding region, supporting clients through every stage of the real estate lifecycle.
                  </p>
                </div>
                <div>
                  <p className="text-black text-base md:text-lg leading-relaxed mb-6">
                    What sets CRD apart is an ownership mindset. With hands-on development experience and in-house expertise spanning acquisitions, leasing, investment strategy, and project execution, the team delivers more than transactions — they deliver informed decisions designed to protect value, reduce risk, and create long-term returns for investors, owners, and communities.
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-black pt-8 relative">
                {/* Red accent line */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-black relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
                </div>
                <p className="text-black text-lg md:text-xl leading-relaxed font-semibold text-center max-w-5xl mx-auto">
                  From first-time homebuyers to private investors and complex development projects, CRD brings clarity, strategy, and local expertise to every engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our History Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Our History
              </h2>
              {/* Divider with red accent */}
              <div className="flex items-center justify-center mb-8">
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
            <div className="prose prose-lg max-w-none max-w-5xl mx-auto">
              <p className="text-black text-base md:text-lg leading-relaxed mb-6">
                CRD Real Estate & Development was founded on the principle that real estate success requires more than market knowledge — it requires genuine investment in the communities we serve. Built by professionals who live and work in Northwest Arkansas, CRD brings deep local roots and a long-term perspective to every client relationship.
              </p>
              <p className="text-black text-base md:text-lg leading-relaxed mb-6">
                Over the years, our team has grown from a small firm focused on residential representation to a comprehensive real estate practice serving commercial buyers and sellers, tenants, property owners, and development partners across the region. Our expansion has been driven by client needs and market opportunities, always grounded in our core commitment to strategic guidance and ownership-level expertise.
              </p>
              <p className="text-black text-base md:text-lg leading-relaxed">
                Today, CRD operates from our headquarters in Downtown Rogers, where we've been actively involved in the area's revitalization and growth. Our team's hands-on experience in development, redevelopment, and adaptive reuse projects has positioned us as trusted advisors for clients seeking to invest in, develop, or reposition properties throughout Northwest Arkansas.
              </p>
            </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Our Impact
              </h2>
              {/* Divider with red accent */}
              <div className="flex items-center justify-center mb-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Community Development
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    CRD has played an active role in Northwest Arkansas's growth, particularly in Downtown Rogers and other evolving districts. Our team has supported adaptive reuse conversions, multi-tenant mixed-use redevelopments, and ground-up housing projects that contribute to the region's vitality and long-term value.
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
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Client Success
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    From first-time homebuyers finding their perfect home to investors executing complex commercial transactions, CRD has guided countless clients through successful real estate decisions. Our focus on long-term value and strategic positioning has helped clients protect investments, reduce risk, and achieve their goals.
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
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Market Expertise
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Through years of hands-on experience across commercial, residential, and development real estate, CRD has developed deep insight into Northwest Arkansas market dynamics. This knowledge informs every recommendation and helps clients make decisions aligned with both current conditions and future potential.
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
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Strategic Partnerships
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    CRD works alongside landowners, investors, developers, and business owners to bring clarity to complex decisions. Our collaborative approach and network of trusted partners across brokerage, development, construction, and advisory services enable comprehensive support for clients' diverse needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Logo Banner */}
        <ClientLogoBanner />

        {/* Our Approach Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Our Approach
              </h2>
              {/* Divider with red accent */}
              <div className="flex items-center justify-center mb-8">
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
              <div className="group text-center bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative overflow-hidden cursor-pointer hover:scale-105">
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                {/* Divider with red accent */}
                <div className="w-12 h-1 bg-black mx-auto mb-6 group-hover:w-16 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
                <div className="w-16 h-16 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-sm mx-auto mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                  Ownership Mindset
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                  We think like owners and investors, not just brokers. Every recommendation is made with long-term value, risk management, and strategic positioning in mind.
                </p>
              </div>
              <div className="group text-center bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative overflow-hidden cursor-pointer hover:scale-105">
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                {/* Divider with red accent */}
                <div className="w-12 h-1 bg-black mx-auto mb-6 group-hover:w-16 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
                <div className="w-16 h-16 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-sm mx-auto mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                  Local Knowledge
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                  We live and work in Northwest Arkansas, giving us firsthand understanding of neighborhoods, growth patterns, and market dynamics that shape real estate value.
                </p>
              </div>
              <div className="group text-center bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative overflow-hidden cursor-pointer hover:scale-105">
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                {/* Divider with red accent */}
                <div className="w-12 h-1 bg-black mx-auto mb-6 group-hover:w-16 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
                </div>
                <div className="w-16 h-16 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-sm mx-auto mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                  Strategic Clarity
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                  We focus on providing clear, actionable guidance that helps clients make informed decisions aligned with their business and investment objectives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                What We Stand For
              </h2>
              {/* Divider with red accent */}
              <div className="flex items-center justify-center mb-8">
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
            <div className="space-y-8">
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Divider with red accent */}
                <div className="w-12 h-1 bg-black mb-4 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-brand-red-700 transition-colors duration-300">
                  Client-First Representation
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                  Every transaction is handled with care, transparency, and a focus on what's best for the client. We believe strong outcomes start with strong relationships.
                </p>
              </div>
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Divider with red accent */}
                <div className="w-12 h-1 bg-black mb-4 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-brand-red-700 transition-colors duration-300">
                  Long-Term Perspective
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                  We make recommendations with durability, market relevance, and long-term performance in mind. Every decision is evaluated through the lens of lasting value.
                </p>
              </div>
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Divider with red accent */}
                <div className="w-12 h-1 bg-black mb-4 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-brand-red-700 transition-colors duration-300">
                  Community Investment
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                  As active members of the Northwest Arkansas community, we're invested in the region's success. Our work supports growth that benefits investors, owners, and communities alike.
                </p>
              </div>
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Divider with red accent */}
                <div className="w-12 h-1 bg-black mb-4 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-brand-red-700 transition-colors duration-300">
                  Disciplined Execution
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                  We focus on disciplined planning and thoughtful execution to help clients avoid costly missteps and delays. Strategy matters, but execution determines outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Work With a Team That Knows Northwest Arkansas
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
                Whether you're buying, selling, leasing, investing, or planning a development, our team is ready to help you move forward with confidence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/team" 
                  className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  Meet Our Team
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

