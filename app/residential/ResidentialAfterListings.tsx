"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedUnderline from "@/components/AnimatedUnderline";

export default function ResidentialAfterListings() {
  return (
    <>
      {/* Residential Services Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-10 sm:py-12 md:py-14">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-center font-bold font-display text-3xl text-black sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
            How We Support Residential Clients
          </h2>
          {/* Animated underline */}
          <div className="mb-10">
            <AnimatedUnderline width="w-52" delay={200} />
          </div>
          <p className="mx-auto mb-12 max-w-5xl text-center text-gray-700 text-lg leading-relaxed md:text-xl">
            Our residential clients work directly with experienced professionals
            who guide every step of the process, from first showing through
            closing and beyond. CRD provides clear communication, strong
            negotiation, and local insight tailored to each client's goals.
          </p>
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
            layout
          >
            <motion.div
              className="group relative flex items-start gap-4 overflow-hidden border-2 border-black bg-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              layout
            >
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-navy-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center bg-black transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700">
                <svg
                  aria-hidden="true"
                  className="relative z-10 h-5 w-5 text-white"
                  fill="currentColor"
                  focusable="false"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700 text-lg transition-colors duration-300 group-hover:text-black">
                Buyer representation
              </span>
            </motion.div>
            <motion.div
              className="group relative flex items-start gap-4 overflow-hidden border-2 border-black bg-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              layout
            >
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-navy-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center bg-black transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700">
                <svg
                  aria-hidden="true"
                  className="relative z-10 h-5 w-5 text-white"
                  fill="currentColor"
                  focusable="false"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700 text-lg transition-colors duration-300 group-hover:text-black">
                Seller representation
              </span>
            </motion.div>
            <div className="group relative flex items-start gap-4 overflow-hidden border-2 border-black bg-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-navy-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center bg-black transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700">
                <svg
                  aria-hidden="true"
                  className="relative z-10 h-5 w-5 text-white"
                  fill="currentColor"
                  focusable="false"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700 text-lg transition-colors duration-300 group-hover:text-black">
                Residential investment properties
              </span>
            </div>
            <motion.div
              className="group relative flex items-start gap-4 overflow-hidden border-2 border-black bg-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              layout
            >
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-navy-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center bg-black transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700">
                <svg
                  aria-hidden="true"
                  className="relative z-10 h-5 w-5 text-white"
                  fill="currentColor"
                  focusable="false"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700 text-lg transition-colors duration-300 group-hover:text-black">
                Relocation support
              </span>
            </motion.div>
            <div className="group relative flex items-start gap-4 overflow-hidden border-2 border-black bg-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl md:col-span-2 md:justify-center">
              {/* Combined red and navy accent lines on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-navy-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center bg-black transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-red-700 group-hover:to-navy-700">
                <svg
                  aria-hidden="true"
                  className="relative z-10 h-5 w-5 text-white"
                  fill="currentColor"
                  focusable="false"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700 text-lg transition-colors duration-300 group-hover:text-black">
                Market pricing and negotiation strategy
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why CRD Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-center font-bold font-display text-3xl text-black sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
            Why CRD?
          </h2>
          <div className="mb-12">
            <AnimatedUnderline width="w-52" />
          </div>
          <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-3" layout>
            <motion.div
              className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-10"
              layout
            >
              <div className="absolute top-0 left-0 h-4 w-4 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 h-4 w-4 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-navy-700 group-hover:opacity-100" />
              {/* Red accent line on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <h3 className="mb-6 font-bold font-sans text-black text-lg transition-colors duration-300 group-hover:text-brand-red-700 md:text-xl lg:text-2xl">
                Local Knowledge That Matters
              </h3>
              <div className="mb-6">
                <AnimatedUnderline width="w-16" delay={100} />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300">
                We understand Northwest Arkansas neighborhoods because we live
                here, and that insight helps clients make better decisions.
              </p>
            </motion.div>
            <div className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-10">
              <div className="absolute top-0 left-0 h-4 w-4 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-navy-700 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 h-4 w-4 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              {/* Navy accent line on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-navy-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <h3 className="mb-6 font-bold font-sans text-black text-lg transition-colors duration-300 group-hover:text-brand-red-700 md:text-xl lg:text-2xl">
                Client-First Representation
              </h3>
              <div className="mb-6">
                <AnimatedUnderline width="w-16" delay={100} />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300">
                Every transaction is handled with care, transparency, and a
                focus on what's best for the client.
              </p>
            </div>
            <motion.div
              className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-10"
              layout
            >
              <div className="absolute top-0 left-0 h-4 w-4 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 h-4 w-4 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              {/* Red accent line on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <h3 className="mb-6 font-bold font-sans text-black text-lg transition-colors duration-300 group-hover:text-brand-red-700 md:text-xl lg:text-2xl">
                Clear, Confident Guidance
              </h3>
              <div className="mb-6">
                <AnimatedUnderline width="w-16" delay={100} />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300">
                From offer to close, we help clients move forward with clarity
                and confidence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 h-32 w-32 rounded-full border-2 border-black" />
          <div className="absolute bottom-10 left-10 h-24 w-24 rounded-full border-2 border-black" />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl px-6">
          <div className="border-2 border-black bg-white p-10 text-center shadow-2xl md:p-16">
            <h2 className="mb-6 font-bold text-black text-xl sm:mb-8 sm:text-2xl md:text-3xl lg:text-4xl">
              Looking for a Home in Northwest Arkansas?
            </h2>
            {/* Animated underline */}
            <div className="mb-8">
              <AnimatedUnderline width="w-40" delay={200} />
            </div>
            <p className="mx-auto mb-12 max-w-6xl text-gray-700 text-lg leading-relaxed md:text-xl">
              Whether you're buying your first home, relocating, or investing,
              our team is ready to help you find the right fit.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                className="btn-primary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                href="#listings"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector("#listings");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                prefetch={false}
              >
                View Listings
              </Link>
              <Link
                className="btn-secondary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                href="mailto:jgill@crdred.com,rhondamooresellsnwa@gmail.com?subject=Residential Real Estate Inquiry"
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
