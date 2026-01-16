"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedUnderlineProps {
  className?: string;
  width?: string;
  color?: string;
  delay?: number;
}

export default function AnimatedUnderline({
  className = "",
  width = "w-52",
  color = "bg-black",
  delay = 0,
}: AnimatedUnderlineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = underlineRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        ref={underlineRef}
        className={`h-1 ${width} ${color} transition-all duration-1000 ease-out ${
          isVisible ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  );
}
