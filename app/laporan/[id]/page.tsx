import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/session.service";
import LaporanDetail from "@/components/laporan/LaporanDetail";

export default async function LaporanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Link href="/laporan" className="text-sm font-medium text-blue-600">
        &larr; Kembali
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow">
        <LaporanDetail id={id} />
      </div>
    </main>
  );
}