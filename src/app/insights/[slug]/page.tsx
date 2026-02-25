import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/strapi/fetchers";
import { PostContent } from "@/components/stories";
import Footer from "@/components/Footer";
import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/utils/schema";

// Static generation for all story pages
export const dynamic = "force-static";
export const revalidate = false;

// Pre-build all story pages at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface StoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate comprehensive metadata for article pages
 * Includes Twitter Cards, canonical URLs, and complete Open Graph
 */
export async function generateMetadata({
  params,
}: StoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | USD.AI",
    };
  }

  const metadata = generatePageMetadata({
    title: post.title,
    description: post.description || `Read ${post.title} on USD.AI`,
    keywords: post.tags?.length > 0 ? post.tags : undefined,
    path: `/insights/${slug}`,
    type: "article",
    publishedTime: post.createdAt.toISOString(),
    modifiedTime: post.createdAt.toISOString(),
    tags: post.tags,
  });

  if (post.cover) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [{ url: post.cover }],
    };
    metadata.twitter = {
      ...metadata.twitter,
      images: [post.cover],
    };
  }

  return metadata;
}

export default async function StoryDetailPage({
  params,
}: StoryDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: post.title, path: `/insights/${slug}` },
  ];

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    coverImage: post.cover || undefined,
    publishedAt: post.createdAt.toISOString(),
    updatedAt: post.createdAt.toISOString(),
  });

  return (
    <>
      <Schema data={[articleSchema, generateBreadcrumbSchema(breadcrumbs)]} />
      <main className="min-h-screen">
        <PostContent post={post} />
        <Footer />
      </main>
    </>
  );
}
