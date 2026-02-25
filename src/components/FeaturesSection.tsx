"use client";

import { ANIMATION_CLASSES, useInView } from "@/hooks/useAnimateOnScroll";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Tag from "./ui/Tag";

// Dynamically import Lottie to reduce bundle size
const Lottie = dynamic(() => import("lottie-react"), {
  loading: () => (
    <div className="w-full h-full animate-pulse bg-gray-100 rounded" />
  ),
  ssr: false,
});

interface FeatureCardProps {
  title: string;
  description: string;
  animationPath?: string;
  animationClassName?: string;
  className?: string;
  descriptionClassName?: string;
  children?: React.ReactNode;
}

function FeatureCard(props: FeatureCardProps) {
  const {
    title,
    description,
    animationPath,
    animationClassName,
    className,
    descriptionClassName,
    children,
  } = props;
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    if (animationPath) {
      fetch(animationPath)
        .then((res) => res.json())
        .then((data) => setLottieData(data))
        .catch(() => {});
    }
  }, [animationPath]);

  return (
    <div
      className={`bg-[--color-feature-bg] bg-dotted border border-outline-minor rounded-[10px] min-h-[320px] md:h-[394px] flex flex-col overflow-hidden relative ${className ?? ""}`}
    >
      <div className="p-6 md:p-[32px]">
        <h3 className="font-eiko text-[22px] md:text-[25px] text-black mb-3 relative z-10">
          {title}
        </h3>
        <p
          className={`text-[14px] text-[#79716b] leading-normal tracking-[0.07px] relative z-10 ${descriptionClassName ?? ""}`}
        >
          {description}
        </p>
      </div>
      {lottieData && (
        <Lottie
          animationData={lottieData}
          loop={true}
          autoplay={true}
          className={`flex ${animationClassName}`}
        />
      )}
      {children}
    </div>
  );
}

const features = [
  {
    title: "Backed by the Future",
    description:
      "Unlike typical stablecoins backed by fiat or crypto volatility, USDai is collateralized by the physical backbone of the AI revolution—high-performance GPUs and compute infrastructure.",
  },
  {
    title: "Verified Reserves",
    description:
      "Trust, verified. View the real-time status of all treasury assets, loans, and collateral directly on-chain at any time.",
  },
  {
    title: "Decentralized Underwriting",
    description:
      "Independent experts vet every borrower and asset, ensuring only high-quality hardware backs the protocol.",
  },
  {
    title: "Immutable Security",
    description:
      "Oracle-free infrastructure eliminates price manipulation and safeguards assets against flash-loan attacks.",
  },
  {
    title: "Smart Exits via QEV",
    description:
      "Traditional real-world loans are slow and long-term. Our proprietary mechanism QEV solves that.",
  },
];

export default function FeaturesSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full bg-white py-[50px] md:py-[100px]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        {/* Section Tag */}
        <Tag className="mb-4">Features</Tag>

        {/* Section Description */}
        <p
          className={`font-eiko text-[24px] md:text-[32px] text-[--color-dark-primary] leading-normal max-w-[788px] mb-[30px] md:mb-[50px] ${ANIMATION_CLASSES.base} ${ANIMATION_CLASSES.duration.normal} ${
            isInView
              ? ANIMATION_CLASSES.state.visible
              : ANIMATION_CLASSES.state.hidden
          }`}
        >
          Capital for builders outside the megafund circle. Yield drawn from
          their machine backed credit
        </p>

        {/* Features Grid - 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Large Feature Card - Backed by the Future */}
          <FeatureCard
            title={features[0].title}
            description={features[0].description}
            animationPath="/lottie/gpu.json"
            className="md:col-span-2"
            descriptionClassName="max-w-[712px]"
            animationClassName="absolute bottom-[10%] w-[120%]"
          />

          {/* Verified Reserves */}
          <FeatureCard
            title={features[1].title}
            description={features[1].description}
            animationPath="/lottie/brown-server.json"
            animationClassName="absolute -bottom-[10%] -right-[10%] w-full max-h-[70%]"
          />

          {/* Decentralized Underwriting */}
          <FeatureCard
            title={features[2].title}
            description={features[2].description}
            animationPath="/lottie/magnifying-glass.json"
            animationClassName="absolute right-0 bottom-0 w-full max-h-[70%]"
          />

          {/* Immutable Security */}
          <FeatureCard
            title={features[3].title}
            description={features[3].description}
            animationPath="/lottie/shield.json"
            animationClassName="absolute bottom-0 w-full h-[60%]"
          />

          {/* Smart Exits via QEV */}
          <FeatureCard
            title={features[4].title}
            description={features[4].description}
            animationPath="/lottie/person.json"
            animationClassName="absolute bottom-[10%] w-full md:w-[150%]"
          />
        </div>
      </div>
    </section>
  );
}
