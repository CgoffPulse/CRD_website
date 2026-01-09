export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-end text-white overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
          style={{
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
          src="https://www.youtube.com/embed/FRVwWUwxZHs?autoplay=1&mute=1&loop=1&playlist=FRVwWUwxZHs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080"
          title="YouTube video background"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        {/* Subtle overlay only at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
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
      
      {/* Content - positioned at bottom */}
      <div className="relative z-20 container mx-auto px-6 text-center pb-16 md:pb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight tracking-wide uppercase mb-4">
          Community Focused<br />Results Driven
        </h2>
        <p className="text-lg md:text-xl text-white/95 font-light tracking-wide">
          Commercial, Residential, and Development Real Estate Across Northwest Arkansas
        </p>
      </div>
    </section>
  );
}

