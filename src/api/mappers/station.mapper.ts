import type { RawLocation, Station } from '../types';

/**
 * Convert Swiss coordinate system (LV03) to WGS84 (lat/lng)
 * Approximation formula from swisstopo documentation
 */
function swissToWGS84(x: number, y: number): { lat: number; lng: number } {
  // Convert to meters (divide by 1000000 if needed)
  const yPrime = (x - 600000) / 1000000;
  const xPrime = (y - 200000) / 1000000;

  // Calculate longitude
  const lng =
    2.6779094 +
    4.728982 * yPrime +
    0.791484 * yPrime * xPrime +
    0.1306 * yPrime * Math.pow(xPrime, 2) -
    0.0436 * Math.pow(yPrime, 3);

  // Calculate latitude
  const lat =
    16.9023892 +
    3.238272 * xPrime -
    0.270978 * Math.pow(yPrime, 2) -
    0.002528 * Math.pow(xPrime, 2) -
    0.0447 * Math.pow(yPrime, 2) * xPrime -
    0.014 * Math.pow(xPrime, 3);

  return {
    lat: lat * 100 / 36,
    lng: lng * 100 / 36,
  };
}

/**
 * Map raw API location to domain Station type
 */
export function mapRawLocationToStation(raw: RawLocation): Station {
  return {
    id: raw.id ?? raw.name,
    name: raw.name,
    coordinates: raw.coordinate
      ? { lat: raw.coordinate.x, lng: raw.coordinate.y }
      : null,
  };
}
