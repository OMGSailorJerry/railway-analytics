import type { RawConnection, Connection, ConnectionLeg } from '../types';
import { mapRawLocationToStation } from './station.mapper';

/**
 * Map raw connection to domain Connection type
 */
export function mapRawConnectionToConnection(raw: RawConnection): Connection {
  const from = mapRawLocationToStation(raw.from);
  const to = mapRawLocationToStation(raw.to);

  const legs: ConnectionLeg[] = raw.sections.map((section) => {
    const legFrom = mapRawLocationToStation(section.departure.station);
    const legTo = mapRawLocationToStation(section.arrival.station);

    // Determine if it's a walk or a journey
    const isWalk = section.walk !== null;
    const category = isWalk ? 'Walk' : section.journey?.category || 'Unknown';
    const name = isWalk ? 'Walking' : section.journey?.name || 'Unknown';

    return {
      departure: section.departure.departure,
      arrival: section.arrival.arrival,
      from: legFrom,
      to: legTo,
      duration: isWalk ? section.walk?.duration || '0' : '',
      category,
      name,
    };
  });

  // Get first departure and last arrival timestamps
  const departureTimestamp =
    raw.sections.length > 0 ? raw.sections[0].departure.departure : '';
  const arrivalTimestamp =
    raw.sections.length > 0
      ? raw.sections[raw.sections.length - 1].arrival.arrival
      : '';

  return {
    from,
    to,
    duration: raw.duration,
    transfers: raw.transfers,
    departureTimestamp,
    arrivalTimestamp,
    legs,
  };
}
