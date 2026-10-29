import { NextResponse } from "next/server";
import { requestPasswordReset } from "@/features/auth/password.service";
import { serverError } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const result = await requestPasswordReset(email);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({ message: result.message });
  } catch (err) {
    return serverError(err);
  }
}