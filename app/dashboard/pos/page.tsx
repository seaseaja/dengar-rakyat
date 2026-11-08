import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";
import PosDashboardContent from "@/components/dashboard/PosDashboardContent";

export default async function PosDashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");
  if (user.role !== "petugas_pos") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Pos Kecamatan</h1>
          <p className="mt-1 text-sm text-gray-600">Kelola laporan wilayah Anda - {user.wilayah_nama}</p>
        </div>

        {/* Dashboard Content */}
        <PosDashboardContent />
      </main>
    </div>
  );
}
