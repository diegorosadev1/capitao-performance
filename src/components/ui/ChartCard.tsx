import React from 'react';

interface ChartCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  id,
  title,
  subtitle,
  action,
  children,
  className = '',
}) => {
  return (
    <div
      id={id}
      className={`rounded-xl border border-neutral-800/90 bg-neutral-900/40 p-5 sm:p-6 transition-all duration-200 hover:border-neutral-700/80 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="font-display font-semibold text-base sm:text-lg text-neutral-100 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};
