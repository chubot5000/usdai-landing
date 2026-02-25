"use client";

import StepsSection from "../shared/StepsSection";

const steps = [
  { label: "Step One", title: "Start", image: "/images/steps/step-start.svg" },
  { label: "Step Two", title: "Scale", image: "/images/steps/step-scale.svg" },
  { label: "Step Three", title: "Grow", image: "/images/steps/step-grow.svg" },
];

export default function YourStorySection() {
  return (
    <section className="w-full bg-white py-[50px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        <StepsSection
          tag="Scale Faster"
          tagColor="#68c4ba"
          headline="Scale your AI infrastructure"
          steps={steps}
          accentColor="#68c4ba"
          cycleInterval={3000}
        />
      </div>
    </section>
  );
}
