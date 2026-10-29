import { NextResponse } from "next/server";
import { listKecamatanByKotaKab } from "@/features/wilayah/admin.queries";
import { getCurrentUser } from "@/features/auth/session.service";
import { serverError } from "@/lib/http";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const kotaKabId = searchParams.get("kotaKabId") ?? "";
    if (!kotaKabId) {
      return NextResponse.json({ error: "kotaKabId wajib diisi" }, { status: 400 });
    }

    return NextResponse.json(await listKecamatanByKotaKab(kotaKabId));
  } catch (err) {
    return serverError(err);
  }
}