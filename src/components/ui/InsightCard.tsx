import React from 'react';
import { Sparkles, AlertCircle, TrendingUp, Compass } from 'lucide-react';
import { OperationalInsight } from '../../types';

interface InsightCardProps {
  insight: OperationalInsight;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getIcon = () => {
    switch (insight.type) {
      case 'positivo':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'alerta':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'oportunidade':
        return <Compass className="w-4 h-4 text-neutral-300" />;
      case 'projecao':
      default:
        return <Sparkles className="w-4 h-4 text-neutral-200" />;
    }
  };

  const getBorderClass = () => {
    switch (insight.type) {
      case 'alerta':
        return 'border-amber-900/40 bg-amber-950/10';
      case 'positivo':
        return 'border-emerald-900/40 bg-emerald-950/10';
      default:
        return 'border-neutral-800 bg-neutral-900/40';
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-xl border transition-all ${getBorderClass()} hover:border-neutral-700`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60">
            {getIcon()}
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-300 font-display">
            {insight.title}
          </span>
        </div>
        {insight.metric && (
          <span className="text-xs font-display font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-100 border border-neutral-700">
            {insight.metric}
          </span>
        )}
      </div>

      <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        {insight.description}
      </p>

      {insight.actionableRecommendation && (
        <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-start gap-2 text-xs text-neutral-400">
          <span className="font-semibold text-neutral-200 shrink-0">Ação recomendada:</span>
          <span>{insight.actionableRecommendation}</span>
        </div>
      )}
    </div>
  );
};
