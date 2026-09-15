import React, { useState, useMemo } from 'react';
import {
  Users,
  UserCheck,
  Plus,
  AlertCircle,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Sparkles,
  Clock,
  X,
  Check,
  AlertTriangle,
  Tag,
  Scissors,
  CheckCheck,
} from 'lucide-react';

export interface SubscriptionOpportunity {
  id: string;
  rankingPosition: number;
  name: string;
  opportunityBadge: 'ALTA' | 'MÉDIA' | 'ATIVO' | 'RISCO';
  profileTag: string;
  preferredBarber: string;
  frequencyText: string;
  frequencyMonthly: number;
  averageSpending: number;
  historicalValue: number;
  lastVisitText: string;
  lastVisitDays: number;
  currentPayment: 'Pacote' | 'Avulso' | 'Assinatura';
  hasCreditCard: boolean;
  topServices: string;
  category: 'todos' | 'alta_propensao' | 'em_risco' | 'ativos' | 'cancelados';
  reasons: string[];
  suggestedPlanName: string;
  suggestedPlanPrice: number;
  adherenceLevel: string;
  adherencePercentage: number;
  recommendedAction: string;
}

export const SubscriptionsView: React.FC = () => {
  const [filterTab, setFilterTab] = useState<'todos' | 'alta_propensao' | 'em_risco' | 'ativos' | 'cancelados'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showCheckoutSignalModal, setShowCheckoutSignalModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Full dataset matching screenshot and extra authentic records
  const opportunities: SubscriptionOpportunity[] = [
    {
      id: 'opp-rodrigo',
      rankingPosition: 1,
      name: 'Rodrigo Mendonça',
      opportunityBadge: 'ALTA',
      profileTag: 'Cliente VIP',
      preferredBarber: 'Gabriel Santos',
      frequencyText: '5x / mês',
      frequencyMonthly: 5,
      averageSpending: 620,
      historicalValue: 4960,
      lastVisitText: '8 dias atrás',
      lastVisitDays: 8,
      currentPayment: 'Pacote',
      hasCreditCard: true,
      topServices: 'Corte + Barba',
      category: 'alta_propensao',
      reasons: [
        'Alta frequência de consumo',
        'Gasto médio elevado',
        'Compra recorrente em pacote',
        'Cartão disponível para cobrança',
      ],
      suggestedPlanName: 'Capitão VIP',
      suggestedPlanPrice: 299,
      adherenceLevel: 'Alta aderência',
      adherencePercentage: 92,
      recommendedAction:
        'Abordar no próximo atendimento, apresentar o plano VIP e comparar o gasto médio atual com o valor da assinatura.',
    },
    {
      id: 'opp-gabriel',
      rankingPosition: 2,
      name: 'Gabriel Santos',
      opportunityBadge: 'ALTA',
      profileTag: 'Cliente em crescimento',
      preferredBarber: 'Lucas Ferreira',
      frequencyText: '4x / mês',
      frequencyMonthly: 4,
      averageSpending: 440,
      historicalValue: 4200,
      lastVisitText: '12 dias atrás',
      lastVisitDays: 12,
      currentPayment: 'Pacote',
      hasCreditCard: true,
      topServices: 'Corte + Barba',
      category: 'alta_propensao',
      reasons: [
        'Boa frequência de visitas',
        'Gasto médio consistente',
        'Comportamento de compra recorrente',
        'Perfil compatível com assinatura',
      ],
      suggestedPlanName: 'Capitão Black',
      suggestedPlanPrice: 249,
      adherenceLevel: 'Boa aderência',
      adherencePercentage: 82,
      recommendedAction:
        'Apresentar plano durante o próximo atendimento e destacar os benefícios do plano.',
    },
    {
      id: 'opp-thiago',
      rankingPosition: 3,
      name: 'Thiago Nogueira',
      opportunityBadge: 'MÉDIA',
      profileTag: 'Cliente em crescimento',
      preferredBarber: 'Matheus Silva',
      frequencyText: '3x / mês',
      frequencyMonthly: 3,
      averageSpending: 405,
      historicalValue: 3320,
      lastVisitText: '12 dias atrás',
      lastVisitDays: 12,
      currentPayment: 'Pacote',
      hasCreditCard: false,
      topServices: 'Corte + Barba',
      category: 'alta_propensao',
      reasons: [
        'Frequência acima da média',
        'Gasto constante',
        'Tem perfil de consumo recorrente',
        'Ainda não possui cartão cadastrado',
      ],
      suggestedPlanName: 'Capitão Basic',
      suggestedPlanPrice: 199,
      adherenceLevel: 'Adaptação necessária',
      adherencePercentage: 68,
      recommendedAction:
        'Verificar possibilidade de cadastro de cartão e apresentar o plano de forma consultiva.',
    },
    {
      id: 'opp-henrique',
      rankingPosition: 4,
      name: 'Henrique Vasconcelos',
      opportunityBadge: 'ALTA',
      profileTag: 'Cliente VIP',
      preferredBarber: 'Lucas Ferreira',
      frequencyText: '4.5x / mês',
      frequencyMonthly: 4.5,
      averageSpending: 580,
      historicalValue: 5120,
      lastVisitText: '5 dias atrás',
      lastVisitDays: 5,
      currentPayment: 'Avulso',
      hasCreditCard: true,
      topServices: 'Corte Fade + Barba Terapia',
      category: 'alta_propensao',
      reasons: [
        'Frequência excelente semanal',
        'Gastos avulsos superiores ao plano VIP',
        'Histórico de pontualidade e fidelidade',
        'Cartão ativo na carteira digital',
      ],
      suggestedPlanName: 'Capitão VIP',
      suggestedPlanPrice: 299,
      adherenceLevel: 'Alta aderência',
      adherencePercentage: 95,
      recommendedAction:
        'Mostrar a economia imediata de R$ 281/mês ao migrar para a assinatura VIP.',
    },
    {
      id: 'opp-fernando',
      rankingPosition: 5,
      name: 'Fernando Guimarães',
      opportunityBadge: 'ATIVO',
      profileTag: 'Plano Black Ativo',
      preferredBarber: 'Gabriel Santos',
      frequencyText: '4.5x / mês',
      frequencyMonthly: 4.5,
      averageSpending: 249,
      historicalValue: 4200,
      lastVisitText: '3 dias atrás',
      lastVisitDays: 3,
      currentPayment: 'Assinatura',
      hasCreditCard: true,
      topServices: 'Plano Capitão Black Sem Limite',
      category: 'ativos',
      reasons: [
        'Assinante ativo há 14 meses ininterruptos',
        'NPS 10 em todas as avaliações',
        'Consumidor assíduo de produtos da casa',
        'Renovação automática sem inadimplência',
      ],
      suggestedPlanName: 'Capitão Black (Ativo)',
      suggestedPlanPrice: 249,
      adherenceLevel: 'Cliente Fidelizado',
      adherencePercentage: 100,
      recommendedAction:
        'Oferecer amostra de produto de linha premium (Cross-sell) e benefício de fidelidade.',
    },
    {
      id: 'opp-carlos',
      rankingPosition: 6,
      name: 'Carlos Eduardo Paiva',
      opportunityBadge: 'RISCO',
      profileTag: 'Cliente em Alerta',
      preferredBarber: 'Gabriel Santos',
      frequencyText: '2.2x / mês',
      frequencyMonthly: 2.2,
      averageSpending: 310,
      historicalValue: 3120,
      lastVisitText: '48 dias atrás',
      lastVisitDays: 48,
      currentPayment: 'Avulso',
      hasCreditCard: true,
      topServices: 'Corte Tradicional + Hidratação',
      category: 'em_risco',
      reasons: [
        'Ciclo de retorno atrasado há mais de 30 dias',
        'Risco de perda da recorrência',
        'Já possui histórico positivo na barbearia',
        'Oferta de assinatura com desconto inicial reativa o hábito',
      ],
      suggestedPlanName: 'Capitão Basic + Reativação',
      suggestedPlanPrice: 199,
      adherenceLevel: 'Reativação Necessária',
      adherencePercentage: 74,
      recommendedAction:
        'Enviar convite pelo WhatsApp com cortesia de retorno e proposta de plano recorrente.',
    },
  ];

  // Default selected client is Rodrigo Mendonça (matching screenshot)
  const [selectedClient, setSelectedClient] = useState<SubscriptionOpportunity | null>(opportunities[0]);

  // Filtered opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesTab =
        filterTab === 'todos' ||
        (filterTab === 'alta_propensao' && item.category === 'alta_propensao') ||
        (filterTab === 'em_risco' && item.category === 'em_risco') ||
        (filterTab === 'ativos' && item.category === 'ativos') ||
        (filterTab === 'cancelados' && item.category === 'cancelados');

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.preferredBarber.toLowerCase().includes(q) ||
        item.topServices.toLowerCase().includes(q) ||
        item.suggestedPlanName.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [opportunities, filterTab, searchTerm]);

  // Row selection
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredOpportunities.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredOpportunities.map((o) => o.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // CSV Export
  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Pos,Nome,Perfil,Barbeiro,Frequencia,GastoMedio,ValorHistorico,UltimaVisita,Pagamento,Cartao,PlanoSugerido,Aderencia']
        .concat(
          filteredOpportunities.map(
            (o) =>
              `${o.rankingPosition},"${o.name}","${o.profileTag}","${o.preferredBarber}","${o.frequencyText}",${o.averageSpending},${o.historicalValue},"${o.lastVisitText}","${o.currentPayment}",${o.hasCreditCard ? 'Sim' : 'Nao'},"${o.suggestedPlanName}",${o.adherencePercentage}%`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'oportunidades_assinaturas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSignalCheckout = () => {
    setShowCheckoutSignalModal(false);
    setToastMessage(`Sinalização enviada para o Caixa e Recepção para ${selectedClient?.name}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section matching screenshot */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
            Clube de Assinaturas & Retenção
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Identifique oportunidades reais de conversão com base em comportamento, perfil e capacidade de pagamento.
          </p>
        </div>

        {/* Top Right MRR Tag matching screenshot */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-semibold shrink-0 self-start md:self-auto shadow-sm">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>MRR Previsto Ativo: <strong>R$ 58.535 / mês</strong></span>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: ASSINANTES ATIVOS */}
        <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-neutral-400" />
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-neutral-400">
                Assinantes Ativos
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-[10px] font-bold text-emerald-400">
              +12%
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-neutral-50">
              367
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-800/80">
            <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
              <span>Meta: 400</span>
              <span className="font-semibold text-neutral-300">92%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: NOVAS ADESÕES */}
        <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-neutral-400" />
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-neutral-400">
                Novas Adesões
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-[10px] font-bold text-emerald-400">
              +25%
            </span>
          </div>

          <div className="mt-3">
            <span className="font-display font-black text-2xl sm:text-3xl text-neutral-50">
              +20 <span className="text-xs font-normal text-neutral-400">este mês</span>
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
            <span>Média: 15/mês</span>
          </div>
        </div>

        {/* Card 3: CANCELAMENTOS */}
        <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-neutral-400" />
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-neutral-400">
                Cancelamentos
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-[10px] font-bold text-emerald-400">
              -8%
            </span>
          </div>

          <div className="mt-3">
            <span className="font-display font-black text-2xl sm:text-3xl text-neutral-50">
              -17 <span className="text-xs font-normal text-neutral-400">este mês</span>
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
            <span>Média: 19/mês</span>
          </div>
        </div>

        {/* Card 4: TAXA DE RETENÇÃO */}
        <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-neutral-400">
                Taxa de Retenção
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-[10px] font-bold text-emerald-400">
              +2,1%
            </span>
          </div>

          <div className="mt-3">
            <span className="font-display font-black text-2xl sm:text-3xl text-neutral-50">
              95,4%
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
            <span>Meta: 94,0%</span>
          </div>
        </div>
      </div>

      {/* Regra de Ouro Banner matching screenshot */}
      <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-display font-bold text-sm text-neutral-100">
              Venda qualificada de assinatura
            </span>
            <span className="px-2 py-0.5 rounded border border-amber-500/50 bg-amber-950/30 text-amber-400 text-[10px] font-bold tracking-wider uppercase">
              Regra de Ouro
            </span>
          </div>
          <p className="text-xs text-neutral-400 max-w-3xl leading-relaxed">
            O Capitão não recomenda assinatura para todos os clientes. A recomendação considera comportamento de consumo, frequência, valor gasto, forma de pagamento e aderência ao modelo recorrente.
          </p>
        </div>

        {/* Search Input matching screenshot */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente ou barbeiro..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-neutral-950/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs Bar matching screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterTab('todos')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'todos'
              ? 'bg-amber-400/10 border border-amber-400/50 text-amber-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          Todos (367)
        </button>
        <button
          onClick={() => setFilterTab('alta_propensao')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'alta_propensao'
              ? 'bg-amber-400/10 border border-amber-400/50 text-amber-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          Alta Propensão (27)
        </button>
        <button
          onClick={() => setFilterTab('em_risco')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'em_risco'
              ? 'bg-rose-950/40 border border-rose-800/50 text-rose-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          Em Risco (48)
        </button>
        <button
          onClick={() => setFilterTab('ativos')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'ativos'
              ? 'bg-emerald-950/40 border border-emerald-800/50 text-emerald-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          Ativos (312)
        </button>
        <button
          onClick={() => setFilterTab('cancelados')}
          className={`px-3.5 py-2 rounded-xl font-display font-semibold transition-all whitespace-nowrap ${
            filterTab === 'cancelados'
              ? 'bg-neutral-800 border border-neutral-700 text-neutral-300'
              : 'bg-neutral-900/40 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          Cancelados (17)
        </button>
      </div>

      {/* Sub-header Banner: Oportunidades de Conversão */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="font-display font-bold text-base sm:text-lg text-neutral-100">
            Oportunidades de Conversão (Top 3)
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300">
            27 clientes
          </span>
          <span className="text-xs text-neutral-400 hidden md:inline">
            • Clientes com perfil para assinatura e maior probabilidade de aderência.
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>R$ 8.100/mês em MRR potencial</span>
        </div>
      </div>

      {/* Main Layout: DataTable on Left, Opportunity + Suggested Plan on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: DataTable of Clients (7 cols if panel open, or 12 if closed) */}
        <div className={`${selectedClient ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all`}>
          <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 overflow-hidden shadow-xl">
            {/* Table Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-neutral-800/80">
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-neutral-100">
                  Clientes & Oportunidades
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {filteredOpportunities.length} clientes encontrados • Clique para ver detalhes na direita
                </p>
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 text-xs font-semibold transition-colors"
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
                          selectedRows.length === filteredOpportunities.length &&
                          filteredOpportunities.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-2 w-10 text-center">POS</th>
                    <th className="py-3 px-3 min-w-[170px]">CLIENTE & PERFIL</th>
                    <th className="py-3 px-3 text-center">FREQ.</th>
                    <th className="py-3 px-3">GASTO MÉD.</th>
                    <th className="py-3 px-3">ÚLTIMA VISITA</th>
                    <th className="py-3 px-3 text-center">PAGAMENTO</th>
                    <th className="py-3 px-3 text-center">CARTÃO</th>
                    <th className="py-3 pr-4 pl-3 text-right">AÇÕES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-xs">
                  {filteredOpportunities.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-neutral-500 text-xs">
                        Nenhuma oportunidade encontrada.
                      </td>
                    </tr>
                  ) : (
                    filteredOpportunities.map((client) => {
                      const isSelected = selectedClient?.id === client.id;
                      const isChecked = selectedRows.includes(client.id);

                      return (
                        <tr
                          key={client.id}
                          onClick={() => setSelectedClient(client)}
                          className={`transition-colors cursor-pointer group ${
                            isSelected
                              ? 'bg-neutral-800/70 border-l-2 border-l-amber-400'
                              : 'hover:bg-neutral-800/30'
                          }`}
                        >
                          {/* Checkbox */}
                          <td
                            className="py-3.5 pl-4 pr-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRow(client.id);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleRow(client.id)}
                              className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            />
                          </td>

                          {/* Ranking / Pos */}
                          <td className="py-3.5 px-2 text-center">
                            <span className="inline-flex w-6 h-6 rounded-lg bg-neutral-800 text-neutral-300 font-display font-bold text-xs items-center justify-center">
                              {client.rankingPosition}
                            </span>
                          </td>

                          {/* Cliente & Perfil */}
                          <td className="py-3.5 px-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-display font-bold text-xs sm:text-sm text-neutral-100 block">
                                  {client.name}
                                </span>
                                <span
                                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                    client.opportunityBadge === 'ALTA'
                                      ? 'bg-amber-950/60 border border-amber-500/50 text-amber-300'
                                      : client.opportunityBadge === 'MÉDIA'
                                      ? 'bg-blue-950/60 border border-blue-500/50 text-blue-300'
                                      : client.opportunityBadge === 'ATIVO'
                                      ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                                      : 'bg-rose-950/60 border border-rose-500/50 text-rose-300'
                                  }`}
                                >
                                  {client.opportunityBadge === 'ALTA'
                                    ? 'OPORTUNIDADE: ALTA'
                                    : client.opportunityBadge === 'MÉDIA'
                                    ? 'OPORTUNIDADE: MÉDIA'
                                    : client.opportunityBadge}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                                <span>Barbeiro:</span>
                                <strong className="text-neutral-300 font-medium">{client.preferredBarber}</strong>
                                <span>•</span>
                                <span className="text-neutral-500">{client.profileTag}</span>
                              </p>
                            </div>
                          </td>

                          {/* Frequência */}
                          <td className="py-3.5 px-3 text-center font-display font-semibold text-neutral-200 whitespace-nowrap">
                            {client.frequencyText}
                          </td>

                          {/* Gasto Médio */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="font-display font-bold text-xs text-neutral-100 block">
                              R$ {client.averageSpending}
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              LTV: R$ {client.historicalValue.toLocaleString('pt-BR')}
                            </span>
                          </td>

                          {/* Última Visita */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span
                              className={`text-xs ${
                                client.lastVisitDays > 30
                                  ? 'text-rose-400 font-semibold'
                                  : 'text-neutral-300'
                              }`}
                            >
                              {client.lastVisitText}
                            </span>
                          </td>

                          {/* Pagamento */}
                          <td className="py-3.5 px-3 text-center whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
                              {client.currentPayment}
                            </span>
                          </td>

                          {/* Cartão */}
                          <td className="py-3.5 px-3 text-center whitespace-nowrap">
                            {client.hasCreditCard ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Sim</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                <span>Não</span>
                              </span>
                            )}
                          </td>

                          {/* Ações */}
                          <td className="py-3.5 pr-4 pl-3 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedClient(client);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                isSelected
                                  ? 'bg-amber-400 text-neutral-950 font-bold'
                                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                              }`}
                            >
                              Ver
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer with Pagination */}
            <div className="p-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
              <span>
                Mostrando 1-{filteredOpportunities.length} de {filteredOpportunities.length} resultados
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

        {/* Right Column: Opportunity Analysis & Suggested Plan Component */}
        {selectedClient && (
          <div className="lg:col-span-5 space-y-4 sticky top-4">
            {/* Header Box of Selected Client */}
            <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300 font-display font-bold text-base">
                    #{selectedClient.rankingPosition}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-base text-neutral-100">
                        {selectedClient.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 border border-amber-500/50 text-amber-300">
                        {selectedClient.opportunityBadge === 'ALTA'
                          ? 'OPORTUNIDADE: ALTA'
                          : selectedClient.opportunityBadge === 'MÉDIA'
                          ? 'OPORTUNIDADE: MÉDIA'
                          : selectedClient.opportunityBadge}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Barbeiro preferido: <strong className="text-neutral-200">{selectedClient.preferredBarber}</strong> • {selectedClient.profileTag}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedClient(null)}
                  className="p-1 rounded text-neutral-500 hover:text-neutral-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 4 Quick Stat Pills */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-neutral-800/80 text-center">
                <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Frequência</span>
                  <span className="font-display font-bold text-xs text-neutral-200 mt-0.5 block">{selectedClient.frequencyText}</span>
                </div>
                <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Gasto Méd.</span>
                  <span className="font-display font-bold text-xs text-neutral-200 mt-0.5 block">R$ {selectedClient.averageSpending}</span>
                </div>
                <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Última Visita</span>
                  <span className="font-display font-bold text-xs text-neutral-200 mt-0.5 block">{selectedClient.lastVisitText}</span>
                </div>
                <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Cartão</span>
                  <span className={`font-display font-bold text-xs mt-0.5 block ${selectedClient.hasCreditCard ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {selectedClient.hasCreditCard ? 'Sim' : 'Não'}
                  </span>
                </div>
              </div>
            </div>

            {/* Component 1: POR QUE É UMA OPORTUNIDADE? matching screenshot */}
            <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-300">
                  Por que é uma oportunidade?
                </h4>
                <span className="text-[10px] text-neutral-500">
                  Análise Comportamental
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {selectedClient.reasons.map((reason, rIdx) => {
                  const isNegative = reason.toLowerCase().includes('ainda não') || reason.toLowerCase().includes('risco');
                  return (
                    <div key={rIdx} className="flex items-center gap-2.5 text-xs">
                      {isNegative ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      ) : (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                      <span className={isNegative ? 'text-amber-300' : 'text-neutral-300'}>
                        {reason}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Component 2: PLANO SUGERIDO matching screenshot */}
            <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-xs uppercase tracking-wider text-neutral-400">
                  Plano Sugerido
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
                  {selectedClient.adherenceLevel}
                </span>
              </div>

              {/* Plan Name and Price */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <h4 className="font-display font-black text-xl text-neutral-100">
                    {selectedClient.suggestedPlanName}
                  </h4>
                  <span className="text-xs text-neutral-400">
                    Cobrança mensal recorrente
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display font-black text-2xl text-amber-300">
                    R$ {selectedClient.suggestedPlanPrice}
                  </span>
                  <span className="text-xs text-neutral-400"> / mês</span>
                </div>
              </div>

              {/* Big Action Button: Sinalizar no Caixa */}
              <button
                onClick={() => setShowCheckoutSignalModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-400/20 active:scale-[0.99]"
              >
                <span>Sinalizar no Caixa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Ação Recomendada */}
              <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-300 text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Ação recomendada</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {selectedClient.recommendedAction}
                </p>
              </div>

              {/* Adherence Progress Bar */}
              <div className="pt-2 border-t border-neutral-800/80">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
                  <span>{selectedClient.adherenceLevel}</span>
                  <span className="font-semibold text-emerald-400">{selectedClient.adherencePercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${selectedClient.adherencePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Sinalizar no Caixa */}
      {showCheckoutSignalModal && selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-neutral-100">
                    Sinalizar Venda no Caixa
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Cliente: <strong>{selectedClient.name}</strong> • Plano: <strong>{selectedClient.suggestedPlanName}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCheckoutSignalModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pitch Guide */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-xs text-neutral-300">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Roteiro de Abordagem para o Caixa:</span>
              </span>
              <p className="text-neutral-400 leading-relaxed">
                "O {selectedClient.name} possui gasto médio de R$ {selectedClient.averageSpending}/mês. Ao oferecer o {selectedClient.suggestedPlanName} por R$ {selectedClient.suggestedPlanPrice}/mês, apresente a comodidade do serviço recorrente e o comparativo de economia imediata."
              </p>
            </div>

            <div className="space-y-1 text-xs text-neutral-400">
              <label className="font-semibold text-neutral-300">Observação interna para a Recepção:</label>
              <input
                type="text"
                defaultValue={`Cliente preferencial do barbeiro ${selectedClient.preferredBarber}. Oferecer na finalização do pagamento.`}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:outline-none focus:border-amber-500/60"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowCheckoutSignalModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-300 hover:bg-neutral-800 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSignalCheckout}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Confirmar Sinalização</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
