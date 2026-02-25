"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Tag from "../ui/Tag";

// Dynamically import Lottie to reduce bundle size
const Lottie = dynamic(() => import("lottie-react"), {
  loading: () => (
    <div className="w-full h-full animate-pulse bg-gray-100 rounded" />
  ),
  ssr: false,
});

const steps = [
  {
    step: "STEP ONE",
    title: "Borrow",
    description:
      "Places purchase order with OEM, secures data center space, sets up SPV",
    animationPath: "/lottie/borrow/borrow-piggy.json",
    position: "absolute bottom-0 right-0 w-[80%] sm:w-full",
  },
  {
    step: "STEP TWO",
    title: "OEM Delivery",
    description: "OEM delivers GPU assets to Data Center, installs hardware",
    animationPath: "/lottie/borrow/truck-blue.json",
    position: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] sm:w-[80%]",
  },
  {
    step: "STEP THREE",
    title: "USD.AI Confirmation",
    description: "Independently confirms installation of GPU hardware",
    animationPath: "/lottie/borrow/blue-server.json",
    position: "absolute -bottom-[10%] -right-[10%] w-full max-h-[70%]",
  },
  {
    step: "STEP FOUR",
    title: "Data Center",
    description: "Warehouse receipts sent to SPV, tokenized by USD.AI",
    animationPath: "/lottie/borrow/data-center.json",
    position:
      "absolute -bottom-[20%] sm:bottom-0 left-1/2 -translate-x-1/2 w-[70%] sm:w-full",
  },
  {
    step: "STEP FIVE",
    title: "Borrower Pledge",
    description: "Pledges tokenized warehouse receipt as collateral for loan",
    animationPath: "/lottie/borrow/loan-hand.json",
    position: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] sm:w-[80%]",
  },
  {
    step: "STEP SIX",
    title: "USD.AI Funding",
    description: "Releases funds in USDC via smart contract",
    animationPath: "/lottie/borrow/money.json",
    position: "absolute bottom-0 ",
  },
];

function StepCard({ step }: { step: (typeof steps)[number] }) {
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    fetch(step.animationPath)
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch(() => {});
  }, [step.animationPath]);

  return (
    <div className="border border-[#d6d3d1] rounded-[10px] overflow-hidden relative h-[300px] sm:h-[350px] md:h-[394px] bg-[--color-feature-bg] bg-dotted">
      {/* Content */}
      <div className="absolute left-[24px] right-[24px] md:left-[32px] md:right-[32px] top-[20px] md:top-[26px] z-10">
        {/* Step Label */}
        <p className="text-[12px] md:text-[14px] font-medium text-[#79716b] tracking-[0.07px] leading-[1.5]">
          {step.step}
        </p>

        {/* Title */}
        <h3 className="font-eiko text-[20px] md:text-[25px] text-black leading-normal mt-[20px] md:mt-[26px]">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-[12px] md:text-[14px] text-[#79716b] tracking-[0.07px] leading-[1.5] mt-[4px]">
          {step.description}
        </p>
      </div>

      {lottieData && (
        <Lottie
          animationData={lottieData}
          loop={true}
          autoplay={true}
          className={`flex ${step.position}`}
        />
      )}
    </div>
  );
}

export default function SixStepProcessSection() {
  return (
    <section className="w-full bg-white py-[50px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        {/* Section Tag */}
        <Tag color="#68c4ba" className="mb-[40px] md:mb-[60px]">
          How It Works
        </Tag>

        {/* Steps Grid - 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[12px]">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
