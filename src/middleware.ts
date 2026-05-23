import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Force www canonicalization (adjust if your primary domain is non-www, e.g., newsnova.in)
  if (
    hostname &&
    !hostname.startsWith("www.") &&
    !hostname.includes("localhost") &&
    !hostname.includes("127.0.0.1") &&
    !hostname.includes("vercel.app")
  ) {
    const url = request.nextUrl.clone();
    url.host = `www.${hostname}`;
    return NextResponse.redirect(url, 301);
  }

  // Security and Cache-Control headers
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Keep assets cached
  if (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/images")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (images, sitemap, robots, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
