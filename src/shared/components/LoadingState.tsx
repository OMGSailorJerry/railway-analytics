import { cn } from '../utils/cn';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = 'Loading...',
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({ message, retry, className }: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-destructive"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Error</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {retry && (
          <button
            onClick={retry}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
