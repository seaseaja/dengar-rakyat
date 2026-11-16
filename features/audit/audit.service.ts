/**
 * Audit Service - Iterasi 3 P1 Complete
 * Tamper-proof audit logging dengan hash chain
 * WITH transaction and row-level locking (race condition prevention)
 */

import { pool } from "@/lib/db";
import {
  insertAuditLog,
  queryAuditLogs,
  verifyHashChain,
} from "./audit.queries";
import type { AuditLogEntry, AuditQuery, AuditLogRecord } from "./audit.types";
import { generateAuditHash } from "./audit-hash";

/**
 * Log audit event (main function)
 * WITH transaction and row-level locking to prevent race conditions
 * 
 * @param entry Audit log entry
 * @returns Log ID
 */
export async function logAudit(entry: AuditLogEntry): Promise<number> {
  const connection = await pool.getConnection();
  let lockHeld = false;
  try {
    const [lockRows] = await connection.query("SELECT GET_LOCK(?, 5) AS acquired", ["dengar-rakyat-audit-chain"]);
    const lockResult = lockRows as Array<{ acquired: number | null }>;
    if (lockResult[0]?.acquired !== 1) throw new Error("Could not acquire audit-chain lock");
    lockHeld = true;
    await connection.beginTransaction();

    const [lastRows] = await connection.query("SELECT current_hash FROM audit_logs ORDER BY id DESC LIMIT 1 FOR UPDATE");
    const lastLog = (lastRows as Array<{ current_hash: string | null }>)[0];
    const previousHash = lastLog?.current_hash ?? null;
    const currentHash = generateAuditHash(entry, previousHash);
    const logId = await insertAuditLog(
      { ...entry, previous_hash: previousHash, current_hash: currentHash },
      async (sql, params) => {
        const [result] = await connection.execute(sql, params as (string | number | Buffer | Date | null)[]);
        return result as { insertId?: number };
      }
    );

    await connection.commit();
    return logId;
  } catch (error) {
    await connection.rollback().catch(() => undefined);
    // CRITICAL: Audit logging failure
    console.error("[AUDIT] Failed to log event:", error);
    // Don't throw - we don't want audit failure to break app
    // But log to stderr for monitoring
    return -1;
  } finally {
    if (lockHeld) {
      await connection.query("SELECT RELEASE_LOCK(?)", ["dengar-rakyat-audit-chain"]).catch(() => undefined);
    }
    connection.release();
  }
}

/**
 * Query audit logs
 */
export async function getAuditLogs(
  query: AuditQuery
): Promise<AuditLogRecord[]> {
  return queryAuditLogs(query);
}

/**
 * Verify hash chain integrity
 * Returns array of broken links (should be empty)
 */
export async function verifyAuditIntegrity(): Promise<{
  valid: boolean;
  brokenLinks: Array<{ id: number; expected: string; actual: string }>;
  legacyCount: number;
}> {
  const result = await verifyHashChain();
  return {
    valid: result.brokenLinks.length === 0 && result.legacyCount === 0,
    brokenLinks: result.brokenLinks,
    legacyCount: result.legacyCount,
  };
}

/**
 * Helper: Log auth events
 */
export async function logAuthEvent(params: {
  event_type: Extract<
    AuditLogEntry["event_type"],
    | "login_success"
    | "login_failure"
    | "logout"
    | "register"
    | "password_reset_request"
    | "password_reset_complete"
  >;
  user_id?: number;
  user_email?: string;
  user_role?: string;
  ip_address?: string;
  user_agent?: string;
  status: "success" | "failure";
  error_message?: string;
  metadata?: Record<string, any>;
}): Promise<number> {
  const actionMap = {
    login_success: "User logged in successfully",
    login_failure: "Failed login attempt",
    logout: "User logged out",
    register: "New user registered",
    password_reset_request: "Password reset requested",
    password_reset_complete: "Password reset completed",
  };

  return logAudit({
    event_type: params.event_type,
    event_category: "auth",
    action: actionMap[params.event_type],
    user_id: params.user_id,
    user_email: params.user_email,
    user_role: params.user_role,
    ip_address: params.ip_address,
    user_agent: params.user_agent,
    status: params.status,
    error_message: params.error_message,
    metadata: params.metadata,
  });
}

/**
 * Helper: Log data events
 */
export async function logDataEvent(params: {
  event_type: Extract<
    AuditLogEntry["event_type"],
    | "laporan_create"
    | "laporan_read"
    | "laporan_update"
    | "laporan_delete"
    | "status_update"
  >;
  user_id: number;
  user_email: string;
  user_role: string;
  target_type: string;
  target_id: string;
  ip_address?: string;
  metadata?: Record<string, any>;
}): Promise<number> {
  const actionMap = {
    laporan_create: "Created new laporan",
    laporan_read: "Viewed laporan",
    laporan_update: "Updated laporan",
    laporan_delete: "Deleted laporan",
    status_update: "Changed laporan status",
  };

  return logAudit({
    event_type: params.event_type,
    event_category: "data",
    action: actionMap[params.event_type],
    user_id: params.user_id,
    user_email: params.user_email,
    user_role: params.user_role,
    target_type: params.target_type,
    target_id: params.target_id,
    ip_address: params.ip_address,
    status: "success",
    metadata: params.metadata,
  });
}

/**
 * Helper: Log system events
 */
export async function logSystemEvent(params: {
  event_type: Extract<
    AuditLogEntry["event_type"],
    "rate_limit_exceeded" | "csrf_violation" | "invalid_token" | "permission_denied"
  >;
  user_id?: number;
  user_email?: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
}): Promise<number> {
  const actionMap = {
    rate_limit_exceeded: "Rate limit exceeded",
    csrf_violation: "CSRF token validation failed",
    invalid_token: "Invalid or expired token",
    permission_denied: "Access denied - insufficient permissions",
  };

  return logAudit({
    event_type: params.event_type,
    event_category: "system",
    action: actionMap[params.event_type],
    user_id: params.user_id,
    user_email: params.user_email,
    ip_address: params.ip_address,
    user_agent: params.user_agent,
    status: "failure",
    metadata: params.metadata,
  });
}
