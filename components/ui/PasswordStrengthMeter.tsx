/**
 * Password Strength Meter - Iterasi 2 H6
 * Real-time visual feedback untuk password strength
 */

"use client";

import { getPasswordFeedback } from "@/lib/password-policy";

interface PasswordStrengthMeterProps {
  password: string;
  showRequirements?: boolean;
}

export function PasswordStrengthMeter({
  password,
  showRequirements = true,
}: PasswordStrengthMeterProps) {
  const feedback = getPasswordFeedback(password);

  const strengthColors = {
    weak: "bg-red-500",
    medium: "bg-amber-500",
    strong: "bg-green-500",
  };

  const strengthText = {
    weak: "Lemah",
    medium: "Sedang",
    strong: "Kuat",
  };

  const strengthWidth = {
    weak: "33%",
    medium: "66%",
    strong: "100%",
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${strengthColors[feedback.strength]} transition-all duration-300`}
            style={{ width: strengthWidth[feedback.strength] }}
          />
        </div>
        <span
          className={`text-sm font-medium`}
          style={{ color: feedback.color }}
        >
          {strengthText[feedback.strength]}
        </span>
      </div>

      {/* Requirements Checklist */}
      {showRequirements && (
        <ul className="text-sm space-y-1">
          {feedback.checks.map((check, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 ${
                check.passed ? "text-green-600" : "text-gray-500"
              }`}
            >
              <span className="text-lg">
                {check.passed ? "✓" : "○"}
              </span>
              <span>{check.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
