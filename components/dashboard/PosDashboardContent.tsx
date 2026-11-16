"use client";

import Link from "next/link";
import { Bar, BarChart, CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import StatusBadge from "@/components/ui/StatusBadge";
import InsightsSummary from "./InsightsSummary";
import { useDashboardStats } from "./useDashboardStats";

const STATUS_COLORS: Record<string, string> = {
  Diterima: "#f59e0b",
  Diverifikasi: "#38bdf8",
  Diproses: "#a78bfa",
  Selesai: "#10b981",
};

interface StatsData {
  dailyTrend: Array<{ date: string; count: number }>;
  statusDistribution: Array<{ status: string; count: number }>;
  topCategories: Array<{ kategori: string; count: number }>;
  recentActivity: Array<{
    id: number;
    judul: string;
    kategori: string;
    status: string;
    created_at: string;
    pelapor_nama: string;
  }>;
  totalStats: { total_laporan: number; selesai: number; pending: number };
}

export default function PosDashboardContent() {
  const { data: stats, loading, error } = useDashboardStats<StatsData>("/api/dashboard/pos-stats");

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
    return <p className="text-sm text-red-300">{error || "Gagal memuat data statistik"}</p>;
  }

  const { totalStats, statusDistribution } = stats;
  const persentaseSelesai =
    totalStats.total_laporan > 0
      ? ((totalStats.selesai / totalStats.total_laporan) * 100).toFixed(1)
      : "0";

  // Format trend data
  const formattedTrend = stats.dailyTrend.map((item) => ({
    ...item,
    dateLabel: format(parseISO(item.date), "dd MMM"),
  }));

  // Calculate status percentages
  const getStatusPercentage = (status: string) => {
    const found = statusDistribution.find((s) => s.status === status);
    if (!found || totalStats.total_laporan === 0) return 0;
    return (found.count / totalStats.total_laporan) * 100;
  };

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
        role="POS"
      />

      {/* Trend Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Tren 7 Hari Terakhir</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={formattedTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="dateLabel" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0a142d", border: "1px solid #334155", borderRadius: "8px" }}
            />
            <Line type="monotone" dataKey="count" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category totals are scoped to this post's territory. */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Kategori Laporan di Wilayah</h3>
        {stats.topCategories.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada laporan masuk di wilayah ini.</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.topCategories} layout="vertical" margin={{ left: 16, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" allowDecimals={false} />
              <YAxis dataKey="kategori" type="category" width={120} stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#0a142d", border: "1px solid #334155", borderRadius: "8px" }} />
              <Bar dataKey="count" name="Jumlah laporan" fill="#38bdf8" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Status Progress Bars */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Status Progress</h3>
        <div className="space-y-4">
          {statusDistribution.map((s) => {
            const percentage = getStatusPercentage(s.status);
            return (
              <div key={s.status}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{s.status}</span>
                  <span className="text-gray-600">
                    {s.count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: STATUS_COLORS[s.status],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
        {stats.recentActivity.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada aktivitas</p>
        ) : (
          <div className="space-y-4">
            {stats.recentActivity.map((activity, idx) => (
              <div key={activity.id} className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[activity.status] }}
                  />
                  {idx < stats.recentActivity.length - 1 && <div className="w-0.5 flex-1 bg-gray-200" />}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <Link
                    href={`/laporan/${activity.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {activity.judul}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>{activity.kategori}</span>
                    <span>•</span>
                    <StatusBadge status={activity.status} />
                    <span>Ã¢â‚¬Â¢</span>
                    <span>{activity.pelapor_nama}</span>
                    <span>Ã¢â‚¬Â¢</span>
                    <span>{format(parseISO(activity.created_at), "dd MMM yyyy, HH:mm")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
