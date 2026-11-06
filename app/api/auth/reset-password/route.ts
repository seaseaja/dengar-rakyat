/**
 * Reset Password API Route - Iterasi 2 H4 Hardened
 * - Token validation (hash + expiry + single-use)
 * - Password policy enforcement
 * - Invalidate all sessions after reset
 */

import { NextResponse } from "next/server";
import { resetPassword } from "@/features/auth/password.service";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token dan password wajib diisi" },
        { status: 400 }
      );
    }

    const result = await resetPassword(token, newPassword);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({
      message: result.message || "Password berhasil direset",
    });
  } catch (err) {
    console.error("Reset password API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat reset password" },
      { status: 500 }
    );
  }
}