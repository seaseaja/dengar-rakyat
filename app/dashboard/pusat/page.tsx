import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/features/auth/session.service";
import PusatDashboard from "@/components/dashboard/PusatDashboard";
import AuditPusat from "@/components/laporan/AuditPusat";

export default async function PusatDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Link href="/dashboard" className="text-sm font-medium text-blue-600">
        &larr; Kembali
      </Link>

      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Pusat</h1>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Audit Nasional</h2>
        <AuditPusat />
      </section>

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Semua Kota/Kabupaten &amp; Admin Pemda</h2>
        <PusatDashboard />
      </section>
    </main>
  );
}