import { NextResponse } from "next/server";
import { registerUser } from "@/features/auth/register.service";
import { serverError } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerUser(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json(
      { message: "Registrasi berhasil", user: result.user },
      { status: 201 }
    );
  } catch (err) {
    return serverError(err);
  }
}