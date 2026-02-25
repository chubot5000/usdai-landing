"use client";

import { useMountAnimation } from "@/hooks/useAnimateOnScroll";
import { EXTERNAL_LINKS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import BackersTicker from "../BackersTicker";
import MobileNav from "../MobileNav";
import Navigation from "../Navigation";

interface FeaturedPost {
  title: string;
  slug: string;
}

interface BorrowHeroSectionProps {
  featuredPost?: FeaturedPost | null;
}

export default function BorrowHeroSection({
  featuredPost,
}: BorrowHeroSectionProps) {
  const mounted = useMountAnimation();

  return (
    <section className="w-full h-screen min-h-[600px] bg-white p-[10px]">
      <div className="relative w-full h-full overflow-hidden rounded-[21px]">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 rounded-[17px] overflow-hidden">
          <Image
            src="/images/datacenter-hero-bg.webp"
            alt="Data center at night"
            fill
            className="object-cover rounded-[17px]"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] rounded-[17px]" />
        </div>

        {/* Gradient overlay - full width */}
        <div className="absolute inset-0 bg-linear-to-b from-black to-transparent opacity-40 rounded-[17px]" />

        {/* Centered Content Container */}
        <div className="relative w-full h-full px-4 sm:px-8 md:px-[60px] lg:px-[100px] flex flex-col">
          {/* Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:block">
            <Navigation
              activePage="borrow"
              ctaText="Get a Quote"
              ctaHref={EXTERNAL_LINKS.contact}
              ctaColor="#68c4ba"
            />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <MobileNav
              activePage="borrow"
              ctaText="Get a Quote"
              ctaHref={EXTERNAL_LINKS.contact}
              ctaColor="#68c4ba"
            />
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
                Finance GPUs at the speed AI demands.
                <br />
                Built for neoclouds and HPC operators.
              </h1>
            </div>
          </div>

          {/* Partner Logos Section */}
          <BackersTicker />
        </div>
      </div>
    </section>
  );
}
