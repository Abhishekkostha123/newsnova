import { Suspense } from "react";
import { getLatestPosts, getBreakingNews, getTrendingPosts } from "@/lib/posts";
import { getCategories } from "@/lib/categories";
import BreakingNews from "@/components/news/BreakingNews";
import { HeroCard } from "@/components/news/PostCards";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  HeroSkeleton,
  PostCardSkeleton,
  CompactCardSkeleton,
  TrendingCardSkeleton,
} from "@/components/ui/Skeletons";
import { IPost, ICategory } from "@/types";
import { getPostsGroupedByCategory } from "@/lib/posts";
import { SITE_URL } from "@/lib/utils";
import Link from "next/link";
import dynamic from "next/dynamic";

const PostCard = dynamic(() => import("@/components/news/PostCards").then(mod => mod.PostCard), { ssr: true });
const CompactCard = dynamic(() => import("@/components/news/PostCards").then(mod => mod.CompactCard), { ssr: true });
const TrendingCard = dynamic(() => import("@/components/news/PostCards").then(mod => mod.TrendingCard), { ssr: true });

import { Metadata } from "next";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export const metadata: Metadata = {
  title: "NewsNova — Breaking News & Latest Stories",
  description: "Your trusted source for breaking news, trending stories, and in-depth analysis.",
  alternates: {
    canonical: SITE_URL,
  },
};

// ─── Hero Section ────────────────────────────────────────────────────────────
async function HeroSection() {
  const posts = await getLatestPosts(5);
  if (!posts || posts.length === 0) return null;

  const [mainPost, ...sidebarPosts] = posts;

  return (
    <section className="container-main mt-6 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Main Hero — rounded */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden">
          <HeroCard post={mainPost} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#ac2b25]" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
              Latest Stories
            </span>
          </div>

          {/* Cards */}
          {sidebarPosts.slice(0, 4).map((post, i) => (
            <CompactCard key={post._id} post={post} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Latest News Grid ────────────────────────────────────────────────────────
async function LatestNewsSection() {
  const posts = await getLatestPosts(8);
  if (!posts || posts.length === 0) return null;

  return (
    <section className="container-main mt-12 sm:mt-16">
      <SectionHeader
        title="Latest News"
        accent="Latest"
        subtitle="Stay updated with the newest stories"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Trending Section ────────────────────────────────────────────────────────
async function TrendingSection() {
  const posts = await getTrendingPosts(6);
  if (!posts || posts.length === 0) return null;

  return (
    <section className="container-main mt-12 sm:mt-16">
      <SectionHeader
        title="Trending Now"
        accent="Trending"
        subtitle="Most popular stories this week"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, i) => (
          <TrendingCard key={post._id} post={post} rank={i + 1} />
        ))}
      </div>
    </section>
  );
}

// ─── Category Blocks ─────────────────────────────────────────────────────────
async function CategoryBlocksSection() {
  const [categories, groupedPosts] = await Promise.all([
    getCategories(),
    getPostsGroupedByCategory(4),
  ]);

  if (!categories || categories.length === 0) return null;

  return (
    <section className="container-main mt-12 sm:mt-16">
      <SectionHeader title="Browse by Category" accent="Browse" />

      <div className="space-y-12">
        {categories.slice(0, 4).map((category) => {
          const posts = groupedPosts.get(category.slug) || [];
          if (posts.length === 0) return null;

          return (
            <div key={category._id}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {category.name}
                  </h3>
                </div>
                <Link
                  href={`/category/${category.slug}`}
                  className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                >
                  See all →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {posts.map((post: IPost, i: number) => (
                  <PostCard key={post._id} post={post} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Categories Nav Strip ────────────────────────────────────────────────────
async function CategoriesStrip() {
  const categories = await getCategories();
  if (!categories || categories.length === 0) return null;

  return (
    <section className="container-main mt-8 sm:mt-10">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat: ICategory) => (
          <Link
            key={cat._id}
            href={`/category/${cat.slug}`}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
            style={{
              borderColor: cat.color + "40",
              color: cat.color,
              backgroundColor: cat.color + "10",
            }}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Breaking News Wrapper ───────────────────────────────────────────────────
async function BreakingNewsWrapper() {
  const breakingPosts = await getBreakingNews(5);
  return <BreakingNews posts={breakingPosts} />;
}

// ─── Homepage ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* Breaking News Ticker */}
      <Suspense fallback={null}>
        <BreakingNewsWrapper />
      </Suspense>

      {/* Categories Navigation Strip */}
      <Suspense fallback={null}>
        <CategoriesStrip />
      </Suspense>

      {/* Hero Section */}
      <Suspense
        fallback={
          <div className="container-main mt-6 sm:mt-8">
            <HeroSkeleton />
          </div>
        }
      >
        <HeroSection />
      </Suspense>

      {/* Latest News */}
      <Suspense
        fallback={
          <div className="container-main mt-12 sm:mt-16">
            <div className="h-8 w-48 skeleton mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <LatestNewsSection />
      </Suspense>

      {/* Trending */}
      <Suspense
        fallback={
          <div className="container-main mt-12 sm:mt-16">
            <div className="h-8 w-48 skeleton mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <TrendingCardSkeleton key={i} rank={i + 1} />
              ))}
            </div>
          </div>
        }
      >
        <TrendingSection />
      </Suspense>

      {/* Category Blocks */}
      <Suspense
        fallback={
          <div className="container-main mt-12 sm:mt-16">
            <div className="h-8 w-64 skeleton mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <CategoryBlocksSection />
      </Suspense>

      {/* Newsletter CTA */}
      <section className="container-main mt-16 sm:mt-20 mb-8">
        <div className="bg-[#f8f9fa] border-y-4 border-t-[#ac2b25] border-b-gray-200 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Stay <span className="text-[#ac2b25]">Informed</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm font-medium">
              Get breaking news and exclusive stories delivered straight to your
              inbox. No spam, unsubscribe anytime.
            </p>
            <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-gray-300 focus-within:border-[#ac2b25] transition-colors bg-white">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#ac2b25] text-white text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
