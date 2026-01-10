import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import CommercialListings from "./CommercialListings";

export const metadata = {
  title: "Commercial Real Estate in Northwest Arkansas | CRD Real Estate & Development",
  description: "Strategic guidance for buying, leasing, and selling commercial property across Northwest Arkansas. Commercial property for sale and lease in Bentonville, Rogers, Springdale, and Fayetteville.",
};

export default function CommercialPage() {
  // NOTE: The Buy listings below are placeholder listings and will be replaced with live MLS or CMS-driven data in the future.
  const buyListings = [
    {
      id: "201-e-walnut-st-11",
      title: "Development Lot – Downtown Rogers",
      price: "$1",
      location: "201 E Walnut St #11, Rogers, AR 72756",
      imageSrc: "/images/201_e_Walnut_St_11_View.webp",
      summary: "Prime hard corner development lot in rapidly growing and thriving Downtown Rogers. T5.2 zoning allows for high density development with multiple uses. Positioned in the middle of several active and future development projects, this site provides unlimited investment opportunities. Accepting offers: proof of funds and intended use required with offer submitted.",
      bullets: [
        "6,969.6 sq ft lot",
        "Unimproved Land",
        "T5.2 zoning - High density development",
        "Multiple uses allowed",
        "Hard corner development lot",
        "Central Business District location",
        "MLS#: 1301467",
        "Annual tax: $693",
      ],
      href: "/commercial/buy/201-e-walnut-st-11",
      galleryImages: [
        "/images/201_e_Walnut_St_11_View.webp",
        "/images/201_E_Walnut_St_11_Commercial_Lot_In_Rogers_For_Sale.webp",
        "/images/201_e_walnut_st_11_Zoomed_out_map.webp",
        "/images/201_e_walnut_st_land_lot.webp",
      ],
      mlsNumber: "1301467",
      propertyDetails: {
        lot: {
          size: "6,969.6 Square Feet",
          features: "Central Business District, City Lot, Level, Other, See Remarks",
        },
        property: {
          fencing: "Partial",
          exteriorFeatures: "Cleared",
        },
        details: {
          parcelNumber: "0202198000",
        },
        construction: {
          homeType: "Unimproved Land",
        },
        location: {
          region: "Rogers",
        },
        financial: {
          annualTaxAmount: "$693",
          dateOnMarket: "3/17/2025",
        },
      },
    },
  ];

  // NOTE: The Lease listings below are placeholder listings and will be replaced with live MLS or CMS-driven data in the future.
  const leaseListings: any[] = [
    {
      id: "203-w-wood-st-unit-a",
      title: "203 W Wood Street Unit A",
      leaseRate: "$21/sqft • 1,250 sqft",
      location: "Rogers, AR 72756",
      imageSrc: "/images/Commerical Leases/203_Wood_St_Crossing_Downtown_Rogers_Commercial_proprty_For_Lease_Flyer.webp",
      summary: "Wood St Crossing, located in the North District of Downtown Rogers, is an active revitalization of prime Commercial Lease space. In total, the building is 7,310sf of available lease space, situated immediately adjacent to the Railyard Loop of the Greenway Tail System. Suite A is 1,250 sf with a side garage roll up door, beautiful wood accents, industrial interior feel with a private bathroom and open floor plan. Perfect for Retail, Office, Bar or Restaurant.",
      description: "Wood St Crossing, located in the North District of Downtown Rogers, is an active revitalization of prime Commercial Lease space. In total, the building is 7,310sf of available lease space, situated immediately adjacent to the Railyard Loop of the Greenway Tail System. Suite A is 1,250 sf with a side garage roll up door, beautiful wood accents, industrial interior feel with a private bathroom and open floor plan. Perfect for Retail, Office, Bar or Restaurant.",
      bullets: [
        "For Lease",
        "Mixed Use Office",
        "$21/sqft",
        "1,250 sqft",
        "0.23 Acres",
        "Side garage roll up door",
        "Wood accents",
        "Industrial interior feel",
        "Private bathroom",
        "Open floor plan",
        "Perfect for Retail, Office, Bar or Restaurant",
        "Adjacent to Railyard Loop of Greenway Trail System",
        "MLS#: 1332308"
      ],
      href: "/commercial/lease/203-w-wood-st-unit-a",
      mlsNumber: "1332308",
      galleryImages: [
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_A_Rogers_Arkansas_72756_Exterior.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_A_Rogers_Arkansas_72756_Interior.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_A_Rogers_Arkansas_72756_Interior_2.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_A_Rogers_Arkansas_72756_Interior_Road_View.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_A_Rogers_Arkansas_72756_Unit_A_End_Cap.webp"
      ],
      propertyDetails: {
        construction: {
          homeType: "Mixed Use Office",
          propertySubtype: "Retail"
        },
        lot: {
          size: "0.23 Acres",
          features: "Central Business District, City Lot, Neighborhood"
        },
        location: {
          region: "Rogers"
        },
        details: {
          subdivision: "Wood Stroud Add Rogers"
        }
      },
      pdfFlyer: "/203 W WOOD ST Flyer (Real Estate Flyer).pdf",
      isLease: true
    },
    {
      id: "203-w-wood-st-unit-b",
      title: "203 W Wood Street Unit B",
      leaseRate: "$21/sqft • 1,850 sqft",
      location: "Rogers, AR 72756",
      imageSrc: "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_A_Rogers_Arkansas_72756_Exterior.webp",
      summary: "Wood St Crossing, located in the North District of Downtown Rogers, is an active revitalization of prime Commercial Lease space. In total, the building is 7,310sf of available lease space, situated immediately adjacent to the Railyard Loop of the Greenway Tail System. Suite B is 1,850 sf that provides a large break area, beautiful details, industrial interior feel with a private bathroom and open floor plan. Perfect for Retail, Office, Bar or Restaurant.",
      description: "Wood St Crossing, located in the North District of Downtown Rogers, is an active revitalization of prime Commercial Lease space. In total, the building is 7,310sf of available lease space, situated immediately adjacent to the Railyard Loop of the Greenway Tail System. Suite B is 1,850 sf that provides a large break area, beautiful details, industrial interior feel with a private bathroom and open floor plan. Perfect for Retail, Office, Bar or Restaurant.",
      bullets: [
        "For Lease",
        "Mixed Use Office",
        "$21/sqft",
        "1,850 sqft",
        "0.23 Acres",
        "Large break area",
        "Beautiful details",
        "Industrial interior feel",
        "Private bathroom",
        "Open floor plan",
        "Perfect for Retail, Office, Bar or Restaurant",
        "Adjacent to Railyard Loop of Greenway Trail System",
        "MLS#: 1332314"
      ],
      href: "/commercial/lease/203-w-wood-st-unit-b",
      mlsNumber: "1332314",
      galleryImages: [
        "/images/Commerical Leases/203_Wood_St_Crossing_Downtown_Rogers_Commercial_proprty_For_Lease_Flyer.webp",
        "/images/Commerical Leases/CRD_Commercial_listing_203_W_Wood_Street_B_Rogers_Arkansas_Interior.webp",
        "/images/Commerical Leases/CRD_Commercial_listing_203_W_Wood_Street_B_Rogers_Arkansas_Kitchen.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_B_Rogers_Arkansas_Office_Space.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_B_Rogers_Arkansas_Office_Space_B.webp"
      ],
      propertyDetails: {
        construction: {
          homeType: "Mixed Use Office",
          propertySubtype: "Retail"
        },
        lot: {
          size: "0.23 Acres",
          features: "Central Business District, City Lot, Neighborhood"
        },
        location: {
          region: "Rogers"
        },
        details: {
          subdivision: "Wood Stroud Add Rogers"
        }
      },
      pdfFlyer: "/203 W WOOD ST Flyer (Real Estate Flyer).pdf",
      isLease: true
    },
    {
      id: "203-w-wood-st-unit-c",
      title: "203 W Wood Street Unit C",
      leaseRate: "$21/sqft • 1,500 sqft",
      location: "Rogers, AR 72756",
      imageSrc: "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_C_Rogers_Arkansas_72756_Interior.webp",
      summary: "Wood St Crossing, located in the North District of Downtown Rogers, is an active revitalization of prime Commercial Lease space. In total, the building is 7,310sf of available lease space, situated immediately adjacent to the Railyard Loop of the Greenway Tail System. A former Hair Salon, Suite C is 1,500 sf is next to the trail, large windows with lots of natural light, industrial interior feel with a private bathroom with shower and open floor plan. Perfect for Retail, Office, Bar or Restaurant. See the attached flyer for additional leasing details and pictures.",
      description: "Wood St Crossing, located in the North District of Downtown Rogers, is an active revitalization of prime Commercial Lease space. In total, the building is 7,310sf of available lease space, situated immediately adjacent to the Railyard Loop of the Greenway Tail System. A former Hair Salon, Suite C is 1,500 sf is next to the trail, large windows with lots of natural light, industrial interior feel with a private bathroom with shower and open floor plan. Perfect for Retail, Office, Bar or Restaurant. See the attached flyer for additional leasing details and pictures.",
      bullets: [
        "For Lease",
        "Mixed Use Office",
        "$21/sqft",
        "1,500 sqft",
        "0.23 Acres",
        "Next to the trail",
        "Large windows with lots of natural light",
        "Industrial interior feel",
        "Private bathroom with shower",
        "Open floor plan",
        "Perfect for Retail, Office, Bar or Restaurant",
        "Adjacent to Railyard Loop of Greenway Trail System",
        "MLS#: 1332341"
      ],
      href: "/commercial/lease/203-w-wood-st-unit-c",
      mlsNumber: "1332341",
      galleryImages: [
        "/images/Commerical Leases/203_Wood_St_Crossing_Downtown_Rogers_Commercial_proprty_For_Lease_Flyer.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_C_Rogers_Arkansas_72756_Interior.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_C_Rogers_Arkansas_72756_Road_View.webp",
        "/images/Commerical Leases/CRD_Commercial_Listing_203_W_Wood_Street_C_Rogers_Arkansas_72756_Bathroom.webp"
      ],
      propertyDetails: {
        construction: {
          homeType: "Mixed Use Office",
          propertySubtype: "Retail"
        },
        lot: {
          size: "0.23 Acres",
          features: "Central Business District, City Lot, Neighborhood"
        },
        location: {
          region: "Rogers"
        },
        details: {
          subdivision: "Wood Stroud Add Rogers"
        }
      },
      pdfFlyer: "/203 W WOOD ST Flyer (Real Estate Flyer).pdf",
      isLease: true
    },
  ];


  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image - extends behind header */}
          <div className="absolute inset-0 w-full h-full top-0">
            <Image
              src="/images/Rogers_Skyline.webp"
              alt="Rogers, Arkansas Skyline - Commercial Real Estate"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Overlaid Content - starts below header */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl text-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-5 md:mb-6 lg:mb-8 drop-shadow-lg leading-tight px-2">
              Commercial Real Estate in Northwest Arkansas
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-5xl mx-auto mb-6 sm:mb-7 md:mb-8 lg:mb-10 drop-shadow-md leading-relaxed px-2">
              Strategic guidance for buying, leasing, and selling commercial property across Northwest Arkansas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
              <Link 
                href="#buy-listings" 
                className="bg-white text-black border-2 border-white hover:bg-gray-100 inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-none text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
              >
                View Commercial Listings
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-none text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
              >
                Talk With Our Team
              </Link>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-10 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-20"></div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-black text-lg md:text-xl leading-relaxed mb-8">
                CRD Real Estate & Development provides full-service commercial real estate guidance across Northwest Arkansas, supporting property owners, investors, tenants, and developers at every stage of the transaction. Our team brings hands-on market knowledge, disciplined strategy, and an ownership mindset to each engagement.
              </p>
              <p className="text-black text-lg md:text-xl leading-relaxed">
                From office and industrial properties to medical, warehouse, land, and redevelopment opportunities, CRD helps clients evaluate options, reduce risk, and execute decisions aligned with long-term business and investment goals.
              </p>
            </div>
          </div>
        </section>

        {/* Commercial Listings Section */}
        <CommercialListings buyListings={buyListings} leaseListings={leaseListings} />

        {/* Sell Commercial Property Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
                Thinking About Buying, Selling, or Leasing Commercial Property?
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
            </div>
            <div className="prose prose-lg max-w-none mb-6 sm:mb-8">
              <p className="text-black text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8">
                Commercial real estate decisions require more than a transaction, they require context, positioning, and a clear understanding of market dynamics. CRD works alongside property owners, investors, buyers, and tenants to evaluate opportunities, align strategy, and move forward with confidence.
              </p>
              <p className="text-black text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-10">
                Whether you're acquiring a commercial asset, leasing space for your business, repositioning a property, or preparing to sell, our team provides guidance grounded in market data, local demand, and real-world execution experience. Our goal is to help clients make informed decisions that support both immediate needs and long-term objectives.
              </p>
            </div>
            <div className="mb-6 sm:mb-8 max-w-5xl mx-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">Who this is for:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">Buyers evaluating commercial investment or owner-user opportunities</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">Property owners considering selling or repositioning assets</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">Landowners planning future development or redevelopment</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">Businesses seeking commercial space to lease</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 md:col-span-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">Investors adjusting or exiting positions</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
              >
                Discuss Your Project
              </Link>
              <Link 
                href="/contact" 
                className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
              >
                Contact Our Commercial Team
              </Link>
            </div>
          </div>
        </section>

        {/* Why CRD Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
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
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                {/* Corner accents with red */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Divider with red accent */}
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Ownership-Level Insight
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Our commercial team understands transactions from an owner and investor perspective, not just a brokerage lens.
                  </p>
                </div>
              </div>
              
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                {/* Corner accents with red */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Divider with red accent */}
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Local Market Knowledge
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    We operate daily across Northwest Arkansas and understand the nuances of its submarkets and growth patterns.
                  </p>
                </div>
              </div>
              
              <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden cursor-pointer hover:scale-[1.02]">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                {/* Corner accents with red */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
                
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Divider with red accent */}
                  <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                    Strategy Before Transactions
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-colors duration-300">
                    Every recommendation is built around clarity, positioning, and long-term value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
                Let's Talk About Your Commercial Real Estate Goals
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-gray-700 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-2">
                Whether you're buying, leasing, or selling, our team is ready to help you evaluate opportunities and move forward with confidence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="#buy-listings" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
                >
                  View Commercial Listings
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
