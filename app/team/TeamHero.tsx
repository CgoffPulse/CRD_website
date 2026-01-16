"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeamHero() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animated-bg {
          background: linear-gradient(-45deg, #000000, #1a1a1a, #000000, #0a0a0a) !important;
          background-size: 400% 400% !important;
          animation: gradient-shift 15s ease infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }
        .floating-shape:nth-child(2) {
          animation-delay: -2s;
        }
        .floating-shape:nth-child(3) {
          animation-delay: -4s;
        }
      `,
        }}
      />
      <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden md:min-h-[70vh]">
        {/* Animated black background */}
        <div
          className="animated-bg absolute inset-0"
          style={{
            zIndex: 0,
            background:
              "linear-gradient(-45deg, #000000, #1a1a1a, #000000, #0a0a0a)",
            backgroundSize: "400% 400%",
          }}
        />
        {/* Animated background shapes */}
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <motion.div
            animate={{
              opacity: [0, 1, 1],
              scale: [0, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            className="floating-shape absolute top-20 left-10 h-64 w-64 rounded-full bg-brand-red-700/5 blur-3xl"
            initial={{ opacity: 0, scale: 0, x: -200 }}
            transition={{
              opacity: { duration: 1, delay: 0.5 },
              scale: { duration: 1, delay: 0.5 },
              x: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              y: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          />
          <motion.div
            animate={{
              opacity: [0, 1, 1],
              scale: [0, 1.2, 1],
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            className="floating-shape absolute right-10 bottom-20 h-96 w-96 rounded-full bg-brand-red-700/5 blur-3xl"
            initial={{ opacity: 0, scale: 0, x: 200 }}
            transition={{
              opacity: { duration: 1, delay: 0.7 },
              scale: { duration: 1, delay: 0.7 },
              x: {
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              y: {
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          />
          <motion.div
            animate={{
              opacity: [0, 1, 1],
              scale: [0, 1.2, 1],
              x: [0, 120, 0],
              y: [0, -80, 0],
            }}
            className="floating-shape absolute top-1/2 left-1/2 h-80 w-80 rounded-full bg-brand-red-700/3 blur-3xl"
            initial={{ opacity: 0, scale: 0, y: -200 }}
            transition={{
              opacity: { duration: 1, delay: 0.9 },
              scale: { duration: 1, delay: 0.9 },
              x: {
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              y: {
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          />
        </div>

        {/* White background - full width, extends to nav border */}
        <motion.div
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: -100, scale: 0.95 }
          }
          className="absolute top-0 right-0 left-0 z-10 w-full border-black border-b-2 bg-white pt-20 md:pt-28 lg:pt-36 xl:pt-40"
          initial={{ opacity: 0, y: -100, scale: 0.95 }}
          key={`${pathname}-bg`}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            className="container mx-auto max-w-4xl px-4 pt-10 pb-6 text-center sm:px-6 md:pt-16 md:pb-8 lg:pt-24 lg:pb-10 xl:pt-28"
            initial={{ opacity: 0 }}
            key={`${pathname}-container`}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Heading */}
            <motion.h1
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              className="mb-3 px-2 font-bold font-display text-3xl text-black leading-tight md:mb-2 md:text-3xl lg:text-4xl"
              initial={{ opacity: 0 }}
              key={pathname}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.span
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                key={`${pathname}-span`}
                transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                Our Team
              </motion.span>
            </motion.h1>
            {/* Divider with red accent */}
            <motion.div
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              className="mb-3 flex items-center justify-center md:mb-3"
              initial={{ opacity: 0 }}
              key={`${pathname}-divider-container`}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Mobile */}
              <motion.div
                animate={isVisible ? { width: "13.5rem" } : { width: 0 }}
                className="relative h-1 bg-black md:hidden"
                initial={{ width: 0 }}
                key={`${pathname}-divider-line-mobile`}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className="absolute inset-0 bg-brand-red-700 opacity-60" />
              </motion.div>
              {/* Desktop */}
              <motion.div
                animate={isVisible ? { width: "16rem" } : { width: 0 }}
                className="relative hidden h-1 bg-black md:block"
                initial={{ width: 0 }}
                key={`${pathname}-divider-line-desktop`}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className="absolute inset-0 bg-brand-red-700 opacity-60" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Overlaid Content - text below */}
        <motion.div
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          className="container relative z-20 mx-auto max-w-4xl px-4 pt-64 pb-8 text-center sm:px-6 md:pt-80 md:pb-12 lg:pt-96 xl:pt-[28rem]"
          initial={{ opacity: 0 }}
          key={`${pathname}-overlay`}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {/* Text content below - white text */}
          <div className="mx-auto max-w-4xl space-y-4 px-2 pt-2 text-base text-white leading-relaxed md:space-y-6 md:pt-4 md:text-lg lg:text-xl">
            <motion.p
              animate={
                isVisible
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 30, filter: "blur(8px)" }
              }
              className="text-pretty"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              key={`${pathname}-p1`}
              transition={{ duration: 1, delay: 1.6, ease: [0.4, 0, 0.2, 1] }}
            >
              CRD Real Estate & Development is built around people who
              understand Northwest Arkansas — not just the market, but the
              communities, neighborhoods, and long-term implications behind
              every real estate decision. Our team brings deep local roots,
              professional experience across commercial, residential, and
              development real estate, and a shared commitment to guiding
              clients with clarity and care.
            </motion.p>
            <motion.p
              animate={
                isVisible
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 30, filter: "blur(8px)" }
              }
              className="text-pretty"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              key={`${pathname}-p2`}
              transition={{ duration: 1, delay: 1.8, ease: [0.4, 0, 0.2, 1] }}
            >
              We believe strong outcomes start with strong relationships. That's
              why clients work directly with experienced professionals who
              listen closely, communicate clearly, and stay engaged from first
              conversation through closing and beyond.
            </motion.p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
