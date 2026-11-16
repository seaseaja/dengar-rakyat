import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { decrypt } from "@/lib/crypto";
import { validateSession } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";

export async function GET(req: Request) {
  const sid = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!sid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const session = await validateSession(sid);
  if (!session.valid || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "warga") return NextResponse.json({ error: "Ruang Warga hanya tersedia untuk akun warga" }, { status: 403 });
  const params = new URL(req.url).searchParams;
  const cursor = Number(params.get("before"));
  const requestedLimit = Number(params.get("limit"));
  const limit = Number.isSafeInteger(requestedLimit) && requestedLimit > 0 ? Math.min(requestedLimit, 30) : 20;
  const result = await query(`
    SELECT l.id,l.judul,l.deskripsi_enc,l.kategori,l.status,l.created_at,
      w.nama AS kecamatan, parent.nama AS kota,
      (SELECT COUNT(*) FROM laporan_komentar c WHERE c.laporan_id=l.id) AS comment_count
    FROM laporan l
    LEFT JOIN wilayah w ON w.id=l.wilayah_id
    LEFT JOIN wilayah parent ON parent.id=w.parent_id
    WHERE l.is_public=1 ${Number.isSafeInteger(cursor) && cursor > 0 ? "AND l.id < ?" : ""}
    ORDER BY l.created_at DESC,l.id DESC LIMIT ${limit}
  `, Number.isSafeInteger(cursor) && cursor > 0 ? [cursor] : []);
  const posts = result.rows.map((row) => {
    let isi = "Isi laporan tidak dapat ditampilkan.";
    try { if (row.deskripsi_enc) isi = decrypt(String(row.deskripsi_enc)); } catch { /* keep safe fallback */ }
    return { id: Number(row.id), judul: row.judul, isi, kategori: row.kategori, status: row.status,
      created_at: row.created_at, wilayah: row.kota || row.kecamatan || "Indonesia",
      nama: "Warga", comment_count: Number(row.comment_count) };
  });
  return NextResponse.json({ posts, next: posts.length === limit ? posts[posts.length - 1].id : null });
}
