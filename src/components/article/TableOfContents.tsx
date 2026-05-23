"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="Table of Contents">
      <div className="bg-white border border-gray-200 p-5">
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2 font-serif">
          <svg
            className="w-4 h-4 text-[#ac2b25]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          On This Page
        </h4>
        <ul className="space-y-1">
{headings.map(({ id, text, level }, index) => (
  <li key={`${id}-${text}-${level}`}>
                <a
                href={`#${id}`}
                className={`toc-link line-clamp-2 break-words ${activeId === id ? "active text-[#ac2b25] border-[#ac2b25]" : "text-gray-500 hover:text-[#ac2b25]"}`}
                style={{ paddingLeft: `${(level - 2) * 0.75 + 1}rem` }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                title={text.replace(/&nbsp;/gi, " ")}
              >
                {text.replace(/&nbsp;/gi, " ")}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
