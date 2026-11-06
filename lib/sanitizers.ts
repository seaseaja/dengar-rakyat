/**
 * Input Sanitizers - Iterasi 2 H5
 * - HTML escape
 * - SQL escape (defense in depth)
 * - Path traversal prevention
 * - Trim & normalize
 */

/**
 * Escape HTML characters to prevent XSS
 */
export function escapeHtml(unsafe: string): string {
  if (!unsafe || typeof unsafe !== "string") return "";

  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sanitize string (trim + escape)
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== "string") return "";
  
  return escapeHtml(input.trim());
}

/**
 * Sanitize email (lowercase + trim)
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== "string") return "";
  
  return email.trim().toLowerCase();
}

/**
 * Sanitize filename (remove path traversal)
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== "string") return "";

  // Remove path traversal attempts
  let safe = filename.replace(/\.\./g, "");
  
  // Remove path separators
  safe = safe.replace(/[\/\\]/g, "");
  
  // Remove null bytes
  safe = safe.replace(/\0/g, "");
  
  // Keep only alphanumeric, dash, underscore, dot
  safe = safe.replace(/[^a-zA-Z0-9\-_\.]/g, "_");
  
  // Limit length
  if (safe.length > 255) {
    const ext = safe.substring(safe.lastIndexOf("."));
    safe = safe.substring(0, 255 - ext.length) + ext;
  }

  return safe || "file";
}

/**
 * Sanitize URL (prevent javascript:, data:, etc)
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim().toLowerCase();

  // Block dangerous protocols
  const dangerousProtocols = [
    "javascript:",
    "data:",
    "vbscript:",
    "file:",
    "about:",
  ];

  for (const protocol of dangerousProtocols) {
    if (trimmed.startsWith(protocol)) {
      return null; // Reject dangerous URLs
    }
  }

  // Allow http, https, mailto
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("/") || // Relative URL
    trimmed.startsWith("#") // Anchor
  ) {
    return url.trim();
  }

  // Default: treat as relative URL
  return url.trim();
}

/**
 * Sanitize phone number (remove non-digits except +)
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== "string") return "";

  // Keep only digits and +
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Sanitize integer
 */
export function sanitizeInteger(value: any): number | null {
  const num = parseInt(value, 10);
  return isNaN(num) ? null : num;
}

/**
 * Sanitize float
 */
export function sanitizeFloat(value: any): number | null {
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

/**
 * Strip all HTML tags (aggressive)
 */
export function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  return html.replace(/<[^>]*>/g, "");
}

/**
 * Normalize whitespace (multiple spaces → single space)
 */
export function normalizeWhitespace(text: string): string {
  if (!text || typeof text !== "string") return "";

  return text.trim().replace(/\s+/g, " ");
}

/**
 * Sanitize object (recursive)
 * Applies sanitizeString to all string values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj };

  for (const key in result) {
    const value = result[key];

    if (typeof value === "string") {
      result[key] = sanitizeString(value) as any;
    } else if (typeof value === "object" && value !== null) {
      result[key] = sanitizeObject(value);
    }
  }

  return result;
}

/**
 * SQL escape (defense in depth - use parameterized queries instead!)
 * This is backup for legacy code or dynamic table/column names
 */
export function escapeSql(value: string): string {
  if (!value || typeof value !== "string") return "";

  return value.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  });
}
