"use client";

import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navigation from "@/components/Navigation";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import {
  useCountUp,
  useInView,
  useMountAnimation,
} from "@/hooks/useAnimateOnScroll";
import { EXTERNAL_LINKS } from "@/lib/constants";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface StatementCard {
  num: number;
  title: string;
  description: string;
}

const STATEMENT_CARDS: StatementCard[] = [
  {
    num: 1,
    title: "Real Revenue, Not Emissions",
    description:
      "Protocol income comes from origination fees and net interest margin on GPU-backed loans — not inflationary token rewards.",
  },
  {
    num: 2,
    title: "Governance That Matters",
    description:
      "CHIP holders vote on risk parameters, curator approvals, fee splits, and treasury allocation through the USD.AI Foundation DAO.",
  },
  {
    num: 3,
    title: "Insurance Module Staking",
    description:
      "Stake CHIP in the safety module to backstop protocol risk. Stakers earn a share of protocol fees proportional to their commitment.",
  },
];

interface ProblemCard {
  title: string;
  description: string;
}

const PROBLEM_CARDS: ProblemCard[] = [
  {
    title: "Traditional Finance",
    description:
      "Banks take up to 24 months to recycle credit. Even nimble private credit funds take 6–12 months to underwrite. If you wait for TradFi, your GPU is already past half its lifecycle.",
  },
  {
    title: "DeFi Today",
    description:
      "DeFi has speed but lacks collateral expertise. Existing protocols weren't designed for depreciating physical hardware with complex valuation requirements.",
  },
  {
    title: "The Structural Mismatch",
    description:
      'AI is at its Fannie Mae moment — the industry needs liquid credit to scale, just as housing needed tradable mortgages to create "the mortgage rate."',
  },
  {
    title: "The USD.AI Solution",
    description:
      "A liquid credit instrument that works at GPU speed. On-chain, instant, transparent — turning GPU hardware into tokenized collateral with real yield.",
  },
];

interface GovernanceCard {
  num: string;
  title: string;
  description: string;
}

const GOVERNANCE_CARDS: GovernanceCard[] = [
  {
    num: "01",
    title: "DAO Rights",
    description:
      "Vote on collateral parameters, fee structures, and new asset types. All protocol changes flow through on-chain CHIP governance.",
  },
  {
    num: "02",
    title: "Treasury Governance",
    description:
      "Vote on allocation of DAO treasury funds for grants, ecosystem development, and protocol initiatives supporting long-term growth.",
  },
  {
    num: "03",
    title: "Insurance Module",
    description:
      "Stake CHIP in the insurance module to protect sUSDai holders against bad debt, earning additional yield for securing the protocol.",
  },
  {
    num: "04",
    title: "Curator Approval",
    description:
      "Approve curators who originate loans and take first-loss positions. Quality control for the lending pipeline, governed by the community.",
  },
  {
    num: "05",
    title: "Protocol Upgrades",
    description:
      "Vote on smart contract upgrades, risk framework changes, and new integrations. Progressive decentralization directed by tokenholders.",
  },
  {
    num: "06",
    title: "Fee Capture",
    description:
      "CHIP captures fees on origination and net interest margin. At $1B in originations, this translates to $30M in annual protocol revenue.",
  },
];

interface TractionStat {
  target: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}

const TRACTION_STATS: TractionStat[] = [
  {
    target: 7.7,
    decimals: 1,
    prefix: "$",
    suffix: "B+",
    label: "sUSDai traded in 2025",
  },
  {
    target: 1.5,
    decimals: 1,
    prefix: "$",
    suffix: "B+",
    label: "Pipeline",
  },
  {
    target: 1.2,
    decimals: 1,
    prefix: "$",
    suffix: "B",
    label: "Approved facilities",
  },
  {
    target: 30,
    decimals: 0,
    prefix: "$",
    suffix: "M",
    label: "Annual revenue at $1B originations",
  },
];

interface RevenueStep {
  num: string;
  title: string;
  description: string;
}

const REVENUE_STEPS: RevenueStep[] = [
  {
    num: "01",
    title: "AI companies borrow",
    description:
      "GPU operators tokenize hardware as collateral and access financing instantly through USD.AI's lending protocol.",
  },
  {
    num: "02",
    title: "Protocol earns fees",
    description:
      "Origination fees and net interest margin flow into the protocol. Real revenue from real lending activity — not token emissions.",
  },
  {
    num: "03",
    title: "CHIP captures value",
    description:
      "Protocol revenue accrues to CHIP holders through governance-directed fee distribution and insurance staking rewards.",
  },
];

// ─── SVG Components ──────────────────────────────────────────────────────────

function ChipGlyphSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="375"
      height="344"
      viewBox="0 0 375 344"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M374.991 52.5736L152.997 40.9609L0.000604568 97.9977L141.578 138.839L374.991 52.5736Z"
        fill="url(#paint0_linear_86445_1390)"
      />
      <path
        d="M141.576 138.839L197.641 308.447L374.992 52.5755L141.576 138.839Z"
        fill="url(#paint1_linear_86445_1390)"
      />
      <path
        d="M141.58 138.841L197.646 308.448L0.00569372 97.9981L141.58 138.841Z"
        fill="url(#paint2_linear_86445_1390)"
      />
      <mask
        id="mask0_86445_1390"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="141"
        y="52"
        width="234"
        height="257"
      >
        <path
          d="M141.579 138.839L197.645 308.447L374.996 52.5755L141.579 138.839Z"
          fill="url(#paint3_linear_86445_1390)"
        />
      </mask>
      <g mask="url(#mask0_86445_1390)">
        <g filter="url(#filter0_f_86445_1390)">
          <path
            d="M392.978 23.603L197.988 331.544L227.869 354.874L435.211 49.7194L392.978 23.603Z"
            fill="#CFC4BA"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_86445_1390"
          x="169.44"
          y="-4.9443"
          width="294.318"
          height="388.367"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="14.2739"
            result="effect1_foregroundBlur_86445_1390"
          />
        </filter>
        <linearGradient
          id="paint0_linear_86445_1390"
          x1="154.628"
          y1="163.717"
          x2="140.762"
          y2="39.7374"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7F3EE" />
          <stop offset="0.725147" stopColor="#DBD0C6" />
          <stop offset="1" stopColor="#CCC1B7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_86445_1390"
          x1="140.352"
          y1="129.459"
          x2="239.046"
          y2="224.483"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A99482" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_86445_1390"
          x1="159.525"
          y1="300.748"
          x2="132.278"
          y2="157.601"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.240385" stopColor="#1D130B" />
          <stop offset="0.956731" stopColor="#352C26" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_86445_1390"
          x1="140.356"
          y1="129.459"
          x2="239.05"
          y2="224.483"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A99482" />
          <stop offset="1" stopColor="#2F2823" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ChipTokenSVG() {
  return (
    <svg
      className="w-[100px] h-[100px] drop-shadow-[0_8px_32px_rgba(47,40,35,0.15)]"
      viewBox="0 0 1578 1737"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="763.999"
        cy="827.331"
        r="642.364"
        fill="black"
        stroke="#A99482"
        strokeWidth="23.3284"
      />
      <path
        d="M1147.55 634.431L694.035 610.707L381.476 727.229L670.707 810.665L1147.55 634.431Z"
        fill="url(#paint0_linear_gov)"
      />
      <path
        d="M670.697 810.665L785.235 1157.16L1147.55 634.435L670.697 810.665Z"
        fill="url(#paint1_linear_gov)"
      />
      <path
        d="M670.684 810.661L785.222 1157.16L381.458 727.223L670.684 810.661Z"
        fill="url(#paint2_linear_gov)"
      />
      <mask
        id="mask0_gov"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="670"
        y="634"
        width="478"
        height="524"
      >
        <path
          d="M670.67 810.665L785.208 1157.16L1147.52 634.435L670.67 810.665Z"
          fill="url(#paint3_linear_gov)"
        />
      </mask>
      <g mask="url(#mask0_gov)">
        <g filter="url(#filter0_f_gov)">
          <path
            d="M1184.26 575.259L785.906 1204.36L846.952 1252.02L1270.54 628.613L1184.26 575.259Z"
            fill="#CFC4BA"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_gov"
          x="727.585"
          y="516.939"
          width="601.271"
          height="793.404"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="29.1605"
            result="effect1_foregroundBlur_gov"
          />
        </filter>
        <linearGradient
          id="paint0_linear_gov"
          x1="697.368"
          y1="861.487"
          x2="669.041"
          y2="608.208"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7F3EE" />
          <stop offset="0.725147" stopColor="#DBD0C6" />
          <stop offset="1" stopColor="#CCC1B7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_gov"
          x1="668.197"
          y1="791.503"
          x2="869.821"
          y2="985.628"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A99482" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_gov"
          x1="707.343"
          y1="1141.42"
          x2="651.681"
          y2="848.986"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.240385" stopColor="#1D130B" />
          <stop offset="0.956731" stopColor="#352C26" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_gov"
          x1="668.17"
          y1="791.503"
          x2="869.794"
          y2="985.628"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A99482" />
          <stop offset="1" stopColor="#2F2823" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Silk Canvas Animation ───────────────────────────────────────────────────

function SilkCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    type SilkLine = {
      y: number;
      amp: number;
      freq: number;
      speed: number;
      offset: number;
      color: string;
      width: number;
    };
    let lines: SilkLine[] = [];

    function initLines() {
      lines = [];
      const count = 8;
      const centerY = height * 0.62;
      const spread = height * 0.14;
      for (let i = 0; i < count; i++) {
        lines.push({
          y: centerY + (Math.random() - 0.5) * spread,
          amp: 80 + Math.random() * 120,
          freq: 0.0015 + Math.random() * 0.002,
          speed: 0.00015 + Math.random() * 0.00015,
          offset: Math.random() * Math.PI * 2,
          color: i % 2 === 0 ? "#E8E0D8" : "#DBD0C6",
          width: 20 + Math.random() * 20,
        });
      }
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = canvas!.width = rect.width;
      height = canvas!.height = rect.height;
      initLines();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const time = Date.now();

      lines.forEach((line) => {
        ctx!.beginPath();
        let first = true;
        for (let x = width + 100; x > -100; x -= 4) {
          const y =
            line.y +
            Math.sin(x * line.freq + time * line.speed + line.offset) *
              line.amp *
              Math.sin(x * line.freq * 0.3 + time * line.speed * 0.5 + line.offset * 2) *
              0.5 +
            Math.sin(x * line.freq + time * line.speed + line.offset) *
              line.amp *
              0.5;
          if (first) {
            ctx!.moveTo(x, y);
            first = false;
          } else {
            ctx!.lineTo(x, y);
          }
        }
        ctx!.strokeStyle = line.color;
        ctx!.globalAlpha = 0.35;
        ctx!.lineWidth = line.width;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

// ─── Conic Gradient Diamond Icon ─────────────────────────────────────────────

const CARD_COLORS = [
  { gradient: "#A99482", bg: "rgba(169,148,130,0.15)" },  // Canyon Wall
  { gradient: "#655343", bg: "rgba(101,83,67,0.15)" },    // Sintered Earth
  { gradient: "#2F2823", bg: "rgba(47,40,35,0.2)" },      // Lignite Mines
];

function ConicDiamondIcon({ colorIndex }: { colorIndex: number }) {
  const color = CARD_COLORS[colorIndex % CARD_COLORS.length];

  return (
    <div
      className="w-[80px] h-[80px] mx-auto mb-6 relative overflow-hidden"
      style={{
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        background: color.bg,
      }}
    >
      <div
        className="absolute inset-[-50%] w-[200%] h-[200%] conic-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${color.gradient} 360deg)`,
          opacity: 0.4,
        }}
      />
    </div>
  );
}

// ─── Section Components ──────────────────────────────────────────────────────

function HeroSection() {
  const mounted = useMountAnimation();

  return (
    <section className="relative w-full h-screen min-h-[600px] bg-white p-[10px]">
      {/* Nav sits above the overflow-hidden container so dropdowns aren't clipped */}
      <div className="absolute top-[10px] left-[10px] right-[10px] z-20 px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        <div className="hidden lg:block">
          <Navigation variant="dark" activePage="chip" />
        </div>
        <div className="lg:hidden">
          <MobileNav variant="dark" activePage="chip" />
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-[21px]">
        {/* Gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, #b8a089 0%, #c9b8a8 25%, #dbd0c6 45%, #ede7df 70%, #f5f1ec 100%)",
          }}
        />

        {/* Hero content area */}
        <div className="absolute inset-0 top-[80px] z-10 flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <div className="relative flex-1 flex items-center overflow-hidden">
              <div className="flex items-center justify-between w-full px-20 max-lg:flex-col max-lg:items-start max-lg:px-10 max-sm:px-6 z-[2]">
                {/* Left text */}
                <div className="max-w-[480px]">
                  <a
                    href={EXTERNAL_LINKS.chipStory}
                    className="inline-flex items-center gap-2 px-4 py-1.5 w-fit bg-white/60 border border-dark/10 rounded-full text-[13px] text-primary mb-5 backdrop-blur-[10px] no-underline transition-colors hover:bg-white/80"
                  >
                    Read About What&apos;s Driving Today&apos;s Interest Rates
                    &rarr;
                  </a>
                  <h1 className="font-eiko font-light text-[clamp(28px,3.2vw,42px)] text-dark leading-[1.08] mb-4">
                    $CHIP scales the interest rate of AI
                  </h1>
                  <p className="text-[17px] text-text-muted max-w-[460px] leading-[1.7] mb-7">
                    CHIP is the governance and fee-capture token of USD.AI, a
                    protocol generating real revenue from AI companies financing
                    GPU infrastructure.
                  </p>
                  <a
                    href={EXTERNAL_LINKS.chipEligibility}
                    className="inline-flex px-7 py-3 bg-white border border-dark/12 rounded-lg text-dark text-sm font-semibold no-underline transition-all hover:bg-feature-bg hover:border-dark/20"
                  >
                    Check $CHIP Eligibility
                  </a>
                </div>

                {/* Glyph */}
                <div className="shrink-0 w-[390px] h-[390px] flex items-center justify-center mr-[120px] max-lg:w-[220px] max-lg:h-[220px] max-lg:mt-10 max-lg:mx-auto max-lg:mr-auto max-sm:w-[180px] max-sm:h-[180px] max-sm:mr-auto">
                  <ChipGlyphSVG
                    className={`w-full h-auto drop-shadow-[0_20px_60px_rgba(47,40,35,0.2)] transition-all duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                      mounted
                        ? "opacity-100 translate-y-0 animate-hero-float"
                        : "opacity-0 translate-y-5"
                    }`}
                  />
                </div>
              </div>

              {/* Foreground terrain image */}
              <div className="absolute -bottom-[30%] md:-bottom-[40%] lg:-bottom-[30%] xl:-bottom-[20%] z-1 pointer-events-none h-full w-full scale-110">
                <Image
                  src="/images/rocks.png"
                  alt=""
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatementSection() {
  return (
    <section className="relative bg-white py-[100px] px-20 overflow-hidden max-lg:py-[80px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      {/* Silk Canvas animation background */}
      <SilkCanvas />
      <div className="relative z-10 text-center mb-[72px]">
        <h2 className="font-eiko font-light text-[clamp(32px,4.5vw,56px)] text-dark leading-[1.15] max-w-[800px] mx-auto mb-6">
          The only token that captures real AI infrastructure growth
        </h2>
        <p className="text-[16px] text-text-muted leading-[1.75] max-w-[640px] mx-auto">
          USD.AI finances GPU infrastructure for AI companies, generating real
          lending revenue. $CHIP is the governance and fee-capture token that
          lets holders direct — and benefit from — every dollar the protocol
          earns.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-8 max-w-[1100px] mx-auto max-lg:gap-5 max-sm:grid-cols-1 max-sm:gap-4">
        {STATEMENT_CARDS.map((card, i) => (
          <div
            key={card.num}
            className="group text-center px-7 py-10 bg-white/90 backdrop-blur-sm border border-outline-minor rounded-xl transition-all duration-300 hover:border-secondary hover:shadow-[0_8px_32px_rgba(47,40,35,0.06)]"
          >
            <ConicDiamondIcon colorIndex={i} />
            <h4 className="font-eiko text-[20px] font-normal text-dark mb-3">
              {card.title}
            </h4>
            <p className="text-[13px] text-text-muted leading-[1.7]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="w-full bg-white p-[10px]">
      <div className="relative w-full overflow-hidden rounded-[21px] bg-[#2f2823]">
        {/* Diagonal hatching texture */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(169,148,130,0.08) 0, rgba(169,148,130,0.08) 1px, transparent 1px, transparent 6px)",
            maskImage:
              "radial-gradient(ellipse at 85% 25%, black 0%, transparent 55%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 85% 25%, black 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 py-[100px] px-20 max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
          <div className="max-w-[560px] mb-16">
            <Tag className="mb-5 !border-white/20 !text-white/70">The Problem</Tag>
            <h2 className="font-eiko font-light text-[38px] text-white leading-[1.15] mb-[18px]">
              Capital can&apos;t keep pace with compute
            </h2>
            <p className="text-[15px] text-white/50 leading-[1.75]">
              GPUs depreciate at roughly 20% per year, but traditional credit
              infrastructure moves at the wrong tempo for hardware that&apos;s
              obsolete in three years.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
            {PROBLEM_CARDS.map((card) => (
              <div
                key={card.title}
                className="px-8 py-9 border-t-2 border-white/15 transition-colors duration-300 hover:border-[#A99482]"
              >
                <h4 className="font-eiko text-[20px] font-normal text-white mb-2.5">
                  {card.title}
                </h4>
                <p className="text-[13px] text-white/50 leading-[1.65]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GovernanceSection() {
  return (
    <section
      className="relative py-[100px] px-20 bg-white overflow-hidden max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6"
    >
      {/* Grid texture overlay (QEV-style) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(169,148,130,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(169,148,130,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
        }}
      />

      <div className="relative z-10">
        {/* Header with token SVG beside it */}
        <div className="flex items-start gap-8 mb-14 max-sm:flex-col max-sm:gap-5">
          <div className="shrink-0 mt-1">
            <ChipTokenSVG />
          </div>
          <div>
            <Tag className="mb-5">CHIP Governance</Tag>
            <h2 className="font-eiko font-light text-[38px] text-dark leading-[1.15]">
              CHIP holders decide the future of GPU-backed lending.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {GOVERNANCE_CARDS.map((card) => (
            <div
              key={card.num}
              className="bg-white/80 backdrop-blur-sm border border-outline-minor rounded-[10px] px-6 py-7 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            >
              <span className="font-eiko text-[32px] font-light text-feldspar-dust mb-3 block">
                {card.num}
              </span>
              <h4 className="font-eiko text-[19px] font-normal text-dark mb-2">
                {card.title}
              </h4>
              <p className="text-[13px] text-text-muted leading-[1.65]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({
  stat,
  isInView,
}: {
  stat: TractionStat;
  isInView: boolean;
}) {
  const value = useCountUp(stat.target, isInView, 1800);

  return (
    <div className="text-center px-5 py-8">
      <div className="font-eiko text-[36px] font-light text-dark mb-2">
        {stat.prefix}
        {value.toFixed(stat.decimals)}
        {stat.suffix}
      </div>
      <div className="text-[13px] text-text-muted leading-[1.5]">
        {stat.label}
      </div>
    </div>
  );
}

function TractionSection() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[100px] px-20 bg-feature-bg max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6"
    >
      <Tag className="mb-5">Traction</Tag>
      <h2 className="font-eiko font-light text-[38px] text-dark leading-[1.15] mb-12">
        Building liquidity that didn&apos;t exist.
      </h2>

      {/* Frame-within-frame stats card with dividers */}
      <div className="border border-outline-minor rounded-[21px] p-10 bg-white max-sm:p-6">
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-2">
          {TRACTION_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`${i > 0 ? "border-l border-outline-minor max-lg:border-l-0" : ""} ${i === 1 ? "max-lg:border-l max-lg:border-outline-minor" : ""} ${i === 3 ? "max-lg:border-l max-lg:border-outline-minor" : ""} ${i >= 2 ? "max-lg:border-t max-lg:border-outline-minor max-lg:pt-6 max-lg:mt-6" : ""}`}
            >
              <StatCounter stat={stat} isInView={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RevenueSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="py-[100px] px-20 max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      <Tag className={`mb-5 transition-colors duration-500 ${isDark ? "!border-white/20 !text-white/70" : ""}`}>How It Works</Tag>
      <h2 className={`font-eiko font-light text-[38px] leading-[1.15] mb-[18px] transition-colors duration-500 ${isDark ? "text-white" : "text-dark"}`}>
        Real revenue from real infrastructure
      </h2>
      <p className={`text-[15px] leading-[1.75] max-w-[600px] mb-12 transition-colors duration-500 ${isDark ? "text-white/50" : "text-text-muted"}`}>
        USD.AI captures fees on origination and net interest margin. Risk is
        managed through first-loss curators who take illiquid positions and
        often originate loans.
      </p>

      {/* Steps with timeline connector */}
      <div className="relative grid grid-cols-3 gap-6 max-lg:grid-cols-1">
        {REVENUE_STEPS.map((step, i) => (
          <div
            key={step.num}
            className="relative px-8 py-9"
          >
            {/* Timeline connector line — centered with circles (desktop only) */}
            {i < REVENUE_STEPS.length - 1 && (
              <div
                className={`absolute h-px transition-colors duration-500 max-lg:hidden ${isDark ? "bg-white/15" : "bg-outline-minor"}`}
                style={{ top: "36px", left: "calc(32px + 56px)", right: "-32px" }}
              />
            )}
            {/* Step number circle */}
            <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 ${isDark ? "bg-[#2f2823] border border-white/20" : "bg-white border border-outline-minor"}`}>
              <span className={`font-eiko text-[20px] font-light transition-colors duration-500 ${isDark ? "text-[#A99482]" : "text-feldspar-dust"}`}>
                {step.num}
              </span>
            </div>
            <h4 className={`font-eiko text-[20px] font-normal mb-2.5 transition-colors duration-500 ${isDark ? "text-white" : "text-dark"}`}>
              {step.title}
            </h4>
            <p className={`text-[13px] leading-[1.65] transition-colors duration-500 ${isDark ? "text-white/50" : "text-text-muted"}`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full bg-white p-[10px]"
    >
      <div className="relative w-full h-[500px] sm:h-[650px] md:h-[700px] lg:h-[800px] overflow-hidden rounded-[21px]">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-[17px] overflow-hidden">
          <Image
            src="/images/cta-bg.webp"
            alt="Data center"
            fill
            className="object-cover rounded-[17px]"
          />
          <div className="absolute inset-0 bg-black/30 rounded-[17px]" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/40 rounded-[17px]" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-8">
          <h2
            className={`font-eiko text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] text-white text-center leading-normal max-w-[900px] mb-3.5 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The interest rate of AI, governed by its holders.
          </h2>
          <p
            className={`text-[15px] text-white/60 mb-9 max-w-[460px] text-center leading-[1.7] transition-all duration-700 delay-100 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            CHIP tokenholders shape the protocol that defines GPU-backed lending.
          </p>
          <div className="flex gap-3.5 justify-center max-sm:flex-col max-sm:items-center">
            <Button
              href={EXTERNAL_LINKS.chipEligibility}
              external
              variant="ghost"
              size="lg"
              className="px-9 py-[15px] text-[15px]"
            >
              Check $CHIP Eligibility &rarr;
            </Button>
            <Button
              href={EXTERNAL_LINKS.docs}
              external
              color="var(--color-secondary)"
              size="lg"
              className="px-9 py-[15px] text-[15px]"
            >
              Read the Docs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Color Scroll Wrapper ────────────────────────────────────────────────────

function ColorScrollWrapper({ children }: { children: (isDark: boolean) => React.ReactNode }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const isInView = rect.top < viewportHeight * 0.5 && rect.bottom > 0;
      const isPastSection = rect.bottom < 0;

      setIsDark(isInView || isPastSection);
    };

    handleScroll();

    const scrollElement = document.querySelector(".simplebar-content-wrapper");
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll, { passive: true });
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      className={`w-full transition-colors duration-500 ${isDark ? "bg-[#2f2823]" : "bg-feature-bg"}`}
    >
      <div ref={triggerRef}>
        {children(isDark)}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CHIPContent() {
  return (
    <>
      <HeroSection />
      <StatementSection />
      <ProblemSection />
      <GovernanceSection />
      <TractionSection />

      <ColorScrollWrapper>
        {(isDark) => (
          <RevenueSection isDark={isDark} />
        )}
      </ColorScrollWrapper>

      <CTASection />
      <Footer />
    </>
  );
}
