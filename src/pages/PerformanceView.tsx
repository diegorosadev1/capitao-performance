import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Percent,
  Scissors,
  Download,
  Filter,
} from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartCard } from '../components/ui/ChartCard';
import { DataTable, Column } from '../components/ui/DataTable';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { UserAvatar } from '../components/ui/UserAvatar';
import { FilterBar } from '../components/ui/FilterBar';
import { MOCK_PROFESSIONALS } from '../mock/professionals';
import { Professional } from '../types';

interface PerformanceViewProps {
  onSelectProfessional: (prof: Professional) => void;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({
  onSelectProfessional,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedUnit, setSelectedUnit] = useState('unit-bom-retiro');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessionals = MOCK_PROFESSIONALS.filter((prof) => {
    const matchesSearch =
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'todos' || prof.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filteredProfessionals.reduce((acc, p) => acc + p.revenue, 0);
  const totalTarget = filteredProfessionals.reduce((acc, p) => acc + p.target, 0);
  const totalAppointments = filteredProfessionals.reduce((acc, p) => acc + p.appointments, 0);
  const totalCommission = filteredProfessionals.reduce((acc, p) => acc + p.commissionAmount, 0);
  const avgTicket = totalAppointments > 0 ? totalRevenue / totalAppointments : 0;
  const overallTargetPercentage = totalTarget > 0 ? (totalRevenue / totalTarget) * 100 : 0;

  const columns: Column<Professional>[] = [
    {
      key: 'name',
      header: 'Profissional',
      render: (prof) => (
        <div className="flex items-center gap-3">
          <UserAvatar
            src={prof.avatarUrl}
            name={prof.name}
            size="sm"
            status={prof.status}
          />
          <div>
            <p className="font-display font-semibold text-neutral-100">{prof.name}</p>
            <p className="text-[11px] text-neutral-400">{prof.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'appointments',
      header: 'Atendimentos',
      align: 'center',
      render: (prof) => (
        <span className="font-display font-medium text-neutral-200">
          {prof.appointments}
        </span>
      ),
    },
    {
      key: 'revenue',
      header: 'Faturamento',
      align: 'right',
      render: (prof) => (
        <span className="font-display font-bold text-neutral-100">
          R$ {prof.revenue.toLocaleString('pt-BR')}
        </span>
      ),
    },
    {
      key: 'target',
      header: 'Meta',
      align: 'right',
      render: (prof) => (
        <span className="font-display text-neutral-400">
          R$ {prof.target.toLocaleString('pt-BR')}
        </span>
      ),
    },
    {
      key: 'targetPercentage',
      header: '% Meta',
      className: 'w-44',
      render: (prof) => (
        <div className="w-36">
          <ProgressBar
            percentage={prof.targetPercentage}
            showPercentageText={true}
            size="sm"
            variant={
              prof.targetPercentage >= 100
                ? 'neutral'
                : prof.targetPercentage < 80
                ? 'alert'
                : 'neutral'
            }
          />
        </div>
      ),
    },
    {
      key: 'averageTicket',
      header: 'Ticket Médio',
      align: 'right',
      render: (prof) => (
        <span className="font-display font-semibold text-neutral-200">
          R$ {prof.averageTicket.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'commissionAmount',
      header: 'Comissão Est.',
      align: 'right',
      render: (prof) => (
        <span className="font-display text-neutral-300">
          R$ {prof.commissionAmount.toLocaleString('pt-BR')} ({prof.commissionRate}%)
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (prof) => <StatusBadge status={prof.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
            Performance Operacional da Unidade
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Análise detalhada de faturamento, metas, comissionamento e produtividade por barbeiro.
          </p>
        </div>

        <button
          onClick={() => alert('Relatório CSV/Excel gerado com sucesso!')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-500 transition-all self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Planilha</span>
        </button>
      </div>

      {/* Filter Bar with professional search & status */}
      <FilterBar
        selectedPeriod={selectedPeriod}
        onSelectPeriod={setSelectedPeriod}
        selectedUnit={selectedUnit}
        onSelectUnit={setSelectedUnit}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Filtrar por barbeiro ou cargo..."
        extraControls={
          <div className="flex items-center gap-1 bg-neutral-950 px-2.5 py-1.5 rounded-lg border border-neutral-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-neutral-200 text-xs focus:outline-none cursor-pointer pr-1"
            >
              <option value="todos" className="bg-neutral-900 text-white">
                Todos os Status
              </option>
              <option value="ativo" className="bg-neutral-900 text-white">
                Ativo
              </option>
              <option value="em_atendimento" className="bg-neutral-900 text-white">
                Em Atendimento
              </option>
              <option value="folga" className="bg-neutral-900 text-white">
                Folga
              </option>
            </select>
          </div>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Faturamento Total"
          value={`R$ ${totalRevenue.toLocaleString('pt-BR')}`}
          icon={DollarSign}
          subtext="Unidade Bom Retiro"
          highlight={true}
        />
        <MetricCard
          label="Atendimentos"
          value={totalAppointments}
          icon={Scissors}
          subtext="Volume acumulado"
        />
        <MetricCard
          label="Ticket Médio"
          value={`R$ ${avgTicket.toFixed(2)}`}
          icon={TrendingUp}
          change={5.2}
          changeLabel="vs. ciclo anterior"
        />
        <MetricCard
          label="Comissões Previstas"
          value={`R$ ${totalCommission.toLocaleString('pt-BR')}`}
          icon={Percent}
          subtext="Média 46% repasse"
        />
        <MetricCard
          label="% Meta Global"
          value={`${overallTargetPercentage.toFixed(1)}%`}
          secondaryValue={`R$ ${totalTarget.toLocaleString('pt-BR')}`}
          icon={Target}
          subtext="Meta: R$ 100.000"
        />
      </div>

      {/* Professional Performance Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-neutral-100">
            Tabela de Desempenho dos Profissionais
          </h3>
          <span className="text-xs text-neutral-400">
            Clique no profissional para abrir a ficha completa
          </span>
        </div>

        <DataTable
          data={filteredProfessionals}
          columns={columns}
          keyExtractor={(prof) => prof.id}
          onRowClick={(prof) => onSelectProfessional(prof)}
        />
      </div>
    </div>
  );
};
