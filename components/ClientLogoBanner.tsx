"use client";

import { useRef } from "react";

export default function ClientLogoBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Client names with their website URLs (null means no link)
  const clients = [
    { name: "Downtown Rogers", url: "https://www.godowntownrogers.com/" },
    { name: "Bentonville Chamber", url: "https://www.bentonvillechamber.com" },
    { name: "NWA Council", url: "https://www.nwacouncil.org" },
    { name: "Rogers Historical", url: "https://www.rogershistoricalmuseum.org" },
    { name: "Inicio", url: "https://www.iniciobuild.com/" },
    { name: "Springdale Properties", url: null },
    { name: "Fayetteville Group", url: null },
    { name: "Crystal Bridges", url: "https://www.crystalbridges.org" },
    { name: "Walmart Inc.", url: "https://www.walmart.com" },
    { name: "Tyson Foods", url: "https://www.tysonfoods.com" },
    { name: "JB Hunt", url: "https://www.jbhunt.com" },
    { name: "Northwest Arkansas", url: "https://northwestarkansas.org/" },
  ];

  // Duplicate the clients array for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-black">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red-700 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-xs md:text-sm text-gray-500 tracking-widest uppercase mb-3 block [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            Current & Past Clients
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
            Trusted by Leading Organizations
          </h2>
        </div>

        {/* Scrolling Logo Container */}
        <div className="relative w-full">
          {/* Scrolling Content */}
          <div 
            ref={scrollRef}
            className="flex items-center gap-8 md:gap-12 lg:gap-16 animate-scroll py-6"
            style={{
              width: 'max-content',
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center"
              >
                {client.url ? (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 rounded-sm text-gray-400 hover:text-white transition-all duration-300 whitespace-nowrap text-sm md:text-base font-medium tracking-wide hover:bg-white/5 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] group-hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {client.name}
                  </a>
                ) : (
                  <span className="px-4 py-2 text-gray-500 text-sm md:text-base font-medium tracking-wide whitespace-nowrap [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

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
          animation: scroll 45s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

