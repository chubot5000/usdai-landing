"use client";

import { useInView } from "@/hooks/useAnimateOnScroll";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Tag from "../ui/Tag";

interface Slide {
  title: string;
  body: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Control every step without going to a bank",
    body: "We've reimagined GPU financing from the ground up. No branches, a fully digital process, and non-recourse loans.",
    image: "/images/app-screenshots/screenshot-1.svg",
  },
  {
    title: "Instant visibility, real-time feedback, anytime access",
    body: "Stay fully informed at every step without unnecessary calls or processes —accessible anytime, from anywhere.",
    image: "/images/app-screenshots/screenshot-2.svg",
  },
  {
    title: "Move faster with transparent payment rails",
    body: "Make payments instantly. No waiting, no guesswork—just transparent, real-time settlement verifiable on-chain",
    image: "/images/app-screenshots/screenshot-3.svg",
  },
];

export default function AllInOneAppSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const scheduleNextSlide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const next = (activeSlide + 1) % slides.length;
      goToSlide(next);
    }, 3000);
  }, [activeSlide, goToSlide]);

  useEffect(() => {
    if (isInView) {
      scheduleNextSlide();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scheduleNextSlide, isInView]);

  const handleDotClick = (index: number) => {
    if (index == activeSlide) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    goToSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) < threshold) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (diff > 0 && activeSlide < slides.length - 1) {
      goToSlide(activeSlide + 1);
    } else if (diff < 0 && activeSlide > 0) {
      goToSlide(activeSlide - 1);
    }
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full bg-white border-t border-[#d6d3d1]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Mobile Layout */}
        <div
          className="lg:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Tag */}
          <div className="px-4 sm:px-8 md:px-[60px] pt-[40px] md:pt-[80px]">
            <Tag color="#68c4ba" className="mb-[20px] w-fit">
              Full-Service Borrower Experience
            </Tag>
          </div>

          {/* Text Content */}
          <div className="px-4 sm:px-8 md:px-[60px]">
            <div className="relative min-h-[140px] sm:min-h-[160px]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === activeSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h2 className="font-eiko text-[24px] sm:text-[28px] md:text-[36px] text-[#1d1a19] leading-normal mb-[12px] max-w-[501px]">
                    {slide.title}
                  </h2>
                  <p className="text-[14px] sm:text-[16px] md:text-[20px] text-black leading-normal max-w-[522px]">
                    {slide.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className="bg-[--color-feature-bg] relative min-h-[400px] sm:min-h-[500px] mt-[16px] mb-[40px] md:mb-[80px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-start justify-center px-4 sm:px-8 pt-4 transition-opacity duration-500 ${
                  index === activeSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative w-full max-w-[500px] h-[380px] sm:h-[480px] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={slide.image}
                    alt="USD.AI Borrower Intake Application"
                    fill
                    className="object-contain object-top"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-[8px]">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "w-[20px] bg-[#68c4ba]"
                      : "w-[10px] bg-[#d6d3d1]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-row h-[882px]">
          {/* Left Content - 720px width on desktop */}
          <div className="w-[720px] pl-[110px] pr-[100px] flex flex-col justify-center">
            {/* Section Tag */}
            <Tag color="#68c4ba" className="mb-[40px] w-fit">
              Full-Service Borrower Experience
            </Tag>

            {/* Text Content */}
            <div className="relative min-h-[400px]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === activeSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h2 className="font-eiko text-[40px] text-[#1d1a19] leading-normal mb-[60px] max-w-[501px]">
                    {slide.title}
                  </h2>
                  <p className="text-[24px] text-black leading-normal max-w-[522px] mb-[60px]">
                    {slide.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-[16px]">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-[10px] h-[10px] rounded-full transition-colors duration-300 cursor-pointer ${
                    index == activeSlide ? "bg-[#68c4ba]" : "bg-[#d6d3d1]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - App Screenshot */}
          <div className="flex-1 bg-[--color-feature-bg] relative overflow-hidden">
            {/* Dotted background */}
            <div className="absolute inset-0 bg-dotted" />

            {/* Desktop screenshots */}
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-start pl-[94px] transition-opacity duration-500 ${
                  index === activeSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt="USD.AI Borrower Intake Application"
                    fill
                    className="object-contain object-left"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
