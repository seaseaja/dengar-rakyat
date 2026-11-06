/**
 * Audit Queries - Iterasi 3 P1
 * Database operations untuk audit logs
 */

import { query } from "@/lib/db";
import type { AuditLogEntry, AuditQuery, AuditLogRecord } from "./audit.types";

/**
 * Insert audit log entry
 */
export async function insertAuditLog(
  entry: AuditLogEntry & { previous_hash: string | null; current_hash: string }
): Promise<number> {
  const result = await query(
    `INSERT INTO audit_logs (
      event_type, event_category, action,
      user_id, user_email, user_role,
      target_type, target_id,
      ip_address, user_agent, request_id,
      metadata,
      previous_hash, current_hash,
      status, error_message
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      entry.event_type,
      entry.event_category,
      entry.action,
      entry.user_id || null,
      entry.user_email || null,
      entry.user_role || null,
      entry.target_type || null,
      entry.target_id || null,
      entry.ip_address || null,
      entry.user_agent || null,
      entry.request_id || null,
      entry.metadata ? JSON.stringify(entry.metadata) : null,
      entry.previous_hash,
      entry.current_hash,
      entry.status,
      entry.error_message || null,
    ]
  );

  // Get inserted ID
  const idResult = await query("SELECT LAST_INSERT_ID() as id");
  return idResult.rows[0].id as number;
}

/**
 * Get last audit log (for hash chain)
 */
export async function getLastAuditLog(): Promise<AuditLogRecord | null> {
  const result = await query(
    `SELECT * FROM audit_logs ORDER BY id DESC LIMIT 1`
  );

  if (result.rows.length === 0) return null;

  return result.rows[0] as AuditLogRecord;
}

/**
 * Query audit logs dengan filter
 */
export async function queryAuditLogs(
  filter: AuditQuery
): Promise<AuditLogRecord[]> {
  const conditions: string[] = [];
  const params: any[] = [];

  if (filter.event_type) {
    conditions.push("event_type = ?");
    params.push(filter.event_type);
  }

  if (filter.event_category) {
    conditions.push("event_category = ?");
    params.push(filter.event_category);
  }

  if (filter.user_id) {
    conditions.push("user_id = ?");
    params.push(filter.user_id);
  }

  if (filter.user_email) {
    conditions.push("user_email = ?");
    params.push(filter.user_email);
  }

  if (filter.target_type) {
    conditions.push("target_type = ?");
    params.push(filter.target_type);
  }

  if (filter.target_id) {
    conditions.push("target_id = ?");
    params.push(filter.target_id);
  }

  if (filter.status) {
    conditions.push("status = ?");
    params.push(filter.status);
  }

  if (filter.start_date) {
    conditions.push("created_at >= ?");
    params.push(filter.start_date);
  }

  if (filter.end_date) {
    conditions.push("created_at <= ?");
    params.push(filter.end_date);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limit = filter.limit || 100;
  const offset = filter.offset || 0;

  const result = await query(
    `SELECT * FROM audit_logs ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return result.rows as AuditLogRecord[];
}

/**
 * Verify hash chain integrity
 * Returns broken links
 */
export async function verifyHashChain(): Promise<
  Array<{ id: number; expected: string; actual: string }>
> {
  const result = await query(`
    SELECT 
      a.id,
      a.current_hash AS expected,
      b.previous_hash AS actual
    FROM audit_logs a
    LEFT JOIN audit_logs b ON b.id = a.id + 1
    WHERE b.previous_hash IS NOT NULL 
      AND b.previous_hash != a.current_hash
  `);

  return result.rows as Array<{ id: number; expected: string; actual: string }>;
}

/**
 * Get audit statistics
 */
export async function getAuditStats(
  startDate?: Date,
  endDate?: Date
): Promise<{
  total: number;
  by_category: Record<string, number>;
  by_status: Record<string, number>;
  failed_logins: number;
}> {
  const dateFilter =
    startDate && endDate
      ? `WHERE created_at BETWEEN ? AND ?`
      : startDate
      ? `WHERE created_at >= ?`
      : "";
  const dateParams = startDate && endDate ? [startDate, endDate] : startDate ? [startDate] : [];

  // Total
  const totalResult = await query(
    `SELECT COUNT(*) as total FROM audit_logs ${dateFilter}`,
    dateParams
  );

  // By category
  const categoryResult = await query(
    `SELECT event_category, COUNT(*) as count 
     FROM audit_logs ${dateFilter}
     GROUP BY event_category`,
    dateParams
  );

  // By status
  const statusResult = await query(
    `SELECT status, COUNT(*) as count 
     FROM audit_logs ${dateFilter}
     GROUP BY status`,
    dateParams
  );

  // Failed logins
  const failedLoginsResult = await query(
    `SELECT COUNT(*) as count 
     FROM audit_logs 
     WHERE event_type = 'login_failure' ${dateFilter ? "AND " + dateFilter.replace("WHERE ", "") : ""}`,
    dateParams
  );

  const by_category: Record<string, number> = {};
  for (const row of categoryResult.rows as { event_category: string; count: number }[]) {
    by_category[row.event_category] = row.count;
  }

  const by_status: Record<string, number> = {};
  for (const row of statusResult.rows as { status: string; count: number }[]) {
    by_status[row.status] = row.count;
  }

  return {
    total: (totalResult.rows[0] as { total: number }).total,
    by_category,
    by_status,
    failed_logins: (failedLoginsResult.rows[0] as { count: number }).count,
  };
}
