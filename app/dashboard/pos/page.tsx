import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/features/auth/session.service";
import LaporanList from "@/components/laporan/LaporanList";

export default async function PosDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Link href="/dashboard" className="text-sm font-medium text-blue-600">
        &larr; Kembali
      </Link>

      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Pos Kecamatan</h1>
        <p className="text-sm text-gray-600">{user.wilayah_nama ?? "-"}</p>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Semua Laporan</h2>
        <LaporanList mode="all" />
      </section>
    </main>
  );
}