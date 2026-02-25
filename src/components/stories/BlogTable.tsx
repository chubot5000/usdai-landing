import BlogCard from "./BlogCard";
import { Post } from "@/lib/strapi/types";

interface BlogTableProps {
  posts: Post[];
}

export default function BlogTable({ posts }: BlogTableProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full flex-1">
        <h2 className="text-xl text-left md:text-3xl font-light text-[--color-secondary]">
          No posts found
        </h2>
      </div>
    );
  }

  return (
    <div className="flex overflow-y-hidden justify-center w-full flex-1">
      <div className="grid grid-cols-1 gap-x-3 gap-y-12 md:gap-y-16 md:gap-x-5 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.documentId} post={post} />
        ))}
      </div>
    </div>
  );
}
