import type {
  RawLocation,
  RawStationBoard,
  RawConnections,
} from './types';

const BASE_URL = 'https://transport.opendata.ch/v1';

/**
 * Search for locations (stations, addresses, POIs) by query string
 */
export async function searchLocations(query: string): Promise<RawLocation[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const url = new URL(`${BASE_URL}/locations`);
    url.searchParams.set('query', query);
    url.searchParams.set('type', 'station');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to search locations: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.stations || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error searching locations: ${error.message}`);
    }
    throw new Error('Unknown error searching locations');
  }
}

/**
 * Get departures/arrivals for a specific station
 */
export async function getStationBoard(
  stationId: string,
  limit: number = 20
): Promise<RawStationBoard> {
  if (!stationId) {
    throw new Error('Station ID is required');
  }

  try {
    const url = new URL(`${BASE_URL}/stationboard`);
    url.searchParams.set('station', stationId);
    url.searchParams.set('limit', limit.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Failed to fetch station board: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching station board: ${error.message}`);
    }
    throw new Error('Unknown error fetching station board');
  }
}

/**
 * Get connections between two stations
 */
export async function getConnections(
  from: string,
  to: string,
  datetime: string = new Date().toISOString()
): Promise<RawConnections> {
  if (!from || !to) {
    throw new Error('From and to stations are required');
  }

  try {
    const url = new URL(`${BASE_URL}/connections`);
    url.searchParams.set('from', from);
    url.searchParams.set('to', to);
    url.searchParams.set('limit', '6');

    if (datetime) {
      url.searchParams.set('datetime', datetime);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch connections: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching connections: ${error.message}`);
    }
    throw new Error('Unknown error fetching connections');
  }
}
