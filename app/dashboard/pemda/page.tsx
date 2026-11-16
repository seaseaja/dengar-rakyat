import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";
import PemdaDashboard from "@/components/dashboard/PemdaDashboard";
import AdminTools from "@/components/dashboard/AdminTools";

export default async function PemdaDashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");
  if (user.role !== "admin_pemda") redirect("/dashboard");

  return (
    <div className="dashboard-theme min-h-screen">
      <Navbar user={user} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Pemda</h1>
          <p className="mt-1 text-sm text-gray-600">Analisis wilayah {user.wilayah_nama} · diperbarui otomatis setiap 5 detik</p>
        </div>

        {/* Dashboard Content */}
        <PemdaDashboard kotaKabId={user.wilayah_id} kotaKabNama={user.wilayah_nama} />

        {/* Admin Tools */}
        <div className="mt-8">
          <AdminTools role="admin_pemda" kotaKabId={user.wilayah_id} />
        </div>
      </main>
    </div>
  );
}
