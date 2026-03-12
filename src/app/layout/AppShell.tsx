import { Sidebar } from './Sidebar';
import { MainPanel } from './MainPanel';
import { RailMap } from '@/features/map/RailMap';
import { StationSearch } from '@/features/station-search/StationSearch';
import { useAppStore } from '@/store/app.store';

export function AppShell() {
  const selectedStation = useAppStore((state) => state.selectedStation);
  const stations = selectedStation ? [selectedStation] : [];

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center gap-4 border-b bg-white px-4">
        <span className="text-sm font-semibold whitespace-nowrap">Rail Analytics</span>
        <div className="flex-1 max-w-md mx-auto">
          <StationSearch />
        </div>
        <span className="text-sm text-gray-400 whitespace-nowrap">Plan route</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="h-1/2 border-b">
            <RailMap stations={stations} />
          </div>
          <div className="h-1/2 overflow-auto">
            <MainPanel />
          </div>
        </div>

        <div className="flex w-[220px] shrink-0 flex-col border-l bg-gray-50">
          <div className="border-b p-4">
            <h2 className="text-sm font-semibold">Quick Stats</h2>
          </div>
          <div className="flex-1 p-4">
            <p className="text-xs text-gray-400">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
