import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import { query } from "@/lib/db";
import { decrypt } from "@/lib/crypto";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");

  // Address is deliberately excluded from session payloads; load only for this
  // authenticated profile view and decrypt it on the server.
  const profileResult = await query(
    "SELECT alamat_enc FROM users WHERE id = ? LIMIT 1",
    [user.id]
  );
  const profile = profileResult.rows[0] as { alamat_enc: string | null } | undefined;
  let alamat: string | null = null;
  if (profile?.alamat_enc) {
    try {
      alamat = decrypt(profile.alamat_enc);
    } catch (error) {
      console.error("[profile] Stored address could not be decrypted", error);
    }
  }
  const profileUser = { ...user, alamat };

  return (
    <div className="dashboard-theme min-h-screen">
      <Navbar user={user} />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <p className="eyebrow mb-2">Akun Anda</p>
          <h1 className="page-title text-3xl font-bold text-gray-900 sm:text-4xl">Profil Saya</h1>
          <p className="mt-1 text-sm text-gray-600">Kelola informasi pribadi dan keamanan akun Anda</p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="surface-card overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="profile-banner border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
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
              <EditProfileForm user={profileUser} />
            </div>
          </div>

          {/* Security Card */}
          <div className="surface-card overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
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
