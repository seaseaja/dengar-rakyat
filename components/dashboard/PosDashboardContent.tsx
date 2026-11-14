"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import StatusBadge from "@/components/ui/StatusBadge";
import InsightsSummary from "./InsightsSummary";

const STATUS_COLORS: Record<string, string> = {
  Diterima: "#f59e0b",
  Diverifikasi: "#3b82f6",
  Diproses: "#6366f1",
  Selesai: "#10b981",
};

interface StatsData {
  dailyTrend: Array<{ date: string; count: number }>;
  statusDistribution: Array<{ status: string; count: number }>;
  recentActivity: Array<{
    id: number;
    judul: string;
    status: string;
    created_at: string;
    pelapor_nama: string;
  }>;
  totalStats: { total_laporan: number; selesai: number; pending: number };
}

export default function PosDashboardContent() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/dashboard/pos-stats", {
          credentials: "include",
        });
        
        if (!res.ok) {
          throw new Error(`Failed to load stats: ${res.status}`);
        }
        
        const data = await res.json();
        setStats(data);
      } catch (e) {
        console.error("Error loading pos stats:", e);
      } finally {
        setLoading(false);
      }
    }

    void loadStats();
  }, []);

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
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dateLabel" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
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
                    <StatusBadge status={activity.status} />
                    <span>•</span>
                    <span>{activity.pelapor_nama}</span>
                    <span>•</span>
                    <span>{format(parseISO(activity.created_at), "dd MMM yyyy, HH:mm")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Action */}
      <Link
        href="/laporan"
        className="block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-center font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700"
      >
        Lihat Semua Laporan →
      </Link>
    </div>
  );
}