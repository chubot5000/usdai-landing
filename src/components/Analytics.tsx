"use client";

import { COOKIE_CONSENT_KEY } from "@/lib/cookies";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Analytics() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    function checkConsent() {
      setAccepted(localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted");
    }

    checkConsent();
    window.addEventListener("cookie-consent-change", checkConsent);
    return () =>
      window.removeEventListener("cookie-consent-change", checkConsent);
  }, []);

  if (!accepted) return null;

  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const cookie3SiteId = process.env.NEXT_PUBLIC_COOKIE3_SITE_ID;
  const ahrefsKey = process.env.NEXT_PUBLIC_AHREFS_KEY;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {ahrefsKey && (
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          strategy="lazyOnload"
          data-key={ahrefsKey}
          async
        />
      )}
      {cookie3SiteId && (
        <Script
          src="https://cdn.markfi.xyz/scripts/analytics/0.11.24/cookie3.analytics.min.js"
          strategy="lazyOnload"
          site-id={cookie3SiteId}
          integrity="sha384-ihnQ09PGDbDPthGB3QoQ2Heg2RwQIDyWkHkqxMzq91RPeP8OmydAZbQLgAakAOfI"
          crossOrigin="anonymous"
          async
        />
      )}
    </>
  );
}
