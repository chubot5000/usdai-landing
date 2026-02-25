import Link from "next/link";
import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  href: string;
  bgColor?: string;
  external?: boolean;
  className?: string;
}

export default function IconButton({
  children,
  href,
  bgColor = "white",
  external = false,
  className = "",
}: IconButtonProps) {
  const baseStyles =
    "flex items-center justify-center w-10 h-10 md:w-[46px] md:h-[46px] rounded-[3px] hover:opacity-80 transition-opacity overflow-hidden";

  const combinedClassName = `${baseStyles} ${className}`.trim();
  const style = { backgroundColor: bgColor };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName} style={style}>
      {children}
    </Link>
  );
}
