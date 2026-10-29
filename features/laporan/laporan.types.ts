export interface Laporan {
  id: number;
  user_id: number;
  judul: string;
  deskripsi: string;
  kategori: string;
  foto_path: string | null;
  latitude: number | null;
  longitude: number | null;
  status: string;
  wilayah_id: number | null;
  created_at: Date;
  pelapor_nama?: string;
  wilayah_nama?: string;
}

export type ServiceResult<T = object> =
  | ({ ok: true } & T)
  | { ok: false; status: number; error: string };