import type { Departure, StationKPIs } from '@/api/types';

/**
 * Calculate KPIs from departure data
 * @param departures - Array of departures
 * @returns Calculated KPIs
 */
export function deriveKPIs(departures: Departure[]): StationKPIs {
  if (departures.length === 0) {
    return {
      onTimeRate: 0,
      nextDepartureInMinutes: null,
      departuresNextHour: 0,
      averageDelayMinutes: 0,
    };
  }

  // Calculate on-time rate (departures with delay <= 0 or null)
  const onTimeDepartures = departures.filter(
    (d) => !d.cancelled && (d.delay === null || d.delay === 0)
  );
  const onTimeRate = (onTimeDepartures.length / departures.length) * 100;

  // Calculate next departure in minutes
  const now = new Date();
  let nextDepartureInMinutes: number | null = null;

  for (const departure of departures) {
    if (departure.cancelled) continue;

    try {
      const departureTime = new Date(departure.departure);
      const minutesUntil = Math.floor(
        (departureTime.getTime() - now.getTime()) / 1000 / 60
      );

      if (minutesUntil >= 0) {
        nextDepartureInMinutes = minutesUntil;
        break;
      }
    } catch {
      // Invalid date, skip
    }
  }

  // Calculate departures in next hour
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
  const departuresNextHour = departures.filter((d) => {
    if (d.cancelled) return false;
    try {
      const departureTime = new Date(d.departure);
      return departureTime >= now && departureTime <= oneHourFromNow;
    } catch {
      return false;
    }
  }).length;

  // Calculate average delay
  const delayedDepartures = departures.filter(
    (d) => !d.cancelled && d.delay !== null
  );
  const totalDelay = delayedDepartures.reduce(
    (sum, d) => sum + (d.delay || 0),
    0
  );
  const averageDelayMinutes =
    delayedDepartures.length > 0
      ? totalDelay / delayedDepartures.length
      : 0;

  return {
    onTimeRate: Math.round(onTimeRate),
    nextDepartureInMinutes,
    departuresNextHour,
    averageDelayMinutes: Math.round(averageDelayMinutes),
  };
}
