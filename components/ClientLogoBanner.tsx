"use client";

import { useRef } from "react";

export default function ClientLogoBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Client names with their website URLs (null means no link)
  const clients = [
    { name: "Downtown Rogers", url: "https://www.godowntownrogers.com/" },
    { name: "Bentonville Chamber", url: "https://www.bentonvillechamber.com" },
    { name: "NWA Council", url: "https://www.nwacouncil.org" },
    {
      name: "Rogers Historical",
      url: "https://www.rogershistoricalmuseum.org",
    },
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
    <section className="relative overflow-hidden bg-black py-16 md:py-20">
      {/* Decorative top accent line */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-brand-red-700 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-3 block text-gray-500 text-xs uppercase tracking-widest [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] md:text-sm">
            Current & Past Clients
          </span>
          <h2 className="font-bold font-display text-white text-xl tracking-wide [text-shadow:0_2px_4px_rgba(0,0,0,0.4)] md:text-2xl lg:text-3xl">
            Trusted by Leading Organizations
          </h2>
        </div>

        {/* Scrolling Logo Container */}
        <div className="relative w-full">
          {/* Scrolling Content */}
          <div
            className="flex animate-scroll items-center gap-8 py-6 md:gap-12 lg:gap-16"
            ref={scrollRef}
            style={{
              width: "max-content",
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div className="flex items-center justify-center" key={index}>
                {client.url ? (
                  <a
                    className="group flex items-center gap-2 whitespace-nowrap rounded-sm px-4 py-2 font-medium text-gray-400 text-sm tracking-wide transition-all duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] hover:bg-white/5 hover:text-white md:text-base group-hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"
                    href={client.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {client.name}
                  </a>
                ) : (
                  <span className="whitespace-nowrap px-4 py-2 font-medium text-gray-500 text-sm tracking-wide [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] md:text-base">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom accent line */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

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
