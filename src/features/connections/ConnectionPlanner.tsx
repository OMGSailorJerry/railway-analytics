import { useState } from 'react';
import { useConnections } from './useConnections';
import { ConnectionList } from './ConnectionList';
import { LoadingState, ErrorState } from '@/shared/components/LoadingState';
import { useStationSearch } from '../station-search/useStationSearch';
import { cn } from '@/shared/utils/cn';
import type { Station } from '@/api/types';

export function ConnectionPlanner() {
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [fromStation, setFromStation] = useState<Station | null>(null);
  const [toStation, setToStation] = useState<Station | null>(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromResults = useStationSearch(fromQuery);
  const toResults = useStationSearch(toQuery);

  const { connections, isLoading, error } = useConnections(
    fromStation?.name || null,
    toStation?.name || null
  );

  const handleSelectFrom = (station: Station) => {
    setFromStation(station);
    setFromQuery(station.name);
    setShowFromDropdown(false);
  };

  const handleSelectTo = (station: Station) => {
    setToStation(station);
    setToQuery(station.name);
    setShowToDropdown(false);
  };

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      <div>
        <h2 className="text-2xl font-bold">Connection Planner</h2>
        <p className="text-sm text-gray-400">
          Find connections between stations
        </p>
      </div>

      {/* From/To inputs */}
      <div className="grid grid-cols-2 gap-4">
        {/* From station */}
        <div className="relative">
          <label className="mb-2 block text-sm font-medium">From</label>
          <input
            type="text"
            value={fromQuery}
            onChange={(e) => {
              setFromQuery(e.target.value);
              setShowFromDropdown(true);
            }}
            onFocus={() => setShowFromDropdown(true)}
            placeholder="Departure station"
            className="flex w-full cursor-pointer items-center rounded-sm px-3 py-2 text-sm hover:bg-gray-100"
          />
          {showFromDropdown && fromQuery && (
            <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white p-1 shadow-md">
              {fromResults.isLoading && (
                <div className="px-3 py-2 text-sm text-gray-400">
                  Loading...
                </div>
              )}
              {fromResults.results.length === 0 && !fromResults.isLoading && (
                <div className="px-3 py-2 text-sm text-gray-400">
                  No stations found
                </div>
              )}
              {fromResults.results.map((station) => (
                <button
                  key={station.id}
                  onClick={() => handleSelectFrom(station)}
                  className={cn(
                    'flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none',
                    'hover:bg-gray-100 hover:text-accent-foreground'
                  )}
                >
                  {station.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To station */}
        <div className="relative">
          <label className="mb-2 block text-sm font-medium">To</label>
          <input
            type="text"
            value={toQuery}
            onChange={(e) => {
              setToQuery(e.target.value);
              setShowToDropdown(true);
            }}
            onFocus={() => setShowToDropdown(true)}
            placeholder="Arrival station"
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {showToDropdown && toQuery && (
            <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white p-1 shadow-md">
              {toResults.isLoading && (
                <div className="px-3 py-2 text-sm text-gray-400">
                  Loading...
                </div>
              )}
              {toResults.results.length === 0 && !toResults.isLoading && (
                <div className="px-3 py-2 text-sm text-gray-400">
                  No stations found
                </div>
              )}
              {toResults.results.map((station) => (
                <button
                  key={station.id}
                  onClick={() => handleSelectTo(station)}
                  className={cn(
                    'flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none',
                    'hover:bg-gray-100 hover:text-accent-foreground'
                  )}
                >
                  {station.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        {!fromStation || !toStation ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">
              Select departure and arrival stations
            </p>
          </div>
        ) : isLoading ? (
          <LoadingState message="Searching connections..." />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : (
          <ConnectionList connections={connections} />
        )}
      </div>
    </div>
  );
}
