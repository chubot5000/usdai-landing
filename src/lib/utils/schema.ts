import { SEO_CONFIG } from "@/lib/config/seo";

/**
 * JSON-LD Schema.org structured data generators
 * These help search engines understand the content and improve rich snippet eligibility
 */

export interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

/**
 * Generates Website schema for homepage
 */
export function generateWebsiteSchema(): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
  };
}

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  legalName: string;
  url: string;
  logo: string;
  foundingDate: string;
  description: string;
  sameAs: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    email: string;
  };
}

/**
 * Generates Organization schema
 * Helps establish brand identity in knowledge graphs
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.organization.name,
    legalName: SEO_CONFIG.organization.legalName,
    url: SEO_CONFIG.organization.url,
    logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.organization.logo}`,
    foundingDate: SEO_CONFIG.organization.foundingDate,
    description: SEO_CONFIG.organization.description,
    sameAs: SEO_CONFIG.organization.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: SEO_CONFIG.contactPoint.contactType,
      email: SEO_CONFIG.contactPoint.email,
    },
  };
}

export interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": "Person" | "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
}

/**
 * Generates Article schema for blog posts
 * Enables rich snippets in search results
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
  author?: string;
}): ArticleSchema {
  const articleUrl = `${SEO_CONFIG.siteUrl}/insights/${article.slug}`;
  const imageUrl =
    article.coverImage || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultOgImage}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: imageUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": article.author ? "Person" : "Organization",
      name: article.author || SEO_CONFIG.organization.name,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.organization.name,
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.organization.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generates Breadcrumb schema for navigation
 * Helps search engines understand site structure
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; path: string }>
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SEO_CONFIG.siteUrl}${crumb.path}`,
    })),
  };
}

/**
 * Generates FAQ schema
 * Enables FAQ rich snippets in search results
 */
export interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
