import { useState, useRef } from 'react';
import { useStationSearch } from './useStationSearch';
import { useAppStore } from '@/store/app.store';
import type { Station } from '@/api/types';

export function StationSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { results, isLoading } = useStationSearch(query);
  const setSelectedStation = useAppStore((state) => state.setSelectedStation);

  const handleSelect = (station: Station) => {
    setSelectedStation(station);
    setQuery('');
    setIsOpen(false);
  };

  const handleChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length >= 2);
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    if (query.length >= 2) setIsOpen(true);
  };

  const showDropdown = isOpen && query.length >= 2;

  return (
    <div className="relative w-full">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          placeholder="Search stations..."
          aria-label="Search stations"
          className="w-full rounded-md border border-gray-200 bg-white py-2 pl-9 pr-8 text-sm outline-none focus:border-gray-400 focus:ring-0"
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-md">
          {results.length === 0 && !isLoading && (
            <div className="px-3 py-4 text-center text-sm text-gray-400">
              No stations found
            </div>
          )}
          {results.map((station) => (
            <button
              key={station.id}
              onMouseDown={() => handleSelect(station)}
              className="flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-gray-50"
            >
              <span className="font-medium text-gray-800">{station.name}</span>
              {station.coordinates && (
                <span className="text-xs text-gray-400">
                  {station.coordinates.lat.toFixed(3)}, {station.coordinates.lng.toFixed(3)}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
