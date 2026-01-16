"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { CommercialListing } from "@/app/admin/types/listings";
import AnimatedUnderline from "@/components/AnimatedUnderline";

interface ListingModalProps {
  listing: CommercialListing | null;
  isOpen: boolean;
  onClose: () => void;
}

function ListingModal({ listing, isOpen, onClose }: ListingModalProps) {
  const images = listing?.galleryImages || [];
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showLightboxArrows, setShowLightboxArrows] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (isLightboxOpen) {
            setIsLightboxOpen(false);
          } else if (showPdfViewer) {
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
        if (isLightboxOpen) {
          if (e.key === "ArrowLeft") {
            setCurrentImageIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            );
          } else if (e.key === "ArrowRight") {
            setCurrentImageIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            );
          }
        } else if (e.key === "ArrowLeft") {
          setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          );
        } else if (e.key === "ArrowRight") {
          setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
          );
        }
      };
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleArrowKeys);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleArrowKeys);
      };
    }
  }, [isOpen, onClose, showPdfViewer, images.length, isLightboxOpen]);

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!(isOpen && listing && mounted)) {
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border-4 border-black bg-white shadow-2xl md:max-h-[95vh] md:max-w-6xl lg:max-w-7xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner accents with red */}
        <div className="absolute top-0 left-0 z-10 h-6 w-6 border-black border-t-4 border-l-4 transition-colors duration-300 hover:border-brand-red-700" />
        <div className="absolute top-0 right-0 z-10 h-6 w-6 border-black border-t-4 border-r-4 transition-colors duration-300 hover:border-brand-red-700" />
        <div className="absolute bottom-0 left-0 z-10 h-6 w-6 border-black border-b-4 border-l-4 transition-colors duration-300 hover:border-brand-red-700" />
        <div className="absolute right-0 bottom-0 z-10 h-6 w-6 border-black border-r-4 border-b-4 transition-colors duration-300 hover:border-brand-red-700" />
        {/* Red accent lines */}
        <div className="absolute top-0 right-0 left-0 z-10 h-1 bg-brand-red-700 opacity-15" />
        <div className="absolute right-0 bottom-0 left-0 z-10 h-1 bg-brand-red-700 opacity-15" />

        {/* Header with back button */}
        <div className="relative z-10 flex flex-shrink-0 items-center justify-between border-black border-b-2 bg-gray-50 p-3 sm:border-b-4 sm:p-6">
          <button
            className="flex min-h-[44px] cursor-pointer items-center gap-1 font-semibold text-black text-sm transition-colors hover:text-gray-700 sm:gap-2 sm:text-base"
            onClick={onClose}
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span className="hidden sm:inline">Back to Listings</span>
            <span className="sm:hidden">Back</span>
          </button>
          <button
            aria-label="Close"
            className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center text-gray-500 transition-colors hover:text-black"
            onClick={onClose}
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Image Carousel */}
          {images.length > 0 && (
            <div className="relative border-gray-200 border-b-2 bg-black">
              <div
                className="relative aspect-[2/1] max-h-[300px] w-full cursor-pointer overflow-hidden md:aspect-[5/2] md:max-h-[350px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                  setShowLightboxArrows(false);
                }}
              >
                {images.map((image, idx) => (
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      idx === currentImageIndex
                        ? "z-10 opacity-100"
                        : "z-0 opacity-0"
                    }`}
                    key={idx}
                  >
                    <Image
                      alt={`${listing.title} - Image ${idx + 1}`}
                      className="object-contain"
                      fill
                      priority={idx === currentImageIndex}
                      src={image}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    className="absolute top-1/2 left-2 z-20 flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 p-2 text-white transition-all duration-200 hover:bg-black/80 sm:left-4 sm:p-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    type="button"
                  >
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15 19l-7-7 7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </button>
                  <button
                    aria-label="Next image"
                    className="absolute top-1/2 right-2 z-20 flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 p-2 text-white transition-all duration-200 hover:bg-black/80 sm:right-4 sm:p-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    type="button"
                  >
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {images.map((_, idx) => (
                    <button
                      aria-label={`Go to image ${idx + 1}`}
                      className={`h-2 min-h-[8px] min-w-[8px] cursor-pointer rounded-full transition-all duration-200 sm:h-2.5 ${
                        idx === currentImageIndex
                          ? "w-6 bg-white sm:w-8"
                          : "w-2 bg-white/50 hover:bg-white/75 sm:w-2.5"
                      }`}
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      type="button"
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 z-20 rounded-full bg-black/60 px-3 py-1.5 font-medium text-white text-xs sm:text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-4 max-w-4xl sm:mb-6 md:max-w-7xl">
              <h2 className="mb-2 font-bold text-2xl text-black sm:mb-3 sm:text-3xl md:text-5xl">
                {listing.title}
              </h2>
              {listing.isLease ? (
                <p className="mb-3 font-bold text-2xl text-black sm:mb-4 sm:text-3xl md:text-5xl">
                  {listing.leaseRate || "Rate available upon request"}
                </p>
              ) : (
                <p className="mb-3 font-bold text-2xl text-black sm:mb-4 sm:text-3xl md:text-5xl">
                  {listing.price || "Price available upon request"}
                </p>
              )}
              <p className="mb-2 font-medium text-base text-gray-700 sm:mb-3 sm:text-lg md:text-xl">
                {listing.location}
              </p>
              {listing.mlsNumber && (
                <p className="mb-3 text-gray-600 text-xs sm:mb-4 sm:text-sm">
                  MLS#: {listing.mlsNumber}
                </p>
              )}
              {listing.pdfFlyer && (
                <button
                  className="inline-flex min-h-[44px] items-center gap-2 bg-black px-4 py-3 font-semibold text-white text-xs transition-colors duration-300 hover:bg-brand-red-700 sm:py-2 sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPdfViewer(true);
                  }}
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  View Flyer PDF
                </button>
              )}
            </div>

            {/* Description */}
            {listing.description && (
              <div className="mb-6 sm:mb-8">
                <h3 className="mb-4 font-bold text-black text-xl sm:mb-6 sm:text-2xl md:text-3xl">
                  Description
                </h3>
                <p className="whitespace-pre-line text-gray-700 text-sm leading-relaxed sm:text-base md:text-xl">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Features */}
            {listing.bullets.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="mb-4 font-bold text-black text-xl sm:mb-6 sm:text-2xl md:text-3xl">
                  Features
                </h3>
                <ul className="space-y-2">
                  {listing.bullets.map((bullet, idx) => (
                    <li
                      className="flex items-start gap-2 text-gray-700"
                      key={idx}
                    >
                      <span className="mt-1 font-semibold text-black">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Facts & Features */}
            {listing.propertyDetails &&
              Object.keys(listing.propertyDetails).length > 0 && (
                <div className="mb-6 border-gray-200 border-t-2 pt-6 sm:mb-8 sm:pt-8">
                  <h3 className="mb-6 font-bold text-2xl text-black sm:mb-8 sm:text-3xl md:text-4xl">
                    Facts & Features
                  </h3>

                  <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                    {/* Lot */}
                    {listing.propertyDetails?.lot && (
                      <div>
                        <h4 className="mb-4 font-bold text-black text-lg sm:mb-6 sm:text-xl md:text-2xl">
                          Lot
                        </h4>
                        <div className="space-y-3">
                          {listing.propertyDetails.lot?.size && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Size
                              </span>
                              <span className="text-black">
                                {listing.propertyDetails.lot.size}
                              </span>
                            </div>
                          )}
                          {listing.propertyDetails.lot?.features && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Features
                              </span>
                              <span className="max-w-[60%] text-right text-black">
                                {listing.propertyDetails.lot.features}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Property */}
                    {listing.propertyDetails?.property && (
                      <div>
                        <h4 className="mb-4 font-bold text-black text-lg sm:mb-6 sm:text-xl md:text-2xl">
                          Property
                        </h4>
                        <div className="space-y-3">
                          {listing.propertyDetails.property?.fencing && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Fencing
                              </span>
                              <span className="text-black">
                                {listing.propertyDetails.property.fencing}
                              </span>
                            </div>
                          )}
                          {listing.propertyDetails.property
                            ?.exteriorFeatures && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Exterior features
                              </span>
                              <span className="max-w-[60%] text-right text-black">
                                {
                                  listing.propertyDetails.property
                                    .exteriorFeatures
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Details */}
                    {listing.propertyDetails?.details && (
                      <div>
                        <h4 className="mb-4 font-bold text-black text-lg sm:mb-6 sm:text-xl md:text-2xl">
                          Details
                        </h4>
                        <div className="space-y-3">
                          {listing.propertyDetails.details?.parcelNumber && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Parcel number
                              </span>
                              <span className="font-mono text-black text-sm">
                                {listing.propertyDetails.details.parcelNumber}
                              </span>
                            </div>
                          )}
                          {listing.propertyDetails.details?.subdivision && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Subdivision
                              </span>
                              <span className="text-black">
                                {listing.propertyDetails.details.subdivision}
                              </span>
                            </div>
                          )}
                          {listing.propertyDetails.details
                            ?.specialConditions !== undefined && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Special conditions
                              </span>
                              <span className="text-black">
                                {
                                  listing.propertyDetails.details
                                    .specialConditions
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Construction */}
                    {listing.propertyDetails?.construction && (
                      <div>
                        <h4 className="mb-4 font-bold text-black text-lg sm:mb-6 sm:text-xl md:text-2xl">
                          Construction
                        </h4>
                        <div className="space-y-3">
                          {listing.propertyDetails.construction?.homeType && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Home type
                              </span>
                              <span className="text-black">
                                {listing.propertyDetails.construction.homeType}
                              </span>
                            </div>
                          )}
                          {listing.propertyDetails.construction
                            ?.propertySubtype && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Property subtype
                              </span>
                              <span className="max-w-[60%] text-right text-black">
                                {
                                  listing.propertyDetails.construction
                                    .propertySubtype
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {listing.propertyDetails?.location && (
                      <div>
                        <h4 className="mb-4 font-bold text-black text-lg sm:mb-6 sm:text-xl md:text-2xl">
                          Location
                        </h4>
                        <div className="space-y-3">
                          {listing.propertyDetails.location?.region && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Region
                              </span>
                              <span className="text-black">
                                {listing.propertyDetails.location.region}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Financial & Listing Details */}
                    {listing.propertyDetails?.financial && (
                      <div>
                        <h4 className="mb-4 font-bold text-black text-lg sm:mb-6 sm:text-xl md:text-2xl">
                          Financial & Listing Details
                        </h4>
                        <div className="space-y-3">
                          {listing.propertyDetails.financial
                            ?.annualTaxAmount && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Annual tax amount
                              </span>
                              <span className="text-black">
                                {
                                  listing.propertyDetails.financial
                                    .annualTaxAmount
                                }
                              </span>
                            </div>
                          )}
                          {listing.propertyDetails.financial?.dateOnMarket && (
                            <div className="flex justify-between border-gray-100 border-b pb-2">
                              <span className="font-medium text-gray-600">
                                Date on market
                              </span>
                              <span className="text-black">
                                {listing.propertyDetails.financial.dateOnMarket}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Contact Button */}
            <div className="mt-8 border-gray-200 border-t-2 pt-6 sm:mt-10 sm:pt-8">
              <Link
                className="btn-primary inline-flex min-h-[44px] w-full items-center justify-center rounded-none px-8 py-3 font-semibold text-base sm:w-auto sm:py-4 sm:text-lg"
                href="/contact"
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
          className="fixed inset-0 z-[110] flex animate-[fadeIn_0.2s_ease-out] items-center justify-center bg-black/80 p-2 backdrop-blur-sm sm:p-4"
          onClick={() => setShowPdfViewer(false)}
        >
          <div
            className="relative m-2 flex max-h-[95vh] w-full max-w-6xl animate-[fadeInScale_0.3s_ease-out] flex-col overflow-hidden border-2 border-black bg-white shadow-2xl sm:m-0 sm:border-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-shrink-0 items-center justify-between border-black border-b-2 bg-gray-50 p-3 sm:border-b-4 sm:p-4">
              <h3 className="font-bold text-base text-black sm:text-xl">
                Property Flyer
              </h3>
              <button
                aria-label="Close PDF"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-gray-500 transition-colors hover:text-black"
                onClick={() => setShowPdfViewer(false)}
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
            </div>
            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                className="h-full min-h-[60vh] w-full sm:min-h-[80vh]"
                src={`${encodeURI(listing.pdfFlyer)}#toolbar=1`}
                title="Property Flyer PDF"
              />
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
          onMouseLeave={() => setShowLightboxArrows(false)}
          onMouseMove={() => setShowLightboxArrows(true)}
        >
          {/* Close button */}
          <button
            aria-label="Close lightbox"
            className="absolute top-4 right-4 z-30 flex min-h-[44px] min-w-[44px] items-center justify-center text-white transition-colors hover:text-gray-300"
            onClick={() => setIsLightboxOpen(false)}
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative flex h-full w-full items-center justify-center p-4">
            {images.map((image, idx) => (
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  idx === currentImageIndex
                    ? "z-10 opacity-100"
                    : "z-0 opacity-0"
                }`}
                key={idx}
              >
                <Image
                  alt={`${listing.title} - Image ${idx + 1}`}
                  className="object-contain p-8"
                  fill
                  priority={idx === currentImageIndex}
                  src={image}
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Show on hover */}
          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className={`absolute top-1/2 left-4 z-20 flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 p-4 text-white transition-all duration-200 hover:bg-black/80 ${
                  showLightboxArrows ? "opacity-100" : "opacity-0"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                type="button"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
              <button
                aria-label="Next image"
                className={`absolute top-1/2 right-4 z-20 flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 p-4 text-white transition-all duration-200 hover:bg-black/80 ${
                  showLightboxArrows ? "opacity-100" : "opacity-0"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                type="button"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 font-medium text-sm text-white">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

interface CommercialListingsProps {
  buyListings: CommercialListing[];
  leaseListings: CommercialListing[];
}

export default function CommercialListings({
  buyListings,
  leaseListings,
}: CommercialListingsProps) {
  const [selectedListing, setSelectedListing] =
    useState<CommercialListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  // Check for hash parameter on mount and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#listing-")) {
        const listingId = hash.replace("#listing-", "");
        const allListings = [...buyListings, ...leaseListings];
        const listing = allListings.find((l) => l.id === listingId);
        if (listing) {
          setSelectedListing(listing);
          setIsModalOpen(true);
          if (typeof document !== "undefined") {
            document.body.style.overflow = "hidden";
          }
        }
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [buyListings, leaseListings]);

  const handleListingClick = (
    listing: CommercialListing,
    e: React.MouseEvent
  ) => {
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
    // Remove hash when closing modal
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  // Shared listing card component for Buy and Lease listings
  const ListingCard = ({
    listing,
    isLease = false,
  }: {
    listing: CommercialListing;
    isLease?: boolean;
  }) => (
    <button
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden border-2 border-black bg-white text-left shadow-lg transition-all duration-300 hover:shadow-2xl"
      onClick={(e) => handleListingClick({ ...listing, isLease }, e)}
    >
      {/* Subtle red accent line on hover */}
      <div className="absolute top-0 right-0 left-0 z-10 h-0.5 bg-brand-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
      {/* Cover Image */}
      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-gray-200 sm:h-64">
        {listing.imageSrc ? (
          <Image
            alt={listing.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={listing.imageSrc}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <svg
              className="h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              />
              <path
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex grow flex-col p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <h3 className="mb-2 font-bold text-black text-lg sm:mb-3 sm:text-xl md:text-2xl">
            {listing.title}
          </h3>
          {isLease ? (
            <p className="mb-2 font-bold text-black text-xl sm:mb-3 sm:text-2xl md:text-3xl">
              {listing.leaseRate}
            </p>
          ) : (
            <p className="mb-2 font-bold text-black text-xl sm:mb-3 sm:text-2xl md:text-3xl">
              {listing.price}
            </p>
          )}
          <p className="font-medium text-gray-600 text-xs sm:text-sm md:text-base">
            {listing.location}
          </p>
        </div>
        <ul className="mb-3 max-h-40 grow space-y-1.5 overflow-y-auto sm:mb-4 sm:max-h-48 sm:space-y-2">
          {listing.bullets.map((bullet: string, idx: number) => (
            <li
              className="flex items-start gap-2 text-gray-700 text-xs sm:text-sm md:text-base"
              key={idx}
            >
              <span className="mt-0.5 font-semibold text-black">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-1.5 font-semibold text-black text-xs uppercase tracking-wide transition-all group-hover:gap-2 sm:gap-2 sm:text-sm sm:group-hover:gap-3">
            {isLease ? "View Space" : "View Property"}
            <svg
              className="h-3 w-3 transform transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
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
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <>
      {/* Buy Listings */}
      <section className="py-12 sm:py-16 md:py-20" id="buy-listings">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-4 font-bold font-display text-2xl text-black sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
              Buy Commercial Property
            </h2>
            {/* Animated underline */}
            <div className="mb-6">
              <AnimatedUnderline width="w-52" />
            </div>
            <p className="text-base text-gray-600 uppercase tracking-wider md:text-lg">
              Explore available commercial properties for purchase across
              Northwest Arkansas.
            </p>
          </div>
          {buyListings.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-600 text-lg">
                No properties available for purchase at this time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {buyListings.map((listing) => (
                <ListingCard
                  isLease={false}
                  key={listing.id}
                  listing={listing}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lease Listings */}
      <section
        className="bg-gray-50 py-10 sm:py-12 md:py-14"
        id="lease-listings"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-4 font-bold font-display text-2xl text-black sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
              Lease Commercial Space
            </h2>
            {/* Animated underline */}
            <div className="mb-6">
              <AnimatedUnderline width="w-52" />
            </div>
            <p className="text-base text-gray-600 uppercase tracking-wider md:text-lg">
              Available commercial spaces for lease throughout Northwest
              Arkansas.
            </p>
          </div>
          {leaseListings.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-600 text-lg">
                No spaces available for lease at this time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {leaseListings.map((listing) => (
                <ListingCard
                  isLease={true}
                  key={listing.id}
                  listing={listing}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ListingModal
        isOpen={isModalOpen}
        listing={selectedListing}
        onClose={handleCloseModal}
      />
    </>
  );
}
