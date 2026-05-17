"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Debounce view increment (only count once per session per article)
    const viewed = sessionStorage.getItem(`viewed-${slug}`);
    if (viewed) return;

    const timer = setTimeout(async () => {
      try {
        await fetch(`/api/posts/${slug}/views`, { method: "POST" });
        sessionStorage.setItem(`viewed-${slug}`, "true");
      } catch {
        // Silently fail
      }
    }, 3000); // Count as viewed after 3 seconds

    return () => clearTimeout(timer);
  }, [slug]);

  return null;
}
