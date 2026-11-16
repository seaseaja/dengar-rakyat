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
    if ((user.role || "").toLowerCase() !== "pusat") {
      return NextResponse.json({ error: "Akses khusus Pemerintah Pusat" }, { status: 403 });
    }
    return NextResponse.json(await countStatusNasional());
  } catch (err) {
    return serverError(err);
  }
}
