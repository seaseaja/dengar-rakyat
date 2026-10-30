import { writeFile } from "fs/promises";
import path from "path";
import { query } from "@/lib/db";
import type { ServiceResult } from "./laporan.types";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "laporan");

const STATUS_FLOW = ["Diterima", "Diverifikasi", "Diproses", "Selesai"];

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
    // Sengaja TANPA validasi tipe/isi file — sama kayak celah Modul 3
    const buffer = Buffer.from(await fotoHasil.arrayBuffer());
    const filename = `hasil-${Date.now()}-${fotoHasil.name}`;
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    fotoHasilPath = `/uploads/laporan/${filename}`;
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