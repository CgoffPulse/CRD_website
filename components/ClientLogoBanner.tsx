"use client";

import { useEffect, useRef } from "react";

export default function ClientLogoBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Placeholder client names - replace with actual client logos
  const clients = [
    "Downtown Rogers",
    "Bentonville Chamber",
    "NWA Council",
    "Rogers Historical",
    "Inicio Development",
    "Springdale Properties",
    "Fayetteville Group",
    "Crystal Bridges",
    "Walmart Inc.",
    "Tyson Foods",
    "JB Hunt",
    "Northwest Arkansas",
  ];

  // Duplicate the clients array for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Wooden plank background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ranch-brown-600 via-ranch-brown-700 to-ranch-brown-800"
           style={{
             boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
           }}></div>
      
      {/* Subtle wood grain texture */}
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)'
           }}></div>
      
      {/* Top and bottom edge detail */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/40 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-sm md:text-base text-ranch-cream-100 tracking-wider font-semibold uppercase" 
             style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Some of our current and past clients include
          </p>
        </div>

        {/* Scrolling Logo Container */}
        <div className="relative w-full py-4">
       
 

          {/* Scrolling Content */}
          <div 
            ref={scrollRef}
            className="flex gap-12 animate-scroll"
            style={{
              width: 'max-content',
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[200px] h-20 px-8"
              >
                {/* Placeholder for client logo - replace with actual logos */}
                <div className="text-center">
                  <div className="text-ranch-cream-100 hover:text-white transition-colors duration-300 font-serif font-semibold tracking-wide text-base md:text-lg whitespace-nowrap"
                       style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    {client}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements - nails/screws */}
        <div className="absolute top-4 left-8 w-2 h-2 rounded-full bg-ranch-brown-900 border border-ranch-brown-800" 
             style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}></div>
        <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-ranch-brown-900 border border-ranch-brown-800"
             style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}></div>
        <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-ranch-brown-900 border border-ranch-brown-800"
             style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}></div>
        <div className="absolute bottom-4 right-8 w-2 h-2 rounded-full bg-ranch-brown-900 border border-ranch-brown-800"
             style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}></div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

