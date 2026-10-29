import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { changePassword } from "@/features/auth/password.service";
import { serverError } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }
    const { newPassword } = await req.json();
    const result = await changePassword(user.id, newPassword);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({ message: result.message });
  } catch (err) {
    return serverError(err);
  }
}