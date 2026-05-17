"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IPost } from "@/types";

interface BreakingNewsProps {
  posts: IPost[];
}

export default function BreakingNews({ posts }: BreakingNewsProps) {
  if (!posts || posts.length === 0) return null;

  // Duplicate posts for seamless loop
  const duplicated = [...posts, ...posts];

  return (
    <div className="breaking-ticker relative">
      <div className="container-main flex items-center py-2.5 gap-4">
        {/* Badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full"
        >
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Breaking
          </span>
        </motion.div>

        {/* Ticker */}
        <div className="overflow-hidden flex-1 min-w-0">
          <div className="ticker-content">
            {duplicated.map((post, idx) => (
              <Link
                key={`${post._id}-${idx}`}
                href={`/post/${post.slug}`}
                className="inline-flex items-center gap-3 px-4 text-sm text-white/95 font-medium hover:text-white transition-colors whitespace-nowrap"
              >
                <span className="w-1 h-1 bg-white/60 rounded-full shrink-0" />
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
