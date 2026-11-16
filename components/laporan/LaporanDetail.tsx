"use client";

import { useEffect, useState } from "react";
import type { Laporan } from "@/features/laporan/laporan.types";
import StatusUpdateForm from "./StatusUpdateForm";
import StatusBadge from "@/components/ui/StatusBadge";

interface LaporanDetailProps {
  id?: string | number;
  laporanId?: string | number;
  showStatusForm?: boolean;
  canManageSharing?: boolean;
}

export default function LaporanDetail({ id, laporanId, showStatusForm, canManageSharing = false }: LaporanDetailProps) {
  const targetId = String(id ?? laporanId ?? "");
  const [data, setData] = useState<Laporan | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    if (!targetId) return;

    void fetch(`/api/laporan/${targetId}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) {
          setError(d.error ?? "Terjadi kesalahan saat memuat detail laporan");
          return;
        }
        setData(d);
      })
      .catch((err) => {
        setError(err.message || "Gagal menghubungi server");
      })
      .finally(() => setLoading(false));
  }, [targetId]);

  if (loading) return <p className="text-sm text-gray-500">Memuat detail laporan...</p>;
  if (error) return <p className="text-sm text-red-600 font-medium">{error}</p>;
  if (!data) return null;
  async function toggleSharing() {
    if (!data) return;
    setSharing(true); setShareMessage("");
    try {
      const csrf = await fetch("/api/auth/csrf", { credentials: "include" }).then((r) => r.json());
      const isPublic = !Boolean(data.is_public);
      const response = await fetch(`/api/laporan/${data.id}/sharing`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf.token }, body: JSON.stringify({ isPublic }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Gagal mengubah pengaturan berbagi");
      setData({ ...data, is_public: isPublic }); setShareMessage(result.message);
    } catch (err) { setShareMessage(err instanceof Error ? err.message : "Gagal mengubah pengaturan berbagi"); }
    finally { setSharing(false); }
  }
  const beforeIntegrity = data.foto_path && data.foto_hash
    ? data.foto_integrity_valid === true ? "Hash cocok" : "Hash tidak cocok / tidak tersedia"
    : "Hash belum tersedia";
  const afterIntegrity = data.foto_hasil_path && data.foto_hasil_hash
    ? data.foto_hasil_integrity_valid === true ? "Hash cocok" : "Hash tidak cocok / tidak tersedia"
    : "Belum ada bukti hasil";

  return (
    <div className="surface-card space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="inline-block rounded bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            {data.kategori}
          </span>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{data.judul}</h1>
          <p className="text-xs text-gray-400">
            ID Laporan: #{data.id} • Dibuat pada {new Date(data.created_at).toLocaleString("id-ID")}
          </p>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <section className="rounded-xl border border-gray-200 p-4">
        <h2 className="text-base font-semibold text-gray-900">Riwayat tindak lanjut</h2>
        {data.status_history?.length ? <ol className="mt-4 space-y-4 border-l border-gray-200 pl-4">
          {data.status_history.map((item) => <li key={item.id} className="relative">
            <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
            <p className="font-medium text-gray-800">{item.status_baru || item.status || "Pembaruan status"}</p>
            <p className="text-xs text-gray-500">{item.petugas_nama || "Petugas"} · {new Date(item.created_at).toLocaleString("id-ID")}</p>
            {item.catatan && <p className="mt-1 whitespace-pre-wrap text-sm text-gray-600">{item.catatan}</p>}
          </li>)}
        </ol> : <p className="mt-2 text-sm text-gray-500">Laporan sudah diterima. Belum ada pembaruan dari petugas.</p>}
      </section>

      {canManageSharing && <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 p-4">
        <div><h2 className="font-semibold text-gray-900">Ruang Warga</h2><p className="text-sm text-gray-500">Status: {data.is_public ? "Dibagikan" : "Privat"}. Anda dapat mengubah pilihan ini kapan saja.</p>{shareMessage && <p className="mt-1 text-sm text-cyan-300">{shareMessage}</p>}</div>
        <button type="button" disabled={sharing} onClick={() => void toggleSharing()} className="rounded-lg border border-cyan-700 px-4 py-2 text-sm font-medium text-cyan-200 disabled:opacity-50">{sharing ? "Menyimpan..." : data.is_public ? "Jadikan privat" : "Bagikan laporan"}</button>
      </section>}

      {/* Deskripsi */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
          Deskripsi Masalah / Keluhan
        </h3>
        <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">{data.deskripsi}</p>
      </div>

      {/* Komparasi Foto Before vs After (Audit Trail) */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>Bukti Fisik & Komparasi Audit Penanganan</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${data.foto_integrity_valid && (!data.foto_hasil_path || data.foto_hasil_integrity_valid) ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"}`}>
            {data.foto_integrity_valid && (!data.foto_hasil_path || data.foto_hasil_integrity_valid) ? "Hash file cocok" : "Integritas belum terverifikasi"}
          </span>
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Foto Awal / Before */}
          <div className="rounded-lg border border-gray-200 p-3 bg-gray-50/50">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Kondisi Awal (Warga)</span>
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                BEFORE
              </span>
            </div>
            {data.foto_path ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/laporan/${data.id}/foto?slot=before`}
                  alt="Foto awal laporan"
                  className="h-48 w-full object-cover rounded-md border border-gray-200"
                />
                {data.foto_hash && (
                  <p className="mt-2 text-[10px] text-gray-400 font-mono truncate" title={data.foto_hash}>
                    SHA-256: {data.foto_hash.slice(0, 16)}...
                  </p>
                )}
                <p className={`mt-1 text-[10px] font-medium ${data.foto_integrity_valid ? "text-emerald-700" : "text-red-700"}`}>{beforeIntegrity}</p>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-gray-200 text-xs text-gray-400">
                Tidak ada foto kondisi awal
              </div>
            )}
          </div>

          {/* Foto Hasil / After */}
          <div className="rounded-lg border border-gray-200 p-3 bg-gray-50/50">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Kondisi Pasca Perbaikan (Pemda/Pos)</span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                AFTER
              </span>
            </div>
            {data.foto_hasil_path ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/laporan/${data.id}/foto?slot=after`}
                  alt="Foto hasil penanganan"
                  className="h-48 w-full object-cover rounded-md border border-gray-200"
                />
                {data.foto_hasil_hash && (
                  <p className="mt-2 text-[10px] text-gray-400 font-mono truncate" title={data.foto_hasil_hash}>
                    SHA-256: {data.foto_hasil_hash.slice(0, 16)}...
                  </p>
                )}
                <p className={`mt-1 text-[10px] font-medium ${data.foto_hasil_integrity_valid ? "text-emerald-700" : "text-red-700"}`}>{afterIntegrity}</p>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-gray-200 text-xs text-gray-400">
                Petugas belum mengunggah foto hasil penanganan
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meta Information & Geo-Location */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-lg border border-gray-100 p-4 text-xs text-gray-600 bg-gray-50">
        <div>
          <p className="font-semibold text-gray-700">Identitas Pelapor:</p>
          <p className="text-gray-900 font-medium">{data.pelapor_nama || "Anonim / Warga Terverifikasi"}</p>
          <p className="mt-2 font-semibold text-gray-700">Wilayah Pos Pengaduan:</p>
          <p className="text-gray-900">{data.wilayah_nama || "-"}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Koordinat Presisi GPS (Geo-Tagging):</p>
          <p className="text-gray-900 font-mono">
            {data.latitude && data.longitude
              ? `${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}`
              : "Tidak ada data GPS"}
          </p>
          <p className="mt-2 font-semibold text-gray-700">Status Keamanan Data:</p>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
            <span>🔒</span> Enkripsi AES-256-GCM & Append-Only Log
          </span>
        </div>
      </div>

      {/* Form Update Status (bagi Admin Pemda / Petugas Pos / Pusat) */}
      {showStatusForm && (
        <div className="pt-4 border-t border-gray-100">
          <StatusUpdateForm laporanId={data.id} statusSaatIni={data.status} />
        </div>
      )}
    </div>
  );
}
