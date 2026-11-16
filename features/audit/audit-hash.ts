import crypto from "node:crypto";
import type { AuditLogEntry } from "./audit.types";

/** Hash the complete immutable event payload plus the previous chain link. */
export function generateAuditHash(entry: AuditLogEntry, previousHash: string | null): string {
  const payload = {
    event_type: entry.event_type,
    event_category: entry.event_category ?? null,
    action: entry.action ?? null,
    user_id: entry.user_id ?? null,
    user_email: entry.user_email || null,
    user_role: entry.user_role || null,
    target_type: entry.target_type || null,
    target_id: entry.target_id || null,
    ip_address: entry.ip_address || null,
    user_agent: entry.user_agent || null,
    request_id: entry.request_id || null,
    metadata: entry.metadata ? JSON.stringify(entry.metadata) : null,
    status: entry.status,
    error_message: entry.error_message || null,
    previous_hash: previousHash,
  };
  return crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}
