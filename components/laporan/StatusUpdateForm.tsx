"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { postForm } from "@/lib/api-client";

const STATUS_OPTIONS = ["Diterima", "Diverifikasi", "Diproses", "Selesai"];

export default function StatusUpdateForm({ laporanId, statusSaatIni }: { laporanId: number; statusSaatIni: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(statusSaatIni);
  const [catatan, setCatatan] = useState("");
  const [fotoHasil, setFotoHasil] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFotoHasil(e.target.files?.[0] ?? null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const formData = new FormData();
    formData.set("status", status);
    formData.set("catatan", catatan);
    if (fotoHasil) formData.set("fotoHasil", fotoHasil);

    const { ok, data } = await postForm(`/api/laporan/${laporanId}/status`, formData);
    setLoading(false);

    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan");
      return;
    }
    setMessage(data.message);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900">Update Status</h3>
      {message && <Alert type="success">{message}</Alert>}
      {error && <Alert type="error">{error}</Alert>}

      <div className="space-y-1">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status Baru
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="catatan" className="block text-sm font-medium text-gray-700">
          Catatan
        </label>
        <textarea
          id="catatan"
          rows={2}
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="fotoHasil" className="block text-sm font-medium text-gray-700">
          Foto Hasil Penanganan
        </label>
        <label
          htmlFor="fotoHasil"
          className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-blue-600 hover:text-blue-600"
        >
          {fotoHasil ? fotoHasil.name : "Pilih atau ambil foto"}
        </label>
        <input id="fotoHasil" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}