import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import { Professional } from '../../types';
import { UserAvatar } from './UserAvatar';
import { ProgressBar } from './ProgressBar';

interface RankingListProps {
  professionals: Professional[];
  onSelectProfessional?: (prof: Professional) => void;
}

export const RankingList: React.FC<RankingListProps> = ({
  professionals,
  onSelectProfessional,
}) => {
  const [metricSort, setMetricSort] = useState<'revenue' | 'appointments' | 'averageTicket'>('revenue');

  const sortedProfessionals = [...professionals].sort((a, b) => {
    if (metricSort === 'revenue') return b.revenue - a.revenue;
    if (metricSort === 'appointments') return b.appointments - a.appointments;
    return b.averageTicket - a.averageTicket;
  });

  const topThree = sortedProfessionals.slice(0, 3);
  const remaining = sortedProfessionals.slice(3);

  const getRankBadge = (pos: number) => {
    switch (pos) {
      case 1:
        return (
          <div className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-950 font-display font-extrabold flex items-center justify-center text-xs shadow-md">
            1º
          </div>
        );
      case 2:
        return (
          <div className="w-7 h-7 rounded-full bg-neutral-300 text-neutral-900 font-display font-bold flex items-center justify-center text-xs">
            2º
          </div>
        );
      case 3:
        return (
          <div className="w-7 h-7 rounded-full bg-neutral-500 text-neutral-950 font-display font-bold flex items-center justify-center text-xs">
            3º
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 font-display font-semibold flex items-center justify-center text-xs">
            {pos}º
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Criteria switch */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Critério do Ranking
        </span>
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
          <button
            onClick={() => setMetricSort('revenue')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              metricSort === 'revenue'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Faturamento
          </button>
          <button
            onClick={() => setMetricSort('appointments')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              metricSort === 'appointments'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Atendimentos
          </button>
          <button
            onClick={() => setMetricSort('averageTicket')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              metricSort === 'averageTicket'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Ticket Médio
          </button>
        </div>
      </div>

      {/* Top 3 Podium (Sophisticated, high-contrast, minimalist) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topThree.map((prof, idx) => {
          const rank = idx + 1;
          const isFirst = rank === 1;

          return (
            <div
              key={prof.id}
              onClick={() => onSelectProfessional?.(prof)}
              className={`relative p-5 rounded-xl border transition-all cursor-pointer ${
                isFirst
                  ? 'bg-neutral-900 border-neutral-700 shadow-xl'
                  : 'bg-neutral-900/40 border-neutral-800/90 hover:border-neutral-700'
              }`}
            >
              {/* Podium Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  {getRankBadge(rank)}
                  <UserAvatar
                    src={prof.avatarUrl}
                    name={prof.name}
                    size="md"
                    status={prof.status}
                  />
                </div>
                {isFirst && (
                  <span className="text-[10px] font-display uppercase tracking-widest font-extrabold px-2 py-0.5 rounded bg-neutral-100 text-neutral-950">
                    Líder
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-display font-bold text-base text-neutral-100 truncate">
                  {prof.name}
                </h4>
                <p className="text-xs text-neutral-400">{prof.role}</p>
              </div>

              {/* Primary Value */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                  {metricSort === 'revenue'
                    ? 'Faturamento Realizado'
                    : metricSort === 'appointments'
                    ? 'Total de Atendimentos'
                    : 'Ticket Médio'}
                </span>
                <p className="font-display font-extrabold text-xl text-neutral-50 mt-0.5">
                  {metricSort === 'revenue'
                    ? `R$ ${prof.revenue.toLocaleString('pt-BR')}`
                    : metricSort === 'appointments'
                    ? `${prof.appointments} clientes`
                    : `R$ ${prof.averageTicket.toFixed(2)}`}
                </p>
              </div>

              <div className="mt-3">
                <ProgressBar
                  percentage={prof.targetPercentage}
                  label="Atingimento da Meta"
                  showPercentageText={true}
                  size="sm"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Remaining Professionals Table / List */}
      <div className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900/30">
        <div className="px-5 py-3 border-b border-neutral-800 bg-neutral-950/60 text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
          <span>Outros Barbeiros da Equipe</span>
          <span>Desempenho</span>
        </div>
        <div className="divide-y divide-neutral-800/60">
          {remaining.map((prof, idx) => {
            const rank = idx + 4;
            return (
              <div
                key={prof.id}
                onClick={() => onSelectProfessional?.(prof)}
                className="p-4 sm:px-5 flex items-center justify-between gap-4 hover:bg-neutral-800/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getRankBadge(rank)}
                  <UserAvatar
                    src={prof.avatarUrl}
                    name={prof.name}
                    size="sm"
                    status={prof.status}
                  />
                  <div className="min-w-0">
                    <p className="font-display font-medium text-sm text-neutral-200 truncate">
                      {prof.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {prof.role} • {prof.appointments} atendimentos
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <p className="font-display font-bold text-sm text-neutral-100">
                      R$ {prof.revenue.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {prof.targetPercentage.toFixed(1)}% da meta
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
