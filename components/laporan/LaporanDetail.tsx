"use client";

import { useEffect, useState } from "react";
import type { Laporan } from "@/features/laporan/laporan.types";

export default function LaporanDetail({ id }: { id: string }) {
  const [data, setData] = useState<Laporan | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/laporan/${id}`)
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

      {data.foto_path && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.foto_path} alt="Foto laporan" className="max-w-sm rounded-lg border" />
      )}

      <dl className="space-y-1 text-sm text-gray-600">
        <div>Pelapor: {data.pelapor_nama}</div>
        <div>Wilayah: {data.wilayah_nama ?? "-"}</div>
        <div>
          Lokasi: {data.latitude ?? "-"}, {data.longitude ?? "-"}
        </div>
        <div>Dibuat: {new Date(data.created_at).toLocaleString("id-ID")}</div>
      </dl>
    </div>
  );
}