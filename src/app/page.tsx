import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ProcessInsightsWrapper from "@/components/ProcessInsightsWrapper";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Schema } from "@/components/seo/Schema";
import { getFeaturedPost } from "@/lib/strapi/fetchers";
import { getMetrics, getDeals } from "@/lib/backend/fetchers";
import { generatePageMetadata } from "@/lib/utils/metadata";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from "@/lib/utils/schema";
import { PAGE_SEO } from "@/lib/config/seo";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

// Dynamically import heavy components to reduce initial bundle size
// Note: These are client components, so they'll be code-split automatically
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => <LoadingSkeleton />,
});

const GlobalReachSection = dynamic(
  () => import("@/components/GlobalReachSection"),
  {
    loading: () => <LoadingSkeleton />,
  }
);

export const revalidate = 3600; // 1 hour ISR

/**
 * Generate comprehensive metadata for homepage
 */
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    keywords: PAGE_SEO.home.keywords,
    // ogImage auto-detected from /src/app/opengraph-image.png
    path: "/",
    type: "website",
  });
}

export default async function Home() {
  const [featuredPost, metrics, deals] = await Promise.all([
    getFeaturedPost(),
    getMetrics(),
    getDeals(),
  ]);

  return (
    <>
      {/* Preload hero poster image with high priority for LCP */}
      <link
        rel="preload"
        href="/images/greenland-hero-bg.webp"
        as="image"
        fetchPriority="high"
      />
      <Schema data={[generateWebsiteSchema(), generateOrganizationSchema()]} />
      <main className="min-h-screen">
        <HeroSection featuredPost={featuredPost} metrics={metrics} />
        <FeaturesSection />
        <GlobalReachSection metrics={metrics} deals={deals} />
        <ProcessInsightsWrapper />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
