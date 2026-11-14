"use client";

import { useEffect, useState } from "react";
import type { Laporan } from "@/features/laporan/laporan.types";
import StatusUpdateForm from "./StatusUpdateForm";

export default function LaporanDetail({ id, showStatusForm }: { id: string; showStatusForm?: boolean }) {
  const [data, setData] = useState<Laporan | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch(`/api/laporan/${id}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) {
          setError(d.error ?? "Terjadi kesalahan");
          return;
        }
        setData(d);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{data.judul}</h1>
        <p className="text-sm text-gray-500">
          {data.kategori} — {data.status}
        </p>
      </div>

      <p className="text-sm text-gray-700">{data.deskripsi}</p>

      <div className="flex flex-wrap gap-4">
        {data.foto_path && (
          <div>
            <p className="mb-1 text-xs text-gray-500">Foto Awal (Before)</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.foto_path} alt="Foto awal laporan" className="max-w-xs rounded-lg border" />
          </div>
        )}
        {data.foto_hasil_path && (
          <div>
            <p className="mb-1 text-xs text-gray-500">Foto Hasil (After)</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.foto_hasil_path} alt="Foto hasil penanganan" className="max-w-xs rounded-lg border" />
          </div>
        )}
      </div>

      <dl className="space-y-1 text-sm text-gray-600">
        <div>Pelapor: {data.pelapor_nama}</div>
        <div>Wilayah: {data.wilayah_nama ?? "-"}</div>
        <div>
          Lokasi: {data.latitude ?? "-"}, {data.longitude ?? "-"}
        </div>
        <div>Dibuat: {new Date(data.created_at).toLocaleString("id-ID")}</div>
      </dl>

      {showStatusForm && <StatusUpdateForm laporanId={data.id} statusSaatIni={data.status} />}
    </div>
  );
}