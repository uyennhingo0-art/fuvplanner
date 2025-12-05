interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ current, total, showLabel = false, height = 'sm' }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  const isComplete = current >= total;
  const isOverflow = current > total;

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} rounded-full transition-all duration-300 ${
            isOverflow ? 'bg-red-500' : isComplete ? 'bg-green-500' : 'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 mt-1">
          {current} / {total} credits
          {isOverflow && <span className="text-red-500 ml-1">(Exceeds requirement)</span>}
        </p>
      )}
    </div>
  );
}

interface CircularProgressProps {
  current: number;
  total: number;
  size?: number;
}

export function CircularProgress({ current, total, size = 120 }: CircularProgressProps) {
  const percentage = Math.min((current / total) * 100, 100);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E1E1DE"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#242B68"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-primary">{current}</span>
        <span className="text-sm text-gray-500">/ {total}</span>
      </div>
    </div>
  );
}
