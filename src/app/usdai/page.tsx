import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { Metadata } from "next";
import USDaiContent from "@/components/usdai/USDaiContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "USDai — Fully-Backed Synthetic Dollar",
    description:
      "USDai is a fully-backed synthetic dollar from USD.AI. Instantly redeemable, deeply liquid across DeFi and CeFi, backed by AI infrastructure assets.",
    path: "/usdai",
    type: "website",
  });
}

export default function USDaiPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "USDai", path: "/usdai" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <USDaiContent />
    </>
  );
}
