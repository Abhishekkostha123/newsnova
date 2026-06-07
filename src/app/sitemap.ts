import { MetadataRoute } from "next";
import { getPostsForSitemap } from "@/lib/posts";
import { getAllCategorySlugs } from "@/lib/categories";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 7200; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categorySlugs] = await Promise.all([
    getPostsForSitemap().catch(() => []),
    getAllCategorySlugs().catch(() => []),
  ]);

  const postEntries = posts.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/post/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryEntries = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "always" as const,
      priority: 1,
    },
    ...categoryEntries,
    ...postEntries,
  ];
}
