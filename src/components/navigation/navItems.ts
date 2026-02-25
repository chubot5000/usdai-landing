import { EXTERNAL_LINKS } from "@/lib/constants";
import { ActivePage } from "./types";

export interface NavDropdownChild {
  label: string;
  href: string;
  description: string;
  external?: boolean;
  dividerBefore?: boolean;
}

export interface NavItem {
  label: string;
  pageKey: ActivePage;
  topLevelHref?: string;
  external?: boolean;
  children?: NavDropdownChild[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Deposit",
    pageKey: "deposit",
    topLevelHref: "/",
    children: [
      {
        label: "USDai",
        href: "/usdai",
        description: "Fully-backed synthetic dollar",
      },
      {
        label: "sUSDai",
        href: "/susdai",
        description: "Yield-bearing staked USDai",
      },
    ],
  },
  {
    label: "Borrow",
    pageKey: "borrow",
    topLevelHref: "/borrow",
    children: [
      {
        label: "GPU Loans",
        href: "https://gpuloans.com",
        description: "Finance AI infrastructure",
        external: true,
      },
    ],
  },
  {
    label: "Protocol",
    pageKey: "chip",
    children: [
      {
        label: "$CHIP",
        href: "/chip",
        description: "Governance & fee-capture token",
      },
      {
        label: "QEV",
        href: "/qev",
        description: "Queue Extractable Value",
        dividerBefore: true,
      },
      {
        label: "CALIBER",
        href: "/caliber",
        description: "Real-world asset tokenization",
      },
      {
        label: "DeFi Primitives",
        href: "/primitives",
        description: "Stackable protocol building blocks",
      },
    ],
  },
  {
    label: "Insights",
    pageKey: "insights",
    topLevelHref: "/insights",
    children: [
      {
        label: "Video Timeline",
        href: "/video-timeline",
        description: "Our story in motion",
      },
      {
        label: "Blog",
        href: "/insights",
        description: "Research, updates & analysis",
      },
    ],
  },
  {
    label: "Ecosystem",
    pageKey: "ecosystem",
    topLevelHref: "/ecosystem",
  },
  {
    label: "Documentation",
    pageKey: "docs",
    topLevelHref: EXTERNAL_LINKS.docs,
    external: true,
  },
];

// Collapsed version: Ecosystem + Documentation grouped under "Resources"
export const NAV_ITEMS_COLLAPSED: NavItem[] = [
  ...NAV_ITEMS.slice(0, 4),
  {
    label: "Resources",
    pageKey: "ecosystem",
    children: [
      {
        label: "Ecosystem",
        href: "/ecosystem",
        description: "Partners & integrations",
      },
      {
        label: "Documentation",
        href: EXTERNAL_LINKS.docs,
        description: "Technical docs & guides",
        external: true,
      },
    ],
  },
];
