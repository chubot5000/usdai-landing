"use client";

import { ANIMATION_CLASSES, useInView } from "@/hooks/useAnimateOnScroll";
import { EXTERNAL_LINKS } from "@/lib/constants";
import Image from "next/image";
import Button from "../ui/Button";

export default function BorrowCTASection() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full bg-white p-[10px]"
    >
      <div className="relative w-full h-[500px] sm:h-[650px] md:h-[800px] lg:h-[939px] overflow-hidden rounded-[21px]">
        {/* Background Image with rounded corners */}
        <div className="absolute inset-0 rounded-[17px] overflow-hidden">
          <Image
            src="/images/borrow-cta-bg.webp"
            alt="Data center at night"
            fill
            className="object-cover rounded-[17px]"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 rounded-[17px]" />
        </div>

        {/* Gradient overlay - from transparent to black at 40% */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/40 rounded-[17px]" />

        {/* Centered Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-8">
          {/* Main Headline */}
          <h2
            className={`font-eiko text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] text-white text-center leading-normal max-w-[1097px] mb-6 md:mb-[40px] ${ANIMATION_CLASSES.base} ${ANIMATION_CLASSES.duration.normal} ${
              isInView
                ? ANIMATION_CLASSES.state.visible
                : ANIMATION_CLASSES.state.hidden
            }`}
          >
            Setting the interest rate of AI.
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-[16px]">
            <Button
              href={EXTERNAL_LINKS.contact}
              variant="ghost"
              size="lg"
              external
              className="w-full sm:w-auto"
            >
              Talk to the Team
            </Button>
            <Button
              href={EXTERNAL_LINKS.contact}
              color="#68c4ba"
              size="lg"
              external
              className="w-full sm:w-auto"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
