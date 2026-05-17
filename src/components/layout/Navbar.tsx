"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ICategory } from "@/types";

interface NavbarProps {
  categories: ICategory[];
}

export default function Navbar({ categories }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Format date like "Thursday, 28 May 2020"
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
    
    setIsMobileMenuOpen(false);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 w-full relative z-50">
        
        {/* Top Bar */}
        <div className="bg-[#f8f9fa] border-b border-gray-200 hidden md:block">
          <div className="container-main flex justify-between items-center py-2 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-4">
              <span className="bg-[#ac2b25] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Trending</span>
              <span className="truncate max-w-[400px]">Stock Markets Hit New All-Time Highs Amid Global Economic Optimism</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {currentDate}
              </span>
              <div className="flex items-center gap-3 ml-2 border-l pl-4 border-gray-300">
                <a href="#" className="hover:text-[#ac2b25] transition-colors"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                <a href="#" className="hover:text-[#ac2b25] transition-colors"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg></a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header / Logo Area */}
        <div className="container-main py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-sm bg-[#ac2b25] flex items-center justify-center">
              <span className="text-white font-serif italic font-bold text-2xl">N</span>
            </div>
            <span className="font-bold text-3xl tracking-tight text-gray-900 font-serif">
              News<span className="text-[#ac2b25]">Nova</span>
            </span>
          </Link>

          {/* Ad Banner Placeholder (Optional) */}
          <div className="hidden lg:flex w-[600px] h-[90px] bg-gray-100 border border-gray-200 items-center justify-center text-gray-400 text-sm font-medium">
            Advertisement Space (728x90)
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="border-t border-b border-gray-200 bg-white">
          <div className="container-main flex items-center justify-between h-14">
            
            {/* Mobile Menu Toggle & Search (Visible on small screens) */}
            <div className="flex lg:hidden w-full justify-between items-center">
               <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#ac2b25] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-[#ac2b25]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                prefetch={true}
                className="px-4 py-4 text-[13px] font-bold uppercase tracking-wider text-white bg-[#ac2b25] hover:bg-black transition-colors"
              >
                Home
              </Link>
              {categories.slice(0, 7).map((cat) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.slug}`}
                  prefetch={true}
                  className="px-4 py-4 text-[13px] font-bold uppercase tracking-wider text-gray-800 hover:text-[#ac2b25] transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              {categories.length > 7 && (
                <div className="relative group h-full flex items-center">
                  <button className="px-4 py-4 text-[13px] font-bold uppercase tracking-wider text-gray-800 hover:text-[#ac2b25] flex items-center gap-1">
                    More
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {categories.slice(7).map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-[#ac2b25] hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Right Side (Search) */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-3 text-gray-700 hover:text-[#ac2b25] transition-colors border-l border-gray-200 ml-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-b border-gray-200 bg-gray-50 overflow-hidden"
            >
              <div className="container-main py-4">
                <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news, topics, or authors..."
                    className="w-full px-5 py-4 bg-white border border-gray-300 shadow-inner rounded text-gray-900 focus:outline-none focus:border-[#ac2b25] transition-colors"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-[#ac2b25]"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-[60] w-[280px] bg-white border-r border-gray-200 shadow-xl lg:hidden overflow-y-auto"
            >
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#ac2b25]">
                <span className="font-bold text-xl tracking-tight text-white font-serif">
                  NewsNova
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-white hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex flex-col py-2">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 text-gray-800 hover:text-[#ac2b25] hover:bg-gray-50 font-bold uppercase text-[13px] tracking-wide border-b border-gray-100"
                >
                  Home
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-3 text-gray-800 hover:text-[#ac2b25] hover:bg-gray-50 font-bold uppercase text-[13px] tracking-wide border-b border-gray-100"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
