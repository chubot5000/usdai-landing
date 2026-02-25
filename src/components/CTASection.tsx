"use client";

import { ANIMATION_CLASSES, useInView } from "@/hooks/useAnimateOnScroll";
import { EXTERNAL_LINKS } from "@/lib/constants";
import Image from "next/image";
import Button from "./ui/Button";

interface CTASectionProps {
  backgroundImage?: string;
}

export default function CTASection({
  backgroundImage = "/images/cta-bg.webp",
}: CTASectionProps) {
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
            src={backgroundImage}
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
            Earn from the rise of modern compute or borrow to build it.
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-[16px]">
            <Button
              href={EXTERNAL_LINKS.app}
              variant="ghost"
              size="lg"
              external
              className="w-full sm:w-auto"
            >
              Earn AI Yield
            </Button>
            <Button
              href={EXTERNAL_LINKS.contact}
              color="var(--color-secondary)"
              size="lg"
              external
              className="w-full sm:w-auto"
            >
              Instant Loan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
