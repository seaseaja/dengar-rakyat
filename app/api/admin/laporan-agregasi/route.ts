import { NextResponse } from "next/server";
import { countStatusByKotaKab } from "@/features/laporan/laporan.queries";
import { getCurrentUser } from "@/features/auth/session.service";
import { serverError } from "@/lib/http";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }

    const role = (user.role || "").toLowerCase();
    if (!["pusat", "admin_pemda", "pemda"].includes(role)) {
      return NextResponse.json(
        { error: "Akses ditolak: Hanya Pemda dan Pusat yang dapat mengakses data agregasi" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const kotaKabIdParam = searchParams.get("kotaKabId") ?? "";
    if (!kotaKabIdParam) {
      return NextResponse.json({ error: "kotaKabId wajib diisi" }, { status: 400 });
    }

    const kotaKabId = Number.parseInt(kotaKabIdParam, 10);
    if (Number.isNaN(kotaKabId)) {
      return NextResponse.json({ error: "kotaKabId harus berupa angka valid" }, { status: 400 });
    }

    // IDOR Protection: Admin Pemda hanya boleh mengakses wilayah hukumnya sendiri
    if ((role === "admin_pemda" || role === "pemda") && user.wilayah_id !== kotaKabId) {
      return NextResponse.json(
        { error: "Akses terlarang: Anda tidak memiliki wewenang melihat data agregasi kota/kabupaten lain (IDOR Protected)" },
        { status: 403 }
      );
    }

    const result = await countStatusByKotaKab(kotaKabId);
    return NextResponse.json(result);
  } catch (err) {
    return serverError(err);
  }
}
