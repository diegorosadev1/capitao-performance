import React from 'react';
import { Building2, MapPin, Users, Scissors, DollarSign, Target, CheckCircle2 } from 'lucide-react';
import { MOCK_UNITS } from '../mock/units';
import { ProgressBar } from '../components/ui/ProgressBar';
import { MetricCard } from '../components/ui/MetricCard';

export const UnitsView: React.FC = () => {
  const totalNetworkRevenue = MOCK_UNITS.reduce((a, b) => a + b.monthlyRevenue, 0);
  const totalNetworkTarget = MOCK_UNITS.reduce((a, b) => a + b.monthlyTarget, 0);
  const totalNetworkBarbers = MOCK_UNITS.reduce((a, b) => a + b.professionalsCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-5 h-5 text-neutral-300" />
          <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
            Unidades da Rede
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400">
          Visão comparativa de performance, metas e equipe entre as 4 unidades da rede Capitão.
        </p>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Faturamento Total da Rede"
          value={`R$ ${totalNetworkRevenue.toLocaleString('pt-BR')}`}
          secondaryValue={`R$ ${totalNetworkTarget.toLocaleString('pt-BR')}`}
          icon={DollarSign}
          subtext="4 unidades ativas"
          highlight={true}
        />
        <MetricCard
          label="Barbeiros em Atividade"
          value={`${totalNetworkBarbers} profissionais`}
          icon={Scissors}
          subtext="Média 6 por unidade"
        />
        <MetricCard
          label="Meta Global Atingida"
          value={`${((totalNetworkRevenue / totalNetworkTarget) * 100).toFixed(1)}%`}
          icon={Target}
          subtext="Meta consolidada da rede"
        />
      </div>

      {/* Units Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_UNITS.map((unit) => {
          const progress = unit.monthlyTarget > 0 ? (unit.monthlyRevenue / unit.monthlyTarget) * 100 : 0;
          return (
            <div
              key={unit.id}
              className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-lg text-neutral-100">
                      {unit.name}
                    </h3>
                    {unit.id === 'unit-bom-retiro' && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-950">
                        Matriz
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    {unit.city}, {unit.state} • Gestor: {unit.managerName}
                  </p>
                </div>
              </div>

              {/* Unit metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Faturamento
                  </span>
                  <p className="font-display font-bold text-sm text-neutral-100">
                    R$ {unit.monthlyRevenue.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Meta
                  </span>
                  <p className="font-display font-bold text-sm text-neutral-400">
                    R$ {unit.monthlyTarget.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Barbeiros
                  </span>
                  <p className="font-display font-bold text-sm text-neutral-200">
                    {unit.professionalsCount} cadeiras
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <ProgressBar
                percentage={progress}
                label="Atingimento da Meta da Unidade"
                showPercentageText={true}
                size="md"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
