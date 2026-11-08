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

export async function PUT(req: Request) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const user = await getCurrentUser(sessionId);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nama, alamat } = await req.json();

    if (!nama || nama.trim().length < 3) {
      return NextResponse.json(
        { error: "Nama harus minimal 3 karakter" },
        { status: 400 }
      );
    }

    // Encrypt alamat if provided
    const alamatEnc = alamat ? encrypt(alamat) : null;

    // Update user
    await query(
      `UPDATE users 
       SET nama = ?, alamat_enc = ?
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
