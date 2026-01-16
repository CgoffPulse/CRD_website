"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedUnderline from "@/components/AnimatedUnderline";

export default function Hero() {
  const [showText, setShowText] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    "https://www.youtube.com/embed/FRVwWUwxZHs?autoplay=1&mute=1&loop=1&playlist=FRVwWUwxZHs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&start=0"
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isPlayingRef = useRef(false);

  // Set YouTube URL with origin parameter on client side only to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      setYoutubeUrl(
        `https://www.youtube.com/embed/FRVwWUwxZHs?autoplay=1&mute=1&loop=1&playlist=FRVwWUwxZHs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&start=0&origin=${encodeURIComponent(window.location.origin)}`
      );
    }
  }, []);

  // Handle user interaction to start video on mobile
  const handleUserInteraction = () => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow && !isPlayingRef.current) {
      // Try to play video via postMessage (YouTube API)
      try {
        const playCommand = JSON.stringify({
          event: "command",
          func: "playVideo",
          args: "",
        });

        // Send to all possible origins
        const origins = [
          "*",
          "https://www.youtube.com",
          "https://www.youtube-nocookie.com",
        ];
        origins.forEach((origin) => {
          iframe.contentWindow?.postMessage(playCommand, origin);
        });

        // Also try alternative format
        const altCommand = JSON.stringify({
          event: "command",
          func: "playVideo",
          args: [],
        });
        origins.forEach((origin) => {
          iframe.contentWindow?.postMessage(altCommand, origin);
        });
      } catch (_e) {
        // Ignore errors
      }
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;

    // Fade in text after 6 seconds
    const timer = setTimeout(() => {
      setShowText(true);
    }, 6000);

    // Listen for YouTube API ready event and messages
    const handleMessage = (event: MessageEvent) => {
      // YouTube sends events when ready
      if (event.data === "YTFrameAPIReady" || event.data?.event === "onReady") {
        setTimeout(() => {
          handleUserInteraction();
        }, 500);
      }
      // Also listen for video state changes
      if (event.data?.event === "onStateChange") {
        const state = event.data?.info;
        // State 1 = playing, 2 = paused, 3 = buffering, 0 = ended
        if (state === 1) {
          isPlayingRef.current = true;
          setVideoPlaying(true);
        } else if (state === 2 || state === 3) {
          // If paused or buffering, try to play again
          setTimeout(() => {
            handleUserInteraction();
          }, 1000);
        }
      }
      // Listen for any YouTube messages
      if (
        event.origin.includes("youtube.com") ||
        event.origin.includes("youtube-nocookie.com")
      ) {
        // YouTube is ready, try to play
        setTimeout(() => {
          handleUserInteraction();
        }, 500);
      }
    };

    window.addEventListener("message", handleMessage);

    // Force play video after iframe loads
    const handleIframeLoad = () => {
      // Wait for YouTube API to be ready - try multiple times
      [1500, 2500, 3500, 4500].forEach((delay, _index) => {
        setTimeout(() => {
          handleUserInteraction();
        }, delay);
      });
    };

    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad);
      // Also check if already loaded
      try {
        if (iframe.contentDocument?.readyState === "complete") {
          handleIframeLoad();
        }
      } catch (_e) {
        // Cross-origin, can't access - that's fine
        handleIframeLoad();
      }
    }

    // Add event listeners for user interaction
    const events = ["touchstart", "touchend", "click", "scroll"];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, {
        once: true,
        passive: true,
      });
    });

    // Also try to play immediately and repeatedly (aggressive for mobile)
    const playInterval = setInterval(() => {
      handleUserInteraction();
    }, 2000);

    // Clear interval after 20 seconds
    setTimeout(() => {
      clearInterval(playInterval);
    }, 20_000);

    // Multiple delayed attempts
    [1000, 2000, 3000, 4000, 5000].forEach((delay) => {
      setTimeout(() => {
        handleUserInteraction();
      }, delay);
    });

    return () => {
      clearTimeout(timer);
      clearInterval(playInterval);
      window.removeEventListener("message", handleMessage);
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [handleUserInteraction]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hero-video-iframe {
          width: max(100vw, 177.78vh);
          height: max(56.25vw, 100vh);
        }
        @media (max-width: 767px) {
          .hero-video-iframe {
            width: 177.78vh;
            height: 100vh;
          }
          @media (orientation: landscape) {
            .hero-video-iframe {
              width: 100vw;
              height: max(56.25vw, 100vh);
            }
          }
        }
        /* Hide YouTube UI elements and play button */
        .hero-video-iframe {
          position: relative;
        }
        .hero-video-iframe::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          background: transparent;
        }
      `,
        }}
      />
      <section className="relative flex min-h-[100vh] items-end overflow-hidden text-white">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <iframe
            allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
            className="hero-video-iframe absolute top-1/2 left-1/2 transition-all duration-1000"
            ref={iframeRef}
            src={youtubeUrl}
            style={{
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
            title="YouTube video background"
          />
          {/* Overlay to hide YouTube UI and ensure video plays */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          {/* Invisible overlay to capture clicks and trigger play on mobile - hide once playing */}
          {!videoPlaying && (
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[2]"
              onClick={handleUserInteraction}
              onTouchStart={handleUserInteraction}
              style={{ pointerEvents: "auto" }}
            />
          )}
        </div>

        {/* Subtle corner accents */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {/* Top corners - minimal lines */}
          <div className="absolute top-0 left-0 h-24 w-24 border-white/20 border-t-2 border-l-2 md:h-32 md:w-32" />
          <div className="absolute top-0 right-0 h-24 w-24 border-white/20 border-t-2 border-r-2 md:h-32 md:w-32" />
          {/* Bottom corners - minimal lines */}
          <div className="absolute bottom-0 left-0 h-24 w-24 border-white/20 border-b-2 border-l-2 md:h-32 md:w-32" />
          <div className="absolute right-0 bottom-0 h-24 w-24 border-white/20 border-r-2 border-b-2 md:h-32 md:w-32" />
        </div>

        {/* Content - positioned at very bottom with fade-in effect */}
        <motion.div
          animate={{ opacity: showText ? 1 : 0 }}
          className="relative z-20 w-full px-2 pb-4 text-center md:px-4 md:pb-6 lg:pb-8"
          initial={{ opacity: 0 }}
          layout
          transition={{ duration: 1 }}
        >
          {/* White fully opaque background behind text */}
          <motion.div
            animate={{ opacity: showText ? 1 : 0 }}
            className="absolute inset-0 -mx-2 bg-white py-3 md:-mx-4 md:py-4"
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
          <div className="relative z-10">
            <motion.div className="mb-2 inline-block md:mb-3" layout>
              <div className="mx-auto mb-2 h-1 w-24 bg-black" />
            </motion.div>
            <motion.h2
              className="mb-2 px-2 font-display font-semibold text-2xl text-black uppercase leading-tight tracking-wide md:mb-3 md:text-3xl lg:text-4xl"
              layout
            >
              Community Focused
              <br />
              Results Driven
            </motion.h2>
            <div className="mb-2 md:mb-3">
              <AnimatedUnderline width="w-32" color="bg-black" delay={300} />
            </div>
            <motion.p
              className="Error Type Build Error ## Error Message Parsing ecmascript source code failed ## Build Output ./Developer/crd-new/app/team/TeamHero.tsx:158:15 Parsing ecmascript source code failed 156 | </motion.span> 157 | </motion.h1> > 158 | </div> | ^ > 159 | </motion.div> | ^^^^^^^ 160 | 161 | {/* Overlaid Content - text below */} 162 | <motion.div Expected '</', got 'jsx text ( )' Import traces: Client Component Browser: ./Developer/crd-new/app/team/TeamHero.tsx Component Browser] ./Developer/crd-new/app/team/page.tsx Component Browser] ./Developer/crd-new/app/team/page.tsx Component] Client Component SSR: ./Developer/crd-new/app/team/TeamHero.tsx Component SSR] ./Developer/crd-new/app/team/page.tsx Component SSR] ./Developer/crd-new/app/team/page.tsx Component] Next.js version: 16.1.2 (Turbopack) xl w-full px-2 font-light text-black text-lg leading-relaxed tracking-wide [Client [Client [Client [Client [Server [Server md:px-4 md:text-## lg:text-2xl"
              layout
            >
              Commercial, Residential, and Development
              <span className="md:hidden" />
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>Real Estate Across
              Northwest Arkansas
            </motion.p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
