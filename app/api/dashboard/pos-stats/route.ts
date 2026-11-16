import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { getWilayahTreeIds } from "@/features/wilayah/territory.queries";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role || "").toLowerCase() !== "petugas_pos") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    if (!user.wilayah_id) {
      return NextResponse.json({ error: "Wilayah belum diatur" }, { status: 400 });
    }
    const wilayahIds = await getWilayahTreeIds(user.wilayah_id);
    if (!wilayahIds.length) {
      return NextResponse.json({ error: "Wilayah pos tidak ditemukan" }, { status: 404 });
    }
    const placeholders = wilayahIds.map(() => "?").join(", ");
    const params = wilayahIds;
    const [dailyTrend, statusDistribution, recentActivity, totalStats, topCategories] = await Promise.all([
      query(`WITH RECURSIVE days (day) AS (
        SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        UNION ALL SELECT DATE_ADD(day, INTERVAL 1 DAY) FROM days WHERE day < CURDATE()
      )
      SELECT DATE_FORMAT(days.day, '%Y-%m-%d') AS date, COUNT(l.id) AS count
      FROM days LEFT JOIN laporan l ON DATE(l.created_at) = days.day AND l.wilayah_id IN (${placeholders})
      GROUP BY days.day ORDER BY days.day`, params),
      query(`SELECT status, COUNT(*) AS count FROM laporan
        WHERE wilayah_id IN (${placeholders}) GROUP BY status ORDER BY status`, params),
      query(`SELECT l.id, l.judul, l.kategori, l.status, l.created_at, u.nama AS pelapor_nama
        FROM laporan l JOIN users u ON u.id = l.user_id
        WHERE l.wilayah_id IN (${placeholders}) ORDER BY l.created_at DESC LIMIT 10`, params),
      query(`SELECT COUNT(*) AS total_laporan,
          SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) AS selesai,
          SUM(CASE WHEN status <> 'Selesai' THEN 1 ELSE 0 END) AS pending
        FROM laporan WHERE wilayah_id IN (${placeholders})`, params),
      query(`SELECT kategori, COUNT(*) AS count FROM laporan
        WHERE wilayah_id IN (${placeholders})
        GROUP BY kategori ORDER BY count DESC, kategori LIMIT 7`, params),
    ]);

    const total = totalStats.rows[0] || { total_laporan: 0, selesai: 0, pending: 0 };
    return NextResponse.json({
      dailyTrend: dailyTrend.rows.map((row) => ({ ...row, count: Number(row.count ?? 0) })),
      statusDistribution: statusDistribution.rows.map((row) => ({ ...row, count: Number(row.count ?? 0) })),
      recentActivity: recentActivity.rows,
      topCategories: topCategories.rows.map((row) => ({ ...row, count: Number(row.count ?? 0) })),
      totalStats: {
        total_laporan: Number(total.total_laporan ?? 0),
        selesai: Number(total.selesai ?? 0),
        pending: Number(total.pending ?? 0),
      },
    });
  } catch (error) {
    console.error("[pos-stats] Failed to load local statistics", error);
    return NextResponse.json({ error: "Gagal memuat statistik Pos" }, { status: 500 });
  }
}
