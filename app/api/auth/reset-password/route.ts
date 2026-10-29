import { NextResponse } from "next/server";
import { resetPassword } from "@/features/auth/password.service";
import { serverError } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();
    const result = await resetPassword(token, newPassword);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({ message: result.message });
  } catch (err) {
    return serverError(err);
  }
}