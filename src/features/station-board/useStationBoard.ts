import { useQuery } from '@tanstack/react-query';
import { getStationBoard } from '@/api/transport-api';
import { mapRawStationBoardEntryToDeparture } from '@/api/mappers/departure.mapper';
import { deriveKPIs } from '@/shared/utils/deriveKPIs';
import type { Departure, StationKPIs } from '@/api/types';

interface UseStationBoardResult {
  departures: Departure[];
  kpis: StationKPIs;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook to fetch station board data with auto-refresh
 */
export function useStationBoard(
  stationId: string | null
): UseStationBoardResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['station-board', stationId],
    queryFn: async () => {
      if (!stationId) {
        return { departures: [], kpis: deriveKPIs([]) };
      }

      const rawStationBoard = await getStationBoard(stationId, 20);
      const departures = rawStationBoard.stationboard.map(
        mapRawStationBoardEntryToDeparture
      );
      const kpis = deriveKPIs(departures);

      return { departures, kpis };
    },
    enabled: !!stationId,
    refetchInterval: 60_000, // Refresh every 60 seconds
    staleTime: 30_000, // Consider data stale after 30 seconds
  });

  return {
    departures: data?.departures || [],
    kpis: data?.kpis || deriveKPIs([]),
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
