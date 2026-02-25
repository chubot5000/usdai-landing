import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/strapi/fetchers";
import Navigation from "@/components/Navigation";
import MobileNav from "@/components/MobileNav";
import StoriesClient from "@/components/stories/StoriesClient";
import Footer from "@/components/Footer";
import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { PAGE_SEO } from "@/lib/config/seo";

// Force static generation with on-demand revalidation
export const dynamic = "force-static";
export const revalidate = false; // Only revalidate via API

/**
 * Generate comprehensive metadata for Insights listing page
 */
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: PAGE_SEO.insights.title,
    description: PAGE_SEO.insights.description,
    keywords: PAGE_SEO.insights.keywords,
    // ogImage auto-detected from /src/app/insights/opengraph-image.png
    path: "/insights",
    type: "website",
  });
}

export default async function StoriesPage() {
  // Fetch all posts and tags at build time
  const [allPosts, allTags] = await Promise.all([getAllPosts(), getAllTags()]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <main className="relative flex w-full flex-1 flex-col items-center text-black bg-[--color-cream] overflow-hidden pt-[10px]">
        <div className="absolute inset-0 bg-dotted opacity-30" />

        {/* Navigation */}
        <div className="relative w-full px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
          <div className="hidden md:block">
            <Navigation variant="dark" activePage="insights" />
          </div>
          <div className="md:hidden">
            <MobileNav activePage="insights" variant="dark" />
          </div>
        </div>

        {/* Content */}
        <div className="flex z-10 flex-col flex-wrap flex-1 gap-10 items-center p-4 py-12 md:py-20 w-full max-w-[1440px] mx-auto">
          <StoriesClient allPosts={allPosts} allTags={allTags} />
        </div>
      </main>
      <Footer />
    </>
  );
}
