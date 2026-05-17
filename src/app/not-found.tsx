import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <span className="text-[120px] sm:text-[180px] font-black text-[var(--bg-tertiary)] leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
          <Link
            href="/search"
            className="px-6 py-3 glass-card text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] transition-colors"
          >
            Search Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
