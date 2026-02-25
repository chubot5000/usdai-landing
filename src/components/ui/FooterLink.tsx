import Link from "next/link";
import { ReactNode } from "react";

interface FooterLinkProps {
  children: ReactNode;
  href: string;
  external?: boolean;
}

export default function FooterLink({
  children,
  href,
  external = false,
}: FooterLinkProps) {
  const className =
    "text-white hover:opacity-70 transition-opacity text-[14px] md:text-[16px] font-light";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
