"use client";

import { useEffect, useState } from "react";

interface Row {
  kecamatan: string;
  status: string;
  jumlah: string;
}

export default function AgregasiPemda({ kotaKabId }: { kotaKabId: number | null }) {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kotaKabId) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/laporan-agregasi?kotaKabId=${kotaKabId}`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setData(d))
      .finally(() => setLoading(false));
  }, [kotaKabId]);

  if (!kotaKabId) return <p className="text-sm text-gray-500">Akun belum terhubung ke kota/kabupaten.</p>;
  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;
  if (data.length === 0) return <p className="text-sm text-gray-500">Belum ada laporan.</p>;

  const grouped = data.reduce<Record<string, Row[]>>((acc, row) => {
    (acc[row.kecamatan] ??= []).push(row);
    return acc;
  }, {});

  return (
    <div className="space-y-3">
      {Object.entries(grouped).map(([kec, rows]) => (
        <div key={kec} className="rounded-lg border border-gray-200 p-3">
          <p className="text-sm font-semibold text-gray-800">{kec}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {rows.map((r) => (
              <span key={r.status} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {r.status}: {r.jumlah}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}