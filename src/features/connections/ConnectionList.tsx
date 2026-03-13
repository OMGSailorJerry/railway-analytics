import { cn } from '@/shared/utils/cn';
import type { Connection } from '@/api/types';
import { formatDuration } from '@/shared/utils/formatDelay';

interface ConnectionListProps {
  connections: Connection[];
  onSelectConnection?: (connection: Connection) => void;
}

export function ConnectionList({
  connections,
  onSelectConnection,
}: ConnectionListProps) {
  if (connections.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-400">No connections available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {connections.map((connection, index) => {
        const departureTime = new Date(connection.departureTimestamp);
        const arrivalTime = new Date(connection.arrivalTimestamp);

        return (
          <div
            key={index}
            onClick={() => onSelectConnection?.(connection)}
            className={cn(
              'rounded-lg border bg-white p-4 shadow-sm transition-colors',
              onSelectConnection && 'cursor-pointer hover:bg-gray-100'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {departureTime.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <div className="text-xs text-gray-400">
                      {connection.from.name}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col items-center">
                    <div className="text-sm font-medium text-gray-400">
                      {formatDuration(connection.duration)}
                    </div>
                    <div className="my-1 h-px w-full bg-gray-200" />
                    <div className="text-xs text-gray-400">
                      {connection.transfers === 0
                        ? 'Direct'
                        : `${connection.transfers} transfer${connection.transfers > 1 ? 's' : ''}`}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {arrivalTime.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <div className="text-xs text-gray-400">
                      {connection.to.name}
                    </div>
                  </div>
                </div>

                {/* TODO: Expand to show legs */}
                {connection.legs.length > 0 && (
                  <div className="mt-3 text-xs text-gray-400">
                    {connection.legs.map((leg, legIndex) => (
                      <span key={legIndex}>
                        {leg.category} {leg.name}
                        {legIndex < connection.legs.length - 1 && ' → '}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
