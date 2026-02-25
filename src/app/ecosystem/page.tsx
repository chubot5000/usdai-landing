import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import MobileNav from "@/components/MobileNav";
import { EcosystemSection } from "@/components/ecosystem";
import Footer from "@/components/Footer";
import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { PAGE_SEO } from "@/lib/config/seo";

/**
 * Generate comprehensive metadata for Ecosystem page
 */
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: PAGE_SEO.ecosystem.title,
    description: PAGE_SEO.ecosystem.description,
    keywords: PAGE_SEO.ecosystem.keywords,
    // ogImage auto-detected from /src/app/opengraph-image.png (root fallback)
    path: "/ecosystem",
    type: "website",
  });
}

export default function EcosystemPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Ecosystem", path: "/ecosystem" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <main className="relative flex w-full flex-1 flex-col items-center text-black bg-[--color-cream] overflow-hidden pt-[10px]">
        <div className="absolute inset-0 bg-dotted opacity-30" />

        {/* Navigation */}
        <div className="relative w-full px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
          <div className="hidden md:block">
            <Navigation variant="dark" activePage="ecosystem" />
          </div>
          <div className="md:hidden">
            <MobileNav activePage="ecosystem" variant="dark" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto">
          <EcosystemSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
