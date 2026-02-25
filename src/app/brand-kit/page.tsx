import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import BrandKitContent from "@/components/brand-kit/BrandKitContent";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { PAGE_SEO } from "@/lib/config/seo";

/**
 * Generate metadata for Brand Kit page
 * Using noIndex as this is a utility page for partners/press
 */
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: PAGE_SEO.brandKit.title,
    description: PAGE_SEO.brandKit.description,
    keywords: PAGE_SEO.brandKit.keywords,
    path: "/brand-kit",
    noIndex: PAGE_SEO.brandKit.noIndex,
    type: "website",
  });
}

export default function BrandKitPage() {
  return (
    <>
      <main className="relative flex w-full flex-1 flex-col items-center bg-white overflow-hidden pt-[10px]">
        {/* Navigation */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px] w-full">
          <div className="hidden md:block">
            <Navigation variant="dark" />
          </div>
          <div className="md:hidden">
            <MobileNav variant="dark" />
          </div>
        </div>

        {/* Brand Kit Content */}
        <div className="w-full">
          <BrandKitContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
