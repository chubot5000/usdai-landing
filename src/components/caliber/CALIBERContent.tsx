"use client";

import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navigation from "@/components/Navigation";
import Button from "@/components/ui/Button";
import { EXTERNAL_LINKS } from "@/lib/constants";

// ─── Data ────────────────────────────────────────────────────────────────────

interface StackLayer {
  num: string;
  title: string;
  description: React.ReactNode;
}

const STACK_LAYERS: StackLayer[] = [
  {
    num: "LAYER 01",
    title: "Physical Asset",
    description: (
      <>
        GPU hardware (H100s, A100s, etc.) sits in a third-party data center
        under a{" "}
        <strong className="text-dark font-semibold">
          UCC Section 7 bailment agreement
        </strong>
        . The data center is the bailee — they hold the hardware but don&apos;t
        own it. This creates a documented chain of custody.
      </>
    ),
  },
  {
    num: "LAYER 02",
    title: "SPV Isolation",
    description: (
      <>
        Each loan is wrapped in a{" "}
        <strong className="text-dark font-semibold">
          bankruptcy-remote Special Purpose Vehicle
        </strong>
        . If the borrower&apos;s business fails, the collateral is legally
        isolated — creditors can&apos;t reach it. The SPV owns the hardware, not
        the borrower.
      </>
    ),
  },
  {
    num: "LAYER 03",
    title: "ERC-721 Token",
    description: (
      <>
        The SPV&apos;s rights are tokenized as an{" "}
        <strong className="text-dark font-semibold">
          ERC-721 NFT on Ethereum
        </strong>
        . This NFT represents enforceable ownership of the underlying hardware —
        not a JPEG, but a legal claim backed by UCC filings and bailment
        receipts.
      </>
    ),
  },
  {
    num: "LAYER 04",
    title: "Protocol Integration",
    description:
      "The ERC-721 token plugs into USD.AI's lending contracts. Smart contracts manage loan terms, interest accrual, and liquidation triggers — all backed by the legal enforceability of the layers below.",
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
    title: "Bankruptcy-remote",
    description:
      "SPV isolation means borrower insolvency doesn't affect collateral. Lenders have a direct, enforceable claim on the hardware through the SPV structure.",
  },
  {
    num: "02",
    title: "UCC enforceability",
    description:
      "Section 7 bailment creates a recognized legal framework for holding physical goods. Not a crypto experiment — a centuries-old commercial law applied to GPUs.",
  },
  {
    num: "03",
    title: "On-chain transparency",
    description:
      "Every collateral position is visible on Ethereum. ERC-721 tokens carry metadata linking to independent appraisals, UCC filings, and bailment documentation.",
  },
  {
    num: "04",
    title: "Independent appraisals",
    description:
      "Hardware is valued by third-party appraisers, not price oracles. Depreciation schedules and market comps replace volatile price feeds.",
  },
  {
    num: "05",
    title: "Structured liquidation",
    description:
      "Default doesn't mean fire sales. The SPV enables orderly disposition — hardware can be remarketed, re-leased, or sold through established channels.",
  },
  {
    num: "06",
    title: "Off-balance-sheet",
    description:
      "SPV structure keeps collateral off the borrower's balance sheet. Clean accounting treatment enables institutional borrowers to participate.",
  },
];

interface ComparisonRow {
  feature: string;
  defi: string;
  tradfi: string;
  caliber: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Collateral type",
    defi: "Tokens only",
    tradfi: "Physical, but off-chain",
    caliber: "Physical hardware, on-chain rights",
  },
  {
    feature: "Legal enforceability",
    defi: "Smart contract only",
    tradfi: "Full legal stack",
    caliber: "Full legal stack + smart contracts",
  },
  {
    feature: "Bankruptcy protection",
    defi: "None",
    tradfi: "SPV-based",
    caliber: "SPV-based + on-chain verification",
  },
  {
    feature: "Transparency",
    defi: "On-chain",
    tradfi: "Quarterly reports",
    caliber: "Real-time on-chain + legal docs",
  },
  {
    feature: "Valuation",
    defi: "Price oracles",
    tradfi: "Periodic appraisals",
    caliber: "Independent appraisals, no oracles",
  },
  {
    feature: "Settlement",
    defi: "Instant (but volatile)",
    tradfi: "Weeks to months",
    caliber: "Structured, orderly disposition",
  },
];

// ─── Shared editorial label ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-semibold tracking-[1.5px] uppercase text-secondary pt-1.5">
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
          <Navigation variant="dark" activePage="caliber" />
        </div>
        <div className="lg:hidden">
          <MobileNav variant="dark" activePage="caliber" />
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
              "radial-gradient(ellipse at 75% 30%, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 75% 30%, black 0%, transparent 65%)",
          }}
        />

        <div className="relative w-full h-full px-4 sm:px-8 md:px-[60px] lg:px-[100px] flex flex-col z-10">
          <div className="flex-1 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-8">
              <span className="w-[3px] h-4 bg-secondary rounded-sm" />
              <span className="text-[12px] font-semibold tracking-[1.5px] uppercase text-secondary">
                Legal Framework
              </span>
            </div>

            <h1 className="font-eiko font-light text-[clamp(44px,5.5vw,72px)] text-dark leading-[1.06] max-w-[900px] mb-7">
              CALIBER
            </h1>

            <p className="text-[18px] text-text-muted max-w-[580px] leading-[1.7] mb-12">
              Collateral Architecture for Legally Interoperable,
              Bankruptcy-remote, Enforceable Rights. The legal and tokenization
              layer that makes physical GPU hardware programmable as on-chain
              collateral.
            </p>

            <div className="flex gap-7 items-center">
              <a
                href={EXTERNAL_LINKS.caliberSpec}
                className="text-sm font-medium text-primary no-underline inline-flex items-center gap-1.5 transition-colors hover:text-dark group"
              >
                Read the specification{" "}
                <span className="transition-transform group-hover:translate-x-[3px]">
                  &rarr;
                </span>
              </a>
              <a
                href={EXTERNAL_LINKS.collateralLifecycle}
                className="text-sm font-medium text-primary no-underline inline-flex items-center gap-1.5 transition-colors hover:text-dark group"
              >
                Collateral lifecycle{" "}
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
          DeFi can&apos;t touch physical assets without a legal bridge.
        </h2>
        <p className="text-[15px] text-text-muted leading-[1.8] mb-4 max-w-[600px]">
          GPU hardware sits in data centers — physical, depreciating, and
          governed by real-world law. Smart contracts alone can&apos;t enforce a
          lien on a rack of H100s. If a borrower defaults, you need{" "}
          <strong className="text-dark font-semibold">legal recourse</strong>,
          not just an oracle.
        </p>
        <p className="text-[15px] text-text-muted leading-[1.8] max-w-[600px]">
          Traditional securitization solves this for mortgages and auto loans,
          but it&apos;s slow, expensive, and opaque. CALIBER takes the same
          legal principles and makes them{" "}
          <strong className="text-dark font-semibold">
            on-chain, transparent, and enforceable
          </strong>
          .
        </p>
      </div>
    </section>
  );
}

function StackSection() {
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
        <SectionLabel>The Stack</SectionLabel>
        <h2 className="font-eiko font-light text-[32px] text-dark leading-[1.2]">
          Four layers from hardware to on-chain rights
        </h2>
      </div>

      {/* Stack layers */}
      <div className="flex flex-col gap-0.5 max-w-[800px] mx-auto relative z-[1]">
        {STACK_LAYERS.map((layer, i) => (
          <div key={layer.num}>
            {/* Connector between layers */}
            {i > 0 && <div className="w-0.5 h-3 bg-secondary/40 mx-auto" />}
            <div
              className={`grid grid-cols-[160px_1fr] gap-0 bg-white border border-outline-subtle overflow-hidden transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(47,40,35,0.06)] max-lg:grid-cols-[120px_1fr] max-sm:grid-cols-1 ${
                i === 0
                  ? "rounded-t-xl"
                  : i === STACK_LAYERS.length - 1
                    ? "rounded-b-xl"
                    : ""
              }`}
            >
              <div className="px-6 py-7 bg-feature-bg border-r border-outline-subtle flex flex-col justify-center max-sm:border-r-0 max-sm:border-b max-sm:border-outline-subtle">
                <span className="text-[11px] font-semibold tracking-[1.5px] text-secondary mb-1">
                  {layer.num}
                </span>
                <h4 className="font-eiko text-[17px] font-normal text-dark">
                  {layer.title}
                </h4>
              </div>
              <div className="px-8 py-7 flex items-center">
                <p className="text-[13px] text-text-muted leading-[1.65]">
                  {layer.description}
                </p>
              </div>
            </div>
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
          Why CALIBER works where tokenization alone doesn&apos;t
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
          CALIBER vs. existing collateral models
        </h2>
      </div>

      {/* Table with horizontal scroll on small screens */}
      <div className="max-lg:overflow-x-auto max-lg:-mx-2 max-lg:px-2">
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-outline-subtle max-lg:min-w-[580px]">
          <thead>
            <tr>
              <th className="text-left px-7 py-[18px] text-[11px] font-semibold tracking-[1.2px] uppercase text-secondary bg-white" />
              <th className="text-left px-7 py-[18px] text-[11px] font-semibold tracking-[1.2px] uppercase text-secondary bg-white">
                DeFi (Crypto-Only)
              </th>
              <th className="text-left px-7 py-[18px] text-[11px] font-semibold tracking-[1.2px] uppercase text-secondary bg-white">
                TradFi Securitization
              </th>
              <th className="text-left px-7 py-[18px] text-[11px] font-semibold tracking-[1.2px] uppercase text-primary border-b-2 border-secondary bg-white">
                CALIBER (USD.AI)
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
                  {row.defi}
                </td>
                <td className="px-7 py-[18px] text-[13px] text-text-muted leading-[1.5]">
                  {row.tradfi}
                </td>
                <td className="px-7 py-[18px] text-sm font-medium text-dark bg-[rgba(169,148,130,0.06)] leading-[1.5]">
                  {row.caliber}
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
        Read the full CALIBER specification
      </h2>
      <p className="text-[15px] text-text-muted mb-9 max-w-[460px] mx-auto leading-[1.7]">
        Legal architecture, tokenization flows, and SPV structure — documented
        in detail in the USD.AI protocol docs.
      </p>
      <div className="flex gap-3.5 justify-center max-sm:flex-col max-sm:items-center">
        <Button
          href={EXTERNAL_LINKS.caliberSpec}
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
          Get USDai
        </Button>
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CALIBERContent() {
  return (
    <>
      <HeroSection />

      <div className="bg-feature-bg">
        <ContextSection />
        <StackSection />
        <PrinciplesSection />
        <ComparisonSection />
        <CTASection />
      </div>

      <Footer />
    </>
  );
}
