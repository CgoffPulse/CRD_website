"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CommercialAfterListings() {
  return (
    <>
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
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Buyers evaluating commercial investment or owner-user opportunities</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Property owners considering selling or repositioning assets</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Landowners planning future development or redevelopment</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Businesses seeking commercial space to lease</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 md:col-span-2">
                <svg aria-hidden="true" focusable="false" className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
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
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" layout>
            <motion.div
              className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden hover:scale-[1.02]"
              layout
            >
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
            </motion.div>

            <motion.div
              className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden hover:scale-[1.02]"
              layout
            >
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
            </motion.div>

            <div className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden hover:scale-[1.02]">
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
          </motion.div>
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
                prefetch={false}
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
    </>
  );
}
