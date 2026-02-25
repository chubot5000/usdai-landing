"use client";

import StepsSection from "./shared/StepsSection";

const steps = [
  {
    label: "Mint",
    title: "More USDai minted",
    lottieAnimation: "/lottie/piggy-bank.json",
  },
  {
    label: "Earn Yield",
    title: "Higher sUSDai Yields",
    lottieAnimation: "/lottie/cash-stack.json",
  },
  {
    label: "Loans",
    title: "More affordable loans",
    lottieAnimation: "/lottie/cheaper-loans.json",
  },
];

interface ProcessSectionProps {
  isDarkBackground?: boolean;
}

export default function ProcessSection({
  isDarkBackground = false,
}: ProcessSectionProps) {
  return (
    <section className="w-full pt-[21px] pb-[50px] md:pb-[100px]">
      {/* Top Border */}
      <div className="max-w-[1240px] mx-auto mb-[40px] md:mb-[68px] px-4 sm:px-8 md:px-0">
        <div
          className={`h-[1px] transition-colors duration-500 ${isDarkBackground ? "bg-[#655343]" : "bg-[#d6d3d1]"}`}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        <StepsSection
          tag="The Process"
          tagColor="#a99482"
          headline={
            <>
              The <em className="italic">supercharged</em> ecosystem
            </>
          }
          steps={steps}
          accentColor="#655343"
          cycleInterval={5000}
          isDarkBackground={isDarkBackground}
        />
      </div>
    </section>
  );
}
