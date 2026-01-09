import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Real Estate Development Services in Northwest Arkansas | CRD Real Estate & Development",
  description: "Strategic development support from site selection through delivery. End-to-end real estate development services across Northwest Arkansas including Bentonville, Rogers, Springdale, and Fayetteville.",
};

export default function DevelopmentPage() {
  return (
    <>
      <Header />
      <main className="pt-32 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                Real Estate Development Services in Northwest Arkansas
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Strategic development support from site selection through delivery — helping landowners, investors, and developers plan and execute projects built for long-term value.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  Discuss a Project
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
                CRD Real Estate & Development provides end-to-end real estate development services across Northwest Arkansas, supporting projects from early-stage evaluation through execution and delivery. Our team works alongside landowners, investors, and development partners to bring clarity to complex decisions and align projects with market realities, regulatory requirements, and long-term goals.
              </p>
              <p className="text-black text-base md:text-lg leading-relaxed">
                With hands-on experience across redevelopment, adaptive reuse, mixed-use, and ground-up projects, CRD brings a practical, strategy-first approach to development. We understand the nuances of local municipalities, historic districts, and growth corridors — allowing our clients to move forward with confidence and fewer surprises.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Site Selection & Feasibility */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm hover:scale-110 transition-transform duration-300 cursor-default">
                <h3 className="text-xl font-bold text-black mb-4">
                  Site Selection & Feasibility
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  We evaluate potential sites through market analysis, zoning considerations, infrastructure access, and highest-and-best-use assessment to help determine whether a project is viable before major capital is committed.
                </p>
              </div>

              {/* Entitlement & Permitting Support */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm hover:scale-110 transition-transform duration-300 cursor-default">
                <h3 className="text-xl font-bold text-black mb-4">
                  Entitlement & Permitting Support
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  CRD helps navigate entitlement processes, rezoning considerations, and permitting paths by coordinating with local municipalities and consultants, reducing friction and uncertainty during early project stages.
                </p>
              </div>

              {/* Development Strategy & Pro Forma Guidance */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm hover:scale-110 transition-transform duration-300 cursor-default">
                <h3 className="text-xl font-bold text-black mb-4">
                  Development Strategy & Pro Forma Guidance
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  We assist clients in aligning development concepts with realistic budgets, timelines, and market demand, supporting informed decision-making before design and construction begin.
                </p>
              </div>

              {/* Design Coordination */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm hover:scale-110 transition-transform duration-300 cursor-default">
                <h3 className="text-xl font-bold text-black mb-4">
                  Design Coordination
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  CRD works with architects, engineers, and design teams to ensure plans align with project goals, site constraints, and approval requirements while maintaining momentum through the design phase.
                </p>
              </div>

              {/* Project Oversight & Vendor Coordination */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm hover:scale-110 transition-transform duration-300 cursor-default">
                <h3 className="text-xl font-bold text-black mb-4">
                  Project Oversight & Vendor Coordination
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  From consultants to contractors, we help coordinate key parties involved in the development process to keep projects organized, aligned, and moving forward.
                </p>
              </div>

              {/* Redevelopment, Adaptive Reuse & Mixed-Use Projects */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm hover:scale-110 transition-transform duration-300 cursor-default">
                <h3 className="text-xl font-bold text-black mb-4">
                  Redevelopment, Adaptive Reuse & Mixed-Use Projects
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Our experience includes adaptive reuse and redevelopment projects, particularly in Downtown Rogers and other evolving districts, where understanding context, regulations, and community impact is critical.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Work With Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
              Who We Work With
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              CRD partners with a wide range of clients involved in development throughout Northwest Arkansas, including:
            </p>
            <ul className="space-y-3 text-gray-700 text-base">
              <li className="flex items-start gap-3">
                <span className="text-black font-semibold">•</span>
                <span>Landowners evaluating highest-and-best use</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black font-semibold">•</span>
                <span>Investors seeking development-ready opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black font-semibold">•</span>
                <span>Developers needing local market and entitlement support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black font-semibold">•</span>
                <span>Business owners planning expansions or new builds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black font-semibold">•</span>
                <span>Groups pursuing mixed-use or multi-tenant projects</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How Our Development Process Works */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              How Our Development Process Works
            </h2>
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-sm flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">
                    Discovery & Goals
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We begin by understanding the project vision, financial goals, timeline expectations, and risk considerations.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-sm flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">
                    Site & Market Evaluation
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our team evaluates site conditions, zoning, surrounding uses, and market dynamics to assess feasibility and constraints.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-sm flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">
                    Entitlements & Planning Path
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We help map the entitlement and permitting path, coordinating with local jurisdictions and consultants as needed.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-sm flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">
                    Design & Budget Alignment
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    CRD supports alignment between design concepts, budgets, and development strategy before execution begins.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-sm flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">
                    Execution Support & Delivery
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    As the project moves forward, we remain involved to support coordination, decision-making, and momentum through delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why CRD Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              Why CRD
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Local Knowledge, Real Execution
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our team brings firsthand experience navigating development across Northwest Arkansas, including historic districts and growth corridors.
                </p>
              </div>

              {/* Pillar 2 */}
              <div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Strategy First, Details Matter
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We focus on disciplined planning and thoughtful execution to help clients avoid costly missteps and delays.
                </p>
              </div>

              {/* Pillar 3 */}
              <div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Built for Long-Term Value
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every recommendation is made with durability, market relevance, and long-term performance in mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  What types of development projects do you support?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We support a range of projects including mixed-use, multi-tenant, redevelopment, adaptive reuse, and ground-up developments.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  Do you help with entitlements and permitting?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes. We assist clients in understanding and navigating entitlement and permitting processes in coordination with local municipalities and consultants.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  Can you assist with redevelopment or adaptive reuse projects?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes. Our team has experience supporting redevelopment and adaptive reuse projects, particularly in Downtown Rogers and similar districts.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  When should I involve CRD in my development project?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Ideally, as early as possible. Early involvement allows for better feasibility analysis, planning, and risk management.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-sm">
                <h3 className="text-xl font-bold text-black mb-3">
                  Do you work across all of Northwest Arkansas?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes. We work throughout Bentonville, Rogers, Springdale, Fayetteville, and surrounding areas.
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
                Let's Talk About Your Development Project
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Tell us what you're planning and where. We'll help you evaluate the opportunity, map the path forward, and move ahead with clarity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  Discuss a Project
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

