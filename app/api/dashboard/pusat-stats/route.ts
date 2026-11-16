import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { query } from "@/lib/db";

function numericRows<T extends Record<string, unknown>>(rows: T[]) {
  return rows.map((row) => ({
    ...row,
    count: Number(row.count ?? 0),
    ...(row.selesai !== undefined ? { selesai: Number(row.selesai ?? 0) } : {}),
  }));
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role || "").toLowerCase() !== "pusat") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const [daily, monthly, categories, statuses, provinces] = await Promise.all([
      query(`WITH RECURSIVE days (day) AS (
        SELECT DATE_SUB(CURDATE(), INTERVAL 29 DAY)
        UNION ALL SELECT DATE_ADD(day, INTERVAL 1 DAY) FROM days WHERE day < CURDATE()
      )
      SELECT DATE_FORMAT(days.day, '%Y-%m-%d') AS date, COUNT(l.id) AS count
      FROM days LEFT JOIN laporan l ON DATE(l.created_at) = days.day
      GROUP BY days.day ORDER BY days.day`),
      query(`WITH RECURSIVE months (month_start) AS (
        SELECT DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 11 MONTH)
        UNION ALL SELECT DATE_ADD(month_start, INTERVAL 1 MONTH) FROM months
        WHERE month_start < DATE_FORMAT(CURDATE(), '%Y-%m-01')
      )
      SELECT DATE_FORMAT(months.month_start, '%Y-%m') AS date, COUNT(l.id) AS count
      FROM months LEFT JOIN laporan l
        ON l.created_at >= months.month_start
        AND l.created_at < DATE_ADD(months.month_start, INTERVAL 1 MONTH)
      GROUP BY months.month_start ORDER BY months.month_start`),
      query(`SELECT kategori, COUNT(*) AS count FROM laporan
        GROUP BY kategori ORDER BY count DESC, kategori ASC LIMIT 10`),
      query(`SELECT status, COUNT(*) AS count FROM laporan GROUP BY status ORDER BY status`),
      query(`WITH RECURSIVE province_tree (province_id, wilayah_id) AS (
        SELECT id, id FROM wilayah WHERE tipe = 'provinsi'
        UNION DISTINCT
        SELECT tree.province_id, child.id
        FROM province_tree tree JOIN wilayah child ON child.parent_id = tree.wilayah_id
      )
      SELECT root.nama AS provinsi, COUNT(l.id) AS count,
        SUM(CASE WHEN l.status = 'Selesai' THEN 1 ELSE 0 END) AS selesai
      FROM province_tree tree
      JOIN wilayah root ON root.id = tree.province_id
      LEFT JOIN laporan l ON l.wilayah_id = tree.wilayah_id
      GROUP BY root.id, root.nama ORDER BY count DESC, root.nama ASC LIMIT 15`),
    ]);

    return NextResponse.json({
      dailyTrend: numericRows(daily.rows),
      monthlyTrend: numericRows(monthly.rows),
      topCategories: numericRows(categories.rows),
      statusComparison: numericRows(statuses.rows),
      provinsiHeatmap: numericRows(provinces.rows),
    });
  } catch (error) {
    console.error("[pusat-stats] Failed to load national statistics", error);
    return NextResponse.json({ error: "Gagal memuat statistik nasional" }, { status: 500 });
  }
}
