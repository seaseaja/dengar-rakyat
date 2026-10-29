"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { postForm } from "@/lib/api-client";

const KATEGORI_OPTIONS = ["Infrastruktur", "Kebersihan", "Keamanan", "Pelayanan Publik", "Lainnya"];

export default function LaporanForm() {
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState("Meminta lokasi GPS...");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsStatus("Browser tidak mendukung GPS");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGpsStatus(`Lokasi terkunci: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      },
      () => setGpsStatus("Gagal mengambil lokasi. Izinkan akses GPS lalu refresh halaman."),
      { enableHighAccuracy: true }
    );
  }, []);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!coords) {
      setError("Lokasi GPS belum terkunci. Tunggu sebentar atau izinkan akses lokasi.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.set("judul", judul);
    formData.set("deskripsi", deskripsi);
    formData.set("kategori", kategori);
    formData.set("latitude", String(coords.lat));
    formData.set("longitude", String(coords.lng));
    if (file) formData.set("foto", file);

    const { ok, data } = await postForm("/api/laporan", formData);
    setLoading(false);

    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan");
      return;
    }
    router.push(`/laporan/${data.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error">{error}</Alert>}

      <FormField id="judul" label="Judul Laporan" value={judul} onChange={(e) => setJudul(e.target.value)} />

      <div className="space-y-1">
        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">
          Kategori
        </label>
        <select
          id="kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
        >
          <option value="">-- Pilih kategori --</option>
          {KATEGORI_OPTIONS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
          Foto (ambil langsung dari kamera)
        </label>
        <label
          htmlFor="foto"
          className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-blue-600 hover:text-blue-600"
        >
          {file ? file.name : "Pilih atau ambil foto"}
        </label>
        <input
          id="foto"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="text-sm text-gray-500">{gpsStatus}</p>

      <Button type="submit" disabled={loading || !coords}>
        {loading ? "Mengirim..." : "Kirim Laporan"}
      </Button>
    </form>
  );
}