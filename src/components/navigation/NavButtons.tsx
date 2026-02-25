import Button from "../ui/Button";
import { PageVariant } from "./types";

interface NavButtonsProps {
  leftButtonText: string;
  leftButtonHref?: string;
  leftButtonDisabled: boolean;
  ctaText: string;
  ctaHref: string;
  ctaColor: string;
  variant: PageVariant;
  size?: "sm" | "default";
}

export default function NavButtons({
  leftButtonText,
  leftButtonHref,
  leftButtonDisabled,
  ctaText,
  ctaHref,
  ctaColor,
  variant,
  size = "default",
}: NavButtonsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Button
        href={leftButtonDisabled ? undefined : leftButtonHref}
        variant="ghost"
        size={size}
        pageVariant={variant}
        disabled={leftButtonDisabled}
        external={!leftButtonDisabled && leftButtonHref?.startsWith("http")}
      >
        {leftButtonText}
      </Button>
      <Button
        href={ctaHref}
        color={ctaColor}
        size={size}
        external
        className={size === "sm" ? "min-w-[90px]" : "min-w-[120px]"}
      >
        {ctaText}
      </Button>
    </div>
  );
}
