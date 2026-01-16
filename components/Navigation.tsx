"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Ensure component only renders dropdown after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter out the current route from mobile navigation
  const filteredNavLinks = navLinks.filter((link) => link.href !== pathname);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden w-full shrink-0 items-center justify-center space-x-6 lg:flex lg:space-x-8"
        initial={false}
        layout
      >
        {navLinks.map((link) => (
          <motion.div key={link.href} layout>
            <Link
              className="group relative inline-block font-medium font-semibold text-gray-300 text-sm uppercase tracking-wide transition-colors duration-200 hover:text-white md:text-base lg:text-lg"
              href={link.href}
            >
              {link.label}
              {/* Subtle red underline on hover */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-red-700 transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {/* Mobile Navigation with DropdownMenu */}
      {isMounted ? (
        <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Toggle menu"
              className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center p-2 text-gray-300 focus:outline-none focus:ring-0 lg:hidden"
              type="button"
            >
            <motion.svg
              animate={{ rotate: isOpen ? 90 : 0 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              viewBox="0 0 24 24"
            >
              <title>{isOpen ? "Close menu" : "Open menu"}</title>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.path
                    animate={{ opacity: 1, pathLength: 1 }}
                    d="M6 18L18 6M6 6l12 12"
                    exit={{ opacity: 0, pathLength: 0 }}
                    initial={{ opacity: 0, pathLength: 0 }}
                    key="close"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                ) : (
                  <motion.path
                    animate={{ opacity: 1, pathLength: 1 }}
                    d="M4 6h16M4 12h16M4 18h16"
                    exit={{ opacity: 0, pathLength: 0 }}
                    initial={{ opacity: 0, pathLength: 0 }}
                    key="menu"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>
            </motion.svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-[180px] border-gray-800 bg-black p-4 data-[state=closed]:duration-300 data-[state=open]:duration-500 lg:hidden"
        >
          <AnimatePresence>
            {filteredNavLinks.map((link, index) => (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                initial={{ opacity: 0, x: -20 }}
                key={link.href}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <DropdownMenuItem asChild className="focus:bg-gray-900">
                  <Link
                    className="group flex w-full cursor-pointer items-center px-3 py-3 font-copperplate-medium font-medium text-xl text-zinc-200 uppercase tracking-wide transition-colors duration-200 hover:text-white focus:text-white focus:outline-none"
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      {/* Staggered red underline animation on menu open */}
                      <motion.span
                        animate={{
                          width: isOpen ? "100%" : 0,
                        }}
                        className="absolute bottom-0 left-0 h-0.5 bg-brand-red-700"
                        initial={{ width: 0 }}
                        transition={{
                          delay: isOpen ? index * 0.1 + 0.2 : 0,
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    </span>
                  </Link>
                </DropdownMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </DropdownMenuContent>
      </DropdownMenu>
      ) : (
        <button
          aria-label="Toggle menu"
          className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center p-2 text-gray-300 focus:outline-none focus:ring-0 lg:hidden"
          type="button"
        >
          <svg
            aria-label="Open menu"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <title>Open menu</title>
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </>
  );
}
