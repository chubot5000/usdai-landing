"use client";

import { useMountAnimation } from "@/hooks/useAnimateOnScroll";
import { Metrics } from "@/lib/backend/types";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BackersTicker from "./BackersTicker";
import MetricsBar from "./MetricsBar";
import MobileNav from "./MobileNav";
import Navigation from "./Navigation";

interface FeaturedPost {
  title: string;
  slug: string;
}

interface HeroSectionProps {
  featuredPost?: FeaturedPost | null;
  metrics: Metrics;
}

export default function HeroSection({
  featuredPost,
  metrics,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mounted = useMountAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current
              .play()
              .catch(() => console.error("Error playing video"));
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    const videoElement = videoRef.current;
    if (videoElement) observer.observe(videoElement);

    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, []);

  return (
    <section className="w-full h-screen min-h-[600px] bg-white p-[10px]">
      <div className="relative w-full h-full overflow-hidden rounded-[21px]">
        {/* Full-screen Background Video */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden rounded-[17px]">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            poster="/images/greenland-hero-bg.webp"
            className="object-cover absolute w-full h-full rounded-[17px]"
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/1101983562/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=59d72edd3d3fd197a4764b4d77aab56d86e102faf39cd4a0da9e3490538d87fe"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-[17px]" />
        </div>

        {/* Centered Content Container */}
        <div className="relative w-full h-full px-4 sm:px-8 md:px-[60px] lg:px-[100px] flex flex-col">
          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:block">
            <Navigation variant="light" />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <MobileNav activePage="deposit" />
          </div>

          {/* Hero Content - Flex grow to push content down */}
          <div className="flex-1 flex flex-col pt-[120px] sm:pt-[160px] md:pt-[200px]">
            <div className="w-full">
              {/* Story Highlight Button / Pill */}
              {featuredPost && (
                <Link
                  href={`/insights/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity"
                  style={{
                    height: "28px",
                    paddingLeft: "11px",
                    paddingRight: "11px",
                    paddingTop: "1px",
                    paddingBottom: "1px",
                    borderRadius: "48px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(121.95px)",
                  }}
                >
                  <span className="whitespace-nowrap text-[12px] sm:text-[14px] text-[#fff1e5] tracking-[0.07px] leading-normal font-light">
                    {featuredPost.title} →
                  </span>
                </Link>
              )}

              {/* Main Headline */}
              <h1
                className={`font-eiko text-[24px] sm:text-[28px] md:text-[32px] text-white leading-normal mt-4 transition-all duration-800 ease-out ${
                  mounted
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                The dollar that builds AI, wherever it forms.
              </h1>

              {/* Metrics Bar */}
              <div className="mt-6 sm:mt-8">
                <MetricsBar valueColor="#fff1e5" {...metrics} />
              </div>
            </div>
          </div>

          {/* Partner Logos Section */}
          <BackersTicker />
        </div>
      </div>
    </section>
  );
}
