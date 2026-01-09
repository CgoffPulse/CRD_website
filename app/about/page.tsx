import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

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
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <Image
                src="/images/CRDLOGO1.png"
                alt="CRD Real Estate & Development"
                width={400}
                height={120}
                className="h-24 md:h-32 w-auto mx-auto mb-8"
                priority
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                About CRD Real Estate & Development
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Local expertise. Ownership mindset. Long-term value across Northwest Arkansas.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Who We Are
              </h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
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
              <div className="border-t border-gray-300 pt-8">
                <p className="text-black text-lg md:text-xl leading-relaxed font-semibold text-center max-w-3xl mx-auto">
                  From first-time homebuyers to private investors and complex development projects, CRD brings clarity, strategy, and local expertise to every engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our History Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Our History
              </h2>
            </div>
            <div className="prose prose-lg max-w-none">
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Community Development
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  CRD has played an active role in Northwest Arkansas's growth, particularly in Downtown Rogers and other evolving districts. Our team has supported adaptive reuse conversions, multi-tenant mixed-use redevelopments, and ground-up housing projects that contribute to the region's vitality and long-term value.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Client Success
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  From first-time homebuyers finding their perfect home to investors executing complex commercial transactions, CRD has guided countless clients through successful real estate decisions. Our focus on long-term value and strategic positioning has helped clients protect investments, reduce risk, and achieve their goals.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Market Expertise
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Through years of hands-on experience across commercial, residential, and development real estate, CRD has developed deep insight into Northwest Arkansas market dynamics. This knowledge informs every recommendation and helps clients make decisions aligned with both current conditions and future potential.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-4">
                  Strategic Partnerships
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  CRD works alongside landowners, investors, developers, and business owners to bring clarity to complex decisions. Our collaborative approach and network of trusted partners across brokerage, development, construction, and advisory services enable comprehensive support for clients' diverse needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Our Approach
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-sm mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Ownership Mindset
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We think like owners and investors, not just brokers. Every recommendation is made with long-term value, risk management, and strategic positioning in mind.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-sm mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Local Knowledge
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We live and work in Northwest Arkansas, giving us firsthand understanding of neighborhoods, growth patterns, and market dynamics that shape real estate value.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-sm mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Strategic Clarity
                </h3>
                <p className="text-gray-700 leading-relaxed">
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
            </div>
            <div className="space-y-8">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  Client-First Representation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every transaction is handled with care, transparency, and a focus on what's best for the client. We believe strong outcomes start with strong relationships.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  Long-Term Perspective
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We make recommendations with durability, market relevance, and long-term performance in mind. Every decision is evaluated through the lens of lasting value.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  Community Investment
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  As active members of the Northwest Arkansas community, we're invested in the region's success. Our work supports growth that benefits investors, owners, and communities alike.
                </p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  Disciplined Execution
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We focus on disciplined planning and thoughtful execution to help clients avoid costly missteps and delays. Strategy matters, but execution determines outcomes.
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
                Work With a Team That Knows Northwest Arkansas
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
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

