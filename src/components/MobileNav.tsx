"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EXTERNAL_LINKS } from "@/lib/constants";
import NavButtons from "./navigation/NavButtons";
import { NAV_ITEMS_COLLAPSED } from "./navigation/navItems";
import { NavigationConfig } from "./navigation/types";

export default function MobileNav({
  activePage = "deposit",
  ctaText = "Get USDai",
  ctaHref = EXTERNAL_LINKS.app,
  ctaColor = "#a99482",
  variant = "light",
  leftButtonText = "Borrow",
  leftButtonHref = "/borrow",
  leftButtonDisabled = false,
}: NavigationConfig) {
  const [isOpen, setIsOpen] = useState(false);

  const isDark = variant === "dark";
  const hamburgerLines = isDark ? "bg-[#2f2823]" : "bg-white";

  return (
    <div className="relative z-50">
      <div className="flex items-center justify-between pt-4">
        {/* Left side: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex flex-col justify-center items-center w-[40px] h-[40px] ${isDark ? "" : "rounded-[6px] bg-white/20 backdrop-blur-[121.95px]"}`}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-[18px] h-[2px] ${hamburgerLines} transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`}
            />
            <span
              className={`block w-[18px] h-[2px] ${hamburgerLines} my-[4px] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[18px] h-[2px] ${hamburgerLines} transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
            />
          </button>

          {/* Logo */}
          <Link href="/" className="relative w-[30px] h-[30px]">
            <Image
              src="/images/logo-circle.svg"
              alt="USD.AI"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Right side: Left Button + CTA */}
        <NavButtons
          leftButtonText={leftButtonText}
          leftButtonHref={leftButtonHref}
          leftButtonDisabled={leftButtonDisabled}
          ctaText={ctaText}
          ctaHref={ctaHref}
          ctaColor={ctaColor}
          variant={variant}
          size="sm"
        />
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 right-0 mt-4 rounded-[10px] overflow-y-auto max-h-[90vh] transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        } ${isDark ? "bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#2f2823]/10" : "border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"}`}
        style={
          isDark
            ? undefined
            : {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }
        }
      >
        <nav className="flex flex-col p-3 gap-0.5">
          {NAV_ITEMS_COLLAPSED.map((item) => {
            if (item.children) {
              return (
                <div key={item.label}>
                  {/* Section Header - always a plain label */}
                  <div
                    className={`pt-2.5 pb-0.5 px-3 text-[10px] uppercase tracking-[1px] font-semibold ${
                      isDark ? "text-[#1d1a19]/30" : "text-white/30"
                    }`}
                  >
                    {item.label}
                  </div>
                  {/* Sub-items in 2-col grid, with overview link promoted as first child */}
                  <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
                    {(() => {
                      const overviewDescs: Record<string, string> = {
                        Deposit: "Earn yield on stablecoins",
                        Borrow: "AI infrastructure financing",
                        Insights: "Research, updates & analysis",
                      };
                      const overviewLabel =
                        item.label === "Insights"
                          ? "All Insights"
                          : `${item.label} Overview`;
                      const allChildren = item.topLevelHref
                        ? [
                            {
                              label: overviewLabel,
                              href: item.topLevelHref,
                              description: overviewDescs[item.label] || "",
                              external: item.external,
                            },
                            ...item.children!,
                          ]
                        : item.children!;

                      return allChildren.map((child, i) => {
                        const colorClasses = isDark
                          ? "text-[#1d1a19]"
                          : "text-white";
                        const hoverClasses = isDark
                          ? "hover:bg-[#1d1a19]/5"
                          : "hover:bg-white/5";
                        const descClasses = isDark
                          ? "text-[#1d1a19]/35"
                          : "text-white/35";

                        const content = (
                          <>
                            {child.label}
                            {child.description && (
                              <span
                                className={`block text-[11px] mt-0.5 leading-tight ${descClasses}`}
                              >
                                {child.description}
                              </span>
                            )}
                          </>
                        );

                        if (child.external) {
                          return (
                            <a
                              key={`${child.href}-${i}`}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsOpen(false)}
                              className={`block py-2 px-3 text-[14px] rounded-[6px] transition-colors ${colorClasses} ${hoverClasses}`}
                            >
                              {content}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={`${child.href}-${i}`}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className={`block py-2 px-3 text-[14px] rounded-[6px] transition-colors ${colorClasses} ${hoverClasses}`}
                          >
                            {content}
                          </Link>
                        );
                      });
                    })()}
                  </div>
                </div>
              );
            }

            // Simple link (Ecosystem, Documentation)
            const isActive = activePage === item.pageKey;
            const baseClasses =
              "py-1.5 px-3 text-[14px] rounded-[6px] transition-colors";
            const colorClasses = isDark ? "text-[#1d1a19]" : "text-white";
            const stateClasses = isActive
              ? isDark
                ? "bg-[#1d1a19]/10 font-semibold"
                : "bg-white/10 font-semibold"
              : isDark
                ? "hover:bg-[#1d1a19]/5"
                : "hover:bg-white/5";

            const className = `${baseClasses} ${colorClasses} ${stateClasses}`;

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.topLevelHref || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={className}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.topLevelHref || "#"}
                onClick={() => setIsOpen(false)}
                className={className}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Backdrop overlay when menu is open */}
      {isOpen && (
        <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
