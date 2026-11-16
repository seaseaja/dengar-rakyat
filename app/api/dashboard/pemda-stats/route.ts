import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { getWilayahTreeIds } from "@/features/wilayah/territory.queries";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role || "").toLowerCase() !== "admin_pemda") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    if (!user.wilayah_id) {
      return NextResponse.json({ error: "Wilayah belum diatur" }, { status: 400 });
    }

    const wilayahIds = await getWilayahTreeIds(user.wilayah_id);
    if (!wilayahIds.length) {
      return NextResponse.json({ error: "Wilayah Pemda tidak ditemukan" }, { status: 404 });
    }
    const placeholders = wilayahIds.map(() => "?").join(", ");
    const scopeParams = wilayahIds;
    const [weeklyTrend, topCategories, statusDistribution, perKecamatan, totalStats, recentReports] = await Promise.all([
      query(`WITH RECURSIVE days (day) AS (
        SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        UNION ALL SELECT DATE_ADD(day, INTERVAL 1 DAY) FROM days WHERE day < CURDATE()
      )
      SELECT DATE_FORMAT(days.day, '%Y-%m-%d') AS date, COUNT(l.id) AS count
      FROM days LEFT JOIN laporan l ON DATE(l.created_at) = days.day AND l.wilayah_id IN (${placeholders})
      GROUP BY days.day ORDER BY days.day`, scopeParams),
      query(`SELECT kategori, COUNT(*) AS count FROM laporan
        WHERE wilayah_id IN (${placeholders}) GROUP BY kategori ORDER BY count DESC, kategori LIMIT 10`, scopeParams),
      query(`SELECT status, COUNT(*) AS count FROM laporan
        WHERE wilayah_id IN (${placeholders}) GROUP BY status ORDER BY status`, scopeParams),
      query(`SELECT CASE WHEN w.tipe = 'desa_kelurahan' THEN parent.nama ELSE w.nama END AS kecamatan,
          COUNT(l.id) AS count
        FROM laporan l JOIN wilayah w ON w.id = l.wilayah_id
        LEFT JOIN wilayah parent ON parent.id = w.parent_id
        WHERE l.wilayah_id IN (${placeholders})
        GROUP BY kecamatan ORDER BY count DESC, kecamatan`, scopeParams),
      query(`SELECT COUNT(*) AS total_laporan,
          SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) AS selesai,
          SUM(CASE WHEN status <> 'Selesai' THEN 1 ELSE 0 END) AS pending
        FROM laporan WHERE wilayah_id IN (${placeholders})`, scopeParams),
      query(`SELECT l.id, l.judul, l.kategori, l.status, l.created_at,
          u.nama AS pelapor_nama, w.nama AS wilayah_nama
        FROM laporan l
        JOIN users u ON u.id = l.user_id
        LEFT JOIN wilayah w ON w.id = l.wilayah_id
        WHERE l.wilayah_id IN (${placeholders})
        ORDER BY l.created_at DESC LIMIT 15`, scopeParams),
    ]);

    const total = totalStats.rows[0] || { total_laporan: 0, selesai: 0, pending: 0 };
    const numeric = (rows: Array<Record<string, unknown>>) => rows.map((row) => ({
      ...row,
      count: Number(row.count ?? 0),
    }));

    return NextResponse.json({
      weeklyTrend: numeric(weeklyTrend.rows),
      topCategories: numeric(topCategories.rows),
      statusDistribution: numeric(statusDistribution.rows),
      perKecamatan: numeric(perKecamatan.rows),
      recentReports: recentReports.rows,
      totalStats: {
        total_laporan: Number(total.total_laporan ?? 0),
        selesai: Number(total.selesai ?? 0),
        pending: Number(total.pending ?? 0),
      },
    });
  } catch (error) {
    console.error("[pemda-stats] Failed to load regional statistics", error);
    return NextResponse.json({ error: "Gagal memuat statistik Pemda" }, { status: 500 });
  }
}
