"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface StatusCount {
  status: string;
  jumlah: string;
}

export default function AuditPusat() {
  const [data, setData] = useState<StatusCount[]>([]);
  const [laporan, setLaporan] = useState<{ id: number; judul: string; status: string; foto_path: string | null; foto_hasil_path: string | null }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/laporan-agregasi-nasional").then((r) => r.json()),
      fetch("/api/laporan").then((r) => r.json()),
    ])
      .then(([counts, all]) => {
        if (Array.isArray(counts)) setData(counts);
        if (Array.isArray(all)) setLaporan(all.slice(0, 10));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {data.map((d) => (
          <span key={d.status} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
            {d.status}: {d.jumlah}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">10 Laporan Terbaru (Audit Foto)</p>
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
          {laporan.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <Link href={`/laporan/${l.id}`} className="font-medium text-blue-600">
                {l.judul}
              </Link>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{l.foto_path ? "Before ✓" : "Before -"}</span>
                <span>{l.foto_hasil_path ? "After ✓" : "After -"}</span>
                <span className="rounded-full bg-gray-100 px-2 py-1">{l.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}