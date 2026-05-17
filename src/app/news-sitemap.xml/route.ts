import { NextResponse } from "next/server";
import { getLatestPosts } from "@/lib/posts";
import { SITE_URL, SITE_NAME } from "@/lib/utils";

export async function GET() {
  try {
    // Google News Sitemaps should only contain articles published in the last 48 hours.
    // We fetch a batch, then filter by date.
    const posts = await getLatestPosts(100);
    
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const newsPosts = posts.filter((post) => {
      const pubDate = new Date(post.createdAt);
      return pubDate >= twoDaysAgo;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsPosts
    .map((post) => {
      return `
  <url>
    <loc>${SITE_URL}/post/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.createdAt).toISOString()}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
    </news:news>
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
    console.error("Error generating news sitemap:", error);
    return new NextResponse("Error generating news sitemap", { status: 500 });
  }
}
