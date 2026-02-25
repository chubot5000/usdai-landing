"use client";

import {
  COOKIE_CONSENT_KEY,
  type CookieConsent as ConsentType,
} from "@/lib/cookies";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!stored);
  }, []);

  function handleConsent(value: ConsentType) {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-change"));
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-3 right-3 z-50 w-[calc(100vw-1.5rem)] rounded-[8px] bg-[#2f2823] p-3 sm:bottom-4 sm:right-4 sm:w-[340px] sm:rounded-[10px] sm:p-6">
      <h3 className="font-eiko text-[18px] leading-tight text-[#fff1e5] sm:text-[24px]">
        Cookie Settings
      </h3>
      <p className="mt-1 text-[12px] leading-[1.4] text-white sm:mt-2 sm:text-[14px] sm:leading-[1.5]">
        We use cookies to improve our service and analyze site usage.
      </p>
      <div className="mt-2 flex gap-2 sm:mt-4 sm:gap-3">
        <button
          onClick={() => handleConsent("rejected")}
          className="flex-1 cursor-pointer rounded-[6px] bg-white/20 px-3 py-1.5 text-[12px] text-white backdrop-blur-[122px] transition-opacity hover:opacity-80 sm:px-4 sm:py-2 sm:text-[14px]"
        >
          Reject
        </button>
        <button
          onClick={() => handleConsent("accepted")}
          className="flex-1 cursor-pointer rounded-[6px] bg-[#a99482] px-3 py-1.5 text-[12px] text-white transition-opacity hover:opacity-80 sm:px-4 sm:py-2 sm:text-[14px]"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
