/**
 * Logout API Route - Iterasi 2 H3 + P1 Complete
 * - Delete session from database (server-side invalidation)
 * - Clear cookie with secure options
 * - Audit log logout event
 */

import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { destroySession, getSessionWithUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME, getClearCookieOptions } from "@/lib/cookies";
import { logAuthEvent } from "@/features/audit/audit.service";
import { handleApiError } from "@/lib/error-handler";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const headersList = await headers();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "No active session" },
        { status: 400 }
      );
    }

    // Get session info for audit log (before deletion)
    const session = await getSessionWithUser(sessionId);

    // Delete session from database (server-side invalidation)
    await destroySession(sessionId);

    // Audit log (AFTER successful deletion)
    if (session) {
      await logAuthEvent({
        event_type: "logout",
        user_id: session.user_id,
        user_email: session.email,
        user_role: session.role,
        ip_address: headersList.get("x-forwarded-for") || undefined,
        user_agent: headersList.get("user-agent") || undefined,
        status: "success",
      });
    }

    // Clear cookie (client-side)
    cookieStore.set(SESSION_COOKIE_NAME, "", getClearCookieOptions());

    return NextResponse.json({ message: "Logout berhasil" });
  } catch (error) {
    return handleApiError(error, "Logout");
  }
}
