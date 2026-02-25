"use client";

import Navigation from "@/components/Navigation";
import MobileNav from "@/components/MobileNav";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
import { EXTERNAL_LINKS } from "@/lib/constants";

// ─── Data ────────────────────────────────────────────────────────────────────

interface EpochStep {
  num: string;
  title: string;
  description: string;
}

const EPOCH_STEPS: EpochStep[] = [
  {
    num: "01",
    title: "Request",
    description:
      "An sUSDai holder submits a redemption request. It enters the current epoch's queue.",
  },
  {
    num: "02",
    title: "Bid",
    description:
      "Want priority? Submit a sealed ZK bid. Higher bids move up the queue. Bids are private until settlement.",
  },
  {
    num: "03",
    title: "Settle",
    description:
      "At epoch close, the queue resolves. Priority bidders exit first. Auction fees are distributed to remaining sUSDai holders.",
  },
  {
    num: "04",
    title: "Earn",
    description:
      "Holders who stay earn a share of QEV auction revenue — turning others' impatience into your yield.",
  },
];

interface Principle {
  num: string;
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    num: "01",
    title: "No bank runs",
    description:
      "Structured epochs eliminate cascading withdrawals. Redemption demand is absorbed in predictable 30-day cycles, not all at once.",
  },
  {
    num: "02",
    title: "Privacy-preserving bids",
    description:
      "ZK private auctions prevent front-running and manipulation. No one sees your bid until settlement — inspired by Flashbots MEV-Boost.",
  },
  {
    num: "03",
    title: "Patience is rewarded",
    description:
      "Staying in the vault earns you a share of auction fees from those who bid for early exit. Passive income from queue dynamics.",
  },
  {
    num: "04",
    title: "Market-driven pricing",
    description:
      "The cost of early exit is set by the market, not governance. When demand to leave is high, priority costs more — natural equilibrium.",
  },
  {
    num: "05",
    title: "Asset-liability alignment",
    description:
      "30-day epochs match the underlying loan structure. The protocol never promises liquidity it doesn't have.",
  },
  {
    num: "06",
    title: "Composable exits",
    description:
      "Redemption positions are tokenized — trade your place in the queue on secondary markets if you can't wait for settlement.",
  },
];

interface ComparisonRow {
  feature: string;
  instant: string;
  lockup: string;
  qev: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Exit timing",
    instant: "Immediate",
    lockup: "Fixed (30–365 days)",
    qev: "30-day epochs, bid for priority",
  },
  {
    feature: "Bank run risk",
    instant: "High — cascading exits",
    lockup: "Low — but inflexible",
    qev: "Eliminated — demand is absorbed",
  },
  {
    feature: "Fair pricing",
    instant: "First-come, first-served",
    lockup: "N/A",
    qev: "Market-driven ZK auctions",
  },
  {
    feature: "Waiting holders",
    instant: "No benefit",
    lockup: "No benefit",
    qev: "Earn auction fees passively",
  },
  {
    feature: "Position flexibility",
    instant: "N/A",
    lockup: "Locked, non-transferable",
    qev: "Tokenized — tradeable on secondary",
  },
];

// ─── Section label used in editorial 2-col layout ────────────────────────────

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
          <Navigation variant="dark" activePage="qev" />
        </div>
        <div className="lg:hidden">
          <MobileNav variant="dark" activePage="qev" />
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-[21px]">
        {/* White background */}
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
                Protocol Mechanism
              </span>
            </div>

            <h1 className="font-eiko font-light text-[clamp(44px,5.5vw,72px)] text-dark leading-[1.06] max-w-[900px] whitespace-nowrap max-lg:whitespace-normal overflow-visible mb-7">
              Queue Extractable Value
            </h1>

            <p className="text-[18px] text-text-muted max-w-[560px] leading-[1.7] mb-12">
              A market-driven redemption mechanism that turns withdrawal
              pressure into an orderly, incentive-aligned process. No bank runs.
              No disorderly exits. Just a queue that prices itself.
            </p>

            <div className="flex gap-7 items-center">
              <a
                href={EXTERNAL_LINKS.qevSpec}
                className="text-sm font-medium text-primary no-underline inline-flex items-center gap-1.5 transition-colors hover:text-dark group"
              >
                Read the specification{" "}
                <span className="transition-transform group-hover:translate-x-[3px]">
                  &rarr;
                </span>
              </a>
              <a
                href={EXTERNAL_LINKS.susdaiOverview}
                className="text-sm font-medium text-primary no-underline inline-flex items-center gap-1.5 transition-colors hover:text-dark group"
              >
                sUSDai overview{" "}
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
      <SectionLabel>The Problem</SectionLabel>
      <div>
        <h2 className="font-eiko font-light text-[32px] text-dark leading-[1.2] mb-6">
          Yield-bearing assets have a liquidity mismatch.
        </h2>
        <p className="text-[15px] text-text-muted leading-[1.8] mb-4 max-w-[600px]">
          sUSDai yield comes from GPU-collateralized loans with 3-year
          amortization schedules. These are{" "}
          <strong className="text-dark font-semibold">
            illiquid by nature
          </strong>{" "}
          — you can&apos;t sell a data center rack in an afternoon.
        </p>
        <p className="text-[15px] text-text-muted leading-[1.8] mb-4 max-w-[600px]">
          Traditional DeFi handles this with instant redemptions, which works
          until it doesn&apos;t. When too many people exit at once, protocols
          face the same bank-run dynamics that plague traditional finance.
        </p>
        <p className="text-[15px] text-text-muted leading-[1.8] max-w-[600px]">
          QEV replaces panic with structure.
        </p>
      </div>
    </section>
  );
}

function MechanismSection() {
  return (
    <section className="py-[100px] px-20 bg-feature-bg relative max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      {/* Grid texture overlay with radial mask */}
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

      {/* Header */}
      <div className="grid grid-cols-[280px_1fr] gap-20 mb-[72px] relative max-lg:grid-cols-1 max-lg:gap-4">
        <SectionLabel>How It Works</SectionLabel>
        <h2 className="font-eiko font-light text-[32px] text-dark leading-[1.2]">
          A 30-day epoch with a built-in market.
        </h2>
      </div>

      {/* Epoch flow */}
      <div className="grid grid-cols-4 gap-0 relative z-[1] max-lg:grid-cols-2 max-lg:gap-8 max-sm:grid-cols-1">
        {/* Connecting line — hidden on tablet/mobile */}
        <div className="absolute top-12 left-[60px] right-[60px] h-0.5 bg-gradient-to-r from-secondary to-feldspar-dust z-0 max-lg:hidden" />

        {EPOCH_STEPS.map((step) => (
          <div key={step.num} className="text-center relative z-[1] group">
            <span className="text-[11px] font-semibold text-secondary tracking-[1.5px]">
              {step.num}
            </span>
            <div className="w-4 h-4 rounded-full border-2 border-secondary bg-feature-bg mx-auto mt-10 mb-6 relative transition-all duration-300 shadow-[0_0_0_4px_rgba(169,148,130,0)] group-hover:bg-secondary group-hover:shadow-[0_0_0_4px_rgba(169,148,130,0.2)]" />
            <h4 className="font-eiko text-[18px] font-normal text-dark mb-2">
              {step.title}
            </h4>
            <p className="text-[12px] text-text-muted leading-[1.6] max-w-[200px] mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="py-[100px] px-20 max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      {/* Header */}
      <div className="grid grid-cols-[280px_1fr] gap-20 mb-16 max-lg:grid-cols-1 max-lg:gap-4">
        <SectionLabel>Design</SectionLabel>
        <h2 className="font-eiko font-light text-[32px] text-dark leading-[1.2] max-w-[480px]">
          Why this works when instant redemptions don&apos;t.
        </h2>
      </div>

      {/* Grid with 1px gap borders */}
      <div className="grid grid-cols-3 gap-px bg-outline-subtle border border-outline-subtle rounded-xl overflow-hidden max-lg:grid-cols-2 max-sm:grid-cols-1">
        {PRINCIPLES.map((p) => (
          <div key={p.num} className="bg-white px-8 py-9">
            <span className="text-[11px] font-semibold text-secondary tracking-[1.5px] mb-4 block">
              {p.num}
            </span>
            <h4 className="font-eiko text-[19px] font-normal text-dark mb-2.5">
              {p.title}
            </h4>
            <p className="text-[13px] text-text-muted leading-[1.65]">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="py-[100px] px-20 bg-feature-bg max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      {/* Header */}
      <div className="grid grid-cols-[280px_1fr] gap-20 mb-14 max-lg:grid-cols-1 max-lg:gap-4">
        <SectionLabel>Comparison</SectionLabel>
        <h2 className="font-eiko font-light text-[32px] text-dark leading-[1.2]">
          QEV vs. traditional redemption models.
        </h2>
      </div>

      {/* Table with horizontal scroll on small screens */}
      <div className="max-lg:overflow-x-auto max-lg:-mx-2 max-lg:px-2">
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-outline-subtle max-lg:min-w-[580px]">
          <thead>
            <tr>
              <th className="text-left px-7 py-[18px] text-[11px] font-semibold tracking-[1.2px] uppercase text-secondary bg-white" />
              <th className="text-left px-7 py-[18px] text-[11px] font-semibold tracking-[1.2px] uppercase text-secondary bg-white">
                Instant Redemption
              </th>
              <th className="text-left px-7 py-[18px] text-[11px] font-semibold tracking-[1.2px] uppercase text-secondary bg-white">
                Lock-up Period
              </th>
              <th className="text-left px-7 py-[18px] text-[11px] font-semibold tracking-[1.2px] uppercase text-primary border-b-2 border-secondary bg-white">
                QEV (USD.AI)
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.feature}>
                <td className="px-7 py-[18px] text-sm font-medium text-primary w-[200px] leading-[1.5]">
                  {row.feature}
                </td>
                <td className="px-7 py-[18px] text-[13px] text-text-muted leading-[1.5]">
                  {row.instant}
                </td>
                <td className="px-7 py-[18px] text-[13px] text-text-muted leading-[1.5]">
                  {row.lockup}
                </td>
                <td className="px-7 py-[18px] text-sm font-medium text-dark bg-[rgba(169,148,130,0.06)] leading-[1.5]">
                  {row.qev}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-[100px] px-20 text-center max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      <h2 className="font-eiko font-light text-[clamp(28px,3.5vw,40px)] text-dark mb-4">
        Read the full specification.
      </h2>
      <p className="text-[15px] text-text-muted mb-9 max-w-[460px] mx-auto leading-[1.7]">
        QEV is documented in detail in the USD.AI protocol docs — architecture,
        auction mechanics, and epoch parameters.
      </p>
      <div className="flex gap-3.5 justify-center max-sm:flex-col max-sm:items-center">
        <Button
          href={EXTERNAL_LINKS.qevSpec}
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
          Get sUSDai
        </Button>
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function QEVContent() {
  return (
    <>
      <HeroSection />

      <div className="bg-feature-bg">
        <ContextSection />
        <MechanismSection />
        <PrinciplesSection />
        <ComparisonSection />
        <CTASection />
      </div>

      <Footer />
    </>
  );
}
