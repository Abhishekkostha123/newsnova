import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.newsnova.online";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "NewsNova";

export async function GET() {
  await dbConnect();

  const posts = await Post.find({ published: true })
    .populate("category", "name")
    .select("title slug excerpt coverImage createdAt updatedAt")
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/post/${post.slug}</link>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/post/${post.slug}</guid>
      ${post.coverImage ? `<enclosure url="${post.coverImage}" type="image/jpeg" />` : ""}
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Your trusted source for breaking news and latest stories</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
