interface TagProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Tag({
  children,
  color = "#a99482",
  className = "",
}: TagProps) {
  return (
    <div
      className={`inline-flex items-center justify-center px-[11px] py-[1px] h-[28px] rounded-[48px] border ${className}`}
      style={{ borderColor: color }}
    >
      <span
        className="text-[14px] md:text-[16px] tracking-[0.08px] leading-[1.5]"
        style={{ color }}
      >
        {children}
      </span>
    </div>
  );
}
