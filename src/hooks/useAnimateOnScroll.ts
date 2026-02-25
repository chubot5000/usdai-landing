"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView({
  threshold = 0.3,
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isInView };
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp(
  target: number,
  isActive: boolean,
  duration: number = 2000
): number {
  const [value, setValue] = useState(target); // Start with target for SSR
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const hasAnimatedRef = useRef(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
        // Reset to 0 on first frame instead of synchronously
        if (!initializedRef.current) {
          initializedRef.current = true;
          setValue(0);
        }
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setValue(target * easedProgress);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration, isActive]);

  return value;
}

/**
 * Triggers animation on component mount
 * Returns true immediately after the component mounts
 * Used for entrance animations that should play once on page load
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const mounted = useMountAnimation();
 *
 *   return (
 *     <div className={`transition-all ${mounted ? 'opacity-100' : 'opacity-0'}`}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useMountAnimation(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  return mounted;
}

export function getAnimationClasses(
  isInView: boolean,
  duration: number = 2000
): string {
  return `transition-all duration-[${duration}ms] ease-out ${
    isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
  }`;
}

export const ANIMATION_CLASSES = {
  base: "transition-all ease-out",
  duration: {
    fast: "duration-[800ms]",
    normal: "duration-[2000ms]",
  },
  state: {
    visible: "opacity-100 translate-x-0",
    hidden: "opacity-0 translate-x-4",
  },
} as const;
