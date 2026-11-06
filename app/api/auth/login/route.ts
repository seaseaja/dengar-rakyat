/**
 * Login API Route - Iterasi 2 H3/H4 + Iterasi 3 P1 Complete
 * - Rate limiting (per IP + per email, fail-closed)
 * - Secure cookie (httpOnly, secure, sameSite)
 * - Session regeneration
 * - Audit logging (success & failure)
 */

import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { loginUser } from "@/features/auth/login.service";
import { logAuthEvent } from "@/features/audit/audit.service";
import { getRequestContext } from "@/lib/request-context";
import { SESSION_COOKIE_NAME, getSessionCookieOptions } from "@/lib/cookies";
import { checkMultipleRateLimits, resetRateLimit, RateLimits } from "@/lib/rate-limiter";
import { ApiError, handleApiError } from "@/lib/error-handler";

export async function POST(req: Request) {
  const context = getRequestContext(req);
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() || 
             headersList.get("x-real-ip") || 
             "unknown";
  
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw ApiError.badRequest("Email dan password wajib diisi");
    }

    // Rate limit check (per IP AND per email)
    // Spec: 5 attempts, then wait 2 minutes
    try {
      const rateLimit = checkMultipleRateLimits([
        { key: `login:ip:${ip}`, ...RateLimits.LOGIN_IP },
        { key: `login:email:${email}`, ...RateLimits.LOGIN_EMAIL },
      ]);

      if (!rateLimit.allowed) {
        // Log rate limit violation
        await logAuthEvent({
          event_type: "login_failure",
          user_email: email,
          status: "failure",
          error_message: "Rate limit exceeded",
          ...context,
          metadata: { 
            reason: "rate_limit",
            failedCheck: rateLimit.failedCheck,
            retryAfter: rateLimit.retryAfter,
          },
        });

        return NextResponse.json(
          { 
            error: `Terlalu banyak percobaan login. Coba lagi dalam ${rateLimit.retryAfter} detik.`,
            code: "RATE_LIMITED",
            retryAfter: rateLimit.retryAfter,
          },
          { 
            status: 429,
            headers: {
              "Retry-After": String(rateLimit.retryAfter),
            },
          }
        );
      }
    } catch (rateLimitError) {
      // FAIL-CLOSED: If rate limiter fails, deny request
      console.error("[LOGIN] Rate limiter error:", rateLimitError);
      return NextResponse.json(
        { error: "Layanan tidak tersedia", code: "SERVICE_UNAVAILABLE" },
        { status: 503 }
      );
    }

    // Attempt login
    const result = await loginUser(email, password);
    
    if (!result.ok) {
      // Log failed login attempt
      await logAuthEvent({
        event_type: "login_failure",
        user_email: email,
        status: "failure",
        error_message: result.error,
        ...context,
        metadata: { reason: "invalid_credentials" },
      });

      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    // SUCCESS: Reset rate limit counters
    resetRateLimit(`login:ip:${ip}`);
    resetRateLimit(`login:email:${email}`);

    // Set secure session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, result.sessionId, getSessionCookieOptions());

    // Log successful login
    await logAuthEvent({
      event_type: "login_success",
      user_id: result.user.id,
      user_email: result.user.email,
      user_role: result.user.role,
      status: "success",
      ...context,
    });

    return NextResponse.json({
      message: "Login berhasil",
      user: {
        id: result.user.id,
        email: result.user.email,
        nama: result.user.nama,
        role: result.user.role,
      },
    });
  } catch (error) {
    // Log system error
    await logAuthEvent({
      event_type: "login_failure",
      status: "failure",
      error_message: "System error during login",
      ...context,
      metadata: { error: error instanceof Error ? error.message : String(error) },
    });

    return handleApiError(error, "Login");
  }
}
