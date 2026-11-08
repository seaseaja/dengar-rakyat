/**
 * Pusat Dashboard Statistics API
 * GET stats for national-level dashboard
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Auth check
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const user = await getCurrentUser(sessionId);

    console.log("[pusat-stats] SessionID:", sessionId?.substring(0, 10), "User:", user?.email, "Role:", user?.role);

    if (!user || user.role !== "pusat") {
      return NextResponse.json({ error: "Unauthorized", debug: { hasUser: !!user, role: user?.role } }, { status: 403 });
    }

    // Daily trend (last 30 days)
    const dailyTrendResult = await query(
      `SELECT DATE(created_at) as date, COUNT(*) as count
       FROM laporan
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );

    // Monthly trend (last 12 months)
    const monthlyTrendResult = await query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') as date, COUNT(*) as count
       FROM laporan
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY DATE_FORMAT(created_at, '%Y-%m')
       ORDER BY date ASC`
    );

    // Top categories (top 10)
    const topCategoriesResult = await query(
      `SELECT kategori, COUNT(*) as count
       FROM laporan
       GROUP BY kategori
       ORDER BY count DESC
       LIMIT 10`
    );

    // Age distribution (mock data for now - NIK encrypted)
    const ageDistributionResult = await query(
      `SELECT 
        CASE
          WHEN YEAR(CURDATE()) - YEAR(u.created_at) < 25 THEN '< 25'
          WHEN YEAR(CURDATE()) - YEAR(u.created_at) < 35 THEN '25-34'
          WHEN YEAR(CURDATE()) - YEAR(u.created_at) < 45 THEN '35-44'
          WHEN YEAR(CURDATE()) - YEAR(u.created_at) < 55 THEN '45-54'
          ELSE '55+'
        END as age_group,
        COUNT(*) as count
       FROM laporan l
       JOIN users u ON u.id = l.user_id
       GROUP BY age_group
       ORDER BY age_group`
    );

    // Status comparison
    const statusComparisonResult = await query(
      `SELECT status, COUNT(*) as count
       FROM laporan
       GROUP BY status
       ORDER BY status`
    );

    // Wilayah heatmap (top 10 wilayah dengan laporan terbanyak)
    const wilayahHeatmapResult = await query(
      `SELECT w.nama as wilayah, COUNT(*) as count
       FROM laporan l
       JOIN wilayah w ON w.id = l.wilayah_id
       GROUP BY w.id, w.nama
       ORDER BY count DESC
       LIMIT 10`
    );

    return NextResponse.json({
      dailyTrend: dailyTrendResult.rows,
      monthlyTrend: monthlyTrendResult.rows,
      topCategories: topCategoriesResult.rows,
      ageDistribution: ageDistributionResult.rows,
      statusComparison: statusComparisonResult.rows,
      provinsiHeatmap: wilayahHeatmapResult.rows,
    });
  } catch (error) {
    console.error("[pusat-stats] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
