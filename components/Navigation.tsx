"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/commercial", label: "Commercial" },
  { href: "/residential", label: "Residential" },
  { href: "/development", label: "Development" },
  { href: "/team", label: "Team" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base font-semibold uppercase tracking-wide relative group"
          >
            {link.label}
            {/* Subtle red underline on hover */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red-700 group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-300 p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black py-4 border-t border-gray-800 shadow-lg">
          <nav className="flex flex-col space-y-4 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-base font-semibold uppercase tracking-wide py-2 relative group"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                {/* Subtle red underline on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red-700 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

