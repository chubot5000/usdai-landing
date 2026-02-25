"use client";

import { useRive, Fit, Layout } from "@rive-app/react-canvas";
import { useLayoutEffect } from "react";
import { useInView } from "@/hooks/useAnimateOnScroll";

interface RiveAnimationProps {
  src: string;
  className?: string;
  fit?: Fit;
}

export default function RiveAnimation({
  src,
  className,
  fit = Fit.Contain,
}: RiveAnimationProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: false });

  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: "State Machine 1",
    layout: new Layout({ fit }),
    isTouchScrollEnabled: true,
    autoplay: true,
  });

  useLayoutEffect(() => {
    if (isInView && rive) {
      rive.play();
    } else if (!isInView && rive) {
      rive.pause();
    }
  }, [isInView, rive]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      <RiveComponent />
    </div>
  );
}
