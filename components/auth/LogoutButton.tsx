"use client";

import { useRouter } from "next/navigation";
import { postJson } from "@/lib/api-client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await postJson("/api/auth/logout", {});
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl border border-sky-400/25 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
    >
      Keluar
    </button>
  );
}