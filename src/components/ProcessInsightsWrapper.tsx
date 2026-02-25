"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import LoadingSkeleton from "./ui/LoadingSkeleton";

// Dynamically import components for better code splitting
const ProcessSection = dynamic(() => import("./ProcessSection"), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});

const FeaturedInsightsSection = dynamic(
  () => import("./FeaturedInsightsSection"),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false,
  }
);

export default function ProcessInsightsWrapper() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If the section is in view (with larger scroll threshold) or we've scrolled past it, make it dark
      const isInView = rect.top < viewportHeight * 0.5 && rect.bottom > 0;
      const isPastSection = rect.bottom < 0;

      setIsDark(isInView || isPastSection);
    };

    handleScroll(); // Check on mount

    // Listen to scroll on SimpleBar's scroll container
    const scrollElement = document.querySelector(".simplebar-content-wrapper");
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll, { passive: true });
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    } else {
      // Fallback to window scroll if SimpleBar not found
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      className={`w-full transition-colors duration-500 ${isDark ? "bg-[#2f2823]" : "bg-white"}`}
    >
      <ProcessSection isDarkBackground={isDark} />
      <div ref={sectionRef}>
        <FeaturedInsightsSection isDarkBackground={isDark} />
      </div>
    </div>
  );
}
