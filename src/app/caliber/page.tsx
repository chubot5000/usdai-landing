import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { Metadata } from "next";
import CALIBERContent from "@/components/caliber/CALIBERContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "CALIBER — Collateral Infrastructure for AI Lending",
    description:
      "CALIBER is USD.AI's legal and tokenization framework for GPU collateral. UCC Section 7 bailment, bankruptcy-remote SPVs, and ERC-721 NFTs — enforceable digital property rights for physical hardware.",
    path: "/caliber",
    type: "website",
  });
}

export default function CALIBERPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "CALIBER", path: "/caliber" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <CALIBERContent />
    </>
  );
}
