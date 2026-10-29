import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/session.service";
import LaporanForm from "@/components/laporan/LaporanForm";

export default async function LaporanBaruPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Link href="/laporan" className="text-sm font-medium text-blue-600">
        &larr; Kembali
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">Buat Laporan</h1>

      <div className="rounded-2xl bg-white p-6 shadow">
        <LaporanForm />
      </div>
    </main>
  );
}