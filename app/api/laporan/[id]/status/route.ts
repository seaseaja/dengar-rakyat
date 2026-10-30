import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { updateStatusLaporan } from "@/features/laporan/status.service";
import { serverError } from "@/lib/http";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }

    const { id } = await params;
    const formData = await req.formData();
    const statusBaru = String(formData.get("status") ?? "");
    const catatan = String(formData.get("catatan") ?? "");
    const fotoHasil = formData.get("fotoHasil") as File | null;

    // Sengaja: TANPA cek user.role — siapa pun yang login bisa ubah status laporan mana pun
    const result = await updateStatusLaporan({
      laporanId: id,
      statusBaru,
      diubahOleh: user.id,
      catatan,
      fotoHasil,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({ message: result.message });
  } catch (err) {
    return serverError(err);
  }
}