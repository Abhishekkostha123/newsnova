import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCategories } from "@/lib/categories";
import { SITE_NAME, SITE_URL } from "@/lib/utils";
import { ICategory } from "@/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Breaking Jhansi News & Latest Updates`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "NewsNova is your trusted digital source for breaking Jhansi news, latest Uttar Pradesh updates, national headlines, politics, technology, and sports.",
  keywords: [
  "Jhansi News",
  "breaking Jhansi news",
  "latest Jhansi news today",
  "Bundelkhand news",
  "Uttar Pradesh news",
  "UP news today",
  "India news",
  "NewsNova",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Breaking Jhansi News & National Coverage`,
    description:
      "Get real-time Jhansi news, latest Uttar Pradesh updates, national headlines, politics, sports, and technology — all on NewsNova, your trusted digital news platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Breaking Jhansi News & National Coverage`,
    description:
      "Get real-time Jhansi news, latest Uttar Pradesh updates, national headlines, politics, sports, and technology — all on NewsNova, your trusted digital news platform.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

async function LayoutContent({ children }: { children: React.ReactNode }) {
  let categories: ICategory[] = [];
  try {
    categories = await getCategories();
  } catch {
    // Fallback: render without categories if DB is unavailable
  }

  return (
    <>
      <Navbar categories={categories} />
      <main className="min-h-screen">{children}</main>
      <Footer categories={categories} />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/newsnova",
      "https://www.facebook.com/NewsNovaJhansi/",
      "https://youtube.com/newsnova",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} RSS Feed`}
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased font-sans">
        <Suspense
          fallback={
            <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <LayoutContent>{children}</LayoutContent>
        </Suspense>
      </body>
    </html>
  );
}
