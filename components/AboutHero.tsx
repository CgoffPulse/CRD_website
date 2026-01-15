"use client";

import { useEffect, useRef } from "react";

export default function AboutHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 22) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover"
          style={{
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
          }}
        >
          <source
            src="/images/Water Towers to Concert Roof.MP4"
            type="video/mp4"
          />
        </video>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl text-center pt-24 sm:pt-32">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
          About CRD Real Estate & Development
        </h1>
        {/* Divider with red accent */}
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <div className="w-16 sm:w-24 h-1 bg-white relative">
            <div className="absolute inset-0 bg-brand-red-700 opacity-60"></div>
          </div>
          <div className="w-2 h-2 bg-white mx-1.5 sm:mx-2 relative">
            <div className="absolute inset-0 bg-brand-red-700 opacity-70"></div>
          </div>
          <div className="w-16 sm:w-24 h-1 bg-white relative">
            <div className="absolute inset-0 bg-brand-red-700 opacity-60"></div>
          </div>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-white max-w-5xl mx-auto drop-shadow-lg px-2">
          Local expertise. Ownership mindset. Long-term value across Northwest Arkansas.
        </p>
      </div>
    </section>
  );
}
