"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { CommercialListing } from "@/app/admin/types/listings";

interface ListingModalProps {
  listing: CommercialListing | null;
  isOpen: boolean;
  onClose: () => void;
}

function ListingModal({ listing, isOpen, onClose }: ListingModalProps) {
  const images = listing?.galleryImages || [];
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (showPdfViewer) {
            setShowPdfViewer(false);
          } else {
            onClose();
          }
        }
      };
      const handleArrowKeys = (e: KeyboardEvent) => {
        if (images.length === 0) {
          return;
        }
        if (e.key === "ArrowLeft") {
          setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else if (e.key === "ArrowRight") {
          setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
      };
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleArrowKeys);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleArrowKeys);
      };
    }
  }, [isOpen, onClose, showPdfViewer, images.length]);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  const goToPrevious = () => {
    if (images.length === 0) {
      return;
    }
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (images.length === 0) {
      return;
    }
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !listing || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border-4 border-black relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner accents with red */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-10"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-10"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-10"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black hover:border-brand-red-700 transition-colors duration-300 z-10"></div>
        {/* Red accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red-700 opacity-15 z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red-700 opacity-15 z-10"></div>
        
        {/* Header with back button */}
        <div className="flex items-center justify-between p-3 sm:p-6 border-b-2 sm:border-b-4 border-black bg-gray-50 relative z-10 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1 sm:gap-2 text-black font-semibold hover:text-gray-700 transition-colors cursor-pointer text-sm sm:text-base min-h-[44px]"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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
            <span className="hidden sm:inline">Back to Listings</span>
            <span className="sm:hidden">Back</span>
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
        <div className="overflow-y-auto flex-1 min-h-0">
          {/* Image Carousel */}
          {images.length > 0 && (
            <div className="relative border-b-2 border-gray-200 bg-black">
              <div className="relative aspect-video w-full overflow-hidden">
                {images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${listing.title} - Image ${idx + 1}`}
                      fill
                      className="object-contain"
                      priority={idx === currentImageIndex}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
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
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-200 min-h-[8px] min-w-[8px] cursor-pointer ${
                        idx === currentImageIndex
                          ? "bg-white w-6 sm:w-8"
                          : "bg-white/50 w-2 sm:w-2.5 hover:bg-white/75"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 z-20 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black mb-2 sm:mb-3">
                {listing.title}
              </h2>
              {listing.isLease ? (
                <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
                  {listing.leaseRate || 'Rate available upon request'}
                </p>
              ) : (
                <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
                  {listing.price || 'Price available upon request'}
                </p>
              )}
              <p className="text-gray-700 text-base sm:text-lg md:text-xl font-medium mb-2 sm:mb-3">
                {listing.location}
              </p>
              {listing.mlsNumber && (
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">MLS#: {listing.mlsNumber}</p>
              )}
              {listing.pdfFlyer && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPdfViewer(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-3 sm:py-2 bg-black text-white hover:bg-brand-red-700 transition-colors duration-300 font-semibold text-xs sm:text-sm min-h-[44px]"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  View Flyer PDF
                </button>
              )}
            </div>

            {/* Description */}
            {listing.description && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">Description</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-xl whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Features */}
            {listing.bullets.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">Features</h3>
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
            {listing.propertyDetails && Object.keys(listing.propertyDetails).length > 0 && (
              <div className="mb-6 sm:mb-8 border-t-2 border-gray-200 pt-6 sm:pt-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8">Facts & Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Lot */}
                  {listing.propertyDetails?.lot && (
                    <div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6">Lot</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.lot?.size && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Size</span>
                            <span className="text-black">{listing.propertyDetails.lot.size}</span>
                          </div>
                        )}
                        {listing.propertyDetails.lot?.features && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Features</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.lot.features}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Property */}
                  {listing.propertyDetails?.property && (
                    <div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6">Property</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.property?.fencing && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Fencing</span>
                            <span className="text-black">{listing.propertyDetails.property.fencing}</span>
                          </div>
                        )}
                        {listing.propertyDetails.property?.exteriorFeatures && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Exterior features</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.property.exteriorFeatures}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  {listing.propertyDetails?.details && (
                    <div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6">Details</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.details?.parcelNumber && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Parcel number</span>
                            <span className="text-black font-mono text-sm">{listing.propertyDetails.details.parcelNumber}</span>
                          </div>
                        )}
                        {listing.propertyDetails.details?.subdivision && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Subdivision</span>
                            <span className="text-black">{listing.propertyDetails.details.subdivision}</span>
                          </div>
                        )}
                        {listing.propertyDetails.details?.specialConditions !== undefined && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Special conditions</span>
                            <span className="text-black">{listing.propertyDetails.details.specialConditions}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Construction */}
                  {listing.propertyDetails?.construction && (
                    <div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6">Construction</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.construction?.homeType && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Home type</span>
                            <span className="text-black">{listing.propertyDetails.construction.homeType}</span>
                          </div>
                        )}
                        {listing.propertyDetails.construction?.propertySubtype && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Property subtype</span>
                            <span className="text-black text-right max-w-[60%]">{listing.propertyDetails.construction.propertySubtype}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {listing.propertyDetails?.location && (
                    <div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6">Location</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.location?.region && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Region</span>
                            <span className="text-black">{listing.propertyDetails.location.region}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Financial & Listing Details */}
                  {listing.propertyDetails?.financial && (
                    <div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6">Financial & Listing Details</h4>
                      <div className="space-y-3">
                        {listing.propertyDetails.financial?.annualTaxAmount && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">Annual tax amount</span>
                            <span className="text-black">{listing.propertyDetails.financial.annualTaxAmount}</span>
                          </div>
                        )}
                        {listing.propertyDetails.financial?.dateOnMarket && (
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

            {/* Contact Button */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-gray-200">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 sm:py-4 rounded-none text-base sm:text-lg font-semibold min-h-[44px]"
              >
                Reach Out About This Listing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPdfViewer && listing.pdfFlyer && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setShowPdfViewer(false)}
        >
          <div
            className="bg-white shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col border-2 sm:border-4 border-black relative m-2 sm:m-0 animate-[fadeInScale_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b-2 sm:border-b-4 border-black bg-gray-50 flex-shrink-0">
              <h3 className="text-base sm:text-xl font-bold text-black">Property Flyer</h3>
              <button
                onClick={() => setShowPdfViewer(false)}
                className="text-gray-500 hover:text-black transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close PDF"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${encodeURI(listing.pdfFlyer)}#toolbar=1`}
                className="w-full h-full min-h-[60vh] sm:min-h-[80vh]"
                title="Property Flyer PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}

interface CommercialListingsProps {
  buyListings: CommercialListing[];
  leaseListings: CommercialListing[];
}

export default function CommercialListings({ buyListings, leaseListings }: CommercialListingsProps) {
  const [selectedListing, setSelectedListing] = useState<CommercialListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  const handleListingClick = (listing: CommercialListing, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedListing(listing);
    setIsModalOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  // Shared listing card component for Buy and Lease listings
  const ListingCard = ({ listing, isLease = false }: { listing: CommercialListing; isLease?: boolean }) => (
    <button
      onClick={(e) => handleListingClick({ ...listing, isLease }, e)}
      className="group bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden relative text-left cursor-pointer"
    >
      {/* Subtle red accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
      {/* Cover Image */}
      <div className="w-full h-48 sm:h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
        {listing.imageSrc ? (
          <Image
            src={listing.imageSrc}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
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
      <div className="p-4 sm:p-6 flex flex-col grow">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3">
            {listing.title}
          </h3>
          {isLease ? (
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 sm:mb-3">
              {listing.leaseRate}
            </p>
          ) : (
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 sm:mb-3">
              {listing.price}
            </p>
          )}
          <p className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">
            {listing.location}
          </p>
        </div>
        <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 max-h-40 sm:max-h-48 overflow-y-auto grow">
          {listing.bullets.map((bullet: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-gray-700">
              <span className="text-black font-semibold mt-0.5">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <span className="text-black font-semibold text-xs sm:text-sm uppercase tracking-wide inline-flex items-center gap-1.5 sm:gap-2 group-hover:gap-2 sm:group-hover:gap-3 transition-all">
            {isLease ? "View Space" : "View Property"}
            <svg 
              className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" 
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
      <section id="buy-listings" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
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
          {buyListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No properties available for purchase at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {buyListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} isLease={false} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lease Listings */}
      <section id="lease-listings" className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
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
          {leaseListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No spaces available for lease at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {leaseListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} isLease={true} />
              ))}
            </div>
          )}
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
