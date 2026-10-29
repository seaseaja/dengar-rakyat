"use client";

import { useEffect, useState } from "react";

interface KotaKab {
  id: number;
  nama: string;
  provinsi_nama: string;
  admin_nama: string | null;
  admin_email: string | null;
}

export default function PusatDashboard() {
  const [data, setData] = useState<KotaKab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/kota-kab")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;

  const grouped = data.reduce<Record<string, KotaKab[]>>((acc, row) => {
    (acc[row.provinsi_nama] ??= []).push(row);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([prov, rows]) => (
        <div key={prov}>
          <p className="text-sm font-semibold text-gray-700">{prov}</p>
          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
            {rows.map((k) => (
              <li key={k.id} className="flex items-center justify-between px-4 py-2 text-sm">
                <span>{k.nama}</span>
                <span className="text-gray-500">
                  {k.admin_nama ? `${k.admin_nama} (${k.admin_email})` : "Belum ada admin"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}