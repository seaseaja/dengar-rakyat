import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/features/auth/session.service";
import PemdaDashboard from "@/components/dashboard/PemdaDashboard";
import AdminTools from "@/components/dashboard/AdminTools";

export default async function PemdaDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            &larr; Kembali
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">📊 Dashboard Pemda</h1>
          <p className="text-sm text-gray-600">
            {user.wilayah_nama ? `Statistik ${user.wilayah_nama}` : "Statistik wilayah Anda"}
          </p>
        </div>
      </div>

      <PemdaDashboard kotaKabId={user.wilayah_id} kotaKabNama={user.wilayah_nama} />

      <AdminTools role="PEMDA" kotaKabId={user.wilayah_id} />
    </main>
  );
}