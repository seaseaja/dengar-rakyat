import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/features/auth/session.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import Navbar from "@/components/layout/Navbar";

const QUICK_LINKS = [
  { href: "/laporan/baru", title: "Buat laporan", detail: "Sampaikan masalah atau aspirasi baru.", label: "01", icon: "plus", tone: "cyan" },
  { href: "/laporan", title: "Laporan saya", detail: "Lihat status dan riwayat tindak lanjut.", label: "02", icon: "document", tone: "sky" },
  { href: "/feed", title: "Ruang Warga", detail: "Baca dan komentari laporan yang dibagikan.", label: "03", icon: "chat", tone: "violet" },
  { href: "/profile", title: "Profil", detail: "Kelola informasi dan keamanan akun.", label: "04", icon: "user", tone: "amber" },
];

function QuickIcon({ name }: { name: string }) {
  const shared = { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "plus") return <svg {...shared}><path d="M12 5v14m-7-7h14" /></svg>;
  if (name === "document") return <svg {...shared}><path d="M7 3.75h7l4.25 4.5V20a.75.75 0 0 1-.75.75h-10.5A.75.75 0 0 1 6.25 20V4.5A.75.75 0 0 1 7 3.75Z" /><path d="M14 4v5h4m-9 4h6m-6 3h6" /></svg>;
  if (name === "chat") return <svg {...shared}><path d="M20.25 11.5a8.25 8.25 0 0 1-8.5 8.25 8.7 8.7 0 0 1-3.6-.78l-4.4 1.28 1.3-4.18A8.13 8.13 0 0 1 3.75 11.5a8.25 8.25 0 1 1 16.5 0Z" /></svg>;
  return <svg {...shared}><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(sessionId);
  if (!user) redirect("/login");

  if (user.role === "pusat") redirect("/dashboard/pusat");
  if (user.role === "admin_pemda") redirect("/dashboard/pemda");
  if (user.role === "petugas_pos") redirect("/dashboard/pos");
  if (user.role !== "warga") redirect("/login");

  return (
    <div className="dashboard-theme min-h-screen">
      <Navbar user={user} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="hero-surface relative mb-9 rounded-[1.75rem] border border-slate-700/60 bg-slate-950/45 p-6 shadow-xl shadow-black/20 sm:p-10">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <p className="eyebrow">Ruang warga</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium text-emerald-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Layanan aktif</span>
            </div>
            <h1 className="page-title text-3xl font-bold text-slate-50 sm:text-4xl">Selamat datang, <span className="text-cyan-200">{user.nama}</span></h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Sampaikan aspirasi dan pantau tindak lanjut laporan Anda.
              {user.wilayah_nama ? ` Wilayah: ${user.wilayah_nama}.` : ""}
            </p>
          </div>
          <div className="relative z-10 mt-7 flex items-center gap-3 text-xs text-slate-400 sm:mt-8">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">✓</span>
            <span>Setiap laporan dapat dipantau sampai tindak lanjut selesai.</span>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="eyebrow mb-1.5">Mulai dari sini</p><h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">Akses cepat</h2></div>
            <span className="hidden text-xs text-slate-500 sm:block">Layanan warga dalam satu tempat</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {QUICK_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className={`quick-card surface-card group rounded-2xl border border-slate-700/60 bg-slate-950/45 p-5 sm:p-6 quick-card-${item.tone}`}>
                <div className="mb-7 flex items-center justify-between">
                  <span className="quick-icon flex h-11 w-11 items-center justify-center rounded-xl"><QuickIcon name={item.icon} /></span>
                  <span className="text-xs font-semibold tracking-[.16em] text-slate-600">{item.label}</span>
                </div>
                <h3 className="font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-1.5 min-h-10 text-sm leading-5 text-slate-400">{item.detail}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-cyan-200 transition-all group-hover:gap-3">Buka layanan <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
