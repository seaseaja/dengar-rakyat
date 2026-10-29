import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { findLaporanById } from "@/features/laporan/laporan.queries";
import { serverError } from "@/lib/http";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }

    const { id } = await params;
    const laporan = await findLaporanById(id);

    if (!laporan) {
      return NextResponse.json({ error: "Laporan tidak ditemukan" }, { status: 404 });
    }

    // Sengaja TANPA cek laporan.user_id === user.id — celah IDOR (A01)
    return NextResponse.json(laporan);
  } catch (err) {
    return serverError(err);
  }
}