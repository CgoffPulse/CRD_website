"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AboutHero() {
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

    const handleTimeUpdate = () => {
      if (video.currentTime >= 22) {
        video.currentTime = 0;
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

    video.addEventListener("timeupdate", handleTimeUpdate);
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
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  return (
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
              process.env.NEXT_PUBLIC_WATER_TOWERS_VIDEO_URL ||
              "/images/Water Towers to Concert Roof.MP4"
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
              className="absolute inset-0 -mx-4 border-2 border-black bg-white sm:-mx-6 md:inset-[1.5rem]"
              initial={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 h-6 w-6 border-black border-t-2 border-l-2" />
              <div className="absolute top-0 right-0 h-6 w-6 border-black border-t-2 border-r-2" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-black border-b-2 border-l-2" />
              <div className="absolute right-0 bottom-0 h-6 w-6 border-black border-r-2 border-b-2" />
            </motion.div>
            <div className="relative z-10">
              <motion.h1
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 font-bold font-display text-3xl text-black md:mb-2 md:text-3xl lg:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About CRD RED
              </motion.h1>
              {/* Divider with red accent */}
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="mb-3 flex items-center justify-center md:mb-3"
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div className="relative h-1 w-84 bg-black md:w-100">
                  <div className="absolute inset-0 bg-brand-red-700 opacity-60" />
                </motion.div>
              </motion.div>
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mb-4 max-w-5xl px-2 text-black text-lg md:mb-4 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Local expertise. Ownership mindset. Long-term value across
                Northwest Arkansas.
              </motion.p>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-center gap-3 px-2 sm:flex-row sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <button
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-none border-2 border-black bg-transparent px-5 py-2.5 font-copperplate-medium font-semibold text-black text-xs transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white sm:px-6 sm:py-3 sm:text-sm md:px-8"
                  onClick={() => {
                    const nextSection = document.querySelector(
                      "section:nth-of-type(2)"
                    );
                    if (nextSection) {
                      nextSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  Learn More
                </button>
                <Link
                  className="inline-flex min-h-[44px] items-center justify-center rounded-none border-2 border-black bg-transparent px-5 py-2.5 font-copperplate-medium font-semibold text-black text-xs transition-all duration-300 ease-in-out hover:scale-105 hover:border-black hover:bg-black hover:text-white sm:px-6 sm:py-3 sm:text-sm md:px-8"
                  href="/team"
                >
                  Meet the Team
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
