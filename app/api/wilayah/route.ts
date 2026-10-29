import { NextResponse } from "next/server";
import { listWilayah } from "@/features/wilayah/wilayah.queries";
import { serverError } from "@/lib/http";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tipe = searchParams.get("tipe") ?? "provinsi";
    const parentId = searchParams.get("parent_id") ?? undefined;
    return NextResponse.json(await listWilayah(tipe, parentId));
  } catch (err) {
    return serverError(err);
  }
}
