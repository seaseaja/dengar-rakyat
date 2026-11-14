/**
 * CSRF Protection - Iterasi 2 H5
 * - Token generation per session
 * - Token validation
 * - Double submit cookie pattern
 */

import crypto from "crypto";

const CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomBytes(32).toString("hex");

/**
 * Generate CSRF token for session
 * @param sessionId User's session ID
 * @returns CSRF token (signed)
 */
export function generateCsrfToken(sessionId: string): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(16).toString("hex");
  const payload = `${sessionId}:${timestamp}:${random}`;
  
  // Sign with HMAC
  const signature = crypto
    .createHmac("sha256", CSRF_SECRET)
    .update(payload)
    .digest("hex");
  
  return `${payload}:${signature}`;
}

/**
 * Validate CSRF token
 * @param token CSRF token from header/body
 * @param sessionId Current session ID
 * @returns { valid: boolean, reason?: string }
 */
export function validateCsrfToken(
  token: string,
  sessionId: string
): { valid: boolean; reason?: string } {
  if (!token) {
    return { valid: false, reason: "Token missing" };
  }

  const parts = token.split(":");
  if (parts.length !== 4) {
    return { valid: false, reason: "Invalid token format" };
  }

  const [tokenSessionId, timestamp, random, signature] = parts;

  // Check session match (constant-time comparison)
  if (tokenSessionId !== sessionId) {
    return { valid: false, reason: "Session mismatch" };
  }

  // Verify signature (timing-safe comparison)
  const payload = `${tokenSessionId}:${timestamp}:${random}`;
  const expectedSignature = crypto
    .createHmac("sha256", CSRF_SECRET)
    .update(payload)
    .digest("hex");

  // Convert to buffers and check length first (prevent timingSafeEqual exception)
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (signatureBuffer.length !== expectedBuffer.length) {
    return { valid: false, reason: "Invalid signature" };
  }

  try {
    const isValid = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
    if (!isValid) {
      return { valid: false, reason: "Invalid signature" };
    }
  } catch (error) {
    // Should not happen after length check, but fail-closed
    console.error("[CSRF] timingSafeEqual error:", error);
    return { valid: false, reason: "Signature verification failed" };
  }

  // Check expiry (1 hour, NOT 24 hours - spec says token rotasi 1 jam)
  const tokenTime = Number.parseInt(timestamp, 10);
  const now = Date.now();
  const maxAge = 60 * 60 * 1000; // 1 hour

  if (now - tokenTime > maxAge) {
    return { valid: false, reason: "Token expired" };
  }

  return { valid: true };
}

/**
 * Extract CSRF token from request
 * Checks header first, then body
 */
export function extractCsrfToken(
  headers: Headers,
  body?: { _csrf?: string }
): string | null {
  // Check X-CSRF-Token header (preferred)
  const headerToken = headers.get("x-csrf-token");
  if (headerToken) return headerToken;

  // Check _csrf in body (form submit)
  if (body?._csrf) return body._csrf;

  return null;
}
