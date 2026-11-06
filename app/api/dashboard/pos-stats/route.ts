import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

interface DailyTrend extends RowDataPacket {
  date: string;
  count: number;
}

interface StatusData extends RowDataPacket {
  status: string;
  count: number;
}

interface RecentActivity extends RowDataPacket {
  id: number;
  judul: string;
  status: string;
  created_at: string;
  pelapor_nama: string;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "POS") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!user.wilayah_id) {
      return NextResponse.json({ error: "No wilayah assigned" }, { status: 400 });
    }

    // 1. Tren 7 hari terakhir
    const dailyTrend = await query<DailyTrend[]>(
      `SELECT DATE(created_at) as date, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ? 
         AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [user.wilayah_id]
    );

    // 2. Status distribution
    const statusDistribution = await query<StatusData[]>(
      `SELECT status, COUNT(*) as count
       FROM laporan
       WHERE wilayah_id = ?
       GROUP BY status
       ORDER BY FIELD(status, 'Diterima', 'Diverifikasi', 'Diproses', 'Selesai')`,
      [user.wilayah_id]
    );

    // 3. Recent activity (5 laporan terbaru)
    const recentActivity = await query<RecentActivity[]>(
      `SELECT l.id, l.judul, l.status, l.created_at, u.nama as pelapor_nama
       FROM laporan l
       LEFT JOIN users u ON l.created_by_user_id = u.id
       WHERE l.wilayah_id = ?
       ORDER BY l.created_at DESC
       LIMIT 5`,
      [user.wilayah_id]
    );

    // 4. Total stats
    const totalStats = await query<RowDataPacket[]>(
      `SELECT 
         COUNT(*) as total_laporan,
         SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) as selesai,
         SUM(CASE WHEN status != 'Selesai' THEN 1 ELSE 0 END) as pending
       FROM laporan
       WHERE wilayah_id = ?`,
      [user.wilayah_id]
    );

    return NextResponse.json({
      dailyTrend,
      statusDistribution,
      recentActivity,
      totalStats: totalStats[0] || { total_laporan: 0, selesai: 0, pending: 0 },
    });
  } catch (error) {
    console.error("Dashboard pos stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
