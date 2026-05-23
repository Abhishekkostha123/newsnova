"use client";

import { useState, useCallback } from "react";
import { IPost } from "@/types";
import { PostCard } from "@/components/news/PostCards";
import { PostCardSkeleton } from "@/components/ui/Skeletons";

interface LoadMorePostsProps {
  initialPosts: IPost[];
  totalPages: number;
  currentPage: number;
  category?: string;
}

export default function LoadMorePosts({
  initialPosts,
  totalPages,
  currentPage,
}: LoadMorePostsProps) {
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [page, setPage] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(currentPage < totalPages);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/posts?page=${nextPage}&limit=12`);
      const data = await res.json();

      if (data.success) {
        setPosts((prev) => [...prev, ...data.data]);
        setPage(nextPage);
        setHasMore(data.pagination.hasMore);
      }
    } catch (err) {
      console.error("Failed to load more posts:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} />
        ))}
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <PostCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {hasMore && !isLoading && (
        <div
          className="flex justify-center mt-8 sm:mt-12 animate-fade-in"
        >
          <button
            onClick={loadMore}
            className="px-8 py-3 glass-card text-sm font-semibold text-[var(--accent-primary)] hover:text-white hover:bg-[var(--accent-primary)] transition-all duration-300"
          >
            Load More Articles
          </button>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="text-center text-sm text-[var(--text-muted)] mt-8">
          You&apos;ve reached the end ✨
        </p>
      )}
    </div>
  );
}
