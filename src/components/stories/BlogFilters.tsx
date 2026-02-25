"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import Tag from "./Tag";

interface BlogFiltersProps {
  tags: string[];
  activeTag?: string;
}

export default function BlogFilters({ tags, activeTag }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }

    // Reset to page 1 when filtering
    params.delete("page");

    startTransition(() => {
      router.push(`/insights?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center w-full max-w-screen-xl lg:gap-14">
      <div className="flex overflow-x-auto gap-2 items-center w-full md:w-fit scrollbar-hide">
        <div className="flex gap-2">
          {tags.map((tag) => (
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
  );
}
