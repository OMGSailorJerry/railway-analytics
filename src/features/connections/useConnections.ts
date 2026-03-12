import { useQuery } from '@tanstack/react-query';
import { getConnections } from '@/api/transport-api';
import { mapRawConnectionToConnection } from '@/api/mappers/connection.mapper';
import type { Connection } from '@/api/types';

interface UseConnectionsResult {
  connections: Connection[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch connections between two stations
 */
export function useConnections(
  from: string | null,
  to: string | null
): UseConnectionsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ['connections', from, to],
    queryFn: async () => {
      if (!from || !to) {
        return [];
      }

      const rawConnections = await getConnections(from, to);
      return rawConnections.connections.map(mapRawConnectionToConnection);
    },
    enabled: !!from && !!to,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    connections: data || [],
    isLoading,
    error: error as Error | null,
  };
}
