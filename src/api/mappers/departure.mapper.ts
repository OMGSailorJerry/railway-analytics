import type { RawStationBoardEntry, Departure } from '../types';

/**
 * Map raw stationboard entry to domain Departure type
 */
export function mapRawStationBoardEntryToDeparture(
  raw: RawStationBoardEntry
): Departure {
  const departureTime = raw.stop.departure || raw.stop.arrival || '';
  const delay = raw.stop.delay !== null ? raw.stop.delay : null;
  const platform =
    raw.stop.prognosis?.platform || raw.stop.platform || null;

  // Create unique ID from multiple fields
  const id = `${raw.category}${raw.number}-${departureTime}-${raw.to}`;

  return {
    id,
    name: `${raw.category} ${raw.number}`,
    category: raw.category,
    to: raw.to,
    departure: departureTime,
    delay,
    platform,
    cancelled: false, // API doesn't always provide this explicitly
  };
}
