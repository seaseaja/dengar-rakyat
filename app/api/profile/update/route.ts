/**
 * Profile Update API
 * PUT - Update user profile (nama, alamat)
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { query } from "@/lib/db";
import { encrypt } from "@/lib/crypto";
import { validateCsrfToken } from "@/lib/csrf";

export async function PUT(req: Request) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const user = await getCurrentUser(sessionId);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!sessionId || !validateCsrfToken(req.headers.get("x-csrf-token") || "", sessionId).valid) {
      return NextResponse.json({ error: "CSRF token tidak valid" }, { status: 403 });
    }

    const body = await req.json();
    const nama = body?.nama;
    const alamat = body?.alamat;

    if (typeof nama !== "string" || nama.trim().length < 3 || nama.trim().length > 120 || (alamat != null && (typeof alamat !== "string" || alamat.length > 1000))) {
      return NextResponse.json(
        { error: "Nama harus minimal 3 karakter" },
        { status: 400 }
      );
    }

    // Encrypt alamat if provided
    const alamatEnc = typeof alamat === "string" && alamat.trim() ? encrypt(alamat.trim()) : null;

    // Update user
    await query(
      `UPDATE users 
       SET nama = ?, alamat_enc = COALESCE(?, alamat_enc)
       WHERE id = ?`,
      [nama.trim(), alamatEnc, user.id]
    );

    return NextResponse.json({
      message: "Profil berhasil diperbarui",
      user: { nama: nama.trim() },
    });
  } catch (error) {
    console.error("[profile/update] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
