"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommercialHero() {
  const pathname = usePathname();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate image load completion
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background Image - extends behind header */}
      <motion.div
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        className="absolute top-0 right-0 bottom-0 left-0 z-0 h-full w-full"
        initial={{ opacity: 0 }}
        key={`${pathname}-bg`}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          animate={
            isVisible && imageLoaded
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 1.1, rotate: 2 }
          }
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
          key={`${pathname}-image`}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative h-full w-full">
            <Image
              alt="Rogers, Arkansas Skyline - Commercial Real Estate"
              className="object-cover blur-sm"
              fill
              onLoad={() => setImageLoaded(true)}
              priority
              quality={90}
              sizes="100vw"
              src="/images/Rogers_Skyline.webp"
            />
          </div>
        </motion.div>
        {/* Dark overlay for better text contrast */}
        <motion.div
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          key={`${pathname}-overlay`}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        {/* Animated border sweep effect */}
        <motion.div
          animate={
            isVisible
              ? { clipPath: "inset(0 0 0 0)" }
              : { clipPath: "inset(0 0 0 100%)" }
          }
          className="absolute inset-0 border-4 border-brand-red-700"
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          key={`${pathname}-border`}
          style={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>

      {/* Overlaid Content - starts below header */}
      <motion.div
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        className="container relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-20 text-center sm:px-6 md:pt-20 md:pb-16"
        initial={{ opacity: 0, y: 50 }}
        key={`${pathname}-content`}
        transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* White fully opaque background behind text - slides in from right - hidden on mobile */}
        <motion.div
          animate={
            isVisible
              ? { opacity: 1, x: 0, rotateY: 0 }
              : { opacity: 0, x: 100, rotateY: 15 }
          }
          className="absolute z-[1] hidden border-2 border-black bg-white md:inset-[1rem] md:block"
          initial={{ opacity: 0, x: 100, rotateY: 15 }}
          key={`${pathname}-white-bg`}
          style={{ transformPerspective: 1000 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2" />
          <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2" />
          <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2" />
          <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2" />
        </motion.div>
        <div className="relative z-10">
          <motion.h1
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            className="mb-4 px-2 font-bold font-display text-3xl text-white leading-tight md:mb-3 md:text-3xl md:text-black lg:mb-4 lg:text-4xl"
            initial={{ opacity: 0 }}
            key={`${pathname}-heading`}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            {/* Mobile: 3 lines */}
            <motion.span
              animate={
                isVisible
                  ? { opacity: 1, x: 0, rotateX: 0 }
                  : { opacity: 0, x: -100, rotateX: 90 }
              }
              className="inline-block md:hidden"
              initial={{ opacity: 0, x: -100, rotateX: 90 }}
              key={`${pathname}-span1`}
              transition={{ duration: 0.8, delay: 1.3, ease: "backOut" }}
            >
              Commercial
            </motion.span>
            <br className="md:hidden" />
            <motion.span
              animate={
                isVisible
                  ? { opacity: 1, x: 0, rotateX: 0 }
                  : { opacity: 0, x: 100, rotateX: -90 }
              }
              className="inline-block md:hidden"
              initial={{ opacity: 0, x: 100, rotateX: -90 }}
              key={`${pathname}-span2`}
              transition={{ duration: 0.8, delay: 1.4, ease: "backOut" }}
            >
              Real Estate
            </motion.span>
            <br className="md:hidden" />
            <motion.span
              animate={
                isVisible
                  ? { opacity: 1, x: 0, rotateX: 0 }
                  : { opacity: 0, x: -100, rotateX: 90 }
              }
              className="inline-block md:hidden"
              initial={{ opacity: 0, x: -100, rotateX: 90 }}
              key={`${pathname}-span3`}
              transition={{ duration: 0.8, delay: 1.5, ease: "backOut" }}
            >
              in NWA
            </motion.span>
            {/* Desktop: 2 lines */}
            <motion.span
              animate={
                isVisible
                  ? { opacity: 1, x: 0, rotateX: 0 }
                  : { opacity: 0, x: -100, rotateX: 90 }
              }
              className="hidden md:inline-block"
              initial={{ opacity: 0, x: -100, rotateX: 90 }}
              key={`${pathname}-span4`}
              transition={{ duration: 0.8, delay: 1.3, ease: "backOut" }}
            >
              Commercial Real Estate
            </motion.span>
            <br className="hidden md:block" />
            <motion.span
              animate={
                isVisible
                  ? { opacity: 1, x: 0, rotateX: 0 }
                  : { opacity: 0, x: 100, rotateX: -90 }
              }
              className="hidden md:inline-block"
              initial={{ opacity: 0, x: 100, rotateX: -90 }}
              key={`${pathname}-span5`}
              transition={{ duration: 0.8, delay: 1.5, ease: "backOut" }}
            >
              in Northwest Arkansas
            </motion.span>
          </motion.h1>

          <motion.p
            animate={
              isVisible
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.8, filter: "blur(10px)" }
            }
            className="mx-auto mb-6 max-w-5xl px-2 text-base text-white leading-relaxed md:mb-4 md:text-black md:text-lg lg:mb-6 lg:text-xl"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            key={`${pathname}-paragraph`}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.4, 0, 0.2, 1] }}
          >
            Strategic guidance for buying, leasing, and selling commercial
            property across Northwest Arkansas.
          </motion.p>

          <motion.div
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            className="flex flex-col justify-center gap-3 px-2 sm:flex-row sm:gap-4"
            initial={{ opacity: 0 }}
            key={`${pathname}-buttons-container`}
            transition={{ duration: 0.6, delay: 1.9 }}
          >
            <motion.div
              animate={
                isVisible
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: -80, scale: 0.5 }
              }
              initial={{ opacity: 0, x: -80, scale: 0.5 }}
              key={`${pathname}-button1`}
              transition={{ duration: 0.6, delay: 1.9, ease: "backOut" }}
            >
              <Link
                className="inline-flex min-h-[44px] items-center justify-center rounded-none border-2 border-white bg-transparent px-5 py-2.5 font-copperplate-medium font-semibold text-white text-xs transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black sm:px-6 sm:py-3 sm:text-sm md:border-black md:px-8 md:text-black md:hover:bg-black md:hover:text-white"
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
            </motion.div>
            <motion.div
              animate={{ opacity: 1, x: 0, scale: 1 }}
              initial={{ opacity: 0, x: -40, scale: 0.5 }}
              transition={{ duration: 0.6, delay: 2.0, ease: "backOut" }}
            >
              <Link
                className="inline-flex min-h-[44px] items-center justify-center rounded-none border-2 border-white bg-transparent px-5 py-2.5 font-copperplate-medium font-semibold text-white text-xs transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black sm:px-6 sm:py-3 sm:text-sm md:border-black md:px-8 md:text-black md:hover:bg-black md:hover:text-white"
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
            </motion.div>
            <motion.div
              animate={{ opacity: 1, x: 0, scale: 1 }}
              initial={{ opacity: 0, x: 80, scale: 0.5 }}
              transition={{ duration: 0.6, delay: 2.1, ease: "backOut" }}
            >
              <Link
                className="inline-flex min-h-[44px] items-center justify-center rounded-none border-2 border-white bg-white px-5 py-2.5 font-copperplate-medium font-semibold text-black text-xs transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white sm:px-6 sm:py-3 sm:text-sm md:border-black md:bg-black md:px-8 md:text-white md:hover:bg-white md:hover:text-black"
                href="/contact"
              >
                Talk With Our Team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
