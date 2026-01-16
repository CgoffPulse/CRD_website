import AnimatedUnderline from "@/components/AnimatedUnderline";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Development Services | CRD Real Estate & Development",
  description:
    "Providing end-to-end real estate development services, including site selection, entitlement, design coordination, and project management.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8 text-center md:mb-12">
            <span className="mb-2 block font-semibold text-gray-600 text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="mb-6 text-center font-bold font-display text-4xl text-black md:mb-8 md:text-5xl lg:text-6xl">
              Focused Development. Elevated Community
            </h2>
            <div className="mb-8 md:mb-12">
              <AnimatedUnderline width="w-24" />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="mb-6 font-bold text-3xl text-black md:mb-8 md:text-4xl lg:text-5xl">
              Commercial Real Estate
            </h3>
            <p className="mb-6 font-semibold text-gray-900 text-xl leading-relaxed md:mb-8 md:text-2xl">
              Buying. Selling. Leasing.
            </p>
            <p className="mb-8 text-gray-700 text-lg leading-relaxed md:mb-10 md:text-2xl">
              CRD Real Estate brings multi-decade expertise to every aspect of
              Commercial Real Estate in Northwest Arkansas. From buying and
              selling to leasing and property management, our team provides
              end-to-end guidance backed by deep market knowledge. We specialize
              in the unique opportunities of NWA's Historic Districts, as well
              as land, warehouse, industrial, office, and medical properties.
              Whether you're expanding, investing, or repositioning an asset,
              CRD Real Estate delivers seasoned insight and results you can
              trust.
            </p>
          </div>
        </div>

        <div className="border-gray-200 border-y bg-gray-50 py-12 sm:py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative mx-auto mb-8 h-px w-20 bg-black">
              <div className="absolute inset-0 bg-brand-red-700 opacity-20" />
            </div>
            <blockquote className="mb-4 px-2 text-center font-semibold text-black text-lg italic leading-relaxed md:mb-6 md:text-2xl">
              "CRD Real Estate plays an essential role from day one— Engaging
              them was the best decision for our development. from finding the
              right site, guiding the process, and bringing our development to
              life with their area experts and connections."
            </blockquote>
            <p className="text-center font-medium text-gray-700">
              — Inicio Development
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
