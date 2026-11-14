"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Laporan } from "@/features/laporan/laporan.types";

export default function LaporanList({ mode }: { mode: "mine" | "all" }) {
  const [data, setData] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = mode === "mine" ? "/api/laporan?mine=1" : "/api/laporan";
    void fetch(url)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setData(d))
      .finally(() => setLoading(false));
  }, [mode]);

  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;
  if (data.length === 0) return <p className="text-sm text-gray-500">Belum ada laporan.</p>;

  return (
    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
      {data.map((l) => (
        <li key={l.id} className="flex items-center justify-between px-4 py-3 text-sm">
          <div>
            <Link href={`/laporan/${l.id}`} className="font-medium text-blue-600">
              {l.judul}
            </Link>
            <p className="text-gray-500">
              {l.kategori}
              {l.pelapor_nama ? ` — ${l.pelapor_nama}` : ""}
              {l.wilayah_nama ? ` — ${l.wilayah_nama}` : ""}
            </p>
          </div>
          <StatusBadge status={l.status} />
        </li>
      ))}
    </ul>
  );
}