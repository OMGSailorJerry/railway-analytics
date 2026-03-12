import type { RawLocation, Station } from '../types';

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
