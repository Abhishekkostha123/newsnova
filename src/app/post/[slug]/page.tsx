import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from "@/lib/posts";
import { getCommentsByPost } from "@/lib/comments";
import { ICategory, IAuthor, IComment } from "@/types";
import { formatDateFull, extractHeadings, SITE_URL, SITE_NAME } from "@/lib/utils";
import TableOfContents from "@/components/article/TableOfContents";
import ViewTracker from "@/components/article/ViewTracker";
import CommentSection from "@/components/comments/CommentSection";
import { PostCard } from "@/components/news/PostCards";
import { ArticleSkeleton } from "@/components/ui/Skeletons";

export const revalidate = 60;
export const dynamicParams = true; // Allows Next.js to fetch new articles dynamically instead of returning 404

// ─── Generate Static Params ─────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Failed to fetch static params for posts", error);
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
    const post = await getPostBySlug(slug);
    if (!post) {
      return { 
        title: "Post Not Found",
        alternates: { canonical: `${SITE_URL}/post/${slug}` } 
      };
    }

    const category = post.category as ICategory;
    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `${SITE_URL}/post/${post.slug}`,
        images: post.coverImage
          ? [
              {
                url: post.coverImage,
                width: post.coverImageWidth,
                height: post.coverImageHeight,
                alt: post.coverImageAlt || post.title,
              },
            ]
          : [],
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        section: category?.name,
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: post.coverImage ? [post.coverImage] : [],
      },
      alternates: {
        canonical: post.canonicalUrl || `${SITE_URL}/post/${post.slug}`,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

// ─── Related Posts ───────────────────────────────────────────────────────────
async function RelatedPosts({
  postId,
  categoryId,
  tags,
}: {
  postId: string;
  categoryId: string;
  tags: string[];
}) {
  const related = await getRelatedPosts(postId, categoryId, tags, 4);
  if (!related || related.length === 0) return null;

  return (
    <section className="mt-12">
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-[var(--accent-primary)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        Related Articles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {related.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Comments Wrapper ────────────────────────────────────────────────────────
async function CommentsWrapper({ postId }: { postId: string }) {
  let comments: IComment[] = [];
  try {
    comments = await getCommentsByPost(postId);
  } catch {
    // Render empty comments on error
  }
  return <CommentSection postId={postId} initialComments={comments} />;
}

// ─── Article Page ────────────────────────────────────────────────────────────
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const category = post.category as ICategory;
  const author = post.author as IAuthor | null;
  const headings = extractHeadings(post.content);
  const categoryId =
    typeof post.category === "object" ? post.category._id : (post.category as string);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.coverImage
      ? {
          "@type": "ImageObject",
          url: post.coverImage,
          width: 1200,
          height: 630,
        }
      : undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: `${SITE_URL}/author/${author.slug}`,
          jobTitle: "Journalist",
        }
      : {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/post/${post.slug}`,
    },
    isAccessibleForFree: post.accessType === "Free",
    articleSection: category?.name || "News",
    keywords: post.tags && post.tags.length > 0 ? post.tags.join(", ") : "News",
    inLanguage: "en-US",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: `${SITE_URL}/category/${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 3 : 2,
        name: post.title,
        item: `${SITE_URL}/post/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* View Tracker */}
      <ViewTracker slug={post.slug} />

      <article className="container-main py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6 overflow-x-auto"
        >
          <Link
            href="/"
            className="hover:text-[var(--accent-primary)] transition-colors shrink-0"
          >
            Home
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/category/${category.slug}`}
                className="hover:text-[var(--accent-primary)] transition-colors shrink-0"
                style={{ color: category.color }}
              >
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="truncate text-[var(--text-secondary)]">
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="category-badge mb-4 inline-flex"
              style={{
                backgroundColor: category.color + "20",
                color: category.color,
              }}
            >
              {category.name}
            </Link>
          )}

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6 max-w-3xl">
              {post.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-8 pb-6 border-b border-[var(--border-color)]">
            {author && (
              <div className="flex items-center gap-2">
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white text-xs font-bold">
                    {author.name.charAt(0)}
                  </div>
                )}
                <span className="font-medium text-[var(--text-primary)]">
                  {author.name}
                </span>
              </div>
            )}
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDateFull(post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {post.views} views
            </span>
          </div>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="min-w-0">
            {/* Featured Image */}
            {post.coverImage && (
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/&nbsp;/gi, " "),
              }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg hover:text-[var(--accent-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                Share this article
              </h4>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_URL}/post/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 glass-card hover:bg-[var(--bg-card-hover)] transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/post/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 glass-card hover:bg-[var(--bg-card-hover)] transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${SITE_URL}/post/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 glass-card hover:bg-[var(--bg-card-hover)] transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Related Posts */}
            <Suspense fallback={null}>
              <RelatedPosts
                postId={post._id}
                categoryId={categoryId}
                tags={post.tags}
              />
            </Suspense>

            {/* Comments */}
            <Suspense
              fallback={
                <div className="mt-12 space-y-4">
                  <div className="h-6 w-32 skeleton" />
                  <div className="h-48 skeleton" />
                </div>
              }
            >
              <CommentsWrapper postId={post._id} />
            </Suspense>
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </article>
    </>
  );
}
