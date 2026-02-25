import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/strapi/types";
import { formatDate } from "@/lib/utils/formatDate";
import { Fragment } from "react";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.cover || "/images/placeholder-blog.jpg";

  return (
    <Link
      href={`/insights/${post.slug}`}
      className="flex flex-col gap-2 font-light md:gap-4 text-[--color-secondary] hover:opacity-80 transition-opacity"
    >
      <Image
        alt={post.title}
        src={imageUrl}
        width={1000}
        height={1000}
        className="object-cover min-w-full h-auto aspect-video border border-outline-minor"
        placeholder={post.blurDataURL ? "blur" : "empty"}
        blurDataURL={post.blurDataURL}
      />
      <div className="flex gap-0.5 md:gap-1 text-sm md:text-base text-[--color-outline-major]">
        {post.tags.map((tag) => (
          <Fragment key={tag}>
            <span>{tag}</span>
            <span className="mx-1 md:mx-2">|</span>
          </Fragment>
        ))}
        <span>{formatDate(post.createdAt)}</span>
      </div>
      <h2 className="text-xl text-left md:text-3xl text-[--color-dark]">
        {post.title}
      </h2>
      <p className="text-sm text-left md:text-base text-[--color-secondary]">
        {post.description}
      </p>
    </Link>
  );
}
