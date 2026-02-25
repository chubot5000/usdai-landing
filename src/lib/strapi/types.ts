import { z } from "zod";

// Post schema for list view
export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  documentId: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string().transform((value) => new Date(value)),
  cover: z
    .object({
      url: z.string(),
    })
    .nullable()
    .transform((cover) => {
      if (!cover) return null;
      const baseUrl = process.env.STRAPI_API_URL || "";
      // Only prepend base URL for relative paths
      return cover.url.startsWith("http")
        ? cover.url
        : `${baseUrl}${cover.url}`;
    }),
});

export const postsSchema = z.array(postSchema);

// Post schema for detail view (includes body)
export const postDetailSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string().transform((value) => new Date(value)),
  body: z.unknown(), // Strapi BlocksContent - complex nested structure
  cover: z
    .object({
      url: z.string(),
    })
    .nullable()
    .transform((cover) => {
      if (!cover) return null;
      const baseUrl = process.env.STRAPI_API_URL || "";
      return cover.url.startsWith("http")
        ? cover.url
        : `${baseUrl}${cover.url}`;
    }),
});

// TypeScript types (base from Zod schemas)
type BasePost = z.infer<typeof postSchema>;
type BasePostDetail = z.infer<typeof postDetailSchema>;

// Extended types with blur placeholder support
export type Post = BasePost & {
  blurDataURL?: string;
};

export type PostDetail = BasePostDetail & {
  blurDataURL?: string;
};

// Query params for fetching posts
export interface GetPostsParams {
  page?: number;
  pageSize?: number;
  tag?: string;
  search?: string;
}

// Pagination metadata
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Response type for paginated posts
export interface PostsResponse {
  posts: Post[];
  pagination: PaginationMeta;
}

// GraphQL response types for Strapi queries
export interface StrapiPostsResponse {
  usdaiPosts: z.infer<typeof postsSchema>;
}

export interface StrapiPostDetailResponse {
  usdaiPosts: z.infer<typeof postDetailSchema>[];
}
