/**
 * Rate Limiter - Iterasi 2 H4/H5 Complete
 * In-memory rate limiting with fail-closed policy
 * - Login attempts (per IP + per email)
 * - Password reset requests
 * - API endpoints
 * 
 * IMPORTANT: Fail-closed policy
 * - If rate limiter fails (e.g., store unavailable), DENY request
 * - Never fail-open on rate limit errors
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
  firstAttemptAt: number;
}

// In-memory store (production: use Redis with TTL)
const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}, 10 * 60 * 1000);

/**
 * Check if request is rate limited (FAIL-CLOSED)
 * @param key Identifier (email, IP, etc)
 * @param maxAttempts Max attempts allowed
 * @param windowMs Time window in milliseconds
 * @returns { allowed: boolean, remaining: number, resetAt: number }
 * 
 * @throws Error if rate limiter fails (fail-closed policy)
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfter?: number;
} {
  try {
    const now = Date.now();
    const entry = store.get(key);

    // No entry or window expired
    if (!entry || entry.resetAt < now) {
      const resetAt = now + windowMs;
      store.set(key, { count: 1, resetAt, firstAttemptAt: now });
      return {
        allowed: true,
        remaining: maxAttempts - 1,
        resetAt,
      };
    }

    // Within window
    entry.count++;
    store.set(key, entry);

    const allowed = entry.count <= maxAttempts;
    const remaining = Math.max(0, maxAttempts - entry.count);
    const retryAfter = allowed ? undefined : Math.ceil((entry.resetAt - now) / 1000);

    return {
      allowed,
      remaining,
      resetAt: entry.resetAt,
      retryAfter,
    };
  } catch (error) {
    // FAIL-CLOSED: If rate limiter fails, deny request
    console.error("[RATE_LIMIT] Error checking rate limit:", error);
    throw new Error("Rate limiter unavailable");
  }
}

/**
 * Check multiple rate limits (composite check)
 * E.g., check both IP and email rate limits for login
 * 
 * ALL checks must pass (fail-closed)
 */
export function checkMultipleRateLimits(
  checks: Array<{ key: string; maxAttempts: number; windowMs: number }>
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfter?: number;
  failedCheck?: string;
} {
  for (const check of checks) {
    const result = checkRateLimit(check.key, check.maxAttempts, check.windowMs);
    if (!result.allowed) {
      return {
        ...result,
        failedCheck: check.key,
      };
    }
  }

  // All checks passed - return most restrictive remaining count
  const results = checks.map(c => checkRateLimit(c.key, c.maxAttempts, c.windowMs));
  const minRemaining = Math.min(...results.map(r => r.remaining));
  const maxResetAt = Math.max(...results.map(r => r.resetAt));

  return {
    allowed: true,
    remaining: minRemaining,
    resetAt: maxResetAt,
  };
}

/**
 * Reset rate limit for a key (e.g., after successful login)
 */
export function resetRateLimit(key: string): void {
  store.delete(key);
}

/**
 * Get remaining attempts
 */
export function getRemainingAttempts(
  key: string,
  maxAttempts: number
): number {
  const entry = store.get(key);
  if (!entry || entry.resetAt < Date.now()) {
    return maxAttempts;
  }
  return Math.max(0, maxAttempts - entry.count);
}

/**
 * Rate limit presets (spec: 5 login failures then wait)
 */
export const RateLimits = {
  // Spec: 5 attempts, then 2 minutes wait (corrected from 15 min)
  LOGIN_IP: { maxAttempts: 5, windowMs: 2 * 60 * 1000 }, // Per IP
  LOGIN_EMAIL: { maxAttempts: 5, windowMs: 2 * 60 * 1000 }, // Per email (account lockout)
  
  PASSWORD_RESET: { maxAttempts: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  API_GENERAL: { maxAttempts: 100, windowMs: 60 * 1000 }, // 100 per minute
  REGISTER: { maxAttempts: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  
  // Laporan spam prevention (spec: max 10 reports per day)
  LAPORAN_CREATE: { maxAttempts: 10, windowMs: 24 * 60 * 60 * 1000 },
};
