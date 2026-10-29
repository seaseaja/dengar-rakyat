import { findUserByEmail, insertUser } from "./auth.queries";
import type { RegisterInput, ServiceResult } from "./auth.types";

export async function registerUser(
  input: RegisterInput
): Promise<ServiceResult<{ user: { id: number; email: string; role: string } }>> {
  const { nik, nama, email, alamat, wilayah_id, password } = input;

  if (!nik || !nama || !email || !alamat || !wilayah_id || !password) {
    return { ok: false, status: 400, error: "Semua field wajib diisi" };
  }

  const existing = await findUserByEmail(email);
  if (existing.length > 0) {
    return { ok: false, status: 409, error: "Email sudah terdaftar" };
  }

  const user = await insertUser({ ...input, role: input.role ?? "warga" });
  return { ok: true, user };
}