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
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 uppercase tracking-wider">
            WORK with CRD
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto relative">
            <div className="absolute inset-0 bg-brand-red-700 opacity-20"></div>
          </div>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                href={service.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

