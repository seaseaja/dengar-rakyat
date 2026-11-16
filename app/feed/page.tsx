import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";
import CommunityFeed from "@/components/feed/CommunityFeed";

export default async function FeedPage() {
  const user = await getCurrentUser((await cookies()).get(SESSION_COOKIE_NAME)?.value);
  if (!user) redirect("/login");
  if (user.role !== "warga") redirect(user.role === "pusat" ? "/dashboard/pusat" : user.role === "admin_pemda" ? "/dashboard/pemda" : user.role === "petugas_pos" ? "/dashboard/pos" : "/dashboard");
  return <div className="dashboard-theme min-h-screen"><Navbar user={user} /><main className="px-4 py-8 sm:px-6">
    <header className="mx-auto mb-8 max-w-3xl"><p className="eyebrow">Komunitas warga</p><h1 className="page-title mt-2 text-3xl font-bold text-slate-50 sm:text-4xl">Ruang Warga</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Lihat laporan yang dibagikan warga dan ikut berdiskusi dengan saling menghormati.</p></header>
    <CommunityFeed />
  </main></div>;
}
