import {
  findResetToken,
  findUserByEmail,
  insertResetToken,
  updatePassword,
} from "./auth.queries";
import type { ServiceResult } from "./auth.types";

export async function requestPasswordReset(
  email: string
): Promise<ServiceResult<{ message: string }>> {
  if (!email) return { ok: false, status: 400, error: "Email wajib diisi" };

  const users = await findUserByEmail(email);
  if (users.length === 0) {
    return { ok: false, status: 404, error: "Email tidak terdaftar" };
  }

  const user = users[0];
  const token = String(Math.floor(100000 + Math.random() * 900000));
  await insertResetToken(user.id, token);

  // Simulasi email (localhost tidak punya SMTP): link muncul di terminal
  console.log(
    `[DEV MAILER] Ke: ${user.email} | http://localhost:3000/reset-password?token=${token}`
  );

  return {
    ok: true,
    message: `Link reset password telah dikirim ke ${user.email} (atas nama ${user.nama})`,
  };
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<ServiceResult<{ message: string }>> {
  if (!token || !newPassword) {
    return { ok: false, status: 400, error: "Token dan password baru wajib diisi" };
  }

  const rows = await findResetToken(token);
  if (rows.length === 0) {
    return { ok: false, status: 400, error: "Token tidak valid" };
  }

  await updatePassword(rows[0].user_id, newPassword);
  return { ok: true, message: "Password berhasil diubah" };
}

export async function changePassword(
  userId: number,
  newPassword: string
): Promise<ServiceResult<{ message: string }>> {
  if (!newPassword) {
    return { ok: false, status: 400, error: "Password baru wajib diisi" };
  }
  await updatePassword(userId, newPassword);
  return { ok: true, message: "Password berhasil diubah" };
}