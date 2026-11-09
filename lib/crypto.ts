import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

/**
 * Get encryption key dari environment variable
 * Key harus 32 byte (64 karakter hex)
 */
function getKey(): Buffer {
  const hex = process.env.ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) {
    throw new Error("ENCRYPTION_KEY harus 64 karakter hex (32 byte) di .env.local");
  }
  return Buffer.from(hex, "hex");
}

/**
 * Get HMAC key dari environment variable
 */
function getHmacKey(): Buffer {
  const hex = process.env.HMAC_KEY;
  if (!hex) throw new Error("HMAC_KEY belum diset di .env.local");
  return Buffer.from(hex, "hex");
}

/**
 * Enkripsi data menggunakan AES-256-GCM
 * Format output: IV (12 byte) + AuthTag (16 byte) + Ciphertext
 * @param plain Plaintext yang akan dienkripsi
 * @returns Base64-encoded encrypted data
 */
export function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12); // 96-bit IV untuk GCM
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  
  // Gabung: IV + AuthTag + Encrypted data
  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

/**
 * Dekripsi data yang dienkripsi dengan encrypt()
 * @param payload Base64-encoded encrypted data
 * @returns Decrypted plaintext
 */
export function decrypt(payload: string): string {
  const buf = Buffer.from(payload, "base64");
  const iv = buf.subarray(0, 12);
  const authTag = buf.subarray(12, 28); // 16-byte auth tag (128-bit)
  const encrypted = buf.subarray(28);
  
  // Validate auth tag length before decryption (GCM security requirement)
  if (authTag.length !== 16) {
    throw new Error("Invalid authentication tag length. Expected 16 bytes for GCM mode.");
  }
  
  // deepcode ignore InsecureCipher: Auth tag length validated above, 16-byte tag is set
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  
  return decrypted.toString("utf8");
}

/**
 * Generate HMAC hash untuk indexing (cari data tanpa decrypt)
 * Digunakan untuk NIK hash sebagai index pencarian
 * @param value String yang akan di-hash
 * @returns Hex-encoded HMAC-SHA256 hash
 */
export function hmacHash(value: string): string {
  return crypto.createHmac("sha256", getHmacKey()).update(value).digest("hex");
}
