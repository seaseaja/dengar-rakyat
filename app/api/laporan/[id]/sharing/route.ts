import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateSession } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { validateCsrfToken } from "@/lib/csrf";
import { query } from "@/lib/db";
import { logDataEvent } from "@/features/audit/audit.service";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionId = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const session = await validateSession(sessionId);
  if (!session.valid || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "warga") return NextResponse.json({ error: "Hanya warga yang dapat mengatur publikasi laporan" }, { status: 403 });
  if (!validateCsrfToken(req.headers.get("x-csrf-token") || "", sessionId).valid)
    return NextResponse.json({ error: "Token keamanan tidak valid" }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) return NextResponse.json({ error: "Laporan tidak ditemukan" }, { status: 404 });
  let body: { isPublic?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Permintaan tidak valid" }, { status: 400 }); }
  if (typeof body?.isPublic !== "boolean") return NextResponse.json({ error: "Pilihan publikasi tidak valid" }, { status: 400 });
  const updated = await query("UPDATE laporan SET is_public=? WHERE id=? AND user_id=?", [body.isPublic ? 1 : 0, id, session.user.id]);
  if (!updated.affectedRows) return NextResponse.json({ error: "Laporan tidak ditemukan" }, { status: 404 });
  await logDataEvent({
    event_type: "laporan_update", user_id: session.user.id, user_email: session.user.email,
    user_role: session.user.role, target_type: "laporan_sharing", target_id: String(id),
    metadata: { is_public: body.isPublic },
  });
  return NextResponse.json({ isPublic: body.isPublic, message: body.isPublic ? "Laporan dibagikan ke Ruang Warga" : "Laporan tidak lagi ditampilkan di Ruang Warga" });
}
