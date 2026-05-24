import { cache } from "react";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import { IPost, ICategory, PaginatedResponse } from "@/types";
import { getCategories } from "@/lib/categories";

// Serializes mongoose document to plain object
function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

// ─── Get all published posts (paginated) ─────────────────────────────────────
export const getPosts = cache(async (
  page = 1,
  limit = 12
): Promise<PaginatedResponse<IPost>> => {
  await dbConnect();

  const skip = (page - 1) * limit;
  const total = await Post.countDocuments({ published: true });

  const posts = await Post.find({ published: true })
    .populate("category", "name slug color")
    .populate("author", "name slug avatar")
    .select("-content -metaTitle -metaDescription -canonicalUrl")
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
});

// ─── Get post by slug ────────────────────────────────────────────────────────
export const getPostBySlug = cache(async (slug: string): Promise<IPost | null> => {
  await dbConnect();

  const post = await Post.findOne({ slug, published: true })
    .populate("category", "name slug color")
    .populate("author", "name slug avatar bio socialLinks")
    .lean();

  if (!post) return null;
  return serialize<IPost>(post);
});

// ─── Get breaking news ───────────────────────────────────────────────────────
export const getBreakingNews = cache(async (limit = 5): Promise<IPost[]> => {
  await dbConnect();

  const posts = await Post.find({ published: true, isBreaking: true })
    .populate("category", "name slug color")
    .select("-content -metaTitle -metaDescription -canonicalUrl")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
});

// ─── Get trending posts (by views) ──────────────────────────────────────────
export const getTrendingPosts = cache(async (limit = 6): Promise<IPost[]> => {
  await dbConnect();

  const posts = await Post.find({ published: true })
    .populate("category", "name slug color")
    .select("-content -metaTitle -metaDescription -canonicalUrl")
    .sort({ views: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
});

// ─── Get latest posts ────────────────────────────────────────────────────────
export const getLatestPosts = cache(async (limit = 8): Promise<IPost[]> => {
  await dbConnect();

  const posts = await Post.find({ published: true })
    .populate("category", "name slug color")
    .select("-content -metaTitle -metaDescription -canonicalUrl")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
});

// ─── Get posts by category ──────────────────────────────────────────────────
export const getPostsByCategory = cache(async (
  categoryId: string,
  page = 1,
  limit = 12
): Promise<PaginatedResponse<IPost>> => {
  await dbConnect();

  const skip = (page - 1) * limit;
  const filter = { published: true, category: categoryId };
  const total = await Post.countDocuments(filter);

  const posts = await Post.find(filter)
    .populate("category", "name slug color")
    .populate("author", "name slug avatar")
    .select("-content -metaTitle -metaDescription -canonicalUrl")
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
});

// ─── Get related posts ──────────────────────────────────────────────────────
export const getRelatedPosts = cache(async (
  postId: string,
  categoryId: string,
  tags: string[],
  limit = 4
): Promise<IPost[]> => {
  await dbConnect();

  const posts = await Post.find({
    _id: { $ne: postId },
    published: true,
    $or: [{ category: categoryId }, { tags: { $in: tags } }],
  })
    .populate("category", "name slug color")
    .select("-content -metaTitle -metaDescription -canonicalUrl")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
});

// ─── Get all post slugs (for static generation) ─────────────────────────────
export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  await dbConnect();

  const posts = await Post.find({ published: true }).select("slug").lean();
  return posts.map((p) => p.slug);
});

// ─── Get posts for sitemap (slug + date only) ────────────────────────────────
export const getPostsForSitemap = cache(async (): Promise<{ slug: string; updatedAt: string }[]> => {
  await dbConnect();

  const posts = await Post.find({ published: true })
    .select("slug updatedAt")
    .sort({ updatedAt: -1 })
    .lean();
  return serialize<{ slug: string; updatedAt: string }[]>(posts);
});

// ─── Increment post views ───────────────────────────────────────────────────
export async function incrementViews(slug: string): Promise<void> {
  await dbConnect();
  await Post.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
}

// ─── Search posts ────────────────────────────────────────────────────────────
export const searchPosts = cache(async (
  query: string,
  limit = 10
): Promise<IPost[]> => {
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
    .select("-content -metaTitle -metaDescription -canonicalUrl")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return serialize<IPost[]>(posts);
});

// ─── Get homepage category data (categories + grouped posts) in ONE query ────
// Uses a single MongoDB aggregation with $lookup to fetch everything in one DB round-trip.
export const getHomepageCategoryData = cache(async (
  limitCategories = 4,
  limitPerCategory = 4
): Promise<{ categories: ICategory[]; groupedPosts: Map<string, IPost[]> }> => {
  await dbConnect();

  // Single aggregation: start from categories, $lookup posts, slice, done.
  const pipeline = [
    // 1. Get all categories sorted by name
    { $sort: { name: 1 as const } },
    // 2. Limit to the first N categories
    { $limit: limitCategories },
    // 3. $lookup: join posts for each category in one go
    {
      $lookup: {
        from: "posts",
        let: { catId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$category", "$$catId"] },
                  { $eq: ["$published", true] },
                ],
              },
            },
          },
          { $sort: { createdAt: -1 as const } },
          { $limit: limitPerCategory },
          {
            $project: {
              title: 1,
              slug: 1,
              excerpt: 1,
              coverImage: 1,
              coverImageAlt: 1,
              coverImageWidth: 1,
              coverImageHeight: 1,
              category: 1,
              isBreaking: 1,
              readTime: 1,
              createdAt: 1,
              tags: 1,
            },
          },
        ],
        as: "posts",
      },
    },
  ];

  const results = await Category.aggregate(pipeline);

  const categories: ICategory[] = [];
  const groupedPosts = new Map<string, IPost[]>();

  for (const catDoc of results) {
    const cat = serialize<ICategory>({
      _id: catDoc._id,
      name: catDoc.name,
      slug: catDoc.slug,
      color: catDoc.color,
      description: catDoc.description || "",
      createdAt: catDoc.createdAt || "",
      updatedAt: catDoc.updatedAt || "",
    });
    categories.push(cat);

    if (catDoc.posts && catDoc.posts.length > 0) {
      const mappedPosts = catDoc.posts.map((post: unknown) => {
        const serializedPost = serialize<IPost>(post);
        serializedPost.category = cat;
        return serializedPost;
      });
      groupedPosts.set(cat.slug, mappedPosts);
    }
  }

  return { categories, groupedPosts };
});

export interface HomepageData {
  breakingPosts: IPost[];
  categories: ICategory[];
  latestPosts: IPost[];
  trendingPosts: IPost[];
  categoryBlocks: {
    category: ICategory;
    posts: IPost[];
  }[];
}

// Aggregated homepage data fetching to run DB requests in parallel and prevent duplicate fetches
export const getHomepageData = cache(async (): Promise<HomepageData> => {
  const [
    breakingPosts,
    categories,
    latestPosts,
    trendingPosts,
    categoryBlocksData,
  ] = await Promise.all([
    getBreakingNews(5),
    getCategories(),
    getLatestPosts(8),
    getTrendingPosts(6),
    getHomepageCategoryData(4, 4),
  ]);

  return {
    breakingPosts,
    categories,
    latestPosts,
    trendingPosts,
    categoryBlocks: categoryBlocksData.categories.map((cat) => ({
      category: cat,
      posts: categoryBlocksData.groupedPosts.get(cat.slug) || [],
    })),
  };
});

