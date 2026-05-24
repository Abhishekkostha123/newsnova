"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchIcon, MenuIcon, CloseIcon, ChevronDownIcon } from "@/components/ui/Icons";

interface SerializedCategory {
  _id: string;
  name: string;
  slug: string;
  color: string;
}

interface NavbarClientProps {
  categories: SerializedCategory[];
}

export function NavbarClient({ categories }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <div className="border-t border-b border-gray-200 bg-white">
        <div className="container-main flex items-center justify-between h-14">
          
          {/* Mobile Menu Toggle & Search (Visible on small screens) */}
          <div className="flex lg:hidden w-full justify-between items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#ac2b25] transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-[#ac2b25]"
              aria-label="Toggle Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-4 text-[13px] font-bold uppercase tracking-wider text-white bg-[#ac2b25] hover:bg-black transition-colors"
            >
              Home
            </Link>
            {categories.slice(0, 7).map((cat) => (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                className="px-4 py-4 text-[13px] font-bold uppercase tracking-wider text-gray-800 hover:text-[#ac2b25] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            {categories.length > 7 && (
              <div className="relative group h-full flex items-center">
                <button className="px-4 py-4 text-[13px] font-bold uppercase tracking-wider text-gray-800 hover:text-[#ac2b25] flex items-center gap-1">
                  More
                  <ChevronDownIcon className="w-3.5 h-3.5" />
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
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="border-b border-gray-200 bg-gray-50 overflow-hidden animate-fade-in duration-200">
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
                aria-label="Submit Search"
              >
                <SearchIcon className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60 lg:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className="fixed top-0 left-0 bottom-0 z-[60] w-[280px] bg-white border-r border-gray-200 shadow-xl lg:hidden overflow-y-auto animate-slide-in-left"
          >
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#ac2b25]">
              <span className="font-bold text-xl tracking-tight text-white font-serif">
                NewsNova
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-white hover:text-gray-200"
                aria-label="Close Mobile Menu"
              >
                <CloseIcon className="w-6 h-6" />
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
          </div>
        </>
      )}
    </>
  );
}
