import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Optional: Verify webhook secret
    const secret = request.headers.get("x-revalidate-secret");
    if (
      process.env.REVALIDATE_SECRET &&
      secret !== process.env.REVALIDATE_SECRET
    ) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Revalidate all stories pages
    revalidatePath("/insights", "layout");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
