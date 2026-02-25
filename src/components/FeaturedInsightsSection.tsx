"use client";

import { ANIMATION_CLASSES, useInView } from "@/hooks/useAnimateOnScroll";
import Image from "next/image";
import Link from "next/link";
interface FeaturedInsightsSectionProps {
  isDarkBackground?: boolean;
}

const FEATURED_INSIGHTS = [
  {
    slug: "usdai-foundation-chip",
    thumbnail: "/images/featured-insights/usdai-foundation-chip.png",
    title: "The USD.AI Foundation and $CHIP",
    date: "January 27, 2026",
  },
  {
    slug: "banks-finance-gpu-credit",
    thumbnail: "/images/featured-insights/banks-finance-gpu-credit.png",
    title: "Why Banks Can't Fund The GPU Revolution",
    date: "December 16, 2025",
  },
  {
    slug: "how-to-finance-gpu-cluster-7-days-usd-ai",
    thumbnail:
      "/images/featured-insights/how-to-finance-gpu-cluster-7-days-usd-ai.png",
    title: "7-Day GPU Financing with USD.AI",
    date: "December 5, 2025",
  },
  {
    slug: "pyusd-paypal-usdai-integration",
    thumbnail: "/images/featured-insights/pyusd-paypal-usdai-integration.png",
    title: "PYUSD Integration and Incentive Program",
    date: "December 18, 2025",
  },
];

export default function FeaturedInsightsSection({
  isDarkBackground = false,
}: FeaturedInsightsSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full py-[60px] md:py-[100px] lg:py-[122px]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        {/* Section Title */}
        <h2
          className={`font-eiko font-medium text-[28px] md:text-[40px] leading-normal mb-[40px] md:mb-[60px] ${isDarkBackground ? "text-white" : "text-[#1d1a19]"} ${ANIMATION_CLASSES.base} ${ANIMATION_CLASSES.duration.normal} ${
            isInView
              ? ANIMATION_CLASSES.state.visible
              : ANIMATION_CLASSES.state.hidden
          }`}
        >
          Featured Insights
        </h2>

        {/* Insights Scrollable Container */}
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 sm:-mx-8 md:-mx-[60px] lg:-mx-[100px] px-4 sm:px-8 md:px-[60px] lg:px-[100px] scroll-fade-edges">
          <div className="flex gap-6 md:gap-[29px] pb-2">
            {/* All tiles - Featured insights */}
            {FEATURED_INSIGHTS.map((insight) => (
              <Link
                href={`/insights/${insight.slug}`}
                key={insight.slug}
                className="group/card flex-shrink-0 w-[200px] md:w-[290px]"
              >
                {/* Image Container */}
                <div className="w-full aspect-290/420 rounded-[5px] overflow-hidden border border-[#655343] mb-4 md:mb-[20px] relative">
                  {/* Blurred background image */}
                  <Image
                    src={insight.thumbnail}
                    alt=""
                    fill
                    className="object-cover blur-xl scale-110"
                  />
                  {/* Contained main image */}
                  <Image
                    src={insight.thumbnail}
                    alt={insight.title}
                    fill
                    className="object-contain relative z-10"
                  />
                  {/* Overlay - faded by default, removed on hover */}
                  <div className="absolute inset-0 bg-[rgba(101,83,67,0.6)] opacity-100 group-hover/card:opacity-0 transition-opacity duration-300 z-20" />
                </div>

                {/* Card Details */}
                <div className="h-[85px] md:h-[95px]">
                  <h3
                    className={`text-[18px] md:text-[22px] leading-normal mb-2 font-eiko font-medium transition-colors duration-500 ${isDarkBackground ? "text-white" : "text-[#1d1a19]"}`}
                  >
                    {insight.title}
                  </h3>

                  {/* Date */}
                  <p
                    className={`text-[13px] md:text-[14px] tracking-[0.07px] leading-normal font-light transition-colors duration-500 ${isDarkBackground ? "text-[#fff1e5]" : "text-[#79716b]"}`}
                  >
                    {insight.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
