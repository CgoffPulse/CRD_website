import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Development Services | CRD Real Estate & Development",
  description: "Providing end-to-end real estate development services, including site selection, entitlement, design coordination, and project management.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-32 min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 block">Our Services</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 md:mb-8 text-center">
              Focused Development. Elevated Community
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8 md:mb-12 relative">
              <div className="absolute inset-0 bg-brand-red-700 opacity-20"></div>
            </div>
          </div>
          
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 md:mb-8">
              Commercial Real Estate
            </h3>
            <p className="text-gray-900 text-xl md:text-2xl leading-relaxed mb-6 md:mb-8 font-semibold">
              Buying. Selling. Leasing.
            </p>
            <p className="text-gray-700 text-lg md:text-2xl leading-relaxed mb-8 md:mb-10">
              CRD Real Estate brings multi-decade expertise to every aspect of Commercial Real Estate in Northwest Arkansas. From buying and selling to leasing and property management, our team provides end-to-end guidance backed by deep market knowledge. We specialize in the unique opportunities of NWA's Historic Districts, as well as land, warehouse, industrial, office, and medical properties. Whether you're expanding, investing, or repositioning an asset, CRD Real Estate delivers seasoned insight and results you can trust.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 py-12 sm:py-16 border-y border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="w-20 h-px bg-black mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-brand-red-700 opacity-20"></div>
            </div>
            <blockquote className="text-black text-lg md:text-2xl font-semibold leading-relaxed mb-4 md:mb-6 text-center italic px-2">
              "CRD Real Estate plays an essential role from day one— Engaging them was the best decision for our development. from finding the right site, guiding the process, and bringing our development to life with their area experts and connections."
            </blockquote>
            <p className="text-gray-700 text-center font-medium">— Inicio Development</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

