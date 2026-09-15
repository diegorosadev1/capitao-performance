import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 sm:p-14 text-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900/20">
      <div className="w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-display font-semibold text-base text-neutral-200">{title}</h4>
      <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mt-1 mb-5">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-neutral-100 text-neutral-950 hover:bg-white transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
