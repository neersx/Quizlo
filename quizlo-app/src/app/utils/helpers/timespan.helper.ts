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