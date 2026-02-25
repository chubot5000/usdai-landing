import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { Metadata } from "next";
import QEVContent from "@/components/qev/QEVContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "QEV — Queue Extractable Value",
    description:
      "QEV is USD.AI's market-driven redemption mechanism. 30-day epochs, ZK private bid auctions, and structured exits — eliminating bank-run dynamics from synthetic dollars.",
    path: "/qev",
    type: "website",
  });
}

export default function QEVPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "QEV", path: "/qev" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <QEVContent />
    </>
  );
}
