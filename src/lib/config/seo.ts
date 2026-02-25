/**
 * Central SEO configuration for USD.AI
 * Contains site constants, metadata defaults, and social media config
 */

/**
 * Get the site URL dynamically based on environment
 * Priority:
 * 1. NEXT_PUBLIC_VERCEL_URL (auto-injected by Vercel for previews/production)
 * 2. NEXT_PUBLIC_SITE_URL (manual override in .env.local)
 * 3. Fallback to production URL (https://usd.ai)
 */
function getSiteUrl(): string {
  // Manual override from .env.local
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Vercel auto-injects NEXT_PUBLIC_VERCEL_URL (without protocol)
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Production fallback
  return "https://usd.ai";
}

export const SEO_CONFIG = {
  // Core Site Info
  siteName: "USD.AI",
  siteUrl: getSiteUrl(),

  // Default Metadata
  defaultTitle: "USD.AI — The Dollar That Scales AI",
  titleTemplate: "%s | USD.AI",
  defaultDescription:
    "Decentralized lending powered by real GPU hardware. Earn yield through collateralized pools with full on-chain transparency.",

  // Social Media
  twitterHandle: "@USDai_Official",
  locale: "en_US",

  // Organization Info
  organization: {
    name: "USD.AI",
    legalName: "USD.AI",
    url: "https://usd.ai",
    logo: "/images/usdaiLightLogo.svg",
    foundingDate: "2025",
    description:
      "USD.AI provides capital for AI builders through machine-backed credit, offering a new approach to funding outside traditional venture capital.",
    sameAs: [
      "https://twitter.com/USDai_Official",
      // Add other social media profiles as they become available
    ],
  },

  // Contact Info (for structured data)
  contactPoint: {
    contactType: "support",
    email: "hello@usd.ai",
  },

  // Default Open Graph Images (DEPRECATED - using file-based convention)
  // Images now auto-detected from opengraph-image.{png,tsx} files
  defaultOgImage: "/images/og-image.png", // Fallback only
  defaultTwitterImage: "/images/twitter-image.png", // Fallback only

  // Keywords
  defaultKeywords: [
    "USD.AI",
    "stablecoin",
    "AI funding",
    "machine backed credit",
    "DeFi",
    "GPU loans",
    "AI infrastructure",
    "decentralized finance",
    "crypto lending",
  ],
};

/**
 * Page-specific SEO configurations
 */
export const PAGE_SEO = {
  home: {
    title: "USD.AI — The Dollar That Scales AI",
    description:
      "Decentralized lending powered by real GPU hardware. Earn yield through collateralized pools with full on-chain transparency.",
    keywords: [
      "USD.AI",
      "stablecoin",
      "AI funding",
      "machine backed credit",
      "DeFi stablecoin",
      "AI infrastructure financing",
    ],
    // ogImage: "/images/og-image.png", // Now using /src/app/opengraph-image.png
  },
  borrow: {
    title: "Borrow Against Your GPUs",
    description:
      "Unlock liquidity from your AI infrastructure. Get instant loans backed by your GPU fleet with competitive rates and flexible terms.",
    keywords: [
      "GPU loans",
      "borrow against GPUs",
      "AI infrastructure financing",
      "GPU collateral",
      "crypto GPU loans",
      "machine backed credit",
      "AI hardware financing",
    ],
    // ogImage: "/images/og-borrow.png", // Now using /src/app/borrow/opengraph-image.png
  },
  insights: {
    title: "Insights",
    description:
      "Learn about DeFi, AI infrastructure, and the future of machine-backed credit. Expert insights on building with USD.AI.",
    keywords: [
      "DeFi insights",
      "AI funding guide",
      "crypto education",
      "machine learning finance",
      "GPU infrastructure",
      "stablecoin news",
    ],
    // ogImage: "/images/og-insights.png", // Now using /src/app/insights/opengraph-image.png
  },
  ecosystem: {
    title: "Ecosystem",
    description:
      "Explore the USD.AI ecosystem. Partners, integrations, and platforms building the future of AI-backed finance.",
    keywords: [
      "USD.AI ecosystem",
      "DeFi partners",
      "AI finance ecosystem",
      "crypto partnerships",
      "blockchain integrations",
    ],
    // ogImage: "/images/og-image.png", // Using default /src/app/opengraph-image.png
  },
  brandKit: {
    title: "Brand Kit",
    description:
      "Official USD.AI brand assets, logos, and guidelines for partners and press.",
    keywords: ["USD.AI brand", "brand assets", "press kit", "media kit"],
    noIndex: true, // Don't index brand kit page
  },
  usdai: {
    title: "USDai — Fully-Backed Synthetic Dollar",
    description:
      "USDai is a fully-backed synthetic dollar from USD.AI. Instantly redeemable, deeply liquid across DeFi and CeFi, backed by AI infrastructure assets.",
    keywords: [
      "USDai",
      "synthetic dollar",
      "stablecoin",
      "DeFi",
      "fully-backed",
    ],
  },
  susdai: {
    title: "sUSDai — Yield-Bearing Synthetic Dollar",
    description:
      "sUSDai is the yield-bearing synthetic dollar from USD.AI. Earn 10–15% APR backed by GPU-collateralized loans financing AI infrastructure.",
    keywords: ["sUSDai", "yield", "staking", "GPU loans", "APR"],
  },
  chip: {
    title: "$CHIP — Governance & Fee-Capture Token",
    description:
      "CHIP is the governance and fee-capture token of USD.AI, a protocol generating real revenue from AI companies financing GPU infrastructure.",
    keywords: ["CHIP", "governance token", "fee capture", "USD.AI"],
  },
  qev: {
    title: "QEV — Queue Extractable Value",
    description:
      "QEV is USD.AI's market-driven redemption mechanism. Bid for priority in structured 30-day epochs or earn passively from auction fees.",
    keywords: ["QEV", "queue extractable value", "redemption", "USD.AI"],
  },
  caliber: {
    title: "CALIBER — Real-World Asset Tokenization",
    description:
      "CALIBER is USD.AI's framework for tokenizing real-world GPU infrastructure assets with bankruptcy-remote SPVs and enforceable digital property rights.",
    keywords: ["CALIBER", "RWA", "tokenization", "GPU", "USD.AI"],
  },
  primitives: {
    title: "DeFi Primitives — Stackable Protocol Building Blocks",
    description:
      "USD.AI's DeFi primitives are composable building blocks for GPU-backed lending, yield generation, and structured finance.",
    keywords: ["DeFi primitives", "composability", "building blocks", "USD.AI"],
  },
  videoTimeline: {
    title: "Video Timeline — Our Story in Motion",
    description:
      "Watch the USD.AI story unfold through video milestones, product launches, and community moments.",
    keywords: ["USD.AI video", "timeline", "milestones"],
  },
  tokenUnlock: {
    title: "$CHIP Token Unlock Schedule",
    description:
      "View the $CHIP token unlock schedule, vesting timeline, and distribution breakdown for the USD.AI governance token.",
    keywords: ["CHIP unlock", "token vesting", "schedule", "USD.AI"],
  },
};
