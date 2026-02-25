import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/strapi/types";

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const imageUrl = post.cover || "/images/placeholder-blog.jpg";

  return (
    <div className="w-full">
      <Link
        href={`/insights/${post.slug}`}
        className="flex relative w-full font-light text-white h-fit"
      >
        <Image
          alt={post.title}
          src={imageUrl}
          width={1000}
          height={1000}
          className="object-contain sm:object-cover min-w-full md:min-h-[500px] sm:h-auto border border-outline-minor"
          priority
          placeholder={post.blurDataURL ? "blur" : "empty"}
          blurDataURL={post.blurDataURL}
        />
      </Link>
    </div>
  );
}
