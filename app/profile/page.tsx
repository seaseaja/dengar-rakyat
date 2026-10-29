import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/session.service";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const rows = [
    ["Nama", user.nama],
    ["Email", user.email],
    ["NIK", user.nik],
    ["Alamat", user.alamat],
    ["Wilayah", user.wilayah_nama ?? "-"],
  ];

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <Link href="/dashboard" className="text-sm font-medium text-sky-400">
        &larr; Kembali ke dashboard
      </Link>

      <section className="glass space-y-5 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-800 text-2xl font-bold text-white ring-1 ring-white/20">
            {user.nama.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{user.nama}</h1>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        </div>

        <dl className="divide-y divide-white/10 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex gap-4 py-2.5">
              <dt className="w-24 shrink-0 text-slate-400">{label}</dt>
              <dd className="text-slate-100">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="glass space-y-4 rounded-3xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">Ubah Password</h2>
        <ChangePasswordForm />
      </section>
    </main>
  );
}