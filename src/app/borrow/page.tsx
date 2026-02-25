import { Metadata } from "next";
import dynamic from "next/dynamic";
import BorrowHeroSection from "@/components/borrow/BorrowHeroSection";
import Footer from "@/components/Footer";
import { Schema } from "@/components/seo/Schema";
import { getFeaturedPost } from "@/lib/strapi/fetchers";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { PAGE_SEO } from "@/lib/config/seo";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

// Dynamically import below-fold sections to reduce initial bundle
const YourStorySection = dynamic(
  () => import("@/components/borrow/YourStorySection"),
  {
    loading: () => <LoadingSkeleton />,
  }
);

const TestimonialSection = dynamic(
  () => import("@/components/borrow/TestimonialSection"),
  {
    loading: () => <LoadingSkeleton />,
  }
);

const SixStepProcessSection = dynamic(
  () => import("@/components/borrow/SixStepProcessSection"),
  {
    loading: () => <LoadingSkeleton />,
  }
);

const AllInOneAppSection = dynamic(
  () => import("@/components/borrow/AllInOneAppSection"),
  {
    loading: () => <LoadingSkeleton />,
  }
);

const BorrowCTASection = dynamic(
  () => import("@/components/borrow/BorrowCTASection"),
  {
    loading: () => <LoadingSkeleton />,
  }
);

export const revalidate = 3600; // 1 hour ISR

/**
 * Generate comprehensive metadata for Borrow page
 */
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: PAGE_SEO.borrow.title,
    description: PAGE_SEO.borrow.description,
    keywords: PAGE_SEO.borrow.keywords,
    // ogImage auto-detected from /src/app/borrow/opengraph-image.png
    path: "/borrow",
    type: "website",
  });
}

export default async function BorrowPage() {
  const featuredPost = await getFeaturedPost();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Borrow", path: "/borrow" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <main className="min-h-screen">
        <BorrowHeroSection featuredPost={featuredPost} />
        <YourStorySection />
        <TestimonialSection />
        <SixStepProcessSection />
        <AllInOneAppSection />
        <BorrowCTASection />
        <Footer />
      </main>
    </>
  );
}
