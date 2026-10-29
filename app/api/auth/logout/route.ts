import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/features/auth/session.service";

export async function POST() {
  await clearSessionCookie();
  return NextResponse.json({ message: "Logout berhasil" });
}