import { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/posts";
import { getAllCategorySlugs } from "@/lib/categories";
import { SITE_URL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, categorySlugs] = await Promise.all([
    getAllPostSlugs().catch(() => []),
    getAllCategorySlugs().catch(() => []),
  ]);

  const posts = postSlugs.map((slug) => ({
    url: `${SITE_URL}/post/${slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  const categories = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...categories,
    ...posts,
  ];
}
