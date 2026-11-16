export interface Laporan {
  id: number;
  user_id: number;
  judul: string;
  deskripsi: string;
  deskripsi_enc?: string | null;
  kategori: string;
  foto_path: string | null;
  foto_hash?: string | null;
  foto_hasil_path?: string | null;
  foto_hasil_hash?: string | null;
  foto_integrity_valid?: boolean;
  foto_hasil_integrity_valid?: boolean;
  latitude: number | null;
  longitude: number | null;
  latitude_enc?: string | null;
  longitude_enc?: string | null;
  status: string;
  wilayah_id: number | null;
  created_at: Date;
  pelapor_nama?: string;
  wilayah_nama?: string;
  status_terakhir?: string | null;
  catatan_status?: string | null;
  status_diubah_at?: Date | string | null;
  petugas_nama?: string | null;
  status_history?: Array<{ id: number; status_lama: string | null; status_baru: string | null; status: string | null; catatan: string | null; created_at: Date | string; petugas_nama: string | null }>;
  is_public?: boolean | number;
}

export type ServiceResult<T = object> =
  | ({ ok: true; message?: string } & T)
  | { ok: false; status: number; error: string; message?: string };
