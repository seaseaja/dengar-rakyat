/**
 * Monitoring System - Iterasi 3 P2
 * Real-time threat detection & anomaly monitoring
 */

import { getAuditLogs } from "@/features/audit/audit.service";
import { sendAlert } from "./alerting";

interface MonitoringThreshold {
  failedLogins: number; // Max failed logins in window
  rateLimitBreaches: number; // Max rate limit hits in window
  timeWindowMinutes: number; // Detection window
}

const DEFAULT_THRESHOLDS: MonitoringThreshold = {
  failedLogins: 10,
  rateLimitBreaches: 5,
  timeWindowMinutes: 5,
};

/**
 * Detect failed login spike
 */
export async function detectFailedLoginSpike(
  thresholds = DEFAULT_THRESHOLDS
): Promise<{ detected: boolean; count: number; threshold: number }> {
  const startDate = new Date(Date.now() - thresholds.timeWindowMinutes * 60 * 1000);

  const logs = await getAuditLogs({
    event_type: "login_failure",
    start_date: startDate,
  });

  const detected = logs.length >= thresholds.failedLogins;

  if (detected) {
    await sendAlert({
      level: "warning",
      title: "Failed Login Spike Detected",
      message: `${logs.length} failed login attempts in last ${thresholds.timeWindowMinutes} minutes`,
      data: {
        count: logs.length,
        threshold: thresholds.failedLogins,
        emails: logs.slice(0, 10).map((l) => l.user_email),
      },
    });
  }

  return {
    detected,
    count: logs.length,
    threshold: thresholds.failedLogins,
  };
}

/**
 * Detect rate limit breaches
 */
export async function detectRateLimitBreaches(
  thresholds = DEFAULT_THRESHOLDS
): Promise<{ detected: boolean; count: number }> {
  const startDate = new Date(Date.now() - thresholds.timeWindowMinutes * 60 * 1000);

  const logs = await getAuditLogs({
    event_type: "rate_limit_exceeded",
    start_date: startDate,
  });

  const detected = logs.length >= thresholds.rateLimitBreaches;

  if (detected) {
    await sendAlert({
      level: "warning",
      title: "Rate Limit Breach Spike",
      message: `${logs.length} rate limit breaches in last ${thresholds.timeWindowMinutes} minutes`,
      data: { count: logs.length },
    });
  }

  return { detected, count: logs.length };
}

/**
 * Detect CSRF violations
 */
export async function detectCSRFViolations(): Promise<{ count: number }> {
  const startDate = new Date(Date.now() - 60 * 60 * 1000); // Last hour

  const logs = await getAuditLogs({
    event_type: "csrf_violation",
    start_date: startDate,
  });

  if (logs.length >= 5) {
    await sendAlert({
      level: "critical",
      title: "Multiple CSRF Violations Detected",
      message: `${logs.length} CSRF violations in last hour - possible attack`,
      data: {
        count: logs.length,
        ips: logs.slice(0, 10).map((l) => l.ip_address),
      },
    });
  }

  return { count: logs.length };
}

/**
 * Check system health
 */
export async function checkSystemHealth(): Promise<{
  status: "healthy" | "degraded" | "critical";
  checks: Record<string, { status: string; message?: string }>;
}> {
  const checks: Record<string, { status: string; message?: string }> = {};

  // Check database connection
  try {
    const { query } = await import("@/lib/db");
    await query("SELECT 1");
    checks.database = { status: "ok" };
  } catch (err) {
    checks.database = {
      status: "error",
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }

  // Check audit log integrity
  try {
    const { verifyAuditIntegrity } = await import("@/features/audit/audit.service");
    const integrity = await verifyAuditIntegrity();
    checks.audit_integrity = {
      status: integrity.valid ? "ok" : "error",
      message: integrity.valid ? undefined : `${integrity.brokenLinks.length} broken links`,
    };
  } catch (err) {
    checks.audit_integrity = { status: "error", message: "Check failed" };
  }

  // Check recent errors (last 5 min)
  try {
    const startDate = new Date(Date.now() - 5 * 60 * 1000);
    const logs = await getAuditLogs({
      status: "failure",
      start_date: startDate,
    });

    checks.recent_errors = {
      status: logs.length > 50 ? "warning" : "ok",
      message: logs.length > 50 ? `${logs.length} errors in last 5 minutes` : undefined,
    };
  } catch (err) {
    checks.recent_errors = { status: "error", message: "Check failed" };
  }

  // Determine overall status
  const hasError = Object.values(checks).some((c) => c.status === "error");
  const hasWarning = Object.values(checks).some((c) => c.status === "warning");

  const status = hasError ? "critical" : hasWarning ? "degraded" : "healthy";

  return { status, checks };
}

/**
 * Run all monitoring checks
 */
export async function runMonitoringChecks(): Promise<void> {
  try {
    await Promise.all([
      detectFailedLoginSpike(),
      detectRateLimitBreaches(),
      detectCSRFViolations(),
    ]);
  } catch (err) {
    console.error("[Monitoring] Check failed:", err);
  }
}
