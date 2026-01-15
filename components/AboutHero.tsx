"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set mobile-specific attributes for better autoplay support
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
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
      // Fade in blur 1 second after video can play (reduced from 2 seconds)
      setTimeout(() => {
        setShowBlur(true);
        // Fade in text after blur appears
        setTimeout(() => {
          setShowText(true);
        }, 300);
      }, 1000);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      playVideo();
      // Fade in blur 1 second after video loads (reduced from 2 seconds)
      setTimeout(() => {
        setShowBlur(true);
        // Fade in text after blur appears
        setTimeout(() => {
          setShowText(true);
        }, 300);
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
    const events = ['touchstart', 'touchend', 'click', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    // Check if video is already loaded
    if (video.readyState >= 3) {
      setIsLoading(false);
      playVideo();
      setTimeout(() => {
        setShowBlur(true);
        setTimeout(() => {
          setShowText(true);
        }, 300);
      }, 1000);
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Fallback Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="metadata"
          className={`absolute top-1/2 left-1/2 w-full h-full object-cover transition-all duration-1000 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            filter: showBlur ? 'blur(2px)' : 'blur(0px)',
          }}
        >
          <source
            src={process.env.NEXT_PUBLIC_WATER_TOWERS_VIDEO_URL || "/images/Water Towers to Concert Roof.MP4"}
            type="video/mp4"
          />
        </video>
        
        {/* Loading Spinner */}
        <AnimatePresence>
          {isLoading && !hasError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 z-20"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-brand-red-700/30 border-t-brand-red-700 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Overlay for text readability */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}></div>
      </div>
      
      {/* Content - fades in after blur */}
      <AnimatePresence mode="wait">
        {showText && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl text-center pt-24 md:pt-32"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl"
            >
              About CRD Real Estate & Development
            </motion.h1>
            {/* Divider with red accent */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center mb-4 md:mb-6"
            >
              <motion.div className="w-16 md:w-24 h-1 bg-white relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-60"></div>
              </motion.div>
              <div className="w-2 h-2 bg-white mx-1.5 md:mx-2 relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-70"></div>
              </div>
              <motion.div className="w-16 md:w-24 h-1 bg-white relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-60"></div>
              </motion.div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-white max-w-5xl mx-auto drop-shadow-lg px-2"
            >
              Local expertise. Ownership mindset. Long-term value across Northwest Arkansas.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
