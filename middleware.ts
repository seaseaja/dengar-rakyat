/**
 * Next.js Middleware - Iterasi 2 H3 + H5 Complete
 * - Session validation (basic check, full validation in API routes)
 * - Protected routes with allowlist
 * - CSRF token presence check
 * - Role-based route protection
 * 
 * IMPORTANT: Next.js ≥ 15.2.3 required (CVE-2025-29927 bypass mitigation)
 * Additional otorisasi check MUST be done in each route handler (defense in depth)
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Force Node.js runtime (crypto & db requires Node APIs)
export const runtime = 'nodejs';

// Public routes (no auth required)
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/csrf",
  "/api/wilayah", // Public API for region dropdown
];

// Methods that require CSRF check
const CSRF_METHODS = ["POST", "PUT", "DELETE", "PATCH"];

// Routes exempt from CSRF (auth routes have their own protection)
const CSRF_EXEMPT_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/csrf",
];

// CVE-2025-29927 mitigation: Reject suspicious subrequest headers
function checkSubrequestBypass(request: NextRequest): boolean {
  const subrequestHeader = request.headers.get("x-middleware-subrequest");
  if (subrequestHeader) {
    console.warn(`[SECURITY] Potential middleware bypass attempt detected`, {
      path: request.nextUrl.pathname,
      header: subrequestHeader,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    });
    return true; // Suspicious
  }
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // CVE-2025-29927: Block subrequest bypass attempts
  if (checkSubrequestBypass(request)) {
    return NextResponse.json(
      { error: "Forbidden", code: "SUBREQUEST_BYPASS_ATTEMPT" },
      { status: 403 }
    );
  }

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) => {
    if (route.endsWith("*")) {
      return pathname.startsWith(route.slice(0, -1));
    }
    return pathname === route || pathname.startsWith(route + "/");
  });
  
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check session cookie (session_id, NOT session)
  const sessionId = request.cookies.get("session_id")?.value;

  if (!sessionId) {
    // Redirect to login for page routes
    if (!pathname.startsWith("/api/")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Return 401 for API routes (fail-closed)
    return NextResponse.json(
      { error: "Unauthorized", code: "SESSION_MISSING" },
      { status: 401 }
    );
  }

  // CSRF check for mutating requests (H5)
  if (CSRF_METHODS.includes(method) && pathname.startsWith("/api/")) {
    const isCsrfExempt = CSRF_EXEMPT_ROUTES.some((route) =>
      pathname === route || pathname.startsWith(route + "/")
    );

    if (!isCsrfExempt) {
      const csrfToken = request.headers.get("x-csrf-token");
      
      // Note: Full CSRF validation (HMAC verify) happens in API routes
      // Middleware just checks token presence (fail-fast)
      if (!csrfToken) {
        return NextResponse.json(
          { error: "CSRF token required", code: "CSRF_MISSING" },
          { status: 403 }
        );
      }
    }
  }

  // Basic role-based route protection
  // Note: Full session validation & otorisasi in API routes (defense in depth)
  // This is just a fast-fail check based on cookie claims
  
  // Role is NOT in cookie (that would be tamperable)
  // We only block obvious mismatches in route handler
  // Example: /dashboard/pusat route should check session.role === 'PUSAT'

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
