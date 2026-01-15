"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <motion.nav 
        className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-shrink-0"
        layout
        initial={false}
      >
        {navLinks.map((link) => (
          <motion.div key={link.href} layout>
            <Link
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base font-semibold uppercase tracking-wide relative group inline-block"
            >
              {link.label}
              {/* Subtle red underline on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {/* Mobile Navigation with DropdownMenu */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="md:hidden text-gray-300 p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <title>{isOpen ? "Close menu" : "Open menu"}</title>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.path
                    key="close"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    exit={{ opacity: 0, pathLength: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <motion.path
                    key="menu"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    exit={{ opacity: 0, pathLength: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </AnimatePresence>
            </motion.svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="md:hidden bg-black border-gray-800 p-2 min-w-[200px] data-[state=open]:duration-500 data-[state=closed]:duration-300"
        >
          <AnimatePresence>
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <DropdownMenuItem asChild className="focus:bg-gray-900">
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white focus:text-white transition-colors duration-200 text-base font-semibold uppercase tracking-wide py-2 px-2 w-full focus:outline-none flex items-center group cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      {/* Subtle red underline on hover - only extends to word width */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red-700 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </DropdownMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

