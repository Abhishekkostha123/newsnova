import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { ICategory } from "@/types";

function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

// ─── Get all categories ──────────────────────────────────────────────────────
export async function getCategories(): Promise<ICategory[]> {
  await dbConnect();

  const categories = await Category.find({}).sort({ name: 1 }).lean();
  return serialize<ICategory[]>(categories);
}

// ─── Get category by slug ────────────────────────────────────────────────────
export async function getCategoryBySlug(
  slug: string
): Promise<ICategory | null> {
  await dbConnect();

  const category = await Category.findOne({ slug }).lean();
  if (!category) return null;
  return serialize<ICategory>(category);
}

// ─── Get all category slugs (for static generation) ─────────────────────────
export async function getAllCategorySlugs(): Promise<string[]> {
  await dbConnect();

  const categories = await Category.find({}).select("slug").lean();
  return categories.map((c) => c.slug);
}
