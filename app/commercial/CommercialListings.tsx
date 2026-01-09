"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface PropertyDetails {
  lot?: {
    size?: string;
    features?: string;
  };
  property?: {
    fencing?: string;
    exteriorFeatures?: string;
  };
  details?: {
    parcelNumber?: string;
    specialConditions?: string;
  };
  construction?: {
    homeType?: string;
    propertySubtype?: string;
  };
  location?: {
    region?: string;
  };
  financial?: {
    annualTaxAmount?: string;
    dateOnMarket?: string;
  };
}

interface Listing {
  id: string;
  title: string;
  price?: string;
  leaseRate?: string;
  location: string;
  imageSrc: string | null;
  summary?: string;
  description?: string;
  bullets: string[];
  href: string;
  mlsNumber?: string;
  galleryImages?: string[];
  propertyDetails?: PropertyDetails;
  isLease?: boolean;
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
        {/* Corner accents with red */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-20"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-20"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-20"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-20"></div>
        {/* Red accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red-700 opacity-15 z-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red-700 opacity-15 z-20"></div>
        
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
              {listing.isLease ? (
                <p className="text-4xl md:text-5xl font-bold text-black mb-4">
                  {listing.leaseRate}
                </p>
              ) : (
                <p className="text-4xl md:text-5xl font-bold text-black mb-4">
                  {listing.price}
                </p>
              )}
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

                  {/* Property */}
                  {listing.propertyDetails.property && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-black mb-6">Property</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.property.fencing && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Fencing</span>
                            <span className="text-black">{listing.propertyDetails.property.fencing}</span>
                          </div>
                        )}
                        {listing.propertyDetails.property.exteriorFeatures && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Exterior features</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.property.exteriorFeatures}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommercialListingsProps {
  buyListings: Listing[];
  leaseListings: Listing[];
}

export default function CommercialListings({ buyListings, leaseListings }: CommercialListingsProps) {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Shared listing card component for Buy and Lease listings
  const ListingCard = ({ listing, isLease = false }: { listing: Listing; isLease?: boolean }) => (
    <button
      onClick={(e) => handleListingClick({ ...listing, isLease }, e)}
      className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden relative text-left"
    >
      {/* Subtle red accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
      {/* Cover Image */}
      <div className="w-full h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
        {listing.imageSrc ? (
          <Image
            src={listing.imageSrc}
            alt={listing.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
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
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
            {listing.title}
          </h3>
          {isLease ? (
            <p className="text-2xl md:text-3xl font-bold text-black mb-3">
              {listing.leaseRate}
            </p>
          ) : (
            <p className="text-2xl md:text-3xl font-bold text-black mb-3">
              {listing.price}
            </p>
          )}
          <p className="text-gray-600 text-sm md:text-base font-medium">
            {listing.location}
          </p>
        </div>
        <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto flex-grow">
          {listing.bullets.map((bullet: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
              <span className="text-black font-semibold">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <span className="text-black font-semibold text-sm uppercase tracking-wide inline-flex items-center gap-2 group-hover:gap-3 transition-all">
            {isLease ? "View Space" : "View Property"}
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <>
      {/* Buy Listings */}
      <section id="buy-listings" className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Buy Commercial Property
            </h2>
            {/* Divider with red accent */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
              </div>
              <div className="w-2 h-2 bg-black mx-2 relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
              </div>
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-600 uppercase tracking-wider">
              Explore available commercial properties for purchase across Northwest Arkansas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buyListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} isLease={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Lease Listings */}
      <section id="lease-listings" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Lease Commercial Space
            </h2>
            {/* Divider with red accent */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
              </div>
              <div className="w-2 h-2 bg-black mx-2 relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-40"></div>
              </div>
              <div className="w-24 h-1 bg-black relative">
                <div className="absolute inset-0 bg-brand-red-700 opacity-30"></div>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-600 uppercase tracking-wider">
              Available commercial spaces for lease throughout Northwest Arkansas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaseListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} isLease={true} />
            ))}
          </div>
        </div>
      </section>

      <ListingModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
