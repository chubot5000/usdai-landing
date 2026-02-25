import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { Metadata } from "next";
import PrimitivesContent from "@/components/primitives/PrimitivesContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title:
      "Stackable DeFi Primitives — Oracleless Infrastructure for Capital Assets",
    description:
      "USD.AI rebuilds the DeFi stack for capital assets — oracleless lending, liquid credit tokens, modular underwriting, yield stripping, synthetic dollars, and structured redemptions. Six primitives, one composable protocol.",
    path: "/primitives",
    type: "website",
  });
}

export default function PrimitivesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Stackable DeFi Primitives", path: "/primitives" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <PrimitivesContent />
    </>
  );
}
