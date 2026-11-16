import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";
import PusatDashboard from "@/components/dashboard/PusatDashboard";
import AdminTools from "@/components/dashboard/AdminTools";
import AuditPusat from "@/components/laporan/AuditPusat";

export default async function PusatDashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");
  if (user.role !== "pusat") redirect("/dashboard");

  return (
    <div className="dashboard-theme min-h-screen">
      <Navbar user={user} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Pusat</h1>
          <p className="mt-1 text-sm text-gray-600">Monitoring laporan nasional · diperbarui otomatis setiap 5 detik</p>
        </div>

        {/* Dashboard Content */}
        <PusatDashboard />

        {/* Audit Penanganan Before vs After */}
        <div className="mt-8">
          <AuditPusat />
        </div>

        {/* Admin Tools */}
        <div className="mt-8">
          <AdminTools role="pusat" />
        </div>

      </main>
    </div>
  );
}
