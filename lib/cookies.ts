/**
 * Cookie Security Utilities - Iterasi 2 H3
 * - httpOnly flag (XSS protection)
 * - secure flag (HTTPS only)
 * - sameSite flag (CSRF protection)
 * - maxAge/expires
 */

import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const SESSION_COOKIE_NAME = "session_id";

/**
 * Get secure cookie options
 */
export function getSecureCookieOptions(maxAgeSeconds?: number): Partial<ResponseCookie> {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true, // Prevent JS access (XSS protection)
    secure: isProduction, // HTTPS only in production
    sameSite: "strict", // CSRF protection
    path: "/",
    maxAge: maxAgeSeconds ?? 24 * 60 * 60, // Default: 24 hours
  };
}

/**
 * Get cookie options for session
 */
export function getSessionCookieOptions(): Partial<ResponseCookie> {
  return getSecureCookieOptions(24 * 60 * 60); // 24 hours
}

/**
 * Get cookie options for logout (clear cookie)
 */
export function getClearCookieOptions(): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  };
}
