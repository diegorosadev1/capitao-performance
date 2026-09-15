import React, { useState } from 'react';
import { Flame, Trophy, Clock, CheckCircle2, Award, Filter, Sparkles } from 'lucide-react';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MOCK_CHALLENGES } from '../mock/challenges';
import { Challenge } from '../types';

export const ChallengesView: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState<'todos' | 'hoje' | 'semana' | 'mes'>('todos');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'ativo' | 'concluido'>('todos');

  const filtered = MOCK_CHALLENGES.filter((ch) => {
    const matchPeriod = periodFilter === 'todos' || ch.period === periodFilter;
    const matchStatus = statusFilter === 'todos' || ch.status === statusFilter;
    return matchPeriod && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-neutral-300" />
            <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
              Central de Desafios & Gamificação
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            Metas de curto prazo para acelerar o faturamento diário, volume de atendimentos e vendas de produtos.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => setStatusFilter('todos')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === 'todos'
                ? 'bg-neutral-100 text-neutral-950 font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setStatusFilter('ativo')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === 'ativo'
                ? 'bg-neutral-100 text-neutral-950 font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Em Andamento
          </button>
          <button
            onClick={() => setStatusFilter('concluido')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === 'concluido'
                ? 'bg-neutral-100 text-neutral-950 font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Concluídos
          </button>
        </div>
      </div>

      {/* Period Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 text-xs">
        <span className="text-neutral-500 uppercase tracking-wider font-semibold mr-2">
          Prazo:
        </span>
        {[
          { id: 'todos', label: 'Todos os Desafios' },
          { id: 'hoje', label: 'Desafios de Hoje' },
          { id: 'semana', label: 'Desafios Semanais' },
          { id: 'mes', label: 'Desafios Mensais' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPeriodFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              periodFilter === tab.id
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((challenge) => {
          const isDone = challenge.status === 'concluido' || challenge.progressPercentage >= 100;
          return (
            <div
              key={challenge.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-neutral-900/80 border-emerald-900/40'
                  : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-display tracking-widest font-extrabold px-2.5 py-1 rounded bg-neutral-800 text-neutral-300">
                    {challenge.category.toUpperCase()}
                  </span>
                  <StatusBadge status={challenge.status} />
                </div>

                <h3 className="font-display font-bold text-lg text-neutral-100 mb-1.5">
                  {challenge.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                  {challenge.description}
                </p>

                {/* Values Box */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      Progresso Atual
                    </span>
                    <p className="font-display font-bold text-sm text-neutral-100">
                      {challenge.category === 'faturamento'
                        ? `R$ ${challenge.currentAmount.toLocaleString('pt-BR')}`
                        : `${challenge.currentAmount}`}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      Objetivo
                    </span>
                    <p className="font-display font-bold text-sm text-neutral-300">
                      {challenge.category === 'faturamento'
                        ? `R$ ${challenge.targetAmount.toLocaleString('pt-BR')}`
                        : `${challenge.targetAmount}`}
                    </p>
                  </div>
                </div>

                <ProgressBar
                  percentage={challenge.progressPercentage}
                  showPercentageText={true}
                  variant={isDone ? 'success' : 'neutral'}
                />
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Prazo:</span>
                  </span>
                  <strong className="text-neutral-200">{challenge.deadline}</strong>
                </div>

                <div className="flex items-start justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1 shrink-0">
                    <Award className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Recompensa:</span>
                  </span>
                  <span className="text-right text-neutral-200 font-medium text-[11px] truncate max-w-[180px]">
                    {challenge.reward}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
