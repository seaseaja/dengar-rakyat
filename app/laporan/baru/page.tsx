import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";
import LaporanForm from "@/components/laporan/LaporanForm";

export default async function LaporanBaruPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-4">
            <Link
              href="/laporan"
              className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Kembali ke Laporan Saya</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Buat Laporan Baru</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sampaikan keluhan atau aspirasi Anda kepada pemerintah
          </p>
        </div>

        {/* Info Card */}
        <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm text-blue-700">
              <p className="font-medium">Panduan Membuat Laporan:</p>
              <ul className="mt-1 list-inside list-disc space-y-1">
                <li>Gunakan judul yang jelas dan deskriptif</li>
                <li>Jelaskan masalah secara detail</li>
                <li>Sertakan lokasi GPS jika relevan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <LaporanForm />
        </div>
      </main>
    </div>
  );
}
