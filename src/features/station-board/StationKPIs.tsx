import { KPICard } from '@/shared/components/KPICard';
import type { StationKPIs } from '@/api/types';

interface StationKPIsProps {
  kpis: StationKPIs;
}

export function StationKPIsDisplay({ kpis }: StationKPIsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <KPICard
        title="On-Time Rate"
        value={`${kpis.onTimeRate}%`}
        subtitle="Departures on schedule"
      />
      <KPICard
        title="Next Departure"
        value={
          kpis.nextDepartureInMinutes !== null
            ? `${kpis.nextDepartureInMinutes} min`
            : 'N/A'
        }
        subtitle="Time until next train"
      />
      <KPICard
        title="Departures/Hour"
        value={kpis.departuresNextHour}
        subtitle="In the next 60 minutes"
      />
      <KPICard
        title="Avg Delay"
        value={`${kpis.averageDelayMinutes} min`}
        subtitle="Average delay time"
      />
    </div>
  );
}
