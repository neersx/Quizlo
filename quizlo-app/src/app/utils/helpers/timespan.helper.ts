export function GetTimeSpan(seconds: number): string {
    const h = Math.floor(seconds / 3600)
                .toString()
                .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
                .toString()
                .padStart(2, '0');
    const s = (seconds % 60)
                .toString()
                .padStart(2, '0');
    return `${h}:${m}:${s}`;        // e.g. "01:10:00"
}

export function getSecondsFromTimeSpan(timeSpan: string | undefined): number {
  if (!timeSpan) {
    return 0;
  }
  const parts = timeSpan.split(':').map(Number);

  if (parts.length !== 3) {
    throw new Error('Invalid TimeSpan format. Expected HH:MM:SS');
  }

  const [hours, minutes, seconds] = parts;

  return hours * 3600 + minutes * 60 + seconds;
}