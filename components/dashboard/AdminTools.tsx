"use client";

import { useEffect, useState } from "react";

interface KotaKab {
  id: number;
  nama: string;
  provinsi_nama: string;
  admin_nama: string | null;
  admin_email: string | null;
}

interface Kecamatan {
  id: number;
  nama: string;
  petugas_nama: string | null;
  petugas_email: string | null;
}

interface AdminToolsProps {
  role: "PUSAT" | "PEMDA";
  kotaKabId?: number | null;
}

export default function AdminTools({ role, kotaKabId }: AdminToolsProps) {
  const [kotaKabData, setKotaKabData] = useState<KotaKab[]>([]);
  const [kecamatanData, setKecamatanData] = useState<Kecamatan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (role === "PUSAT") {
      // Load all kota/kab
      void fetch("/api/admin/kota-kab")
        .then((r) => r.json())
        .then((d) => Array.isArray(d) && setKotaKabData(d))
        .finally(() => setLoading(false));
    } else if (role === "PEMDA" && kotaKabId) {
      // Load kecamatan in this kota/kab
      void fetch(`/api/admin/kecamatan?kotaKabId=${kotaKabId}`)
        .then((r) => r.json())
        .then((d) => Array.isArray(d) && setKecamatanData(d))
        .finally(() => setLoading(false));
    }
  }, [role, kotaKabId]);

  if (loading) {
    return <p className="text-sm text-gray-500">Memuat data admin...</p>;
  }

  if (role === "PUSAT") {
    const grouped = kotaKabData.reduce<Record<string, KotaKab[]>>((acc, row) => {
      (acc[row.provinsi_nama] ??= []).push(row);
      return acc;
    }, {});

    // Filter by search
    const filteredGrouped: Record<string, KotaKab[]> = {};
    Object.entries(grouped).forEach(([prov, rows]) => {
      const filtered = rows.filter(
        (k) =>
          k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (k.admin_nama?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
          prov.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        filteredGrouped[prov] = filtered;
      }
    });

    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">🏛️ Kelola Kota/Kabupaten</h3>
          <input
            type="text"
            placeholder="Cari provinsi, kota, atau admin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-6">
          {Object.keys(filteredGrouped).length === 0 ? (
            <p className="text-sm text-gray-500">Tidak ada hasil yang cocok</p>
          ) : (
            Object.entries(filteredGrouped).map(([prov, rows]) => (
              <div key={prov}>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-blue-600"></div>
                  <p className="text-sm font-semibold text-gray-700">{prov}</p>
                  <span className="text-xs text-gray-500">({rows.length})</span>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Kota/Kabupaten</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Admin</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {rows.map((k) => (
                        <tr key={k.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium text-gray-900">{k.nama}</td>
                          <td className="px-4 py-2 text-gray-700">
                            {k.admin_nama || (
                              <span className="text-gray-400 italic">Belum ada admin</span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-gray-600">{k.admin_email || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // PEMDA view
  const filteredKecamatan = kecamatanData.filter(
    (k) =>
      k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (k.petugas_nama?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">🏘️ Kelola Kecamatan & Petugas</h3>
        <input
          type="text"
          placeholder="Cari kecamatan atau petugas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Kecamatan</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Petugas</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredKecamatan.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  Tidak ada hasil yang cocok
                </td>
              </tr>
            ) : (
              filteredKecamatan.map((k) => (
                <tr key={k.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{k.nama}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {k.petugas_nama || <span className="text-gray-400 italic">Belum ada petugas</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{k.petugas_email || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
