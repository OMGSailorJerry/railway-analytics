import { useQuery } from '@tanstack/react-query';
import { searchLocations } from '@/api/transport-api';
import { mapRawLocationToStation } from '@/api/mappers/station.mapper';
import { useDebounce } from '@/shared/hooks/useDebounce';
import type { Station } from '@/api/types';

interface UseStationSearchResult {
  results: Station[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to search for stations with debounced query
 */
export function useStationSearch(query: string): UseStationSearchResult {
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ['station-search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) {
        return [];
      }
      const rawLocations = await searchLocations(debouncedQuery);
      return rawLocations.map(mapRawLocationToStation);
    },
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    results: data || [],
    isLoading,
    error: error as Error | null,
  };
}
