/**
 * Input Validators - Iterasi 2 H5
 * - Email, NIK, phone validation
 * - File upload validation
 * - String length validation
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== "string") {
    return { valid: false, error: "Email wajib diisi" };
  }

  // RFC 5322 simplified — menggunakan atomic-safe pattern tanpa nested quantifier
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Format email tidak valid" };
  }

  if (email.length > 100) {
    return { valid: false, error: "Email terlalu panjang (max 100 karakter)" };
  }

  return { valid: true };
}

/**
 * Validate Indonesian NIK (16 digits)
 * Format: PPKKSSDDMMYYXXXX
 * PP = Provinsi, KK = Kota/Kab, SS = Kecamatan, DD = Tanggal, MM = Bulan, YY = Tahun, XXXX = Nomor urut
 */
export function validateNik(nik: string): ValidationResult {
  if (!nik || typeof nik !== "string") {
    return { valid: false, error: "NIK wajib diisi" };
  }

  // Must be 16 digits
  if (!/^\d{16}$/.test(nik)) {
    return { valid: false, error: "NIK harus 16 digit angka" };
  }

  // Basic validation: date part
  const dd = Number.parseInt(nik.substring(6, 8), 10);
  const mm = Number.parseInt(nik.substring(8, 10), 10);
  
  // DD can be 01-31 for male, 41-71 for female
  const day = dd > 40 ? dd - 40 : dd;
  
  if (day < 1 || day > 31) {
    return { valid: false, error: "Format NIK tidak valid (tanggal lahir)" };
  }

  if (mm < 1 || mm > 12) {
    return { valid: false, error: "Format NIK tidak valid (bulan lahir)" };
  }

  return { valid: true };
}

/**
 * Validate Indonesian phone number
 * Format: 08xx-xxxx-xxxx or +62xxx
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || typeof phone !== "string") {
    return { valid: false, error: "Nomor telepon wajib diisi" };
  }

  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s\-]/g, "");

  // Indonesian format: 08xxxxxxxxxx or +628xxxxxxxxxx or 628xxxxxxxxxx
  const phoneRegex = /^(\+62|62|0)8\d{8,11}$/;

  if (!phoneRegex.test(cleaned)) {
    return { valid: false, error: "Format nomor telepon tidak valid" };
  }

  return { valid: true };
}

/**
 * Validate string length
 */
export function validateLength(
  value: string,
  min: number,
  max: number,
  fieldName: string = "Field"
): ValidationResult {
  if (!value || typeof value !== "string") {
    return { valid: false, error: `${fieldName} wajib diisi` };
  }

  if (value.length < min) {
    return { valid: false, error: `${fieldName} minimal ${min} karakter` };
  }

  if (value.length > max) {
    return { valid: false, error: `${fieldName} maksimal ${max} karakter` };
  }

  return { valid: true };
}

/**
 * Validate file upload
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[]; // MIME types
    allowedExtensions?: string[];
  } = {}
): ValidationResult {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
    allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"],
  } = options;

  if (!file) {
    return { valid: false, error: "File wajib diisi" };
  }

  // Check size
  if (file.size > maxSize) {
    const maxMB = (maxSize / 1024 / 1024).toFixed(1);
    return { valid: false, error: `Ukuran file maksimal ${maxMB}MB` };
  }

  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Tipe file tidak diizinkan. Hanya: ${allowedTypes.join(", ")}`,
    };
  }

  // Check extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some((ext) =>
    fileName.endsWith(ext)
  );

  if (!hasValidExtension) {
    return {
      valid: false,
      error: `Ekstensi file tidak diizinkan. Hanya: ${allowedExtensions.join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Validate integer
 */
export function validateInteger(
  value: any,
  fieldName: string = "Field"
): ValidationResult {
  const num = Number.parseInt(value, 10);

  if (Number.isNaN(num)) {
    return { valid: false, error: `${fieldName} harus berupa angka` };
  }

  return { valid: true };
}

/**
 * Validate coordinates (latitude, longitude)
 */
export function validateCoordinates(
  lat: number,
  lng: number
): ValidationResult {
  if (typeof lat !== "number" || typeof lng !== "number") {
    return { valid: false, error: "Koordinat harus berupa angka" };
  }

  if (lat < -90 || lat > 90) {
    return { valid: false, error: "Latitude harus antara -90 dan 90" };
  }

  if (lng < -180 || lng > 180) {
    return { valid: false, error: "Longitude harus antara -180 dan 180" };
  }

  return { valid: true };
}

/**
 * Validate wilayah_id (must be positive integer)
 */
export function validateWilayahId(wilayahId: any): ValidationResult {
  const num = Number.parseInt(wilayahId, 10);

  if (Number.isNaN(num) || num < 1) {
    return { valid: false, error: "Wilayah tidak valid" };
  }

  return { valid: true };
}
