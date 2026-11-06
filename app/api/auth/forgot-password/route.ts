/**
 * Forgot Password API Route - Iterasi 2 H4 Hardened
 * - Rate limiting (3 attempts/hour)
 * - Generic responses (no email disclosure)
 * - Token hashing
 */

import { NextResponse } from "next/server";
import { requestPasswordReset } from "@/features/auth/password.service";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email wajib diisi" },
        { status: 400 }
      );
    }

    const result = await requestPasswordReset(email);

    // Always return 200 with generic message (don't reveal if email exists)
    if (!result.ok && result.status === 429) {
      // Only exception: rate limit (user needs to know)
      return NextResponse.json(
        { error: result.error },
        { status: 429 }
      );
    }

    return NextResponse.json({
      message: result.message || "Jika email terdaftar, link reset password telah dikirim",
      // token: result.token // For testing only
    });
  } catch (err) {
    console.error("Forgot password API error:", err);
    // Generic error (don't leak details)
    return NextResponse.json(
      { message: "Jika email terdaftar, link reset password telah dikirim" },
      { status: 200 }
    );
  }
}