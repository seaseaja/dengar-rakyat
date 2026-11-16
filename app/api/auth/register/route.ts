/**
 * Register API Route - Iterasi 2 H2 + H5 Hardened
 * - Input validation & sanitization
 * - Error handling with sanitized messages
 * - Rate limiting (via register.service)
 */

import { NextResponse } from "next/server";
import { registerUser } from "@/features/auth/register.service";
import { handleApiError } from "@/lib/error-handler";
import { sanitizeEmail, sanitizeString } from "@/lib/sanitizers";
import {
  validateEmail,
  validateNik,
  validateLength,
  validateWilayahId,
} from "@/lib/validators";
import { checkRateLimit, RateLimits } from "@/lib/rate-limiter";
import { getClientIP } from "@/lib/request-context";
import crypto from "node:crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Data registrasi tidak valid" }, { status: 400 });
    }

    // Sanitize inputs
    const sanitized = {
      nik: typeof body.nik === "string" ? body.nik.trim() : "",
      nama: sanitizeString(body.nama),
      email: sanitizeEmail(body.email),
      alamat: sanitizeString(body.alamat),
      wilayah_id: body.wilayah_id,
      password: typeof body.password === "string" ? body.password : "", // Don't sanitize password (needs original)
      // Public self-registration can only create a warga account.
      role: "warga" as const,
    };

    // Validate inputs
    const errors: string[] = [];

    const nikValidation = validateNik(sanitized.nik);
    if (!nikValidation.valid) errors.push(nikValidation.error!);

    const namaValidation = validateLength(sanitized.nama, 2, 100, "Nama");
    if (!namaValidation.valid) errors.push(namaValidation.error!);

    const emailValidation = validateEmail(sanitized.email);
    if (!emailValidation.valid) errors.push(emailValidation.error!);

    const alamatValidation = validateLength(sanitized.alamat, 5, 255, "Alamat");
    if (!alamatValidation.valid) errors.push(alamatValidation.error!);

    const wilayahValidation = validateWilayahId(sanitized.wilayah_id);
    if (!wilayahValidation.valid) errors.push(wilayahValidation.error!);

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: "Validasi gagal",
          details: errors,
        },
        { status: 400 }
      );
    }

    // Bound expensive Argon2 registration work per email and trusted client IP.
    try {
      const emailKey = crypto.createHash("sha256").update(sanitized.email).digest("hex");
      const ip = getClientIP(req);
      const emailLimit = checkRateLimit(`register:email:${emailKey}`, RateLimits.REGISTER.maxAttempts, RateLimits.REGISTER.windowMs);
      const ipLimit = ip !== "unknown"
        ? checkRateLimit(`register:ip:${ip}`, RateLimits.REGISTER.maxAttempts, RateLimits.REGISTER.windowMs)
        : { allowed: true };
      if (!emailLimit.allowed || !ipLimit.allowed) {
        return NextResponse.json({ error: "Terlalu banyak percobaan registrasi. Coba lagi nanti." }, { status: 429 });
      }
    } catch {
      return NextResponse.json({ error: "Layanan registrasi sementara tidak tersedia" }, { status: 503 });
    }

    // Call service
    const result = await registerUser(sanitized);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: result.user,
      },
      { status: 201 }
    );
  } catch (err) {
    return handleApiError(err, "Register");
  }
}
