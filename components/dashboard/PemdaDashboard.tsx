"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import InsightsSummary from "./InsightsSummary";

const COLORS = {
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  purple: "#8b5cf6",
  indigo: "#6366f1",
};

const STATUS_COLORS: Record<string, string> = {
  Diterima: COLORS.warning,
  Diverifikasi: COLORS.primary,
  Diproses: COLORS.indigo,
  Selesai: COLORS.success,
};

interface StatsData {
  perKecamatan: Array<{ kecamatan: string; count: number }>;
  statusDistribution: Array<{ status: string; count: number }>;
  weeklyTrend: Array<{ date: string; count: number }>;
  topCategories: Array<{ kategori: string; count: number }>;
  totalStats: { total_laporan: number; selesai: number; pending: number };
}

export default function PemdaDashboard({
  kotaKabId,
  kotaKabNama,
}: {
  kotaKabId: number | null;
  kotaKabNama?: string | null;
}) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kotaKabId) {
      setLoading(false);
      return;
    }

    async function loadStats() {
      try {
        const res = await fetch("/api/dashboard/pemda-stats", {
          credentials: "include",
        });
        
        if (!res.ok) {
          throw new Error(`Failed to load stats: ${res.status}`);
        }
        
        const data = await res.json();
        setStats(data);
      } catch (e) {
        console.error("Error loading pemda stats:", e);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [kotaKabId]);

  if (!kotaKabId) {
    return <p className="text-sm text-gray-500">Akun ini belum terhubung ke kota/kabupaten.</p>;
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-3 text-sm text-gray-500">Memuat statistik...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return <p className="text-sm text-red-500">Gagal memuat data statistik</p>;
  }

  const { totalStats } = stats;
  const persentaseSelesai =
    totalStats.total_laporan > 0
      ? ((totalStats.selesai / totalStats.total_laporan) * 100).toFixed(1)
      : "0";

  // Format weekly trend
  const formattedWeeklyTrend = stats.weeklyTrend.map((item) => ({
    ...item,
    dateLabel: format(parseISO(item.date), "dd MMM"),
  }));

  // Top 5 kecamatan
  const top5Kecamatan = stats.perKecamatan.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4">
          <p className="text-sm font-medium text-blue-600">Total Laporan</p>
          <p className="text-3xl font-bold text-blue-900">{totalStats.total_laporan}</p>
        </div>
        <div className="rounded-xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-white p-4">
          <p className="text-sm font-medium text-green-600">Selesai</p>
          <p className="text-3xl font-bold text-green-900">{totalStats.selesai}</p>
        </div>
        <div className="rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white p-4">
          <p className="text-sm font-medium text-purple-600">% Selesai</p>
          <p className="text-3xl font-bold text-purple-900">{persentaseSelesai}%</p>
        </div>
      </div>

      {/* Insights Summary */}
      <InsightsSummary
        totalLaporan={totalStats.total_laporan}
        totalSelesai={totalStats.selesai}
        totalPending={totalStats.pending}
        topCategory={stats.topCategories[0]}
        role="PEMDA"
      />

      {/* Weekly Trend */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Tren Mingguan (7 Hari Terakhir)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formattedWeeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dateLabel" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            />
            <Line type="monotone" dataKey="count" stroke={COLORS.primary} strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2 Column Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Status Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Distribusi Status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={stats.statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }) => `${status} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.statusDistribution.map((entry) => (
                  <Cell key={`cell-${entry.status}`} fill={STATUS_COLORS[entry.status]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Kategori */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top 5 Kategori Masalah</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.topCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="kategori" angle={-15} textAnchor="end" height={80} style={{ fontSize: "10px" }} />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
              />
              <Bar dataKey="count" fill={COLORS.indigo} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 5 Kecamatan */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Top 5 Kecamatan Terpadat di {kotaKabNama}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={top5Kecamatan} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis dataKey="kecamatan" type="category" width={150} stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            />
            <Bar dataKey="count" fill={COLORS.success} radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* All Kecamatan Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Semua Kecamatan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Kecamatan</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Jumlah Laporan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.perKecamatan.map((k) => (
                <tr key={k.kecamatan} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{k.kecamatan}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-700">{k.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}