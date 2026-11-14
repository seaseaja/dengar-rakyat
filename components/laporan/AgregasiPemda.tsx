"use client";

import { useEffect, useMemo, useState } from "react";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

interface Row {
  kecamatan: string;
  status: string;
  jumlah: string;
}

const ACCENT_MAP: Record<string, "amber" | "blue" | "indigo" | "green"> = {
  Diterima: "amber",
  Diverifikasi: "blue",
  Diproses: "indigo",
  Selesai: "green",
};

export default function AgregasiPemda({ kotaKabId }: { kotaKabId: number | null }) {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kotaKabId) {
      setLoading(false);
      return;
    }
    void fetch(`/api/admin/laporan-agregasi?kotaKabId=${kotaKabId}`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setData(d))
      .finally(() => setLoading(false));
  }, [kotaKabId]);

  const totals = useMemo(() => {
    const base: Record<string, number> = { Diterima: 0, Diverifikasi: 0, Diproses: 0, Selesai: 0 };
    data.forEach((r) => {
      base[r.status] = (base[r.status] ?? 0) + Number(r.jumlah);
    });
    return base;
  }, [data]);

  if (!kotaKabId) return <p className="text-sm text-gray-500">Akun belum terhubung ke kota/kabupaten.</p>;
  if (loading) return <p className="text-sm text-gray-500">Memuat...</p>;
  if (data.length === 0) return <p className="text-sm text-gray-500">Belum ada laporan.</p>;

  const grouped = data.reduce<Record<string, Row[]>>((acc, row) => {
    (acc[row.kecamatan] ??= []).push(row);
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(totals).map(([status, jumlah]) => (
          <StatCard key={status} label={status} value={jumlah} accent={ACCENT_MAP[status] ?? "gray"} />
        ))}
      </div>

      <div className="space-y-3">
        {Object.entries(grouped).map(([kec, rows]) => (
          <div key={kec} className="rounded-lg border border-gray-200 p-3">
            <p className="text-sm font-semibold text-gray-800">{kec}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {rows.map((r) => (
                <div key={r.status} className="flex items-center gap-1.5">
                  <StatusBadge status={r.status} />
                  <span className="text-xs text-gray-500">x{r.jumlah}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}