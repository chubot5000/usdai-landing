import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/config/seo";

/**
 * Generates robots.txt
 * Configures crawler access and sitemap location
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
  };
}
