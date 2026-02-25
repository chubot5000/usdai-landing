import { EcosystemPartner } from "./data";

export default function EcosystemCard({
  icon,
  title,
  description,
  tags,
}: EcosystemPartner) {
  return (
    <div className="group p-6 md:p-8 flex flex-col gap-4 h-full border border-[#d6d3d1] rounded-[10px] bg-white hover:border-[#a99482] transition-colors duration-300">
      {/* Icon */}
      <div className="flex-shrink-0">{icon}</div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-[18px] md:text-[20px] text-[#1d1a19] font-medium">
          {title}
        </h3>
        <p className="text-[13px] md:text-[14px] text-[#79716b] leading-[1.5] tracking-[0.07px]">
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-[12px] md:text-[13px] rounded-full border border-[#d6d3d1] text-[#79716b] group-hover:border-[#a99482] group-hover:text-[#a99482] transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
