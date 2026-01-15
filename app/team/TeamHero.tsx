"use client";

import { motion } from "framer-motion";

export default function TeamHero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
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
      `}} />
      <section className="relative w-full min-h-[85vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated black background */}
        <div 
          className="absolute inset-0 animated-bg" 
          style={{ 
            zIndex: 0,
            background: 'linear-gradient(-45deg, #000000, #1a1a1a, #000000, #0a0a0a)',
            backgroundSize: '400% 400%',
          }}
        ></div>
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <motion.div
            className="floating-shape absolute top-20 left-10 w-64 h-64 bg-brand-red-700/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="floating-shape absolute bottom-20 right-10 w-96 h-96 bg-brand-red-700/5 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="floating-shape absolute top-1/2 left-1/2 w-80 h-80 bg-brand-red-700/3 rounded-full blur-3xl"
            animate={{
              x: [0, 120, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

      {/* Overlaid Content */}
      <motion.div
        className="relative z-20 container mx-auto px-4 sm:px-6 max-w-4xl text-center pt-24 md:pt-32 pb-8 md:pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 lg:mb-10 drop-shadow-lg leading-tight px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Our Team
        </motion.h1>
        <motion.div
          className="text-base md:text-lg lg:text-xl text-white max-w-4xl mx-auto space-y-6 drop-shadow-md leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p>
            CRD Real Estate & Development is built around people who understand Northwest Arkansas — not just the market, but the communities, neighborhoods, and long-term implications behind every real estate decision. Our team brings deep local roots, professional experience across commercial, residential, and development real estate, and a shared commitment to guiding clients with clarity and care.
          </p>
          <p>
            We believe strong outcomes start with strong relationships. That's why clients work directly with experienced professionals who listen closely, communicate clearly, and stay engaged from first conversation through closing and beyond.
          </p>
        </motion.div>
      </motion.div>
    </section>
    </>
  );
}
