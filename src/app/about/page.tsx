import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About NewsNova | Trusted Source for Jhansi News & Latest Updates",
    description:
        "NewsNova is your reliable digital news platform for breaking Jhansi news, latest Uttar Pradesh updates, and top national stories. Discover our mission and editorial standards.",
    keywords: [
        "Jhansi News",
        "latest Jhansi news",
        "breaking Jhansi news",
        "NewsNova",
        "Jhansi local news",
        "Uttar Pradesh news",
        "digital journalism India",
        "trusted news platform",
    ],
    openGraph: {
        title: "About NewsNova | Breaking Jhansi News & National Coverage",
        description:
            "Learn about NewsNova's commitment to delivering fast, accurate, and unbiased Jhansi news and national updates through modern digital journalism.",
        url: "https://newsnova.online/about",
        siteName: "NewsNova",
        type: "website",
    },
    alternates: {
        canonical: "https://newsnova.online/about",
    },
};

const coverageAreas = [
    {
        title: "Jhansi & Bundelkhand Region",
        desc: "Hyper-local reporting focusing on community issues, local administration, and regional milestones.",
    },
    {
        title: "Uttar Pradesh News",
        desc: "State-wide political shifts, economic policies, educational updates, and major events affecting UP.",
    },
    {
        title: "National & World News",
        desc: "Top stories from across India and the globe, covering international relations, national politics, and major global events.",
    },
    {
        title: "Technology & Business",
        desc: "Insights into the latest technological advancements, market trends, startup ecosystems, and financial news.",
    },
    {
        title: "Entertainment & Lifestyle",
        desc: "The latest buzz from Bollywood, digital media trends, health tips, and cultural phenomena.",
    },
];

const eatPrinciples = [
    {
        label: "E",
        title: "Experience & Expertise",
        desc: "Our editorial team consists of seasoned journalists, local reporters, and subject matter experts who possess deep knowledge of the Jhansi and UP regions. They understand the nuances of local culture and politics, ensuring our reporting is not just fast, but contextually accurate.",
    },
    {
        label: "A",
        title: "Authoritativeness",
        desc: "We do not rely on rumors. Every piece of news is corroborated through official channels, trusted on-ground sources, and meticulous fact-checking before it is published.",
    },
    {
        label: "T",
        title: "Trustworthiness",
        desc: "We operate with complete transparency. Our commitment is to objective, unbiased reporting. We separate news from opinion, clearly label editorial content, and immediately issue corrections if new facts emerge.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">

            {/* ── Hero ── */}
            <div className="bg-gray-950 text-white">
                <div className="max-w-4xl mx-auto px-5 py-14 md:py-20">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400 mb-4 block">
                        About NewsNova
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
                        Redefining Digital Journalism: Your Trusted Hub for Jhansi News and Beyond
                    </h1>
                    <div className="w-16 h-1 bg-red-600 mt-6" />
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="max-w-4xl mx-auto px-5 py-12 md:py-16 space-y-16">

                {/* Intro paragraphs */}
                <section className="space-y-5 text-[var(--text-secondary)] text-lg leading-relaxed">
                    <p>
                        Welcome to <strong className="text-[var(--text-primary)]">NewsNova</strong>, the fastest-growing and most reliable modern digital news platform dedicated to bringing you the truth. In an era where information travels at the speed of light, finding a dependable source can be challenging. We bridge that gap by offering meticulously fact-checked, real-time reporting that matters to you. Whether you are searching for <strong className="text-[var(--text-primary)]">breaking Jhansi news</strong>, vital updates from across Uttar Pradesh, or significant national headlines, NewsNova is designed to be your primary destination for clarity and context.
                    </p>
                    <p>
                        Our platform is built for the digital generation—readers who demand speed without sacrificing accuracy. We blend traditional journalistic integrity with cutting-edge digital publishing technologies to deliver news that is accessible, engaging, and fundamentally trustworthy.
                    </p>
                </section>

                {/* Mission */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            Our Core Mission: Delivering Jhansi News Fast and Accurately
                        </h2>
                    </div>
                    <div className="space-y-5 text-lg text-[var(--text-secondary)] leading-relaxed">
                        <p>
                            At the heart of NewsNova is a profound commitment to local and regional empowerment through information. Our core mission is to provide unparalleled coverage of <strong className="text-[var(--text-primary)]">Jhansi News</strong>. We understand that local stories have a direct impact on the daily lives of our readers. Therefore, our dedicated team works around the clock to ensure you receive the <strong className="text-[var(--text-primary)]">latest Jhansi news</strong> as it unfolds.
                        </p>
                        <p>
                            From municipal developments and regional politics to local sports, cultural events, and business expansions, we ensure that the voices and stories of Jhansi are heard. By combining ground-level reporting with advanced digital broadcasting, we guarantee that when there is a major event, NewsNova is the first to bring the breaking updates directly to your screen.
                        </p>
                    </div>
                </section>

                {/* Coverage Areas */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            Comprehensive Coverage Areas
                        </h2>
                    </div>
                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                        While our roots and deep focus remain anchored in providing the best <strong className="text-[var(--text-primary)]">Jhansi News</strong>, our editorial scope extends far beyond the city limits to keep our readers globally and nationally aware.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {coverageAreas.map((area, i) => (
                            <div
                                key={i}
                                className="border border-[var(--border-color)] rounded-xl p-5 hover:border-red-300 hover:bg-red-50 transition-colors group"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-[var(--text-primary)] mb-1 group-hover:text-red-700 transition-colors">
                                            {area.title}
                                        </p>
                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                            {area.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Digital Journalism */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h3 className="font-serif text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                            A Focus on Digital Journalism and Real-Time Updates
                        </h3>
                    </div>
                    <div className="bg-gray-950 rounded-2xl p-8 text-white space-y-4">
                        <p className="text-gray-300 leading-relaxed">
                            NewsNova is not just a news website; it is a modern digital media ecosystem. We leverage state-of-the-art web technologies (like Next.js) to provide a lightning-fast, mobile-first reading experience. We know that the modern reader consumes content on the go. Our platform is engineered to deliver real-time notifications and instant page loads so that when <strong className="text-white">breaking Jhansi news</strong> happens, you are informed immediately.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Our SEO-friendly news publishing approach ensures that our content is easily discoverable. We adhere to the highest technical SEO standards, ensuring our articles are cleanly formatted, structurally sound, and free of clutter. This not only helps search engines understand our content but, more importantly, provides a seamless, distraction-free reading experience for you.
                        </p>
                    </div>
                </section>

                {/* E-E-A-T */}
                <section>
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            E-E-A-T: Why You Can Trust NewsNova
                        </h2>
                    </div>
                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 pl-5">
                        Trust is the currency of journalism. At NewsNova, we strictly adhere to the principles of{" "}
                        <strong className="text-[var(--text-primary)]">E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness)</strong>:
                    </p>
                    <div className="space-y-4">
                        {eatPrinciples.map((p) => (
                            <div key={p.label} className="flex gap-5 border border-[var(--border-color)] rounded-xl p-5">
                                <div className="w-10 h-10 rounded-lg bg-red-600 text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                                    {p.label}
                                </div>
                                <div>
                                    <p className="font-bold text-[var(--text-primary)] mb-1">{p.title}</p>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Vision */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            Looking Forward: Our Vision
                        </h2>
                    </div>
                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                        As we continue to grow, NewsNova envisions becoming the ultimate digital news authority in Uttar Pradesh and a trusted household name across India. We are constantly innovating, bringing in new formats like interactive data journalism, video reporting, and community-driven stories. Our goal is to empower our readers with knowledge that helps them make informed decisions in their personal and professional lives.
                    </p>
                </section>

                {/* Join community + CTA */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            Join the NewsNova Community
                        </h2>
                    </div>
                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                        Stay ahead of the curve. Whether you are looking for the <strong className="text-[var(--text-primary)]">latest Jhansi news</strong> or tracking national elections, NewsNova is your reliable companion.
                    </p>

                    {/* Connect With Us card */}
                    <div className="rounded-2xl overflow-hidden border border-[var(--border-color)]">
                        {/* Red header */}
                        <div className="bg-red-600 px-7 py-6">
                            <span className="text-xs font-bold tracking-[0.18em] uppercase text-red-200 block mb-1">
                                Newsroom
                            </span>
                            <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                                Connect With Us
                            </h3>
                        </div>
                        {/* Body */}
                        <div className="bg-[var(--bg-tertiary)] px-7 py-6">
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                                Do you have a news tip, a local story that needs attention, or feedback on our reporting? We are always listening to our readers.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-6 text-sm text-[var(--text-secondary)]">
                                {["News Tip", "Local Story", "Feedback", "Partnership"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="border border-[var(--border-color)] rounded-full px-4 py-1 text-xs font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-7 rounded-lg transition-colors text-sm"
                            >
                                Contact Our Newsroom
                                <span aria-hidden>→</span>
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}