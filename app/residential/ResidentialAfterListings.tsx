"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ResidentialAfterListings() {
  return (
    <>
      {/* Residential Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8 text-center">
            How We Support Residential Clients
          </h2>
          <div className="flex items-center justify-center mb-10">
            <div className="w-24 h-1 bg-black relative">
              <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
            </div>
            <div className="w-2 h-2 bg-black mx-2 relative">
              <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
            </div>
            <div className="w-24 h-1 bg-black relative">
              <div className="absolute inset-0 bg-navy-700 opacity-30"></div>
            </div>
          </div>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-12 text-center max-w-5xl mx-auto">
            Our residential clients work directly with experienced professionals who guide every step of the process, from first showing through closing and beyond. CRD provides clear communication, strong negotiation, and local insight tailored to each client's goals.
          </p>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" layout>
            <motion.div
              className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02]"
              layout
            >
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Buyer representation</span>
            </motion.div>
            <motion.div
              className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02]"
              layout
            >
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Seller representation</span>
            </motion.div>
            <div className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02]">
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Residential investment properties</span>
            </div>
            <motion.div
              className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02]"
              layout
            >
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Relocation support</span>
            </motion.div>
            <div className="group flex items-start gap-4 bg-white border-2 border-black p-6 shadow-md hover:shadow-xl transition-all duration-300 md:col-span-2 md:justify-center relative overflow-hidden hover:scale-[1.02]">
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="flex-shrink-0 w-8 h-8 bg-black group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700 transition-all duration-300 flex items-center justify-center relative">
                <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors duration-300">Market pricing and negotiation strategy</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why CRD Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8 text-center">
            Why CRD
          </h2>
          <div className="flex items-center justify-center mb-12">
            <div className="w-24 h-1 bg-black relative">
              <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
            </div>
            <div className="w-2 h-2 bg-black mx-2 relative">
              <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
            </div>
            <div className="w-24 h-1 bg-black relative">
              <div className="absolute inset-0 bg-navy-700 opacity-30"></div>
            </div>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" layout>
            <motion.div
              className="bg-white border-2 border-black shadow-lg p-8 md:p-10 hover:shadow-2xl transition-all duration-300 relative group hover:scale-[1.02] overflow-hidden"
              layout
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-navy-700 transition-all duration-300"></div>
              {/* Red accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                Local Knowledge That Matters
              </h3>
              <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg transition-colors duration-300">
                We understand Northwest Arkansas neighborhoods because we live here, and that insight helps clients make better decisions.
              </p>
            </motion.div>
            <div className="bg-white border-2 border-black shadow-lg p-8 md:p-10 hover:shadow-2xl transition-all duration-300 relative group hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-navy-700 transition-all duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
              {/* Navy accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-navy-700 transition-colors duration-300">
                Client-First Representation
              </h3>
              <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg transition-colors duration-300">
                Every transaction is handled with care, transparency, and a focus on what's best for the client.
              </p>
            </div>
            <motion.div
              className="bg-white border-2 border-black shadow-lg p-8 md:p-10 hover:shadow-2xl transition-all duration-300 relative group hover:scale-[1.02] overflow-hidden"
              layout
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-navy-700 transition-all duration-300"></div>
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-brand-red-700 transition-colors duration-300">
                Clear, Confident Guidance
              </h3>
              <div className="w-12 h-1 bg-black mb-6 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-red-700 to-navy-700 opacity-40"></div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg transition-colors duration-300">
                From offer to close, we help clients move forward with clarity and confidence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-black rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-black rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center bg-white border-2 border-black shadow-2xl p-10 md:p-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
              Looking for a Home in Northwest Arkansas?
            </h2>
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
              </div>
              <div className="w-2 h-2 bg-black mx-2 relative">
                <div className="absolute inset-0 bg-navy-700 opacity-40"></div>
              </div>
              <div className="w-16 h-1 bg-black relative">
                <div className="absolute inset-0 bg-navy-700 opacity-30"></div>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Whether you're buying your first home, relocating, or investing, our team is ready to help you find the right fit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#listings"
                prefetch={false}
                className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-none text-sm"
              >
                View Listings
              </Link>
              <Link
                href="mailto:jgill@crdred.com,rhondamooresellsnwa@gmail.com?subject=Residential Real Estate Inquiry"
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
