/**
 * Password Policy Validator - Iterasi 2 H2
 * Enforce strong password requirements (OWASP compliant)
 */

import { COMMON_PASSWORDS } from "./common-passwords";

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
  strength: "weak" | "medium" | "strong";
}

export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  bannedPasswords: boolean;
}

const DEFAULT_REQUIREMENTS: PasswordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: false, // Optional untuk user experience
  bannedPasswords: true,
};

/**
 * Validasi password berdasarkan policy
 * @param password Password to validate
 * @param requirements Custom requirements (optional)
 * @param username Username to check against (optional, spec requirement)
 */
export function validatePassword(
  password: string,
  requirements: Partial<PasswordRequirements> = {},
  username?: string
): PasswordValidationResult {
  const reqs = { ...DEFAULT_REQUIREMENTS, ...requirements };
  const errors: string[] = [];

  // Check minimum length
  if (password.length < reqs.minLength) {
    errors.push(`Password minimal ${reqs.minLength} karakter`);
  }

  // Check uppercase
  if (reqs.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password harus mengandung huruf besar (A-Z)");
  }

  // Check lowercase
  if (reqs.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password harus mengandung huruf kecil (a-z)");
  }

  // Check number
  if (reqs.requireNumber && !/[0-9]/.test(password)) {
    errors.push("Password harus mengandung angka (0-9)");
  }

  // Check special character
  if (reqs.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password harus mengandung karakter spesial (!@#$%^&*...)");
  }

  // Check if password contains username (SPEC REQUIREMENT)
  if (username && password.toLowerCase().includes(username.toLowerCase())) {
    errors.push("Password tidak boleh mengandung username");
  }

  // Check common passwords
  if (reqs.bannedPasswords && isCommonPassword(password)) {
    errors.push("Password terlalu umum, gunakan kombinasi yang lebih unik");
  }

  // Calculate strength
  const strength = calculateStrength(password);

  return {
    valid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Check if password is in common passwords list
 */
function isCommonPassword(password: string): boolean {
  const lower = password.toLowerCase();
  return COMMON_PASSWORDS.includes(lower);
}

/**
 * Calculate password strength
 */
function calculateStrength(password: string): "weak" | "medium" | "strong" {
  let score = 0;

  // Length bonus
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  // Not common
  if (!isCommonPassword(password)) score++;

  if (score >= 7) return "strong";
  if (score >= 5) return "medium";
  return "weak";
}

/**
 * Generate password strength feedback for UI
 */
export function getPasswordFeedback(password: string): {
  checks: Array<{ label: string; passed: boolean }>;
  strength: "weak" | "medium" | "strong";
  color: string;
} {
  const checks = [
    { label: "Minimal 8 karakter", passed: password.length >= 8 },
    { label: "Mengandung huruf besar", passed: /[A-Z]/.test(password) },
    { label: "Mengandung huruf kecil", passed: /[a-z]/.test(password) },
    { label: "Mengandung angka", passed: /[0-9]/.test(password) },
    { label: "Bukan password umum", passed: !isCommonPassword(password) },
  ];

  const strength = calculateStrength(password);
  
  const colorMap = {
    weak: "#ef4444",    // red-500
    medium: "#f59e0b",  // amber-500
    strong: "#22c55e",  // green-500
  };

  return {
    checks,
    strength,
    color: colorMap[strength],
  };
}
