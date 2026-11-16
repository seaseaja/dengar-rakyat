/**
 * Password Reset Service - Iterasi 2 H4
 * - Token hashing (SHA-256)
 * - Token expiry (15 minutes)
 * - Single-use token
 * - Rate limiting
 * - Generic responses (no email disclosure)
 */

import crypto from "crypto";
import argon2 from "argon2";
import { query } from "@/lib/db";
import { validatePassword } from "@/lib/password-policy";
import { checkRateLimit, RateLimits } from "@/lib/rate-limiter";
import {
  findUserByEmail,
  insertResetToken,
  findResetToken,
  consumePasswordReset,
  updatePasswordAndRotateSessions,
} from "./auth.queries";
import type { ServiceResult } from "./auth.types";

const TOKEN_EXPIRY_MINUTES = 15;

/**
 * Request password reset (send email with token)
 * @param email User email
 * @returns Generic response (don't reveal if email exists)
 */
export async function requestPasswordReset(
  email: string
): Promise<ServiceResult<{ message: string }>> {
  // Rate limit check
  const rateLimit = checkRateLimit(
    `password-reset:${email}`,
    RateLimits.PASSWORD_RESET.maxAttempts,
    RateLimits.PASSWORD_RESET.windowMs
  );

  if (!rateLimit.allowed) {
    const minutesLeft = Math.ceil((rateLimit.resetAt - Date.now()) / 60000);
    return {
      ok: false,
      status: 429,
      error: `Terlalu banyak percobaan. Coba lagi dalam ${minutesLeft} menit`,
    };
  }

  // Always return generic response (timing-safe)
  const genericResponse: ServiceResult<{ message: string }> = {
    ok: true,
    message: "Jika email terdaftar, instruksi reset akan dikirim setelah layanan email tersedia",
  };

  try {
    // Find user
    const users = await findUserByEmail(email);

    if (users.length === 0) {
      // User not found, but return success (don't reveal)
      // Fake delay to match timing
      await new Promise((resolve) => setTimeout(resolve, 100));
      return genericResponse;
    }

    const user = users[0];

    // Generate random token
    const plainToken = crypto.randomBytes(32).toString("hex"); // 64 char

    // Hash token before storing
    const tokenHash = crypto.createHash("sha256").update(plainToken).digest("hex");

    // Calculate expiry
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + TOKEN_EXPIRY_MINUTES);

    // Store hashed token
    await insertResetToken(user.id, tokenHash, expiresAt);

    // No email transport is configured yet; never return the raw reset token.
    return genericResponse;
  } catch (error) {
    console.error("Password reset request error:", error);
    // Still return generic response (don't leak error)
    return genericResponse;
  }
}

/**
 * Reset password with token
 * @param token Plain token from email
 * @param newPassword New password
 */
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<ServiceResult<{ message: string }>> {
  if (!token || !newPassword || token.length !== 64 || !/^[a-f0-9]{64}$/i.test(token) || newPassword.length > 128) {
    return { ok: false, status: 400, error: "Token dan password wajib diisi" };
  }

  // Validate password policy
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.valid) {
    return {
      ok: false,
      status: 400,
      error: passwordValidation.errors.join(", "),
    };
  }

  try {
    // Hash token to lookup
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // Find token (unexpired, unused)
    const tokens = await findResetToken(tokenHash);

    if (tokens.length === 0) {
      return {
        ok: false,
        status: 400,
        error: "Token tidak valid atau sudah expired",
      };
    }

    // Hash new password
    const passwordHash = await argon2.hash(newPassword, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    // Token consumption, password update, and session invalidation are atomic.
    const consumedUserId = await consumePasswordReset(tokenHash, passwordHash);
    if (!consumedUserId) return { ok: false, status: 400, error: "Token tidak valid atau sudah expired" };

    return {
      ok: true,
      message: "Password berhasil direset. Silakan login dengan password baru",
    };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      ok: false,
      status: 500,
      error: "Terjadi kesalahan saat reset password",
    };
  }
}

/**
 * Change password (authenticated user)
 * @param userId User ID
 * @param currentOrNewPassword Current password or new password
 * @param maybeNewPassword Optional new password if first argument is current
 */
export async function changePassword(
  userId: number,
  currentPassword: string,
  newPassword: string,
  username?: string
): Promise<ServiceResult<{ message: string; sessionId?: string }>> {
  if (!newPassword) {
    return { ok: false, status: 400, error: "Password baru wajib diisi" };
  }

  // Password policy validation
  if (newPassword.length > 128) return { ok: false, status: 400, error: "Password maksimal 128 karakter" };
  const passwordValidation = validatePassword(newPassword, {}, username);
  if (!passwordValidation.valid) {
    return {
      ok: false,
      status: 400,
      error: passwordValidation.errors.join(", "),
    };
  }

  try {
    const userRes = await query("SELECT password FROM users WHERE id = ?", [userId]);
    if (userRes.rows.length === 0) {
      return { ok: false, status: 404, error: "User tidak ditemukan" };
    }
    const valid = await argon2.verify(userRes.rows[0].password, currentPassword);
    if (!valid) {
      return { ok: false, status: 401, error: "Password lama salah" };
    }

    const passwordHash = await argon2.hash(newPassword, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    const sessionId = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const updated = await updatePasswordAndRotateSessions(userId, userRes.rows[0].password, passwordHash, sessionId, expiresAt);
    if (!updated) return { ok: false, status: 409, error: "Password berubah bersamaan. Muat ulang lalu coba lagi." };
    return {
      ok: true,
      message: "Password berhasil diubah",
      sessionId,
    };
  } catch (error) {
    console.error("Change password error:", error);
    return { ok: false, status: 500, error: "Gagal mengubah password" };
  }
}
