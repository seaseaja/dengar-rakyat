/**
 * CSRF Token API - Iterasi 2 H6
 * Generate CSRF token for authenticated users
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCsrfToken } from "@/lib/csrf";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Generate CSRF token
    const token = generateCsrfToken(sessionId);

    return NextResponse.json({
      token,
    });
  } catch (err) {
    console.error("CSRF token generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
