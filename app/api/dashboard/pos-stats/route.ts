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

    // Daily trend (last 7 days)
    const dailyTrendResult = await query(
      `SELECT DATE(created_at) as date, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [user.wilayah_id]
    );

    // Status distribution
    const statusDistributionResult = await query(
      `SELECT status, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ?
       GROUP BY status
       ORDER BY status`,
      [user.wilayah_id]
    );

    // Recent reports (last 10)
    const recentActivityResult = await query(
      `SELECT l.id, l.judul, l.status, l.created_at, u.nama as pelapor_nama
       FROM laporan l
       JOIN users u ON u.id = l.user_id
       WHERE l.wilayah_id = ?
       ORDER BY l.created_at DESC
       LIMIT 10`,
      [user.wilayah_id]
    );

    // Total stats
    const totalStatsResult = await query(
      `SELECT 
        COUNT(*) as total_laporan,
        SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) as selesai,
        SUM(CASE WHEN status != 'Selesai' THEN 1 ELSE 0 END) as pending
       FROM laporan
       WHERE wilayah_id = ?`,
      [user.wilayah_id]
    );

    const totalStats = totalStatsResult.rows[0] || { total_laporan: 0, selesai: 0, pending: 0 };

    return NextResponse.json({
      dailyTrend: dailyTrendResult.rows,
      statusDistribution: statusDistributionResult.rows,
      recentActivity: recentActivityResult.rows,
      totalStats: {
        total_laporan: totalStats.total_laporan || 0,
        selesai: totalStats.selesai || 0,
        pending: totalStats.pending || 0,
      },
    });
  } catch (error) {
    console.error("[pos-stats] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
