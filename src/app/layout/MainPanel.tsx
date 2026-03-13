import { useAppStore } from '@/store/app.store';
import { StationBoard } from '@/features/station-board/StationBoard';
import { ConnectionPlanner } from '@/features/connections/ConnectionPlanner';

export function MainPanel() {
  const selectedStation = useAppStore((state) => state.selectedStation);
  const activeTab = useAppStore((state) => state.activeTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  return (
    <div className="flex h-full flex-col">
      {/* Tabs */}
      <div className="flex shrink-0 border-b">
        <button
          onClick={() => setActiveTab('departures')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'departures'
              ? 'border-b-2 border-gray-800 text-gray-800'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Departures
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'connections'
              ? 'border-b-2 border-gray-800 text-gray-800'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Connections
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'departures' && (
          <>
            {selectedStation ? (
              <StationBoard
                stationId={selectedStation.id}
                stationName={selectedStation.name}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-gray-400">Select a station to view departures</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'connections' && <ConnectionPlanner />}
      </div>
    </div>
  );
}
