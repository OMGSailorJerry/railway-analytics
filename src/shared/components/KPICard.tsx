import { cn } from '../utils/cn';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export function KPICard({ title, value, subtitle, className }: KPICardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
        className
      )}
    >
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
