import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  subLabel?: string;
  showPercentageText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'neutral' | 'success' | 'warning' | 'alert';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  subLabel,
  showPercentageText = true,
  size = 'md',
  variant = 'neutral',
}) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  // Discreet indicator colors (pure premium grayscale with subtle status)
  const barColors = {
    neutral: clampedPercentage >= 100 ? 'bg-neutral-100' : 'bg-neutral-300',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    alert: 'bg-rose-400',
  };

  const activeColor =
    variant === 'neutral'
      ? clampedPercentage >= 100
        ? 'bg-neutral-100'
        : clampedPercentage >= 80
        ? 'bg-neutral-200'
        : 'bg-neutral-400'
      : barColors[variant];

  return (
    <div className="w-full">
      {(label || showPercentageText) && (
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span className="font-medium text-neutral-300">{label}</span>
          <div className="flex items-center gap-1.5">
            {subLabel && <span className="text-neutral-500 text-[11px]">{subLabel}</span>}
            {showPercentageText && (
              <span className="font-semibold text-neutral-100 font-display">
                {percentage.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      )}
      <div className={`w-full bg-neutral-800 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${activeColor}`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
};
