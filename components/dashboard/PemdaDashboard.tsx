"use client";

import { useEffect, useState } from "react";

interface Kecamatan {
  id: number;
  nama: string;
  petugas_nama: string | null;
  petugas_email: string | null;
}

export default function PemdaDashboard({
  kotaKabId,
  kotaKabNama,
}: {
  kotaKabId: number | null;
  kotaKabNama?: string | null;
}) {
  const [data, setData] = useState<Kecamatan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kotaKabId) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/kecamatan?kotaKabId=${kotaKabId}`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setData(d))
      .finally(() => setLoading(false));
  }, [kotaKabId]);

  if (!kotaKabId) {
    return <p className="text-sm text-gray-500">Akun ini belum terhubung ke kota/kabupaten.</p>;
  }
  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">Kecamatan di {kotaKabNama}:</p>
      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
        {data.map((k) => (
          <li key={k.id} className="flex items-center justify-between px-4 py-2 text-sm">
            <span className="text-gray-900">{k.nama}</span>
            <span className="text-gray-500">
              {k.petugas_nama ? `${k.petugas_nama} (${k.petugas_email})` : "Belum ada petugas"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}