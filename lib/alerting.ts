/**
 * Alerting System - Iterasi 3 P2
 * Send alerts via Slack, Email, or webhook
 */

export type AlertLevel = "info" | "warning" | "critical";

export interface Alert {
  level: AlertLevel;
  title: string;
  message: string;
  data?: Record<string, any>;
  timestamp?: Date;
}

/**
 * Send alert to configured channels
 */
export async function sendAlert(alert: Alert): Promise<void> {
  const timestamp = alert.timestamp || new Date();

  // Log to console (always) - FIX: Avoid format string injection
  console.log(
    "[ALERT %s] %s",
    alert.level.toUpperCase(),
    alert.title.replace(/%/g, "%%"),
    {
      message: alert.message,
      data: alert.data,
      timestamp,
    }
  );

  // Send to Slack (if configured)
  if (process.env.SLACK_WEBHOOK_URL) {
    await sendSlackAlert(alert, timestamp);
  }

  // Send to Email (if configured)
  if (process.env.ALERT_EMAIL) {
    await sendEmailAlert(alert, timestamp);
  }

  // Custom webhook (if configured)
  if (process.env.ALERT_WEBHOOK_URL) {
    await sendWebhookAlert(alert, timestamp);
  }
}

/**
 * Send alert to Slack
 */
async function sendSlackAlert(alert: Alert, timestamp: Date): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const color = {
    info: "#36a64f",
    warning: "#ff9800",
    critical: "#f44336",
  }[alert.level];

  const payload = {
    attachments: [
      {
        color,
        title: `${alert.level.toUpperCase()}: ${alert.title}`,
        text: alert.message,
        fields: alert.data
          ? Object.entries(alert.data).map(([key, value]) => ({
              title: key,
              value: JSON.stringify(value),
              short: true,
            }))
          : [],
        footer: "Dengar Rakyat Security",
        ts: Math.floor(timestamp.getTime() / 1000),
      },
    ],
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[Alerting] Failed to send Slack alert:", err);
  }
}

/**
 * Send alert via Email
 */
async function sendEmailAlert(alert: Alert, timestamp: Date): Promise<void> {
  const email = process.env.ALERT_EMAIL;
  if (!email) return;

  // TODO: Implement email sending (via SendGrid, SES, etc)
  // FIX: Avoid format string injection - use proper format strings
  console.log("[Alerting] Would send email to %s", email.replace(/%/g, "%%"), {
    subject: `[${alert.level.toUpperCase()}] ${alert.title}`,
    body: alert.message,
  });
}

/**
 * Send alert to custom webhook
 */
async function sendWebhookAlert(alert: Alert, timestamp: Date): Promise<void> {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const payload = {
    level: alert.level,
    title: alert.title,
    message: alert.message,
    data: alert.data,
    timestamp: timestamp.toISOString(),
    source: "dengar-rakyat",
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[Alerting] Failed to send webhook alert:", err);
  }
}
