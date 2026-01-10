import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Real Estate Development Strategy and Site Selection Services | CRD Real Estate & Development",
  description: "Real estate development consulting services focused on site selection, market feasibility and early stage planning. Supporting landowners, investors and organizations navigating complex real estate decisions.",
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
              Development
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
              Real Estate Development Strategy and Site Selection Services
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
                CRD Real Estate and Development provides real estate development consulting services focused on site selection, market feasibility and early stage planning. We support landowners, investors and organizations navigating complex real estate decisions with clarity and discipline.
              </p>
              <p className="text-black text-base sm:text-lg md:text-2xl leading-relaxed max-w-5xl mx-auto">
                While headquartered in Northwest Arkansas, CRD has supported development initiatives across multiple markets, working with national clients on site selection services and strategic development advisory. Our approach emphasizes repeatable analysis, market specific evaluation and thoughtful coordination where projects move forward.
              </p>
            </div>
          </div>
        </section>

        {/* Development Services Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
                Development Services
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
              {/* Site Selection and Market Evaluation Services */}
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
                    Site Selection and Market Evaluation Services
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    CRD advises clients on site selection by evaluating market dynamics, demographics, access, zoning frameworks and long term growth indicators. This process helps identify locations that align with operational goals, investment strategy and development feasibility.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300 mt-4">
                    We regularly support organizations evaluating opportunities across multiple markets, providing consistent analysis and clear recommendations tailored to each location.
                  </p>
                </div>
              </div>

              {/* Feasibility and Development Strategy */}
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
                    Feasibility and Development Strategy
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Early stage decisions carry the greatest impact. CRD supports feasibility analysis and development strategy by aligning market demand, project goals and financial considerations before significant capital is committed.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300 mt-4">
                    Our team helps clients determine where projects make sense, how they should be positioned and what risks should be addressed early in the process.
                  </p>
                </div>
              </div>

              {/* Strategic Development Advisory Services */}
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
                    Strategic Development Advisory Services
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    CRD serves as a strategic development advisor to clients pursuing growth across single or multiple markets. We support planning, coordination and decision making at the front end of development projects, helping clients move forward with confidence and intention.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300 mt-4">
                    This advisory role allows us to bring structure and clarity to complex initiatives without extending beyond what the project requires.
                  </p>
                </div>
              </div>

              {/* Entitlement and Permitting Support */}
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
                    Entitlement and Permitting Support
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Where appropriate, CRD assists clients in navigating entitlement and permitting processes. We work alongside local consultants, municipalities and project teams to help reduce friction and maintain momentum during planning and approval phases.
                  </p>
                </div>
              </div>

              {/* Design Coordination and Project Oversight */}
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
                    Design Coordination and Project Oversight
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    CRD coordinates with architects, engineers and project partners to ensure design decisions align with development strategy, budgets and timelines. Our involvement helps keep projects organized and aligned as they move from planning into execution.
                  </p>
                </div>
              </div>

              {/* Redevelopment and Adaptive Reuse */}
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
                    Redevelopment and Adaptive Reuse
                  </h3>
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Our experience includes redevelopment and adaptive reuse projects in complex environments where regulatory constraints, existing structures and community considerations must be carefully balanced. This work requires patience, local understanding and disciplined planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Support Section - Flowing text without boxes */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
                Who We Support
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
              <p className="text-gray-700 text-base sm:text-lg md:text-2xl leading-relaxed mb-8 sm:mb-10 text-center">
                CRD works with a range of clients involved in development and expansion, including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="flex items-start gap-2 sm:gap-3 group">
                  <div className="flex-shrink-0 w-4 h-4 sm:w-6 sm:h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-xs sm:text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Developers evaluating new markets or growth opportunities</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 group">
                  <div className="flex-shrink-0 w-4 h-4 sm:w-6 sm:h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-xs sm:text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Investors assessing site viability and long term potential</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 group">
                  <div className="flex-shrink-0 w-4 h-4 sm:w-6 sm:h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-xs sm:text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Landowners planning future development or repositioning</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 group">
                  <div className="flex-shrink-0 w-4 h-4 sm:w-6 sm:h-6 bg-black group-hover:bg-brand-red-700 transition-colors duration-300 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold text-xs sm:text-sm">•</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed group-hover:text-black transition-colors duration-300">Organizations pursuing multi location strategies</span>
                </div>
              </div>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed text-center">
                Our role adapts to the needs of each project and market.
              </p>
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
                    Discovery and Goals
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    We begin by understanding the project vision, objectives and constraints.
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
                    Market and Site Evaluation
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    We assess location specific factors, market demand and development feasibility.
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
                    Strategy and Planning
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    We align site selection, development approach and early stage planning.
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
                    Coordination and Approvals
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    We support coordination with design teams and local stakeholders as needed.
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
                    Execution Support
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                    We remain involved to support informed decision making through delivery.
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
                  Strategy First
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  We focus on early stage clarity to reduce risk and protect long term value.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="group relative pb-8 border-b-2 md:border-b-0 md:border-r-2 border-black/10 md:pr-8 last:border-r-0 hover:border-brand-red-700 transition-colors duration-300 cursor-pointer">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Experience That Translates
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Our approach is built on real world development experience applied thoughtfully across markets.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="group relative pb-8 hover:border-brand-red-700 transition-colors duration-300 cursor-pointer">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Disciplined and Accountable
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Every recommendation is grounded in practicality, transparency and responsibility.
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
                  What types of development projects do you support
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  We support a range of projects including mixed use, multi tenant, redevelopment, adaptive reuse and ground up developments.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="group relative pb-8 border-b-2 border-black/20 hover:border-brand-red-700 transition-colors duration-300">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Do you help with entitlements and permitting
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
                  Can you assist with redevelopment or adaptive reuse projects
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
                  When should I involve CRD in my development project
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Ideally, as early as possible. Early involvement allows for better feasibility analysis, planning and risk management.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="group relative pb-8 border-b-2 border-black/20 hover:border-brand-red-700 transition-colors duration-300">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Do you work across all of Northwest Arkansas
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Yes. We work throughout Bentonville, Rogers, Springdale, Fayetteville and surrounding areas.
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="group relative">
                <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                  Do you provide development services outside of Northwest Arkansas
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl transition-colors duration-300">
                  Yes. While CRD is headquartered in Northwest Arkansas, we also support national clients through site selection services and strategic development advisory in multiple states. Our involvement is tailored to the needs of each project and market.
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
                Let's Talk About Your Development Strategy
              </h2>
              {/* Divider with red accent */}
              <div className="flex items-center justify-center mb-8 sm:mb-10">
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
              <p className="text-base sm:text-lg md:text-2xl text-gray-700 mb-8 sm:mb-10 max-w-5xl mx-auto leading-relaxed px-2">
                Whether you are evaluating sites, planning growth or preparing a project for execution, CRD can help you move forward with clarity and confidence.
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

