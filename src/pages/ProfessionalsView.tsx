import React, { useState } from 'react';
import {
  Scissors,
  DollarSign,
  Users,
  Target,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Package,
  Award,
  Sparkles,
  ArrowRight,
  X,
  CreditCard,
  ChevronRight,
  Calendar,
  Zap,
  Download,
  MoreVertical,
  ChevronLeft,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export interface BarberPerformance {
  id: string;
  name: string;
  avatarUrl: string;
  rankingPosition: number;
  badge?: string;
  role: string;
  seniority: string;
  revenue: number;
  target: number;
  percentage: number;
  appointments: number;
  subscriptions: number;
  productsRevenue: number;
  averageTicket: number;
  status: 'puxando_resultado' | 'no_ritmo' | 'abaixo_ritmo';
  statusLabel: string;
  insight: string;
  diagnostic: string[];
  recommendedAction: string;
  evolutionHistory: Array<{
    month: string;
    realizado: number;
    meta: number;
    percentage: number;
  }>;
  comparative: {
    ticket: { value: number; average: number };
    appointments: { value: number; average: number };
    products: { value: number; average: number };
  };
  productCategories: Array<{
    name: string;
    description: string;
    revenue: number;
  }>;
}

interface ProfessionalsViewProps {
  selectedProfessionalId?: string | null;
  onClearSelectedProfessional?: () => void;
}

export const ProfessionalsView: React.FC<ProfessionalsViewProps> = ({
  selectedProfessionalId,
  onClearSelectedProfessional,
}) => {
  // Tab for list filter: 'todos' | 'puxando' | 'no_ritmo' | 'atencao'
  const [filterTab, setFilterTab] = useState<'todos' | 'puxando' | 'no_ritmo' | 'atencao'>('todos');

  // Detail panel active tab: 'resumo' | 'evolucao' | 'comparativo' | 'produtos'
  const [detailTab, setDetailTab] = useState<'resumo' | 'evolucao' | 'comparativo' | 'produtos'>('resumo');

  // Modal for action plan
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Row selection state for datatable
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredProfessionals.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredProfessionals.map((p) => p.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Pos,Nome,Cargo,Faturamento,Meta,Atingimento,TicketMedio,Status']
        .concat(
          filteredProfessionals.map(
            (p) =>
              `${p.rankingPosition},"${p.name}","${p.role}",${p.revenue},${p.target},${Math.round(p.percentage)}%,${p.averageTicket},"${p.statusLabel}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'profissionais_capitao.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Complete data matching the screenshot
  const professionals: BarberPerformance[] = [
    {
      id: 'prof-matheus',
      name: 'Matheus Silva',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rankingPosition: 1,
      badge: 'Destaque',
      role: 'Master Barber',
      seniority: 'Master Barber • 6 anos de casa',
      revenue: 24150,
      target: 22000,
      percentage: 109,
      appointments: 228,
      subscriptions: 12,
      productsRevenue: 3450,
      averageTicket: 3450,
      status: 'puxando_resultado',
      statusLabel: 'Puxando',
      insight: 'Acima do ritmo esperado (+11,8%). Ticket médio e volume de atendimentos acima da média.',
      diagnostic: [
        'Ticket médio 12% acima da média geral da barbearia.',
        'Volume de atendimentos consistente com alta taxa de retorno.',
        'Líder em conversão de planos recorrentes (Clube Capitão).',
      ],
      recommendedAction: 'Reconhecer desempenho em reunião e compartilhar suas táticas de fidelização com o time.',
      evolutionHistory: [
        { month: 'Abr 2026', realizado: 20500, meta: 19000, percentage: 108 },
        { month: 'Mai 2026', realizado: 21800, meta: 20000, percentage: 109 },
        { month: 'Jun 2026', realizado: 22400, meta: 20500, percentage: 109 },
        { month: 'Jul 2026', realizado: 23100, meta: 21000, percentage: 110 },
        { month: 'Ago 2026', realizado: 23800, meta: 21500, percentage: 111 },
        { month: 'Set 2026', realizado: 24150, meta: 22000, percentage: 110 },
      ],
      comparative: {
        ticket: { value: 105.92, average: 94.80 },
        appointments: { value: 228, average: 156 },
        products: { value: 3450, average: 1388 },
      },
      productCategories: [
        { name: 'Pomadas Matte & Clay', description: 'Fixação alta e efeito natural', revenue: 1650 },
        { name: 'Óleos & Balms de Barba', description: 'Hidratação e alinhamento', revenue: 1120 },
        { name: 'Shampoos & Tônicos', description: 'Fortalecimento e anticaspa', revenue: 680 },
      ],
    },
    {
      id: 'prof-gabriel',
      name: 'Gabriel Santos',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rankingPosition: 2,
      badge: 'Destaque',
      role: 'Barbeiro Sênior',
      seniority: 'Barbeiro Sênior • 3 anos de casa',
      revenue: 19800,
      target: 19000,
      percentage: 104,
      appointments: 196,
      subscriptions: 8,
      productsRevenue: 2100,
      averageTicket: 3120,
      status: 'no_ritmo',
      statusLabel: 'No Ritmo',
      insight: 'Próximo do ritmo ideal. Precisa de aproximadamente 12 atendimentos extras para atingir a projeção.',
      diagnostic: [
        'Excelente retenção em barboterapia e combos.',
        'Ticket médio sólido, acima da meta estipulada.',
        'Potencial para dobrar vendas de produtos home care.',
      ],
      recommendedAction: 'Incentivar combos com venda casada de produtos de acabamento.',
      evolutionHistory: [
        { month: 'Abr 2026', realizado: 17200, meta: 17000, percentage: 101 },
        { month: 'Mai 2026', realizado: 18100, meta: 17500, percentage: 103 },
        { month: 'Jun 2026', realizado: 18600, meta: 18000, percentage: 103 },
        { month: 'Jul 2026', realizado: 18900, meta: 18500, percentage: 102 },
        { month: 'Ago 2026', realizado: 19400, meta: 19000, percentage: 102 },
        { month: 'Set 2026', realizado: 19800, meta: 19000, percentage: 104 },
      ],
      comparative: {
        ticket: { value: 101.02, average: 94.80 },
        appointments: { value: 196, average: 156 },
        products: { value: 2100, average: 1388 },
      },
      productCategories: [
        { name: 'Pomadas Matte & Clay', description: 'Fixação alta', revenue: 980 },
        { name: 'Óleos & Balms de Barba', description: 'Hidratação premium', revenue: 670 },
        { name: 'Shampoos Anticaspa & Fortalecedor', description: 'Cuidados capilares', revenue: 450 },
      ],
    },
    {
      id: 'prof-lucas',
      name: 'Lucas Ferreira',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rankingPosition: 3,
      role: 'Barbeiro Pleno',
      seniority: 'Barbeiro Pleno • 2 anos de casa',
      revenue: 16420,
      target: 16000,
      percentage: 103,
      appointments: 174,
      subscriptions: 5,
      productsRevenue: 1420,
      averageTicket: 2980,
      status: 'no_ritmo',
      statusLabel: 'No Ritmo',
      insight: 'Próximo da meta, mas precisa aumentar o ticket médio e venda de produtos.',
      diagnostic: [
        'Atendimentos em ritmo adequado para o ciclo.',
        'Ticket médio ligeiramente abaixo da média do time sênior.',
        'Baixo índice de conversão de clientes em assinantes.',
      ],
      recommendedAction: 'Estimular oferta ativa do plano Clube Capitão durante a finalização do corte.',
      evolutionHistory: [
        { month: 'Abr 2026', realizado: 15400, meta: 17000, percentage: 91 },
        { month: 'Mai 2026', realizado: 15900, meta: 17500, percentage: 91 },
        { month: 'Jun 2026', realizado: 16200, meta: 18000, percentage: 90 },
        { month: 'Jul 2026', realizado: 16000, meta: 18000, percentage: 89 },
        { month: 'Ago 2026', realizado: 16800, meta: 18500, percentage: 91 },
        { month: 'Set 2026', realizado: 16420, meta: 18500, percentage: 89 },
      ],
      comparative: {
        ticket: { value: 94.36, average: 94.80 },
        appointments: { value: 174, average: 156 },
        products: { value: 1420, average: 1388 },
      },
      productCategories: [
        { name: 'Pomadas Matte & Clay', description: 'Fixação alta', revenue: 720 },
        { name: 'Óleos & Balms de Barba', description: 'Hidratação premium', revenue: 450 },
        { name: 'Shampoos Anticaspa & Fortalecedor', description: 'Cuidados capilares', revenue: 250 },
      ],
    },
    {
      id: 'prof-felipe',
      name: 'Felipe Rocha',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      rankingPosition: 4,
      role: 'Barbeiro Pleno',
      seniority: 'Barbeiro Pleno • 4 anos de casa',
      revenue: 12100,
      target: 16000,
      percentage: 76,
      appointments: 142,
      subscriptions: 2,
      productsRevenue: 680,
      averageTicket: 2450,
      status: 'abaixo_ritmo',
      statusLabel: 'Atenção',
      insight: 'Ticket médio abaixo da média e baixa venda de produtos.',
      diagnostic: [
        'Ticket médio 18% abaixo da média da equipe.',
        'Volume de atendimentos 24% abaixo do necessário.',
        'Baixa venda de produtos (apenas 5% do faturamento).',
      ],
      recommendedAction: 'Aumentar venda de produtos e redistribuir encaixes nos próximos 7 dias.',
      evolutionHistory: [
        { month: 'Abr 2026', realizado: 12800, meta: 15000, percentage: 85 },
        { month: 'Mai 2026', realizado: 13900, meta: 15500, percentage: 90 },
        { month: 'Jun 2026', realizado: 14200, meta: 15500, percentage: 92 },
        { month: 'Jul 2026', realizado: 13800, meta: 16000, percentage: 86 },
        { month: 'Ago 2026', realizado: 14600, meta: 16000, percentage: 91 },
        { month: 'Set 2026', realizado: 12100, meta: 16000, percentage: 76 },
      ],
      comparative: {
        ticket: { value: 85.21, average: 94.80 },
        appointments: { value: 142, average: 156 },
        products: { value: 680, average: 1388 },
      },
      productCategories: [
        { name: 'Pomadas Matte & Clay', description: 'Fixação alta', revenue: 340 },
        { name: 'Óleos & Balms de Barba', description: 'Hidratação premium', revenue: 204 },
        { name: 'Shampoos Anticaspa & Fortalecedor', description: 'Cuidados capilares', revenue: 136 },
      ],
    },
    {
      id: 'prof-joao',
      name: 'João Martins',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      rankingPosition: 5,
      role: 'Barbeiro Júnior',
      seniority: 'Barbeiro Júnior • 1 ano de casa',
      revenue: 11350,
      target: 16000,
      percentage: 71,
      appointments: 118,
      subscriptions: 1,
      productsRevenue: 490,
      averageTicket: 2180,
      status: 'abaixo_ritmo',
      statusLabel: 'Abaixo do Ritmo',
      insight: 'Ritmo crítico. Ociosidade de 38% nas terças e quartas.',
      diagnostic: [
        'Alto tempo ocioso no início da semana.',
        'Baixo faturamento acumulado e pouca recorrência de clientes.',
        'Dificuldade na apresentação de produtos na bancada.',
      ],
      recommendedAction: 'Concentrar encaixes de agendamentos rápidos nas terças e quartas-feiras.',
      evolutionHistory: [
        { month: 'Abr 2026', realizado: 10400, meta: 13500, percentage: 77 },
        { month: 'Mai 2026', realizado: 11200, meta: 14000, percentage: 80 },
        { month: 'Jun 2026', realizado: 11800, meta: 14000, percentage: 84 },
        { month: 'Jul 2026', realizado: 10900, meta: 14500, percentage: 75 },
        { month: 'Ago 2026', realizado: 11500, meta: 14500, percentage: 79 },
        { month: 'Set 2026', realizado: 11350, meta: 16000, percentage: 71 },
      ],
      comparative: {
        ticket: { value: 81.77, average: 94.80 },
        appointments: { value: 118, average: 156 },
        products: { value: 490, average: 1388 },
      },
      productCategories: [
        { name: 'Pomadas Matte & Clay', description: 'Fixação alta', revenue: 260 },
        { name: 'Óleos & Balms de Barba', description: 'Hidratação premium', revenue: 150 },
        { name: 'Shampoos Anticaspa & Fortalecedor', description: 'Cuidados capilares', revenue: 80 },
      ],
    },
    {
      id: 'prof-bruno',
      name: 'Bruno Alves',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rankingPosition: 6,
      role: 'Barbeiro Júnior',
      seniority: 'Barbeiro Júnior • 8 meses de casa',
      revenue: 8760,
      target: 16000,
      percentage: 55,
      appointments: 78,
      subscriptions: 0,
      productsRevenue: 280,
      averageTicket: 1980,
      status: 'abaixo_ritmo',
      statusLabel: 'Abaixo do Ritmo',
      insight: 'Profissional em fase de rampagem. Baixo volume de atendimentos recorrentes.',
      diagnostic: [
        'Período inicial de curva de aprendizado na unidade.',
        'Ticket médio abaixo do mínimo operacional.',
        'Sem conversões em planos de assinatura.',
      ],
      recommendedAction: 'Acompanhamento direto do Líder Técnico para ajustes de padrão e tempo de corte.',
      evolutionHistory: [
        { month: 'Abr 2026', realizado: 3800, meta: 11000, percentage: 35 },
        { month: 'Mai 2026', realizado: 4400, meta: 11500, percentage: 38 },
        { month: 'Jun 2026', realizado: 4900, meta: 12000, percentage: 41 },
        { month: 'Jul 2026', realizado: 4800, meta: 12000, percentage: 40 },
        { month: 'Ago 2026', realizado: 5100, meta: 12500, percentage: 41 },
        { month: 'Set 2026', realizado: 8760, meta: 16000, percentage: 55 },
      ],
      comparative: {
        ticket: { value: 67.94, average: 94.80 },
        appointments: { value: 78, average: 156 },
        products: { value: 280, average: 1388 },
      },
      productCategories: [
        { name: 'Pomadas Matte & Clay', description: 'Fixação alta', revenue: 160 },
        { name: 'Óleos & Balms de Barba', description: 'Hidratação premium', revenue: 80 },
        { name: 'Shampoos Anticaspa & Fortalecedor', description: 'Cuidados capilares', revenue: 40 },
      ],
    },
  ];

  // Default selected is Felipe Rocha (matching the screenshot) or the one passed via props
  const initialSelected =
    professionals.find((p) => p.id === selectedProfessionalId) ||
    professionals.find((p) => p.name.includes('Felipe')) ||
    professionals[3];

  const [selectedBarber, setSelectedBarber] = useState<BarberPerformance | null>(initialSelected);

  // Filtered list based on active tab
  const filteredProfessionals = professionals.filter((p) => {
    if (filterTab === 'puxando') return p.status === 'puxando_resultado';
    if (filterTab === 'no_ritmo') return p.status === 'no_ritmo';
    if (filterTab === 'atencao') return p.status === 'abaixo_ritmo';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
              Performance dos Profissionais
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700 text-xs font-semibold text-neutral-300">
              6 Barbeiros
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Identifique quem está puxando o resultado da barbearia e quem precisa de intervenção de ritmo.
          </p>
        </div>

        {/* Top Right Status Badges */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>2 Puxando resultado</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-400 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>3 Abaixo do ritmo</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs matching screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterTab('todos')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'todos'
              ? 'bg-amber-400/10 border border-amber-400/50 text-amber-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          Todos (6)
        </button>
        <button
          onClick={() => setFilterTab('puxando')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'puxando'
              ? 'bg-emerald-400/10 border border-emerald-400/50 text-emerald-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          Puxando Resultado (2)
        </button>
        <button
          onClick={() => setFilterTab('no_ritmo')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'no_ritmo'
              ? 'bg-amber-400/10 border border-amber-400/50 text-amber-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          No Ritmo (1)
        </button>
        <button
          onClick={() => setFilterTab('atencao')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'atencao'
              ? 'bg-rose-400/10 border border-rose-400/50 text-rose-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          Atenção Necessária (3)
        </button>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: DataTable of Professionals (takes 7 of 12 cols if panel open, or full if closed) */}
        <div className={`${selectedBarber ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all`}>
          <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 overflow-hidden shadow-xl">
            {/* Table Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-neutral-800/80">
              <div>
                <h2 className="font-display font-bold text-base sm:text-lg text-neutral-100">
                  Profissionais
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {filteredProfessionals.length} profissionais encontrados
                </p>
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar</span>
              </button>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800/80 text-[11px] font-display font-bold uppercase tracking-wider text-neutral-400 bg-neutral-950/30">
                    <th className="py-3 pl-4 pr-2 w-10">
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.length === filteredProfessionals.length &&
                          filteredProfessionals.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-2 w-12 text-center">POS</th>
                    <th className="py-3 px-3">PROFISSIONAL</th>
                    <th className="py-3 px-3">FATURAMENTO</th>
                    <th className="py-3 px-3">META</th>
                    <th className="py-3 px-2 text-center">%</th>
                    <th className="py-3 px-3 text-center">STATUS</th>
                    <th className="py-3 px-3">TICKET MÉDIO</th>
                    <th className="py-3 pr-4 pl-3 text-right">AÇÕES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-xs">
                  {filteredProfessionals.map((prof) => {
                    const isSelected = selectedBarber?.id === prof.id;
                    const isChecked = selectedRows.includes(prof.id);

                    return (
                      <tr
                        key={prof.id}
                        onClick={() => setSelectedBarber(prof)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-neutral-800/60'
                            : 'hover:bg-neutral-800/30'
                        }`}
                      >
                        {/* Checkbox */}
                        <td
                          className="py-3.5 pl-4 pr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(prof.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRow(prof.id)}
                            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          />
                        </td>

                        {/* Position Badge */}
                        <td className="py-3.5 px-2 text-center">
                          <span className="inline-flex w-7 h-7 rounded-lg bg-neutral-800 text-neutral-300 font-display font-bold text-xs items-center justify-center">
                            {prof.rankingPosition}
                          </span>
                        </td>

                        {/* Professional Avatar, Name & Role */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={prof.avatarUrl}
                              alt={prof.name}
                              className="w-9 h-9 rounded-full object-cover border border-neutral-700 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-display font-bold text-xs sm:text-sm text-neutral-100 block truncate">
                                {prof.name}
                              </span>
                              <span className="text-[11px] text-neutral-400 block truncate">
                                {prof.role}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Faturamento */}
                        <td className="py-3.5 px-3 font-display font-bold text-neutral-100 whitespace-nowrap">
                          R$ {prof.revenue.toLocaleString('pt-BR')}
                        </td>

                        {/* Meta */}
                        <td className="py-3.5 px-3 text-neutral-400 whitespace-nowrap">
                          R$ {prof.target.toLocaleString('pt-BR')}
                        </td>

                        {/* % */}
                        <td className="py-3.5 px-2 text-center font-display font-bold text-neutral-200">
                          {Math.round(prof.percentage)}%
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-0.5 rounded-full text-xs font-semibold ${
                              prof.status === 'puxando_resultado'
                                ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-400'
                                : prof.status === 'no_ritmo'
                                ? 'bg-emerald-950/30 border border-emerald-500/40 text-emerald-400'
                                : prof.percentage >= 75
                                ? 'bg-amber-950/40 border border-amber-500/50 text-amber-400'
                                : 'bg-rose-950/40 border border-rose-500/50 text-rose-400'
                            }`}
                          >
                            {prof.status === 'puxando_resultado'
                              ? 'Puxando'
                              : prof.status === 'no_ritmo'
                              ? 'No Ritmo'
                              : prof.percentage >= 75
                              ? 'Atenção'
                              : 'Abaixo do Ritmo'}
                          </span>
                        </td>

                        {/* Ticket Médio */}
                        <td className="py-3.5 px-3 font-display font-semibold text-neutral-200 whitespace-nowrap">
                          R$ {prof.rankingPosition === 1 ? '3.450' : prof.rankingPosition === 2 ? '3.120' : prof.rankingPosition === 3 ? '2.980' : prof.rankingPosition === 4 ? '2.450' : prof.rankingPosition === 5 ? '2.180' : '1.980'}
                        </td>

                        {/* Ações */}
                        <td className="py-3.5 pr-4 pl-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBarber(prof);
                              }}
                              className={`px-3 py-1 rounded-lg font-display font-semibold text-xs transition-colors ${
                                isSelected
                                  ? 'bg-neutral-700 text-white'
                                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                              }`}
                            >
                              Ver
                            </button>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded text-neutral-400 hover:text-neutral-200 transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer with Pagination */}
            <div className="p-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
              <span>
                Mostrando 1-{filteredProfessionals.length} de {filteredProfessionals.length} resultados
              </span>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-neutral-400 flex items-center justify-center transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-100 font-bold flex items-center justify-center">
                    1
                  </span>
                  <button className="w-7 h-7 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-neutral-400 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300">
                  <span>10</span>
                  <ChevronRight className="w-3 h-3 rotate-90 text-neutral-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detail Panel of Selected Professional (takes 5 of 12 cols) */}
        {selectedBarber && (
          <div className="lg:col-span-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 sm:p-6 space-y-5 sticky top-4">
            {/* Header: Avatar, Name, Badge, Seniority & Close button */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedBarber.avatarUrl}
                  alt={selectedBarber.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-neutral-700"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display font-black text-lg text-neutral-50">
                      {selectedBarber.name}
                    </h2>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-display font-bold border ${
                        selectedBarber.status === 'puxando_resultado'
                          ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-400'
                          : selectedBarber.status === 'no_ritmo'
                          ? 'bg-amber-950/40 border-amber-800/50 text-amber-400'
                          : 'bg-rose-950/40 border-rose-800/50 text-rose-400'
                      }`}
                    >
                      {selectedBarber.statusLabel}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {selectedBarber.seniority}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedBarber(null);
                  onClearSelectedProfessional?.();
                }}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Navigation Tabs matching screenshots */}
            <div className="flex items-center gap-4 border-b border-neutral-800 text-xs font-display">
              <button
                onClick={() => setDetailTab('resumo')}
                className={`pb-2.5 font-bold transition-all relative ${
                  detailTab === 'resumo'
                    ? 'text-neutral-50 border-b-2 border-amber-400'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Resumo
              </button>
              <button
                onClick={() => setDetailTab('evolucao')}
                className={`pb-2.5 font-bold transition-all relative ${
                  detailTab === 'evolucao'
                    ? 'text-neutral-50 border-b-2 border-amber-400'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Evolução
              </button>
              <button
                onClick={() => setDetailTab('comparativo')}
                className={`pb-2.5 font-bold transition-all relative ${
                  detailTab === 'comparativo'
                    ? 'text-neutral-50 border-b-2 border-amber-400'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Comparativo
              </button>
              <button
                onClick={() => setDetailTab('produtos')}
                className={`pb-2.5 font-bold transition-all relative ${
                  detailTab === 'produtos'
                    ? 'text-neutral-50 border-b-2 border-amber-400'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Produtos
              </button>
            </div>

            {/* TAB 1: RESUMO */}
            {detailTab === 'resumo' && (
              <div className="space-y-4 text-xs">
                {/* Faturamento / Meta Section */}
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500">
                        Faturamento / Meta
                      </span>
                      <p className="font-display font-bold text-sm text-neutral-200 mt-0.5">
                        R$ {selectedBarber.revenue.toLocaleString('pt-BR')} / R${' '}
                        {selectedBarber.target.toLocaleString('pt-BR')}
                      </p>
                      <span
                        className={`font-display font-black text-2xl tracking-tight mt-1 block ${
                          selectedBarber.status === 'puxando_resultado'
                            ? 'text-emerald-400'
                            : selectedBarber.status === 'no_ritmo'
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {selectedBarber.percentage.toFixed(1)}%
                      </span>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-display font-bold text-sm text-neutral-200">
                        R$ {selectedBarber.averageTicket.toFixed(2)}
                      </p>
                      <span className="text-[11px] text-neutral-400">
                        {selectedBarber.appointments} atendimentos
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2 Mini Cards: Assinaturas & Produtos */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-base text-neutral-100 block">
                        {selectedBarber.subscriptions}
                      </span>
                      <span className="text-[10px] text-neutral-400">Assinaturas</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-base text-neutral-100 block">
                        R$ {selectedBarber.productsRevenue}
                      </span>
                      <span className="text-[10px] text-neutral-400">Produtos</span>
                    </div>
                  </div>
                </div>

                {/* Diagnóstico Section */}
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-neutral-200 font-display font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Diagnóstico</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-neutral-300">
                    {selectedBarber.diagnostic.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-neutral-500">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ação recomendada Section */}
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-400 font-display font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Ação recomendada</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    {selectedBarber.recommendedAction}
                  </p>
                  <button
                    onClick={() => setShowPlanModal(true)}
                    className="text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 pt-1"
                  >
                    <span>Ver plano de ação</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Evolução do faturamento chart */}
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-neutral-200">
                      Evolução do faturamento
                    </span>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Realizado
                      </span>
                      <span className="flex items-center gap-1 text-neutral-500">
                        <span className="w-2 h-2 rounded-full bg-neutral-600" />
                        Meta
                      </span>
                    </div>
                  </div>

                  <div className="h-32 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={selectedBarber.evolutionHistory}
                        margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                        <XAxis
                          dataKey="month"
                          stroke="#737373"
                          fontSize={9}
                          tickLine={false}
                          tickFormatter={(m) => m.split(' ')[0]}
                        />
                        <YAxis
                          stroke="#737373"
                          fontSize={9}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#171717',
                            borderColor: '#404040',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '11px',
                          }}
                          formatter={(val: number) => [`R$ ${val.toLocaleString('pt-BR')}`]}
                        />
                        <Line
                          type="monotone"
                          dataKey="realizado"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#10b981' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="meta"
                          stroke="#525252"
                          strokeDasharray="3 3"
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EVOLUÇÃO (Matching cropped screenshot 1) */}
            {detailTab === 'evolucao' && (
              <div className="space-y-3 text-xs">
                <p className="text-xs text-neutral-400">
                  Histórico de desempenho dos últimos 6 meses:
                </p>

                <div className="space-y-2.5">
                  {selectedBarber.evolutionHistory.map((item) => (
                    <div
                      key={item.month}
                      className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-display font-bold text-xs text-neutral-100 block">
                          {item.month}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          Meta: R$ {item.meta.toLocaleString('pt-BR')}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-display font-bold text-xs text-neutral-100 block">
                          R$ {item.realizado.toLocaleString('pt-BR')}
                        </span>
                        <span
                          className={`font-display font-bold text-[11px] ${
                            item.percentage >= 100
                              ? 'text-emerald-400'
                              : item.percentage >= 85
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {item.percentage}% da meta
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: COMPARATIVO (Matching cropped screenshot 2) */}
            {detailTab === 'comparativo' && (
              <div className="space-y-4 text-xs">
                <p className="text-xs text-neutral-400">
                  Comparação contra as médias gerais da barbearia:
                </p>

                {/* Metric 1: Ticket Médio */}
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-neutral-200">Ticket Médio</span>
                    <span className="font-display font-bold text-neutral-100">
                      R$ {selectedBarber.comparative.ticket.value.toFixed(2)}{' '}
                      <span className="text-neutral-400 text-[10px] font-normal">
                        (Média R$ {selectedBarber.comparative.ticket.average.toFixed(2)})
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        selectedBarber.comparative.ticket.value >= selectedBarber.comparative.ticket.average
                          ? 'bg-emerald-500'
                          : 'bg-rose-400'
                      }`}
                      style={{
                        width: `${Math.min(
                          (selectedBarber.comparative.ticket.value /
                            selectedBarber.comparative.ticket.average) *
                            75,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Metric 2: Volume de Atendimentos */}
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-neutral-200">
                      Volume de Atendimentos
                    </span>
                    <span className="font-display font-bold text-neutral-100">
                      {selectedBarber.comparative.appointments.value}{' '}
                      <span className="text-neutral-400 text-[10px] font-normal">
                        (Média {selectedBarber.comparative.appointments.average})
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        selectedBarber.comparative.appointments.value >=
                        selectedBarber.comparative.appointments.average
                          ? 'bg-emerald-500'
                          : 'bg-rose-400'
                      }`}
                      style={{
                        width: `${Math.min(
                          (selectedBarber.comparative.appointments.value /
                            selectedBarber.comparative.appointments.average) *
                            75,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Metric 3: Venda de Produtos */}
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-neutral-200">
                      Venda de Produtos
                    </span>
                    <span className="font-display font-bold text-neutral-100">
                      R$ {selectedBarber.comparative.products.value}{' '}
                      <span className="text-neutral-400 text-[10px] font-normal">
                        (Média R$ {selectedBarber.comparative.products.average})
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        selectedBarber.comparative.products.value >=
                        selectedBarber.comparative.products.average
                          ? 'bg-emerald-500'
                          : 'bg-rose-400'
                      }`}
                      style={{
                        width: `${Math.min(
                          (selectedBarber.comparative.products.value /
                            selectedBarber.comparative.products.average) *
                            70,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PRODUTOS (Matching cropped screenshot 3) */}
            {detailTab === 'produtos' && (
              <div className="space-y-3 text-xs">
                <p className="text-xs text-neutral-400">
                  Detalhamento dos cosméticos vendidos no mês:
                </p>

                <div className="space-y-2.5">
                  {selectedBarber.productCategories.map((item) => (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-display font-bold text-xs text-neutral-100 block">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {item.description}
                        </span>
                      </div>

                      <span className="font-display font-bold text-sm text-amber-400">
                        R$ {item.revenue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Plan Modal */}
      {showPlanModal && selectedBarber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-base text-neutral-100">
                  Plano de Ação • {selectedBarber.name}
                </h3>
              </div>
              <button
                onClick={() => setShowPlanModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <strong className="text-neutral-100 block font-display">
                  1. Alinhamento de Vendas na Bancada
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Apresentar o produto correto logo na finalização do corte, aumentando a conversão direta de pomadas e balms.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <strong className="text-neutral-100 block font-display">
                  2. Otimização de Agenda
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Redirecionar clientes sem agendamento prévio diretamente para a cadeira dele nos horários de menor movimento.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <strong className="text-neutral-100 block font-display">
                  3. Meta Curta de 7 Dias
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Alcançar 5 novas assinaturas do Clube Capitão até a próxima sexta-feira.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setShowPlanModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 font-display font-bold text-xs"
              >
                Aplicar Plano de Intervenção
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
