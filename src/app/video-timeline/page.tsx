import { Schema } from "@/components/seo/Schema";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { generateBreadcrumbSchema } from "@/lib/utils/schema";
import { Metadata } from "next";
import VideoTimelineContent from "@/components/video-timeline/VideoTimelineContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "Video Timeline — USD.AI",
    description:
      "Watch the story of USD.AI unfold — from our earliest experiments to global launches. Every milestone, captured on film.",
    path: "/video-timeline",
    type: "website",
  });
}

export default function VideoTimelinePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Video Timeline", path: "/video-timeline" },
  ];

  return (
    <>
      <Schema data={generateBreadcrumbSchema(breadcrumbs)} />
      <VideoTimelineContent />
    </>
  );
}
