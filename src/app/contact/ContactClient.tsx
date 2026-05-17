"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";

// Move metadata to a separate layout/page.tsx if using "use client"
// export const metadata: Metadata = { ... }

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyDJ07p4ub9J7QJN1cfaBI5FOo3gSIe0GsuBIvz3qaeOIUVPWJcGC5_OhzZvhm-TKYmFQ/exec";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-white">

            {/* ── Hero Header ── */}
            <div className="bg-gray-950 text-white">
                <div className="max-w-4xl mx-auto px-5 py-14 md:py-20">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400 mb-4 block">
                        Get In Touch
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
                        Contact NewsNova
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl">
                        Your voice matters. Whether you have a breaking story or a general inquiry, our newsroom is always listening.
                    </p>
                    <div className="w-16 h-1 bg-red-600 mt-6" />
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-4xl mx-auto px-5 py-12 md:py-16 space-y-12 text-[var(--text-secondary)] text-lg leading-relaxed">

                {/* Intro */}
                <section>
                    <p className="mb-4">
                        Welcome to the official contact page for <strong className="text-[var(--text-primary)]">NewsNova</strong>. As a modern digital journalism platform, we thrive on community engagement and open communication. Our mission is to keep you informed with the most accurate, real-time reporting available.
                    </p>
                    <p>
                        We are proud to serve as your primary source for reliable information. If you are looking for the latest <strong>Jhansi news updates</strong>, national headlines, or insightful regional stories, our editorial team is working around the clock. But journalism is a two-way street, and we rely on engaged readers like you to help us uncover the truth. If you want to <strong>contact the Jhansi news team</strong>, you are in the exact right place.
                    </p>
                </section>

                <hr className="border-[var(--border-color)]" />

                {/* Why Contact */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            Why Contact NewsNova?
                        </h2>
                    </div>
                    <p className="mb-6">
                        We encourage our readers, local residents, and business partners to reach out to us for a variety of reasons:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { emoji: "🚨", title: "News Tips & Leads", desc: "Witnessed something newsworthy? Share your local insights or breaking stories with us so we can investigate and report the facts to the public." },
                            { emoji: "✅", title: "Editorial Corrections", desc: "We strive for absolute accuracy. If you spot a factual error in any of our articles, please let us know immediately so we can issue a correction." },
                            { emoji: "📈", title: "Advertising Inquiries", desc: "Looking to grow your brand? Partner with NewsNova to reach a highly engaged, rapidly growing digital audience." },
                            { emoji: "💬", title: "General Support", desc: "Having trouble navigating the site, managing your newsletter subscription, or using the comment system? Our support team is here to help." },
                        ].map((item) => (
                            <div key={item.title} className="bg-gray-50 border border-[var(--border-color)] rounded-xl p-6">
                                <h3 className="font-bold text-[var(--text-primary)] text-xl mb-2">{item.emoji} {item.title}</h3>
                                <p className="text-base">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            Send Us a Message
                        </h2>
                    </div>
                    <p className="mb-8">
                        Fill in the form below to reach our newsroom directly. Whether it is a <strong>Jhansi news tip</strong>, an advertising inquiry, or editorial feedback — we read every submission.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                                    Full Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-[var(--border-color)] rounded-lg px-4 py-3 text-base text-[var(--text-primary)] bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                                    Email Address <span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-[var(--border-color)] rounded-lg px-4 py-3 text-base text-[var(--text-primary)] bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                                Message <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                placeholder="Share your news tip, inquiry, or feedback..."
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full border border-[var(--border-color)] rounded-lg px-4 py-3 text-base text-[var(--text-primary)] bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm"
                            >
                                {status === "loading" ? "Sending..." : "Send Message →"}
                            </button>

                            {status === "success" && (
                                <p className="text-green-600 font-semibold text-sm">
                                    ✓ Message sent! We will get back to you soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-red-600 font-semibold text-sm">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </div>
                    </form>
                </section>

                {/* Contact Methods */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            Contact Methods
                        </h2>
                    </div>
                    <p className="mb-6">
                        You can reach out to the NewsNova editorial and support teams through the following official channels:
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                            <div>
                                <strong className="text-[var(--text-primary)]">Social Media:</strong> Tag or direct message us on Twitter, Facebook, or Instagram. We are highly responsive to our community online.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                            <div>
                                <strong className="text-[var(--text-primary)]">Contact Form:</strong> Use the form above to send us a message directly. Our team reviews every submission.
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Commitment */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-red-600 rounded-full flex-shrink-0" />
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                            Our Commitment to You
                        </h2>
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] text-xl mb-2">Response Time Assurance</h3>
                    <p className="mb-6">
                        As a dynamic digital newsroom, we review every single message submitted by our readers. While we receive a high volume of correspondence daily, we assure you that our team strives to respond to all critical news tips and business inquiries within <strong>24 to 48 hours</strong>. Urgent editorial corrections are prioritized and handled immediately.
                    </p>
                    <h3 className="font-bold text-[var(--text-primary)] text-xl mb-2">Editorial & Privacy Policy Note</h3>
                    <p className="mb-4">
                        Before submitting sensitive information or news leads, we encourage you to familiarize yourself with our rigorous journalistic standards by visiting our{" "}
                        <Link href="/about" className="text-red-600 hover:underline">About Us</Link> page.
                    </p>
                    <p>
                        Furthermore, any personal data you share with us through email or contact forms is handled with the utmost security and confidentiality. To understand exactly how we protect your data, please review our comprehensive{" "}
                        <Link href="/privacy-policy" className="text-red-600 hover:underline">Privacy Policy</Link>.
                    </p>
                </section>

                {/* CTA */}
                <section>
                    <div className="bg-gray-950 text-white rounded-2xl p-8 md:p-10 text-center">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                            Have a Story? We Want to Hear It!
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                            Are you holding onto crucial local information or the latest <strong>Jhansi news updates</strong>? Don't let the truth go unreported. Contact the Jhansi news team today and help us bring important stories to the forefront.
                        </p>
                        <button
                            onClick={() => document.getElementById("message")?.focus()}
                            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
                        >
                            Submit a News Tip
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}