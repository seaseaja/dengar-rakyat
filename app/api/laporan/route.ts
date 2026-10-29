import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { createLaporan } from "@/features/laporan/laporan.service";
import { findLaporanByUser, findAllLaporan } from "@/features/laporan/laporan.queries";
import { serverError } from "@/lib/http";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine");

    if (mine) {
      return NextResponse.json(await findLaporanByUser(user.id));
    }

    // Sengaja: siapa pun yang login bisa minta SEMUA laporan, tanpa cek role
    return NextResponse.json(await findAllLaporan());
  } catch (err) {
    return serverError(err);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }

    const formData = await req.formData();
    const judul = String(formData.get("judul") ?? "");
    const deskripsi = String(formData.get("deskripsi") ?? "");
    const kategori = String(formData.get("kategori") ?? "");
    const latitude = formData.get("latitude") as string | null;
    const longitude = formData.get("longitude") as string | null;
    const file = formData.get("foto") as File | null;

    const result = await createLaporan({
      userId: user.id,
      wilayahId: user.wilayah_id,
      judul,
      deskripsi,
      kategori,
      latitude,
      longitude,
      file,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({ message: "Laporan berhasil dikirim", id: result.id }, { status: 201 });
  } catch (err) {
    return serverError(err);
  }
}