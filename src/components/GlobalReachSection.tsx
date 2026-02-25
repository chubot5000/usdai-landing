"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Metrics, Deal } from "@/lib/backend/types";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { ANIMATION_CLASSES, useCountUp } from "@/hooks/useAnimateOnScroll";
import Tag from "./ui/Tag";
import { MarkerPopup } from "./globe/MarkerPopup";

// Dynamically import Globe component to reduce Three.js bundle size
const Globe = dynamic(() => import("./Globe"), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse w-32 h-32 rounded-full bg-gray-200"></div>
    </div>
  ),
  ssr: false,
});

function formatCompact(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value}`;
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

interface GlobalReachSectionProps {
  metrics: Metrics;
  deals: Deal[];
}

export default function GlobalReachSection({
  metrics,
  deals,
}: GlobalReachSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedDeals, setSelectedDeals] = useState<Deal[]>([]);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [resetCamera, setResetCamera] = useState(false);
  const markerWorldPosRef = useRef<THREE.Vector3 | null>(null);

  const animatedTVL = useCountUp(metrics.totalDeposits, isInView);
  const animatedUsers = useCountUp(metrics.users, isInView);

  const handleMarkerClick = useCallback(
    (
      deals: Deal[],
      position: { x: number; y: number },
      markerWorldPos: THREE.Vector3
    ) => {
      setSelectedDeals(deals);
      setPopupPosition(position);
      markerWorldPosRef.current = markerWorldPos;
      setPopupOpen(true);
    },
    []
  );

  const handleClosePopup = useCallback(() => {
    setPopupOpen(false);
    setResetCamera(true);
  }, []);

  // Reset the resetCamera flag after triggering
  useEffect(() => {
    if (resetCamera) {
      const timeout = setTimeout(() => setResetCamera(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [resetCamera]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statBase = "transition-all duration-[2000ms] ease-out";
  const statAnimated = () =>
    `${statBase} ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-[50px] md:py-[100px] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        <div className="relative flex flex-row items-start justify-between min-h-[500px] md:min-h-[654px]">
          {/* Left Content */}
          <div className="relative z-10 w-full max-w-[524px]">
            {/* White backdrop with soft fading edges */}
            <div
              className="absolute inset-0 -m-8 bg-white"
              style={{
                maskImage:
                  "radial-gradient(ellipse 80% 70% at 30% 40%, black 30%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 70% at 30% 40%, black 30%, transparent 70%)",
              }}
            />

            <div className="relative">
              {/* Section Tag */}
              <Tag className="mb-4">Global Reach</Tag>

              {/* Main Headline */}
              <h2
                className={`font-eiko text-[28px] md:text-[40px] text-black leading-normal mb-[40px] md:mb-[60px] ${ANIMATION_CLASSES.base} ${ANIMATION_CLASSES.duration.normal} ${
                  isInView
                    ? ANIMATION_CLASSES.state.visible
                    : ANIMATION_CLASSES.state.hidden
                }`}
              >
                We help scale companies globally.
              </h2>

              {/* Stats Grid - 2x2 */}
              <div className="grid grid-cols-2 gap-x-8 md:gap-x-[143px] gap-y-6 md:gap-y-0 mb-[40px] md:mb-[60px]">
                {/* Row 1 */}
                <div
                  className={`md:mb-[30px] ${statAnimated()}`}
                  style={{ transitionDelay: isInView ? "0ms" : "0ms" }}
                >
                  <p className="text-[20px] md:text-[22px] text-black leading-normal">
                    {formatCompact(animatedTVL)}
                  </p>
                  <p className="text-[13px] md:text-[14px] text-[#79716b] tracking-[0.07px] leading-[1.5]">
                    Total Value Locked
                  </p>
                </div>
                <div
                  className={`md:mb-[30px] ${statAnimated()}`}
                  style={{ transitionDelay: isInView ? "300ms" : "0ms" }}
                >
                  <p className="text-[20px] md:text-[22px] text-black leading-normal">
                    80+
                  </p>
                  <p className="text-[13px] md:text-[14px] text-[#79716b] tracking-[0.07px] leading-[1.5]">
                    Partnerships
                  </p>
                </div>
                {/* Row 2 */}
                <div
                  className={statAnimated()}
                  style={{ transitionDelay: isInView ? "600ms" : "0ms" }}
                >
                  <p className="text-[20px] md:text-[22px] text-black leading-normal">
                    $236M
                  </p>
                  <p className="text-[13px] md:text-[14px] text-[#79716b] tracking-[0.07px] leading-[1.5]">
                    Active Loan Pipeline
                  </p>
                </div>
                <div
                  className={statAnimated()}
                  style={{ transitionDelay: isInView ? "900ms" : "0ms" }}
                >
                  <p className="text-[20px] md:text-[22px] text-black leading-normal">
                    {formatNumber(Math.round(animatedUsers))}
                  </p>
                  <p className="text-[13px] md:text-[14px] text-[#79716b] tracking-[0.07px] leading-[1.5]">
                    Active Users
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-[29px]">
                <a
                  href={EXTERNAL_LINKS.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-[20px] py-[10px] bg-[#a99482] rounded-[6px] text-white text-[16px] text-center leading-normal hover:opacity-80 transition-opacity"
                >
                  Launch App
                </a>
                <a
                  href={EXTERNAL_LINKS.contact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-[20px] py-[10px] bg-[#a6a09b] rounded-[6px] text-white text-[16px] text-center leading-normal hover:opacity-80 transition-opacity"
                >
                  Get an Instant Quote
                </a>
              </div>
            </div>
          </div>

          {/* Interactive 3D Globe */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[654px]">
            <Globe
              deals={deals}
              onMarkerClick={handleMarkerClick}
              locked={popupOpen}
              resetCamera={resetCamera}
            />
          </div>
        </div>
      </div>

      {/* Marker Popup */}
      <MarkerPopup
        deals={selectedDeals}
        isOpen={popupOpen}
        position={popupPosition}
        onClose={handleClosePopup}
      />
    </section>
  );
}
