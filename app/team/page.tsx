"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TeamHero from "./TeamHero";

export default function TeamPage() {
  return (
    <>
      <Header />
      <TeamHero />
      <main className="min-h-screen bg-white">
        {/* Leadership Section */}
        <section className="py-12 md:py-16" id="leadership">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="space-y-16">
              {/* Hannah Cicioni */}
              <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
                <div className="w-full flex-shrink-0 md:w-80">
                  <Image
                    alt="Hannah Cicioni"
                    className="w-full rounded-sm object-cover"
                    height={320}
                    src="/images/team/Hanna_Real_Estate.webp"
                    width={320}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 font-bold font-display text-2xl text-black md:text-3xl">
                    Hannah Cicioni
                  </h2>
                  <p className="mb-6 font-semibold text-gray-700 text-lg">
                    Commercial Executive Broker / Owner
                  </p>
                  <div className="mb-6 space-y-1 text-gray-600 text-sm">
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="mailto:hcicioni@crdred.com"
                      >
                        hcicioni@crdred.com
                      </a>
                    </p>
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="tel:479-270-4982"
                      >
                        479-270-4982
                      </a>
                    </p>
                  </div>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      With over 12 years of experience in commercial real estate
                      and development, Hannah Cicioni is a seasoned leader in
                      the Northwest Arkansas real estate landscape. As Co-Owner
                      and Commercial Executive Broker of CRD Real Estate &
                      Development, she has helped guide projects that support
                      growth and revitalization across the region's downtown
                      districts. Hannah's work spans adaptive re-use conversions
                      for hospitality-driven developments, multi-tenant
                      mixed-use redevelopments, and ground-up housing projects.
                      She brings a strategic, execution-minded approach that
                      helps investors, owners, and developers make confident
                      decisions backed by real-world development experience.
                      Deeply invested in the community—especially Downtown
                      Rogers—Hannah is actively involved through multiple
                      businesses and development projects, with a focus on
                      long-term value and responsible growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Jenna Gill */}
              <div className="flex flex-col items-start gap-8 md:flex-row-reverse md:gap-12">
                <div className="w-full flex-shrink-0 md:w-80">
                  <Image
                    alt="Jenna Gill"
                    className="w-full rounded-sm object-cover"
                    height={320}
                    src="/images/team/Jenna_Realestate_Agent.webp"
                    width={320}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 font-bold font-display text-2xl text-black md:text-3xl">
                    Jenna Gill
                  </h2>
                  <p className="mb-6 font-semibold text-gray-700 text-lg">
                    Principal Broker / Owner
                  </p>
                  <div className="mb-6 space-y-1 text-gray-600 text-sm">
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="mailto:jgill@crdred.com"
                      >
                        jgill@crdred.com
                      </a>
                    </p>
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="tel:479-445-4501"
                      >
                        479-445-4501
                      </a>
                    </p>
                  </div>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      Jenna Gill is Co-Owner and Principal Broker of CRD Real
                      Estate & Development, bringing more than eight years of
                      experience across residential and commercial real estate.
                      A Northwest Arkansas resident for over 23 years, Jenna
                      offers clients deep market knowledge paired with a calm,
                      strategic approach to complex decisions. Before entering
                      real estate, Jenna spent years as a high school teacher—an
                      experience that shaped her patient communication style,
                      attention to detail, and ability to guide people through
                      unfamiliar processes with confidence. She is well-versed
                      in the financing side of real estate and is known for
                      being a thoughtful listener and problem solver. Jenna
                      remains actively involved in the community and is
                      passionate about helping clients make informed, successful
                      real estate decisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rhonda Moore */}
              <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
                <div className="w-full flex-shrink-0 md:w-80">
                  <Image
                    alt="Rhonda Moore"
                    className="w-full rounded-sm object-cover"
                    height={320}
                    src="/images/team/Rhonda.JPG"
                    width={320}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 font-bold font-display text-2xl text-black md:text-3xl">
                    Rhonda Moore
                  </h2>
                  <p className="mb-6 font-semibold text-gray-700 text-lg">
                    Executive Broker
                  </p>
                  <div className="mb-6 space-y-1 text-gray-600 text-sm">
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="mailto:rhondamooresellsnwa@gmail.com"
                      >
                        rhondamooresellsnwa@gmail.com
                      </a>
                    </p>
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="tel:479-530-0185"
                      >
                        479-530-0185
                      </a>
                    </p>
                  </div>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      As a seventh-generation Arkansan, Rhonda Moore brings deep
                      local knowledge, heritage, and dedication to every client
                      relationship. Known for her exceptional communication
                      skills and steady negotiating presence, Rhonda is both a
                      trusted advisor and a relentless advocate who makes
                      clients feel understood and supported throughout the
                      process. Rhonda believes successful outcomes begin with
                      truly understanding her clients—their goals, concerns, and
                      long-term plans. From start to finish and beyond, she
                      works diligently to anticipate needs, manage details, and
                      make the experience as smooth and stress-free as possible.
                      Clients often describe her as both warm and
                      formidable—bringing heart, clarity, and strength to every
                      transaction, no matter how large or complex.
                    </p>
                  </div>
                </div>
              </div>

              {/* Max Teague */}
              <div className="flex flex-col items-start gap-8 md:flex-row-reverse md:gap-12">
                <div className="w-full flex-shrink-0 md:w-80">
                  <Image
                    alt="Max Teague"
                    className="w-full rounded-sm object-cover"
                    height={320}
                    src="/images/team/Max_teague_Realestate.webp"
                    width={320}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 font-bold font-display text-2xl text-black md:text-3xl">
                    Max Teague
                  </h2>
                  <p className="mb-6 font-semibold text-gray-700 text-lg">
                    Brokerage Associate
                  </p>
                  <div className="mb-6 space-y-1 text-gray-600 text-sm">
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="mailto:mteague@crdred.com"
                      >
                        mteague@crdred.com
                      </a>
                    </p>
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="tel:479-466-3000"
                      >
                        479-466-3000
                      </a>
                    </p>
                  </div>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      Max Teague is a native Arkansan with two decades of direct
                      sales experience in the construction industry and has been
                      a Realtor since 2013. He specializes in commercial and
                      land development sales, while also supporting clients with
                      residential acquisitions and sales when needs overlap. A
                      sharpened negotiator, people-connector, and fierce
                      advocate for his clients, Max brings clear communication
                      and steady leadership to help clients move quickly and
                      confidently in competitive situations. Outside of real
                      estate, Max's greatest joy is being a father and raising
                      his three boys.
                    </p>
                  </div>
                </div>
              </div>

              {/* Megan Gage */}
              <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
                <div className="w-full flex-shrink-0 md:w-80">
                  <Image
                    alt="Megan Gage"
                    className="w-full rounded-sm object-cover"
                    height={320}
                    src="/images/team/megan.JPEG"
                    width={320}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 font-bold font-display text-2xl text-black md:text-3xl">
                    Megan Gage
                  </h2>
                  <p className="mb-6 font-semibold text-gray-700 text-lg">
                    Brokerage Associate
                  </p>
                  <div className="mb-6 space-y-1 text-gray-600 text-sm">
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="mailto:megan.gage29@gmail.com"
                      >
                        megan.gage29@gmail.com
                      </a>
                    </p>
                    <p>
                      <a
                        className="underline transition-colors hover:text-black"
                        href="tel:479-601-2211"
                      >
                        479-601-2211
                      </a>
                    </p>
                  </div>
                  <div className="prose prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      Megan Gage is a Brokerage Associate at CRD Real Estate &
                      Development, bringing over a decade of experience in
                      Northwest Arkansas and dedication to help clients navigate
                      their real estate needs across the region.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supporting Section */}
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto max-w-4xl px-6">
            <p className="mx-auto max-w-3xl text-center text-base text-gray-700 leading-relaxed">
              CRD is supported by a network of experienced professionals and
              trusted partners across brokerage, development, construction, and
              advisory services—allowing our team to provide comprehensive
              insight and seamless execution across a wide range of real estate
              needs in Northwest Arkansas.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-4xl px-6">
            <div className="text-center">
              <h2 className="mb-3 font-bold font-display text-2xl text-black sm:mb-4 sm:text-3xl md:text-4xl">
                Work With a Team That Knows Northwest Arkansas
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-gray-700 text-lg">
                Whether you're buying, selling, leasing, investing, or planning
                a development, our team is ready to help you move forward with
                confidence.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  className="btn-primary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                  href="/contact"
                >
                  Contact Us
                </Link>
                <Link
                  className="btn-secondary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                  href="/"
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
