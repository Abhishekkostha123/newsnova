// Simple in-memory rate limiter for API routes
// In production, use Redis for distributed rate limiting

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60000);

export function rateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: maxRequests - entry.count };
}

// Anti-spam: Check if content looks like spam
export function isSpam(content: string): boolean {
  const spamPatterns = [
    /https?:\/\/\S+\s+https?:\/\/\S+/i, // Multiple URLs
    /buy\s+now|click\s+here|free\s+money/i,
    /(.)\1{10,}/, // Repeated characters
    /<script/i,
    /javascript:/i,
  ];

  return spamPatterns.some((pattern) => pattern.test(content));
}

// Sanitize comment content
export function sanitizeContent(content: string): string {
  return content
    .replace(/<[^>]*>/g, "") // Strip HTML
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim()
    .slice(0, 2000); // Max length
}
