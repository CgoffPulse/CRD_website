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
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute top-1/2 left-1/2 w-full h-full object-cover"
              style={{
                transform: 'translate(-50%, -50%)',
                minWidth: '100%',
                minHeight: '100%',
              }}
            >
              <source
                src="/images/South edge of building to east edge of building drone is facing downtown.MP4"
                type="video/mp4"
              />
            </video>
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl text-center pt-24 sm:pt-32">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight drop-shadow-2xl">
              Real Estate Development Services in Northwest Arkansas
            </h1>
            {/* Divider with red accent */}
            <div className="flex items-center justify-center mb-6 sm:mb-10">
              <div className="w-16 sm:w-24 h-1 bg-white relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-60"></div>
              </div>
              <div className="w-2 h-2 bg-white mx-1.5 sm:mx-2 relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-70"></div>
              </div>
              <div className="w-16 sm:w-24 h-1 bg-white relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-60"></div>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white max-w-5xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow-lg px-2">
              Strategic development support from site selection through delivery. Helping landowners, investors, and developers plan and execute projects built for long-term value.
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
                className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm bg-white text-black hover:bg-gray-100 border-2 border-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Intro Section - Flowing text without boxes */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
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
            <div className="prose prose-lg max-w-none">
              <p className="text-black text-base sm:text-lg md:text-2xl leading-relaxed mb-6 sm:mb-10 max-w-5xl mx-auto">
                CRD Real Estate & Development provides end-to-end real estate development services across Northwest Arkansas, supporting projects from early-stage evaluation through execution and delivery. Our team works alongside landowners, investors, and development partners to bring clarity to complex decisions and align projects with market realities, regulatory requirements, and long-term goals.
              </p>
              <p className="text-black text-base sm:text-lg md:text-2xl leading-relaxed max-w-5xl mx-auto">
                With hands-on experience across redevelopment, adaptive reuse, mixed-use, and ground-up projects, CRD brings a practical, strategy-first approach to development. We understand the nuances of local municipalities, historic districts, and growth corridors, allowing our clients to move forward with confidence and fewer surprises.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
                What We Do
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Site Selection & Feasibility */}
              <div className="group bg-white border-2 border-black shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Site Selection & Feasibility
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    We evaluate potential sites through market analysis, zoning considerations, infrastructure access, and highest-and-best-use assessment to help determine whether a project is viable before major capital is committed.
                  </p>
                </div>
              </div>

              {/* Entitlement & Permitting Support */}
              <div className="group bg-white border-2 border-black shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Entitlement & Permitting Support
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    CRD helps navigate entitlement processes, rezoning considerations, and permitting paths by coordinating with local municipalities and consultants, reducing friction and uncertainty during early project stages.
                  </p>
                </div>
              </div>

              {/* Development Strategy & Pro Forma Guidance */}
              <div className="group bg-white border-2 border-black shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Development Strategy & Pro Forma Guidance
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    We assist clients in aligning development concepts with realistic budgets, timelines, and market demand, supporting informed decision-making before design and construction begin.
                  </p>
                </div>
              </div>

              {/* Design Coordination */}
              <div className="group bg-white border-2 border-black shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Design Coordination
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    CRD works with architects, engineers, and design teams to ensure plans align with project goals, site constraints, and approval requirements while maintaining momentum through the design phase.
                  </p>
                </div>
              </div>

              {/* Project Oversight & Vendor Coordination */}
              <div className="group bg-white border-2 border-black shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Project Oversight & Vendor Coordination
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    From consultants to contractors, we help coordinate key parties involved in the development process to keep projects organized, aligned, and moving forward.
                  </p>
                </div>
              </div>

              {/* Redevelopment, Adaptive Reuse & Mixed-Use Projects */}
              <div className="group bg-white border-2 border-black shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Redevelopment, Adaptive Reuse & Mixed-Use Projects
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Our experience includes adaptive reuse and redevelopment projects, particularly in Downtown Rogers and other evolving districts, where understanding context, regulations, and community impact is critical.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Work With Section - Flowing text without boxes */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
                Who We Work With
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
            <div className="max-w-5xl mx-auto">
              <p className="text-gray-700 text-xl md:text-2xl leading-relaxed mb-10 text-center">
                CRD partners with a wide range of clients involved in development throughout Northwest Arkansas, including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-lg md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Landowners evaluating highest-and-best use</span>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-lg md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Investors seeking development-ready opportunities</span>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-lg md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Developers needing local market and entitlement support</span>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-lg md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Business owners planning expansions or new builds</span>
                </div>
                <div className="flex items-start gap-3 md:col-span-2 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-lg md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Groups pursuing mixed-use or multi-tenant projects</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Our Development Process Works - Flowing design with red accents */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
                How Our Development Process Works
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
            <div className="space-y-12 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="group flex flex-col md:flex-row gap-8 items-start relative">
                {/* Red accent line on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300 hidden md:block"></div>
                <div className="flex-shrink-0 w-16 h-16 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-sm flex items-center justify-center font-bold text-2xl md:text-3xl text-white relative z-10">
                  1
                </div>
                <div className="flex-1 relative pl-8 md:pl-0">
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Discovery & Goals
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    We begin by understanding the project vision, financial goals, timeline expectations, and risk considerations.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group flex flex-col md:flex-row gap-8 items-start relative">
                {/* Red accent line on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300 hidden md:block"></div>
                <div className="flex-shrink-0 w-16 h-16 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-sm flex items-center justify-center font-bold text-2xl md:text-3xl text-white relative z-10">
                  2
                </div>
                <div className="flex-1 relative pl-8 md:pl-0">
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Site & Market Evaluation
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    Our team evaluates site conditions, zoning, surrounding uses, and market dynamics to assess feasibility and constraints.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group flex flex-col md:flex-row gap-8 items-start relative">
                {/* Red accent line on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300 hidden md:block"></div>
                <div className="flex-shrink-0 w-16 h-16 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-sm flex items-center justify-center font-bold text-2xl md:text-3xl text-white relative z-10">
                  3
                </div>
                <div className="flex-1 relative pl-8 md:pl-0">
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Entitlements & Planning Path
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    We help map the entitlement and permitting path, coordinating with local jurisdictions and consultants as needed.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="group flex flex-col md:flex-row gap-8 items-start relative">
                {/* Red accent line on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300 hidden md:block"></div>
                <div className="flex-shrink-0 w-16 h-16 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-sm flex items-center justify-center font-bold text-2xl md:text-3xl text-white relative z-10">
                  4
                </div>
                <div className="flex-1 relative pl-8 md:pl-0">
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Design & Budget Alignment
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    CRD supports alignment between design concepts, budgets, and development strategy before execution begins.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="group flex flex-col md:flex-row gap-8 items-start relative">
                {/* Red accent line on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300 hidden md:block"></div>
                <div className="flex-shrink-0 w-16 h-16 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-sm flex items-center justify-center font-bold text-2xl md:text-3xl text-white relative z-10">
                  5
                </div>
                <div className="flex-1 relative pl-8 md:pl-0">
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 group-hover:text-brand-red-700 transition-colors duration-300">
                    Execution Support & Delivery
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    As the project moves forward, we remain involved to support coordination, decision-making, and momentum through delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why CRD Section - Enhanced with red accents and hover effects */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
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
              {/* Pillar 1 */}
              <div className="group relative pb-8 border-b-2 md:border-b-0 md:border-r-2 border-black/10 md:pr-8 last:border-r-0 hover:border-brand-red-700 transition-colors duration-300 cursor-pointer">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Local Knowledge, Real Execution
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Our team brings firsthand experience navigating development across Northwest Arkansas, including historic districts and growth corridors.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="group relative pb-8 border-b-2 md:border-b-0 md:border-r-2 border-black/10 md:pr-8 last:border-r-0 hover:border-brand-red-700 transition-colors duration-300 cursor-pointer">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Strategy First, Details Matter
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  We focus on disciplined planning and thoughtful execution to help clients avoid costly missteps and delays.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="group relative pb-8 hover:border-brand-red-700 transition-colors duration-300 cursor-pointer">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Built for Long-Term Value
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Every recommendation is made with durability, market relevance, and long-term performance in mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Flowing design without boxes */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
                Frequently Asked Questions
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
            <div className="space-y-12 max-w-5xl mx-auto">
              {/* FAQ 1 */}
              <div className="group relative pb-8 border-b-2 border-black/20 hover:border-brand-red-700 transition-colors duration-300">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  What types of development projects do you support?
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  We support a range of projects including mixed-use, multi-tenant, redevelopment, adaptive reuse, and ground-up developments.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="group relative pb-8 border-b-2 border-black/20 hover:border-brand-red-700 transition-colors duration-300">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Do you help with entitlements and permitting?
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Yes. We assist clients in understanding and navigating entitlement and permitting processes in coordination with local municipalities and consultants.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="group relative pb-8 border-b-2 border-black/20 hover:border-brand-red-700 transition-colors duration-300">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Can you assist with redevelopment or adaptive reuse projects?
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Yes. Our team has experience supporting redevelopment and adaptive reuse projects, particularly in Downtown Rogers and similar districts.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="group relative pb-8 border-b-2 border-black/20 hover:border-brand-red-700 transition-colors duration-300">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  When should I involve CRD in my development project?
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Ideally, as early as possible. Early involvement allows for better feasibility analysis, planning, and risk management.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="group relative">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Do you work across all of Northwest Arkansas?
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Yes. We work throughout Bentonville, Rogers, Springdale, Fayetteville, and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
                Let's Talk About Your Development Project
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
              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-5xl mx-auto leading-relaxed">
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

