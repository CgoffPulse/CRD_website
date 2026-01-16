import AnimatedUnderline from "@/components/AnimatedUnderline";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Commercial",
    description:
      "Providing comprehensive commercial real estate services, including acquisitions, dispositions, leasing, and development. Delivering strategic solutions that maximize value and support long-term business objectives.",
    href: "/commercial",
  },
  {
    title: "Residential",
    description:
      "Specializing in residential real estate acquisitions, sales, and investment opportunities. Focused on delivering strategic guidance, market expertise, and premium service to achieve optimal results for clients.",
    href: "/residential",
  },
  {
    title: "Development",
    description:
      "Providing end-to-end real estate development services, including site selection, entitlement, design coordination, and project management. Focused on delivering strategic, cost-effective, and sustainable developments that maximize long-term value.",
    href: "/services",
  },
];

export default function ServiceGrid() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-purple-900/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-light text-3xl text-white uppercase tracking-wider md:text-4xl lg:text-5xl">
            WORK with CRD
          </h2>
          <div className="mx-auto">
            <AnimatedUnderline width="w-24" color="bg-gray-500" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              className="transform transition-all duration-300 hover:scale-105"
              key={service.title}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ServiceCard
                description={service.description}
                href={service.href}
                title={service.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
