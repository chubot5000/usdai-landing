import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataURL(
  imageUrl: string
): Promise<string | undefined> {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      console.error(`Failed to fetch image: ${res.status}`);
      return undefined;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (e) {
    console.error("Error generating blur placeholder:", e);
    return undefined;
  }
}
