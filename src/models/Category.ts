import mongoose, { Schema, Model } from "mongoose";

export interface ICategoryDocument extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    color: { type: String, default: "#c0392b" },
  },
  { timestamps: true }
);



const Category: Model<ICategoryDocument> =
  mongoose.models.Category ||
  mongoose.model<ICategoryDocument>("Category", CategorySchema);

export default Category;
