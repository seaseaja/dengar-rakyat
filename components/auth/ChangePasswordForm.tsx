"use client";

import { FormEvent, useState } from "react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { postJson } from "@/lib/api-client";

export default function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { ok, data } = await postJson("/api/auth/change-password", { newPassword });
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

      <Button type="submit" disabled={loading}>
        {loading ? "Memproses..." : "Ubah Password"}
      </Button>
    </form>
  );
}