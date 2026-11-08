/**
 * Pemda Dashboard Statistics API
 * GET stats for provincial/municipal-level dashboard
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

    if (!user || user.role !== "admin_pemda") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!user.wilayah_id) {
      return NextResponse.json({ error: "Wilayah not set" }, { status: 400 });
    }

    // Daily trend (last 30 days) - scoped to user's wilayah
    const dailyTrendResult = await query(
      `SELECT DATE(created_at) as date, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [user.wilayah_id]
    );

    // Monthly trend (last 12 months)
    const monthlyTrendResult = await query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') as date, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY DATE_FORMAT(created_at, '%Y-%m')
       ORDER BY date ASC`,
      [user.wilayah_id]
    );

    // Top categories (top 10)
    const topCategoriesResult = await query(
      `SELECT kategori, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ?
       GROUP BY kategori
       ORDER BY count DESC
       LIMIT 10`,
      [user.wilayah_id]
    );

    // Age distribution
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
       WHERE l.wilayah_id = ?
       GROUP BY age_group
       ORDER BY age_group`,
      [user.wilayah_id]
    );

    // Status comparison
    const statusComparisonResult = await query(
      `SELECT status, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ?
       GROUP BY status
       ORDER BY status`,
      [user.wilayah_id]
    );

    // Kecamatan breakdown (sub-districts within this pemda)
    const kecamatanResult = await query(
      `SELECT w.nama as kecamatan, COUNT(*) as count
       FROM laporan l
       JOIN wilayah w ON w.id = l.wilayah_id
       WHERE l.wilayah_id = ?
       GROUP BY w.id, w.nama
       ORDER BY count DESC
       LIMIT 10`,
      [user.wilayah_id]
    );

    return NextResponse.json({
      dailyTrend: dailyTrendResult.rows,
      monthlyTrend: monthlyTrendResult.rows,
      topCategories: topCategoriesResult.rows,
      ageDistribution: ageDistributionResult.rows,
      statusComparison: statusComparisonResult.rows,
      kecamatanBreakdown: kecamatanResult.rows,
    });
  } catch (error) {
    console.error("[pemda-stats] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
