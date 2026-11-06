import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

interface TrendData extends RowDataPacket {
  date: string;
  count: number;
}

interface CategoryData extends RowDataPacket {
  kategori: string;
  count: number;
}

interface AgeData extends RowDataPacket {
  age_group: string;
  count: number;
}

interface StatusData extends RowDataPacket {
  status: string;
  count: number;
}

interface ProvinsiData extends RowDataPacket {
  provinsi: string;
  count: number;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "PUSAT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 1. Tren harian 30 hari terakhir
    const dailyTrend = await query<TrendData[]>(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM laporan 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );

    // 2. Tren bulanan 12 bulan terakhir
    const monthlyTrend = await query<TrendData[]>(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') as date, COUNT(*) as count 
       FROM laporan 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY DATE_FORMAT(created_at, '%Y-%m')
       ORDER BY date ASC`
    );

    // 3. Top 10 kategori masalah
    const topCategories = await query<CategoryData[]>(
      `SELECT kategori, COUNT(*) as count 
       FROM laporan 
       GROUP BY kategori 
       ORDER BY count DESC 
       LIMIT 10`
    );

    // 4. Distribusi usia pelapor (dari NIK - digit 7-12 = tanggal lahir DDMMYY)
    const ageDistribution = await query<AgeData[]>(
      `SELECT 
         CASE 
           WHEN YEAR(CURDATE()) - (2000 + CAST(SUBSTRING(u.nik, 11, 2) AS UNSIGNED)) BETWEEN 18 AND 25 THEN '18-25'
           WHEN YEAR(CURDATE()) - (2000 + CAST(SUBSTRING(u.nik, 11, 2) AS UNSIGNED)) BETWEEN 26 AND 35 THEN '26-35'
           WHEN YEAR(CURDATE()) - (2000 + CAST(SUBSTRING(u.nik, 11, 2) AS UNSIGNED)) BETWEEN 36 AND 45 THEN '36-45'
           WHEN YEAR(CURDATE()) - (2000 + CAST(SUBSTRING(u.nik, 11, 2) AS UNSIGNED)) >= 46 THEN '46+'
           ELSE 'Unknown'
         END as age_group,
         COUNT(*) as count
       FROM laporan l
       LEFT JOIN users u ON l.created_by_user_id = u.id
       WHERE u.nik IS NOT NULL
       GROUP BY age_group
       ORDER BY FIELD(age_group, '18-25', '26-35', '36-45', '46+', 'Unknown')`
    );

    // 5. Perbandingan status (merah = pending, hijau = selesai)
    const statusComparison = await query<StatusData[]>(
      `SELECT status, COUNT(*) as count 
       FROM laporan 
       GROUP BY status 
       ORDER BY FIELD(status, 'Diterima', 'Diverifikasi', 'Diproses', 'Selesai')`
    );

    // 6. Heat map per provinsi
    const provinsiHeatmap = await query<ProvinsiData[]>(
      `SELECT p.nama as provinsi, COUNT(l.id) as count
       FROM provinsi p
       LEFT JOIN kota_kab kk ON p.id = kk.provinsi_id
       LEFT JOIN kecamatan kec ON kk.id = kec.kota_kab_id
       LEFT JOIN laporan l ON kec.id = l.wilayah_id
       GROUP BY p.nama
       ORDER BY count DESC
       LIMIT 15`
    );

    return NextResponse.json({
      dailyTrend,
      monthlyTrend,
      topCategories,
      ageDistribution,
      statusComparison,
      provinsiHeatmap,
    });
  } catch (error) {
    console.error("Dashboard pusat stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
