export type PageVariant = "light" | "dark";
export type ActivePage =
  | "deposit"
  | "borrow"
  | "insights"
  | "ecosystem"
  | "stories"
  | "docs"
  | "chip"
  | "susdai"
  | "usdai"
  | "qev"
  | "caliber"
  | "primitives"
  | "video-timeline";

export interface NavigationConfig {
  variant?: PageVariant;
  activePage?: ActivePage;
  ctaText?: string;
  ctaHref?: string;
  ctaColor?: string;
  leftButtonText?: string;
  leftButtonHref?: string;
  leftButtonDisabled?: boolean;
}
