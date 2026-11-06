/**
 * Request Context Utilities - Iterasi 3 P1 Enhanced
 * Extract IP address, user agent untuk audit logging
 * WITH trusted proxy validation (prevent IP spoofing)
 */

import type { NextRequest } from "next/server";

/**
 * Trusted proxies (load balancers, reverse proxies)
 * Only trust X-Forwarded-For from these IPs
 * 
 * Production: Add your actual proxy IPs here
 * Format: ["10.0.0.1", "192.168.1.1", "172.16.0.0/12"]
 */
const TRUSTED_PROXIES = process.env.TRUSTED_PROXIES?.split(",").map(ip => ip.trim()) || [
  "127.0.0.1",        // Localhost
  "::1",              // IPv6 localhost
  // Add your actual proxy IPs in production
];

/**
 * Check if IP is in trusted proxy list
 * TODO: Support CIDR notation for IP ranges
 */
function isTrustedProxy(ip: string): boolean {
  return TRUSTED_PROXIES.includes(ip);
}

/**
 * Extract IP address from request (with trusted proxy validation)
 * Prevents IP spoofing attacks
 * 
 * @param request Request object
 * @param directIP Direct connection IP (from socket, if available)
 * @returns Client IP address
 */
export function getClientIP(
  request: Request | NextRequest,
  directIP?: string
): string | undefined {
  // If we have direct IP and it's NOT from trusted proxy, use it
  // (User can't spoof direct socket IP)
  if (directIP && !isTrustedProxy(directIP)) {
    return directIP;
  }

  // Only trust X-Forwarded-For if request came from trusted proxy
  if (directIP && isTrustedProxy(directIP)) {
    // Try X-Forwarded-For first (proxy/load balancer)
    const xForwardedFor = request.headers.get("x-forwarded-for");
    if (xForwardedFor) {
      // X-Forwarded-For format: "client, proxy1, proxy2"
      // Take leftmost IP (original client)
      return xForwardedFor.split(",")[0].trim();
    }

    // Try X-Real-IP (some proxies use this)
    const xRealIP = request.headers.get("x-real-ip");
    if (xRealIP) {
      return xRealIP;
    }
  }

  // Try CF-Connecting-IP (Cloudflare - always trusted if present)
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback: use direct IP or unknown
  return directIP || "unknown";
}

/**
 * Extract user agent from request
 */
export function getUserAgent(request: Request | NextRequest): string | undefined {
  return request.headers.get("user-agent") || undefined;
}

/**
 * Extract request context for audit logging
 * 
 * @param request Request object
 * @param directIP Direct connection IP (optional, for trusted proxy validation)
 */
export function getRequestContext(
  request: Request | NextRequest,
  directIP?: string
) {
  return {
    ip_address: getClientIP(request, directIP),
    user_agent: getUserAgent(request),
  };
}
