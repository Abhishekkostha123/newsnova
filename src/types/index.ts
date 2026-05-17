// ─── Post Types ──────────────────────────────────────────────────────────────

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  language: "en" | "hi";
  content: string;

  // Media
  coverImage: string;
  coverImageAlt: string;
  coverImageWidth: number;
  coverImageHeight: number;

  // Taxonomy
  category: ICategory | string;
  tags: string[];

  // Author
  author: IAuthor | string | null;

  // Status
  published: boolean;
  views: number;
  readTime: number;

  // SEO
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;

  // Google News
  isBreaking: boolean;
  accessType: "Free" | "Subscription" | "Metered";

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ─── Category Types ──────────────────────────────────────────────────────────

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Author Types ────────────────────────────────────────────────────────────

export interface IAuthor {
  _id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// ─── Comment Types ───────────────────────────────────────────────────────────

export interface IComment {
  _id: string;
  postId: string;
  parentId: string | null;
  author: {
    name: string;
    email: string;
  };
  content: string;
  likes: number;
  likedBy: string[];
  approved: boolean;
  replies?: IComment[];
  createdAt: string;
  updatedAt: string;
}

// ─── API Response Types ──────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
