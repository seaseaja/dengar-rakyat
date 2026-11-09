import { writeFile } from "fs/promises";
import path from "path";
import { query } from "@/lib/db";
import type { ServiceResult } from "./laporan.types";
import { randomBytes } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "laporan");

const STATUS_FLOW = ["Diterima", "Diverifikasi", "Diproses", "Selesai"];

// Allowed MIME types for file uploads
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validate filename contains only safe characters
 * Prevents path traversal attacks
 */
function isSafeFilename(filename: string): boolean {
  // Only allow alphanumeric, dash, underscore, and dot
  return /^[a-zA-Z0-9_\-\.]+$/.test(filename) && !filename.includes("..");
}

/**
 * Generate safe random filename
 */
function generateSafeFilename(originalExt: string): string {
  const timestamp = Date.now();
  const random = randomBytes(8).toString("hex");
  return `hasil-${timestamp}-${random}${originalExt}`;
}

export async function updateStatusLaporan(input: {
  laporanId: string;
  statusBaru: string;
  diubahOleh: number;
  catatan: string;
  fotoHasil: File | null;
}): Promise<ServiceResult<{ message: string }>> {
  const { laporanId, statusBaru, diubahOleh, catatan, fotoHasil } = input;

  if (!STATUS_FLOW.includes(statusBaru)) {
    return { ok: false, status: 400, error: "Status tidak valid" };
  }

  const current = await query(`SELECT status FROM laporan WHERE id = ${laporanId}`);
  if (current.rows.length === 0) {
    return { ok: false, status: 404, error: "Laporan tidak ditemukan" };
  }
  const statusLama = current.rows[0].status as string;

  let fotoHasilPath: string | null = null;
  if (fotoHasil && fotoHasil.size > 0) {
    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(fotoHasil.type)) {
      return { 
        ok: false, 
        status: 400, 
        error: "Tipe file tidak diizinkan. Hanya JPEG, PNG, dan WebP yang diperbolehkan" 
      };
    }

    // Validate file size
    if (fotoHasil.size > MAX_FILE_SIZE) {
      return { ok: false, status: 400, error: "Ukuran file terlalu besar (maksimal 5MB)" };
    }

    // Use safe random filename instead of user input
    const ext = path.extname(fotoHasil.name).toLowerCase();
    const safeFilename = generateSafeFilename(ext);
    
    // Validate generated filename is safe
    if (!isSafeFilename(safeFilename)) {
      return { ok: false, status: 500, error: "Gagal menghasilkan nama file yang aman" };
    }

    const buffer = Buffer.from(await fotoHasil.arrayBuffer());
    // nosem  grep
    const fullPath = path.join(UPLOAD_DIR, safeFilename);
    
    // Verify path stays within UPLOAD_DIR (defense in depth)
    // nosem  grep
    const resolvedPath = path.resolve(fullPath);
    const resolvedUploadDir = path.resolve(UPLOAD_DIR);
    if (!resolvedPath.startsWith(resolvedUploadDir)) {
      return { ok: false, status: 400, error: "Path traversal terdeteksi" };
    }

    await writeFile(fullPath, buffer);
    fotoHasilPath = `/uploads/laporan/${safeFilename}`;
  }

  // Sengaja: UPDATE langsung di tabel utama, bukan append-only — celah A08
  await query(`
    UPDATE laporan
    SET status = '${statusBaru}'
        ${fotoHasilPath ? `, foto_hasil_path = '${fotoHasilPath}'` : ""}
    WHERE id = ${laporanId}
  `);

  // History dicatat, TAPI karena kolomnya bisa di-UPDATE/DELETE manual via SQL,
  // ini belum benar-benar append-only (hardening-nya nanti pasang constraint DB)
  await query(`
    INSERT INTO status_history (laporan_id, status_lama, status_baru, diubah_oleh, catatan)
    VALUES (${laporanId}, '${statusLama}', '${statusBaru}', ${diubahOleh}, '${catatan}')
  `);

  return { ok: true, message: "Status berhasil diperbarui" };
}