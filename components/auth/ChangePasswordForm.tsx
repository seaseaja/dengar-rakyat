"use client";

import { FormEvent, useState } from "react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const csrf = await fetch("/api/auth/csrf", { credentials: "include" }).then((r) => r.json());
    const response = await fetch("/api/auth/change-password", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf.token }, body: JSON.stringify({ currentPassword, newPassword }) });
    const data = await response.json().catch(() => ({}));
    const ok = response.ok;
    setLoading(false);
    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan");
      return;
    }
    setMessage(data.message);
    setNewPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && <Alert type="success">{message}</Alert>}
      {error && <Alert type="error">{error}</Alert>}

      <FormField id="newPassword" label="Password Baru" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <FormField id="currentPassword" label="Password Saat Ini" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

      <Button type="submit" disabled={loading}>
        {loading ? "Memproses..." : "Ubah Password"}
      </Button>
    </form>
  );
}
