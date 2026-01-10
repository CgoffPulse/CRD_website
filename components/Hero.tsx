"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Fade in text after 5 seconds
    const timer = setTimeout(() => {
      setShowText(true);
    }, 5000);

    return () => clearTimeout(timer);
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
      `}} />
      <section className="relative min-h-[100vh] flex items-end text-white overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="hero-video-iframe absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
            src="https://www.youtube.com/embed/FRVwWUwxZHs?autoplay=1&mute=1&loop=1&playlist=FRVwWUwxZHs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080"
            title="YouTube video background"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          {/* Reduced overlay for better video visibility, stronger gradient only at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
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
      <div className={`relative z-20 container mx-auto px-6 text-center pb-12 md:pb-16 lg:pb-20 w-full transition-opacity duration-1000 ${
        showText ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="inline-block mb-6">
          <div className="w-24 h-1 bg-white mx-auto mb-4"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-semibold leading-tight tracking-wide uppercase mb-6 sm:mb-8 drop-shadow-2xl px-2">
          Community Focused<br />Results Driven
        </h2>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-white/60"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-8 sm:w-12 h-px bg-white/60"></div>
        </div>
        <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/95 font-light tracking-wide leading-relaxed max-w-6xl mx-auto drop-shadow-lg px-2">
          Commercial, Residential, and Development Real Estate Across Northwest Arkansas
        </p>
      </div>
    </section>
    </>
  );
}

