/**
 * Security Headers - Iterasi 2 (A02 - Security Misconfiguration)
 * 
 * Headers implemented:
 * - Content-Security-Policy (XSS mitigation)
 * - Strict-Transport-Security (Force HTTPS)
 * - X-Frame-Options (Clickjacking prevention)
 * - X-Content-Type-Options (MIME sniffing prevention)
 * - Referrer-Policy (Privacy)
 * - Permissions-Policy (Feature restriction)
 */

/**
 * Get security headers for Next.js config
 */
export function getSecurityHeaders() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return [
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(self)",
    },
    {
      key: "Content-Security-Policy",
      value: getCSP(isDevelopment),
    },
  ];
}

/**
 * Content Security Policy
 * 
 * Next.js requires 'unsafe-eval' for development
 * In production, we tighten the policy
 */
function getCSP(isDevelopment: boolean): string {
  const csp = [
    "default-src 'self'",
    isDevelopment
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'", // Next.js inline scripts
    "style-src 'self' 'unsafe-inline'", // Tailwind/inline styles
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  return csp.join("; ");
}

/**
 * Apply security headers to API response
 * Use this in API routes if needed
 */
export function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  getSecurityHeaders().forEach(({ key, value }) => {
    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
