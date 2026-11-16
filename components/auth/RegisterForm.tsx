"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/ui/AuthCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { PasswordPolicyPopup } from "@/components/ui/PasswordPolicyPopup";
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
  const [errorDetails, setErrorDetails] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Provinsi: di-fetch SEKALI saat halaman dibuka
  useEffect(() => {
    let active = true;
    void fetchWilayah("provinsi").then((data) => {
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
    setErrorDetails([]);
    setLoading(true);
    const { ok, data } = await postJson("/api/auth/register", {
      ...form,
      wilayah_id: kecamatanId,
    });
    setLoading(false);
    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan");
      if (Array.isArray(data.details)) {
        setErrorDetails(data.details.filter((detail: unknown): detail is string => typeof detail === "string"));
      }
      return;
    }
    router.push("/login?registered=1");
  }

  return (
    <AuthCard title="Daftar Akun" subtitle="Dengar Rakyat! — Lapor, dilacak, ditindaklanjuti">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert type="error">
            <p>{error}</p>
            {errorDetails.length > 0 && (
              <ul className="mt-2 list-inside list-disc space-y-1">
                {errorDetails.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            )}
          </Alert>
        )}

        <FormField id="nik" name="nik" label="NIK" inputMode="numeric" pattern="[0-9]{16}" title="NIK harus 16 digit angka" maxLength={16} required value={form.nik} onChange={handleChange} />
        <FormField id="nama" name="nama" label="Nama Lengkap" minLength={2} maxLength={100} required value={form.nama} onChange={handleChange} />
        <FormField id="email" name="email" label="Email" type="email" maxLength={100} required value={form.email} onChange={handleChange} />

        <div className="space-y-1">
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
            Alamat
          </label>
          <textarea
            id="alamat"
            name="alamat"
            rows={2}
            minLength={5}
            maxLength={255}
            required
            value={form.alamat}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700">
            Provinsi
          </label>
          <select id="provinsi" value={provinsiId} onChange={handleProvinsiChange} required className={SELECT_CLASS}>
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
            required
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
            required
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

        <div className="relative">
          <FormField
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Minimal 8 karakter, kombinasi huruf, angka, simbol"
          />

          {/* Real-time Pop-up Checklist */}
          <PasswordPolicyPopup
            password={form.password}
            username={form.nama || form.email.split("@")[0]}
            visible={passwordFocused || form.password.length > 0}
          />
        </div>

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
