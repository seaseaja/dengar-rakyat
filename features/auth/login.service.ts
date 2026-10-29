import {
  findUserByCredentials,
  findUserByEmail,
  insertSession,
} from "./auth.queries";
import type { ServiceResult, User } from "./auth.types";

export async function loginUser(
  email: string,
  password: string
): Promise<ServiceResult<{ user: User; sessionId: number }>> {
  if (!email || !password) {
    return { ok: false, status: 400, error: "Email dan password wajib diisi" };
  }

  const byEmail = await findUserByEmail(email);
  if (byEmail.length === 0) {
    return { ok: false, status: 404, error: "Email tidak terdaftar" };
  }

  const users = await findUserByCredentials(email, password);
  if (users.length === 0) {
    return { ok: false, status: 401, error: "Password salah" };
  }

  const user = users[0];
  const sessionId = await insertSession(user.id);
  return { ok: true, user, sessionId };
}