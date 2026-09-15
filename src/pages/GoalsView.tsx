import React, { useState } from 'react';
import { Target, Calendar, Calculator, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { GoalCard } from '../components/ui/GoalCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { MetricCard } from '../components/ui/MetricCard';
import { MOCK_GOALS } from '../mock/goals';
import { MOCK_PROFESSIONALS } from '../mock/professionals';
import { Goal } from '../types';

export const GoalsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mensal' | 'semanal' | 'diario'>('mensal');
  const [selectedScope, setSelectedScope] = useState<'todos' | 'unidade' | 'individual'>('todos');

  const unitGoals = MOCK_GOALS.filter((g) => g.type === 'unidade');
  const individualGoals = MOCK_GOALS.filter((g) => g.type === 'individual');

  const displayedGoals = MOCK_GOALS.filter((g) => {
    const matchesPeriod = g.period === activeTab;
    const matchesScope =
      selectedScope === 'todos' ? true : g.type === selectedScope;
    return matchesPeriod && matchesScope;
  });

  // Calculate Unit aggregates
  const mainUnitGoal = MOCK_GOALS.find((g) => g.id === 'goal-unit-month') || MOCK_GOALS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-neutral-300" />
            <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
              Metas & Pacing Operacional
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            Acompanhamento de metas da unidade e individuais com cálculo dinâmico de ritmo diário.
          </p>
        </div>

        {/* Period Selector Tabs: Diário, Semanal, Mensal */}
        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('diario')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'diario'
                ? 'bg-neutral-100 text-neutral-950 font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Diária
          </button>
          <button
            onClick={() => setActiveTab('semanal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'semanal'
                ? 'bg-neutral-100 text-neutral-950 font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Semanal
          </button>
          <button
            onClick={() => setActiveTab('mensal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'mensal'
                ? 'bg-neutral-100 text-neutral-950 font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Mensal
          </button>
        </div>
      </div>

      {/* Main Focus Highlight Box: "Quanto preciso faturar por dia para bater a meta?" */}
      <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Calculadora de Ritmo Necessário (Pacing Diário)
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-100">
              Quanto a unidade precisa faturar por dia?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Restam <strong>6 dias úteis</strong> no mês de Setembro. Com o faturamento realizado de <strong>R$ {mainUnitGoal.currentAmount.toLocaleString('pt-BR')}</strong> de um objetivo de <strong>R$ {mainUnitGoal.targetAmount.toLocaleString('pt-BR')}</strong>, o ritmo necessário para atingir 100% da meta é de:
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-center lg:text-right shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
              Meta Diária da Unidade
            </span>
            <p className="font-display font-black text-2xl sm:text-3xl text-neutral-100 mt-1">
              R$ {mainUnitGoal.dailyRequiredAmount.toLocaleString('pt-BR')} / dia
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              ≈ R$ {(mainUnitGoal.dailyRequiredAmount / 7).toFixed(0)} por barbeiro / dia
            </p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-neutral-800/80">
          <ProgressBar
            percentage={mainUnitGoal.progressPercentage}
            label="Progresso da Unidade Bom Retiro"
            subLabel={`Restante: R$ ${mainUnitGoal.remainingAmount.toLocaleString('pt-BR')}`}
            showPercentageText={true}
            size="md"
          />
        </div>
      </div>

      {/* Filter by Scope (Todos, Unidade, Individual) */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Metas do Período ({activeTab})
        </span>
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
          <button
            onClick={() => setSelectedScope('todos')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              selectedScope === 'todos'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setSelectedScope('unidade')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              selectedScope === 'unidade'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Unidade
          </button>
          <button
            onClick={() => setSelectedScope('individual')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              selectedScope === 'individual'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Individuais
          </button>
        </div>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};
