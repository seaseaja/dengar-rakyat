import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/session.service";
import LogoutButton from "@/components/auth/LogoutButton";
import Logo from "@/components/ui/Logo";

const ROLE_LABEL: Record<string, string> = {
  warga: "Warga",
  petugas_pos: "Petugas Pos Kecamatan",
  admin_pemda: "Admin Pemda",
  pusat: "Pusat",
};

const SOON = [
  ["Buat Laporan", "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6"],
  ["Laporan Saya", "M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"],
  ["Tracking Status", "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4"],
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      <header className="glass flex items-center justify-between rounded-2xl px-5 py-3">
        <div className="flex items-center gap-3 font-bold text-white">
          <Logo size={36} />
          Dengar Rakyat!
        </div>
        <LogoutButton />
      </header>

      <section className="brand-panel relative overflow-hidden rounded-3xl border border-blue-400/20 p-8 text-white shadow-2xl shadow-blue-950/50">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-400/15 blur-2xl" />
        <div className="relative space-y-3">
          <p className="text-sm text-blue-100/70">Selamat datang kembali</p>
          <h1 className="text-3xl font-bold">Halo, {user.nama}</h1>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
              {ROLE_LABEL[user.role] ?? user.role}
            </span>
            {user.wilayah_nama && (
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                {user.wilayah_nama}
              </span>
            )}
          </div>
          <Link
            href="/profile"
            className="inline-block pt-2 text-sm font-medium text-sky-300 underline underline-offset-4"
          >
            Lihat profil &amp; ubah password
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {SOON.map(([judul, d]) => (
          <div key={judul} className="glass space-y-3 rounded-2xl p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-400/30">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="#7dd3fc"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={d} />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-white">{judul}</p>
              <p className="text-xs text-slate-400">Segera hadir</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}