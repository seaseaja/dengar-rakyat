"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Laporan } from "@/features/laporan/laporan.types";

export default function LaporanList({ mode = "mine" }: { mode?: "mine" | "all" }) {
  const [data, setData] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    let active = true;
    setLoading(true); setData([]); setOffset(0); setHasMore(false);
    const url = mode === "mine" ? "/api/laporan?mine=1&limit=20&offset=0" : "/api/laporan?limit=20&offset=0";
    void fetch(url).then((r) => r.json()).then((d) => {
      if (active && Array.isArray(d)) { setData(d); setOffset(d.length); setHasMore(d.length === 20); }
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [mode]);

  async function loadMore() {
    setLoadingMore(true);
    const params = new URLSearchParams({ limit: "20", offset: String(offset) });
    if (mode === "mine") params.set("mine", "1");
    try {
      const response = await fetch(`/api/laporan?${params}`);
      const page = await response.json();
      if (response.ok && Array.isArray(page)) { setData((current) => [...current, ...page]); setOffset((current) => current + page.length); setHasMore(page.length === 20); }
    } finally { setLoadingMore(false); }
  }

  if (loading) return <p className="text-sm text-gray-500">Memuat laporan...</p>;
  if (data.length === 0) return <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">Belum ada laporan. <Link href="/laporan/baru" className="text-blue-600">Buat laporan pertama</Link></div>;
  return <div className="space-y-4"><ul className="space-y-3">
    {data.map((l) => <li key={l.id} className="surface-card rounded-2xl border border-gray-200 bg-white p-5 text-sm shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0"><Link href={`/laporan/${l.id}`} className="font-semibold text-blue-600">{l.judul}</Link>
          <p className="text-gray-500">{l.kategori}{l.wilayah_nama ? ` · ${l.wilayah_nama}` : ""} · {new Date(l.created_at).toLocaleString("id-ID")}</p></div>
        <StatusBadge status={l.status} />
      </div>
      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
        <p className="font-medium text-gray-800">Tindak lanjut terakhir</p>
        {l.status_terakhir ? <><p className="mt-1 text-gray-600">{l.status_terakhir} · {l.petugas_nama || "Petugas"}{l.status_diubah_at ? ` · ${new Date(l.status_diubah_at).toLocaleString("id-ID")}` : ""}</p>
          {l.catatan_status && <p className="mt-1 whitespace-pre-wrap text-gray-500">{l.catatan_status}</p>}</>
          : <p className="mt-1 text-gray-500">Belum ada pembaruan dari petugas sejak laporan diterima.</p>}
        <Link href={`/laporan/${l.id}`} className="mt-2 inline-block font-medium text-blue-600">Lihat riwayat lengkap →</Link>
      </div>
    </li>)}
  </ul>{hasMore && <button type="button" onClick={() => void loadMore()} disabled={loadingMore} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 disabled:opacity-50">{loadingMore ? "Memuat..." : "Muat laporan lainnya"}</button>}</div>;
}
