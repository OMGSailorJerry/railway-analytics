// Domain types for the Railway Analytics Dashboard

export interface Station {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number } | null;
}

export interface Departure {
  id: string;
  name: string;
  category: string;
  to: string;
  departure: string;
  delay: number | null;
  platform: string | null;
  cancelled: boolean;
}

export interface ConnectionLeg {
  departure: string;
  arrival: string;
  from: Station;
  to: Station;
  duration: string;
  category: string;
  name: string;
}

export interface Connection {
  from: Station;
  to: Station;
  duration: string;
  transfers: number;
  departureTimestamp: string;
  arrivalTimestamp: string;
  legs: ConnectionLeg[];
}

export interface StationKPIs {
  onTimeRate: number;
  nextDepartureInMinutes: number | null;
  departuresNextHour: number;
  averageDelayMinutes: number;
}

// Raw API response types from transport.opendata.ch

export interface RawCoordinates {
  type: string;
  x: number; // longitude (API returns x=lng, y=lat — note the inversion)
  y: number; // latitude
}

export interface RawLocation {
  id: string;
  name: string;
  score: number;
  coordinate: RawCoordinates | null;
  distance: number | null;
}

export interface RawStationBoardEntry {
  stop: {
    station: RawLocation;
    departure: string | null;
    arrival: string | null;
    delay: number | null;
    platform: string | null;
    prognosis: {
      platform: string | null;
      departure: string | null;
      arrival: string | null;
      capacity1st: number | null;
      capacity2nd: number | null;
    } | null;
  };
  name: string;
  category: string;
  number: string;
  to: string;
  operator: string;
  passList?: unknown[];
}

export interface RawStationBoard {
  station: RawLocation;
  stationboard: RawStationBoardEntry[];
}

export interface RawSection {
  journey: {
    name: string;
    category: string;
    number: string;
    operator: string;
    to: string;
    passList: unknown[];
  } | null;
  walk: {
    duration: string;
  } | null;
  departure: {
    station: RawLocation;
    departure: string;
    platform: string | null;
    delay: number | null;
    prognosis: {
      platform: string | null;
      departure: string | null;
      capacity1st: number | null;
      capacity2nd: number | null;
    } | null;
  };
  arrival: {
    station: RawLocation;
    arrival: string;
    platform: string | null;
    delay: number | null;
    prognosis: {
      platform: string | null;
      arrival: string | null;
    } | null;
  };
}

export interface RawConnection {
  from: RawLocation;
  to: RawLocation;
  duration: string;
  transfers: number;
  service: unknown;
  products: string[];
  capacity1st: number | null;
  capacity2nd: number | null;
  sections: RawSection[];
}

export interface RawConnections {
  connections: RawConnection[];
  from: RawLocation;
  to: RawLocation;
}
