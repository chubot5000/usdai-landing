"use client";

import { useState, useMemo } from "react";
import { Post } from "@/lib/strapi/types";
import FeaturedPost from "./FeaturedPost";
import BlogCard from "./BlogCard";
import Tag from "./Tag";

interface StoriesClientProps {
  allPosts: Post[];
  allTags: string[];
}

export default function StoriesClient({
  allPosts,
  allTags,
}: StoriesClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Filter posts based on active tag
  const filteredPosts = useMemo(() => {
    if (!activeTag) return allPosts;
    return allPosts.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
    );
  }, [allPosts, activeTag]);

  // Show featured post only when no filters active
  const showFeatured = !activeTag;
  const featuredPost = showFeatured ? filteredPosts[0] : null;

  // Posts to display (excluding featured if shown)
  const displayPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
    }
  };

  return (
    <>
      {/* Featured Post */}
      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-center w-full max-w-screen-xl lg:gap-14">
        <div className="flex overflow-x-auto gap-2 items-center w-full md:w-fit scrollbar-hide">
          <div className="flex gap-2">
            {allTags.map((tag) => (
              <button
                onClick={() => handleTagClick(tag)}
                key={`${tag}-filter-button`}
              >
                <Tag isSelected={activeTag === tag} label={tag} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {displayPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full flex-1 py-20">
          <h2 className="text-xl text-left md:text-3xl font-light text-[--color-secondary]">
            No posts found
          </h2>
        </div>
      ) : (
        <div className="flex overflow-y-hidden justify-center w-full flex-1">
          <div className="grid grid-cols-1 gap-x-3 gap-y-12 md:gap-y-16 md:gap-x-5 sm:grid-cols-2">
            {displayPosts.map((post) => (
              <BlogCard key={post.documentId} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
