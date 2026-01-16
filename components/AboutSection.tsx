import Image from "next/image";
import AnimatedUnderline from "@/components/AnimatedUnderline";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Text Content - Single Wide Paragraph */}
        <div className="mx-auto max-w-6xl">
          <div className="group relative mb-6 border-2 border-black bg-white p-6 shadow-lg sm:mb-8 sm:p-8 md:p-12">
            {/* Corner accents with subtle red */}
            <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 transition-colors duration-300 group-hover:border-brand-red-700" />
            <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 transition-colors duration-300 group-hover:border-brand-red-700" />
            <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 transition-colors duration-300 group-hover:border-brand-red-700" />
            <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 transition-colors duration-300 group-hover:border-brand-red-700" />
            {/* Subtle red accent line */}
            <div className="absolute top-0 left-1/2 h-0.5 w-24 -translate-x-1/2 transform bg-brand-red-700 opacity-20 transition-opacity duration-300 group-hover:opacity-40" />

            {/* Logo - Inside Card */}
            <div className="mb-8 flex flex-col items-center sm:mb-10 md:mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-black/5 blur-xl" />
                <Image
                  alt="CRD Real Estate & Development"
                  className="relative z-10 h-32 w-auto sm:h-48 md:h-56 lg:h-64"
                  height={150}
                  priority
                  src="/images/CRD_Logo.png"
                  width={500}
                />
              </div>
            </div>

            <p className="mb-6 text-base text-black leading-relaxed sm:mb-8 sm:text-lg md:text-xl">
              CRD Real Estate & Development is a Northwest Arkansas based
              full-service brokerage providing commercial brokerage, residential
              representation, and end-to-end development services. Headquartered
              in Downtown Rogers, CRD works across Bentonville, Rogers,
              Springdale, Fayetteville, and the surrounding region, supporting
              clients through every stage of the real estate lifecycle.
            </p>
            <p className="text-base text-black leading-relaxed sm:text-lg md:text-xl">
              What sets CRD apart is an ownership mindset. With hands-on
              development experience and in-house expertise spanning
              acquisitions, leasing, investment strategy, and project execution,
              the team delivers more than transactions, they deliver informed
              decisions designed to protect value, reduce risk, and create
              long-term returns for investors, owners, and communities.
            </p>
          </div>

          {/* Full Width Emphasis Line with red accent for text splitter */}
          <div className="relative mt-12 border-black border-t-2 pt-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <AnimatedUnderline width="w-16" delay={100} />
            </div>
            <div className="relative border-2 border-black bg-white p-6 shadow-md sm:p-8 md:p-10">
              {/* Subtle red accent corners */}
              <div className="absolute top-2 right-2 h-2 w-2 bg-brand-red-700 opacity-10" />
              <div className="absolute bottom-2 left-2 h-2 w-2 bg-brand-red-700 opacity-10" />
              <p className="mx-auto max-w-5xl px-2 text-center font-semibold text-base text-black leading-relaxed sm:text-lg md:text-2xl">
                From strategic acquisitions to complex development projects, CRD
                brings clarity, discipline, and local expertise to every
                engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
