"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/ui/AuthCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { postJson } from "@/lib/api-client";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { ok, data } = await postJson("/api/auth/reset-password", { token, newPassword });
    setLoading(false);
    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan");
      return;
    }
    setMessage(data.message);
  }

  return (
    <AuthCard title="Reset Password" subtitle="Buat password baru untuk akunmu">
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && <Alert type="success">{message}</Alert>}
        {error && <Alert type="error">{error}</Alert>}

        <FormField id="newPassword" label="Password Baru" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

        <Button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Simpan Password Baru"}
        </Button>
      </form>

      <p className="text-center text-sm">
        <Link href="/login" className="text-blue-600">
          Kembali ke login
        </Link>
      </p>
    </AuthCard>
  );
}