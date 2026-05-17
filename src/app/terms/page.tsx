import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms and Conditions | NewsNova — Jhansi News Platform",
    description:
        "Read the Terms and Conditions of NewsNova, the trusted digital Jhansi news publishing platform. Understand your rights, content policies, and legal obligations.",
    keywords: [
        "NewsNova terms and conditions",
        "Jhansi News",
        "Jhansi news platform terms",
        "NewsNova legal",
        "news website terms of use",
        "digital journalism India",
    ],
    openGraph: {
        title: "Terms and Conditions | NewsNova — Jhansi News Platform",
        description:
            "Review the official Terms and Conditions governing your use of NewsNova, your trusted source for Jhansi news and national updates.",
        url: "https://newsnova.online/terms-and-conditions",
        siteName: "NewsNova",
        type: "website",
    },
    alternates: {
        canonical: "https://newsnova.online/terms-and-conditions",
    },
};

const sections = [
    {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        content: (
            <>
                <p>
                    By visiting, browsing, or using any part of the NewsNova website, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions, along with our{" "}
                    <Link href="/privacy-policy" className="text-red-600 hover:underline">
                        Privacy Policy
                    </Link>. If you do not agree to these terms, you must immediately discontinue your use of this website.
                </p>
                <p>
                    These terms apply to all visitors, readers, contributors, and users of NewsNova, a digital <strong>Jhansi news</strong> publishing platform dedicated to delivering accurate, timely, and reliable news coverage from Jhansi, Bundelkhand, Uttar Pradesh, and across India.
                </p>
            </>
        ),
    },
    {
        id: "use",
        title: "2. Use of Website",
        content: (
            <>
                <p>You agree to use NewsNova solely for lawful purposes and in a manner that does not infringe the rights of others. Specifically, you must not:</p>
                <ul className="list-none space-y-2 mt-3">
                    {[
                        "Publish, transmit, or share any content that is unlawful, defamatory, obscene, threatening, invasive of privacy, or otherwise objectionable.",
                        "Attempt to gain unauthorized access to any part of the website, its servers, or any connected systems.",
                        "Use automated tools, bots, or scrapers to extract content from NewsNova without prior written permission.",
                        "Misrepresent your identity or impersonate any individual, organization, or news entity while interacting with our platform.",
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-3">
                    NewsNova reserves the right to restrict or terminate access to any user who violates these conditions without prior notice.
                </p>
            </>
        ),
    },
    {
        id: "ownership",
        title: "3. Content Ownership and Intellectual Property",
        content: (
            <>
                <p>
                    All content published on NewsNova — including articles, reports, photographs, graphics, videos, headlines, and editorial analyses covering <strong>Jhansi news</strong> and beyond — is the exclusive intellectual property of NewsNova unless otherwise credited to a third-party source.
                </p>
                <p>
                    You may share our content on social media or other platforms provided you clearly attribute the content to NewsNova and include a direct link to the original article. Reproducing, republishing, selling, or distributing our content in full, in part, or in modified form without prior written consent is strictly prohibited and may result in legal action under the Copyright Act, 1957, and other applicable Indian laws.
                </p>
                <p>
                    The NewsNova name, logo, and all associated branding elements are trademarks of NewsNova and may not be used without express written permission.
                </p>
            </>
        ),
    },
    {
        id: "ugc",
        title: "4. User-Generated Content and Comments Policy",
        content: (
            <>
                <p>
                    NewsNova may allow readers to post comments or submit content in designated sections of the website. By submitting any user-generated content, you grant NewsNova a non-exclusive, royalty-free, perpetual license to use, display, edit, or remove that content at our sole discretion.
                </p>
                <p>
                    You are solely responsible for any content you submit. NewsNova does not endorse user-generated content and is not liable for any comments, opinions, or submissions made by readers. We reserve the right to moderate, edit, or delete any comment that contains hate speech, misinformation, personal attacks, spam, or content that violates any applicable law or these terms.
                </p>
                <p>
                    Repeated violations of our comments policy may result in permanent suspension of your ability to interact with the platform.
                </p>
            </>
        ),
    },
    {
        id: "accuracy",
        title: "5. Accuracy of Jhansi News Content — Disclaimer",
        content: (
            <>
                <p>
                    NewsNova is committed to delivering accurate and well-researched <strong>Jhansi news</strong> and regional updates. Our editorial team works diligently to verify information before publication. However, news is a dynamic and rapidly evolving field. Information that is accurate at the time of publication may become outdated, incomplete, or require correction as new facts emerge.
                </p>
                <p>
                    NewsNova makes no warranties, express or implied, regarding the absolute accuracy, completeness, or timeliness of any news content published on this platform. All <strong>Jhansi news</strong> articles, reports, and updates are provided on an "as is" basis for general informational purposes only. Readers are encouraged to independently verify critical information before making any decisions based on our content.
                </p>
                <p>
                    Corrections and updates to published articles are made at the discretion of our editorial team and will be clearly noted where applicable.
                </p>
            </>
        ),
    },
    {
        id: "links",
        title: "6. External Links Disclaimer",
        content: (
            <>
                <p>
                    Our website may contain hyperlinks to third-party websites, sources, or external platforms for the convenience of our readers. These links do not constitute an endorsement, recommendation, or approval of the linked website or its content by NewsNova.
                </p>
                <p>
                    We have no control over the content, privacy practices, or availability of external websites. NewsNova accepts no responsibility or liability for any loss, damage, or inconvenience caused by your use of or reliance on any external website linked from our platform. We encourage you to review the terms and privacy policies of any third-party websites you visit.
                </p>
            </>
        ),
    },
    {
        id: "liability",
        title: "7. Limitation of Liability",
        content: (
            <>
                <p>
                    To the fullest extent permitted by applicable law, NewsNova, its editors, contributors, and administrators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website or its content. This includes, without limitation, damages arising from:
                </p>
                <ul className="list-none space-y-2 mt-3">
                    {[
                        "Errors or inaccuracies in Jhansi news reporting.",
                        "Technical interruptions or downtime of the website.",
                        "Unauthorized access to or alteration of your data.",
                        "Reliance on any content, advertisement, or information published on NewsNova.",
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-3">Your use of this platform is entirely at your own risk.</p>
            </>
        ),
    },
    {
        id: "changes",
        title: "8. Changes to These Terms",
        content: (
            <>
                <p>
                    NewsNova reserves the right to modify, update, or replace these Terms and Conditions at any time without prior notice. As a dynamic digital <strong>Jhansi news</strong> publishing platform, our policies may evolve to reflect changes in law, editorial standards, technology, or business practices.
                </p>
                <p>
                    The <strong>Last Updated</strong> date at the top of this page will always reflect the most recent revision. Continued use of NewsNova after any changes to these terms constitutes your acceptance of the updated terms. We encourage you to review this page periodically to stay informed of any changes.
                </p>
            </>
        ),
    },
    {
        id: "law",
        title: "9. Governing Law and Jurisdiction",
        content: (
            <>
                <p>
                    These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from or in connection with your use of NewsNova shall be subject to the exclusive jurisdiction of the competent courts located in Jhansi, Uttar Pradesh, India.
                </p>
                <p>
                    By using this website, you consent to the personal jurisdiction of such courts and waive any objection to the laying of venue in Jhansi, Uttar Pradesh.
                </p>
            </>
        ),
    },
    {
        id: "contact",
        title: "10. Contact Us",
        content: (
            <p>
                If you have any questions, concerns, or feedback regarding these Terms and Conditions, or if you wish to report a potential violation, please reach out to the NewsNova team through our{" "}
                <Link href="/contact" className="text-red-600 hover:underline">
                    Contact Page
                </Link>. Our editorial and legal team will respond to your inquiry as promptly as possible.
            </p>
        ),
    },
];

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">

            {/* ── Hero ── */}
            <div className="bg-gray-950 text-white">
                <div className="max-w-4xl mx-auto px-5 py-14 md:py-20">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400 mb-4 block">
                        Legal
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
                        Terms and Conditions
                    </h1>
                    <p className="text-gray-300 text-base">
                        <strong>Effective Date:</strong> May 17, 2026 &nbsp;·&nbsp; <strong>Last Updated:</strong> May 17, 2026
                    </p>
                    <div className="w-16 h-1 bg-red-600 mt-6" />
                </div>
            </div>

            {/* ── Content ── */}
            <div className="max-w-4xl mx-auto px-5 py-12 md:py-16">

                {/* Intro */}
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
                    Welcome to <strong className="text-[var(--text-primary)]">NewsNova</strong>. By accessing or using our website at{" "}
                    <a href="https://newsnova.online" className="text-red-600 hover:underline">newsnova.online</a>, you agree to be bound by these Terms and Conditions. Please read them carefully before using our platform.
                </p>

                {/* Sections */}
                <div className="space-y-10">
                    {sections.map((section) => (
                        <section key={section.id} id={section.id}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-1 h-7 bg-red-600 rounded-full flex-shrink-0" />
                                <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="pl-5 space-y-4 text-[var(--text-secondary)] leading-relaxed">
                                {section.content}
                            </div>
                            <hr className="border-[var(--border-color)] mt-10" />
                        </section>
                    ))}
                </div>

                {/* Footer note */}
                <p className="mt-10 text-sm text-[var(--text-secondary)] text-center">
                    Thank you for being a valued reader of <strong className="text-[var(--text-primary)]">NewsNova</strong> — your trusted source for breaking <strong>Jhansi News</strong>, regional updates, and national coverage.
                </p>

            </div>
        </div>
    );
}