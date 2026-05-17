import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";
import { IComment } from "@/types";

function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

// ─── Get comments for a post (with nested replies) ──────────────────────────
export async function getCommentsByPost(postId: string): Promise<IComment[]> {
  await dbConnect();

  // Get top-level comments
  const topLevelComments = await Comment.find({
    postId,
    parentId: null,
    approved: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  // Get all replies
  const replies = await Comment.find({
    postId,
    parentId: { $ne: null },
    approved: true,
  })
    .sort({ createdAt: 1 })
    .lean();

  const serializedTop = serialize<IComment[]>(topLevelComments);
  const serializedReplies = serialize<IComment[]>(replies);

  // Nest replies under their parents
  const replyMap = new Map<string, IComment[]>();
  for (const reply of serializedReplies) {
    const parentId = reply.parentId!;
    if (!replyMap.has(parentId)) {
      replyMap.set(parentId, []);
    }
    replyMap.get(parentId)!.push(reply);
  }

  return serializedTop.map((comment) => ({
    ...comment,
    replies: replyMap.get(comment._id) || [],
  }));
}

// ─── Get comment count for a post ───────────────────────────────────────────
export async function getCommentCount(postId: string): Promise<number> {
  await dbConnect();
  return Comment.countDocuments({ postId, approved: true });
}
