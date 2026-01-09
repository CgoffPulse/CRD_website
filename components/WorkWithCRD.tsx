import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  href: string;
  mutedLine: string;
}

function ServiceCard({ title, description, features, href, mutedLine }: ServiceCardProps) {
  return (
    <div className="group flex flex-col h-full bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 relative overflow-hidden">
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      
      {/* Corner accents with subtle red */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300"></div>
      {/* Subtle red accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {/* Service Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-gray-800 transition-colors duration-300">
          {title}
        </h3>

        {/* Divider with red accent for text splitter */}
        <div className="w-16 h-1 bg-black mb-6 group-hover:w-24 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-red-700 opacity-50"></div>
        </div>

        {/* Paragraph */}
        <p className="text-gray-700 leading-relaxed mb-8 text-base md:text-lg">
          {description}
        </p>

        {/* Bullet Points */}
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 group/item">
              <svg className="w-6 h-6 text-black flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 text-base md:text-lg leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="mb-6">
          <Link
            href={href}
            className="btn-primary inline-flex items-center justify-center w-full px-6 py-4 rounded-none text-white font-semibold uppercase tracking-wider transition-all duration-300 group/cta text-base hover:scale-[1.02]"
          >
            <span>Explore {title}</span>
            <svg 
              className="w-5 h-5 ml-2 transform group-hover/cta:translate-x-2 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Muted Line */}
        <p className="text-gray-500 text-sm italic mt-auto border-t border-gray-200 pt-4">
          {mutedLine}
        </p>
      </div>
    </div>
  );
}

export default function WorkWithCRD() {
  const services = [
    {
      title: "Commercial",
      description: "CRD provides full-service commercial real estate guidance across Northwest Arkansas, supporting acquisitions, dispositions, leasing, and investment strategy. Our team brings ownership-level insight to help clients execute efficient transactions and drive long-term asset performance.",
      features: [
        "Acquisitions & Dispositions",
        "Leasing & Property Strategy",
        "Investment Analysis",
        "Development & Construction Advisory",
        "Market Positioning"
      ],
      href: "/commercial",
      mutedLine: "For investors, owners, tenants, and operators."
    },
    {
      title: "Residential",
      description: "CRD offers residential real estate representation grounded in deep local knowledge and genuine client advocacy. We guide buyers, sellers, and investors with clear strategy, strong negotiation, and insight rooted in the Northwest Arkansas market.",
      features: [
        "Home Buying & Selling",
        "Relocation Services",
        "Lakefront & Acreage Properties",
        "Investment Homes",
        "Market Guidance"
      ],
      href: "/residential",
      mutedLine: "For buyers, sellers, relocations, and second homes."
    },
    {
      title: "Development",
      description: "CRD supports real estate development projects from site selection through final delivery. Our team helps clients plan, entitle, and execute strategic developments that create long-term value for both investors and communities.",
      features: [
        "Site Selection & Feasibility",
        "Entitlement & Permitting",
        "Design Coordination",
        "Project Oversight",
        "Historic District Expertise"
      ],
      href: "/development",
      mutedLine: "For landowners and developers planning what's next."
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, black 10px, black 11px)'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Eyebrow Label */}
        <div className="text-center mb-6">
          <span className="inline-block text-gray-600 text-xs md:text-sm font-semibold uppercase tracking-widest border-b-2 border-black pb-2">
            OUR SERVICES
          </span>
        </div>

        {/* Section Headline */}
        <div className="text-center mb-6">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black">
            Work with CRD
          </h2>
        </div>

        {/* Decorative divider with subtle red */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-1 bg-black relative">
            <div className="absolute inset-0 bg-brand-red-700 opacity-20"></div>
          </div>
          <div className="w-2 h-2 bg-black mx-2 relative">
            <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
          </div>
          <div className="w-24 h-1 bg-black relative">
            <div className="absolute inset-0 bg-brand-red-700 opacity-20"></div>
          </div>
        </div>

        {/* Subheadline */}
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Three distinct specialties. One team. Ownership-level expertise across Northwest Arkansas.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              features={service.features}
              href={service.href}
              mutedLine={service.mutedLine}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
