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
  kategori: string;
  status: string;
  foto_path: string | null;
  foto_hasil_path: string | null;
  wilayah_nama?: string;
  created_at: string;
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
  const [selectedAudit, setSelectedAudit] = useState<LaporanRow | null>(null);

  useEffect(() => {
    let active = true;
    let inFlight = false;
    const refresh = async () => {
      if (inFlight || document.visibilityState === "hidden") return;
      inFlight = true;
      try {
        const [countResponse, reportResponse] = await Promise.all([
          fetch("/api/admin/laporan-agregasi-nasional", { cache: "no-store" }),
          fetch("/api/laporan?limit=15", { cache: "no-store" }),
        ]);
        if (!countResponse.ok || !reportResponse.ok) throw new Error("Gagal memuat laporan nasional");
        const [countsResult, reportsResult] = await Promise.all([countResponse.json(), reportResponse.json()]);
        if (active) {
          if (Array.isArray(countsResult)) setCounts(countsResult);
          if (Array.isArray(reportsResult)) setLaporan(reportsResult);
        }
      } catch (error) {
        console.error("Failed to refresh national report list", error);
      } finally {
        inFlight = false;
        if (active) setLoading(false);
      }
    };
    const onVisibilityChange = () => { if (document.visibilityState === "visible") void refresh(); };
    void refresh();
    const interval = window.setInterval(() => void refresh(), 5_000);
    window.addEventListener("focus", onVisibilityChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", onVisibilityChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Memuat data audit pusat...</p>;

  return (
    <div className="space-y-6">
      {/* Cards Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {counts.map((c) => (
          <StatCard
            key={c.status}
            label={c.status}
            value={c.jumlah}
            accent={ACCENT_MAP[c.status] ?? "gray"}
          />
        ))}
      </div>

      {/* Main Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Audit Penanganan Laporan Terkini</h3>
            <p className="text-xs text-gray-500">
              Verifikasi keabsahan pengerjaan laporan daerah melalui perbandingan foto kondisi awal vs hasil perbaikan.
            </p>
          </div>
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {laporan.length} Laporan Diaudit
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Laporan</th>
                <th className="px-4 py-3">Wilayah</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3 text-center">Bukti Before / After</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {laporan.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href={`/laporan/${l.id}`} className="hover:text-blue-600">
                      {l.judul}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{l.wilayah_nama ?? "-"}</td>
                  <td className="px-4 py-3 text-gray-500">{l.kategori}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono">
                      <span className={l.foto_path ? "text-emerald-600 font-bold" : "text-gray-300"}>
                        {l.foto_path ? "Before ✓" : "Before –"}
                      </span>
                      <span className="text-gray-300">/</span>
                      <span className={l.foto_hasil_path ? "text-blue-600 font-bold" : "text-gray-300"}>
                        {l.foto_hasil_path ? "After ✓" : "After –"}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedAudit(l)}
                      className="rounded bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                    >
                      Bandingkan Foto
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Quick Comparison */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-2xl w-full rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h4 className="font-bold text-gray-900">{selectedAudit.judul}</h4>
                <p className="text-xs text-gray-500">Audit Pembanding Bukti Fisik Lapangan</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAudit(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3 bg-gray-50 text-center">
                <span className="text-xs font-bold text-gray-600 block mb-2">Foto Awal Warga (Before)</span>
                {selectedAudit.foto_path ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/laporan/${selectedAudit.id}/foto?slot=before`} alt="Before" className="h-44 w-full object-cover rounded" />
                ) : (
                  <div className="h-44 flex items-center justify-center text-xs text-gray-400">Tidak ada foto</div>
                )}
              </div>
              <div className="rounded-lg border p-3 bg-gray-50 text-center">
                <span className="text-xs font-bold text-gray-600 block mb-2">Foto Hasil Perbaikan (After)</span>
                {selectedAudit.foto_hasil_path ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/laporan/${selectedAudit.id}/foto?slot=after`} alt="After" className="h-44 w-full object-cover rounded" />
                ) : (
                  <div className="h-44 flex items-center justify-center text-xs text-gray-400">Belum ada foto perbaikan</div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Link
                href={`/laporan/${selectedAudit.id}`}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
              >
                Buka Detail Lengkap
              </Link>
              <button
                type="button"
                onClick={() => setSelectedAudit(null)}
                className="rounded-lg border px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
