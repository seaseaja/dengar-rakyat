import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/features/auth/session.service";
import PusatDashboard from "@/components/dashboard/PusatDashboard";
import AdminTools from "@/components/dashboard/AdminTools";

export default async function PusatDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            &larr; Kembali
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">📊 Dashboard Pusat</h1>
          <p className="text-sm text-gray-600">Statistik & analisis nasional sistem Dengar Rakyat</p>
        </div>
      </div>

      <PusatDashboard />

      <AdminTools role="PUSAT" />
    </main>
  );
}