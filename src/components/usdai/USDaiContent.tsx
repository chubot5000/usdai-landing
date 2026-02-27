"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navigation from "@/components/Navigation";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { EXTERNAL_LINKS } from "@/lib/constants";
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
    title: "Deposit stablecoins",
    description:
      "USDC or USDT mints USDai 1:1. Fully backed, instantly redeemable at any time.",
  },
  {
    num: "02",
    title: "Hold or use across DeFi",
    description:
      "Deep liquidity on DEXs, lending protocols, and CeFi exchanges. Composable everywhere.",
  },
  {
    num: "03",
    title: "Redeem or stake",
    description:
      "Redeem to stablecoins anytime, or stake into sUSDai to earn yield from GPU-collateralized loans.",
  },
];

interface DualCardData {
  label: string;
  name: string;
  description: string;
  traits: string[];
  href: string;
  variant: "dark" | "light";
}

const DUAL_CARDS: DualCardData[] = [
  {
    label: "Stablecoin",
    name: "USDai",
    description:
      "A fully-backed synthetic dollar for liquidity, payments, and DeFi composability.",
    traits: [
      "Instantly redeemable at all times",
      "Deep secondary market across DeFi + CeFi",
      "No yield — optimized for stability",
      "Low risk, stablecoin-grade",
    ],
    href: "/usdai",
    variant: "dark",
  },
  {
    label: "Yield-Bearing",
    name: "sUSDai",
    description:
      "A yield-bearing synthetic dollar backed by GPU-collateralized loans financing AI infrastructure.",
    traits: [
      "Targeting 10–15% APR",
      "Backed by real AI hardware assets",
      "Senior tranche — FiLo curators absorb losses first",
      "Structured redemptions via QEV",
    ],
    href: "/susdai",
    variant: "light",
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
    title: "Instant Redemption",
    description:
      "USDai can be redeemed for the underlying stablecoins at any time. No lockups, no waiting periods, no withdrawal queues.",
  },
  {
    num: "02",
    title: "Fully Backed",
    description:
      "Every USDai is backed 1:1 by stablecoin reserves. On-chain proof of reserves ensures transparency at all times.",
  },
  {
    num: "03",
    title: "DeFi Composable",
    description:
      "Use USDai across lending protocols, DEXs, and yield strategies. Deep integrations across Ethereum, Arbitrum, and beyond.",
  },
  {
    num: "04",
    title: "CeFi Liquidity",
    description:
      "Available on centralized exchanges and OTC desks. Deep secondary market liquidity for institutional-scale operations.",
  },
  {
    num: "05",
    title: "Yield Optionality",
    description:
      "Hold USDai for stability, or stake into sUSDai at any time to earn yield from GPU-collateralized loans targeting 10–15% APR.",
  },
  {
    num: "06",
    title: "Audited & Immutable",
    description:
      "Smart contracts audited by leading security firms. Oracle-free infrastructure eliminates price manipulation attack vectors.",
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
    title: "Buying USDai",
    note: "USDai is 100% backed by yield-bearing stablecoins and can always be instantly redeemed.",
    steps: [
      "Select your currency and network",
      "Enter the amount you'd like to mint",
      "Review the terms",
      "Click Approve to allow the USDai contract to use your tokens",
      "Click Buy to mint USDai",
    ],
    linkLabel: "Open App",
    linkHref: EXTERNAL_LINKS.app,
  },
  {
    title: "Redeeming USDai",
    note: "Redeem USDai for any supported deposit currency at any time — no waiting period.",
    steps: [
      "Select USDai and choose Redeem",
      "Choose your preferred output currency",
      "Enter the amount to redeem",
      "Click Approve, then Redeem",
    ],
    linkLabel: "Full Guide",
    linkHref: EXTERNAL_LINKS.buyStakeGuide,
  },
];

// ─── SVG Components ──────────────────────────────────────────────────────────

function USDaiGlyphSVG({ className }: { className?: string }) {
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
        d="M97.6938 197.112C107.254 200.875 116.404 203.638 126.696 203.288C136.988 202.937 148.208 199.481 157.577 195.072C166.946 190.664 174.054 183.897 180.992 176.139C187.931 168.382 193.112 159.496 196.505 149.637C199.898 139.779 202.731 129.646 202.032 119.271C201.333 108.896 198.561 98.7935 193.883 89.5715C189.205 80.3496 181.781 74.1297 173.876 67.5436C165.971 60.9575 155.941 61.388 146.08 58.4969L125.977 125.273L97.6938 197.112Z"
        fill="#655343"
      />
      <path
        d="M143.933 55.3928C163.578 57.09 179.347 69.0568 189.34 82.7145M85.2608 190.369C123.47 218.435 175.288 200.815 195.595 151.877C197.843 146.458 199.467 141.012 200.49 135.614M200.49 135.614L192.558 131.778M200.49 135.614C201.115 132.319 201.516 129.042 201.699 125.8M201.699 125.8L193.843 122.391M201.699 125.8C201.885 122.487 201.844 119.21 201.581 115.988M201.581 115.988L193.848 113.004M201.581 115.988C201.308 112.652 200.797 109.374 200.055 106.175M200.055 106.175L192.997 104.045M200.055 106.175C199.431 103.489 198.644 100.859 197.698 98.2959M197.698 98.2959L191.719 97.2195M197.698 98.2959C196.622 95.383 195.34 92.5574 193.858 89.8368M193.858 89.8368L188.733 89.1145M193.858 89.8368C192.515 87.3722 191.008 84.9938 189.34 82.7145M189.34 82.7145L184.893 81.8632"
        stroke="#18181B"
        strokeWidth="1.29277"
      />
      <path
        d="M85.2595 190.366C94.8946 197.443 105.395 201.615 116.037 203.113M185.751 169.956L178.876 164.631M185.751 169.956C183.999 172.471 182.148 174.857 180.209 177.109M185.751 169.956C187.393 167.596 188.949 165.121 190.408 162.535M180.209 177.109L173.415 171.492M180.209 177.109C178.317 179.305 176.342 181.374 174.293 183.313M174.293 183.313L167.613 177.832M174.293 183.313C172.072 185.414 169.764 187.362 167.383 189.152M167.383 189.152L161.107 183.528M167.383 189.152C164.905 191.016 162.347 192.709 159.723 194.227M159.723 194.227L153.896 188.581M159.723 194.227C156.971 195.82 154.147 197.22 151.268 198.422M151.268 198.422L145.98 192.99M151.268 198.422C148.351 199.639 145.379 200.653 142.368 201.459M142.368 201.459L137.759 196.603M142.368 201.459C139.421 202.246 136.438 202.834 133.435 203.217M133.435 203.217L129.477 198.868M133.435 203.217C130.284 203.618 127.112 203.793 123.936 203.736M123.936 203.736L120.738 199.938M123.936 203.736C121.302 203.689 118.665 203.483 116.037 203.113M116.037 203.113L113.593 200.396M190.408 162.535L183.577 156.95M190.408 162.535C191.943 159.813 193.371 156.967 194.682 154.001M194.682 154.001C194.993 153.299 195.296 152.589 195.594 151.874L198.103 144.998L190.417 140.734M194.682 154.001L186.997 148.843"
        stroke="#18181B"
        strokeWidth="1.29277"
      />
      <path
        d="M166.121 62.9207C136.426 45.1043 94.8411 59.397 73.3077 95.1822C51.7743 130.967 58.659 174.341 88.3539 192.157C118.049 209.973 159.633 195.68 181.166 159.895C202.699 124.11 195.815 80.7372 166.121 62.9207Z"
        fill="#A99482"
        stroke="#18181B"
        strokeWidth="1.29276"
      />
      <path
        d="M159.589 72.0603C133.878 56.6117 97.8643 68.9721 79.2177 100.005C60.5711 131.038 66.5645 168.64 92.2754 184.089C117.986 199.538 154.001 187.176 172.647 156.143C191.294 125.11 185.3 87.5089 159.589 72.0603Z"
        fill="#141414"
        stroke="#18181B"
        strokeWidth="1.29277"
      />
      <path
        d="M117.503 132.502L120.503 114.502L121.503 114.502L144.503 132.502L133.503 144.502L117.503 132.502Z"
        fill="#A99482"
      />
      <path
        d="M144.503 132.5L144.501 132.502L148.003 135L137.003 147L134.003 144L144.501 132.502L144.499 132.501L144.503 132.5Z"
        fill="#645346"
      />
      <path
        d="M115.003 162L127.503 149.999L128.503 149.999L131.503 153L118.503 165L115.003 162Z"
        fill="#645346"
      />
      <path
        d="M150.003 127.501L160.503 115L161.003 115L164.003 117.5L153.003 130L150.003 127.501Z"
        fill="#645346"
      />
      <path
        d="M114.503 161.502L117.003 141.002L128.503 149.502L116.003 161.002L114.503 161.502Z"
        fill="#A99482"
      />
      <path
        d="M160.999 114.502L126.499 90.002L122.003 107.002L149.999 127.502L160.999 114.502Z"
        fill="#A99482"
      />
      <path
        d="M88.5033 112.502L125.999 90.002L122.003 107.002L93.5033 123.502L88.5033 112.502Z"
        fill="#655343"
      />
      <path
        d="M88.5073 112.502L126.003 90.002L122.007 107.002L93.5073 123.502L88.5073 112.502Z"
        fill="#F7F3EE"
      />
      <path
        d="M93.5033 124.001L121.503 107L126.503 110.501L98.5033 127L93.5033 124.001Z"
        fill="#978C7F"
      />
      <path
        d="M101.499 141.5L117.503 132.5L121.003 135.501L106.503 145L101.499 141.5Z"
        fill="#978C7F"
      />
      <path
        d="M95.5033 129.501L120.503 114.501L117.503 132.001L101.003 141.5L95.5033 129.501Z"
        fill="#F7F3EE"
      />
      <path
        d="M105.503 148.5L117.007 141L115.003 161.502L114.003 160.5L105.503 148.5Z"
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
      <div className="font-eiko text-[28px] max-sm:text-[18px] font-light text-white">
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
          <Navigation variant="light" activePage="usdai" />
        </div>
        <div className="lg:hidden">
          <MobileNav variant="light" activePage="usdai" />
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-[21px]">
        {/* Dark background */}
        <div className="absolute inset-0 z-0 bg-dark" />
        {/* Radial glow */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 65% 35%, rgba(169,148,130,0.08) 0%, transparent 55%)",
          }}
        />
        {/* Diagonal hatching */}
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

        <div className="relative w-full h-full px-4 sm:px-8 md:px-[60px] lg:px-[100px] flex flex-col z-10">
          <div className="flex-1 flex flex-col justify-center">
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className="flex flex-row items-center justify-between w-full gap-10 relative overflow-hidden max-lg:flex-col"
            >
              {/* Left text */}
              <div className="relative z-[1] flex-1 max-w-[600px]">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 w-fit bg-secondary/12 border border-secondary/20 rounded-full text-[13px] text-secondary mb-7">
                  USDai &middot; Fully-Backed Synthetic Dollar
                </div>
                <h1 className="font-eiko font-light text-[clamp(42px,5vw,60px)] text-white leading-[1.08] max-w-[680px] mb-5">
                  The dollar that{" "}
                  <em className="not-italic text-cream">builds</em>&nbsp;AI.
                </h1>
                <p className="text-[17px] text-white/45 max-w-[500px] leading-[1.7] mb-10">
                  USDai is a fully-backed synthetic dollar — instantly
                  redeemable, deeply liquid, and composable across DeFi and
                  CeFi.
                </p>
                <div className="flex gap-3.5 mb-[72px] max-sm:flex-col max-sm:mb-10">
                  <Button
                    href={EXTERNAL_LINKS.app}
                    external
                    size="lg"
                    className="px-8 py-3.5 text-[15px]"
                  >
                    Get USDai &rarr;
                  </Button>
                  <Button
                    href={EXTERNAL_LINKS.susdaiOverview}
                    external
                    variant="ghost"
                    size="lg"
                    className="px-8 py-3.5 text-[15px]"
                  >
                    How It Works
                  </Button>
                </div>

                {/* Metrics */}
                <div className="flex gap-14 pt-8 border-t border-white/6 max-sm:grid max-sm:grid-cols-4 max-sm:gap-3">
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
                  <HeroMetric
                    label="Redemption"
                    isInView={isInView}
                    staticValue="Instant"
                  />
                  <HeroMetric
                    label="Backing"
                    isInView={isInView}
                    staticValue="1:1"
                  />
                </div>
              </div>

              {/* Glyph */}
              <div className="relative z-[1] shrink-0 w-[520px] h-[520px] flex items-center justify-center mx-[60px] max-lg:w-[260px] max-lg:h-[260px] max-lg:mx-0 max-lg:mt-10 max-sm:hidden">
                <USDaiGlyphSVG
                  className={`w-full h-auto transition-all duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
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
    <section className="py-[100px] px-20 max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      <div className="max-w-[560px] mb-16">
        <Tag className="mb-5">What is USDai?</Tag>
        <h2 className="font-eiko font-light text-[38px] text-dark leading-[1.15] mb-[18px]">
          Stability backed by
          <br />
          real infrastructure.
        </h2>
        <p className="text-[15px] text-text-muted leading-[1.75]">
          A fully-backed synthetic dollar — mint from USDC or USDT, use across
          DeFi, or stake into sUSDai to earn yield.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
        {DEFINE_STEPS.map((step) => (
          <div
            key={step.num}
            className="px-8 py-9 border-t-2 border-outline-minor transition-colors duration-300 hover:border-secondary"
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

function DualCardToggle({ card }: { card: DualCardData }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      className="w-full px-6 py-5 bg-white border border-outline-minor rounded-xl cursor-pointer text-left font-[inherit] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div>
            <span className="text-[10px] font-semibold tracking-[1.5px] uppercase text-secondary">
              {card.label}
            </span>
            <h3 className="font-eiko text-[22px] font-light text-dark m-0">
              {card.name}
            </h3>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 7.5l5 5 5-5" />
        </svg>
      </div>
      <div
        className="overflow-hidden transition-[max-height] duration-400 ease-in-out"
        style={{ maxHeight: open ? "600px" : "0" }}
      >
        <div className="pt-4">
          <p className="text-[13px] text-text-muted leading-[1.65] mb-4">
            {card.description}
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {card.traits.map((trait) => (
              <li
                key={trait}
                className="flex items-start gap-2.5 text-[13px] text-dark leading-[1.5] font-medium"
              >
                <span className="w-[7px] h-[7px] rounded-full shrink-0 mt-[5px] bg-secondary" />
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
}

function DualSection() {
  return (
    <section className="py-[100px] px-20 bg-feature-bg max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      <Tag className="mb-5">Two tokens, one protocol</Tag>
      <h2 className="font-eiko font-light text-[38px] text-dark leading-[1.15] mb-12">
        Stability or yield. You choose.
      </h2>

      {/* Desktop cards */}
      <div className="grid grid-cols-2 gap-6 max-lg:hidden">
        {DUAL_CARDS.map((card) => (
          <a
            key={card.name}
            href={card.href}
            className="flex overflow-hidden bg-white border border-outline-minor rounded-2xl no-underline text-inherit transition-all duration-300 hover:shadow-[0_8px_32px_rgba(47,40,35,0.08)] hover:-translate-y-0.5 group"
          >
            <div className="flex-1 px-7 py-8 flex flex-col justify-start">
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-secondary mb-3">
                {card.label}
              </div>
              <h3 className="font-eiko text-[24px] font-light text-dark mb-2.5">
                {card.name}
              </h3>
              <p className="text-[13px] text-text-muted leading-[1.65] mb-5">
                {card.description}
              </p>
              <ul className="flex flex-col gap-3 list-none">
                {card.traits.map((trait) => (
                  <li
                    key={trait}
                    className="flex items-start gap-2.5 text-[13px] text-dark leading-[1.5] font-medium"
                  >
                    <span className="w-[7px] h-[7px] rounded-full shrink-0 mt-[5px] bg-secondary" />
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`w-[240px] shrink-0 flex items-center justify-center relative overflow-hidden ${
                card.variant === "dark" ? "bg-dark" : "bg-feldspar-dust"
              }`}
            >
              {card.variant === "dark" ? (
                <USDaiGlyphSVG className="w-4/5 h-auto opacity-85 scale-90 transition-all duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100" />
              ) : (
                <SUSDaiGlyphSVG className="w-4/5 h-auto opacity-85 scale-90 transition-all duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100" />
              )}
            </div>
          </a>
        ))}
      </div>

      {/* Mobile toggles */}
      <div className="hidden max-lg:grid gap-3">
        {DUAL_CARDS.map((card) => (
          <DualCardToggle key={card.name} card={card} />
        ))}
      </div>
    </section>
  );
}

function SafeguardsSection() {
  return (
    <section className="py-[100px] px-20 max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      <Tag className="mb-5">Design Principles</Tag>
      <h2 className="font-eiko font-light text-[38px] text-dark leading-[1.15] mb-12 max-w-[550px]">
        Engineered for stability and liquidity.
      </h2>

      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {SAFEGUARD_CARDS.map((card) => (
          <div
            key={card.num}
            className="border border-outline-minor rounded-[10px] px-6 py-7 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
          >
            <span className="font-eiko text-[32px] font-light text-outline-minor mb-3 block">
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
    </section>
  );
}

function HowToSection() {
  return (
    <section className="py-20 px-20 bg-white border-t border-outline-subtle max-md:py-14 max-md:px-6">
      <div className="text-center mb-14">
        <h2 className="font-eiko font-light text-[clamp(26px,3vw,36px)] text-dark mb-3">
          How to buy &amp; redeem USDai
        </h2>
        <p className="text-[15px] text-text-muted max-w-[480px] mx-auto leading-[1.7]">
          Mint USDai from supported stablecoins on Arbitrum or Ethereum. Redeem
          instantly at any time.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-12 max-w-[960px] mx-auto max-md:grid-cols-1 max-md:gap-10">
        {HOWTO_CARDS.map((card) => (
          <div key={card.title}>
            <h3 className="font-eiko font-light text-[22px] text-dark mb-2 pb-3 border-b-2 border-secondary">
              {card.title}
            </h3>
            <p className="text-[13px] text-text-muted leading-[1.6] mb-5 italic">
              {card.note}
            </p>
            <ol className="list-none counter-reset-step">
              {card.steps.map((step, i) => (
                <li
                  key={i}
                  className="py-2.5 text-sm text-dark flex items-baseline gap-3 leading-[1.5]"
                >
                  <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-feature-bg rounded-full text-[12px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <a
              href={card.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-medium text-secondary no-underline transition-colors hover:text-primary"
            >
              {card.linkLabel} &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-dark-primary py-[100px] px-20 text-center max-lg:py-[72px] max-lg:px-10 max-sm:py-14 max-sm:px-6">
      <h2 className="font-eiko font-light text-[clamp(28px,3.5vw,40px)] text-white mb-3.5">
        The dollar that builds AI, wherever it forms.
      </h2>
      <p className="text-[15px] text-white/40 mb-9 max-w-[460px] mx-auto leading-[1.7]">
        Mint USDai from USDC or USDT. Hold it, use it, or stake it for yield.
      </p>
      <div className="flex gap-3.5 justify-center max-sm:flex-col max-sm:items-center">
        <Button
          href={EXTERNAL_LINKS.app}
          external
          size="lg"
          className="px-9 py-[15px] text-[15px]"
        >
          Get USDai &rarr;
        </Button>
        <Button
          href={EXTERNAL_LINKS.docs}
          external
          variant="ghost"
          size="lg"
          className="px-9 py-[15px] text-[15px]"
        >
          Read the Docs
        </Button>
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function USDaiContent() {
  return (
    <>
      <HeroSection />

      <div className="bg-feature-bg">
        <DefineSection />
        <DualSection />
        <SafeguardsSection />
        <HowToSection />
        <CTASection />
      </div>

      <Footer />
    </>
  );
}
