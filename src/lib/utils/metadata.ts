import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/config/seo";

export interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  /** @deprecated Use file-based opengraph-image.{png,tsx} instead */
  ogImage?: string;
  /** @deprecated Use file-based twitter-image.{png,tsx} instead */
  twitterImage?: string;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Generates comprehensive metadata for a page
 * Includes title, description, Open Graph, Twitter Cards, canonical URL, and more
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = SEO_CONFIG.defaultKeywords,
    path = "/",
    noIndex = false,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
  } = options;

  // Construct full URL
  const url = `${SEO_CONFIG.siteUrl}${path}`;

  // Build metadata object
  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(", "),

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Open Graph
    // Note: Images auto-detected from opengraph-image.{png,tsx} file convention
    openGraph: {
      title,
      description,
      url,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      type,
      // Images removed - using file-based convention (opengraph-image.{png,tsx})
    },

    // Twitter Card
    // Note: Images auto-detected from twitter-image.{png,tsx} or fallback to opengraph-image
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title,
      description,
      // Images removed - using file-based convention (twitter-image.{png,tsx} or opengraph-image)
    },

    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  // Add article-specific metadata
  if (type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: authors || undefined,
      section,
      tags,
    };
  }

  return metadata;
}

/**
 * Generates metadata for blog posts from Strapi data
 * Note: Images auto-detected from opengraph-image.tsx in [slug] directory
 */
export function generateArticleMetadata(article: {
  title: string;
  description: string;
  slug: string;
  coverImage?: { url: string; alternativeText?: string };
  publishedAt: string;
  updatedAt: string;
  author?: { name: string };
  category?: { name: string };
  tags?: Array<{ name: string }>;
}): Metadata {
  return generatePageMetadata({
    title: article.title,
    description: article.description,
    // ogImage and twitterImage removed - using file-based opengraph-image.tsx
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: article.author ? [article.author.name] : undefined,
    section: article.category?.name,
    tags: article.tags?.map((tag) => tag.name),
    keywords:
      article.tags?.map((tag) => tag.name) || SEO_CONFIG.defaultKeywords,
  });
}
