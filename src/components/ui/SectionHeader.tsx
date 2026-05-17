"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  viewAllHref?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  accent,
  viewAllHref,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-end justify-between mb-6 sm:mb-8 border-b-2 border-gray-200 pb-3 relative"
    >
      {/* Accent Line Bottom */}
      <div className="absolute -bottom-0.5 left-0 w-16 h-0.5 bg-[#ac2b25]" />
      
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-gray-900 uppercase tracking-wide">
          {accent ? (
            <>
              <span className="text-[#ac2b25] mr-1">{accent}</span>
              {title.replace(accent, "").trim()}
            </>
          ) : (
            title
          )}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1 font-medium">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <a
          href={viewAllHref}
          className="text-[13px] font-bold uppercase tracking-wider text-gray-500 hover:text-[#ac2b25] transition-colors flex items-center gap-1 shrink-0"
        >
          View All
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </motion.div>
  );
}
