import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/session.service";
import LaporanList from "@/components/laporan/LaporanList";

export default async function LaporanPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Link href="/dashboard" className="text-sm font-medium text-blue-600">
        &larr; Kembali
      </Link>

      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Laporan Saya</h1>
        <Link
          href="/laporan/baru"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Buat Laporan
        </Link>
      </header>

      <LaporanList mode="mine" />
    </main>
  );
}