import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { changePassword } from "@/features/auth/password.service";
import { serverError } from "@/lib/http";
import { cookies } from "next/headers";
import { validateCsrfToken } from "@/lib/csrf";
import { getSessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/cookies";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }
    const sessionId = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId || !validateCsrfToken(req.headers.get("x-csrf-token") || "", sessionId).valid) {
      return NextResponse.json({ error: "CSRF token tidak valid" }, { status: 403 });
    }
    const body = await req.json();
    const currentPassword = body?.currentPassword || body?.passwordLama;
    const newPassword = body?.newPassword || body?.passwordBaru || body?.password;
    if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
      return NextResponse.json({ error: "Password lama dan baru wajib diisi" }, { status: 400 });
    }

    const result = await changePassword(user.id, currentPassword, newPassword, user.email.split("@")[0]);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    const response = NextResponse.json({ message: result.message });
    if (result.sessionId) response.cookies.set(SESSION_COOKIE_NAME, result.sessionId, getSessionCookieOptions());
    return response;
  } catch (err) {
    return serverError(err);
  }
}
