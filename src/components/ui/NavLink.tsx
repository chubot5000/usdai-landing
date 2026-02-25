import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode;
  href: string;
  active?: boolean;
  external?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

export default function NavLink({
  children,
  href,
  active = false,
  external = false,
  variant = "light",
  className = "",
}: NavLinkProps) {
  const textColor = variant === "light" ? "text-white" : "text-[#1d1a19]";
  const fontWeight = active ? "font-semibold" : "";

  const combinedClassName =
    `text-[14px] tracking-[0.07px] leading-[1.5] hover:opacity-70 transition-opacity ${textColor} ${fontWeight} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
}
