import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
          <p className="mt-1 text-sm text-gray-600">Kelola informasi pribadi dan keamanan akun Anda</p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-blue-600 shadow-md">
                  {user.nama.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.nama}</h2>
                  <p className="text-blue-100">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Informasi Pribadi</h3>
              <EditProfileForm user={user} />
            </div>
          </div>

          {/* Security Card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Keamanan Akun</span>
              </h3>
            </div>

            <div className="px-6 py-6">
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}