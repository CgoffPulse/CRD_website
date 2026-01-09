import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Our Team | CRD Real Estate & Development",
  description: "Meet the professionals behind CRD Real Estate & Development.",
};

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="pt-32 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
                Our Team
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                Local expertise. Strategic guidance. People you can trust with meaningful real estate decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="text-black text-base leading-relaxed">
                CRD Real Estate & Development is built around people who understand Northwest Arkansas — not just the market, but the communities, neighborhoods, and long-term implications behind every real estate decision. Our team brings deep local roots, professional experience across commercial, residential, and development real estate, and a shared commitment to guiding clients with clarity and care.
              </p>
              <p className="text-black text-base leading-relaxed">
                We believe strong outcomes start with strong relationships. That's why clients work directly with experienced professionals who listen closely, communicate clearly, and stay engaged from first conversation through closing and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="space-y-16">
              {/* Hannah Cicioni */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                <div className="flex-shrink-0 w-full md:w-80">
                  <Image
                    src="/images/team/Hanna_Real_Estate.webp"
                    alt="Hannah Cicioni"
                    width={320}
                    height={320}
                    className="w-full rounded-sm object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    Hannah Cicioni
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 font-semibold">
                    Commercial Executive Broker / Owner
                  </p>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      With over 12 years of experience in commercial real estate and development, Hannah Cicioni is a seasoned leader in the Northwest Arkansas real estate landscape. As Co-Owner and Commercial Executive Broker of CRD Real Estate & Development, she has helped guide projects that support growth and revitalization across the region's downtown districts. Hannah's work spans adaptive re-use conversions for hospitality-driven developments, multi-tenant mixed-use redevelopments, and ground-up housing projects. She brings a strategic, execution-minded approach that helps investors, owners, and developers make confident decisions backed by real-world development experience. Deeply invested in the community—especially Downtown Rogers—Hannah is actively involved through multiple businesses and development projects, with a focus on long-term value and responsible growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Jenna Gill */}
              <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-start">
                <div className="flex-shrink-0 w-full md:w-80">
                  <Image
                    src="/images/team/Jenna_Realestate_Agent.webp"
                    alt="Jenna Gill"
                    width={320}
                    height={320}
                    className="w-full rounded-sm object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    Jenna Gill
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 font-semibold">
                    Principal Broker / Owner
                  </p>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      Jenna Gill is Co-Owner and Principal Broker of CRD Real Estate & Development, bringing more than eight years of experience across residential and commercial real estate. A Northwest Arkansas resident for over 23 years, Jenna offers clients deep market knowledge paired with a calm, strategic approach to complex decisions. Before entering real estate, Jenna spent years as a high school teacher—an experience that shaped her patient communication style, attention to detail, and ability to guide people through unfamiliar processes with confidence. She is well-versed in the financing side of real estate and is known for being a thoughtful listener and problem solver. Jenna remains actively involved in the community and is passionate about helping clients make informed, successful real estate decisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rhonda Moore */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                <div className="flex-shrink-0 w-full md:w-80">
                  <Image
                    src="/images/team/Rhona_Moore_real_estate.webp"
                    alt="Rhonda Moore"
                    width={320}
                    height={320}
                    className="w-full rounded-sm object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    Rhonda Moore
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 font-semibold">
                    Executive Broker
                  </p>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      As a seventh-generation Arkansan, Rhonda Moore brings deep local knowledge, heritage, and dedication to every client relationship. Known for her exceptional communication skills and steady negotiating presence, Rhonda is both a trusted advisor and a relentless advocate who makes clients feel understood and supported throughout the process. Rhonda believes successful outcomes begin with truly understanding her clients—their goals, concerns, and long-term plans. From start to finish and beyond, she works diligently to anticipate needs, manage details, and make the experience as smooth and stress-free as possible. Clients often describe her as both warm and formidable—bringing heart, clarity, and strength to every transaction, no matter how large or complex.
                    </p>
                  </div>
                </div>
              </div>

              {/* Max Teague */}
              <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-start">
                <div className="flex-shrink-0 w-full md:w-80">
                  <Image
                    src="/images/team/Max_teague_Realestate.webp"
                    alt="Max Teague"
                    width={320}
                    height={320}
                    className="w-full rounded-sm object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    Max Teague
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 font-semibold">
                    Brokerage Associate
                  </p>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      Max Teague is a native Arkansan with two decades of direct sales experience in the construction industry and has been a Realtor since 2013. He specializes in commercial and land development sales, while also supporting clients with residential acquisitions and sales when needs overlap. A sharpened negotiator, people-connector, and fierce advocate for his clients, Max brings clear communication and steady leadership to help clients move quickly and confidently in competitive situations. Outside of real estate, Max's greatest joy is being a father and raising his three boys.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supporting Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-gray-700 text-base leading-relaxed text-center max-w-3xl mx-auto">
              CRD is supported by a network of experienced professionals and trusted partners across brokerage, development, construction, and advisory services—allowing our team to provide comprehensive insight and seamless execution across a wide range of real estate needs in Northwest Arkansas.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
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
                  href="/" 
                  className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  Work With CRD
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
