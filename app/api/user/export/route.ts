/**
 * Data Export API - Iterasi 3 P6
 * GDPR Article 15 - Right to Access
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromSession } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { query } from "@/lib/db";
import { decrypt } from "@/lib/crypto";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserFromSession(sessionId);
    if (!user) {
      return NextResponse.json({ error: "Session invalid" }, { status: 401 });
    }

    // Get user data (decrypt PII)
    const result = await query("SELECT * FROM users WHERE id = ?", [user.id]);
    const userData = result.rows[0] as any;

    const exportData = {
      personal_data: {
        nik: decrypt(userData.nik_enc),
        nama: userData.nama,
        email: userData.email,
        alamat: decrypt(userData.alamat_enc),
        role: userData.role,
        created_at: userData.created_at,
      },
      account_info: {
        user_id: userData.id,
        wilayah_id: userData.wilayah_id,
      },
      export_info: {
        requested_at: new Date().toISOString(),
        format: "json",
      },
    };

    return NextResponse.json(exportData, {
      headers: {
        "Content-Disposition": `attachment; filename="data-export-${user.id}.json"`,
      },
    });
  } catch (err) {
    console.error("Data export error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
