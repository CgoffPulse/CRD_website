"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number>(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-gray-800 border-t bg-black py-6 sm:py-8 md:py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
          {/* Company Info */}
          <div>
            <h3 className="mb-2 font-bold font-display text-base text-white sm:mb-3 sm:text-lg md:text-xl">
              CRD Real Estate & Development
            </h3>
            <p className="font-copperplate-medium text-gray-400 text-xs leading-relaxed sm:text-sm">
              Community Focused Results Driven
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="mb-2 font-copperplate-medium font-semibold text-sm text-white sm:mb-3 sm:text-base">
              Address
            </h4>
            <div className="space-y-1.5 text-gray-400 text-xs sm:text-sm">
              <p>
                115 S 2nd St
                <br />
                Rogers, AR 72756
              </p>
            </div>
          </div>

          {/* Commercial & Development Social */}
          <div>
            <h4 className="mb-2 font-copperplate-medium font-semibold text-sm text-white sm:mb-3 sm:text-base">
              Commercial & Development
            </h4>
            <div className="flex space-x-3">
              <a
                aria-label="Commercial & Development Instagram"
                className="text-gray-400 transition-colors duration-200 hover:text-white"
                href="https://instagram.com/crdcommercial"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                aria-label="Commercial & Development Facebook"
                className="inline-block text-gray-400 transition-all duration-200 hover:scale-105 hover:text-white"
                href="https://facebook.com/crdcommercial"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Residential Social */}
          <div>
            <h4 className="mb-2 font-copperplate-medium font-semibold text-sm text-white sm:mb-3 sm:text-base">
              Residential
            </h4>
            <div className="flex space-x-3">
              <a
                aria-label="Residential Branch Instagram"
                className="text-gray-400 transition-colors duration-200 hover:text-white"
                href="https://instagram.com/crdresidential"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                aria-label="Residential Branch Facebook"
                className="inline-block text-gray-400 transition-all duration-200 hover:scale-105 hover:text-white"
                href="https://facebook.com/crdresidential"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 border-gray-800 border-t pt-4 sm:mt-6 sm:pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-center font-copperplate-medium text-gray-400 text-xs sm:text-sm md:text-left">
              © {year} CRD Real Estate & Development. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-2 font-copperplate-medium text-gray-400 text-xs sm:gap-3 sm:text-sm">
              <a className="transition-colors hover:text-white" href="/about">
                About
              </a>
              <span className="text-gray-600">•</span>
              <a
                className="transition-colors hover:text-white"
                href="/commercial"
              >
                Commercial
              </a>
              <span className="text-gray-600">•</span>
              <a
                className="transition-colors hover:text-white"
                href="/residential"
              >
                Residential
              </a>
              <span className="text-gray-600">•</span>
              <a
                className="transition-colors hover:text-white"
                href="/development"
              >
                Development
              </a>
              <span className="text-gray-600">•</span>
              <a
                className="transition-colors hover:text-white"
                href="/services"
              >
                Services
              </a>
              <span className="text-gray-600">•</span>
              <a className="transition-colors hover:text-white" href="/team">
                Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
