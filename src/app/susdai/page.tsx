import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { Metadata } from "next";
import SUSDaiContent from "@/components/susdai/SUSDaiContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "sUSDai — Yield-Bearing Synthetic Dollar",
    description:
      "sUSDai is the yield-bearing synthetic dollar from USD.AI. Earn 10–15% APR backed by GPU-collateralized loans financing AI infrastructure.",
    path: "/susdai",
    type: "website",
  });
}

export default function SUSDaiPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "sUSDai", path: "/susdai" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <SUSDaiContent />
    </>
  );
}
