import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/features/auth/session.service";
import PosDashboardContent from "@/components/dashboard/PosDashboardContent";

export default async function PosDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Link href="/dashboard" className="text-sm font-medium text-blue-600">
        &larr; Kembali
      </Link>

      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Pos Kecamatan</h1>
        <p className="text-sm text-gray-600">{user.wilayah_nama ?? "-"}</p>
      </header>

      <PosDashboardContent />
    </main>
  );
}