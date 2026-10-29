"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/ui/AuthCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { postJson } from "@/lib/api-client";

export default function LoginForm({ registered }: { registered?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { ok, data } = await postJson("/api/auth/login", { email, password });
    setLoading(false);
    if (!ok) {
      setError(data.error ?? "Terjadi kesalahan");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthCard title="Masuk" subtitle="Dengar Rakyat! — Lapor, dilacak, ditindaklanjuti">
      <form onSubmit={handleSubmit} className="space-y-4">
        {registered && <Alert type="success">Registrasi berhasil, silakan masuk.</Alert>}
        {error && <Alert type="error">{error}</Alert>}

        <FormField id="email" label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      <div className="flex justify-between text-sm">
        <Link href="/forgot-password" className="text-blue-600">
          Lupa password?
        </Link>
        <Link href="/register" className="text-blue-600">
          Daftar akun
        </Link>
      </div>
    </AuthCard>
  );
}