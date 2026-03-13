import { useAppStore } from "@/store/app.store"
import { StationBoard } from "@/features/station-board/StationBoard";

export function MainPanel() {
    const selectedStation = useAppStore((state) => state.selectedStation);

    if (selectedStation) {
        return (
            <StationBoard stationId={selectedStation.id} stationName={selectedStation.name} />
        )
    } else {
        return (
            <div className="flex-full overflow-auto p-4">
                <p className="text-sm text-gray-400">Select a station to view departures</p>
            </div>
        )
    }
}
