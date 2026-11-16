import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";
import LaporanList from "@/components/laporan/LaporanList";

export default async function LaporanPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");
  if (user.role !== "warga") {
    if (user.role === "pusat") redirect("/dashboard/pusat");
    if (user.role === "admin_pemda") redirect("/dashboard/pemda");
    if (user.role === "petugas_pos") redirect("/dashboard/pos");
    redirect("/dashboard");
  }

  return (
    <div className="dashboard-theme min-h-screen">
      <Navbar user={user} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow mb-2">Arsip pengaduan</p>
            <h1 className="page-title text-3xl font-bold text-gray-900 sm:text-4xl">Laporan Saya</h1>
            <p className="mt-1 text-sm text-gray-600">
              Kelola dan pantau status laporan yang telah Anda buat
            </p>
          </div>
          <Link
            href="/laporan/baru"
            className="inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Buat Laporan Baru</span>
          </Link>
        </div>

        <LaporanList mode="mine" />
      </main>
    </div>
  );
}
