import { NextResponse } from "next/server";
import { loginUser } from "@/features/auth/login.service";
import { setSessionCookie } from "@/features/auth/session.service";
import { serverError } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const result = await loginUser(email, password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    await setSessionCookie(result.sessionId);
    return NextResponse.json({ message: "Login berhasil", user: result.user });
  } catch (err) {
    return serverError(err);
  }
}