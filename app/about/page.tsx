"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AboutHero from "@/components/AboutHero";
import AnimatedUnderline from "@/components/AnimatedUnderline";
import ClientLogoBanner from "@/components/ClientLogoBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <AboutHero />

        {/* Who We Are Section */}
        <section className="bg-gray-50 py-10 sm:py-12">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-bold font-display text-2xl text-black sm:mb-8 sm:text-3xl md:text-4xl">
                Who We Are
              </h2>
              {/* Animated underline */}
              <div className="mb-8">
                <AnimatedUnderline width="w-52" />
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <div className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                <div>
                  <p className="mb-6 text-base text-black leading-relaxed md:text-lg">
                    CRD Real Estate & Development is a Northwest Arkansas based
                    real estate firm providing commercial brokerage, residential
                    representation, and end-to-end development services.
                    Headquartered in Downtown Rogers, CRD works across
                    Bentonville, Rogers, Springdale, Fayetteville, and the
                    surrounding region, supporting clients through every stage
                    of the real estate lifecycle.
                  </p>
                </div>
                <div>
                  <p className="mb-6 text-base text-black leading-relaxed md:text-lg">
                    What sets CRD apart is an ownership mindset. With hands-on
                    development experience and in-house expertise spanning
                    acquisitions, leasing, investment strategy, and project
                    execution, the team delivers more than transactions, they
                    deliver informed decisions designed to protect value, reduce
                    risk, and create long-term returns for investors, owners,
                    and communities.
                  </p>
                </div>
              </div>
              <div className="relative border-black border-t-2 pt-8">
                {/* Red accent line */}
                <div className="absolute relative top-0 left-1/2 h-1 w-24 -translate-x-1/2 -translate-y-1/2 transform bg-black">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40" />
                </div>
                <p className="md:lg mx-auto max-w-5xl text-center font-semibold text-base text-black leading-relaxed">
                  CRD is defined by experience on both sides of the table.
                  Understanding real estate as owners, investors, and operators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our History Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-bold font-display text-2xl text-black sm:mb-8 sm:text-3xl md:text-4xl">
                Our History
              </h2>
              {/* Animated underline */}
              <div className="mb-8">
                <AnimatedUnderline width="w-52" />
              </div>
            </div>
            <div className="prose prose-lg mx-auto max-w-5xl max-w-none">
              <p className="mb-6 text-base text-black leading-relaxed md:text-lg">
                CRD Real Estate & Development was founded on the principle that
                real estate success requires more than market knowledge, it
                requires genuine investment in the communities we serve. Built
                by professionals who live and work in Northwest Arkansas, CRD
                brings deep local roots and a long-term perspective to every
                client relationship.
              </p>
              <p className="mb-6 text-base text-black leading-relaxed md:text-lg">
                Since 2018, our firm has been an established comprehensive real
                estate practice serving commercial buyers and sellers, tenants,
                property owners, and development partners across the region. Our
                expansion has been driven by client needs and market
                opportunities, always grounded in our core commitment to
                strategic guidance and ownership-level expertise. As we've grown
                in the markets we serve, our company has evolved into a true
                full-service brokerage, offering residential buying, selling,
                and investment services led by long-standing leaders with deep
                expertise in the Northwest Arkansas residential market.
              </p>
              <p className="text-base text-black leading-relaxed md:text-lg">
                Today, CRD operates from our headquarters in Downtown Rogers,
                where we've been actively involved in the area's revitalization
                and growth. Our team's hands-on experience in development,
                redevelopment, and adaptive reuse projects has positioned us as
                trusted advisors for clients seeking to invest in, develop, or
                reposition properties throughout Northwest Arkansas.
              </p>
            </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-6 font-bold font-display text-2xl text-black sm:mb-8 sm:text-3xl md:text-4xl">
                Our Impact
              </h2>
              {/* Animated underline */}
              <div className="mb-8">
                <AnimatedUnderline width="w-52" />
              </div>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 lg:gap-8">
              <div className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-500 hover:shadow-2xl sm:p-8 md:p-10">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <h3 className="relative z-10 mb-3 font-bold text-black text-lg sm:mb-4 sm:text-xl md:text-2xl lg:text-3xl">
                  Community Development
                </h3>
                <p className="relative z-10 text-gray-700 text-sm leading-relaxed sm:text-base md:text-lg">
                  CRD has played an active role in Northwest Arkansas's growth,
                  particularly in Downtown Rogers and other evolving districts.
                  Our team has supported adaptive reuse conversions,
                  multi-tenant mixed-use redevelopments, and ground-up housing
                  projects that contribute to the region's vitality and
                  long-term value.
                </p>
              </div>

              <div className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-2xl md:p-10">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <h3 className="relative z-10 mb-3 font-bold text-black text-lg sm:mb-4 sm:text-xl md:text-2xl lg:text-3xl">
                  Client Success
                </h3>
                <p className="relative z-10 text-gray-700 text-sm leading-relaxed sm:text-base md:text-lg">
                  From first-time homebuyers finding their perfect home to
                  investors executing complex commercial transactions, CRD has
                  guided countless clients through successful real estate
                  decisions. Our focus on long-term value and strategic
                  positioning has helped clients protect investments, reduce
                  risk, and achieve their goals.
                </p>
              </div>

              <div className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-2xl md:p-10">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <h3 className="relative z-10 mb-3 font-bold text-black text-lg sm:mb-4 sm:text-xl md:text-2xl lg:text-3xl">
                  Market Expertise
                </h3>
                <p className="relative z-10 text-gray-700 text-sm leading-relaxed sm:text-base md:text-lg">
                  Through years of hands-on experience across commercial,
                  residential, and development real estate, CRD has developed
                  deep insight into Northwest Arkansas market dynamics. This
                  knowledge informs every recommendation and helps clients make
                  decisions aligned with both current conditions and future
                  potential.
                </p>
              </div>

              <div className="group relative overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-2xl md:p-10">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <h3 className="relative z-10 mb-3 font-bold text-black text-lg sm:mb-4 sm:text-xl md:text-2xl lg:text-3xl">
                  Strategic Partnerships
                </h3>
                <p className="relative z-10 text-gray-700 text-sm leading-relaxed sm:text-base md:text-lg">
                  CRD works alongside landowners, investors, developers, and
                  business owners to bring clarity to complex decisions. Our
                  collaborative approach and network of trusted partners across
                  brokerage, development, construction, and advisory services
                  enable comprehensive support for clients' diverse needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Logo Banner */}
        <ClientLogoBanner />

        {/* Our Approach Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-bold font-display text-2xl text-black sm:mb-8 sm:text-3xl md:text-4xl">
                Our Approach
              </h2>
              {/* Animated underline */}
              <div className="mb-8">
                <AnimatedUnderline width="w-52" />
              </div>
            </div>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
              layout
            >
              <motion.div
                className="group relative overflow-hidden border-2 border-black bg-white p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                layout
              >
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Divider with red accent */}
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={100} />
                </div>
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-sm bg-black transition-colors duration-300 group-hover:bg-brand-red-700">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  <svg
                    className="relative z-10 h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h3 className="mb-4 font-bold text-black text-xl transition-colors duration-300 group-hover:text-brand-red-700 md:text-2xl">
                  Ownership Mindset
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  We think like owners and investors, not just brokers. Every
                  recommendation is made with long-term value, risk management,
                  and strategic positioning in mind.
                </p>
              </motion.div>
              <div className="group relative overflow-hidden border-2 border-black bg-white p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Divider with red accent */}
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={100} />
                </div>
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-sm bg-black transition-colors duration-300 group-hover:bg-brand-red-700">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  <svg
                    className="relative z-10 h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h3 className="mb-4 font-bold text-black text-xl transition-colors duration-300 group-hover:text-brand-red-700 md:text-2xl">
                  Local Knowledge
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  We live and work in Northwest Arkansas, giving us firsthand
                  understanding of neighborhoods, growth patterns, and market
                  dynamics that shape real estate value.
                </p>
              </div>
              <motion.div
                className="group relative overflow-hidden border-2 border-black bg-white p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                layout
              >
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Divider with red accent */}
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={100} />
                </div>
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-sm bg-black transition-colors duration-300 group-hover:bg-brand-red-700">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  <svg
                    className="relative z-10 h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h3 className="mb-4 font-bold text-black text-xl transition-colors duration-300 group-hover:text-brand-red-700 md:text-2xl">
                  Strategic Clarity
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  We focus on providing clear, actionable guidance that helps
                  clients make informed decisions aligned with their business
                  and investment objectives.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-bold font-display text-2xl text-black sm:mb-8 sm:text-3xl md:text-4xl">
                What We Stand For
              </h2>
              {/* Animated underline */}
              <div className="mb-8">
                <AnimatedUnderline width="w-52" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8">
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-4 w-4 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-4 w-4 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Divider with red accent */}
                <div className="relative mb-4 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40" />
                </div>
                <h3 className="mb-3 font-bold text-black text-xl transition-colors duration-300 group-hover:text-brand-red-700 md:text-2xl">
                  Client-First Representation
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  Every transaction is handled with care, transparency, and a
                  focus on what's best for the client. We believe strong
                  outcomes start with strong relationships.
                </p>
              </div>
              <div className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8">
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-4 w-4 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-4 w-4 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Divider with red accent */}
                <div className="relative mb-4 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40" />
                </div>
                <h3 className="mb-3 font-bold text-black text-xl transition-colors duration-300 group-hover:text-brand-red-700 md:text-2xl">
                  Long-Term Perspective
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  We make recommendations with durability, market relevance, and
                  long-term performance in mind. Every decision is evaluated
                  through the lens of lasting value.
                </p>
              </div>
              <div className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8">
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-4 w-4 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-4 w-4 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Divider with red accent */}
                <div className="relative mb-4 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40" />
                </div>
                <h3 className="mb-3 font-bold text-black text-xl transition-colors duration-300 group-hover:text-brand-red-700 md:text-2xl">
                  Community Investment
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  As active members of the Northwest Arkansas community, we're
                  invested in the region's success. Our work supports growth
                  that benefits investors, owners, and communities alike.
                </p>
              </div>
              <motion.div
                className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8"
                layout
              >
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-4 w-4 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-4 w-4 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Divider with red accent */}
                <div className="relative mb-4 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-40" />
                </div>
                <h3 className="mb-3 font-bold text-black text-xl transition-colors duration-300 group-hover:text-brand-red-700 md:text-2xl">
                  Disciplined Execution
                </h3>
                <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                  We focus on disciplined planning and thoughtful execution to
                  help clients avoid costly missteps and delays. Strategy
                  matters, but execution determines outcomes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="mb-4 font-bold font-display text-3xl text-black md:text-4xl">
                Work With a Team That Knows Northwest Arkansas
              </h2>
              <p className="mx-auto mb-8 max-w-4xl text-gray-700 text-lg">
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
                  href="/team"
                >
                  Meet Our Team
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
