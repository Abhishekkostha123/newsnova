import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot-News",
        allow: "/",
        disallow: ["/api/", "/search", "/admin/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/search", "/admin/"],
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
