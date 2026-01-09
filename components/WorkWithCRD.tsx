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
    <div className="flex flex-col h-full bg-white border border-gray-200 p-8">
      {/* Service Title */}
      <h3 className="text-2xl font-semibold text-black mb-4">
        {title}
      </h3>

      {/* Paragraph */}
      <p className="text-gray-700 leading-relaxed mb-6 text-base">
        {description}
      </p>

      {/* Bullet Points */}
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="mb-4">
        <Link
          href={href}
          className="btn-primary inline-flex items-center justify-center w-full px-6 py-3 rounded-none text-white font-semibold uppercase tracking-wider transition-all duration-200 group/cta text-sm"
        >
          <span>Explore {title}</span>
          <svg 
            className="w-4 h-4 ml-2 transform group-hover/cta:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Muted Line */}
      <p className="text-gray-500 text-xs italic mt-auto">
        {mutedLine}
      </p>
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
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Eyebrow Label */}
        <div className="text-center mb-4">
          <span className="text-gray-600 text-xs font-semibold uppercase tracking-widest">
            OUR SERVICES
          </span>
        </div>

        {/* Section Headline */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            Work with CRD
          </h2>
        </div>

        {/* Subheadline */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-lg text-gray-700">
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
