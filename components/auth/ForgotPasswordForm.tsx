"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/ui/AuthCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { postJson } from "@/lib/api-client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { ok, data } = await postJson("/api/auth/forgot-password", { email });
    setLoading(false);
    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan");
      return;
    }
    setMessage(data.message);
  }

  return (
    <AuthCard title="Lupa Password" subtitle="Masukkan email akunmu untuk menerima link reset">
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && <Alert type="success">{message}</Alert>}
        {error && <Alert type="error">{error}</Alert>}

        <FormField id="email" label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <Button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Kirim Link Reset"}
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