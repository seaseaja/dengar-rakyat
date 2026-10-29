import { cookies } from "next/headers";
import { findUserBySessionId } from "./auth.queries";

const COOKIE_NAME = "session_id";

export async function setSessionCookie(sessionId: number) {
  const store = await cookies();
  store.set(COOKIE_NAME, String(sessionId));
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const store = await cookies();
  const sessionId = store.get(COOKIE_NAME)?.value;
  if (!sessionId) return null;
  return findUserBySessionId(sessionId);
}