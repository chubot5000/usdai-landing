"use client";

import { EXTERNAL_LINKS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./ui/NavLink";
import NavButtons from "./navigation/NavButtons";
import { NAV_ITEMS_COLLAPSED, NavItem } from "./navigation/navItems";
import { NavigationConfig } from "./navigation/types";

function DropdownMenu({
  item,
  variant,
  activePage,
}: {
  item: NavItem;
  variant: "light" | "dark";
  activePage: string;
}) {
  const isLight = variant === "light";
  const textColor = isLight ? "text-white" : "text-[#1d1a19]";
  const isActive =
    activePage === item.pageKey ||
    (activePage === "docs" && item.label === "More") ||
    (activePage === "stories" && item.pageKey === "insights") ||
    item.children?.some(
      (c) =>
        c.href === `/${activePage}` ||
        (activePage === "usdai" && item.pageKey === "deposit") ||
        (activePage === "susdai" && item.pageKey === "deposit") ||
        (activePage === "qev" && item.pageKey === "chip") ||
        (activePage === "caliber" && item.pageKey === "chip") ||
        (activePage === "primitives" && item.pageKey === "chip") ||
        (activePage === "video-timeline" && item.pageKey === "insights")
    );

  const triggerClasses = `text-[14px] tracking-[0.07px] leading-[1.5] hover:opacity-70 transition-opacity ${textColor} ${isActive ? "font-semibold" : ""} cursor-pointer inline-flex items-center gap-1`;

  const TriggerContent = <>{item.label}</>;

  return (
    <div className="relative group pb-3 -mb-3">
      {item.topLevelHref ? (
        item.external ? (
          <a
            href={item.topLevelHref}
            target="_blank"
            rel="noopener noreferrer"
            className={triggerClasses}
          >
            {TriggerContent}
          </a>
        ) : (
          <Link href={item.topLevelHref} className={triggerClasses}>
            {TriggerContent}
          </Link>
        )
      ) : (
        <button
          className={`${triggerClasses} bg-transparent border-none font-[inherit]`}
        >
          {TriggerContent}
        </button>
      )}

      {item.children && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 min-w-[220px] py-2 rounded-xl border transition-all duration-200 opacity-0 invisible pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(47, 40, 35, 0.1)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          {item.children.map((child, i) => (
            <div key={i}>
              {child.dividerBefore && (
                <div
                  className="h-px my-1"
                  style={{ background: "rgba(47, 40, 35, 0.08)" }}
                />
              )}
              {child.external ? (
                <a
                  href={child.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col px-5 py-3 transition-colors hover:bg-black/[0.04]"
                  style={{ textDecoration: "none" }}
                >
                  <span className="text-[14px] font-medium text-[#2F2823]/60 hover:text-[#2F2823]">
                    {child.label}
                  </span>
                  <span className="text-[12px] text-[#2F2823]/35 mt-0.5 leading-snug">
                    {child.description}
                  </span>
                </a>
              ) : (
                <Link
                  href={child.href}
                  className="flex flex-col px-5 py-3 transition-colors hover:bg-black/[0.04]"
                >
                  <span className="text-[14px] font-medium text-[#2F2823]/60">
                    {child.label}
                  </span>
                  <span className="text-[12px] text-[#2F2823]/35 mt-0.5 leading-snug">
                    {child.description}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NavItemRenderer({
  item,
  variant,
  activePage,
}: {
  item: NavItem;
  variant: "light" | "dark";
  activePage: string;
}) {
  if (item.children) {
    return (
      <DropdownMenu item={item} variant={variant} activePage={activePage} />
    );
  }

  return (
    <NavLink
      href={item.topLevelHref || "#"}
      active={activePage === item.pageKey}
      variant={variant}
      external={item.external}
    >
      {item.label}
    </NavLink>
  );
}

export default function Navigation({
  variant = "light",
  activePage = "deposit",
  ctaText = "Get USDai",
  ctaHref = EXTERNAL_LINKS.app,
  ctaColor = "#a99482",
  leftButtonText = "Borrower Login",
  leftButtonHref = EXTERNAL_LINKS.borrowerLogin,
  leftButtonDisabled = false,
}: NavigationConfig) {
  return (
    <nav className="w-full h-[79px] flex items-center justify-between relative z-50">
      {/* Left Logo + Nav Links */}
      <div className="flex items-center gap-6 lg:gap-8">
        <Link href="/" className="relative">
          <div className="relative w-[130px] h-[30px] hidden xl:block">
            <Image
              src={
                variant === "dark"
                  ? "/images/logo-full-lockup-dark.svg"
                  : "/images/logo-full-lockup.svg"
              }
              alt="USD.AI"
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="relative w-[30px] h-[30px] xl:hidden">
            <Image
              src="/images/logo-circle.svg"
              alt="USD.AI"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Nav Links - next to logo below 1300px, with Ecosystem+Docs collapsed into "More" */}
        <div className="flex xl:hidden items-center gap-6 lg:gap-8">
          {NAV_ITEMS_COLLAPSED.map((item) => (
            <NavItemRenderer
              key={item.label}
              item={item}
              variant={variant}
              activePage={activePage}
            />
          ))}
        </div>
      </div>

      {/* Center Nav Links - only visible above 1300px */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-6 lg:gap-8">
        {NAV_ITEMS_COLLAPSED.map((item) => (
          <NavItemRenderer
            key={item.label}
            item={item}
            variant={variant}
            activePage={activePage}
          />
        ))}
      </div>

      {/* Right Buttons */}
      <NavButtons
        leftButtonText={leftButtonText}
        leftButtonHref={leftButtonHref}
        leftButtonDisabled={leftButtonDisabled}
        ctaText={ctaText}
        ctaHref={ctaHref}
        ctaColor={ctaColor}
        variant={variant}
      />
    </nav>
  );
}
