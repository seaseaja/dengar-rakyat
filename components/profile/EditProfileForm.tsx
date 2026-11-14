"use client";

import { useState } from "react";
import Alert from "../ui/Alert";

interface EditProfileFormProps {
  user: {
    id: number;
    nama: string;
    email: string;
    nik: string | null;
    alamat: string | null;
    wilayah_nama?: string | null;
  };
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [nama, setNama] = useState(user.nama);
  const [alamat, setAlamat] = useState(user.alamat || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nama, alamat }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengupdate profil");
      }

      setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && <Alert type={message.type} message={message.text} />}

      <div className="space-y-4">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            disabled
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">Email tidak dapat diubah</p>
        </div>

        <div>
          <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
            NIK
          </label>
          <input
            type="text"
            id="nik"
            value={user.nik || "-"}
            disabled
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">NIK tidak dapat diubah</p>
        </div>

        <div>
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
            Alamat
          </label>
          <textarea
            id="alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {user.wilayah_nama && (
          <div>
            <label htmlFor="wilayah" className="block text-sm font-medium text-gray-700">Wilayah</label>
            <input
              id="wilayah"
              type="text"
              value={user.wilayah_nama}
              disabled
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500">Wilayah tidak dapat diubah</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
