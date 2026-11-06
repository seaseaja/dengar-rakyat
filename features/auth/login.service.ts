/**
 * Login Service - Iterasi 2 H2-H3 Hardened
 * - Argon2id password verification
 * - Random session ID (crypto-safe)
 * - Timing-safe error messages
 */

import argon2 from "argon2";
import crypto from "crypto";
import { findUserByEmail, insertSession } from "./auth.queries";
import type { ServiceResult, User } from "./auth.types";

const SESSION_DURATION_HOURS = 24;

/**
 * Login user with Argon2id verification
 */
export async function loginUser(
  email: string,
  password: string
): Promise<ServiceResult<{ user: User; sessionId: string }>> {
  if (!email || !password) {
    return { ok: false, status: 400, error: "Email dan password wajib diisi" };
  }

  // Timing-safe: always query DB even if email format invalid
  const users = await findUserByEmail(email);
  
  // User not found
  if (users.length === 0) {
    // Timing-safe: fake hash verification to prevent timing attack
    await argon2.hash("dummy", { timeCost: 2, memoryCost: 19456 });
    return { ok: false, status: 401, error: "Email atau password salah" };
  }

  const user = users[0];

  // Verify password with Argon2id
  try {
    const isValid = await argon2.verify(user.password, password);
    
    if (!isValid) {
      return { ok: false, status: 401, error: "Email atau password salah" };
    }

    // Generate random session ID (64 characters hex)
    const sessionId = crypto.randomBytes(32).toString("hex");
    
    // Calculate expiry
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + SESSION_DURATION_HOURS);

    // Create session
    await insertSession(user.id, sessionId, expiresAt);

    return { ok: true, user, sessionId };
  } catch (error) {
    console.error("Login error:", error);
    return { ok: false, status: 500, error: "Terjadi kesalahan saat login" };
  }
}