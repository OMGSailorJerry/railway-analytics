import { useStationBoard } from './useStationBoard';
import { DataTable } from '@/shared/components/DataTable';
import { LoadingState, ErrorState } from '@/shared/components/LoadingState';
import { formatDelay, getDelayColorClass } from '@/shared/utils/formatDelay';
import type { Departure } from '@/api/types';

interface StationBoardProps {
  stationId: string | null;
  stationName: string | null;
}

export function StationBoard({ stationId, stationName }: StationBoardProps) {
  const { departures, isLoading, error, refetch } =
    useStationBoard(stationId);

  if (!stationId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-400">
          Select a station to view departures
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState message="Loading station board..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error.message || 'Failed to load station board'}
        retry={refetch}
      />
    );
  }

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{stationName}</h2>
          <p className="text-sm text-gray-400">
            Live departures • Updated every minute
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Refresh
        </button>
      </div>

      <div className="flex-1 overflow-auto rounded-md border">
        <DataTable<Departure>
          data={departures}
          keyExtractor={(departure) => departure.id}
          columns={[
            {
              key: 'time',
              header: 'Time',
              render: (departure) => {
                const time = new Date(departure.departure);
                return (
                  <div className="font-mono">
                    {time.toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                );
              },
            },
            {
              key: 'train',
              header: 'Train',
              render: (departure) => (
                <div>
                  <div className="font-medium">{departure.name}</div>
                  <div className="text-xs text-gray-400">
                    {departure.category}
                  </div>
                </div>
              ),
            },
            {
              key: 'to',
              header: 'To',
              render: (departure) => (
                <div className="font-medium">{departure.to}</div>
              ),
            },
            {
              key: 'platform',
              header: 'Platform',
              render: (departure) => (
                <div className="text-center font-medium">
                  {departure.platform || '-'}
                </div>
              ),
              className: 'text-center',
            },
            {
              key: 'delay',
              header: 'Status',
              render: (departure) => (
                <div className={getDelayColorClass(departure.delay)}>
                  {departure.cancelled ? (
                    <span className="font-medium text-red-600">Cancelled</span>
                  ) : (
                    <span className="font-medium">
                      {formatDelay(departure.delay)}
                    </span>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
