import Link from "next/link";
import { ICategory } from "@/types";
import { NavbarClient } from "./NavbarClient";
import { ClockIcon, TwitterIcon, FacebookIcon } from "@/components/ui/Icons";

interface NavbarProps {
  categories: ICategory[];
}

export default function Navbar({ categories }: NavbarProps) {
  // Format date server-side (Goal 6: server-rendered date to avoid hydration mismatches)
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // 'en-GB' gives "Sunday, 17 May 2026" exactly.
  const formattedDate = date.toLocaleDateString("en-GB", options);

  // Serialize only the fields needed for the client menu to avoid sending full Mongoose documents (Goal 4)
  const clientCategories = categories.map((cat) => ({
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    color: cat.color,
  }));

  return (
    <>
      <header className="bg-white border-b border-gray-200 w-full relative z-50">
        {/* Top Bar */}
        <div className="bg-[#f8f9fa] border-b border-gray-200 hidden md:block">
          <div className="container-main flex justify-between items-center py-2 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-4">
              <span className="bg-[#ac2b25] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
                Trending
              </span>
              <span className="truncate max-w-[400px]">
                Stock Markets Hit New All-Time Highs Amid Global Economic Optimism
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <div className="flex items-center gap-3 ml-2 border-l pl-4 border-gray-300">
                <a
                  href="#"
                  className="hover:text-[#ac2b25] transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  className="hover:text-[#ac2b25] transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header / Logo Area */}
        <div className="container-main py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-sm bg-[#ac2b25] flex items-center justify-center">
              <span className="text-white font-serif italic font-bold text-2xl">
                N
              </span>
            </div>
            <span className="font-bold text-3xl tracking-tight text-gray-900 font-serif">
              News<span className="text-[#ac2b25]">Nova</span>
            </span>
          </Link>

          {/* Ad Banner Placeholder */}
          <div className="hidden lg:flex w-[600px] h-[90px] bg-gray-100 border border-gray-200 items-center justify-center text-gray-400 text-sm font-medium">
            Advertisement Space (728x90)
          </div>
        </div>

        {/* Navigation Bar & Interactivity */}
        <NavbarClient categories={clientCategories} />
      </header>
    </>
  );
}
