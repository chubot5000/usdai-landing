import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "sm" | "default" | "lg";
type PageVariant = "light" | "dark";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: string;
  external?: boolean;
  className?: string;
  pageVariant?: PageVariant;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  color = "#a99482",
  external = false,
  className = "",
  pageVariant = "light",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-[6px] whitespace-nowrap leading-normal transition-opacity";

  const sizeStyles = {
    sm: "px-3 py-2 text-[12px] sm:text-[14px]",
    default: "px-4 lg:px-5 py-[10px] text-[14px]",
    lg: "px-[20px] py-[10px] text-[15px] md:text-[16px]",
  }[size];

  const variantStyles =
    variant === "ghost"
      ? pageVariant === "light"
        ? "bg-gray-200/40 text-white"
        : "bg-black/10 text-[#1d1a19]"
      : "text-white";

  const disabledStyles = disabled
    ? "opacity-40 cursor-not-allowed"
    : "hover:opacity-80 cursor-pointer";

  const style = variant === "primary" ? { backgroundColor: color } : undefined;

  const combinedClassName =
    `${baseStyles} ${sizeStyles} ${variantStyles} ${disabledStyles} ${className}`.trim();

  if (disabled) {
    return (
      <span className={combinedClassName} style={style}>
        {children}
      </span>
    );
  }

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
    <Link href={href!} className={combinedClassName} style={style}>
      {children}
    </Link>
  );
}
