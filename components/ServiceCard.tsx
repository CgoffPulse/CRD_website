import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden border border-gray-700/50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 shadow-xl transition-all duration-500 hover:border-gray-600 hover:shadow-2xl md:p-10">
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/0 via-blue-800/0 to-purple-900/0 transition-all duration-500 group-hover:from-blue-900/20 group-hover:via-blue-800/10 group-hover:to-purple-900/20" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 transform bg-gradient-to-br from-gray-700/30 to-transparent transition-transform duration-500 group-hover:translate-x-8 group-hover:-translate-y-8" />

      <div className="relative z-10">
        <h3 className="mb-6 font-light text-2xl text-white uppercase tracking-wider transition-colors duration-300 group-hover:text-gray-100 md:text-3xl">
          {title}
        </h3>
        <p className="mb-8 text-base text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
          {description}
        </p>
        <Link
          className="inline-flex items-center gap-2 font-light text-sm text-white uppercase tracking-wider transition-all duration-300 hover:text-gray-300 group-hover:gap-3"
          href={href}
        >
          <span>Learn more</span>
          <svg
            className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 8l4 4m0 0l-4 4m4-4H3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </Link>
      </div>

      {/* Bottom gradient line with subtle red */}
      <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* Subtle red accent line on hover */}
      <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
    </div>
  );
}
