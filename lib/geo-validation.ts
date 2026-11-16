/**
 * Geo-Tagging Validation & Anti-Flooding System - Iterasi 4
 * Memvalidasi keabsahan koordinat GPS dan membatasi flooding report pada radius yang sama
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface GeoValidationResult {
  valid: boolean;
  isIndonesiaTerritory: boolean;
  error?: string;
  distanceFromPreviousMeters?: number;
}

// Bounding box wilayah Indonesia
const INDONESIA_BOUNDS = {
  minLat: -11.5,
  maxLat: 6.5,
  minLng: 94.5,
  maxLng: 141.5,
};

/**
 * Validasi rentang koordinat GPS dan kesesuaian wilayah Republik Indonesia
 */
export function validateCoordinates(
  latitude: number,
  longitude: number
): GeoValidationResult {
  // Validasi rentang latitude & longitude global
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return {
      valid: false,
      isIndonesiaTerritory: false,
      error: "Koordinat GPS berada di luar jangkauan valid bumi (-90 s/d 90, -180 s/d 180)",
    };
  }

  // Cek apakah di dalam batas teritorial Indonesia
  const inIndonesia =
    latitude >= INDONESIA_BOUNDS.minLat &&
    latitude <= INDONESIA_BOUNDS.maxLat &&
    longitude >= INDONESIA_BOUNDS.minLng &&
    longitude <= INDONESIA_BOUNDS.maxLng;

  if (!inIndonesia) {
    return {
      valid: false,
      isIndonesiaTerritory: false,
      error: "Koordinat lokasi terdeteksi berada di luar wilayah hukum Republik Indonesia.",
    };
  }

  return {
    valid: true,
    isIndonesiaTerritory: true,
  };
}

/**
 * Menghitung jarak antara dua koordinat GPS menggunakan formula Haversine (meter)
 */
export function calculateDistanceMeters(
  coord1: GeoCoordinate,
  coord2: GeoCoordinate
): number {
  const R = 6371e3; // Radius bumi dalam meter
  const lat1Rad = (coord1.latitude * Math.PI) / 180;
  const lat2Rad = (coord2.latitude * Math.PI) / 180;
  const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const deltaLng = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}
