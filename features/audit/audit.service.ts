/**
 * Audit Service - Iterasi 3 P1 Complete
 * Tamper-proof audit logging dengan hash chain
 * WITH transaction and row-level locking (race condition prevention)
 */

import crypto from "crypto";
import { query } from "@/lib/db";
import {
  insertAuditLog,
  queryAuditLogs,
  verifyHashChain,
} from "./audit.queries";
import type { AuditLogEntry, AuditQuery, AuditLogRecord } from "./audit.types";

/**
 * Log audit event (main function)
 * WITH transaction and row-level locking to prevent race conditions
 * 
 * @param entry Audit log entry
 * @returns Log ID
 */
export async function logAudit(entry: AuditLogEntry): Promise<number> {
  try {
    // START TRANSACTION with row-level lock
    // This prevents race condition when 2 logs are inserted simultaneously
    await query("START TRANSACTION");

    try {
      // Get last log for hash chain WITH LOCK (SELECT ... FOR UPDATE)
      // This locks the row until transaction commits
      const lastLogResult = await query(
        `SELECT * FROM audit_logs ORDER BY id DESC LIMIT 1 FOR UPDATE`
      );
      
      const lastLog = lastLogResult.rows[0] as AuditLogRecord | undefined;

      // Generate hash for this entry
      const previousHash = lastLog?.current_hash || null;
      const currentHash = generateHash(entry, previousHash);

      // Insert to database
      const logId = await insertAuditLog({
        ...entry,
        previous_hash: previousHash,
        current_hash: currentHash,
      });

      // COMMIT TRANSACTION
      await query("COMMIT");

      return logId;
    } catch (error) {
      // ROLLBACK on error
      await query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    // CRITICAL: Audit logging failure
    console.error("[AUDIT] Failed to log event:", error);
    console.error("[AUDIT] Event:", entry);
    
    // Don't throw - we don't want audit failure to break app
    // But log to stderr for monitoring
    return -1;
  }
}

/**
 * Generate hash for audit log entry
 * Hash = SHA256(entry + previousHash)
 */
function generateHash(
  entry: AuditLogEntry,
  previousHash: string | null
): string {
  const data = JSON.stringify({
    event_type: entry.event_type,
    event_category: entry.event_category,
    action: entry.action,
    user_id: entry.user_id,
    user_email: entry.user_email,
    target_type: entry.target_type,
    target_id: entry.target_id,
    status: entry.status,
    metadata: entry.metadata,
    previous_hash: previousHash,
    timestamp: Date.now(), // Include current time
  });

  return crypto.createHash("sha256").update(data).digest("hex");
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
}> {
  const broken = await verifyHashChain();
  return {
    valid: broken.length === 0,
    brokenLinks: broken,
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
    status: "warning",
    metadata: params.metadata,
  });
}
