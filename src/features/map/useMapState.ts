import { create } from 'zustand';

interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
}

const DEFAULT_CENTER = { lat: 46.8, lng: 8.2 };
const DEFAULT_ZOOM = 8;

export const useMapState = create<MapState>((set) => ({
  center: DEFAULT_CENTER,
  zoom: DEFAULT_ZOOM,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
}));
