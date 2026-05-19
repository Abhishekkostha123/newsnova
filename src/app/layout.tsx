import type { Metadata } from "next";
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
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Breaking Jhansi News & National Coverage`,
    description:
      "Get real-time Jhansi news, latest Uttar Pradesh updates, national headlines, politics, sports, and technology — all on NewsNova, your trusted digital news platform.",
    images: [`${SITE_URL}/og-default.png`],
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

async function LayoutShell({ children }: { children: React.ReactNode }) {
  let categories: ICategory[] = [];
  try {
    categories = await getCategories();
  } catch {
    // Render without categories if DB is unavailable
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
  // Merged into single @graph to reduce script tags and payload size
  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
        sameAs: [
          "https://twitter.com/newsnova",
          "https://www.facebook.com/NewsNovaJhansi/",
          "https://youtube.com/newsnova",
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} RSS Feed`} href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="antialiased font-sans">
        {/* LayoutShell is async but does NOT block page content — children stream independently */}
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
