import { NextResponse } from "next/server";
import { countStatusNasional } from "@/features/laporan/laporan.queries";
import { getCurrentUser } from "@/features/auth/session.service";
import { serverError } from "@/lib/http";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }
    // Sengaja: endpoint "nasional" ini bisa dipanggil role apa pun, bukan cuma Pusat
    return NextResponse.json(await countStatusNasional());
  } catch (err) {
    return serverError(err);
  }
}