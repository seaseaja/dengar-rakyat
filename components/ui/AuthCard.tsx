import { ReactNode } from "react";
import Logo from "@/components/ui/Logo";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const STEPS = [
  ["Lapor", "Foto + lokasi GPS langsung dari lapangan"],
  ["Dilacak", "Pantau status laporanmu secara real-time"],
  ["Ditindaklanjuti", "Dari Pos Kecamatan hingga Pemda"],
];

export default function AuthCard({ title, subtitle, children }: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="glass grid w-full max-w-4xl overflow-hidden rounded-3xl md:grid-cols-2">
        <aside className="brand-panel relative hidden flex-col justify-between overflow-hidden p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/10 blur-2xl" />
          <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-sky-400/10 blur-2xl" />

          <div className="relative flex items-center gap-3 text-lg font-bold">
            <Logo />
            Dengar Rakyat!
          </div>

          <div className="relative space-y-8">
            <h2 className="text-3xl font-bold leading-tight">
              Suara warga,
              <br />
              <span className="text-sky-300">langsung didengar.</span>
            </h2>
            <ul className="space-y-5">
              {STEPS.map(([judul, desk], i) => (
                <li key={judul} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{judul}</p>
                    <p className="text-sm text-blue-100/70">{desk}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="relative text-xs text-blue-100/60">
            Lapor, dilacak, ditindaklanjuti.
          </p>
        </aside>

        <section className="space-y-6 p-8 sm:p-10">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}