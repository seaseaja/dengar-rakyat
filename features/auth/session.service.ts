/**
 * Session Management Service - Iterasi 2 H3 Complete
 * - Session regeneration (fixation prevention)
 * - Idle timeout (30 minutes of inactivity)
 * - Absolute timeout (24 hours max, even if active)
 * - Secure session handling
 */

import crypto from "crypto";
import {
  insertSession,
  findSessionById,
  updateSessionActivity,
  deleteSession,
  deleteAllUserSessions,
} from "./auth.queries";
import type { User } from "./auth.types";

const ABSOLUTE_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 hours
const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Create new session for user
 */
export async function createSession(userId: number): Promise<string> {
  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + ABSOLUTE_TIMEOUT_MS);

  await insertSession(userId, sessionId, expiresAt);
  return sessionId;
}

/**
 * Regenerate session ID (call after login/privilege escalation)
 * Prevents session fixation attack
 */
export async function regenerateSession(oldSessionId: string): Promise<string | null> {
  const session = await findSessionById(oldSessionId);
  if (!session) return null;

  // Delete old session
  await deleteSession(oldSessionId);

  // Create new session with same user
  const newSessionId = await createSession(session.user_id);
  return newSessionId;
}

/**
 * Validate session and check timeouts
 * Checks:
 * 1. Session exists
 * 2. Absolute timeout (expires_at)
 * 3. Idle timeout (last_activity_at)
 */
export async function validateSession(sessionId: string): Promise<{
  valid: boolean;
  user: User | null;
  reason?: "not_found" | "absolute_timeout" | "idle_timeout";
}> {
  if (!sessionId) {
    return { valid: false, user: null, reason: "not_found" };
  }

  const session = await findSessionById(sessionId);
  if (!session) {
    return { valid: false, user: null, reason: "not_found" };
  }

  const now = Date.now();

  // Check absolute timeout (expires_at)
  if (new Date(session.expires_at).getTime() < now) {
    await deleteSession(sessionId);
    return { valid: false, user: null, reason: "absolute_timeout" };
  }

  // Check idle timeout (last_activity_at)
  const lastActivity = new Date(session.last_activity_at).getTime();
  if (now - lastActivity > IDLE_TIMEOUT_MS) {
    await deleteSession(sessionId);
    return { valid: false, user: null, reason: "idle_timeout" };
  }

  // Valid session - update activity timestamp
  await updateSessionActivity(sessionId);

  // Return user info from session
  return { 
    valid: true, 
    user: {
      id: session.user_id,
      email: session.email,
      nama: session.nama,
      role: session.role,
      wilayah_id: session.wilayah_id,
      nik: null, // Never expose NIK in session
      alamat: null,
      created_at: null,
      updated_at: null,
    },
  };
}

/**
 * Destroy session (logout)
 */
export async function destroySession(sessionId: string): Promise<void> {
  await deleteSession(sessionId);
}

/**
 * Destroy all user sessions (password reset, security breach)
 */
export async function destroyAllUserSessions(userId: number): Promise<void> {
  await deleteAllUserSessions(userId);
}

/**
 * Get session with user info (for audit logging)
 */
export async function getSessionWithUser(sessionId: string): Promise<{
  user_id: number;
  email: string;
  role: string;
} | null> {
  const session = await findSessionById(sessionId);
  if (!session) return null;

  return {
    user_id: session.user_id,
    email: session.email,
    role: session.role,
  };
}

/**
 * Get current user from session (convenience wrapper)
 */
export async function getCurrentUser(sessionId?: string): Promise<User | null> {
  if (!sessionId) return null;
  
  const result = await validateSession(sessionId);
  return result.user;
}
