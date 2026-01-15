"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [showText, setShowText] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string>('https://www.youtube.com/embed/FRVwWUwxZHs?autoplay=1&mute=1&loop=1&playlist=FRVwWUwxZHs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&start=0');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isPlayingRef = useRef(false);
  
  // Set YouTube URL with origin parameter on client side only to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setYoutubeUrl(`https://www.youtube.com/embed/FRVwWUwxZHs?autoplay=1&mute=1&loop=1&playlist=FRVwWUwxZHs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&start=0&origin=${encodeURIComponent(window.location.origin)}`);
    }
  }, []);

  // Handle user interaction to start video on mobile
  const handleUserInteraction = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow && !isPlayingRef.current) {
      // Try to play video via postMessage (YouTube API)
      try {
        const playCommand = JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: ''
        });
        
        // Send to all possible origins
        const origins = ['*', 'https://www.youtube.com', 'https://www.youtube-nocookie.com'];
        origins.forEach(origin => {
          iframe.contentWindow?.postMessage(playCommand, origin);
        });
        
        // Also try alternative format
        const altCommand = JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        });
        origins.forEach(origin => {
          iframe.contentWindow?.postMessage(altCommand, origin);
        });
      } catch (e) {
        // Ignore errors
      }
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    
    // Fade in text and blur after 6 seconds
    const timer = setTimeout(() => {
      setShowText(true);
      setShowBlur(true);
    }, 6000);

    // Listen for YouTube API ready event and messages
    const handleMessage = (event: MessageEvent) => {
      // YouTube sends events when ready
      if (event.data === 'YTFrameAPIReady' || event.data?.event === 'onReady') {
        setTimeout(() => {
          handleUserInteraction();
        }, 500);
      }
      // Also listen for video state changes
      if (event.data?.event === 'onStateChange') {
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
      if (event.origin.includes('youtube.com') || event.origin.includes('youtube-nocookie.com')) {
        // YouTube is ready, try to play
        setTimeout(() => {
          handleUserInteraction();
        }, 500);
      }
    };

    window.addEventListener('message', handleMessage);

    // Force play video after iframe loads
    const handleIframeLoad = () => {
      // Wait for YouTube API to be ready - try multiple times
      [1500, 2500, 3500, 4500].forEach((delay, index) => {
        setTimeout(() => {
          handleUserInteraction();
        }, delay);
      });
    };

    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      // Also check if already loaded
      try {
        if (iframe.contentDocument?.readyState === 'complete') {
          handleIframeLoad();
        }
      } catch (e) {
        // Cross-origin, can't access - that's fine
        handleIframeLoad();
      }
    }

    // Add event listeners for user interaction
    const events = ['touchstart', 'touchend', 'click', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    // Also try to play immediately and repeatedly (aggressive for mobile)
    const playInterval = setInterval(() => {
      handleUserInteraction();
    }, 2000);

    // Clear interval after 20 seconds
    setTimeout(() => {
      clearInterval(playInterval);
    }, 20000);
    
    // Multiple delayed attempts
    [1000, 2000, 3000, 4000, 5000].forEach(delay => {
      setTimeout(() => {
        handleUserInteraction();
      }, delay);
    });

    return () => {
      clearTimeout(timer);
      clearInterval(playInterval);
      window.removeEventListener('message', handleMessage);
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
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
      `}} />
      <section className="relative min-h-[100vh] flex items-end text-white overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            ref={iframeRef}
            className="hero-video-iframe absolute top-1/2 left-1/2 transition-all duration-1000"
            style={{
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              filter: showBlur ? 'blur(2px)' : 'blur(0px)'
            }}
            src={youtubeUrl}
            title="YouTube video background"
            allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Overlay to hide YouTube UI and ensure video plays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-[1] pointer-events-none"></div>
          {/* Invisible overlay to capture clicks and trigger play on mobile - hide once playing */}
          {!videoPlaying && (
            <div 
              className="absolute inset-0 z-[2]"
              onClick={handleUserInteraction}
              onTouchStart={handleUserInteraction}
              aria-hidden="true"
              style={{ pointerEvents: 'auto' }}
            ></div>
          )}
        </div>
      
      {/* Subtle corner accents */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Top corners - minimal lines */}
        <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 border-t-2 border-l-2 border-white/20"></div>
        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 border-t-2 border-r-2 border-white/20"></div>
        {/* Bottom corners - minimal lines */}
        <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 border-b-2 border-l-2 border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 border-b-2 border-r-2 border-white/20"></div>
      </div>
      
      {/* Content - positioned at very bottom with fade-in effect */}
      <motion.div 
        className="relative z-20 w-full text-center pb-12 md:pb-16 lg:pb-20 px-2 md:px-4"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="inline-block mb-6" layout>
          <div className="w-24 h-1 bg-white mx-auto mb-4"></div>
        </motion.div>
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold leading-tight tracking-wide uppercase mb-6 md:mb-8 drop-shadow-2xl px-2"
          layout
        >
          Community Focused<br />Results Driven
        </motion.h2>
        <motion.div 
          className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8"
          layout
        >
          <motion.div className="w-8 md:w-12 h-px bg-white/60" layout></motion.div>
          <motion.div className="w-8 md:w-12 h-px bg-white/60" layout></motion.div>
        </motion.div>
        <motion.p 
          className="text-lg md:text-2xl lg:text-3xl text-white/95 font-light tracking-wide leading-relaxed w-full drop-shadow-lg px-2 md:px-4"
          layout
        >
          Commercial, Residential, and Development<span className="md:hidden"></span><br className="md:hidden" /><span className="hidden md:inline"> </span>Real Estate Across Northwest Arkansas
        </motion.p>
      </motion.div>
    </section>
    </>
  );
}

