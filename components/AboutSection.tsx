import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-black rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-2 border-black rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Logo - Larger Size */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-black/5 blur-xl"></div>
            <Image
              src="/images/CRD_Logo.png"
              alt="CRD Real Estate & Development"
              width={500}
              height={150}
              className="h-32 md:h-40 w-auto relative z-10"
              priority
            />
          </div>
        </div>

        {/* Text Content - Single Wide Paragraph */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-2 border-black shadow-lg p-8 md:p-12 mb-8 relative group">
            {/* Corner accents with subtle red */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black group-hover:border-brand-red-700 transition-colors duration-300"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black group-hover:border-brand-red-700 transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black group-hover:border-brand-red-700 transition-colors duration-300"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black group-hover:border-brand-red-700 transition-colors duration-300"></div>
            {/* Subtle red accent line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-brand-red-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            
            <p className="text-black text-lg md:text-xl leading-relaxed mb-8">
              CRD Real Estate & Development is a Northwest Arkansas–based real estate firm providing commercial brokerage, residential representation, and end-to-end development services. Headquartered in Downtown Rogers, CRD works across Bentonville, Rogers, Springdale, Fayetteville, and the surrounding region, supporting clients through every stage of the real estate lifecycle.
            </p>
            <p className="text-black text-lg md:text-xl leading-relaxed">
              What sets CRD apart is an ownership mindset. With hands-on development experience and in-house expertise spanning acquisitions, leasing, investment strategy, and project execution, the team delivers more than transactions — they deliver informed decisions designed to protect value, reduce risk, and create long-term returns for investors, owners, and communities.
            </p>
          </div>
          
          {/* Full Width Emphasis Line with red accent for text splitter */}
          <div className="mt-12 pt-12 border-t-2 border-black relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
              </div>
            </div>
            <div className="bg-white border-2 border-black shadow-md p-8 md:p-10 relative">
              {/* Subtle red accent corners */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-brand-red-700 opacity-10"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-brand-red-700 opacity-10"></div>
              <p className="text-black text-xl md:text-2xl leading-relaxed font-semibold text-center max-w-5xl mx-auto">
                From first-time homebuyers to private investors and complex development projects, CRD brings clarity, strategy, and local expertise to every engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

