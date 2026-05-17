import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = 60;
export const dynamicParams = true;

// ─── Generate Metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    // In a real application, fetch the author from the DB
    // const author = await getAuthorBySlug(slug);
    // if (!author) return { title: "Author Not Found" };

    const title = `${slug.replace("-", " ")} - Author at ${SITE_NAME}`;
    const description = `Read articles by ${slug.replace("-", " ")} on ${SITE_NAME}.`;

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/author/${slug}`,
      },
      openGraph: {
        title,
        description,
        type: "profile",
        url: `${SITE_URL}/author/${slug}`,
      },
    };
  } catch {
    return { title: "Author Not Found" };
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Example fetch:
  // const author = await getAuthorBySlug(slug); 
  // if (!author) notFound();

  // Author Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: slug.replace("-", " "),
    url: `${SITE_URL}/author/${slug}`,
    jobTitle: "Journalist",
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-main py-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ac2b25] to-black flex items-center justify-center text-white text-3xl font-bold mb-4">
            {slug.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-4xl font-bold font-serif mb-4 text-[var(--text-primary)] capitalize">
            {slug.replace("-", " ")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl text-lg">
            Author profile and article listings will appear here. To finalize this, ensure `getAuthorBySlug` and `getPostsByAuthor` are implemented in your lib layer and connected.
          </p>
        </div>
      </div>
    </>
  );
}
