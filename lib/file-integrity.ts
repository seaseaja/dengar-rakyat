/**
 * File Integrity Check - Iterasi 3 P5
 * - SHA-256 hash verification for uploaded files
 * - Magic bytes validation (file type verification)
 * - File size validation
 */

import crypto from "crypto";

/**
 * Allowed file types with their magic bytes signatures
 */
const ALLOWED_TYPES: Record<string, number[]> = {
  "image/jpeg": [0xFF, 0xD8, 0xFF],
  "image/png": [0x89, 0x50, 0x4E, 0x47],
};

/**
 * Calculate SHA-256 hash of file buffer
 */
export function calculateFileHash(buffer: Buffer): string {
  const hash = crypto.createHash("sha256");
  hash.update(buffer);
  return hash.digest("hex");
}

/**
 * Verify file integrity by comparing hashes
 */
export function verifyFileHash(
  calculatedHash: string,
  expectedHash: string
): boolean {
  // Use timing-safe comparison
  try {
    return crypto.timingSafeEqual(
      Buffer.from(calculatedHash, "hex"),
      Buffer.from(expectedHash, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Validate file type using magic bytes (not just MIME type)
 * This prevents file disguise attacks (e.g., .exe renamed to .jpg)
 */
export function validateFileType(buffer: Buffer, mimeType: string): boolean {
  const magicBytes = ALLOWED_TYPES[mimeType];
  
  if (!magicBytes) {
    return false; // Type not allowed
  }
  
  // Check if file starts with expected magic bytes
  for (let i = 0; i < magicBytes.length; i++) {
    if (buffer[i] !== magicBytes[i]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get proper file extension based on MIME type
 */
export function getFileExtension(mimeType: string): string | null {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    default:
      return null;
  }
}
