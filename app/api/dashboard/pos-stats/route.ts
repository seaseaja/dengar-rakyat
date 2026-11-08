/**
 * Pos Dashboard Statistics API
 * GET stats for pos kecamatan-level dashboard
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

    if (!user || user.role !== "petugas_pos") {
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

    // Top categories (top 5)
    const topCategoriesResult = await query(
      `SELECT kategori, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ?
       GROUP BY kategori
       ORDER BY count DESC
       LIMIT 5`,
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

    // Recent reports (last 10)
    const recentReportsResult = await query(
      `SELECT id, judul, kategori, status, created_at
       FROM laporan
       WHERE wilayah_id = ?
       ORDER BY created_at DESC
       LIMIT 10`,
      [user.wilayah_id]
    );

    return NextResponse.json({
      dailyTrend: dailyTrendResult.rows,
      topCategories: topCategoriesResult.rows,
      statusComparison: statusComparisonResult.rows,
      recentReports: recentReportsResult.rows,
    });
  } catch (error) {
    console.error("[pos-stats] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
