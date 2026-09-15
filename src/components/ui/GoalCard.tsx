import React from 'react';
import { Target, Calendar, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { Goal } from '../../types';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

interface GoalCardProps {
  goal: Goal;
  subtitle?: string;
  onViewDetails?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  subtitle,
  onViewDetails,
}) => {
  const isReached = goal.progressPercentage >= 100;

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 sm:p-6 transition-all hover:border-neutral-700">
      <div className="flex items-start justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-display font-semibold text-base text-neutral-100">
              {goal.title}
            </h4>
            <StatusBadge status={goal.status} />
          </div>
          {subtitle && (
            <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center text-xs text-neutral-400 gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{goal.deadline}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-lg bg-neutral-950/80 border border-neutral-800/80 mb-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
            Meta
          </span>
          <p className="font-display font-bold text-sm sm:text-base text-neutral-100">
            R$ {goal.targetAmount.toLocaleString('pt-BR')}
          </p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
            Realizado
          </span>
          <p className="font-display font-bold text-sm sm:text-base text-neutral-100">
            R$ {goal.currentAmount.toLocaleString('pt-BR')}
          </p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
            Restante
          </span>
          <p className="font-display font-bold text-sm sm:text-base text-neutral-300">
            {isReached ? 'R$ 0 (Superada!)' : `R$ ${goal.remainingAmount.toLocaleString('pt-BR')}`}
          </p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
            Projeção
          </span>
          <p className="font-display font-bold text-sm sm:text-base text-neutral-200">
            R$ {goal.projectedAmount.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      <ProgressBar
        percentage={goal.progressPercentage}
        label="Progresso da Meta"
        showPercentageText={true}
        variant={isReached ? 'neutral' : goal.status === 'em_risco' ? 'warning' : 'neutral'}
      />

      {/* "Quanto preciso faturar por dia para atingir minha meta?" */}
      <div className="mt-4 pt-3 border-t border-neutral-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {isReached ? (
            <span className="text-emerald-400 font-medium">
              Meta 100% atingida! Foco em acelerar o faturamento excedente.
            </span>
          ) : (
            <>
              <Target className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className="text-neutral-400">
                Ritmo diário necessário:{' '}
                <strong className="text-neutral-100 font-display font-semibold">
                  R$ {goal.dailyRequiredAmount.toLocaleString('pt-BR')} / dia
                </strong>
              </span>
            </>
          )}
        </div>

        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="inline-flex items-center gap-1 text-neutral-300 hover:text-white font-medium transition-colors"
          >
            <span>Ver detalhes</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
