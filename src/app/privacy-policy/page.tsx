import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | NewsNova",
    description:
        "Read the Privacy Policy of NewsNova to understand how we collect, use, and protect your data while you stay updated with the latest Jhansi News and national stories.",
    keywords: [
        "Privacy Policy",
        "NewsNova privacy",
        "data protection",
        "cookies policy",
        "Jhansi News",
    ],
    openGraph: {
        title: "Privacy Policy | NewsNova",
        description:
            "Learn how NewsNova protects your personal information and respects your digital privacy.",
        url: "https://newsnova.online/privacy-policy",
        siteName: "NewsNova",
        type: "website",
    },
    alternates: {
        canonical: "https://newsnova.online/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
    const lastUpdated = "May 17, 2026";

    return (
        <div className="min-h-screen bg-white">
            {/* ── Header ── */}
            <div className="bg-gray-950 text-white">
                <div className="max-w-4xl mx-auto px-5 py-14 md:py-20">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400 mb-4 block">
                        Legal Information
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Last Updated: {lastUpdated}
                    </p>
                    <div className="w-16 h-1 bg-red-600 mt-6" />
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="max-w-4xl mx-auto px-5 py-12 md:py-16 space-y-12 text-[var(--text-secondary)] text-lg leading-relaxed">
                
                {/* Introduction */}
                <section>
                    <p className="mb-4">
                        Welcome to <strong className="text-[var(--text-primary)]">NewsNova</strong>. We are committed to protecting your personal information and your right to privacy. When you visit our website to read the latest <strong>Jhansi News</strong>, state updates, or national headlines, you are trusting us with your data. We take this responsibility very seriously.
                    </p>
                    <p>
                        This Privacy Policy document outlines in clear, accessible language how we collect, use, share, and protect your personal information when you interact with our digital platform. By continuing to use NewsNova, you agree to the terms outlined in this policy. While our primary operations are based in India, we strive to structure our data practices in alignment with global standards, including the principles found within the General Data Protection Regulation (GDPR), to ensure the highest level of user trust and transparency.
                    </p>
                </section>

                <hr className="border-[var(--border-color)]" />

                {/* Information We Collect */}
                <section>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                        Information We Collect
                    </h2>
                    <p className="mb-4">
                        To provide you with a seamless and engaging news reading experience, we collect information in a few different ways. The data we gather generally falls into two categories: information you voluntarily provide to us, and information we collect automatically as you navigate our platform.
                    </p>
                    
                    <h3 className="font-bold text-[var(--text-primary)] mt-6 mb-2">1. Information You Voluntarily Provide</h3>
                    <p className="mb-4">
                        We collect personal information that you intentionally share with us. For example, if you choose to interact with our articles through our <strong>comment system</strong>, we may collect your name, email address, and the content of your comment. If you subscribe to our newsletter or reach out to our newsroom via the contact form with a news tip regarding <strong>Jhansi News</strong>, we collect your email address and any additional contact details you provide to facilitate communication.
                    </p>

                    <h3 className="font-bold text-[var(--text-primary)] mt-6 mb-2">2. Information Collected Automatically</h3>
                    <p>
                        Like most modern digital publishers, we automatically collect certain non-personally identifiable information when you visit, use, or navigate NewsNova. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our website. This data is primarily used to maintain the security and operation of our platform, and for our internal analytics and reporting purposes.
                    </p>
                </section>

                {/* How We Use Information */}
                <section>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                        How We Use Information
                    </h2>
                    <p className="mb-4">
                        Any information we collect from you may be used in one of the following ways:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 mb-4">
                        <li>
                            <strong className="text-[var(--text-primary)]">To personalize your experience:</strong> Your information helps us better respond to your individual needs and curate news content, such as prioritizing local <strong>Jhansi News</strong> alerts if we detect sustained interest in regional categories.
                        </li>
                        <li>
                            <strong className="text-[var(--text-primary)]">To improve our website:</strong> We continually strive to improve our website offerings based on the information and feedback we receive from you.
                        </li>
                        <li>
                            <strong className="text-[var(--text-primary)]">To manage our comment system:</strong> When you leave a comment on an article, we use your provided details to display your public comment, prevent spam, and foster a safe community discussion environment.
                        </li>
                        <li>
                            <strong className="text-[var(--text-primary)]">To send periodic emails:</strong> If you opt-in to our mailing list, the email address you provide may be used to send you daily news briefs, breaking news alerts, company updates, or related service information.
                        </li>
                    </ul>
                </section>

                {/* Cookies Policy */}
                <section>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                        Cookies Policy
                    </h2>
                    <p className="mb-4">
                        Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide reporting information to the site owners.
                    </p>
                    <p className="mb-4">
                        At NewsNova, we use cookies to understand and save your preferences for future visits, keep track of advertisements, and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. 
                    </p>
                    <p>
                        You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings. However, if you disable cookies, some features that make your site experience more efficient may not function properly, such as remembering your login state for the comment system or retaining your preferred reading theme.
                    </p>
                </section>

                {/* Third Party Services */}
                <section>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                        Third Party Services
                    </h2>
                    <p className="mb-4">
                        We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.
                    </p>
                    <p className="mb-4">
                        Specifically, we use generic analytics platforms such as <strong>Google Analytics</strong> to help us understand how our readers interact with the site. These third-party tools use cookies and similar tracking technologies to track user behavior, measure page load speeds, and monitor traffic sources. This helps us determine which articles—from national politics to breaking <strong>Jhansi News</strong>—are resonating most with our audience, allowing us to optimize our editorial focus.
                    </p>
                    <p>
                        Additionally, our website may contain social media sharing buttons (such as Twitter, Facebook, or WhatsApp). When you use these features, those third-party platforms may collect information about your visit. We do not control these third-party tracking technologies and recommend reviewing their respective privacy policies to understand how your data is handled.
                    </p>
                </section>

                {/* Data Protection */}
                <section>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                        Data Protection
                    </h2>
                    <p className="mb-4">
                        The security of your personal information is extremely important to us. We implement a variety of industry-standard security measures to maintain the safety of your personal information when you enter, submit, or access your personal information on our platform.
                    </p>
                    <p>
                        NewsNova uses secure server protocols and robust database encryption to prevent unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site. However, please be aware that no method of transmission over the internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                    </p>
                </section>

                {/* User Rights */}
                <section>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                        User Rights
                    </h2>
                    <p className="mb-4">
                        In alignment with progressive data protection frameworks such as the GDPR, we believe that you should have complete control over your personal data. Regardless of your geographical location, NewsNova grants you the following rights regarding your data:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 mb-4">
                        <li>
                            <strong className="text-[var(--text-primary)]">The Right to Access:</strong> You have the right to request copies of your personal data that we have collected.
                        </li>
                        <li>
                            <strong className="text-[var(--text-primary)]">The Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
                        </li>
                        <li>
                            <strong className="text-[var(--text-primary)]">The Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions. For example, if you wish to have your comments removed from our articles, you may contact us to initiate this process.
                        </li>
                        <li>
                            <strong className="text-[var(--text-primary)]">The Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.
                        </li>
                    </ul>
                </section>

                {/* Contact Information */}
                <section>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                        Contact Information
                    </h2>
                    <p className="mb-6">
                        We welcome your questions, comments, and concerns about privacy. If you have any inquiries regarding this Privacy Policy or wish to exercise any of your data rights, please do not hesitate to contact us.
                    </p>
                    
                    <div className="bg-gray-50 border border-[var(--border-color)] rounded-xl p-6 md:p-8">
                        <h3 className="font-bold text-[var(--text-primary)] text-xl mb-4">NewsNova Privacy Team</h3>
                        <p className="mb-2"><strong>Email:</strong> privacy@newsnova.online</p>
                        <p className="mb-6"><strong>Support Page:</strong> <a href="/contact" className="text-red-600 hover:text-red-800 underline transition-colors">Visit our Contact Page</a></p>
                        <p className="text-sm">
                            We aim to respond to all data privacy inquiries within 48 to 72 hours.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}
