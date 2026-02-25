import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SimpleBarWrapper from "@/components/SimpleBarWrapper";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import { SEO_CONFIG } from "@/lib/config/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport configuration for PWA and mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  themeColor: "#000000",
};

export const metadata: Metadata = {
  // CRITICAL: metadataBase enables absolute URLs for OG images
  metadataBase: new URL(SEO_CONFIG.siteUrl),

  // Basic metadata
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.defaultDescription,
  keywords: SEO_CONFIG.defaultKeywords,

  // Icons (using file-based convention: icon.png, apple-icon.png)
  // Only Safari pinned tab remains here (no file convention exists for it)
  icons: {
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
    ],
  },

  // PWA manifest
  manifest: "/site.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: SEO_CONFIG.locale,
    url: SEO_CONFIG.siteUrl,
    siteName: SEO_CONFIG.siteName,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [
      {
        url: SEO_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.defaultTitle,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [SEO_CONFIG.defaultTwitterImage],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification codes (add actual codes when available)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   bing: "your-bing-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SimpleBarWrapper>{children}</SimpleBarWrapper>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
