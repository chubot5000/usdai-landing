"use client";

import { useEffect, useRef, ReactNode } from "react";

interface PopupContainerProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  children: ReactNode;
}

interface PopupHeaderProps {
  children: ReactNode;
  className?: string;
}

interface PopupContentProps {
  children: ReactNode;
}

interface PopupFooterProps {
  children: ReactNode;
  className?: string;
}

function PopupContainer({
  isOpen,
  position,
  onClose,
  children,
}: PopupContainerProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle ESC key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Focus trap: handle Tab key to keep focus within popup
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !popupRef.current) return;

      const focusableElements = popupRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        // Shift+Tab on first element -> go to last
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        // Tab on last element -> go to first
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    // Auto-focus the popup when it opens
    popupRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    if (isOpen) {
      // Add small delay to prevent immediate close on click that opened popup
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open (desktop only)
  useEffect(() => {
    if (!isOpen || window.innerWidth < 768) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Also prevent wheel/touch scroll events
    const preventScroll = (e: Event) => {
      if (!popupRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen]);

  // Calculate position to keep popup on screen
  const getPopupStyle = (): React.CSSProperties => {
    if (!isOpen) return { display: "none" };

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Mobile: use bottom sheet instead
    if (viewportWidth < 768) {
      return {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: "80vh",
        borderRadius: "16px 16px 0 0",
      };
    }

    // Desktop: Position relative to marker screen position
    // Offset: +40px right, -20px up from marker
    let left = position.x + 40;
    let top = position.y - 20;

    const popupWidth = 400;
    const popupHeight = 300;

    // Flip to left if too close to right edge
    if (left + popupWidth > viewportWidth - 20) {
      left = position.x - popupWidth - 40;
    }

    // Ensure boundaries
    if (left < 20) left = 20;
    if (top < 20) top = 20;
    if (top + popupHeight > viewportHeight - 20) {
      top = viewportHeight - popupHeight - 20;
    }

    return {
      position: "fixed",
      left: `${left}px`,
      top: `${top}px`,
      maxHeight: "80vh",
    };
  };

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      style={getPopupStyle()}
      className="z-50 w-full max-w-md overflow-hidden rounded-lg border border-stone-200 bg-white shadow-xl md:w-96"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}

function PopupHeader({ children, className = "" }: PopupHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between border-b border-stone-200 px-4 py-3 ${className}`}
    >
      <div className="text-sm font-medium w-full">{children}</div>
    </div>
  );
}

function PopupContent({ children }: PopupContentProps) {
  return (
    <div className="max-h-[calc(80vh-60px)] overflow-y-auto">{children}</div>
  );
}

function PopupFooter({ children, className = "" }: PopupFooterProps) {
  return (
    <div className={`border-t border-stone-200 px-4 py-3 ${className}`}>
      {children}
    </div>
  );
}

export const Popup = {
  Container: PopupContainer,
  Header: PopupHeader,
  Content: PopupContent,
  Footer: PopupFooter,
};
