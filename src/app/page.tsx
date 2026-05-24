import { getHomepageData, HomepageData } from "@/lib/posts";
import BreakingNews from "@/components/news/BreakingNews";
import {
  HeroCard,
  PostCard,
  CompactCard,
  TrendingCard,
} from "@/components/news/PostCards";
import SectionHeader from "@/components/ui/SectionHeader";
import { IPost, ICategory } from "@/types";
import Link from "next/link";
import { Metadata } from "next";

// ─── ISR: 5 min kaafi hai news site ke liye (60s bahut aggressive tha) ───────
export const revalidate = 300;

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "NewsNova | Breaking News from Jhansi, UP & Across India",
  description:
    "NewsNova is your trusted source for breaking Jhansi news, latest Uttar Pradesh updates, India news, politics, technology, entertainment, sports, and trending stories — all in one place.",
  keywords: [
    "Jhansi news",
    "Bundelkhand news",
    "UP news hindi",
    "Uttar Pradesh breaking news",
    "India latest news",
    "NewsNova",
  ],
  alternates: {
    canonical: "https://www.newsnova.online",
  },
  openGraph: {
    title: "NewsNova | Breaking News from Jhansi, UP & Across India",
    description:
      "NewsNova is your trusted source for breaking Jhansi news, latest Uttar Pradesh updates, India news, politics, technology, entertainment, sports, and trending stories.",
    url: "https://www.newsnova.online",
    siteName: "NewsNova",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.newsnova.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NewsNova - Breaking News from Jhansi and UP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewsNova | Breaking News from Jhansi, UP & India",
    description:
      "Breaking Jhansi news, UP updates, India news — all in one place.",
    images: ["https://www.newsnova.online/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ posts }: { posts: IPost[] }) {
  if (!posts || posts.length === 0) return null;

  const [mainPost, ...sidebarPosts] = posts;

  return (
    <section className="container-main mt-6 sm:mt-8">
      <h1 className="sr-only">
        NewsNova — Breaking News from Jhansi, Bundelkhand & Uttar Pradesh
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main Hero */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden">
          <HeroCard post={mainPost} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="w-1 h-4 bg-[#ac2b25]" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
              Latest Stories
            </span>
          </div>

          {sidebarPosts.slice(0, 4).map((post, i) => (
            <CompactCard
              key={`${post._id}-${post.slug}-${i}`}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Latest News Grid ─────────────────────────────────────────────────────────
function LatestNewsSection({ posts }: { posts: IPost[] }) {
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
          <PostCard
            key={`${post._id}-${post.slug}-${i}`}
            post={post}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Trending Section ─────────────────────────────────────────────────────────
function TrendingSection({ posts }: { posts: IPost[] }) {
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
          <TrendingCard
            key={`${post._id}-${post.slug}-${i}`}
            post={post}
            rank={i + 1}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Category Blocks ──────────────────────────────────────────────────────────
function CategoryBlocksSection({
  categoryBlocks,
}: {
  categoryBlocks: HomepageData["categoryBlocks"];
}) {
  if (!categoryBlocks || categoryBlocks.length === 0) return null;

  return (
    <section className="container-main mt-12 sm:mt-16">
      <SectionHeader title="Browse by Category" accent="Browse" />

      <div className="space-y-12">
        {categoryBlocks.map(({ category, posts }) => {
          if (posts.length === 0) return null;

          return (
            <div key={`${category._id}-${category.slug}`}>
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

// ─── Categories Nav Strip ─────────────────────────────────────────────────────
function CategoriesStrip({ categories }: { categories: ICategory[] }) {
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

// ─── Homepage ─────────────────────────────────────────────────────────────────
export default async function HomePage() {
  // Fetch all homepage data concurrently in a single request (Goal 8)
  const data = await getHomepageData();

  return (
    <>
      {/* Breaking News Ticker */}
      <BreakingNews posts={data.breakingPosts} />

      {/* Categories Navigation Strip */}
      <CategoriesStrip categories={data.categories} />

      {/* Hero Section */}
      <HeroSection posts={data.latestPosts.slice(0, 5)} />

      {/* Latest News */}
      <LatestNewsSection posts={data.latestPosts} />

      {/* Trending */}
      <TrendingSection posts={data.trendingPosts} />

      {/* Category Blocks */}
      <CategoryBlocksSection categoryBlocks={data.categoryBlocks} />

      {/* Newsletter CTA (Server-Side Form Submission - Goal 10) */}
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
            <form
              action="/api/newsletter"
              method="POST"
              className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-gray-300 focus-within:border-[#ac2b25] transition-colors bg-white"
            >
              <input
                type="email"
                name="email"
                required
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