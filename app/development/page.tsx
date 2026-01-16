"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AnimatedUnderline from "@/components/AnimatedUnderline";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function DevelopmentPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    // Set mobile-specific attributes for better autoplay support
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.muted = true;

    // Optimize loading for mobile
    video.load();

    const playVideo = () => {
      if (video.readyState >= 2) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented
          });
        }
      }
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      playVideo();
      // Fade in text 1 second after video can play
      setTimeout(() => {
        setShowText(true);
      }, 1000);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      playVideo();
      // Fade in text 1 second after video loads
      setTimeout(() => {
        setShowText(true);
      }, 1000);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // Handle user interaction to start video on mobile
    const handleUserInteraction = () => {
      playVideo();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    // Add event listeners for user interaction (mobile autoplay workaround)
    const events = ["touchstart", "touchend", "click", "scroll"];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, {
        once: true,
        passive: true,
      });
    });

    // Check if video is already loaded
    if (video.readyState >= 3) {
      setIsLoading(false);
      playVideo();
      setTimeout(() => {
        setShowText(true);
      }, 1000);
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden md:min-h-[100vh]">
          {/* Fallback Background */}
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

          {/* Video Background */}
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <video
              autoPlay
              className={`absolute top-1/2 left-1/2 h-full w-full object-cover transition-all duration-1000 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              loop
              muted
              playsInline
              preload="metadata"
              ref={videoRef}
              style={{
                transform: "translate(-50%, -50%)",
                minWidth: "100%",
                minHeight: "100%",
              }}
            >
              <source
                src={
                  process.env.NEXT_PUBLIC_DRONE_DOWNTOWN_VIDEO_URL ||
                  "/images/South edge of building to east edge of building drone is facing downtown.MP4"
                }
                type="video/mp4"
              />
            </video>

            {/* Loading Spinner */}
            <AnimatePresence>
              {isLoading && !hasError && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/30"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-8 w-8 animate-spin rounded-full border-4 border-brand-red-700/30 border-t-brand-red-700"
                        style={{
                          animationDirection: "reverse",
                          animationDuration: "0.8s",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay for text readability */}
            <div
              className={`absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>

          {/* Content - fades in */}
          <AnimatePresence mode="wait">
            {showText && (
              <motion.div
                animate={{ opacity: 1 }}
                className="container relative z-10 mx-auto max-w-6xl px-4 pt-16 pb-12 text-center sm:px-6 md:pt-20 md:pb-16"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* White fully opaque background behind text */}
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 -mx-4 bg-white sm:-mx-6 md:inset-[1.5rem]"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                />
                <div className="relative z-10">
                  <motion.h1
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 font-bold font-display text-3xl text-black leading-tight md:mb-3 md:text-3xl lg:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Development
                  </motion.h1>
                  {/* Divider with red accent */}
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-3 flex items-center justify-center md:mb-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div className="relative h-1 w-76 bg-black md:w-92">
                      <div className="absolute inset-0 bg-brand-red-700 opacity-60" />
                    </motion.div>
                  </motion.div>
                  <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto mb-4 max-w-5xl px-2 text-base text-black leading-relaxed md:mb-4 md:text-lg lg:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Real Estate Development Strategy
                    <span className="md:hidden">{" // "}</span>
                    <br className="md:hidden" />
                    <span className="hidden md:inline"> </span>and Site
                    Selection Services
                  </motion.p>
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col justify-center gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Link
                      className="btn-primary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                      href="/contact"
                    >
                      Discuss a Project
                    </Link>
                    <Link
                      className="inline-flex min-h-[44px] items-center justify-center rounded-none border-2 border-black bg-transparent px-8 py-3 font-copperplate-medium font-semibold text-black text-sm transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
                      href="/contact"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Intro Section - Flowing text without boxes */}
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12">
              <AnimatedUnderline width="w-52" />
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="mx-auto mb-6 max-w-5xl text-base text-black leading-relaxed sm:mb-10 sm:text-lg md:text-2xl">
                CRD Real Estate and Development provides real estate development
                consulting services focused on site selection, market
                feasibility and early stage planning. We support landowners,
                investors and organizations navigating complex real estate
                decisions with clarity and discipline.
              </p>
              <p className="mx-auto max-w-5xl text-base text-black leading-relaxed sm:text-lg md:text-2xl">
                While headquartered in Northwest Arkansas, CRD has supported
                development initiatives across multiple markets, working with
                national clients on site selection services and strategic
                development advisory. Our approach emphasizes repeatable
                analysis, market specific evaluation and thoughtful coordination
                where projects move forward.
              </p>
            </div>
          </div>
        </section>

        {/* Development Services Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-6 font-bold font-display text-3xl text-black sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
                Development Services
              </h2>
              {/* Divider with red accent */}
              <div className="mb-12 flex items-center justify-center">
                <div className="relative h-1 w-52 bg-black">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30" />
                </div>
              </div>
            </div>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              layout
            >
              {/* Site Selection and Market Evaluation Services */}
              <motion.div
                className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8"
                layout
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="relative z-10">
                  <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl">
                    Site Selection and Market Evaluation Services
                  </h3>
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    CRD advises clients on site selection by evaluating market
                    dynamics, demographics, access, zoning frameworks and long
                    term growth indicators. This process helps identify
                    locations that align with operational goals, investment
                    strategy and development feasibility.
                  </p>
                  <p className="mt-4 text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    We regularly support organizations evaluating opportunities
                    across multiple markets, providing consistent analysis and
                    clear recommendations tailored to each location.
                  </p>
                </div>
              </motion.div>

              {/* Feasibility and Development Strategy */}
              <motion.div
                className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8"
                layout
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="relative z-10">
                  <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl">
                    Feasibility and Development Strategy
                  </h3>
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    Early stage decisions carry the greatest impact. CRD
                    supports feasibility analysis and development strategy by
                    aligning market demand, project goals and financial
                    considerations before significant capital is committed.
                  </p>
                  <p className="mt-4 text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    Our team helps clients determine where projects make sense,
                    how they should be positioned and what risks should be
                    addressed early in the process.
                  </p>
                </div>
              </motion.div>

              {/* Strategic Development Advisory Services */}
              <motion.div
                className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8"
                layout
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="relative z-10">
                  <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl">
                    Strategic Development Advisory Services
                  </h3>
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    CRD serves as a strategic development advisor to clients
                    pursuing growth across single or multiple markets. We
                    support planning, coordination and decision making at the
                    front end of development projects, helping clients move
                    forward with confidence and intention.
                  </p>
                  <p className="mt-4 text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    This advisory role allows us to bring structure and clarity
                    to complex initiatives without extending beyond what the
                    project requires.
                  </p>
                </div>
              </motion.div>

              {/* Entitlement and Permitting Support */}
              <div className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="relative z-10">
                  <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl">
                    Entitlement and Permitting Support
                  </h3>
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    Where appropriate, CRD assists clients in navigating
                    entitlement and permitting processes. We work alongside
                    local consultants, municipalities and project teams to help
                    reduce friction and maintain momentum during planning and
                    approval phases.
                  </p>
                </div>
              </div>

              {/* Design Coordination and Project Oversight */}
              <motion.div
                className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8"
                layout
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="relative z-10">
                  <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl">
                    Design Coordination and Project Oversight
                  </h3>
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    CRD coordinates with architects, engineers and project
                    partners to ensure design decisions align with development
                    strategy, budgets and timelines. Our involvement helps keep
                    projects organized and aligned as they move from planning
                    into execution.
                  </p>
                </div>
              </motion.div>

              {/* Redevelopment and Adaptive Reuse */}
              <div className="group relative overflow-hidden border-2 border-black bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:p-8">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="relative z-10">
                  <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl">
                    Redevelopment and Adaptive Reuse
                  </h3>
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed transition-colors duration-300 md:text-lg">
                    Our experience includes redevelopment and adaptive reuse
                    projects in complex environments where regulatory
                    constraints, existing structures and community
                    considerations must be carefully balanced. This work
                    requires patience, local understanding and disciplined
                    planning.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who We Support Section - Flowing text without boxes */}
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-6 font-bold font-display text-3xl text-black sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
                Who We Support
              </h2>
              {/* Divider with red accent */}
              <div className="mb-12 flex items-center justify-center">
                <div className="relative h-1 w-52 bg-black">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30" />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-5xl">
              <p className="mb-8 text-center text-base text-gray-700 leading-relaxed sm:mb-10 sm:text-lg md:text-2xl">
                CRD works with a range of clients involved in development and
                expansion, including:
              </p>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div className="group flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-brand-red-700 sm:h-6 sm:w-6">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      •
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed transition-colors duration-300 group-hover:text-black sm:text-base md:text-xl">
                    Developers evaluating new markets or growth opportunities
                  </span>
                </div>
                <div className="group flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-brand-red-700 sm:h-6 sm:w-6">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      •
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed transition-colors duration-300 group-hover:text-black sm:text-base md:text-xl">
                    Investors assessing site viability and long term potential
                  </span>
                </div>
                <div className="group flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-brand-red-700 sm:h-6 sm:w-6">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      •
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed transition-colors duration-300 group-hover:text-black sm:text-base md:text-xl">
                    Landowners planning future development or repositioning
                  </span>
                </div>
                <div className="group flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-brand-red-700 sm:h-6 sm:w-6">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      •
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed transition-colors duration-300 group-hover:text-black sm:text-base md:text-xl">
                    Organizations pursuing multi location strategies
                  </span>
                </div>
              </div>
              <p className="text-center text-base text-gray-700 leading-relaxed sm:text-lg md:text-xl">
                Our role adapts to the needs of each project and market.
              </p>
            </div>
          </div>
        </section>

        {/* How Our Development Process Works - Flowing design with red accents */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-6 font-bold font-display text-3xl text-black sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
                How Our Development Process Works
              </h2>
              {/* Divider with red accent */}
              <div className="mb-12 flex items-center justify-center">
                <div className="relative h-1 w-52 bg-black">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30" />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-5xl space-y-12">
              {/* Step 1 */}
              <div className="group relative flex flex-col items-start gap-8 md:flex-row">
                {/* Red accent line on left */}
                <div className="absolute top-0 bottom-0 left-0 hidden w-1 bg-brand-red-700 opacity-20 transition-opacity duration-300 group-hover:opacity-40 md:block" />
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm bg-black font-bold text-2xl text-white transition-colors duration-300 group-hover:bg-brand-red-700 md:text-3xl">
                  1
                </div>
                <div className="relative flex-1 pl-8 md:pl-0">
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <h3 className="mb-4 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                    Discovery and Goals
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed md:text-xl">
                    We begin by understanding the project vision, objectives and
                    constraints.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative flex flex-col items-start gap-8 md:flex-row">
                {/* Red accent line on left */}
                <div className="absolute top-0 bottom-0 left-0 hidden w-1 bg-brand-red-700 opacity-20 transition-opacity duration-300 group-hover:opacity-40 md:block" />
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm bg-black font-bold text-2xl text-white transition-colors duration-300 group-hover:bg-brand-red-700 md:text-3xl">
                  2
                </div>
                <div className="relative flex-1 pl-8 md:pl-0">
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <h3 className="mb-4 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                    Market and Site Evaluation
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed md:text-xl">
                    We assess location specific factors, market demand and
                    development feasibility.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative flex flex-col items-start gap-8 md:flex-row">
                {/* Red accent line on left */}
                <div className="absolute top-0 bottom-0 left-0 hidden w-1 bg-brand-red-700 opacity-20 transition-opacity duration-300 group-hover:opacity-40 md:block" />
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm bg-black font-bold text-2xl text-white transition-colors duration-300 group-hover:bg-brand-red-700 md:text-3xl">
                  3
                </div>
                <div className="relative flex-1 pl-8 md:pl-0">
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <h3 className="mb-4 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                    Strategy and Planning
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed md:text-xl">
                    We align site selection, development approach and early
                    stage planning.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="group relative flex flex-col items-start gap-8 md:flex-row">
                {/* Red accent line on left */}
                <div className="absolute top-0 bottom-0 left-0 hidden w-1 bg-brand-red-700 opacity-20 transition-opacity duration-300 group-hover:opacity-40 md:block" />
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm bg-black font-bold text-2xl text-white transition-colors duration-300 group-hover:bg-brand-red-700 md:text-3xl">
                  4
                </div>
                <div className="relative flex-1 pl-8 md:pl-0">
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <h3 className="mb-4 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                    Coordination and Approvals
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed md:text-xl">
                    We support coordination with design teams and local
                    stakeholders as needed.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="group relative flex flex-col items-start gap-8 md:flex-row">
                {/* Red accent line on left */}
                <div className="absolute top-0 bottom-0 left-0 hidden w-1 bg-brand-red-700 opacity-20 transition-opacity duration-300 group-hover:opacity-40 md:block" />
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm bg-black font-bold text-2xl text-white transition-colors duration-300 group-hover:bg-brand-red-700 md:text-3xl">
                  5
                </div>
                <div className="relative flex-1 pl-8 md:pl-0">
                  <div className="relative mb-6 h-1 w-12 overflow-hidden bg-black transition-all duration-300 group-hover:w-20">
                    <div className="absolute inset-0 bg-brand-red-700 opacity-50" />
                  </div>
                  <h3 className="mb-4 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                    Execution Support
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed md:text-xl">
                    We remain involved to support informed decision making
                    through delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why CRD Section - Enhanced with red accents and hover effects */}
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-6 font-bold font-display text-3xl text-black sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
                Why CRD
              </h2>
              {/* Divider with red accent */}
              <div className="mb-12 flex items-center justify-center">
                <div className="relative h-1 w-52 bg-black">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Pillar 1 */}
              <div className="group relative border-black/10 border-b-2 pb-8 transition-colors duration-300 last:border-r-0 hover:border-brand-red-700 md:border-r-2 md:border-b-0 md:pr-8">
                <div className="mb-6">
                  <AnimatedUnderline width="w-16" delay={100} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  Strategy First
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  We focus on early stage clarity to reduce risk and protect
                  long term value.
                </p>
              </div>

              {/* Pillar 2 */}
              <motion.div
                className="group relative border-black/10 border-b-2 pb-8 transition-colors duration-300 last:border-r-0 hover:border-brand-red-700 md:border-r-2 md:border-b-0 md:pr-8"
                layout
              >
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={200} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  Experience That Translates
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  Our approach is built on real world development experience
                  applied thoughtfully across markets.
                </p>
              </motion.div>

              {/* Pillar 3 */}
              <div className="group relative pb-8 transition-colors duration-300 hover:border-brand-red-700">
                <div className="mb-6">
                  <AnimatedUnderline width="w-16" delay={100} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  Disciplined and Accountable
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  Every recommendation is grounded in practicality, transparency
                  and responsibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Flowing design without boxes */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-6 font-bold font-display text-3xl text-black sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
                Frequently Asked Questions
              </h2>
              {/* Divider with red accent */}
              <div className="mb-12 flex items-center justify-center">
                <div className="relative h-1 w-52 bg-black">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30" />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-5xl space-y-12">
              {/* FAQ 1 */}
              <div className="group relative border-black/20 border-b-2 pb-8 transition-colors duration-300 hover:border-brand-red-700">
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={200} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  What types of development projects do you support
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  We support a range of projects including mixed use, multi
                  tenant, redevelopment, adaptive reuse and ground up
                  developments.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="group relative border-black/20 border-b-2 pb-8 transition-colors duration-300 hover:border-brand-red-700">
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={200} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  Do you help with entitlements and permitting
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  Yes. We assist clients in understanding and navigating
                  entitlement and permitting processes in coordination with
                  local municipalities and consultants.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="group relative border-black/20 border-b-2 pb-8 transition-colors duration-300 hover:border-brand-red-700">
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={200} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  Can you assist with redevelopment or adaptive reuse projects
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  Yes. Our team has experience supporting redevelopment and
                  adaptive reuse projects, particularly in Downtown Rogers and
                  similar districts.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="group relative border-black/20 border-b-2 pb-8 transition-colors duration-300 hover:border-brand-red-700">
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={200} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  When should I involve CRD in my development project
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  Ideally, as early as possible. Early involvement allows for
                  better feasibility analysis, planning and risk management.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="group relative border-black/20 border-b-2 pb-8 transition-colors duration-300 hover:border-brand-red-700">
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={200} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  Do you work across all of Northwest Arkansas
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  Yes. We work throughout Bentonville, Rogers, Springdale,
                  Fayetteville and surrounding areas.
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="group relative">
                <div className="mb-6">
                  <AnimatedUnderline width="w-12" delay={200} />
                </div>
                <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-brand-red-700 md:text-3xl lg:text-4xl">
                  Do you provide development services outside of Northwest
                  Arkansas
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed transition-colors duration-300 md:text-xl">
                  Yes. While CRD is headquartered in Northwest Arkansas, we also
                  support national clients through site selection services and
                  strategic development advisory in multiple states. Our
                  involvement is tailored to the needs of each project and
                  market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="mb-4 font-bold font-display text-2xl text-black sm:mb-6 sm:text-3xl md:text-5xl lg:text-6xl">
                Let's Talk About Your Development Strategy
              </h2>
              {/* Divider with red accent */}
              <div className="mb-8 flex items-center justify-center sm:mb-10">
                <div className="relative h-1 w-52 bg-black">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-30" />
                </div>
              </div>
              <p className="mx-auto mb-8 max-w-5xl px-2 text-base text-gray-700 leading-relaxed sm:mb-10 sm:text-lg md:text-2xl">
                Whether you are evaluating sites, planning growth or preparing a
                project for execution, CRD can help you move forward with
                clarity and confidence.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  className="btn-primary inline-flex items-center justify-center rounded-none px-8 py-3 text-sm"
                  href="/contact"
                >
                  Discuss a Project
                </Link>
                <Link
                  className="inline-flex min-h-[44px] items-center justify-center rounded-none border-2 border-black bg-transparent px-8 py-3 font-copperplate-medium font-semibold text-black text-sm transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
                  href="/contact"
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
