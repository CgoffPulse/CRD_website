"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface PropertyDetails {
  interior?: {
    heating?: string;
    cooling?: string;
    appliances?: string;
    flooring?: string;
    hasBasement?: string;
    totalStructureArea?: string;
    totalInteriorLivableArea?: string;
  };
  property?: {
    parking?: {
      totalSpaces?: string;
      parkingFeatures?: string;
      coveredSpaces?: string;
    };
    levels?: string;
    stories?: string;
    exteriorFeatures?: string;
    fencing?: string;
  };
  lot?: {
    size?: string;
    features?: string;
  };
  details?: {
    parcelNumber?: string;
    specialConditions?: string;
  };
  construction?: {
    homeType?: string;
    propertySubtype?: string;
    materials?: string;
    foundation?: string;
    roof?: string;
    newConstruction?: string;
    yearBuilt?: string;
  };
  community?: {
    features?: string;
    security?: string;
    subdivision?: string;
  };
  location?: {
    region?: string;
  };
  financial?: {
    pricePerSquareFoot?: string;
    annualTaxAmount?: string;
    dateOnMarket?: string;
  };
}

interface Listing {
  id: string;
  title: string;
  price: string;
  location: string;
  imageSrc: string | null;
  summary?: string;
  description?: string;
  bullets: string[];
  href: string;
  mlsNumber?: string;
  agents?: Array<{ name: string; email?: string; phone?: string }>;
  office?: string;
  officePhone?: string;
  galleryImages?: string[];
  propertyDetails?: PropertyDetails;
}

interface ListingModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

function ListingModal({ listing, isOpen, onClose }: ListingModalProps) {
  const images = listing?.galleryImages || [];

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !listing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border-4 border-black relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner accents with red and navy */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-20"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-black hover:border-navy-700 transition-colors duration-300 z-20"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-black hover:border-navy-700 transition-colors duration-300 z-20"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-20"></div>
        {/* Red and navy accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red-700 opacity-15 z-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-navy-700 opacity-15 z-20"></div>
        
        {/* Header with back button */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black bg-gray-50 relative z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-black font-semibold hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Listings
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="border-b-2 border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {images.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video bg-gray-200"
                  >
                    <Image
                      src={image}
                      alt={`${listing.title} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-3">
                {listing.title}
              </h2>
              <p className="text-4xl md:text-5xl font-bold text-black mb-4">
                {listing.price}
              </p>
              <p className="text-gray-700 text-xl font-medium mb-3">
                {listing.location}
              </p>
              {listing.mlsNumber && (
                <p className="text-sm text-gray-600">MLS#: {listing.mlsNumber}</p>
              )}
            </div>

            {/* Description */}
            {(listing.description || listing.summary) && (
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Description</h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl whitespace-pre-line">
                  {listing.description || listing.summary}
                </p>
              </div>
            )}

            {/* Features */}
            {listing.bullets.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Features</h3>
                <ul className="space-y-2">
                  {listing.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-black font-semibold mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Facts & Features */}
            {listing.propertyDetails && (
              <div className="mb-8 border-t-2 border-gray-200 pt-8">
                <h3 className="text-3xl md:text-4xl font-bold text-black mb-8">Facts & Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Interior */}
                  {listing.propertyDetails.interior && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Interior</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.interior.heating && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Heating</span>
                            <span className="text-black">{listing.propertyDetails.interior.heating}</span>
                          </div>
                        )}
                        {listing.propertyDetails.interior.cooling && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Cooling</span>
                            <span className="text-black">{listing.propertyDetails.interior.cooling}</span>
                          </div>
                        )}
                        {listing.propertyDetails.interior.appliances && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Appliances</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.interior.appliances}</span>
                          </div>
                        )}
                        {listing.propertyDetails.interior.flooring && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Flooring</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.interior.flooring}</span>
                          </div>
                        )}
                        {listing.propertyDetails.interior.hasBasement !== undefined && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Has basement</span>
                            <span className="text-black">{listing.propertyDetails.interior.hasBasement}</span>
                          </div>
                        )}
                        {listing.propertyDetails.interior.totalInteriorLivableArea && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Total interior livable area</span>
                            <span className="text-black">{listing.propertyDetails.interior.totalInteriorLivableArea}</span>
                          </div>
                        )}
                        {listing.propertyDetails.interior.totalStructureArea && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Total structure area</span>
                            <span className="text-black">{listing.propertyDetails.interior.totalStructureArea}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Property */}
                  {listing.propertyDetails.property && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Property</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.property.parking && (
                          <>
                            {listing.propertyDetails.property.parking.totalSpaces && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Total parking spaces</span>
                                <span className="text-black">{listing.propertyDetails.property.parking.totalSpaces}</span>
                              </div>
                            )}
                            {listing.propertyDetails.property.parking.parkingFeatures && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Parking features</span>
                                <span className="text-black">{listing.propertyDetails.property.parking.parkingFeatures}</span>
                              </div>
                            )}
                            {listing.propertyDetails.property.parking.coveredSpaces && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Covered spaces</span>
                                <span className="text-black">{listing.propertyDetails.property.parking.coveredSpaces}</span>
                              </div>
                            )}
                          </>
                        )}
                        {listing.propertyDetails.property.levels && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Levels</span>
                            <span className="text-black">{listing.propertyDetails.property.levels}</span>
                          </div>
                        )}
                        {listing.propertyDetails.property.stories && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Stories</span>
                            <span className="text-black">{listing.propertyDetails.property.stories}</span>
                          </div>
                        )}
                        {listing.propertyDetails.property.exteriorFeatures && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Exterior features</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.property.exteriorFeatures}</span>
                          </div>
                        )}
                        {listing.propertyDetails.property.fencing !== undefined && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Fencing</span>
                            <span className="text-black">{listing.propertyDetails.property.fencing}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Lot */}
                  {listing.propertyDetails.lot && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Lot</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.lot.size && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Size</span>
                            <span className="text-black">{listing.propertyDetails.lot.size}</span>
                          </div>
                        )}
                        {listing.propertyDetails.lot.features && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Features</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.lot.features}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  {listing.propertyDetails.details && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Details</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.details.parcelNumber && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Parcel number</span>
                            <span className="text-black font-mono text-sm">{listing.propertyDetails.details.parcelNumber}</span>
                          </div>
                        )}
                        {listing.propertyDetails.details.specialConditions !== undefined && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Special conditions</span>
                            <span className="text-black">{listing.propertyDetails.details.specialConditions}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Construction */}
                  {listing.propertyDetails.construction && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Construction</h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Type & Style</h5>
                          <div className="space-y-2 ml-4">
                            {listing.propertyDetails.construction.homeType && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Home type</span>
                                <span className="text-black">{listing.propertyDetails.construction.homeType}</span>
                              </div>
                            )}
                            {listing.propertyDetails.construction.propertySubtype && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Property subtype</span>
                                <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.construction.propertySubtype}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Materials</h5>
                          <div className="space-y-2 ml-4">
                            {listing.propertyDetails.construction.materials && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Materials</span>
                                <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.construction.materials}</span>
                              </div>
                            )}
                            {listing.propertyDetails.construction.foundation && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Foundation</span>
                                <span className="text-black">{listing.propertyDetails.construction.foundation}</span>
                              </div>
                            )}
                            {listing.propertyDetails.construction.roof && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Roof</span>
                                <span className="text-black">{listing.propertyDetails.construction.roof}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Condition</h5>
                          <div className="space-y-2 ml-4">
                            {listing.propertyDetails.construction.newConstruction !== undefined && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">New construction</span>
                                <span className="text-black">{listing.propertyDetails.construction.newConstruction}</span>
                              </div>
                            )}
                            {listing.propertyDetails.construction.yearBuilt && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-600 font-medium">Year built</span>
                                <span className="text-black">{listing.propertyDetails.construction.yearBuilt}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Community & HOA */}
                  {listing.propertyDetails.community && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Community & HOA</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.community.features && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Features</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.community.features}</span>
                          </div>
                        )}
                        {listing.propertyDetails.community.security && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Security</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.community.security}</span>
                          </div>
                        )}
                        {listing.propertyDetails.community.subdivision && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Subdivision</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.community.subdivision}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {listing.propertyDetails.location && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Location</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.location.region && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Region</span>
                            <span className="text-black">{listing.propertyDetails.location.region}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Financial & Listing Details */}
                  {listing.propertyDetails.financial && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Financial & Listing Details</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.financial.pricePerSquareFoot && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Price per square foot</span>
                            <span className="text-black font-semibold">{listing.propertyDetails.financial.pricePerSquareFoot}</span>
                          </div>
                        )}
                        {listing.propertyDetails.financial.annualTaxAmount && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Annual tax amount</span>
                            <span className="text-black">{listing.propertyDetails.financial.annualTaxAmount}</span>
                          </div>
                        )}
                        {listing.propertyDetails.financial.dateOnMarket && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Date on market</span>
                            <span className="text-black">{listing.propertyDetails.financial.dateOnMarket}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Information */}
            {(listing.agents || listing.office) && (
              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Contact</h3>
                {listing.office && (
                  <p className="text-gray-700 font-semibold mb-2">
                    {listing.office}
                  </p>
                )}
                {listing.officePhone && (
                  <p className="text-gray-700 mb-4">{listing.officePhone}</p>
                )}
                {listing.agents && listing.agents.length > 0 && (
                  <div className="space-y-2">
                    {listing.agents.map((agent, idx) => (
                      <div key={idx} className="text-gray-700">
                        <p className="font-semibold">{agent.name}</p>
                        {agent.email && (
                          <a
                            href={`mailto:${agent.email}`}
                            className="text-gray-600 hover:text-black underline"
                          >
                            {agent.email}
                          </a>
                        )}
                        {agent.phone && (
                          <a
                            href={`tel:${agent.phone}`}
                            className="text-gray-600 hover:text-black"
                          >
                            {agent.phone}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResidentialListings() {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const listings: Listing[] = [
    {
      id: "1326751",
      title: "4-Plex Multi-Family Investment – Rogers",
      price: "$625,000",
      location: "1225 W Sunset Dr #4, Rogers, AR 72756",
      imageSrc: "/images/1223-W-Sunset-Dr-4.webp",
      description: "Multi-family Investment in Rogers. This well maintained 4-plex is a prime Value Add asset. Renting below current market rates, this 4-plex is able to provide stabilized cashflow in a great location of Rogers. With a strategic location that is across from Northwest Park and walking distance to Lingle Middle School, this 4-plex is well a positioned investment. Onsite parking for tenants. This is part of a small multi-family investment portfolio and can be sold in conjunction with MLS 1326750. More pictures coming soon.",
      bullets: [
        "3,144 sq ft",
        "Multi-family 4-plex investment property",
        "Prime location across from Northwest Park",
        "Walking distance to Lingle Middle School",
        "Onsite parking for tenants",
        "Currently renting below market rates - Value Add opportunity",
        "MLS#: 1326751",
        "Can be sold in conjunction with MLS 1326750",
      ],
      href: "/residential/listings/1326751",
      mlsNumber: "1326751",
      agents: [
        { name: "Hannah Cicioni", email: "jgill@crdred.com" },
        { name: "Rhonda Moore", phone: "479-530-0185" },
      ],
      office: "CRD Real Estate & Development",
      officePhone: "479-445-4501",
      galleryImages: [
        "/images/1223-W-Sunset-Dr-4.webp",
        "/images/1225-w-sunset-dr-4-back.webp",
      ],
      propertyDetails: {
        interior: {
          heating: "Central",
          cooling: "Central Air",
          appliances: "Included: Electric Water Heater",
          flooring: "Laminate, Simulated Wood",
          hasBasement: "No",
          totalStructureArea: "3,144",
          totalInteriorLivableArea: "3,144 sqft",
        },
        property: {
          parking: {
            totalSpaces: "8",
            parkingFeatures: "On Street",
            coveredSpaces: "8",
          },
          levels: "One",
          stories: "1",
          exteriorFeatures: "Concrete Driveway",
          fencing: "None",
        },
        lot: {
          size: "0.39 Acres",
          features: "City Lot, Level, Near Park",
        },
        details: {
          parcelNumber: "0208139000",
          specialConditions: "None",
        },
        construction: {
          homeType: "MultiFamily",
          propertySubtype: "Quadruplex, Multi Family",
          materials: "Brick, Vinyl Siding",
          foundation: "Block",
          roof: "Metal",
          newConstruction: "No",
          yearBuilt: "1981",
        },
        community: {
          features: "Near Schools, Park",
          security: "Smoke Detector(s)",
          subdivision: "Sunset Manor Ph 2-Rogers",
        },
        location: {
          region: "Rogers",
        },
        financial: {
          pricePerSquareFoot: "$199/sqft",
          annualTaxAmount: "$1,922",
          dateOnMarket: "10/28/2025",
        },
      },
    },
    {
      id: "example-property-1",
      title: "Example Property – Bentonville",
      price: "$XXX,XXX",
      location: "Bentonville, AR",
      imageSrc: null,
      summary: "A well-located residential property offering strong livability and long-term value in one of Northwest Arkansas's most desirable areas.",
      bullets: [
        "X bedrooms / X bathrooms",
        "Approx. XXXX sq ft",
        "Residential neighborhood",
        "Convenient access to schools, amenities, and major corridors",
      ],
      href: "/residential/listings/example-property-1",
    },
    {
      id: "example-property-2",
      title: "Example Property – Rogers",
      price: "$XXX,XXX",
      location: "Rogers, AR",
      imageSrc: null,
      summary: "A thoughtfully positioned home offering comfort, functionality, and proximity to key destinations throughout the region.",
      bullets: [
        "X bedrooms / X bathrooms",
        "Approx. XXXX sq ft",
        "Established neighborhood",
        "Easy access to Downtown Rogers",
      ],
      href: "/residential/listings/example-property-2",
    },
    {
      id: "example-property-3",
      title: "Example Property – Fayetteville",
      price: "$XXX,XXX",
      location: "Fayetteville, AR",
      imageSrc: null,
      summary: "A residential opportunity well-suited for buyers seeking location, character, and long-term value.",
      bullets: [
        "X bedrooms / X bathrooms",
        "Approx. XXXX sq ft",
        "Residential zoning",
        "Close to dining, shopping, and local amenities",
      ],
      href: "/residential/listings/example-property-3",
    },
  ];

  const handleListingClick = (listing: Listing, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedListing(listing);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <button
            key={listing.id}
            onClick={(e) => handleListingClick(listing, e)}
            className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden text-left relative"
          >
            {/* Corner accents with red and navy */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-brand-red-700 transition-all duration-300 z-10"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-20 group-hover:opacity-100 group-hover:border-navy-700 transition-all duration-300 z-10"></div>
            {/* Red and navy accent lines on hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
            
            {/* Cover Image */}
            <div className="w-full h-64 bg-gray-200 relative overflow-hidden border-b-2 border-black">
              {listing.imageSrc ? (
                <Image
                  src={listing.imageSrc}
                  alt={listing.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  {listing.title}
                </h3>
                <div className="w-12 h-1 bg-black mb-4 group-hover:w-20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-red-700 to-navy-700 opacity-40"></div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-black mb-4">
                  {listing.price}
                </p>
                <p className="text-gray-600 text-base md:text-lg font-medium border-l-4 border-black pl-4">
                  {listing.location}
                </p>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                {listing.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-base md:text-lg text-gray-700"
                  >
                    <span className="text-black font-semibold">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <span className="text-black font-semibold text-sm uppercase tracking-wide inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Listing
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <ListingModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
