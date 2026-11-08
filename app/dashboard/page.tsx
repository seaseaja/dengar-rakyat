import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";

const ROLE_LABEL: Record<string, string> = {
  warga: "Warga",
  petugas_pos: "Petugas Pos Kecamatan",
  admin_pemda: "Admin Pemda",
  pusat: "Pusat",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Card */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <h1 className="text-3xl font-bold text-white">
              Selamat Datang, {user.nama}! 👋
            </h1>
            <p className="mt-2 text-lg text-blue-100">
              {ROLE_LABEL[user.role]}
              {user.wilayah_nama ? ` • ${user.wilayah_nama}` : ""}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Akses Cepat</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {user.role === "petugas_pos" && (
              <Link
                href="/dashboard/pos"
                className="group rounded-xl border-2 border-blue-100 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Dashboard Pos</h3>
                <p className="mt-1 text-sm text-gray-600">Lihat statistik dan laporan wilayah Anda</p>
              </Link>
            )}
            {user.role === "admin_pemda" && (
              <Link
                href="/dashboard/pemda"
                className="group rounded-xl border-2 border-purple-100 bg-white p-6 shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Dashboard Pemda</h3>
                <p className="mt-1 text-sm text-gray-600">Analisis laporan tingkat kota/kabupaten</p>
              </Link>
            )}
            {user.role === "pusat" && (
              <Link
                href="/dashboard/pusat"
                className="group rounded-xl border-2 border-green-100 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600 group-hover:bg-green-100">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Dashboard Pusat</h3>
                <p className="mt-1 text-sm text-gray-600">Monitor laporan nasional</p>
              </Link>
            )}

            <Link
              href="/laporan/baru"
              className="group rounded-xl border-2 border-blue-100 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Buat Laporan</h3>
              <p className="mt-1 text-sm text-gray-600">Laporkan keluhan atau aspirasi Anda</p>
            </Link>

            <Link
              href="/laporan"
              className="group rounded-xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-gray-600 group-hover:bg-gray-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Laporan Saya</h3>
              <p className="mt-1 text-sm text-gray-600">Lihat status laporan yang telah dibuat</p>
            </Link>

            <Link
              href="/profile"
              className="group rounded-xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-gray-600 group-hover:bg-gray-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Profil</h3>
              <p className="mt-1 text-sm text-gray-600">Kelola data dan ubah password</p>
            </Link>
          </div>
        </div>

        {/* Info Card */}
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900">Sistem Dengar Rakyat</h3>
              <p className="mt-1 text-sm text-blue-700">
                Platform untuk menyampaikan aspirasi dan keluhan kepada pemerintah dengan transparan dan akuntabel.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}