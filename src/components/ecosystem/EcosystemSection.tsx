"use client";

import { useState } from "react";
import { ECOSYSTEM_DATA, ALL_TAGS } from "./data";
import EcosystemCard from "./EcosystemCard";
import Tag from "../ui/Tag";

export default function EcosystemSection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredData =
    selectedTags.length === 0
      ? ECOSYSTEM_DATA
      : ECOSYSTEM_DATA.filter((item) =>
          selectedTags.some((tag) => item.tags.includes(tag))
        );

  return (
    <section className="w-full py-[60px] md:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        {/* Header */}
        <div className="mb-[40px] md:mb-[60px]">
          <Tag className="mb-4">Partners</Tag>
          <h1 className="font-eiko text-[32px] md:text-[48px] text-[#1d1a19] leading-[1.2] mb-4">
            Ecosystem
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#79716b] max-w-[600px]">
            Our complete ecosystem of partners powering the future of
            decentralized finance.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="mb-[30px] md:mb-[40px]">
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 text-[14px] rounded-full border transition-all duration-300 cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "bg-[#a99482] text-white border-[#a99482]"
                    : "text-[#79716b] border-[#d6d3d1] hover:border-[#a99482] hover:text-[#a99482]"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-4 py-2 text-[14px] rounded-full border border-[#d6d3d1] text-[#79716b] hover:text-[#1d1a19] transition-colors duration-300 cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Partners Grid */}
        {filteredData.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[16px] text-[#79716b]">
              No partners found matching the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.map((partner, index) => (
              <EcosystemCard key={index} {...partner} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
