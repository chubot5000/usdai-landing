import { gql } from "graphql-request";
import { StrapiClient } from "./client";
import { getBlurDataURL } from "../utils/getBlurDataURL";
import {
  postsSchema,
  postDetailSchema,
  Post,
  PostDetail,
  GetPostsParams,
  PostsResponse,
  StrapiPostsResponse,
  StrapiPostDetailResponse,
} from "./types";

const DEFAULT_PAGE_SIZE = 12;

/**
 * Fetch all posts from Strapi with blur placeholders
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const query = gql`
      query {
        usdaiPosts(sort: "createdAt:desc", pagination: { limit: -1 }) {
          slug
          description
          documentId
          title
          createdAt
          tags
          cover {
            url
          }
        }
      }
    `;

    const client = new StrapiClient("posts");
    const response = await client.request<StrapiPostsResponse>(query);

    const posts = postsSchema.parse(response.usdaiPosts);

    // Generate blur data URLs for all posts in parallel
    const postsWithBlur = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        blurDataURL: post.cover ? await getBlurDataURL(post.cover) : undefined,
      }))
    );

    return postsWithBlur;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

/**
 * Fetch paginated posts with optional filtering
 * Uses client-side filtering/pagination for simplicity
 */
export async function getPosts(
  params: GetPostsParams = {}
): Promise<PostsResponse> {
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE, tag, search } = params;

  try {
    // Fetch all posts
    const allPosts = await getAllPosts();

    // Apply filters
    let filteredPosts = allPosts;

    if (tag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower)
      );
    }

    // Calculate pagination
    const total = filteredPosts.length;
    const pageCount = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + pageSize
    );

    return {
      posts: paginatedPosts,
      pagination: {
        page,
        pageSize,
        pageCount,
        total,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      pagination: {
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        pageCount: 0,
        total: 0,
      },
    };
  }
}

/**
 * Fetch a single post by slug with blur placeholder
 */
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const query = gql`
      query ($slug: String!) {
        usdaiPosts(filters: { slug: { eq: $slug } }) {
          slug
          body
          title
          description
          tags
          createdAt
          cover {
            url
          }
        }
      }
    `;

    const client = new StrapiClient(slug);
    const response = await client.request<StrapiPostDetailResponse>(query, {
      slug,
    });

    const posts = response.usdaiPosts;

    if (!posts || posts.length === 0) {
      return null;
    }

    const post = postDetailSchema.parse(posts[0]);

    // Generate blur data URL
    const blurDataURL = post.cover
      ? await getBlurDataURL(post.cover)
      : undefined;

    return {
      ...post,
      blurDataURL,
    };
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const posts = await getAllPosts();
    const allTags = posts.flatMap((post) => post.tags);
    const uniqueTags = [...new Set(allTags)].sort();
    return uniqueTags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

/**
 * Get featured post (first/latest post) for hero sections
 */
export async function getFeaturedPost(): Promise<{
  title: string;
  slug: string;
} | null> {
  try {
    const posts = await getAllPosts();
    if (posts.length === 0) return null;
    return {
      title: posts[0].title,
      slug: posts[0].slug,
    };
  } catch (error) {
    console.error("Error fetching featured post:", error);
    return null;
  }
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
