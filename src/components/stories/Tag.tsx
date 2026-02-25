"use client";

interface TagProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, isSelected = false, onClick }: TagProps) {
  return (
    <span
      className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-300 flex items-center shrink-0 cursor-pointer ${
        isSelected
          ? "bg-[--color-secondary] text-[--color-cream] border-[--color-outline-major]"
          : "text-[#A99482] border-[#A99482]"
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      {label}
    </span>
  );
}
