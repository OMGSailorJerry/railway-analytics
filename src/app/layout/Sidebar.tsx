import { useAppStore } from "@/store/app.store"
import { useStationBoard } from "@/features/station-board/useStationBoard";
import { StationKPIsDisplay } from "@/features/station-board/StationKPIs";

export function Sidebar() {
    const selectedStation = useAppStore((state) => state.selectedStation);
    const { kpis, isLoading } = useStationBoard(selectedStation?.id || null);

  return (
    <div className="flex w-[280px] shrink-0 flex-col border-r bg-gray-50">
        <div className="border-b p-4">
            {selectedStation ? (
                <p  className="text-sm font-semibold text-gray-800">{selectedStation.name}</p>
            ) : (
                <p className="text-sm text-gray-400">No station selected</p>
            )}
        </div>

        {isLoading && (
            <div className="p-4 text-xs text-gray-400">Loading KPIs...</div>
        )} 
        {!isLoading && selectedStation && (
            <StationKPIsDisplay kpis={kpis} />
        )}
    </div>
  )
}
