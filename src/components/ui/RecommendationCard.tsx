import React from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  description: string;
  impact?: 'alto' | 'medio' | 'baixo';
  actionLabel?: string;
  onAction?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  impact = 'alto',
  actionLabel = 'Aplicar no Plano de Ação',
  onAction,
}) => {
  const impactConfig = {
    alto: { label: 'Impacto Alto', badgeClass: 'bg-neutral-100 text-neutral-950 font-bold' },
    medio: { label: 'Impacto Médio', badgeClass: 'bg-neutral-800 text-neutral-300' },
    baixo: { label: 'Impacto Baixo', badgeClass: 'bg-neutral-900 text-neutral-500' },
  };

  return (
    <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-neutral-800 text-neutral-200">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="font-display font-semibold text-sm sm:text-base text-neutral-100">
              {title}
            </h4>
          </div>
          <span
            className={`text-[10px] uppercase font-display tracking-wider px-2 py-0.5 rounded ${impactConfig[impact].badgeClass}`}
          >
            {impactConfig[impact].label}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-2">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onAction}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-200 hover:text-white transition-colors"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
