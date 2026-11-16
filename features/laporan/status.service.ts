import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { query, pool } from "@/lib/db";
import type { ServiceResult } from "./laporan.types";
import { calculateFileHash, validateFileType } from "@/lib/file-integrity";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "storage", "laporan");

const STATUS_FLOW = ["Diterima", "Diverifikasi", "Diproses", "Selesai"];

// Allowed state transitions (State Machine enforcing A08 Data Integrity)
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  Diterima: ["Diverifikasi"],
  Diverifikasi: ["Diproses"],
  Diproses: ["Selesai"],
  Selesai: [], // Terminal status
};

// Allowed MIME types for file uploads
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validate filename contains only safe characters
 * Prevents path traversal attacks
 */
function isSafeFilename(filename: string): boolean {
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
  laporanId: string | number;
  statusBaru: string;
  diubahOleh: number;
  catatan?: string;
  fotoHasil?: File | null;
  wilayahIds?: number[];
  allowAllWilayah?: boolean;
}): Promise<ServiceResult<{ message: string; fotoHasilPath?: string | null }>> {
  const { laporanId, statusBaru, diubahOleh, catatan = "", fotoHasil, wilayahIds, allowAllWilayah = false } = input;

  const idNum = typeof laporanId === "number" ? laporanId : Number.parseInt(laporanId, 10);
  if (Number.isNaN(idNum)) {
    return { ok: false, status: 400, error: "ID laporan tidak valid" };
  }

  if (!STATUS_FLOW.includes(statusBaru)) {
    return {
      ok: false,
      status: 400,
      error: `Status tidak valid. Pilihan yang tersedia: ${STATUS_FLOW.join(", ")}`,
    };
  }
  if (typeof catatan !== "string" || catatan.length > 2000) {
    return { ok: false, status: 400, error: "Catatan maksimal 2000 karakter" };
  }

  // Parameterized query: find existing report
  const current = await query("SELECT id, wilayah_id FROM laporan WHERE id = ?", [idNum]);
  if (current.rows.length === 0) {
    return { ok: false, status: 404, error: "Laporan tidak ditemukan" };
  }

  if (!allowAllWilayah && (!wilayahIds?.length || !wilayahIds.includes(Number(current.rows[0].wilayah_id)))) {
    return { ok: false, status: 404, error: "Laporan tidak ditemukan atau Anda tidak memiliki akses" };
  }

  let fotoHasilPath: string | null = null;
  let fotoHasilHash: string | null = null;

  if (fotoHasil && fotoHasil.size > 0) {
    if (!ALLOWED_MIME_TYPES.includes(fotoHasil.type)) {
      return { 
        ok: false, 
        status: 400, 
        error: "Tipe file tidak diizinkan. Hanya JPEG dan PNG yang diperbolehkan",
      };
    }

    if (fotoHasil.size > MAX_FILE_SIZE) {
      return { ok: false, status: 400, error: "Ukuran file terlalu besar (maksimal 5MB)" };
    }

    const buffer = Buffer.from(await fotoHasil.arrayBuffer());

    // Magic bytes verification
    if (!validateFileType(buffer, fotoHasil.type)) {
      return { ok: false, status: 400, error: "Format file tidak valid (magic bytes mismatch)" };
    }

    const normalizedImage = await sharp(buffer, { limitInputPixels: 40_000_000 }).rotate().resize(1920, 1920, {
      fit: "inside",
      withoutEnlargement: true,
    }).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
    fotoHasilHash = calculateFileHash(normalizedImage);

    const safeFilename = generateSafeFilename(".jpg");
    
    if (!isSafeFilename(safeFilename)) {
      return { ok: false, status: 500, error: "Gagal menghasilkan nama file yang aman" };
    }

    const fullPath = path.join(UPLOAD_DIR, safeFilename);
    const resolvedPath = path.resolve(fullPath);
    const resolvedUploadDir = path.resolve(UPLOAD_DIR);
    if (!resolvedPath.startsWith(resolvedUploadDir)) {
      return { ok: false, status: 400, error: "Path traversal terdeteksi" };
    }

    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(fullPath, normalizedImage);
    fotoHasilPath = `/uploads/laporan/${safeFilename}`;
  }

  // Persist status and its append-only history together.
  let connection;
  try { connection = await pool.getConnection(); }
  catch (error) {
    if (fotoHasilPath) await unlink(path.join(UPLOAD_DIR, path.basename(fotoHasilPath))).catch(() => undefined);
    throw error;
  }
  try {
    await connection.beginTransaction();
    const [lockedRows] = await connection.query("SELECT status, wilayah_id FROM laporan WHERE id = ? FOR UPDATE", [idNum]);
    const locked = lockedRows as Array<{ status: string; wilayah_id: number | null }>;
    if (locked.length === 0) {
      await connection.rollback();
      if (fotoHasilPath) await unlink(path.join(UPLOAD_DIR, path.basename(fotoHasilPath))).catch(() => undefined);
      return { ok: false, status: 404, error: "Laporan tidak ditemukan" };
    }
    if (!allowAllWilayah && (!wilayahIds?.length || !wilayahIds.includes(Number(locked[0].wilayah_id)))) {
      await connection.rollback();
      if (fotoHasilPath) await unlink(path.join(UPLOAD_DIR, path.basename(fotoHasilPath))).catch(() => undefined);
      return { ok: false, status: 404, error: "Laporan tidak ditemukan atau Anda tidak memiliki akses" };
    }
    const lockedStatus = locked[0].status;
    if (lockedStatus !== statusBaru && !(ALLOWED_TRANSITIONS[lockedStatus] || []).includes(statusBaru)) {
      await connection.rollback();
      if (fotoHasilPath) await unlink(path.join(UPLOAD_DIR, path.basename(fotoHasilPath))).catch(() => undefined);
      return { ok: false, status: 409, error: `Transisi status berubah. Status saat ini: ${lockedStatus}` };
    }

    // Hardened parameterized update
  if (fotoHasilPath) {
    await connection.query(
      "UPDATE laporan SET status = ?, foto_hasil_path = ?, foto_hasil_hash = ? WHERE id = ?",
      [statusBaru, fotoHasilPath, fotoHasilHash, idNum]
    );
  } else {
    await connection.query("UPDATE laporan SET status = ? WHERE id = ?", [statusBaru, idNum]);
  }

    await connection.query(
      `INSERT INTO status_history (laporan_id, status, changed_by, catatan, status_lama, status_baru, diubah_oleh, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [idNum, statusBaru, diubahOleh, catatan, lockedStatus, statusBaru, diubahOleh]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    if (fotoHasilPath) await unlink(path.join(UPLOAD_DIR, path.basename(fotoHasilPath))).catch(() => undefined);
    throw error;
  } finally {
    connection.release();
  }

  return {
    ok: true,
    message: `Status laporan berhasil diperbarui menjadi "${statusBaru}"`,
    fotoHasilPath,
  };
}
