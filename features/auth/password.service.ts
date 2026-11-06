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
import { validatePassword } from "@/lib/password-policy";
import { checkRateLimit, RateLimits } from "@/lib/rate-limiter";
import {
  findUserByEmail,
  insertResetToken,
  findResetToken,
  markTokenUsed,
  updatePassword,
  deleteAllUserSessions,
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
): Promise<ServiceResult<{ token?: string }>> {
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
  const genericResponse = {
    ok: true,
    message: "Jika email terdaftar, link reset password telah dikirim",
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

    // In real app: send email with plainToken
    // For now, return token (for testing)
    return {
      ...genericResponse,
      token: plainToken, // Only for testing, remove in production
    };
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
): Promise<ServiceResult<{}>> {
  if (!token || !newPassword) {
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

    const resetEntry = tokens[0];

    // Hash new password
    const passwordHash = await argon2.hash(newPassword, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    // Update password
    await updatePassword(resetEntry.user_id, passwordHash);

    // Mark token as used (prevent reuse)
    await markTokenUsed(tokenHash);

    // Invalidate all user sessions (force re-login)
    await deleteAllUserSessions(resetEntry.user_id);

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
 * @param currentPassword Current password
 * @param newPassword New password
 */
export async function changePassword(
  userId: number,
  currentPassword: string,
  newPassword: string
): Promise<ServiceResult<{}>> {
  // Password policy validation
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.valid) {
    return {
      ok: false,
      status: 400,
      error: passwordValidation.errors.join(", "),
    };
  }

  // TODO: Implement (verify current password, update)
  // Placeholder for H5/H6
  return {
    ok: false,
    status: 501,
    error: "Not implemented yet",
  };
}
