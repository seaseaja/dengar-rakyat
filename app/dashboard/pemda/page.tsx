import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/features/auth/session.service";
import PemdaDashboard from "@/components/dashboard/PemdaDashboard";

export default async function PemdaDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Link href="/dashboard" className="text-sm font-medium text-blue-600">
        &larr; Kembali
      </Link>

      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin Pemda</h1>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Kecamatan &amp; Petugas Pos</h2>
        <PemdaDashboard kotaKabId={user.wilayah_id} kotaKabNama={user.wilayah_nama} />
      </section>
    </main>
  );
}