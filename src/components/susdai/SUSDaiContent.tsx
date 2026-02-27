"use client";

import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navigation from "@/components/Navigation";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useRef, useEffect, useCallback, useMemo } from "react";
import {
  useInView,
  useCountUp,
  useMountAnimation,
} from "@/hooks/useAnimateOnScroll";

// ─── Data ────────────────────────────────────────────────────────────────────

interface DefineStep {
  num: string;
  title: string;
  description: string;
}

const DEFINE_STEPS: DefineStep[] = [
  {
    num: "01",
    title: "Mint USDai",
    description:
      "Deposit USDC or USDT to mint a fully-backed synthetic dollar — redeemable at any time.",
  },
  {
    num: "02",
    title: "Stake into sUSDai",
    description:
      "Your capital enters the yield-bearing vault, backing GPU hardware loans to AI infrastructure operators.",
  },
  {
    num: "03",
    title: "Earn as borrowers repay",
    description:
      "Loan repayments flow to sUSDai holders as yield. Idle capital earns T-Bill rates as a floor.",
  },
];

interface SafeguardCard {
  num: string;
  title: string;
  description: string;
}

const SAFEGUARD_CARDS: SafeguardCard[] = [
  {
    num: "01",
    title: "FiLo First-Loss",
    description:
      "Curators who originate loans take the junior tranche — absorbing losses before sUSDai holders are exposed.",
  },
  {
    num: "02",
    title: "CALIBER Framework",
    description:
      "Collateral is held in bankruptcy-remote SPVs with UCC Section 7 bailment — enforceable digital property rights for physical hardware.",
  },
  {
    num: "03",
    title: "Aggressive Amortization",
    description:
      "3-year depreciation vs. industry standard 5–7 years. An LTV starting at 70% can drop to ~40% within a year.",
  },
  {
    num: "04",
    title: "No Oracles",
    description:
      "Oracleless by design. Amortization schedules, independent appraisals, and structured default processes replace price feeds.",
  },
  {
    num: "05",
    title: "QEV Redemptions",
    description:
      "Market-driven redemption queues with 30-day epochs. Bid for priority or earn passively from auction fees — no disorderly exits.",
  },
  {
    num: "06",
    title: "T-Bill Floor",
    description:
      "Capital not deployed into GPU loans earns Treasury Bill yields. Your money is always working, even between loan cycles.",
  },
];

interface HowToCard {
  title: string;
  note: string;
  steps: string[];
  linkLabel: string;
  linkHref: string;
}

const HOWTO_CARDS: HowToCard[] = [
  {
    title: "Staking USDai → sUSDai",
    note: "sUSDai is not 1:1 with USDai — it's a yield-bearing token that appreciates over time. You'll receive fewer sUSDai than the USDai you stake.",
    steps: [
      "Select the amount of USDai you want to stake",
      "Review the terms and conversion rate",
      "Click Approve to allow the contract to spend your USDai",
      "Click Stake to receive sUSDai",
    ],
    linkLabel: "Open App",
    linkHref: EXTERNAL_LINKS.app,
  },
  {
    title: "Unstaking sUSDai → USDai",
    note: "The unstaking period is approximately 30 days. You'll receive more USDai than the sUSDai you unstake, reflecting earned yield.",
    steps: [
      "Select the amount of sUSDai you want to unstake",
      "Review the terms",
      "Click Approve, then Unstake",
      "Go to Activity and click Withdraw once the unstaking period ends",
    ],
    linkLabel: "Full Guide",
    linkHref: EXTERNAL_LINKS.buyStakeGuide,
  },
];

// ─── SVG Components ──────────────────────────────────────────────────────────

function SUSDaiGlyphSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="262"
      height="261"
      viewBox="0 0 262 261"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M97.6898 197.111C107.25 200.874 116.4 203.637 126.692 203.287C136.984 202.936 148.204 199.48 157.573 195.071C166.942 190.663 174.05 183.896 180.989 176.138C187.927 168.381 193.109 159.495 196.501 149.636C199.894 139.778 202.727 129.645 202.028 119.27C201.329 108.895 198.557 98.7925 193.879 89.5706C189.201 80.3487 181.777 74.1287 173.872 67.5427C165.967 60.9566 155.937 61.387 146.076 58.496L125.973 125.272L97.6898 197.111Z"
        fill="#2F2823"
      />
      <path
        d="M143.933 55.3918C163.578 57.089 179.347 69.0559 189.34 82.7136M85.2608 190.368C123.47 218.434 175.288 200.814 195.595 151.876C197.843 146.457 199.467 141.011 200.49 135.613M200.49 135.613L192.558 131.777M200.49 135.613C201.115 132.318 201.516 129.041 201.699 125.799M201.699 125.799L193.843 122.39M201.699 125.799C201.885 122.486 201.844 119.209 201.581 115.987M201.581 115.987L193.848 113.004M201.581 115.987C201.308 112.651 200.797 109.373 200.055 106.174M200.055 106.174L192.997 104.044M200.055 106.174C199.431 103.488 198.644 100.858 197.698 98.295M197.698 98.295L191.719 97.2185M197.698 98.295C196.622 95.3821 195.34 92.5565 193.858 89.8358M193.858 89.8358L188.733 89.1135M193.858 89.8358C192.515 87.3713 191.008 84.9928 189.34 82.7136M189.34 82.7136L184.893 81.8623"
        stroke="#18181B"
        strokeWidth="1.29277"
      />
      <path
        d="M85.2556 190.366C94.8907 197.443 105.391 201.615 116.034 203.113M185.747 169.956L178.872 164.631M185.747 169.956C183.995 172.471 182.144 174.857 180.205 177.109M185.747 169.956C187.39 167.596 188.945 165.121 190.404 162.535M180.205 177.109L173.411 171.492M180.205 177.109C178.314 179.305 176.338 181.374 174.289 183.313M174.289 183.313L167.609 177.832M174.289 183.313C172.068 185.414 169.761 187.362 167.379 189.152M167.379 189.152L161.103 183.528M167.379 189.152C164.901 191.016 162.343 192.709 159.719 194.227M159.719 194.227L153.892 188.581M159.719 194.227C156.967 195.82 154.143 197.22 151.264 198.422M151.264 198.422L145.976 192.99M151.264 198.422C148.347 199.639 145.375 200.653 142.364 201.459M142.364 201.459L137.755 196.603M142.364 201.459C139.417 202.246 136.434 202.834 133.431 203.217M133.431 203.217L129.474 198.868M133.431 203.217C130.28 203.618 127.108 203.793 123.932 203.736M123.932 203.736L120.734 199.938M123.932 203.736C121.298 203.689 118.661 203.483 116.034 203.113M116.034 203.113L113.589 200.396M190.404 162.535L183.573 156.95M190.404 162.535C191.939 159.813 193.368 156.967 194.678 154.001M194.678 154.001C194.989 153.299 195.293 152.589 195.59 151.874L198.099 144.998L190.413 140.734M194.678 154.001L186.993 148.843"
        stroke="#18181B"
        strokeWidth="1.29277"
      />
      <path
        d="M166.117 62.9198C136.422 45.1033 94.8372 59.396 73.3038 95.1812C51.7704 130.966 58.6551 174.34 88.35 192.156C118.045 209.972 159.629 195.679 181.162 159.894C202.695 124.109 195.811 80.7363 166.117 62.9198Z"
        fill="#655343"
        stroke="#18181B"
        strokeWidth="1.29276"
      />
      <path
        d="M159.589 72.0593C133.878 56.6107 97.8643 68.9712 79.2177 100.004C60.5711 131.037 66.5645 168.639 92.2754 184.088C117.986 199.537 154.001 187.175 172.647 156.142C191.294 125.109 185.3 87.508 159.589 72.0593Z"
        fill="#A99482"
        stroke="#18181B"
        strokeWidth="1.29277"
      />
      <path
        d="M117.499 132.502L120.499 114.502L121.499 114.502L144.499 132.502L133.499 144.502L117.499 132.502Z"
        fill="#655343"
      />
      <path
        d="M144.503 132.5L144.501 132.502L148.003 135L137.003 147L134.003 144L144.501 132.502L144.499 132.501L144.503 132.5Z"
        fill="#483B2F"
      />
      <path
        d="M115.003 161.999L127.503 149.998L128.503 149.998L131.503 152.999L118.503 164.999L115.003 161.999Z"
        fill="#483B2F"
      />
      <path
        d="M149.999 127.501L160.499 115L160.999 115L163.999 117.5L152.999 130L149.999 127.501Z"
        fill="#483B2F"
      />
      <path
        d="M114.499 161.502L116.999 141.002L128.499 149.502L115.999 161.002L114.499 161.502Z"
        fill="#655343"
      />
      <path
        d="M160.999 114.502L126.499 90.002L122.003 107.002L149.999 127.502L160.999 114.502Z"
        fill="#655343"
      />
      <path
        d="M88.5033 112.502L125.999 90.002L122.003 107.002L93.5033 123.502L88.5033 112.502Z"
        fill="#655343"
      />
      <path
        d="M88.5033 112.501L125.999 90.001L122.003 107.001L93.5033 123.501L88.5033 112.501Z"
        fill="#F7F3EE"
      />
      <path
        d="M93.5033 124L121.503 106.999L126.503 110.5L98.5033 126.999L93.5033 124Z"
        fill="#978C7F"
      />
      <path
        d="M101.499 141.5L117.503 132.5L121.003 135.501L106.503 145L101.499 141.5Z"
        fill="#978C7F"
      />
      <path
        d="M95.5033 129.5L120.503 114.5L117.503 132L101.003 141.499L95.5033 129.5Z"
        fill="#F7F3EE"
      />
      <path
        d="M105.499 148.5L117.003 141L114.999 161.502L113.999 160.5L105.499 148.5Z"
        fill="#F7F3EE"
      />
      <path
        d="M126.582 89.878L161.138 114.481M126.582 89.878L88.593 112.631L93.6249 123.756M126.582 89.878L121.895 107.03M161.138 114.481L149.67 127.587M161.138 114.481L164.465 117.194L153.253 130.308L149.67 127.587M149.67 127.587L126.582 110.422M93.6249 123.756L98.8278 127.391M93.6249 123.756L121.895 107.03M98.8278 127.391L120.62 114.068M98.8278 127.391L95.8518 129.557L101.312 141.798M126.582 110.422L121.964 106.989L121.895 107.03M126.582 110.422L120.62 114.068M120.62 114.068L144.627 132.595M120.62 114.068L117.455 132.273M117.455 132.273L101.312 141.798M117.455 132.273L121.502 135.328M101.312 141.798L106.565 144.902L121.502 135.328M133.645 144.491L137.467 147.376L148.165 135.602L144.627 132.595M133.645 144.491L144.627 132.595M133.645 144.491L121.502 135.328M117.184 140.825L128.391 149.58M117.184 140.825L105.466 148.652L114.744 162.242M117.184 140.825L114.744 162.242M114.744 162.242L118.634 165.101L131.929 152.675L128.391 149.58M114.744 162.242L128.391 149.58"
        stroke="#18181B"
        strokeWidth="1.29277"
      />
    </svg>
  );
}

// ─── Yield Comparison Chart ──────────────────────────────────────────────────

function generateChartData(numPoints: number) {
  const tbills: number[] = [];
  const defi: number[] = [];
  const susdai: number[] = [];

  // Seeded pseudo-random for determinism
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  };

  // T-Bills: gentle undulation around 4-4.5%
  let tb = 4.2;
  for (let i = 0; i < numPoints; i++) {
    tb += (rand() - 0.5) * 0.15;
    tb = Math.max(3.8, Math.min(4.7, tb));
    tbills.push(tb);
  }

  // DeFi: volatile, jagged, 2-15%
  let df = 6;
  for (let i = 0; i < numPoints; i++) {
    df += (rand() - 0.48) * 2.5;
    if (rand() < 0.08) df += (rand() - 0.4) * 6; // spikes
    df = Math.max(1.5, Math.min(16, df));
    defi.push(df);
  }

  // sUSDai: smooth, steady 10-15%
  let su = 12;
  for (let i = 0; i < numPoints; i++) {
    su += (rand() - 0.5) * 0.3;
    su = Math.max(10, Math.min(14.5, su));
    susdai.push(su);
  }

  return { tbills, defi, susdai };
}

const CHART_DATA = generateChartData(70);
const Y_MAX = 20;
const Y_LABELS = [0, 5, 10, 15, 20];
const ANIMATION_DURATION = 800;
const SUSDAI_DELAY = 200;

function YieldComparisonChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref: inViewRef, isInView } = useInView({ threshold: 0.3 });
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  // Merge refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof inViewRef === "function") {
        (inViewRef as (node: HTMLDivElement | null) => void)(node);
      } else if (inViewRef && "current" in inViewRef) {
        (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [inViewRef],
  );

  const drawLine = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      data: number[],
      color: string,
      lineWidth: number,
      progress: number,
      chartLeft: number,
      chartTop: number,
      chartW: number,
      chartH: number,
    ) => {
      const pointsToDraw = Math.floor(data.length * Math.min(progress, 1));
      if (pointsToDraw < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "bevel";

      for (let i = 0; i < pointsToDraw; i++) {
        const x = chartLeft + (i / (data.length - 1)) * chartW;
        const y = chartTop + chartH - (data[i] / Y_MAX) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Track whether animation has finished so we can redraw on resize
    let animationDone = false;
    let lastP1 = 0;
    let lastP2 = 0;

    const drawFrame = (p1: number, p2: number) => {
      ctx.clearRect(0, 0, width, height);

      // Chart area — extra bottom for x-axis label
      const chartLeft = 40;
      const chartTop = 8;
      const chartW = width - chartLeft - 12;
      const chartH = height - chartTop - 28;

      // Gridlines + Y labels
      ctx.font = "11px system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      for (const val of Y_LABELS) {
        const y = chartTop + chartH - (val / Y_MAX) * chartH;
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillText(`${val}%`, chartLeft - 6, y);
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,0,0,0.05)";
        ctx.lineWidth = 1;
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartLeft + chartW, y);
        ctx.stroke();
      }

      // Y-axis title
      ctx.save();
      ctx.font = "10px system-ui, sans-serif";
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.textAlign = "center";
      ctx.translate(10, chartTop + chartH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("APR %", 0, 0);
      ctx.restore();

      // X-axis title
      ctx.font = "10px system-ui, sans-serif";
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Time", chartLeft + chartW / 2, chartTop + chartH + 10);

      // Lines
      drawLine(ctx, CHART_DATA.tbills, "#B0ADA8", 2, p1, chartLeft, chartTop, chartW, chartH);
      drawLine(ctx, CHART_DATA.defi, "#D4D0CC", 2, p1, chartLeft, chartTop, chartW, chartH);
      drawLine(ctx, CHART_DATA.susdai, "#A99482", 3, p2, chartLeft, chartTop, chartW, chartH);
    };

    const render = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(t, 1), 3);
      lastP1 = easeOut(elapsed / ANIMATION_DURATION);
      lastP2 = easeOut(Math.max(0, (elapsed - SUSDAI_DELAY) / ANIMATION_DURATION));

      drawFrame(lastP1, lastP2);

      if (elapsed < ANIMATION_DURATION + SUSDAI_DELAY) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        animationDone = true;
        lastP1 = 1;
        lastP2 = 1;
      }
    };

    // Redraw on resize (especially after animation is done)
    const onResize = () => {
      resize();
      if (animationDone) {
        drawFrame(lastP1, lastP2);
      }
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    if (isInView) {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, drawLine]);

  return (
    <div>
      <div
        ref={setRefs}
        className="w-full"
        style={{ aspectRatio: "16/9" }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
      <div className="flex justify-center gap-6 mt-4 text-[12px] text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-[2px]" style={{ background: "#B0ADA8" }} />
          T-Bills
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-[2px]" style={{ background: "#D4D0CC" }} />
          DeFi Stablecoins
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-[2px]" style={{ background: "#A99482" }} />
          sUSDai
        </span>
      </div>
    </div>
  );
}

// ─── Section Components ──────────────────────────────────────────────────────

function HeroMetric({
  label,
  isInView,
  target,
  decimals,
  prefix,
  suffix,
  useComma,
  staticValue,
}: {
  label: string;
  isInView: boolean;
  target?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  useComma?: boolean;
  staticValue?: string;
}) {
  const value = useCountUp(target ?? 0, isInView && target !== undefined, 1800);

  let displayValue: string;
  if (staticValue) {
    displayValue = staticValue;
  } else {
    const formatted = value.toFixed(decimals ?? 0);
    displayValue = `${prefix ?? ""}${useComma ? Number(formatted).toLocaleString("en-US") : formatted}${suffix ?? ""}`;
  }

  return (
    <div>
      <div className="text-[10px] max-sm:text-[8px] font-semibold tracking-[1.8px] max-sm:tracking-[1px] uppercase text-secondary mb-1.5">
        {label}
      </div>
      <div className="font-eiko text-[28px] max-sm:text-[18px] font-light text-dark">
        {displayValue}
      </div>
    </div>
  );
}

function HeroSection() {
  const mounted = useMountAnimation();
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section className="relative w-full h-screen min-h-[600px] bg-white p-[10px]">
      {/* Nav above overflow-hidden container */}
      <div className="absolute top-[10px] left-[10px] right-[10px] z-20 px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        <div className="hidden lg:block">
          <Navigation variant="dark" activePage="susdai" />
        </div>
        <div className="lg:hidden">
          <MobileNav variant="dark" activePage="susdai" />
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-[21px]">
        {/* Light gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(to bottom, #DBD0C6, #F7F3EE)" }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 65% 35%, rgba(101,83,67,0.06) 0%, transparent 55%)",
          }}
        />
        {/* Diagonal hatching */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(101,83,67,0.06) 0, rgba(101,83,67,0.06) 1px, transparent 1px, transparent 6px)",
            maskImage:
              "radial-gradient(ellipse at 85% 25%, black 0%, transparent 55%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 85% 25%, black 0%, transparent 55%)",
          }}
        />

        <div className="relative w-full h-full px-4 sm:px-8 md:px-[60px] lg:px-[100px] flex flex-col z-10">
          <div className="flex-1 flex flex-col justify-center">
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className="flex flex-row items-center justify-between w-full gap-10 max-lg:flex-col"
            >
              {/* Left content */}
              <div className="relative z-[1] flex-1 max-w-[600px]">
                {/* Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 w-fit bg-primary/10 border border-primary/20 rounded-full text-[13px] text-primary mb-7">
                  sUSDai · Yield-Bearing Synthetic Dollar
                </div>

                <h1 className="font-eiko font-light text-[clamp(42px,5vw,60px)] text-dark leading-[1.08] max-w-[680px] mb-5">
                  The dollar that <span className="text-primary">earns</span>{" "}
                  from&nbsp;AI.
                </h1>

                <p className="text-[17px] text-primary/70 max-w-[500px] leading-[1.7] mb-10">
                  Stake USDai into sUSDai and earn yield backed by
                  GPU-collateralized loans — the physical backbone of the AI
                  economy.
                </p>

                <div className="flex gap-3.5 mb-[72px] max-sm:flex-col max-sm:mb-10">
                  <Button
                    href={EXTERNAL_LINKS.app}
                    external
                    size="lg"
                    className="px-8 py-3.5 text-[15px]"
                  >
                    Stake USDai &rarr;
                  </Button>
                  <Button
                    href={EXTERNAL_LINKS.susdaiOverview}
                    external
                    variant="ghost"
                    size="lg"
                    pageVariant="dark"
                    className="px-8 py-3.5 text-[15px]"
                  >
                    How It Works
                  </Button>
                </div>

                {/* Metrics */}
                <div className="flex gap-14 pt-8 border-t border-dark/10 max-sm:grid max-sm:grid-cols-4 max-sm:gap-3">
                  <HeroMetric
                    label="Current APR"
                    isInView={isInView}
                    target={5.9}
                    decimals={2}
                    suffix="%"
                  />
                  <HeroMetric
                    label="Target APR"
                    isInView={isInView}
                    staticValue="10–15%"
                  />
                  <HeroMetric
                    label="Total Deposits"
                    isInView={isInView}
                    target={487}
                    decimals={0}
                    prefix="$"
                    suffix="M"
                  />
                  <HeroMetric
                    label="Users"
                    isInView={isInView}
                    target={70735}
                    decimals={0}
                    useComma
                  />
                </div>
              </div>

              {/* Right glyph */}
              <div className="relative z-[1] shrink-0 w-[520px] h-[520px] flex items-center justify-center mx-[60px] max-lg:w-[260px] max-lg:h-[260px] max-lg:mx-0 max-lg:mt-10 max-sm:hidden">
                <SUSDaiGlyphSVG
                  className={`w-full h-auto transition-all duration-[1400ms] cubic-bezier(0.16,1,0.3,1) ${
                    mounted
                      ? "opacity-100 translate-y-0 animate-hero-float"
                      : "opacity-0 translate-y-5"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DefineSection() {
  return (
    <section className="bg-white py-[100px] px-20 max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      {/* Two-column: text left, chart right — 50/50 split */}
      <div className="grid grid-cols-2 gap-12 items-center mb-16 max-lg:grid-cols-1 max-lg:gap-10">
        <div className="max-w-[400px]">
          <Tag color="#DBD0C6" className="mb-5">
            What is sUSDai?
          </Tag>
          <h2 className="font-eiko font-light text-[38px] text-dark leading-[1.15] mb-[18px]">
            Yield from compute,
            <br />
            not speculation.
          </h2>
          <p className="text-[15px] text-text-muted leading-[1.75]">
            sUSDai is a yield-bearing synthetic dollar backed by
            GPU-collateralized loans — the physical backbone of the AI economy.
            Stake USDai and earn from real infrastructure demand, not token
            emissions or leveraged speculation.
          </p>
        </div>

        <div className="border border-feldspar-dust rounded-[16px] p-6 bg-[#FAFAF8]">
          <YieldComparisonChart />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
        {DEFINE_STEPS.map((step) => (
          <div
            key={step.num}
            className="pt-9 pb-9 px-8 border-t-2 border-feldspar-dust transition-colors hover:border-secondary"
          >
            <span className="font-eiko text-[36px] font-light text-feldspar-dust mb-4 block">
              {step.num}
            </span>
            <h4 className="font-eiko text-[20px] font-normal text-dark mb-2.5">
              {step.title}
            </h4>
            <p className="text-[13px] text-text-muted leading-[1.65]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const FEATURED_SAFEGUARDS = SAFEGUARD_CARDS.slice(0, 2);
const SECONDARY_SAFEGUARDS = SAFEGUARD_CARDS.slice(2);

function SafeguardsSection() {
  return (
    <section className="bg-white p-[10px]">
      <div className="bg-[#2F2823] rounded-[21px] py-[100px] px-20 max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
        <Tag color="#A99482" className="mb-5">
          Risk Architecture
        </Tag>
        <h2 className="font-eiko font-light text-[38px] text-white leading-[1.15] mb-12 max-w-[550px]">
          Built to protect depositors first.
        </h2>

        {/* Featured cards */}
        <div className="grid grid-cols-2 gap-6 mb-6 max-sm:grid-cols-1">
          {FEATURED_SAFEGUARDS.map((card) => (
            <div
              key={card.num}
              className="border border-[#A99482] rounded-[12px] py-9 px-8 border-l-[3px] border-l-[#A99482] bg-white/5 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            >
              <span className="font-eiko text-[42px] font-light text-[#A99482] mb-4 block">
                {card.num}
              </span>
              <h4 className="font-eiko text-[22px] font-semibold text-white mb-3">
                {card.title}
              </h4>
              <p className="text-[14px] text-white/50 leading-[1.7]">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary cards */}
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          {SECONDARY_SAFEGUARDS.map((card) => (
            <div
              key={card.num}
              className="border border-white/10 rounded-[10px] py-6 px-5 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            >
              <span className="font-eiko text-[28px] font-light text-[#A99482] mb-2 block">
                {card.num}
              </span>
              <h4 className="font-eiko text-[17px] font-normal text-white mb-1.5">
                {card.title}
              </h4>
              <p className="text-[13px] text-white/50 leading-[1.65]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowToSection() {
  return (
    <section className="bg-white py-20 px-20 max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      <div>
        <div className="text-center mb-14">
          <h2 className="font-eiko font-light text-[clamp(26px,3vw,36px)] text-dark mb-3">
            How to stake & unstake
          </h2>
          <p className="text-[15px] text-text-muted max-w-[480px] mx-auto leading-[1.7]">
            Stake USDai to receive sUSDai and begin earning yield from GPU-backed
            lending. Unstake anytime with a ~30 day redemption period.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 max-w-[960px] mx-auto max-sm:grid-cols-1 max-sm:gap-10">
          {HOWTO_CARDS.map((card) => (
            <div key={card.title}>
              <h3 className="font-eiko font-light text-[22px] text-dark mb-2 pb-3 border-b-2 border-secondary">
                {card.title}
              </h3>
              <p className="text-[13px] text-text-muted leading-[1.6] mb-5 italic">
                {card.note}
              </p>
              <ol className="flex flex-col gap-0">
                {card.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3.5 py-3 text-[14px] text-dark leading-[1.5]"
                  >
                    <span className="shrink-0 font-eiko text-[24px] font-light text-[#A99482]">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <a
                href={card.linkHref}
                className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-medium text-secondary no-underline transition-colors hover:text-primary"
              >
                {card.linkLabel} <span>&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-[100px] px-20 text-center bg-[#1d1a19] max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      <h2 className="font-eiko font-light text-[clamp(28px,3.5vw,40px)] text-white mb-3.5">
        Earn from the rise of modern compute.
      </h2>
      <p className="text-[15px] text-white/40 max-w-[460px] mx-auto mb-9 leading-[1.7]">
        Stake USDai and let the physical infrastructure of AI work for you.
      </p>
      <div className="flex gap-3.5 justify-center max-sm:flex-col max-sm:items-center">
        <Button
          href={EXTERNAL_LINKS.app}
          external
          size="lg"
          className="px-9 py-[15px] text-[15px]"
        >
          Stake USDai &rarr;
        </Button>
        <Button
          href={EXTERNAL_LINKS.docs}
          external
          variant="ghost"
          size="lg"
          pageVariant="light"
          className="px-9 py-[15px] text-[15px]"
        >
          Read the Docs
        </Button>
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SUSDaiContent() {
  return (
    <>
      <HeroSection />
      <DefineSection />
      <SafeguardsSection />
      <HowToSection />
      <CTASection />
      <Footer />
    </>
  );
}
