import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  id?: string;
  label: string;
  value: string | number;
  secondaryValue?: string;
  change?: number; // e.g. 8.4 or -2.1
  changeLabel?: string;
  icon?: LucideIcon;
  subtext?: string;
  highlight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  label,
  value,
  secondaryValue,
  change,
  changeLabel = 'vs. mês anterior',
  icon: Icon,
  subtext,
  highlight = false,
}) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      id={id}
      className={`relative p-5 sm:p-6 rounded-xl border transition-all duration-200 ${
        highlight
          ? 'bg-neutral-900/90 border-neutral-700 shadow-xl'
          : 'bg-neutral-900/40 border-neutral-800/90 hover:border-neutral-700'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          {label}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-50">
          {value}
        </div>
        {secondaryValue && (
          <span className="text-xs text-neutral-400 font-medium">
            / {secondaryValue}
          </span>
        )}
      </div>

      {(change !== undefined || subtext) && (
        <div className="mt-3 flex items-center gap-2 text-xs flex-wrap">
          {change !== undefined && (
            <span
              className={`inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded text-[11px] ${
                isPositive
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/30'
                  : 'text-amber-400 bg-amber-950/40 border border-amber-800/30'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {isPositive ? `+${change}%` : `${change}%`}
            </span>
          )}
          {subtext && <span className="text-neutral-400">{subtext}</span>}
          {change !== undefined && !subtext && (
            <span className="text-neutral-500">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
};
