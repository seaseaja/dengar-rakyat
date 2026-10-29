export type Role = "warga" | "petugas_pos" | "admin_pemda" | "pusat";

export interface User {
  id: number;
  nik: string;
  nama: string;
  email: string;
  alamat: string;
  wilayah_id: number | null;
  wilayah_nama?: string | null;
  password: string;
  role: Role;
  created_at: Date;
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
  | ({ ok: true } & T)
  | { ok: false; status: number; error: string };