"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
  useLayoutEffect,
} from "react";
import { useInView, ANIMATION_CLASSES } from "@/hooks/useAnimateOnScroll";
import { useRive, Fit, Layout } from "@rive-app/react-canvas";
import { LottieRefCurrentProps } from "lottie-react";
import Tag from "../ui/Tag";

// Dynamically import Lottie to reduce bundle size
const Lottie = dynamic(() => import("lottie-react"), {
  loading: () => (
    <div className="w-full h-full animate-pulse bg-gray-100 rounded" />
  ),
  ssr: false,
});

interface Step {
  label: string;
  title: string;
  image?: string;
  riveAnimation?: string;
  lottieAnimation?: string;
}

interface StepsSectionProps {
  tag: string;
  tagColor: string;
  headline: ReactNode;
  steps: Step[];
  accentColor: string;
  cycleInterval?: number;
  isDarkBackground?: boolean;
}

export default function StepsSection({
  tag,
  tagColor,
  headline,
  steps,
  accentColor,
  cycleInterval = 3000,
  isDarkBackground = false,
}: StepsSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [firstAnimReady, setFirstAnimReady] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  // Lottie animation refs
  const lottieRef0 = useRef<LottieRefCurrentProps | null>(null);
  const lottieRef1 = useRef<LottieRefCurrentProps | null>(null);
  const lottieRef2 = useRef<LottieRefCurrentProps | null>(null);

  // Load Lottie animations
  const [lottieData0, setLottieData0] = useState<object | null>(null);
  const [lottieData1, setLottieData1] = useState<object | null>(null);
  const [lottieData2, setLottieData2] = useState<object | null>(null);

  useEffect(() => {
    if (steps[0]?.lottieAnimation) {
      fetch(steps[0].lottieAnimation)
        .then((res) => res.json())
        .then((data) => setLottieData0(data));
    }
    if (steps[1]?.lottieAnimation) {
      fetch(steps[1].lottieAnimation)
        .then((res) => res.json())
        .then((data) => setLottieData1(data));
    }
    if (steps[2]?.lottieAnimation) {
      fetch(steps[2].lottieAnimation)
        .then((res) => res.json())
        .then((data) => setLottieData2(data));
    }
  }, [steps]);

  // Setup Rive animations for each step that has one
  const { rive: riveStep0, RiveComponent: RiveStep0 } = useRive({
    src: steps[0]?.riveAnimation || "",
    stateMachines: "State Machine 1",
    layout: new Layout({ fit: Fit.Contain }),
    isTouchScrollEnabled: true,
  });

  const { rive: riveStep1, RiveComponent: RiveStep1 } = useRive({
    src: steps[1]?.riveAnimation || "",
    stateMachines: "State Machine 1",
    layout: new Layout({ fit: Fit.Contain }),
    isTouchScrollEnabled: true,
  });

  const { rive: riveStep2, RiveComponent: RiveStep2 } = useRive({
    src: steps[2]?.riveAnimation || "",
    stateMachines: "State Machine 1",
    layout: new Layout({ fit: Fit.Contain }),
    isTouchScrollEnabled: true,
  });

  // Restart animation when corresponding step is active
  useLayoutEffect(() => {
    if (!isTransitioning) {
      // Handle Rive animations
      if (activeStep === 0 && riveStep0) {
        riveStep0.reset();
        riveStep0.play();
      } else if (riveStep0) {
        riveStep0.pause();
      }

      if (activeStep === 1 && riveStep1) {
        riveStep1.reset();
        riveStep1.play();
      } else if (riveStep1) {
        riveStep1.pause();
      }

      if (activeStep === 2 && riveStep2) {
        riveStep2.reset();
        riveStep2.play();
      } else if (riveStep2) {
        riveStep2.pause();
      }

      // Handle Lottie animations
      if (activeStep === 0 && lottieRef0.current) {
        lottieRef0.current.goToAndPlay(0, true);
      } else if (lottieRef0.current) {
        lottieRef0.current.pause();
      }

      if (activeStep === 1 && lottieRef1.current) {
        lottieRef1.current.goToAndPlay(0, true);
      } else if (lottieRef1.current) {
        lottieRef1.current.pause();
      }

      if (activeStep === 2 && lottieRef2.current) {
        lottieRef2.current.goToAndPlay(0, true);
      } else if (lottieRef2.current) {
        lottieRef2.current.pause();
      }
    }
  }, [activeStep, riveStep0, riveStep1, riveStep2, isTransitioning]);

  // Handle window resize to update Rive canvas
  useEffect(() => {
    const handleResize = () => {
      if (riveStep0) riveStep0.resizeDrawingSurfaceToCanvas();
      if (riveStep1) riveStep1.resizeDrawingSurfaceToCanvas();
      if (riveStep2) riveStep2.resizeDrawingSurfaceToCanvas();
    };

    window.addEventListener("resize", handleResize);
    // Call once on mount to ensure proper sizing
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [riveStep0, riveStep1, riveStep2]);

  const goToStep = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveStep(index);
      setProgressKey((k) => k + 1);
      setIsTransitioning(false);
    }, 150);
  }, []);

  const scheduleNextStep = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const next = (activeStep + 1) % steps.length;
      goToStep(next);
    }, cycleInterval);
  }, [activeStep, goToStep, steps.length, cycleInterval]);

  // Only schedule next step if component is in view and first animation is ready
  useEffect(() => {
    if (isInView && firstAnimReady) {
      scheduleNextStep();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scheduleNextStep, isInView, firstAnimReady]);

  const handleStepClick = (index: number) => {
    if (index === activeStep) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    goToStep(index);
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {/* Section Tag */}
      <Tag color={tagColor} className="mb-4">
        {tag}
      </Tag>

      {/* Main Headline */}
      <h2
        className={`font-eiko text-[28px] md:text-[40px] leading-normal mb-[40px] md:mb-[60px] ${isDarkBackground ? "text-white" : "text-[#1d1a19]"} ${ANIMATION_CLASSES.base} ${ANIMATION_CLASSES.duration.normal} ${
          isInView
            ? ANIMATION_CLASSES.state.visible
            : ANIMATION_CLASSES.state.hidden
        }`}
      >
        {headline}
      </h2>

      {/* Illustration Container */}
      <div
        className={`w-full max-w-[1238px] h-[300px] sm:h-[400px] md:h-[530px] border rounded-[10px] mb-[40px] md:mb-[51px] relative overflow-hidden bg-[--color-feature-bg] bg-dotted transition-colors duration-500 ${isDarkBackground ? "border-[#655343]" : "border-[#d6d3d1]"}`}
      >
        {/* Render all Rive animations, show/hide with opacity */}
        {steps[0]?.riveAnimation && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeStep === 0 && !isTransitioning
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <RiveStep0 />
          </div>
        )}
        {steps[1]?.riveAnimation && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeStep === 1 && !isTransitioning
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <RiveStep1 />
          </div>
        )}
        {steps[2]?.riveAnimation && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeStep === 2 && !isTransitioning
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <RiveStep2 />
          </div>
        )}

        {/* Render all Lottie animations, show/hide with opacity */}
        {steps[0]?.lottieAnimation && lottieData0 && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeStep === 0 && !isTransitioning
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Lottie
              lottieRef={lottieRef0}
              animationData={lottieData0}
              loop={true}
              autoplay={false}
              onDOMLoaded={() => {
                if (lottieRef0.current) {
                  lottieRef0.current.goToAndPlay(0, true);
                }
                if (!firstAnimReady) {
                  setFirstAnimReady(true);
                  setProgressKey((k) => k + 1);
                }
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        {steps[1]?.lottieAnimation && lottieData1 && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeStep === 1 && !isTransitioning
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Lottie
              lottieRef={lottieRef1}
              animationData={lottieData1}
              loop={true}
              autoplay={false}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        {steps[2]?.lottieAnimation && lottieData2 && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeStep === 2 && !isTransitioning
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Lottie
              lottieRef={lottieRef2}
              animationData={lottieData2}
              loop={true}
              autoplay={false}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        {/* Static images fallback */}
        {((activeStep === 0 &&
          !steps[0]?.riveAnimation &&
          !steps[0]?.lottieAnimation) ||
          (activeStep === 1 &&
            !steps[1]?.riveAnimation &&
            !steps[1]?.lottieAnimation) ||
          (activeStep === 2 &&
            !steps[2]?.riveAnimation &&
            !steps[2]?.lottieAnimation)) && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="relative w-[280px] h-[180px] sm:w-[400px] sm:h-[260px] md:w-[625px] md:h-[400px]">
              <Image
                src={steps[activeStep].image!}
                alt={`${steps[activeStep].title} illustration`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 md:gap-[17.5px]">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          return (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className="flex-1 text-left cursor-pointer"
            >
              {/* Progress Bar */}
              <div className="h-[2px] w-full bg-[#ebe9e8] mb-4 md:mb-[35px] relative overflow-hidden">
                {isActive && firstAnimReady && (
                  <div
                    key={progressKey}
                    className="absolute top-0 left-0 h-full animate-progress-fill"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </div>

              {/* Step Label */}
              <p
                className="text-[13px] md:text-[14px] tracking-[0.07px] leading-[1.5] mb-1 md:mb-2 transition-colors duration-300"
                style={{ color: isActive ? accentColor : "#a6a09b" }}
              >
                {step.label}
              </p>

              {/* Step Title */}
              <p
                className={`text-[16px] md:text-[18px] leading-normal transition-colors duration-500 ${
                  isActive
                    ? isDarkBackground
                      ? "text-white"
                      : "text-black"
                    : "text-[#a6a09b]"
                }`}
              >
                {step.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
