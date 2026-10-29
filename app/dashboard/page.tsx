import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/session.service";
import LogoutButton from "@/components/auth/LogoutButton";

const ROLE_LABEL: Record<string, string> = {
  warga: "Warga",
  petugas_pos: "Petugas Pos Kecamatan",
  admin_pemda: "Admin Pemda",
  pusat: "Pusat",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dengar Rakyat!</h1>
        <LogoutButton />
      </header>

      <section className="space-y-2 rounded-2xl bg-white p-6 shadow">
        <p className="text-lg font-semibold text-gray-900">Halo, {user.nama}</p>
        <p className="text-sm text-gray-600">
          Peran: {ROLE_LABEL[user.role] ?? user.role}
          {user.wilayah_nama ? ` — ${user.wilayah_nama}` : ""}
        </p>
        <Link href="/profile" className="inline-block text-sm font-medium text-blue-600">
          Lihat profil &amp; ubah password
        </Link>
        <Link href="/laporan" className="block text-sm font-medium text-blue-600">
          Laporan Saya
        </Link>
      </section>

      <section className="space-y-2 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-sm font-semibold text-gray-700">Menu</h2>
        <nav className="flex flex-col gap-2 text-sm">
          {user.role === "petugas_pos" && (
            <Link href="/dashboard/pos" className="text-blue-600">
              Dashboard Pos Kecamatan
            </Link>
          )}
          {user.role === "admin_pemda" && (
            <Link href="/dashboard/pemda" className="text-blue-600">
              Dashboard Admin Pemda
            </Link>
          )}
          {user.role === "pusat" && (
            <Link href="/dashboard/pusat" className="text-blue-600">
              Dashboard Pusat
            </Link>
          )}
        </nav>
      </section>

      <p className="text-sm text-gray-500">
        Fitur laporan dan dashboard wilayah akan ditambahkan di modul berikutnya.
      </p>
    </main>
  );
}