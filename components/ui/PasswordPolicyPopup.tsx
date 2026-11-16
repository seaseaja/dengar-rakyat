"use client";

import { useMemo } from "react";
import { getPasswordFeedback } from "@/lib/password-policy";

interface PasswordPolicyPopupProps {
  password: string;
  username?: string;
  visible?: boolean;
}

export function PasswordPolicyPopup({
  password,
  username,
  visible = true,
}: PasswordPolicyPopupProps) {
  const feedback = useMemo(
    () => getPasswordFeedback(password, username),
    [password, username]
  );

  if (!visible && !password) return null;

  const strengthWidth = {
    weak: "33%",
    medium: "66%",
    strong: "100%",
  }[feedback.strength];

  const strengthLabel = {
    weak: "Lemah (Belum Memenuhi Syarat)",
    medium: "Sedang",
    strong: "Kuat & Aman",
  }[feedback.strength];

  const allPassed = feedback.checks.every((c) => c.passed);

  return (
    <div className="relative mt-2 rounded-xl border border-blue-200 bg-white p-3.5 shadow-lg ring-1 ring-black/5 transition-all">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-gray-700">Persyaratan Keamanan Password:</span>
        <span
          className="font-bold uppercase tracking-wider"
          style={{ color: feedback.color }}
        >
          {strengthLabel}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="my-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: strengthWidth,
            backgroundColor: feedback.color,
          }}
        />
      </div>

      {/* Checklist */}
      <ul className="grid grid-cols-1 gap-1.5 pt-1 text-xs sm:grid-cols-2">
        {feedback.checks.map((check, idx) => (
          <li
            key={idx}
            className={`flex items-center space-x-2 transition-colors ${
              check.passed ? "text-emerald-700 font-medium" : "text-gray-500"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                check.passed
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {check.passed ? "✓" : "○"}
            </span>
            <span>{check.label}</span>
          </li>
        ))}
      </ul>

      {allPassed ? (
        <div className="mt-2 rounded bg-emerald-50 px-2 py-1 text-center text-[11px] font-medium text-emerald-700">
          ✓ Password telah memenuhi semua standar keamanan
        </div>
      ) : (
        <p className="mt-2 text-[11px] text-gray-500 italic">
          * Seluruh kriteria di atas wajib terpenuhi sebelum pendaftaran berhasil.
        </p>
      )}
    </div>
  );
}
