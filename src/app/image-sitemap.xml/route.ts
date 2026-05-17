import { NextResponse } from "next/server";
import { getLatestPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/utils";

export async function GET() {
  try {
    const posts = await getLatestPosts(1000);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${posts
    .filter(post => post.coverImage)
    .map((post) => {
      return `
  <url>
    <loc>${SITE_URL}/post/${post.slug}</loc>
    <image:image>
      <image:loc>${post.coverImage}</image:loc>
      <image:title><![CDATA[${post.coverImageAlt || post.title}]]></image:title>
    </image:image>
  </url>`;
    })
    .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating image sitemap:", error);
    return new NextResponse("Error generating image sitemap", { status: 500 });
  }
}
