import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, getAllCategorySlugs } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import LoadMorePosts from "@/components/news/LoadMorePosts";
import { PostCardSkeleton } from "@/components/ui/Skeletons";
import { SITE_URL, SITE_NAME } from "@/lib/utils";

export const revalidate = 7200;
export const dynamicParams = true; // Allows Next.js to dynamically fetch missing categories

// ─── Generate Static Params ─────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Failed to generate category static params:", error);
    return [];
  }
}

// ─── Generate Metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const category = await getCategoryBySlug(slug);
    if (!category) {
      return { 
        title: "Category Not Found",
        alternates: { canonical: `${SITE_URL}/category/${slug}` } 
      };
    }

    return {
      title: `${category.name} News`,
      description:
        category.description ||
        `Read the latest ${category.name} news and stories on ${SITE_NAME}.`,
      openGraph: {
        title: `${category.name} News | ${SITE_NAME}`,
        description:
          category.description ||
          `Read the latest ${category.name} news and stories.`,
        url: `${SITE_URL}/category/${category.slug}`,
        images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${category.name} News | ${SITE_NAME}`,
        images: [`${SITE_URL}/og-default.png`],
      },
      alternates: {
        canonical: `${SITE_URL}/category/${category.slug}`,
      },
    };
  } catch {
    return { title: "Category Not Found" };
  }
}

// ─── Category Posts Content ──────────────────────────────────────────────────
async function CategoryContent({ categorySlug }: { categorySlug: string }) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const { data: posts, pagination } = await getPostsByCategory(
    category._id,
    1,
    12
  );

  return (
    <div className="container-main py-8 sm:py-12">
      {/* Category Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="w-1.5 h-10 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            {category.name}
          </h1>
        </div>
        {category.description && (
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl ml-5">
            {category.description}
          </p>
        )}
        <div className="mt-3 ml-5 text-sm text-[var(--text-muted)]">
          {pagination.total} article{pagination.total !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Posts Grid with Load More */}
      {posts.length > 0 ? (
        <LoadMorePosts
          initialPosts={posts}
          totalPages={pagination.totalPages}
          currentPage={1}
          category={category._id}
        />
      ) : (
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            No articles yet
          </h2>
          <p className="text-[var(--text-muted)]">
            Check back soon for new stories in this category.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Category Page ───────────────────────────────────────────────────────────
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  let jsonLd = null;
  if (category) {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${category.name} News`,
      description: category.description || `Read the latest ${category.name} news and stories on ${SITE_NAME}.`,
      url: `${SITE_URL}/category/${category.slug}`,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    };
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense
        fallback={
          <div className="container-main py-8 sm:py-12">
            <div className="mb-8 sm:mb-12">
              <div className="h-12 w-48 skeleton mb-3" />
              <div className="h-5 w-80 skeleton" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <CategoryContent categorySlug={slug} />
      </Suspense>
    </>
  );
}
