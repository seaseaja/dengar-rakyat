/**
 * Auth Queries - Iterasi 2 H2 Hardened
 * - Parameterized queries (SQL injection prevention)
 * - Uses nik_hash for lookups (encrypted data)
 * - Timing-safe operations
 */

import { pool, query } from "@/lib/db";
import { hmacHash } from "@/lib/crypto";
import type { RegisterInput, Role, User } from "./auth.types";

/**
 * Find user by email (parameterized)
 */
export async function findUserByEmail(email: string) {
  const r = await query("SELECT * FROM users WHERE email = ?", [email]);
  return r.rows as User[];
}

/**
 * Find user by NIK (uses nik_hash for lookup)
 */
export async function findUserByNik(nik: string) {
  const nikHash = hmacHash(nik);
  const r = await query("SELECT * FROM users WHERE nik_hash = ?", [nikHash]);
  return r.rows as User[];
}

/**
 * Insert new user with encrypted PII (H2 hardened)
 * @param input User data (plaintext)
 * @param passwordHash Argon2id hash
 * @param nikEnc AES-256-GCM encrypted NIK
 * @param nikHash HMAC-SHA256 hash for indexing
 * @param alamatEnc AES-256-GCM encrypted alamat
 */
export async function insertUser(
  input: RegisterInput & { role: Role },
  passwordHash: string,
  nikEnc: string,
  nikHash: string,
  alamatEnc: string
) {
  const { nama, email, wilayah_id, role } = input;
  
  await query(
    `INSERT INTO users (nik_enc, nik_hash, nama, email, alamat_enc, wilayah_id, password, role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nikEnc, nikHash, nama, email, alamatEnc, wilayah_id, passwordHash, role]
  );

  // Get inserted user
  const r = await query("SELECT id, email, role FROM users WHERE email = ?", [email]);
  return r.rows[0] as { id: number; email: string; role: string };
}

/**
 * Insert session with random ID (H3 will update this)
 */
export async function insertSession(userId: number, sessionId: string, expiresAt: Date) {
  await query(
    "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)",
    [sessionId, userId, expiresAt]
  );
  return sessionId;
}

/**
 * Find user by session ID (parameterized)
 */
export async function findUserBySessionId(sessionId: string) {
  const r = await query(
    `SELECT u.*, w.nama AS wilayah_nama
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     LEFT JOIN wilayah w ON w.id = u.wilayah_id
     WHERE s.id = ? AND s.expires_at > NOW()`,
    [sessionId]
  );
  return (r.rows[0] as User) ?? null;
}

/**
 * Update session activity timestamp (for idle timeout)
 */
export async function updateSessionActivity(sessionId: string) {
  await query(
    "UPDATE sessions SET last_activity_at = NOW() WHERE id = ?",
    [sessionId]
  );
}

/**
 * Delete session (logout)
 */
export async function deleteSession(sessionId: string) {
  await query("DELETE FROM sessions WHERE id = ?", [sessionId]);
}

/**
 * Delete all user sessions (force logout)
 */
export async function deleteAllUserSessions(userId: number) {
  await query("DELETE FROM sessions WHERE user_id = ?", [userId]);
}

/**
 * Insert password reset token (hashed)
 */
export async function insertResetToken(
  userId: number,
  tokenHash: string,
  expiresAt: Date
) {
  await query(
    "INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
    [userId, tokenHash, expiresAt]
  );
}

/**
 * Find reset token by hash
 */
export async function findResetToken(tokenHash: string) {
  const r = await query(
    `SELECT * FROM password_resets 
     WHERE token_hash = ? 
     AND expires_at > NOW() 
     AND used_at IS NULL`,
    [tokenHash]
  );
  return r.rows as { id: number; user_id: number; token_hash: string; expires_at: Date }[];
}

/**
 * Mark reset token as used
 */
/**
 * Update user password (accepts Argon2id hash)
 */
export async function updatePasswordAndRotateSessions(
  userId: number, oldHash: string, newHash: string, newSessionId: string, expiresAt: Date
): Promise<boolean> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [updated] = await connection.execute(
      "UPDATE users SET password=? WHERE id=? AND password=?",
      [newHash, userId, oldHash]
    );
    if ((updated as { affectedRows: number }).affectedRows !== 1) { await connection.rollback(); return false; }
    await connection.execute("DELETE FROM sessions WHERE user_id=?", [userId]);
    await connection.execute("INSERT INTO sessions(id,user_id,expires_at) VALUES(?,?,?)", [newSessionId, userId, expiresAt]);
    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback().catch(() => undefined);
    throw error;
  } finally { connection.release(); }
}

/** Consume a reset token and change password atomically; concurrent replays lose. */
export async function consumePasswordReset(tokenHash: string, passwordHash: string): Promise<number | null> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      "SELECT id, user_id FROM password_resets WHERE token_hash=? AND expires_at>NOW() AND used_at IS NULL FOR UPDATE",
      [tokenHash]
    );
    const token = (rows as Array<{ id: number; user_id: number }>)[0];
    if (!token) { await connection.rollback(); return null; }
    await connection.execute("UPDATE users SET password=? WHERE id=?", [passwordHash, token.user_id]);
    const [updated] = await connection.execute("UPDATE password_resets SET used_at=NOW() WHERE id=? AND used_at IS NULL", [token.id]);
    if ((updated as { affectedRows: number }).affectedRows !== 1) { await connection.rollback(); return null; }
    await connection.execute("DELETE FROM sessions WHERE user_id=?", [token.user_id]);
    await connection.commit();
    return token.user_id;
  } catch (error) {
    await connection.rollback().catch(() => undefined);
    throw error;
  } finally { connection.release(); }
}


/**
 * Find session by ID with user info (for idle/absolute timeout check)
 */
export async function findSessionById(sessionId: string) {
  const r = await query(
    `SELECT 
      s.id, s.user_id, s.expires_at, s.last_activity_at,
      u.email, u.nama, u.role, u.wilayah_id, w.nama AS wilayah_nama
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     LEFT JOIN wilayah w ON w.id = u.wilayah_id
     WHERE s.id = ?`,
    [sessionId]
  );
  return r.rows[0] as {
    id: string;
    user_id: number;
    expires_at: Date;
    last_activity_at: Date;
    email: string;
    nama: string;
    role: string;
    wilayah_id: number;
  } | undefined;
}
