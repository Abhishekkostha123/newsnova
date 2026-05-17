import mongoose, { Schema, Model } from "mongoose";

export interface ICommentDocument extends mongoose.Document {
  postId: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId | null;
  author: {
    name: string;
    email: string;
  };
  content: string;
  likes: number;
  likedBy: string[];
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<ICommentDocument>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    author: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
    },
    content: { type: String, required: true, maxlength: 2000 },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }],
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CommentSchema.index({ postId: 1, approved: 1, createdAt: -1 });
CommentSchema.index({ parentId: 1 });

const Comment: Model<ICommentDocument> =
  mongoose.models.Comment ||
  mongoose.model<ICommentDocument>("Comment", CommentSchema);

export default Comment;
