import { NextResponse } from "next/server";
import { listKotaKabWithAdmin } from "@/features/wilayah/admin.queries";
import { getCurrentUser } from "@/features/auth/session.service";
import { serverError } from "@/lib/http";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }

    return NextResponse.json(await listKotaKabWithAdmin());
  } catch (err) {
    return serverError(err);
  }
}