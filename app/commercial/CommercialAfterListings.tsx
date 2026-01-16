"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedUnderline from "@/components/AnimatedUnderline";

export default function CommercialAfterListings() {
  return (
    <>
      {/* Sell Commercial Property Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-2xl text-black sm:mb-6 sm:text-3xl md:text-5xl lg:text-6xl">
              Thinking About Buying, Selling, or Leasing Commercial Property?
            </h2>
            {/* Animated underline */}
            <div className="mb-10">
              <AnimatedUnderline width="w-52" delay={200} />
            </div>
          </div>
          <div className="prose prose-lg mb-6 max-w-none sm:mb-8">
            <p className="mb-6 text-base text-black leading-relaxed sm:mb-8 sm:text-lg md:text-xl">
              Commercial real estate decisions require more than a transaction,
              they require context, positioning, and a clear understanding of
              market dynamics. CRD works alongside property owners, investors,
              buyers, and tenants to evaluate opportunities, align strategy, and
              move forward with confidence.
            </p>
            <p className="mb-6 text-base text-black leading-relaxed sm:mb-10 sm:text-lg md:text-xl">
              Whether you're acquiring a commercial asset, leasing space for
              your business, repositioning a property, or preparing to sell, our
              team provides guidance grounded in market data, local demand, and
              real-world execution experience. Our goal is to help clients make
              informed decisions that support both immediate needs and long-term
              objectives.
            </p>
          </div>
          <div className="mx-auto mb-6 max-w-5xl sm:mb-8">
            <h3 className="mb-4 font-bold text-black text-xl sm:mb-6 sm:text-2xl md:text-3xl">
              Who this is for:
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5"
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
                <span className="text-gray-700 text-sm sm:text-base">
                  Buyers evaluating commercial investment or owner-user
                  opportunities
                </span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5"
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
                <span className="text-gray-700 text-sm sm:text-base">
                  Property owners considering selling or repositioning assets
                </span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5"
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
                <span className="text-gray-700 text-sm sm:text-base">
                  Landowners planning future development or redevelopment
                </span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5"
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
                <span className="text-gray-700 text-sm sm:text-base">
                  Businesses seeking commercial space to lease
                </span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 md:col-span-2">
                <svg
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5"
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
                <span className="text-gray-700 text-sm sm:text-base">
                  Investors adjusting or exiting positions
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              className="btn-primary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
              href="/contact"
            >
              Discuss Your Project
            </Link>
            <Link
              className="btn-secondary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
              href="/contact"
            >
              Contact Our Commercial Team
            </Link>
          </div>
        </div>
      </section>

      {/* Why CRD Section */}
      <section className="bg-gray-50 py-10 sm:py-12 md:py-14">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-6 font-bold font-display text-3xl text-black sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
              Why CRD?
            </h2>
            {/* Divider with red accent */}
            <div className="mb-12">
              <AnimatedUnderline width="w-52" />
            </div>
          </div>
          <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-3" layout>
            <motion.div
              className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-10"
              layout
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />

              {/* Corner accents with red */}
              <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />

              {/* Red accent line on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />

              <div className="relative z-10">
                {/* Divider with red accent */}
                <div className="mb-6">
                  <AnimatedUnderline width="w-16" delay={100} />
                </div>
                <h3 className="mb-6 font-bold text-black text-lg transition-colors duration-300 group-hover:text-brand-red-700 md:text-xl lg:text-2xl">
                  Ownership-Level Insight
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  Our commercial team understands transactions from an owner and
                  investor perspective, not just a brokerage lens.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-10"
              layout
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />

              {/* Corner accents with red */}
              <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />

              {/* Red accent line on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />

              <div className="relative z-10">
                {/* Divider with red accent */}
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={200} />
                </div>
                <h3 className="mb-6 font-bold text-black text-lg transition-colors duration-300 group-hover:text-brand-red-700 md:text-xl lg:text-2xl">
                  Local Market Knowledge
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  We operate daily across Northwest Arkansas and understand the
                  nuances of its submarkets and growth patterns.
                </p>
              </div>
            </motion.div>

            <div className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-10">
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />

              {/* Corner accents with red */}
              <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
              <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />

              {/* Red accent line on hover */}
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />

              <div className="relative z-10">
                {/* Divider with red accent */}
                <div className="mb-6">
                  <AnimatedUnderline width="w-16" delay={100} />
                </div>
                <h3 className="mb-6 font-bold text-black text-lg transition-colors duration-300 group-hover:text-brand-red-700 md:text-xl lg:text-2xl">
                  Strategy Before Transactions
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  Every recommendation is built around clarity, positioning, and
                  long-term value.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="mb-4 font-bold text-2xl text-black sm:mb-6 sm:text-3xl md:text-5xl lg:text-6xl">
              Let's Talk About
              <br className="sm:hidden" /> Your Commercial Real Estate Goals
            </h2>
            <p className="mx-auto mb-8 max-w-4xl px-2 text-base text-gray-700 leading-relaxed sm:mb-10 sm:text-lg md:text-2xl">
              Whether you're buying, leasing, or selling, our team is ready to
              help you evaluate opportunities and move forward with confidence.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                className="btn-primary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                href="#buy-listings"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector("#buy-listings");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                prefetch={false}
              >
                View For Sale
              </Link>
              <Link
                className="btn-primary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                href="#lease-listings"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector("#lease-listings");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                prefetch={false}
              >
                View for Lease
              </Link>
              <Link
                className="btn-secondary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                href="/contact"
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
