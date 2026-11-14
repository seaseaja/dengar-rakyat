"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

interface StatusCount {
  status: string;
  jumlah: string;
}

interface LaporanRow {
  id: number;
  judul: string;
  status: string;
  foto_path: string | null;
  foto_hasil_path: string | null;
  wilayah_nama?: string;
}

const ACCENT_MAP: Record<string, "amber" | "blue" | "indigo" | "green"> = {
  Diterima: "amber",
  Diverifikasi: "blue",
  Diproses: "indigo",
  Selesai: "green",
};

export default function AuditPusat() {
  const [counts, setCounts] = useState<StatusCount[]>([]);
  const [laporan, setLaporan] = useState<LaporanRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void Promise.all([
      fetch("/api/admin/laporan-agregasi-nasional").then((r) => r.json()),
      fetch("/api/laporan").then((r) => r.json()),
    ])
      .then(([c, all]) => {
        if (Array.isArray(c)) setCounts(c);
        if (Array.isArray(all)) setLaporan(all.slice(0, 10));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {counts.map((c) => (
          <StatCard key={c.status} label={c.status} value={c.jumlah} accent={ACCENT_MAP[c.status] ?? "gray"} />
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">10 Laporan Terbaru</p>
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
          {laporan.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <div>
                <Link href={`/laporan/${l.id}`} className="font-medium text-blue-600">
                  {l.judul}
                </Link>
                <p className="text-gray-500">{l.wilayah_nama ?? "-"}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {l.foto_path ? "Before ✓" : "Before –"} / {l.foto_hasil_path ? "After ✓" : "After –"}
                </span>
                <StatusBadge status={l.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}