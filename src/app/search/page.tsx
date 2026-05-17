import { Suspense } from "react";
import type { Metadata } from "next";
import { searchPosts } from "@/lib/posts";
import { PostCard } from "@/components/news/PostCards";
import { PostCardSkeleton } from "@/components/ui/Skeletons";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for articles, news, and stories.",
};

async function SearchResults({ query }: { query: string }) {
  const posts = await searchPosts(query, 20);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
          <svg
            className="w-10 h-10 text-[var(--text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          No results found
        </h2>
        <p className="text-[var(--text-muted)]">
          Try a different search term or browse our categories.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Found {posts.length} result{posts.length !== 1 ? "s" : ""} for &ldquo;
        {query}&rdquo;
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} />
        ))}
      </div>
    </>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  return (
    <div className="container-main py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
        Search Results
      </h1>

      {query ? (
        <Suspense
          fallback={
            <div className="mt-8">
              <div className="h-4 w-40 skeleton mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            </div>
          }
        >
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <p className="text-[var(--text-muted)] mt-4">
          Enter a search term to find articles.
        </p>
      )}
    </div>
  );
}
