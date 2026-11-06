"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/ui/AuthCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import { postJson } from "@/lib/api-client";

interface WilayahOption {
  id: number;
  nama: string;
}

async function fetchWilayah(tipe: string, parentId?: string): Promise<WilayahOption[]> {
  const params = new URLSearchParams({ tipe });
  if (parentId) params.set("parentId", parentId);
  const res = await fetch(`/api/wilayah?${params.toString()}`);
  const data = await res.json().catch(() => []);
  return Array.isArray(data) ? data : [];
}

const SELECT_CLASS =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none disabled:bg-gray-100";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    email: "",
    alamat: "",
    password: "",
  });

  const [provinsi, setProvinsi] = useState<WilayahOption[]>([]);
  const [kotaKab, setKotaKab] = useState<WilayahOption[]>([]);
  const [kecamatan, setKecamatan] = useState<WilayahOption[]>([]);

  const [provinsiId, setProvinsiId] = useState("");
  const [kotaKabId, setKotaKabId] = useState("");
  const [kecamatanId, setKecamatanId] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Provinsi: di-fetch SEKALI saat halaman dibuka
  useEffect(() => {
    let active = true;
    fetchWilayah("provinsi").then((data) => {
      if (active) setProvinsi(data);
    });
    return () => {
      active = false;
    };
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleProvinsiChange(e: ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    setProvinsiId(id);
    setKotaKabId("");
    setKecamatanId("");
    setKotaKab([]);
    setKecamatan([]);
    if (id) setKotaKab(await fetchWilayah("kota_kab", id));
  }

  async function handleKotaKabChange(e: ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    setKotaKabId(id);
    setKecamatanId("");
    setKecamatan([]);
    if (id) setKecamatan(await fetchWilayah("kecamatan", id));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { ok, data } = await postJson("/api/auth/register", {
      ...form,
      wilayah_id: kecamatanId,
    });
    setLoading(false);
    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan");
      return;
    }
    router.push("/login?registered=1");
  }

  return (
    <AuthCard title="Daftar Akun" subtitle="Dengar Rakyat! — Lapor, dilacak, ditindaklanjuti">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert type="error">{error}</Alert>}

        <FormField id="nik" name="nik" label="NIK" maxLength={16} value={form.nik} onChange={handleChange} />
        <FormField id="nama" name="nama" label="Nama Lengkap" value={form.nama} onChange={handleChange} />
        <FormField id="email" name="email" label="Email" type="text" value={form.email} onChange={handleChange} />

        <div className="space-y-1">
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
            Alamat
          </label>
          <textarea
            id="alamat"
            name="alamat"
            rows={2}
            value={form.alamat}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700">
            Provinsi
          </label>
          <select id="provinsi" value={provinsiId} onChange={handleProvinsiChange} className={SELECT_CLASS}>
            <option value="">-- Pilih provinsi --</option>
            {provinsi.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="kotaKab" className="block text-sm font-medium text-gray-700">
            Kota / Kabupaten
          </label>
          <select
            id="kotaKab"
            value={kotaKabId}
            onChange={handleKotaKabChange}
            disabled={!provinsiId}
            className={SELECT_CLASS}
          >
            <option value="">-- Pilih kota/kabupaten --</option>
            {kotaKab.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">
            Kecamatan
          </label>
          <select
            id="kecamatan"
            value={kecamatanId}
            onChange={(e) => setKecamatanId(e.target.value)}
            disabled={!kotaKabId}
            className={SELECT_CLASS}
          >
            <option value="">-- Pilih kecamatan --</option>
            {kecamatan.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </select>
        </div>

        <FormField id="password" name="password" label="Password" type="password" value={form.password} onChange={handleChange} />
        
        {/* Password Strength Meter - H6 */}
        <PasswordStrengthMeter password={form.password} />

        <Button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Daftar"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-blue-600">
          Masuk
        </Link>
      </p>
    </AuthCard>
  );
}