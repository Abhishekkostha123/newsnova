import { MetadataRoute } from "next";
import { getAllPostSlugs, getLatestPosts } from "@/lib/posts";
import { getCategories } from "@/lib/categories";
import { SITE_URL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages
  sitemapEntries.push({
    url: `${SITE_URL}`,
    lastModified: new Date(),
    changeFrequency: "always",
    priority: 1.0,
  });

  // 2. Categories
  try {
    const categories = await getCategories();
    categories.forEach((cat) => {
      sitemapEntries.push({
        url: `${SITE_URL}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("Failed to generate categories for sitemap:", error);
  }

  // 3. Posts
  try {
    // Get all slugs (since this is a sitemap, we ideally want all, or a very large number)
    const posts = await getLatestPosts(1000); 
    posts.forEach((post) => {
      sitemapEntries.push({
        url: `${SITE_URL}/post/${post.slug}`,
        lastModified: post.updatedAt || post.createdAt,
        changeFrequency: "daily",
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error("Failed to generate posts for sitemap:", error);
  }

  return sitemapEntries;
}
