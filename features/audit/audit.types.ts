/**
 * Audit Types - Iterasi 3 P1
 * Type definitions untuk audit logging
 */

export type EventType =
  // Auth events
  | "login_success"
  | "login_failure"
  | "logout"
  | "register"
  | "password_reset_request"
  | "password_reset_complete"
  | "password_change"
  | "session_expired"
  // Data events
  | "laporan_create"
  | "laporan_read"
  | "laporan_update"
  | "laporan_delete"
  | "status_update"
  | "data_export"
  | "data_delete"
  // System events
  | "rate_limit_exceeded"
  | "csrf_violation"
  | "invalid_token"
  | "permission_denied";

export type EventCategory = "auth" | "data" | "system";

export type EventStatus = "success" | "failure" | "warning";

export interface AuditLogEntry {
  // Event Info
  event_type: EventType;
  event_category: EventCategory;
  action: string;

  // Actor
  user_id?: number;
  user_email?: string;
  user_role?: string;

  // Target
  target_type?: string;
  target_id?: string;

  // Context
  ip_address?: string;
  user_agent?: string;
  request_id?: string;

  // Details
  metadata?: Record<string, any>;

  // Status
  status: EventStatus;
  error_message?: string;
}

export interface AuditLogRecord extends AuditLogEntry {
  id: number;
  previous_hash: string | null;
  current_hash: string;
  created_at: Date;
}

export interface AuditQuery {
  event_type?: EventType;
  event_category?: EventCategory;
  user_id?: number;
  user_email?: string;
  target_type?: string;
  target_id?: string;
  status?: EventStatus;
  start_date?: Date;
  end_date?: Date;
  limit?: number;
  offset?: number;
}
