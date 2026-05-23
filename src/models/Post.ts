import mongoose, { Schema, Model } from "mongoose";

export interface IPostDocument extends mongoose.Document {
  title: string;
  slug: string;
  excerpt: string;
  language: "en" | "hi";
  content: string;
  coverImage: string;
  coverImageAlt: string;
  coverImageWidth: number;
  coverImageHeight: number;
  category: mongoose.Types.ObjectId;
  tags: string[];
  author: mongoose.Types.ObjectId | null;
  published: boolean;
  views: number;
  readTime: number;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  isBreaking: boolean;
  accessType: "Free" | "Subscription" | "Metered";
  createdAt: Date;
  updatedAt: Date;
  incrementViews(): Promise<IPostDocument>;
}

const PostSchema = new Schema<IPostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, trim: true },
    language: { type: String, default: "en", enum: ["en", "hi"] },
    content: { type: String, required: true },

    // Media
    coverImage: { type: String, default: "" },
    coverImageAlt: { type: String, default: "" },
    coverImageWidth: { type: Number, default: 1200 },
    coverImageHeight: { type: Number, default: 630 },

    // Taxonomy
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [{ type: String, trim: true }],

    // Author
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      default: null,
    },

    // Status
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 1 },

    // SEO
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },

    // Google News
    isBreaking: { type: Boolean, default: false },
    accessType: {
      type: String,
      default: "Free",
      enum: ["Free", "Subscription", "Metered"],
    },
  },
  { timestamps: true }
);

// Indexes for fast lookups

PostSchema.index({ published: 1, createdAt: -1 });
PostSchema.index({ category: 1, published: 1, createdAt: -1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ isBreaking: 1, createdAt: -1 });
PostSchema.index({ views: -1 });
PostSchema.index({ title: "text", excerpt: "text", tags: "text" }, { weights: { title: 10, excerpt: 3, tags: 2 } });

PostSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

const Post: Model<IPostDocument> =
  mongoose.models.Post || mongoose.model<IPostDocument>("Post", PostSchema);

export default Post;
