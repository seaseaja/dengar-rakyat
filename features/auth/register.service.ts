/**
 * Register Service - Iterasi 2 H2 Hardened
 * - Argon2id password hashing
 * - AES-256-GCM encryption for PII (NIK, alamat)
 * - Password policy enforcement
 */

import argon2 from "argon2";
import { encrypt, hmacHash } from "@/lib/crypto";
import { validatePassword } from "@/lib/password-policy";
import { findUserByEmail, findUserByNik, insertUser } from "./auth.queries";
import type { RegisterInput, ServiceResult } from "./auth.types";

export async function registerUser(
  input: RegisterInput
): Promise<ServiceResult<{ user: { id: number; email: string; role: string } }>> {
  const { nik, nama, email, alamat, wilayah_id, password } = input;

  // Validation: required fields
  if (!nik || !nama || !email || !alamat || !wilayah_id || !password) {
    return { ok: false, status: 400, error: "Semua field wajib diisi" };
  }

  // Validation: NIK format (16 digits)
  if (!/^\d{16}$/.test(nik)) {
    return { ok: false, status: 400, error: "NIK harus 16 digit angka" };
  }

  // Validation: email format — menggunakan atomic-safe pattern tanpa nested quantifier
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, status: 400, error: "Format email tidak valid" };
  }

  // Validation: password policy
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return {
      ok: false,
      status: 400,
      error: passwordValidation.errors.join(", "),
    };
  }

  // Check: email already exists
  const existingEmail = await findUserByEmail(email);
  if (existingEmail.length > 0) {
    return { ok: false, status: 409, error: "Email sudah terdaftar" };
  }

  // Check: NIK already exists (using nik_hash)
  const existingNik = await findUserByNik(nik);
  if (existingNik.length > 0) {
    return { ok: false, status: 409, error: "NIK sudah terdaftar" };
  }

  try {
    // Hash password with Argon2id
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456, // 19 MB
      timeCost: 2,
      parallelism: 1,
    });

    // Encrypt PII
    const nikEnc = encrypt(nik);
    const nikHash = hmacHash(nik);
    const alamatEnc = encrypt(alamat);

    // Insert user
    const user = await insertUser(
      { ...input, role: input.role ?? "warga" },
      passwordHash,
      nikEnc,
      nikHash,
      alamatEnc
    );

    return { ok: true, user };
  } catch (error) {
    console.error("Register error:", error);
    return { ok: false, status: 500, error: "Terjadi kesalahan saat registrasi" };
  }
}