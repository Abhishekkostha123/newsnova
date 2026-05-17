"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IComment } from "@/types";
import { timeAgo } from "@/lib/utils";

interface CommentSectionProps {
  postId: string;
  initialComments: IComment[];
}

export default function CommentSection({
  postId,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    parentId: string | null = null
  ) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      postId,
      parentId,
      author: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
      },
      content: formData.get("content") as string,
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to post comment");
        return;
      }

      // Add comment to list
      if (parentId) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === parentId
              ? { ...c, replies: [...(c.replies || []), result.data] }
              : c
          )
        );
      } else {
        setComments((prev) => [result.data, ...prev]);
      }

      setSuccess("Comment posted successfully!");
      setReplyTo(null);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      const res = await fetch("/api/comments/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });

      if (res.ok) {
        const result = await res.json();
        setComments((prev) =>
          prev.map((c) => {
            if (c._id === commentId) {
              return { ...c, likes: result.data.likes };
            }
            if (c.replies) {
              return {
                ...c,
                replies: c.replies.map((r) =>
                  r._id === commentId ? { ...r, likes: result.data.likes } : r
                ),
              };
            }
            return c;
          })
        );
      }
    } catch {
      // Silently fail on like errors
    }
  };

  return (
    <section id="comments" className="mt-12">
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
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        Comments ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
      </h3>

      {/* Comment Form */}
      <CommentForm
        onSubmit={(e) => handleSubmit(e, null)}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
      />

      {/* Comments List */}
      <div className="mt-8 space-y-6">
        <AnimatePresence mode="popLayout">
          {comments.map((comment) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              layout
            >
              <CommentItem
                comment={comment}
                onReply={() => setReplyTo(comment._id)}
                onLike={() => handleLike(comment._id)}
              />

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 sm:ml-10 mt-4 space-y-4 border-l-2 border-[var(--border-color)] pl-4">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply._id}
                      comment={reply}
                      onLike={() => handleLike(reply._id)}
                      isReply
                    />
                  ))}
                </div>
              )}

              {/* Reply Form */}
              <AnimatePresence>
                {replyTo === comment._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 sm:ml-10 mt-4"
                  >
                    <CommentForm
                      onSubmit={(e) => handleSubmit(e, comment._id)}
                      isSubmitting={isSubmitting}
                      onCancel={() => setReplyTo(null)}
                      isReply
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-[var(--text-muted)]">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Comment Item ────────────────────────────────────────────────────────────
function CommentItem({
  comment,
  onReply,
  onLike,
  isReply = false,
}: {
  comment: IComment;
  onReply?: () => void;
  onLike: () => void;
  isReply?: boolean;
}) {
  return (
    <div className={`glass-card p-4 sm:p-5 ${isReply ? "!bg-[var(--bg-tertiary)]/50" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{
            background: `hsl(${comment.author.name.charCodeAt(0) * 5}, 60%, 50%)`,
          }}
        >
          {comment.author.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-[var(--text-primary)]">
              {comment.author.name}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {timeAgo(comment.createdAt)}
            </span>
          </div>

          <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            {comment.content}
          </p>

          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={onLike}
              className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
            >
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
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              {comment.likes > 0 && comment.likes}
            </button>

            {onReply && (
              <button
                onClick={onReply}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
              >
                Reply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Comment Form ────────────────────────────────────────────────────────────
function CommentForm({
  onSubmit,
  isSubmitting,
  error,
  success,
  onCancel,
  isReply = false,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  error?: string;
  success?: string;
  onCancel?: () => void;
  isReply?: boolean;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`glass-card p-4 sm:p-6 ${isReply ? "!bg-[var(--bg-tertiary)]/50" : ""}`}
    >
      <h4 className="font-semibold text-sm text-[var(--text-primary)] mb-4">
        {isReply ? "Write a Reply" : "Leave a Comment"}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
        />
      </div>

      <textarea
        name="content"
        placeholder="Share your thoughts..."
        required
        rows={isReply ? 3 : 4}
        maxLength={2000}
        className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
      />

      {error && (
        <p className="text-xs text-[var(--breaking-red)] mt-2">{error}</p>
      )}
      {success && (
        <p className="text-xs text-[var(--success-green)] mt-2">{success}</p>
      )}

      <div className="flex items-center gap-3 mt-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : isReply ? "Reply" : "Post Comment"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
