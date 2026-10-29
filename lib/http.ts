import { NextResponse } from "next/server";

export function serverError(err: unknown) {
  const e = err as Error;
  return NextResponse.json({ error: e.message, stack: e.stack }, { status: 500 });
}