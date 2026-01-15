"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ResidentialHero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate image load completion
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - extends behind header */}
      <motion.div
        className="absolute inset-0 w-full h-full top-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/Rogers_AR_Hero.jpg"
            alt="Rogers, Arkansas - Residential Real Estate"
            fill
            sizes="100vw"
            className="object-cover blur-[2px]"
            priority
            quality={90}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>
        {/* Dark overlay for better text contrast */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      {/* Overlaid Content - starts below header */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl text-center pt-24 md:pt-32 pb-8 md:pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 lg:mb-8 drop-shadow-lg leading-tight px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Residential Real Estate in Northwest Arkansas
        </motion.h1>
        <motion.p
          className="text-base md:text-lg lg:text-xl text-white max-w-5xl mx-auto mb-6 md:mb-8 lg:mb-10 drop-shadow-md leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Local expertise and thoughtful guidance for buyers, sellers, and investors across Northwest Arkansas.
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
          <Link
            href="#listings"
            prefetch={false}
            className="bg-white text-black border-2 border-white hover:bg-gray-100 inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-none text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
          >
            View Current Listings
          </Link>
          <Link
            href="/contact"
            className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-none text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
