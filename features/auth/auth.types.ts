export type Role = "warga" | "petugas_pos" | "admin_pemda" | "pusat" | "PUSAT" | "PEMDA" | "POS";

export interface User {
  id: number;
  nik?: string | null;
  nama: string;
  email: string;
  alamat?: string | null;
  wilayah_id: number | null;
  wilayah_nama?: string | null;
  password?: string;
  role: Role;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;
}

export interface RegisterInput {
  nik: string;
  nama: string;
  email: string;
  alamat: string;
  wilayah_id: string | number;
  password: string;
  role?: Role;
}

export type ServiceResult<T = object> =
  | ({ ok: true; message?: string } & T)
  | { ok: false; status: number; error: string; message?: string };