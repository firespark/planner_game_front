export const getPointsBackgroundColor = (points: number) => {
  if (points <= 5) return '#f4e176c2';
  if (points <= 10) return '#e4f476c2';
  if (points <= 15) return '#cdf476c2';
  if (points <= 30) return '#aaf775c2';
  if (points <= 40) return '#75f789c2';
  if (points <= 60) return '#75f7d2c2';
  if (points <= 90) return '#75d9f7c2';
  if (points <= 120) return '#759cf7c2';
  if (points <= 180) return '#9875f7c2';
  if (points <= 240) return '#fb747bc2';
  if (points <= 300) return '#ae5529c2';
  return '#ff4e4ec2';
};

export const getColorByPercentage = (percentage: number): string => {
  if (percentage >= 100) return '#2e7d32';
  if (percentage >= 80) return '#81c784';
  if (percentage >= 50) return '#1976d2';
  if (percentage >= 20) return '#fbc02d';
  return '#d32f2f';
};

export const getBarColor = (percent: number): string => {
  if (percent < 20) return '#f44336';
  if (percent < 50) return '#ff9800';
  if (percent < 80) return '#2196f3';
  if (percent < 100) return '#a5d6a7';
  return '#2e7d32';
};

export function getTodayBoxShadowClass(isToday: boolean): string {
  return isToday ? 'task-list-glow' : '';
}

export function getSegmentColor(type: string): string {
  const colorMap: Record<string, string> = {
    past: '#cfd9e3',
    current: '#19b8d2',
    future: '#98d0b9',
  };
  return colorMap[type] ?? '#ffffff';
}
