"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: [0.4, 0, 0.2, 1] as const,
  duration: 0.5,
};

function TemplateContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate="animate"
        exit="exit"
        initial="initial"
        key={pathname}
        style={{ willChange: "opacity, transform" }}
        transition={pageTransition}
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>{children}</div>}>
      <TemplateContent>{children}</TemplateContent>
    </Suspense>
  );
}
