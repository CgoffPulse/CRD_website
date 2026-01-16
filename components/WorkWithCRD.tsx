import Link from "next/link";
import AnimatedUnderline from "@/components/AnimatedUnderline";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  href: string;
  mutedLine: string;
}

function ServiceCard({
  title,
  description,
  features,
  href,
  mutedLine,
}: ServiceCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden border-2 border-black bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl md:p-10">
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-5" />

      {/* Corner accents with subtle red */}
      <div className="absolute top-0 left-0 h-4 w-4 border-black border-t-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
      <div className="absolute top-0 right-0 h-4 w-4 border-black border-t-2 border-r-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-black border-b-2 border-l-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
      <div className="absolute right-0 bottom-0 h-4 w-4 border-black border-r-2 border-b-2 opacity-20 transition-all duration-300 group-hover:border-brand-red-700 group-hover:opacity-100" />
      {/* Subtle red accent line on hover */}
      <div className="absolute top-0 right-0 left-0 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Service Title */}
        <h3 className="mb-6 font-bold text-2xl text-black transition-colors duration-300 group-hover:text-gray-800 md:text-3xl">
          {title}
        </h3>

        {/* Animated underline */}
        <div className="mb-6">
          <AnimatedUnderline width="w-16" delay={100} />
        </div>

        {/* Paragraph */}
        <p className="mb-8 text-base text-gray-700 leading-relaxed md:text-lg">
          {description}
        </p>

        {/* Bullet Points */}
        <ul className="mb-8 flex-grow space-y-4">
          {features.map((feature, idx) => (
            <li className="group/item flex items-start gap-3" key={idx}>
              <svg
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-black transition-transform duration-200 group-hover/item:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="text-base text-gray-700 leading-relaxed md:text-lg">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="mt-auto mb-6">
          <Link
            className="btn-primary group/cta inline-flex w-full items-center justify-center rounded-none px-6 py-4 font-semibold text-base text-white uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
            href={href}
          >
            <span>Explore {title}</span>
            <svg
              className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover/cta:translate-x-2"
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

        {/* Muted Line */}
        <p className="border-gray-200 border-t pt-4 text-gray-500 text-sm italic">
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
      description:
        "CRD provides full-service commercial real estate guidance across Northwest Arkansas, supporting acquisitions, dispositions, leasing, and investment strategy. Our team brings ownership-level insight to help clients execute efficient transactions and drive long-term asset performance.",
      features: [
        "Acquisitions & Dispositions",
        "Leasing & Property Strategy",
        "Investment Analysis",
        "Development & Construction Advisory",
        "Market Positioning",
      ],
      href: "/commercial",
      mutedLine: "For investors, owners, tenants, and operators.",
    },
    {
      title: "Residential",
      description:
        "CRD offers residential real estate representation grounded in deep local knowledge and genuine client advocacy. We guide buyers, sellers, and investors with clear strategy, strong negotiation, and insight rooted in the Northwest Arkansas market.",
      features: [
        "Home Buying & Selling",
        "Relocation Services",
        "Lakefront & Acreage Properties",
        "Investment Homes",
        "Market Guidance",
      ],
      href: "/residential",
      mutedLine: "For buyers, sellers, relocations, and second homes.",
    },
    {
      title: "Development",
      description:
        "CRD supports real estate development projects from site selection through final delivery. Our team helps clients plan, entitle, and execute strategic developments that create long-term value for both investors and communities.",
      features: [
        "Site Selection & Feasibility",
        "Entitlement & Permitting",
        "Design Coordination",
        "Project Oversight",
        "Historic District Expertise",
      ],
      href: "/development",
      mutedLine: "For landowners and developers planning what's next.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, black 10px, black 11px)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Eyebrow Label */}
        <div className="mb-6 text-center">
          <span className="inline-block border-black border-b-2 pb-2 font-semibold text-gray-600 text-xs uppercase tracking-widest md:text-sm">
            OUR SERVICES
          </span>
        </div>

        {/* Section Headline */}
        <div className="mb-6 text-center">
          <h2 className="font-bold font-display text-5xl text-black md:text-6xl lg:text-7xl">
            Work with CRD
          </h2>
        </div>

        {/* Animated underline */}
        <div className="mb-8">
          <AnimatedUnderline width="w-52" />
        </div>

        {/* Subheadline */}
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <p className="text-gray-700 text-xl leading-relaxed md:text-2xl">
            Three distinct specialties. One team. Ownership-level expertise
            across Northwest Arkansas.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, _index) => (
            <div
              className={
                service.title === "Development"
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              }
              key={service.title}
            >
              <ServiceCard
                description={service.description}
                features={service.features}
                href={service.href}
                mutedLine={service.mutedLine}
                title={service.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
