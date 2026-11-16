"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { postForm } from "@/lib/api-client";
import { useCSRFToken } from "@/hooks/useCSRFToken";

const KATEGORI_OPTIONS = [
  "Infrastruktur",
  "Pelayanan",
  "Keamanan",
  "Lingkungan",
  "Pendidikan",
  "Kesehatan",
  "Lainnya",
];

export default function LaporanForm() {
  const router = useRouter();
  const { csrfToken, loading: csrfLoading } = useCSRFToken();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState("Meminta akses lokasi GPS...");
  const [gpsLocked, setGpsLocked] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function requestLocation() {
    if (!navigator.geolocation) {
      setGpsStatus("Browser Anda tidak mendukung deteksi GPS");
      setGpsLocked(false);
      return;
    }

    setGpsStatus("Mencari koordinat presisi via GPS...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGpsStatus(
          `Lokasi Terkunci: ${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)} (Akurasi: ±${Math.round(pos.coords.accuracy)}m)`
        );
        setGpsLocked(true);
      },
      (err) => {
        setGpsStatus(`Gagal mengunci lokasi (${err.message}). Izinkan akses lokasi pada browser Anda.`);
        setGpsLocked(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  useEffect(() => {
    requestLocation();
  }, []);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!coords) {
      setError("Lokasi GPS wajib aktif saat mengirim laporan untuk verifikasi bukti lapangan (Anti-Fake Report).");
      return;
    }
    if (!csrfToken) {
      setError("Token keamanan belum tersedia. Muat ulang halaman lalu coba lagi.");
      return;
    }
    if (!file) {
      setError("Foto bukti wajib disertakan untuk membantu verifikasi laporan.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.set("judul", judul);
    formData.set("deskripsi", deskripsi);
    formData.set("kategori", kategori);
    formData.set("is_public", String(isPublic));
    formData.set("latitude", String(coords.lat));
    formData.set("longitude", String(coords.lng));
    if (file) formData.set("foto", file);

    const { ok, data } = await postForm("/api/laporan", formData, csrfToken);
    setLoading(false);

    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan saat memproses laporan");
      return;
    }
    router.push(`/laporan/${data.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {error && <Alert type="error">{error}</Alert>}

      <div>
        <h2 className="text-xl font-bold text-gray-900">Form Pengaduan Masalah Rakyat</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Data keluhan dan lokasi kejadian dienkripsi dengan standar AES-256-GCM.
        </p>
      </div>

      <FormField
        id="judul"
        label="Judul Laporan"
        placeholder="Contoh: Jembatan Rusak di Dusun Karanganyar"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        required
      />

      <div className="space-y-1.5">
        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">
          Kategori Permasalahan
        </label>
        <select
          id="kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          required
          className="input-field w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
        >
          <option value="">-- Pilih Kategori Laporan --</option>
          {KATEGORI_OPTIONS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
          Deskripsi Rinci Keluhan
        </label>
        <textarea
          id="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Ceritakan masalah yang ingin Anda laporkan..."
          required
          className="input-field w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
        <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="mt-1 accent-cyan-500" />
        <span><strong className="block text-gray-900">Bagikan ke Ruang Warga (opsional)</strong>
          <span className="mt-1 block text-gray-500">Jika dipilih, judul, kategori, isi laporan, kota/kabupaten, status, dan waktu dapat dilihat serta dikomentari pengguna lain. Nama Anda disamarkan. Foto bukti, titik GPS, email, dan NIK tetap privat.</span>
        </span>
      </label>

      {/* Ambil Foto Bukti */}
      <div className="space-y-2">
        <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
          Foto Bukti Fisik (Kamera Langsung)
        </label>

        <label
          htmlFor="foto"
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all"
        >
          {previewUrl ? (
            <div className="space-y-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview Foto" className="h-44 w-auto mx-auto rounded-lg object-cover shadow" />
              <p className="text-xs text-blue-600 font-medium">Klik untuk mengganti foto</p>
            </div>
          ) : (
            <div className="space-y-1 text-gray-500">
              <span className="text-2xl">📸</span>
              <p className="text-sm font-medium text-gray-700">Klik untuk mengambil foto bukti langsung</p>
              <p className="text-xs text-gray-400">Mendukung kamera HP/Webcam (JPEG, PNG maks 10MB)</p>
            </div>
          )}
        </label>

        <input
          id="foto"
          type="file"
          accept="image/*"
          capture="environment"
          required
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Status GPS Geo-Tagging */}
      <div
        className={`flex items-center justify-between rounded-lg border p-3 text-xs ${
          gpsLocked
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-amber-200 bg-amber-50 text-amber-800"
        }`}
      >
        <div className="flex items-center space-x-2">
          <span>{gpsLocked ? "📍" : "⏳"}</span>
          <span>{gpsStatus}</span>
        </div>
        {!gpsLocked && (
          <button
            type="button"
            onClick={requestLocation}
            className="rounded bg-amber-600 px-2 py-1 text-white hover:bg-amber-700 text-[11px] font-medium"
          >
            Coba Lagi
          </button>
        )}
      </div>

      <Button type="submit" disabled={loading || csrfLoading || !csrfToken || !coords}>
        {loading ? "Mengenkripsi & Mengirim Laporan..." : "Kirim Laporan"}
      </Button>
    </form>
  );
}
