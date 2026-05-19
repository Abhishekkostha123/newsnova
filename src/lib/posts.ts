import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { IPost, PaginatedResponse } from "@/types";

// Serializes mongoose document to plain object
function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

// ─── Get all published posts (paginated) ─────────────────────────────────────
export async function getPosts(
  page = 1,
  limit = 12
): Promise<PaginatedResponse<IPost>> {
  await dbConnect();

  const skip = (page - 1) * limit;
  const total = await Post.countDocuments({ published: true });

  const posts = await Post.find({ published: true })
    .populate("category", "name slug color")
    .populate("author", "name slug avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    data: serialize<IPost[]>(posts),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  };
}

// ─── Get post by slug ────────────────────────────────────────────────────────
export async function getPostBySlug(slug: string): Promise<IPost | null> {
  await dbConnect();

  const post = await Post.findOne({ slug, published: true })
    .populate("category", "name slug color")
    .populate("author", "name slug avatar bio socialLinks")
    .lean();

  if (!post) return null;
  return serialize<IPost>(post);
}

// ─── Get breaking news ───────────────────────────────────────────────────────
export async function getBreakingNews(limit = 5): Promise<IPost[]> {
  await dbConnect();

  const posts = await Post.find({ published: true, isBreaking: true })
    .populate("category", "name slug color")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
}

// ─── Get trending posts (by views) ──────────────────────────────────────────
export async function getTrendingPosts(limit = 6): Promise<IPost[]> {
  await dbConnect();

  const posts = await Post.find({ published: true })
    .populate("category", "name slug color")
    .sort({ views: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
}

// ─── Get latest posts ────────────────────────────────────────────────────────
export async function getLatestPosts(limit = 8): Promise<IPost[]> {
  await dbConnect();

  const posts = await Post.find({ published: true })
    .populate("category", "name slug color")
    .populate("author", "name slug avatar")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
}

// ─── Get posts by category ──────────────────────────────────────────────────
export async function getPostsByCategory(
  categoryId: string,
  page = 1,
  limit = 12
): Promise<PaginatedResponse<IPost>> {
  await dbConnect();

  const skip = (page - 1) * limit;
  const filter = { published: true, category: categoryId };
  const total = await Post.countDocuments(filter);

  const posts = await Post.find(filter)
    .populate("category", "name slug color")
    .populate("author", "name slug avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    data: serialize<IPost[]>(posts),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  };
}

// ─── Get related posts ──────────────────────────────────────────────────────
export async function getRelatedPosts(
  postId: string,
  categoryId: string,
  tags: string[],
  limit = 4
): Promise<IPost[]> {
  await dbConnect();

  const posts = await Post.find({
    _id: { $ne: postId },
    published: true,
    $or: [{ category: categoryId }, { tags: { $in: tags } }],
  })
    .populate("category", "name slug color")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
}

// ─── Get all post slugs (for static generation) ─────────────────────────────
export async function getAllPostSlugs(): Promise<string[]> {
  await dbConnect();

  const posts = await Post.find({ published: true }).select("slug").lean();
  return posts.map((p) => p.slug);
}

// ─── Get posts for sitemap (slug + date only) ────────────────────────────────
export async function getPostsForSitemap(): Promise<{ slug: string; updatedAt: string }[]> {
  await dbConnect();

  const posts = await Post.find({ published: true })
    .select("slug updatedAt")
    .sort({ updatedAt: -1 })
    .lean();
  return serialize<{ slug: string; updatedAt: string }[]>(posts);
}

// ─── Increment post views ───────────────────────────────────────────────────
export async function incrementViews(slug: string): Promise<void> {
  await dbConnect();
  await Post.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
}

// ─── Search posts ────────────────────────────────────────────────────────────
export async function searchPosts(
  query: string,
  limit = 10
): Promise<IPost[]> {
  await dbConnect();

  const posts = await Post.find({
    published: true,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { excerpt: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
    ],
  })
    .populate("category", "name slug color")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
}

// ─── Get posts grouped by category (for homepage) ───────────────────────────
export async function getPostsGroupedByCategory(
  limitPerCategory = 4
): Promise<Map<string, IPost[]>> {
  await dbConnect();

  const posts = await Post.find({ published: true })
    .populate("category", "name slug color")
    .sort({ createdAt: -1 })
    .lean();

  const grouped = new Map<string, IPost[]>();
  const serialized = serialize<IPost[]>(posts);

  for (const post of serialized) {
    const cat =
      typeof post.category === "object" ? post.category.slug : "uncategorized";
    if (!grouped.has(cat)) {
      grouped.set(cat, []);
    }
    const catPosts = grouped.get(cat)!;
    if (catPosts.length < limitPerCategory) {
      catPosts.push(post);
    }
  }

  return grouped;
}
