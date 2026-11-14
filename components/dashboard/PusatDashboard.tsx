"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
  pink: "#ec4899",
  teal: "#14b8a6",
};

const PIE_COLORS = [COLORS.primary, COLORS.success, COLORS.warning, COLORS.purple];
const STATUS_COLORS: Record<string, string> = {
  Diterima: COLORS.warning,
  Diverifikasi: COLORS.primary,
  Diproses: COLORS.indigo,
  Selesai: COLORS.success,
};

interface StatsData {
  dailyTrend: Array<{ date: string; count: number }>;
  monthlyTrend: Array<{ date: string; count: number }>;
  topCategories: Array<{ kategori: string; count: number }>;
  ageDistribution: Array<{ age_group: string; count: number }>;
  statusComparison: Array<{ status: string; count: number }>;
  provinsiHeatmap: Array<{ provinsi: string; count: number }>;
}

export default function PusatDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"daily" | "monthly">("daily");

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/dashboard/pusat-stats", {
          credentials: "include",
        });
        
        if (!res.ok) {
          throw new Error(`Failed to load stats: ${res.status}`);
        }
        
        const data = await res.json();
        setStats(data);
      } catch (e) {
        console.error("Error loading stats:", e);
        setError(e instanceof Error ? e.message : "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    }
    
    void loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-sm text-gray-500">Memuat statistik nasional...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">{error || "Gagal memuat data statistik"}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-sm text-red-700 underline hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  // Safety check: ensure data exists
  if (!stats.dailyTrend || !stats.monthlyTrend || !stats.statusComparison) {
    return <p className="text-sm text-red-500">Data tidak lengkap</p>;
  }

  // Format trend data
  const trendData = timeRange === "daily" ? stats.dailyTrend : stats.monthlyTrend;
  const formattedTrend = trendData.map((item) => ({
    ...item,
    dateLabel: timeRange === "daily" ? format(parseISO(item.date), "dd MMM") : item.date,
  }));

  // Calculate totals
  const totalLaporan = stats.statusComparison.reduce((sum, s) => sum + s.count, 0);
  const totalSelesai = stats.statusComparison.find((s) => s.status === "Selesai")?.count || 0;
  const totalPending = totalLaporan - totalSelesai;
  const persentaseSelesai = totalLaporan > 0 ? ((totalSelesai / totalLaporan) * 100).toFixed(1) : "0";

  // Comparison data (merah vs hijau)
  const comparisonData = [
    { name: "Belum Selesai", value: totalPending, color: COLORS.danger },
    { name: "Selesai", value: totalSelesai, color: COLORS.success },
  ];

  // Calculate trend direction (compare first vs last week)
  const firstWeekAvg = trendData.slice(0, 7).reduce((sum, d) => sum + d.count, 0) / 7;
  const lastWeekAvg = trendData.slice(-7).reduce((sum, d) => sum + d.count, 0) / 7;
  const trendDirection = lastWeekAvg > firstWeekAvg * 1.1 ? "up" : lastWeekAvg < firstWeekAvg * 0.9 ? "down" : "stable";

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4">
          <p className="text-sm font-medium text-blue-600">Total Laporan</p>
          <p className="text-3xl font-bold text-blue-900">{totalLaporan.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-white p-4">
          <p className="text-sm font-medium text-green-600">Selesai</p>
          <p className="text-3xl font-bold text-green-900">{totalSelesai.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-4">
          <p className="text-sm font-medium text-red-600">Pending</p>
          <p className="text-3xl font-bold text-red-900">{totalPending.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white p-4">
          <p className="text-sm font-medium text-purple-600">% Selesai</p>
          <p className="text-3xl font-bold text-purple-900">{persentaseSelesai}%</p>
        </div>
      </div>

      {/* Insights Summary */}
      <InsightsSummary
        totalLaporan={totalLaporan}
        totalSelesai={totalSelesai}
        totalPending={totalPending}
        topCategory={stats.topCategories[0]}
        trendDirection={trendDirection}
        role="PUSAT"
      />

      {/* Trend Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Tren Laporan</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange("daily")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                timeRange === "daily"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              30 Hari
            </button>
            <button
              onClick={() => setTimeRange("monthly")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                timeRange === "monthly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              12 Bulan
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dateLabel" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            />
            <Line type="monotone" dataKey="count" stroke={COLORS.primary} strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2 Column Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Status Comparison (Merah vs Hijau) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Perbandingan Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={comparisonData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Statistik Usia Pelapor</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={stats.ageDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ age_group, percent }) => `${age_group} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.ageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 10 Categories */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Top 10 Masalah Utama (Per Kategori)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stats.topCategories} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis dataKey="kategori" type="category" width={150} stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            />
            <Bar dataKey="count" fill={COLORS.primary} radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Heat Map Provinsi */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Heat Map Provinsi (Top 15)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={stats.provinsiHeatmap}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="provinsi" angle={-45} textAnchor="end" height={120} style={{ fontSize: "11px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            />
            <Bar dataKey="count" fill={COLORS.danger} radius={[8, 8, 0, 0]}>
              {stats.provinsiHeatmap.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index < 3 ? COLORS.danger : COLORS.warning} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-4 text-xs text-gray-500">
          🔴 Top 3 provinsi dengan laporan terbanyak ditandai dengan warna merah
        </p>
      </div>
    </div>
  );
}