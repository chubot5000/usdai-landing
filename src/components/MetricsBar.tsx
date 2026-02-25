"use client";

import { Metrics } from "@/lib/backend/types";
import { useMountAnimation, useCountUp } from "@/hooks/useAnimateOnScroll";

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatCompact(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value}`;
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

interface MetricsBarProps extends Metrics {
  valueColor?: string;
}

export default function MetricsBar({
  valueColor = "#fff1e5",
  currentApr,
  expectedApr,
  totalDeposits,
  users,
}: MetricsBarProps) {
  const mounted = useMountAnimation();

  const animatedCurrentApr = useCountUp(currentApr, mounted);
  const animatedExpectedApr = useCountUp(expectedApr, mounted);
  const animatedTotalDeposits = useCountUp(totalDeposits, mounted);
  const animatedUsers = useCountUp(users, mounted);

  const itemBase =
    "flex items-center whitespace-nowrap text-[13px] sm:text-[14px] md:text-[16px] tracking-[0.08px] leading-[1.5] transition-all duration-[2000ms] ease-out";
  const itemAnimated = () =>
    `${itemBase} ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`;

  return (
    <div className="flex flex-wrap gap-x-3 sm:gap-x-0 gap-y-2 items-center">
      {/* CURRENT APR */}
      <div
        className={itemAnimated()}
        style={{ transitionDelay: mounted ? "0ms" : "0ms" }}
      >
        <span className="text-[#d6d3d1]">CURRENT APR:</span>
        <span className="ml-1" style={{ color: valueColor }}>
          {formatPercent(animatedCurrentApr)}
        </span>
      </div>

      {/* Divider 1 */}
      <div
        className={`hidden sm:block w-[1px] h-[20px] bg-white/50 mx-2 sm:mx-3 md:mx-4 transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: mounted ? "200ms" : "0ms" }}
      />

      {/* EXPECTED APR */}
      <div
        className={`${itemAnimated()} uppercase`}
        style={{ transitionDelay: mounted ? "300ms" : "0ms" }}
      >
        <span className="text-[#d6d3d1]">EXPECTED APR:</span>
        <span className="ml-1" style={{ color: valueColor }}>
          {formatPercent(animatedExpectedApr)}
        </span>
      </div>

      {/* Divider 2 */}
      <div
        className={`hidden sm:block w-[1px] h-[20px] bg-white/50 mx-2 sm:mx-3 md:mx-4 transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: mounted ? "500ms" : "0ms" }}
      />

      {/* TOTAL DEPOSITS */}
      <div
        className={`${itemAnimated()} uppercase`}
        style={{ transitionDelay: mounted ? "600ms" : "0ms" }}
      >
        <span className="text-[#d6d3d1]">TOTAL DEPOSITS:</span>
        <span className="ml-1" style={{ color: valueColor }}>
          {formatCompact(animatedTotalDeposits)}
        </span>
      </div>

      {/* Divider 3 */}
      <div
        className={`hidden sm:block w-[1px] h-[20px] bg-white/50 mx-2 sm:mx-3 md:mx-4 transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: mounted ? "800ms" : "0ms" }}
      />

      {/* USERS */}
      <div
        className={itemAnimated()}
        style={{ transitionDelay: mounted ? "900ms" : "0ms" }}
      >
        <span className="text-[#d6d3d1]">USERS:</span>
        <span className="ml-1" style={{ color: valueColor }}>
          {formatNumber(Math.round(animatedUsers))}
        </span>
      </div>
    </div>
  );
}
