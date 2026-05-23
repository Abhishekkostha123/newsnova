import Image from "next/image";
import Link from "next/link";
import { IPost, ICategory } from "@/types";
import { formatDate } from "@/lib/utils";

// ─── Shared helpers ───────────────────────────────────────────────────────────

const ClockIcon = () => (
  <svg className="w-3 h-3 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BreakingBadge = ({ label = "Breaking" }: { label?: string }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ac2b25] text-white text-[10px] font-bold uppercase tracking-wider">
    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
    {label}
  </span>
);

const CategoryLabel = ({ name, color }: { name: string; color?: string }) => (
  <span
    className="text-[10px] font-black uppercase tracking-[0.18em] block mb-2"
    style={{ color: color || "#ac2b25" }}
  >
    {name}
  </span>
);

// ─── HeroCard ────────────────────────────────────────────────────────────────

export function HeroCard({ post }: { post: IPost }) {
  const category = post.category as ICategory;

  return (
    <article className="relative group overflow-hidden bg-gray-900">
      <Link href={`/post/${post.slug}`} className="block relative">
        {/* Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={post.coverImage || "/placeholder.jpg"}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-102"
            sizes="(max-width: 768px) 100vw, 1280px"
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMjIiLz48L3N2Zz4="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          {category && (
            <span
              className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white mb-3"
              style={{ backgroundColor: category.color || "#ac2b25" }}
            >
              {category.name}
            </span>
          )}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-sm">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm text-gray-200 line-clamp-2 max-w-3xl mb-4 hidden sm:block leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
            <ClockIcon />
            <span>{formatDate(post.createdAt)}</span>
            <span className="text-gray-500">·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Breaking badge */}
        {post.isBreaking && (
          <div className="absolute top-4 left-4">
            <BreakingBadge />
          </div>
        )}
      </Link>
    </article>
  );
}

// ─── PostCard ────────────────────────────────────────────────────────────────

export function PostCard({
  post,
  index = 0,
}: {
  post: IPost;
  index?: number;
}) {
  const category = post.category as ICategory;

  return (
    <article
      className="bg-white border border-gray-100 overflow-hidden group hover:border-[#ac2b25]/30 hover:shadow-[0_4px_24px_rgba(172,43,37,0.08)] transition-all duration-300"
    >
      <Link href={`/post/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
          <Image
            src={post.coverImage || "/placeholder.jpg"}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-102"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 4 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjNmNSIvPjwvc3ZnPg=="
          />
          {/* Category pill on image */}
          {category && (
            <span
              className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: category.color || "#ac2b25" }}
            >
              {category.name}
            </span>
          )}
          {post.isBreaking && (
            <div className="absolute top-3 right-3">
              <BreakingBadge label="Live" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-serif font-bold text-[1.05rem] text-gray-900 leading-snug line-clamp-2 mb-2.5 group-hover:text-[#ac2b25] transition-colors duration-200">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-[13px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1">
              <ClockIcon />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-1 text-[#ac2b25] font-semibold">
              {post.readTime} min read
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

// ─── CompactCard ─────────────────────────────────────────────────────────────

export function CompactCard({
  post,
}: {
  post: IPost;
}) {
  const category = post.category as ICategory;

  return (
    <article className="group">
      <Link
        href={`/post/${post.slug}`}
        className="flex gap-3 p-3 border border-gray-100 hover:border-[#ac2b25]/20 hover:bg-red-50/40 transition-all duration-200"
      >
        {/* Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden shrink-0 bg-gray-50">
          <Image
            src={post.coverImage || "/placeholder.jpg"}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="96px"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjNmNSIvPjwvc3ZnPg=="
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {category && <CategoryLabel name={category.name} color={category.color} />}
          <h4 className="font-serif font-bold text-[0.9rem] text-gray-900 leading-snug line-clamp-2 group-hover:text-[#ac2b25] transition-colors duration-200">
            {post.title}
          </h4>
          <span className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1 font-medium">
            <ClockIcon />
            {formatDate(post.createdAt)}
          </span>
        </div>
      </Link>
    </article>
  );
}

// ─── TrendingCard ────────────────────────────────────────────────────────────

export function TrendingCard({
  post,
  rank,
}: {
  post: IPost;
  rank: number;
}) {
  const category = post.category as ICategory;
  const isTop = rank <= 3;

  return (
    <article className="flex gap-4 group items-start bg-white p-4 border border-gray-100 hover:border-[#ac2b25]/25 hover:shadow-[0_2px_16px_rgba(172,43,37,0.07)] transition-all duration-200">
      {/* Rank */}
      <div
        className={`w-9 h-9 shrink-0 flex items-center justify-center font-black text-lg transition-colors duration-200 ${isTop
          ? "bg-[#ac2b25] text-white"
          : "bg-gray-50 border border-gray-200 text-gray-300 group-hover:bg-[#ac2b25] group-hover:border-[#ac2b25] group-hover:text-white"
          }`}
      >
        {rank}
      </div>

      <div className="flex-1 min-w-0">
        <Link href={`/post/${post.slug}`}>
          {category && <CategoryLabel name={category.name} color={category.color} />}
          <h4 className="font-serif font-bold text-[0.95rem] text-gray-900 leading-snug line-clamp-2 group-hover:text-[#ac2b25] transition-colors duration-200">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400 font-medium">
            <span className="flex items-center gap-1">
              <ClockIcon />
              {formatDate(post.createdAt)}
            </span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </Link>
      </div>
    </article>
  );
}