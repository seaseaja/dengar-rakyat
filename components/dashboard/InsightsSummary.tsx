"use client";

import InsightCard from "@/components/ui/InsightCard";

interface Insight {
  icon: string;
  title: string;
  description: string;
  color: "blue" | "green" | "yellow" | "red" | "purple";
}

interface InsightsSummaryProps {
  totalLaporan: number;
  totalSelesai: number;
  totalPending: number;
  topCategory?: { kategori: string; count: number };
  trendDirection?: "up" | "down" | "stable";
  role: "PUSAT" | "PEMDA" | "POS";
}

export default function InsightsSummary({
  totalLaporan,
  totalSelesai,
  totalPending,
  topCategory,
  trendDirection = "stable",
  role,
}: InsightsSummaryProps) {
  const persentaseSelesai =
    totalLaporan > 0 ? ((totalSelesai / totalLaporan) * 100).toFixed(0) : "0";

  const insights: Insight[] = [];

  // Insight 1: Completion rate
  if (Number.parseFloat(persentaseSelesai) >= 80) {
    insights.push({
      icon: "🎯",
      title: "Target Tercapai",
      description: `${persentaseSelesai}% laporan telah diselesaikan. Performa sangat baik!`,
      color: "green",
    });
  } else if (Number.parseFloat(persentaseSelesai) >= 50) {
    insights.push({
      icon: "⚡",
      title: "Progress Moderate",
      description: `${persentaseSelesai}% laporan selesai. Ada ${totalPending} laporan yang perlu perhatian.`,
      color: "yellow",
    });
  } else {
    insights.push({
      icon: "⚠️",
      title: "Butuh Perhatian",
      description: `Hanya ${persentaseSelesai}% laporan selesai. ${totalPending} laporan masih pending.`,
      color: "red",
    });
  }

  // Insight 2: Top category
  if (topCategory) {
    insights.push({
      icon: "📊",
      title: "Masalah Utama",
      description: `${topCategory.kategori} adalah kategori terbanyak dengan ${topCategory.count} laporan.`,
      color: "purple",
    });
  }

  // Insight 3: Trend
  if (trendDirection === "up") {
    insights.push({
      icon: "📈",
      title: "Tren Meningkat",
      description:
        role === "PUSAT"
          ? "Jumlah laporan nasional meningkat dibanding periode sebelumnya."
          : "Aktivitas pelaporan di wilayah Anda meningkat.",
      color: "blue",
    });
  } else if (trendDirection === "down") {
    insights.push({
      icon: "📉",
      title: "Tren Menurun",
      description:
        role === "PUSAT"
          ? "Laporan nasional menurun. Indikasi positif atau perlu sosialisasi?"
          : "Jumlah laporan menurun di wilayah Anda.",
      color: "green",
    });
  }

  // Insight 4: Workload
  if (totalPending > 100 && role === "PUSAT") {
    insights.push({
      icon: "🔥",
      title: "Beban Kerja Tinggi",
      description: `${totalPending} laporan pending di seluruh Indonesia. Pertimbangkan alokasi sumber daya.`,
      color: "red",
    });
  } else if (totalPending > 20 && role === "PEMDA") {
    insights.push({
      icon: "💼",
      title: "Workload Moderate",
      description: `${totalPending} laporan menunggu tindak lanjut di wilayah Anda.`,
      color: "yellow",
    });
  } else if (totalPending <= 5 && totalLaporan > 0) {
    insights.push({
      icon: "✨",
      title: "Workload Rendah",
      description: `Hanya ${totalPending} laporan pending. Tim bekerja dengan efisien!`,
      color: "green",
    });
  }

  if (insights.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">💡 Insight & Rekomendasi</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {insights.map((insight, idx) => (
          <InsightCard key={idx} {...insight} />
        ))}
      </div>
    </div>
  );
}
