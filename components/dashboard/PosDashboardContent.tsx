"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Laporan } from "@/features/laporan/laporan.types";

const STATUS_LIST = ["Diterima", "Diverifikasi", "Diproses", "Selesai"];

export default function PosDashboardContent() {
  const [data, setData] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/laporan")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setData(d))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const base: Record<string, number> = { Diterima: 0, Diverifikasi: 0, Diproses: 0, Selesai: 0 };
    data.forEach((l) => {
      base[l.status] = (base[l.status] ?? 0) + 1;
    });
    return base;
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((l) => {
      const matchStatus = !filterStatus || l.status === filterStatus;
      const q = search.toLowerCase();
      const matchSearch =
        !q || l.judul.toLowerCase().includes(q) || (l.pelapor_nama ?? "").toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [data, filterStatus, search]);

  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Diterima" value={counts.Diterima} accent="amber" />
        <StatCard label="Diverifikasi" value={counts.Diverifikasi} accent="blue" />
        <StatCard label="Diproses" value={counts.Diproses} accent="indigo" />
        <StatCard label="Selesai" value={counts.Selesai} accent="green" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="Cari judul atau nama pelapor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:flex-1"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Semua status</option>
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">Tidak ada laporan yang cocok.</p>
      ) : (
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
          {filtered.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <div>
                <Link href={`/laporan/${l.id}`} className="font-medium text-blue-600">
                  {l.judul}
                </Link>
                <p className="text-gray-500">
                  {l.kategori} — {l.pelapor_nama}
                  {l.wilayah_nama ? ` — ${l.wilayah_nama}` : ""}
                </p>
              </div>
              <StatusBadge status={l.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}