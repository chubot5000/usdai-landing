"use client";

import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navigation from "@/components/Navigation";
import Button from "@/components/ui/Button";
import { EXTERNAL_LINKS } from "@/lib/constants";

// ─── Data ────────────────────────────────────────────────────────────────────

interface PillarCard {
  role: string;
  name: string;
  description: string;
  linkLabel: string;
  linkHref: string;
}

const PILLAR_CARDS: PillarCard[] = [
  {
    role: "Tokenization → Yield",
    name: "CALIBER",
    description:
      "The legal and tokenization framework that turns physical hardware into enforceable on-chain collateral. UCC Section 7 bailment, bankruptcy-remote SPVs, ERC-721 representations.",
    linkLabel: "Learn about CALIBER",
    linkHref: "/caliber",
  },
  {
    role: "Risk Curation → Scale",
    name: "FiLo",
    description:
      "The risk curation process that enables safe scaling. Modular underwriting, amortization schedules, and appraisal pipelines — purpose-built for assets that depreciate and generate cash flows.",
    linkLabel: "Explore FiLo",
    linkHref: EXTERNAL_LINKS.docs,
  },
  {
    role: "Liquidity → Redemption",
    name: "QEV",
    description:
      "The liquidity system that turns withdrawal pressure into an orderly, incentive-aligned process. Epoch-based redemption queues with auction-driven priority — no bank runs, no disorderly exits.",
    linkLabel: "Learn about QEV",
    linkHref: "/qev",
  },
];

interface TimelineItem {
  year: string;
  name: string;
  fullName: string;
  description: string;
  stats: string;
  analogy: string;
  active?: boolean;
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2023",
    name: "ATM",
    fullName: "Automatic Tranche Maker",
    description:
      "Oracleless lending for low-liquidity assets — NFTs, RWAs, anything without a reliable price feed. Concentrated liquidity positions replace oracles for collateral valuation.",
    stats: "$3M TVL",
    analogy: "Like Uniswap v3 — for oracleless swaps",
  },
  {
    year: "2024",
    name: "LCT",
    fullName: "Liquid Credit Token",
    description:
      "Tradeable yield-bearing tranche positions that rebase on loan repayments. Turns illiquid lending positions into liquid, composable tokens with real-time yield accrual.",
    stats: "$60M TVL",
    analogy: "Like Lido — for credit positions",
  },
  {
    year: "2024",
    name: "ObjectSDK",
    fullName: "Modular Underwriting Framework",
    description:
      "Low-latency appraisals and amortization schedules for new asset classes. A modular underwriting toolkit that lets the protocol onboard DePIN hardware, RWAs, and other capital assets at speed.",
    stats: "20 new assets onboarded",
    analogy: "Like Morpho Blue — for DePIN & RWAs",
  },
  {
    year: "2024",
    name: "Yield Pass",
    fullName: "Yield Stripping for Illiquid Assets",
    description:
      "Strips and isolates yields from productive but illiquid assets like Node Licenses. Separates principal from yield, making locked value accessible and tradeable.",
    stats: "$202M TVL",
    analogy: "Like Pendle — but for NFTs",
  },
  {
    year: "2025",
    name: "USD.AI",
    fullName: "Yield-Bearing Synthetic Dollar",
    description:
      "A synthetic dollar backed by AI hardware loans — the culmination of the stack. Depositors earn real yield from GPU financing, not token emissions or recursive leverage.",
    stats: "10–15% APR target",
    analogy: "Like GLP/HLP — backed by real loans",
    active: true,
  },
  {
    year: "2026",
    name: "QEV-Boost",
    fullName: "Epoch-Based Liquidity Incentive",
    description:
      "Structured redemption queue with auction-based priority. Rewards patient capital and creates a secondary market for queue position — turning exit timing into protocol yield.",
    stats: "Up to 3% protocol yield",
    analogy: "Like Flashbots — for redemptions",
  },
];

// ─── Shared editorial label ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-medium tracking-[1.5px] uppercase text-secondary pt-1.5">
      {children}
    </div>
  );
}

// ─── Section Components ──────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] bg-white p-[10px]">
      {/* Nav above overflow-hidden container */}
      <div className="absolute top-[10px] left-[10px] right-[10px] z-20 px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        <div className="hidden lg:block">
          <Navigation variant="dark" activePage="primitives" />
        </div>
        <div className="lg:hidden">
          <MobileNav variant="dark" activePage="primitives" />
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-[21px]">
        <div className="absolute inset-0 z-0 bg-white" />
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(219,208,198,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(219,208,198,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at 80% 20%, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 80% 20%, black 0%, transparent 70%)",
          }}
        />

        <div className="relative w-full h-full px-4 sm:px-8 md:px-[60px] lg:px-[100px] flex flex-col z-10">
          <div className="flex-1 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-8">
              <span className="w-[3px] h-4 bg-secondary rounded-sm" />
              <span className="text-[12px] font-medium tracking-[1.5px] uppercase text-secondary font-sans">
                Protocol Architecture
              </span>
            </div>

            <h1 className="font-eiko font-light text-[clamp(44px,5.5vw,72px)] text-dark leading-[1.06] max-w-[900px] mb-7 max-sm:text-[36px]">
              Stackable DeFi Primitives
            </h1>

            <p className="text-[18px] text-text-muted max-w-[620px] leading-[1.7] mb-12">
              USD.AI rebuilds the entire DeFi stack to be oracleless —
              purpose-built for capital assets, not just money. Six composable
              primitives. One vertically integrated protocol.
            </p>

            <div className="flex gap-7 items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
              <a
                href={EXTERNAL_LINKS.docs}
                className="text-sm font-medium text-primary no-underline inline-flex items-center gap-1.5 transition-colors hover:text-dark group"
              >
                Read the documentation{" "}
                <span className="transition-transform group-hover:translate-x-[3px]">
                  &rarr;
                </span>
              </a>
              <a
                href={EXTERNAL_LINKS.app}
                className="text-sm font-medium text-primary no-underline inline-flex items-center gap-1.5 transition-colors hover:text-dark group"
              >
                Launch app{" "}
                <span className="transition-transform group-hover:translate-x-[3px]">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContextSection() {
  return (
    <section className="py-[100px] px-20 grid grid-cols-[280px_1fr] gap-20 max-lg:py-[72px] max-lg:px-10 max-lg:grid-cols-1 max-lg:gap-4 max-sm:py-14 max-sm:px-6">
      <SectionLabel>The Thesis</SectionLabel>
      <div>
        <h2 className="font-eiko font-light text-[32px] text-dark leading-[1.2] mb-6">
          DeFi was built for money. Capital assets need different
          infrastructure.
        </h2>
        <p className="text-[15px] text-text-muted leading-[1.8] mb-4 max-w-[600px]">
          Existing DeFi protocols assume liquid, fungible collateral with
          reliable price feeds. That works for ETH and stablecoins. It{" "}
          <strong className="text-dark font-semibold">doesn&apos;t work</strong>{" "}
          for GPUs, node licenses, real-world receivables, or any asset where
          value is earned over time rather than traded on a ticker.
        </p>
        <p className="text-[15px] text-text-muted leading-[1.8] max-w-[600px]">
          USD.AI replaces oracles with mechanism design. Each primitive in the
          stack solves one specific problem — tokenization, underwriting,
          liquidity, yield, redemption — and they compose together into a full
          lending protocol for the physical world.
        </p>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="py-[100px] px-20 bg-feature-bg relative max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(219,208,198,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(219,208,198,0.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at 20% 80%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 20% 80%, black 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="grid grid-cols-[280px_1fr] gap-20 mb-16 relative max-lg:grid-cols-1 max-lg:gap-4">
        <SectionLabel>Three Pillars</SectionLabel>
        <h2 className="font-eiko font-light text-[32px] text-dark leading-[1.2]">
          Yield. Scale. Redemption.
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-8 relative max-lg:grid-cols-1">
        {PILLAR_CARDS.map((card) => (
          <div
            key={card.name}
            className="bg-white border border-outline-subtle rounded-2xl px-8 py-10 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
          >
            <div className="text-[12px] font-medium tracking-[1px] uppercase text-secondary mb-4">
              {card.role}
            </div>
            <div className="font-eiko font-light text-[24px] text-dark mb-2">
              {card.name}
            </div>
            <p className="text-sm text-text-muted leading-[1.7] mb-5">
              {card.description}
            </p>
            <a
              href={card.linkHref}
              className="text-[13px] font-medium text-primary no-underline inline-flex items-center gap-1.5 transition-colors hover:text-dark"
            >
              {card.linkLabel} <span>&rarr;</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="py-[100px] px-20 relative max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      {/* Header */}
      <div className="grid grid-cols-[280px_1fr] gap-20 mb-[72px] max-lg:grid-cols-1 max-lg:gap-4">
        <SectionLabel>Evolution</SectionLabel>
        <h2 className="font-eiko font-light text-[32px] text-dark leading-[1.2]">
          Six primitives. Three years. One composable stack.
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative pl-[60px] max-sm:pl-12">
        {/* Vertical line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-feldspar-dust max-sm:left-[17px]" />

        {TIMELINE_ITEMS.map((item, i) => (
          <div
            key={item.name}
            className={`relative ${i < TIMELINE_ITEMS.length - 1 ? "pb-14" : ""}`}
          >
            {/* Dot */}
            <div
              className={`absolute top-1 w-3.5 h-3.5 rounded-full border-[3px] border-white -left-[49px] max-sm:-left-[43px] ${
                item.active
                  ? "bg-dark shadow-[0_0_0_2px_var(--color-dark),0_0_0_6px_rgba(47,40,35,0.1)]"
                  : "bg-secondary shadow-[0_0_0_2px_var(--color-feldspar-dust)]"
              }`}
            />

            <div className="text-[12px] font-semibold tracking-[1px] uppercase text-secondary mb-2">
              {item.year}
            </div>
            <div className="font-eiko font-light text-[24px] text-dark mb-1">
              {item.name}
            </div>
            <div className="text-[13px] text-text-muted italic mb-3">
              {item.fullName}
            </div>
            <p className="text-sm text-text-muted leading-[1.7] max-w-[560px] mb-3">
              {item.description}
            </p>
            <div className="flex gap-5 flex-wrap">
              <span className="text-[12px] font-medium px-3 py-1 rounded-md bg-feature-bg text-primary">
                {item.stats}
              </span>
              <span className="text-[12px] font-medium px-3 py-1 rounded-md bg-transparent text-secondary border border-feldspar-dust italic">
                {item.analogy}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-[100px] px-20 text-center bg-feature-bg relative max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(219,208,198,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(219,208,198,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
        }}
      />

      <h2 className="font-eiko font-light text-[clamp(28px,3.5vw,40px)] text-dark mb-4 relative">
        Explore the protocol.
      </h2>
      <p className="text-[15px] text-text-muted max-w-[460px] mx-auto mb-10 leading-[1.7] relative">
        Every primitive is documented in detail — architecture, mechanics, and
        parameters. Dive into the docs or start earning yield today.
      </p>
      <div className="flex gap-3.5 justify-center relative max-sm:flex-col max-sm:items-center">
        <Button
          href={EXTERNAL_LINKS.docs}
          external
          size="lg"
          className="px-9 py-[15px] text-[15px]"
        >
          Protocol Docs &rarr;
        </Button>
        <Button
          href={EXTERNAL_LINKS.app}
          external
          variant="ghost"
          size="lg"
          pageVariant="dark"
          className="px-9 py-[15px] text-[15px]"
        >
          Launch App
        </Button>
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PrimitivesContent() {
  return (
    <>
      <HeroSection />

      <div className="bg-feature-bg">
        <ContextSection />
        <PillarsSection />
        <TimelineSection />
        <CTASection />
      </div>

      <Footer />
    </>
  );
}
