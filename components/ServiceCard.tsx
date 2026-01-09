import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700/50 hover:border-gray-600 overflow-hidden">
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/0 via-blue-800/0 to-purple-900/0 group-hover:from-blue-900/20 group-hover:via-blue-800/10 group-hover:to-purple-900/20 transition-all duration-500"></div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-700/30 to-transparent transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-light text-white mb-6 uppercase tracking-wider group-hover:text-gray-100 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 group-hover:text-gray-200 mb-8 leading-relaxed text-base transition-colors duration-300">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-all duration-300 font-light text-sm tracking-wider uppercase group-hover:gap-3"
        >
          <span>Learn more</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}

