import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { Metadata } from "next";
import CHIPContent from "@/components/chip/CHIPContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "$CHIP — Governance & Fee-Capture Token",
    description:
      "CHIP is the governance and fee-capture token of USD.AI, a protocol generating real revenue from AI companies financing GPU infrastructure.",
    path: "/chip",
    type: "website",
  });
}

export default function CHIPPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "$CHIP", path: "/chip" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <CHIPContent />
    </>
  );
}
