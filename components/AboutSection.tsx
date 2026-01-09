import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Logo - Larger Size */}
        <div className="flex flex-col items-center mb-12">
          <Image
            src="/images/CRDLOGO1.png"
            alt="CRD Real Estate & Development"
            width={500}
            height={150}
            className="h-32 md:h-40 w-auto mb-12"
            priority
          />
        </div>

        {/* Text Content - Flowing Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* First Column */}
            <div>
              <p className="text-black text-base md:text-lg leading-relaxed mb-6">
                CRD Real Estate & Development is a Northwest Arkansas–based real estate firm providing commercial brokerage, residential representation, and end-to-end development services. Headquartered in Downtown Rogers, CRD works across Bentonville, Rogers, Springdale, Fayetteville, and the surrounding region, supporting clients through every stage of the real estate lifecycle.
              </p>
            </div>
            
            {/* Second Column */}
            <div>
              <p className="text-black text-base md:text-lg leading-relaxed mb-6">
                What sets CRD apart is an ownership mindset. With hands-on development experience and in-house expertise spanning acquisitions, leasing, investment strategy, and project execution, the team delivers more than transactions — they deliver informed decisions designed to protect value, reduce risk, and create long-term returns for investors, owners, and communities.
              </p>
            </div>
          </div>
          
          {/* Full Width Emphasis Line */}
          <div className="mt-8 pt-8 border-t border-gray-300">
            <p className="text-black text-lg md:text-xl leading-relaxed font-semibold text-center max-w-3xl mx-auto">
              From first-time homebuyers to private investors and complex development projects, CRD brings clarity, strategy, and local expertise to every engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

