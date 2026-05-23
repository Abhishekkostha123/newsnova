"use client";

import { useState } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyDJ07p4ub9J7QJN1cfaBI5FOo3gSIe0GsuBIvz3qaeOIUVPWJcGC5_OhzZvhm-TKYmFQ/exec";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Newsletter", email, message: "Newsletter subscription" }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-sm text-green-600 font-semibold py-2">
        ✓ Subscribed! Thanks for joining.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="space-y-2">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-4 py-2.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
