import { create } from 'zustand';
import type { Station } from '@/api/types';

export type ActiveTab = 'departures' | 'arrivals' | 'connections';

interface AppState {
  selectedStation: Station | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  activeTab: ActiveTab;
  setSelectedStation: (station: Station | null) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  setMapZoom: (zoom: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

// Default center: Switzerland (Bern area)
const DEFAULT_MAP_CENTER = { lat: 46.8, lng: 8.2 };
const DEFAULT_MAP_ZOOM = 8;

export const useAppStore = create<AppState>((set) => ({
  selectedStation: null,
  mapCenter: DEFAULT_MAP_CENTER,
  mapZoom: DEFAULT_MAP_ZOOM,
  activeTab: 'departures',

  setSelectedStation: (station) => {
    set({
      selectedStation: station,
      ...(station?.coordinates && {
        mapCenter: station.coordinates,
        mapZoom: 12,
      }),
    });
  },

  setMapCenter: (center) => set({ mapCenter: center }),

  setMapZoom: (zoom) => set({ mapZoom: zoom }),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));
