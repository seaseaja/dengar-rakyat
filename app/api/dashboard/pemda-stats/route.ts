import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

interface KecamatanData extends RowDataPacket {
  kecamatan: string;
  count: number;
}

interface StatusData extends RowDataPacket {
  status: string;
  count: number;
}

interface WeeklyTrend extends RowDataPacket {
  date: string;
  count: number;
}

interface CategoryData extends RowDataPacket {
  kategori: string;
  count: number;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "PEMDA") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!user.wilayah_id) {
      return NextResponse.json({ error: "No wilayah assigned" }, { status: 400 });
    }

    // 1. Laporan per kecamatan (dalam kota/kab ini)
    const perKecamatan = await query<KecamatanData[]>(
      `SELECT kec.nama as kecamatan, COUNT(l.id) as count
       FROM kecamatan kec
       LEFT JOIN laporan l ON kec.id = l.wilayah_id
       WHERE kec.kota_kab_id = ?
       GROUP BY kec.id, kec.nama
       ORDER BY count DESC`,
      [user.wilayah_id]
    );

    // 2. Distribusi status
    const statusDistribution = await query<StatusData[]>(
      `SELECT l.status, COUNT(*) as count
       FROM laporan l
       JOIN kecamatan kec ON l.wilayah_id = kec.id
       WHERE kec.kota_kab_id = ?
       GROUP BY l.status
       ORDER BY FIELD(l.status, 'Diterima', 'Diverifikasi', 'Diproses', 'Selesai')`,
      [user.wilayah_id]
    );

    // 3. Tren mingguan (7 hari terakhir)
    const weeklyTrend = await query<WeeklyTrend[]>(
      `SELECT DATE(l.created_at) as date, COUNT(*) as count
       FROM laporan l
       JOIN kecamatan kec ON l.wilayah_id = kec.id
       WHERE kec.kota_kab_id = ? 
         AND l.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       GROUP BY DATE(l.created_at)
       ORDER BY date ASC`,
      [user.wilayah_id]
    );

    // 4. Top 5 kategori di wilayah ini
    const topCategories = await query<CategoryData[]>(
      `SELECT l.kategori, COUNT(*) as count
       FROM laporan l
       JOIN kecamatan kec ON l.wilayah_id = kec.id
       WHERE kec.kota_kab_id = ?
       GROUP BY l.kategori
       ORDER BY count DESC
       LIMIT 5`,
      [user.wilayah_id]
    );

    // 5. Total statistics
    const totalStats = await query<RowDataPacket[]>(
      `SELECT 
         COUNT(*) as total_laporan,
         SUM(CASE WHEN l.status = 'Selesai' THEN 1 ELSE 0 END) as selesai,
         SUM(CASE WHEN l.status != 'Selesai' THEN 1 ELSE 0 END) as pending
       FROM laporan l
       JOIN kecamatan kec ON l.wilayah_id = kec.id
       WHERE kec.kota_kab_id = ?`,
      [user.wilayah_id]
    );

    return NextResponse.json({
      perKecamatan,
      statusDistribution,
      weeklyTrend,
      topCategories,
      totalStats: totalStats[0] || { total_laporan: 0, selesai: 0, pending: 0 },
    });
  } catch (error) {
    console.error("Dashboard pemda stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
