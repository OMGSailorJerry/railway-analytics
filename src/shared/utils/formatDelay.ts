/**
 * Format delay in minutes with appropriate sign and unit
 * @param delay - Delay in minutes (positive = late, negative = early, null = on time)
 * @returns Formatted delay string
 */
export function formatDelay(delay: number | null): string {
  if (delay === null || delay === 0) {
    return 'On time';
  }

  if (delay > 0) {
    return `+${delay} min`;
  }

  return `${delay} min`;
}

/**
 * Format delay with color class based on severity
 * @param delay - Delay in minutes
 * @returns Tailwind color class
 */
export function getDelayColorClass(delay: number | null): string {
  if (delay === null || delay === 0) {
    return 'text-green-600';
  }

  if (delay > 0 && delay <= 5) {
    return 'text-yellow-600';
  }

  if (delay > 5) {
    return 'text-red-600';
  }

  return 'text-green-600'; // Early
}
