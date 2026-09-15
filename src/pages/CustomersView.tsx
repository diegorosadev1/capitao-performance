import React, { useState, useMemo } from 'react';
import {
  User,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  RotateCcw,
  Search,
  Download,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  QrCode,
  Sparkles,
  Target,
  ClipboardList,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  FileText,
  X,
  Copy,
  Check,
  MessageSquare,
  Clock,
  Tag,
  TrendingUp,
} from 'lucide-react';

export interface CustomerCRM {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string;
  lastVisitDays: number;
  lastVisitText: string;
  frequency: string;
  historicalValue: number;
  paymentType: 'Cartão' | 'PIX' | 'Dinheiro';
  classification: 'VIP' | 'Frequente' | 'Regular' | 'Baixo' | 'Em risco';
  potentialSubscription: 'Alto' | 'Médio' | 'Baixo';
  diagnostic: string;
  actionPlanType: 'plano' | 'analisar' | 'historico' | 'reativar';
  actionPlanLabel: string;
  whatsappScript: string;
}

export const CustomersView: React.FC = () => {
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'ativos' | 'inativos' | 'risco'>('todos');
  const [planFilter, setPlanFilter] = useState<'todos' | 'com_plano' | 'sem_plano'>('todos');
  const [potentialFilter, setPotentialFilter] = useState<'todos' | 'alto' | 'medio' | 'baixo'>('todos');

  // Selected customer for modal
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerCRM | null>(null);
  const [showFullPlanModal, setShowFullPlanModal] = useState<boolean>(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Exact dataset from the user screenshot
  const customersData: CustomerCRM[] = [
    {
      id: 'c-1',
      name: 'Rodrigo Mendonça',
      phone: '(11) 98765-4321',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      lastVisitDays: 8,
      lastVisitText: '8 dias',
      frequency: '5x/mês',
      historicalValue: 4960,
      paymentType: 'Cartão',
      classification: 'VIP',
      potentialSubscription: 'Alto',
      diagnostic: 'Alta frequência + gasto recorrente. Boa aderência à assinatura.',
      actionPlanType: 'plano',
      actionPlanLabel: 'Ver plano',
      whatsappScript: 'Fala Rodrigo, tudo bem? Aqui é da equipe Capitão! Como você frequenta a barbearia 5x ao mês, liberamos um plano de assinatura VIP exclusivo que vai te gerar mais de R$ 180 de economia mensal e agendamento prioritário. Quer que eu reserve seu próximo horário e te explique?',
    },
    {
      id: 'c-2',
      name: 'Juliana Costa',
      phone: '(11) 91234-5678',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      lastVisitDays: 12,
      lastVisitText: '12 dias',
      frequency: '3x/mês',
      historicalValue: 3120,
      paymentType: 'PIX',
      classification: 'Frequente',
      potentialSubscription: 'Médio',
      diagnostic: 'Já recebeu 1 oferta e não aderiu. Pode ser reabordada.',
      actionPlanType: 'analisar',
      actionPlanLabel: 'Analisar',
      whatsappScript: 'Olá Juliana! Tudo bem? Notamos que você tem uma rotina constante conosco. Preparamos uma proposta personalizada para seus serviços favoritos com cashback e cortesia de hidratação no primeiro mês. Posso te enviar os detalhes?',
    },
    {
      id: 'c-3',
      name: 'Fernando Lima',
      phone: '(11) 97654-3210',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      lastVisitDays: 28,
      lastVisitText: '28 dias',
      frequency: '2x/mês',
      historicalValue: 1850,
      paymentType: 'Cartão',
      classification: 'Regular',
      potentialSubscription: 'Baixo',
      diagnostic: 'Baixa frequência e gasto. Foco em retenção.',
      actionPlanType: 'historico',
      actionPlanLabel: 'Ver histórico',
      whatsappScript: 'Olá Fernando! Notamos que já faz quase um mês desde seu último atendimento. Que tal garantir seu horário para esta semana e manter o visual alinhado com 10% de cortesia?',
    },
    {
      id: 'c-4',
      name: 'Lucas Andrade',
      phone: '(11) 98765-4321',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      lastVisitDays: 15,
      lastVisitText: '15 dias',
      frequency: '4x/mês',
      historicalValue: 2980,
      paymentType: 'PIX',
      classification: 'Frequente',
      potentialSubscription: 'Alto',
      diagnostic: 'Já possui pacote, mas sem assinatura. Excelente candidato.',
      actionPlanType: 'plano',
      actionPlanLabel: 'Ver plano',
      whatsappScript: 'E aí Lucas, beleza? Vimos que você consome bastante nossos pacotes de barba e cabelo. Com a assinatura recorrente você paga menos que o pacote avulso e garante horários fixos. Vamos migrar?',
    },
    {
      id: 'c-5',
      name: 'Beatriz Oliveira',
      phone: '(11) 99321-7654',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      lastVisitDays: 45,
      lastVisitText: '45 dias',
      frequency: '1x/mês',
      historicalValue: 980,
      paymentType: 'Cartão',
      classification: 'Baixo',
      potentialSubscription: 'Médio',
      diagnostic: 'Última oferta há 30 dias. Pode estar em período de decisão.',
      actionPlanType: 'analisar',
      actionPlanLabel: 'Analisar',
      whatsappScript: 'Olá Beatriz! Passando para checar se ficou alguma dúvida sobre a assinatura que conversamos no seu último retorno. Conseguimos manter a condição especial até esta sexta!',
    },
    {
      id: 'c-6',
      name: 'Carlos Silva',
      phone: '(11) 99876-5432',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      lastVisitDays: 60,
      lastVisitText: '60 dias',
      frequency: '1x/mês',
      historicalValue: 680,
      paymentType: 'PIX',
      classification: 'Em risco',
      potentialSubscription: 'Médio',
      diagnostic: 'Cliente inativo. Reativar com oferta especial.',
      actionPlanType: 'reativar',
      actionPlanLabel: 'Reativar',
      whatsappScript: 'Olá Carlos Silva! Sentimos sua falta aqui na Capitão! Preparamos um retorno VIP para você: agende seu corte nesta semana e ganhe a barba terapia de cortesia. Posso reservar quinta às 17h?',
    },
    {
      id: 'c-7',
      name: 'Fernanda Souza',
      phone: '(11) 98432-1098',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      lastVisitDays: 10,
      lastVisitText: '10 dias',
      frequency: '3x/mês',
      historicalValue: 2540,
      paymentType: 'Cartão',
      classification: 'Frequente',
      potentialSubscription: 'Alto',
      diagnostic: 'Já fez 2 assinaturas. Reforçar renovação automática.',
      actionPlanType: 'plano',
      actionPlanLabel: 'Ver plano',
      whatsappScript: 'Olá Fernanda! Seu ciclo de renovação está se aproximando e queremos garantir que continue aproveitando todos os benefícios do seu plano sem interrupções. Quer ativar a renovação automática?',
    },
    {
      id: 'c-8',
      name: 'Thiago Santos',
      phone: '(11) 96543-2109',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      lastVisitDays: 22,
      lastVisitText: '22 dias',
      frequency: '2x/mês',
      historicalValue: 1620,
      paymentType: 'PIX',
      classification: 'Regular',
      potentialSubscription: 'Médio',
      diagnostic: 'Gasto recorrente + boa aderência. Oferecer assinatura.',
      actionPlanType: 'plano',
      actionPlanLabel: 'Ver plano',
      whatsappScript: 'Grande Thiago! Vi que você vem mantendo uma boa rotina de 2x ao mês. Temos um plano que encaixa perfeitamente na sua rotina e reduz seu gasto por atendimento. Vamos conversar na próxima visita?',
    },
  ];

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customersData.filter((c) => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesPhone = c.phone.includes(query);
        if (!matchesName && !matchesPhone) return false;
      }

      // Status Filter
      if (statusFilter === 'ativos' && c.classification === 'Em risco') return false;
      if (statusFilter === 'inativos' && c.lastVisitDays < 60) return false;
      if (statusFilter === 'risco' && c.classification !== 'Em risco') return false;

      // Plan Filter
      if (planFilter === 'com_plano' && c.classification !== 'VIP') return false;
      if (planFilter === 'sem_plano' && c.classification === 'VIP') return false;

      // Potential Filter
      if (potentialFilter === 'alto' && c.potentialSubscription !== 'Alto') return false;
      if (potentialFilter === 'medio' && c.potentialSubscription !== 'Médio') return false;
      if (potentialFilter === 'baixo' && c.potentialSubscription !== 'Baixo') return false;

      return true;
    });
  }, [searchTerm, statusFilter, planFilter, potentialFilter]);

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Cliente,Telefone,Ultima_Visita,Frequencia,Valor_Historico,Pagamento,Classificacao,Potencial,Diagnostico'];
    const rows = filteredCustomers.map(
      (c) =>
        `"${c.name}","${c.phone}","${c.lastVisitText}","${c.frequency}",${c.historicalValue},"${c.paymentType}","${c.classification}","${c.potentialSubscription}","${c.diagnostic}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clientes_crm_capitao.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyScript = () => {
    if (!selectedCustomer) return;
    navigator.clipboard.writeText(selectedCustomer.whatsappScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleSendWhatsApp = () => {
    if (!selectedCustomer) return;
    const cleanPhone = selectedCustomer.phone.replace(/\D/g, '');
    const encodedMsg = encodeURIComponent(selectedCustomer.whatsappScript);
    window.open(`https://wa.me/55${cleanPhone}?text=${encodedMsg}`, '_blank');
    setActionSuccessMessage(`Abordagem via WhatsApp enviada para ${selectedCustomer.name}!`);
    setTimeout(() => setActionSuccessMessage(null), 4000);
    setSelectedCustomer(null);
  };

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Toast Notification */}
      {actionSuccessMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. Page Header matching screenshot                          */}
      {/* ============================================================ */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <User className="w-6 h-6 text-[#F5F5F5] shrink-0 stroke-[2]" />
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
            Clientes / CRM
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#737373]">
          Entenda seus clientes, identifique oportunidades e aumente a retenção.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 2. Top 5 KPI Cards Grid                                      */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total de Clientes */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
              <div className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <User className="w-3.5 h-3.5 text-[#a3a3a3]" />
              </div>
              <span className="truncate">Total de Clientes</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
                1.842
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3 h-3" />
                12%
              </span>
            </div>
          </div>
          <div className="text-[11px] text-[#737373]">
            vs. mês anterior
          </div>
        </div>

        {/* Card 2: Clientes Ativos */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
              <div className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <UserCheck className="w-3.5 h-3.5 text-[#a3a3a3]" />
              </div>
              <span className="truncate">Clientes Ativos</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
                1.498
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3 h-3" />
                8%
              </span>
            </div>
          </div>
          <div className="text-[11px] text-[#737373]">
            vs. mês anterior
          </div>
        </div>

        {/* Card 3: Inativos (60+ dias) */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
              <div className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <Calendar className="w-3.5 h-3.5 text-[#a3a3a3]" />
              </div>
              <span className="truncate">Inativos (60+ dias)</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
                214
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-400">
                <ArrowUpRight className="w-3 h-3" />
                23%
              </span>
            </div>
          </div>
          <div className="text-[11px] text-[#737373]">
            vs. mês anterior
          </div>
        </div>

        {/* Card 4: Ticket Médio */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
              <div className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <Tag className="w-3.5 h-3.5 text-[#a3a3a3]" />
              </div>
              <span className="truncate">Ticket Médio</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
                R$ 176
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3 h-3" />
                6%
              </span>
            </div>
          </div>
          <div className="text-[11px] text-[#737373]">
            vs. mês anterior
          </div>
        </div>

        {/* Card 5: Taxa de Retenção */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
              <div className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <RotateCcw className="w-3.5 h-3.5 text-[#a3a3a3]" />
              </div>
              <span className="truncate">Taxa de Retenção</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
                87,4%
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3 h-3" />
                3%
              </span>
            </div>
          </div>
          <div className="text-[11px] text-[#737373]">
            vs. mês anterior
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. Main Split View: Left Datatable & Right Intelligence      */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT CARD (8 Columns): Tabela e Filtros de Clientes          */}
        {/* ============================================================ */}
        <div className="xl:col-span-8 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 shadow-sm space-y-4">
          {/* Search & Filters Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar cliente (nome, telefone, CPF...)"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D0D0D] border border-[#262626] text-xs text-[#F5F5F5] placeholder-[#525252] focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>

            {/* Filter Dropdowns & Export Button */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Status Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#0D0D0D] border border-[#262626] text-xs text-[#a3a3a3] focus:outline-none focus:border-neutral-600 cursor-pointer"
              >
                <option value="todos">Todos os status</option>
                <option value="ativos">Clientes Ativos</option>
                <option value="inativos">Inativos (60+ dias)</option>
                <option value="risco">Em risco</option>
              </select>

              {/* Planos Dropdown */}
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#0D0D0D] border border-[#262626] text-xs text-[#a3a3a3] focus:outline-none focus:border-neutral-600 cursor-pointer"
              >
                <option value="todos">Todos os planos</option>
                <option value="com_plano">Com Assinatura (VIP)</option>
                <option value="sem_plano">Sem Assinatura</option>
              </select>

              {/* Potenciais Dropdown */}
              <select
                value={potentialFilter}
                onChange={(e) => setPotentialFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#0D0D0D] border border-[#262626] text-xs text-[#a3a3a3] focus:outline-none focus:border-neutral-600 cursor-pointer"
              >
                <option value="todos">Todos os potenciais</option>
                <option value="alto">Alto</option>
                <option value="medio">Médio</option>
                <option value="baixo">Baixo</option>
              </select>

              {/* Export Button */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0D0D0D] hover:bg-[#1a1a1a] border border-[#262626] text-xs text-[#d4d4d4] hover:text-white transition-all cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#a3a3a3]" />
                <span>Exportar</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-[#262626] bg-[#0D0D0D]/70">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262626] text-[10px] font-display font-bold uppercase tracking-wider text-[#737373]">
                  <th className="py-3 px-4">CLIENTE</th>
                  <th className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span>ÚLTIMA VISITA</span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">FREQUÊNCIA</th>
                  <th className="py-3 px-4">VALOR HISTÓRICO</th>
                  <th className="py-3 px-4">PAGAMENTO</th>
                  <th className="py-3 px-4">CLASSIFICAÇÃO</th>
                  <th className="py-3 px-4">POTENCIAL ASSINATURA</th>
                  <th className="py-3 px-4">DIAGNÓSTICO &amp; AÇÃO SUGERIDA</th>
                  <th className="py-3 px-4 text-center">PLANO DE AÇÃO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-[#141414] transition-colors"
                  >
                    {/* Cliente */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatarUrl}
                          alt={cust.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#333333]"
                        />
                        <div>
                          <span className="font-display font-bold text-sm text-[#F5F5F5] block">
                            {cust.name}
                          </span>
                          <span className="text-[11px] text-[#737373] block leading-tight">
                            {cust.phone}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Última Visita */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs">
                      {cust.lastVisitDays >= 60 ? (
                        <span className="text-rose-400 font-bold">
                          {cust.lastVisitText}
                        </span>
                      ) : (
                        <span className="text-[#a3a3a3]">
                          {cust.lastVisitText}
                        </span>
                      )}
                    </td>

                    {/* Frequência */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#a3a3a3]">
                      {cust.frequency}
                    </td>

                    {/* Valor Histórico */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs font-display font-bold text-[#F5F5F5]">
                      R$ {cust.historicalValue.toLocaleString('pt-BR')}
                    </td>

                    {/* Pagamento */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#a3a3a3]">
                      <div className="flex items-center gap-1.5">
                        {cust.paymentType === 'Cartão' ? (
                          <>
                            <CreditCard className="w-3.5 h-3.5 text-[#737373]" />
                            <span>Cartão</span>
                          </>
                        ) : (
                          <>
                            <QrCode className="w-3.5 h-3.5 text-[#737373]" />
                            <span>PIX</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Classificação */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {cust.classification === 'VIP' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[11px] font-bold">
                          ✦ VIP
                        </span>
                      )}
                      {cust.classification === 'Frequente' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-400 text-[11px] font-medium">
                          ✦ Frequente
                        </span>
                      )}
                      {cust.classification === 'Regular' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-[11px] font-medium">
                          ✦ Regular
                        </span>
                      )}
                      {cust.classification === 'Baixo' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-400 text-[11px] font-medium">
                          ✦ Baixo
                        </span>
                      )}
                      {cust.classification === 'Em risco' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/40 text-rose-400 text-[11px] font-bold">
                          ✦ Em risco
                        </span>
                      )}
                    </td>

                    {/* Potencial Assinatura */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {cust.potentialSubscription === 'Alto' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Alto
                        </span>
                      )}
                      {cust.potentialSubscription === 'Médio' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[11px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          Médio
                        </span>
                      )}
                      {cust.potentialSubscription === 'Baixo' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-400 text-[11px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                          Baixo
                        </span>
                      )}
                    </td>

                    {/* Diagnóstico & Ação Sugerida */}
                    <td className="py-3.5 px-4 max-w-[280px]">
                      <p className="text-xs text-[#a3a3a3] leading-relaxed line-clamp-2">
                        {cust.diagnostic}
                      </p>
                    </td>

                    {/* Plano de Ação */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      {cust.actionPlanLabel === 'Ver plano' && (
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(cust)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/50 text-xs font-semibold text-amber-400 transition-all cursor-pointer shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ver plano</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {cust.actionPlanLabel === 'Analisar' && (
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(cust)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-neutral-700 text-xs font-medium text-[#d4d4d4] hover:text-white transition-all cursor-pointer"
                        >
                          <span>Analisar</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {cust.actionPlanLabel === 'Ver histórico' && (
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(cust)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-neutral-700 text-xs font-medium text-[#d4d4d4] hover:text-white transition-all cursor-pointer"
                        >
                          <span>Ver histórico</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {cust.actionPlanLabel === 'Reativar' && (
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(cust)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-rose-950/40 border border-[#262626] hover:border-rose-700/60 text-xs font-medium text-rose-300 hover:text-white transition-all cursor-pointer"
                        >
                          <span>Reativar</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#737373] pt-1">
            <span>1 – 10 de 1.842 clientes</span>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled
                  className="w-7 h-7 rounded-lg bg-[#0D0D0D] border border-[#262626] flex items-center justify-center text-[#525252] disabled:opacity-40"
                >
                  ‹
                </button>
                <span className="w-7 h-7 rounded-lg bg-[#1f1f1f] border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg bg-[#0D0D0D] border border-[#262626] flex items-center justify-center text-[#a3a3a3] hover:text-white"
                >
                  2
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg bg-[#0D0D0D] border border-[#262626] flex items-center justify-center text-[#a3a3a3] hover:text-white"
                >
                  3
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg bg-[#0D0D0D] border border-[#262626] flex items-center justify-center text-[#a3a3a3] hover:text-white"
                >
                  4
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg bg-[#0D0D0D] border border-[#262626] flex items-center justify-center text-[#a3a3a3] hover:text-white"
                >
                  5
                </button>
                <span className="text-[#525252] px-1">...</span>
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg bg-[#0D0D0D] border border-[#262626] flex items-center justify-center text-[#a3a3a3] hover:text-white"
                >
                  ›
                </button>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0D0D0D] border border-[#262626] text-[11px] text-[#a3a3a3]">
                <span>Mostrar 10</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT CARD (4 Columns): Capitão Intelligence CRM             */}
        {/* ============================================================ */}
        <div className="xl:col-span-4 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-950 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 fill-amber-400/20 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-[#F5F5F5]">
                  Capitão Intelligence
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-neutral-800 border border-neutral-700 text-[10px] font-mono text-neutral-400 font-medium">
                  CRM
                </span>
              </div>
              <p className="text-xs text-[#737373] mt-0.5">
                Análise inteligente e plano de ação para melhores resultados.
              </p>
            </div>
          </div>

          {/* Section 1: Insights Gerais */}
          <div className="space-y-3 pt-1 border-t border-[#262626]/80">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Insights Gerais</span>
            </div>

            <div className="grid grid-cols-4 gap-2 py-1">
              {/* Item 1 */}
              <div>
                <div className="font-display font-black text-xl text-[#F5F5F5] tracking-tight">
                  12
                </div>
                <div className="text-[10px] text-[#737373] leading-tight mt-0.5">
                  clientes em atenção
                </div>
                <div className="text-[10px] font-bold text-emerald-400 mt-1">
                  + 3% <span className="text-[9px] text-[#525252] font-normal block">vs. mês anterior</span>
                </div>
              </div>

              {/* Item 2 */}
              <div>
                <div className="font-display font-black text-xl text-[#F5F5F5] tracking-tight">
                  5
                </div>
                <div className="text-[10px] text-[#737373] leading-tight mt-0.5">
                  potenciais assinaturas
                </div>
                <div className="text-[10px] font-bold text-emerald-400 mt-1 flex items-center gap-0.5">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  40%
                </div>
              </div>

              {/* Item 3 */}
              <div>
                <div className="font-display font-black text-xl text-[#F5F5F5] tracking-tight">
                  3
                </div>
                <div className="text-[10px] text-[#737373] leading-tight mt-0.5">
                  já recusaram oferta
                </div>
                <div className="text-[10px] font-bold text-rose-400 mt-1 flex items-center gap-0.5">
                  <ArrowDownRight className="w-2.5 h-2.5" />
                  25%
                </div>
              </div>

              {/* Item 4 */}
              <div>
                <div className="font-display font-black text-xl text-[#F5F5F5] tracking-tight">
                  4
                </div>
                <div className="text-[10px] text-[#737373] leading-tight mt-0.5">
                  fora da janela de retorno
                </div>
                <div className="text-[10px] font-bold text-amber-400 mt-1">
                  + 2%
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Oportunidades de Hoje */}
          <div className="space-y-3 pt-3 border-t border-[#262626]/80">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-amber-400">
              <Target className="w-3.5 h-3.5" />
              <span>Oportunidades de Hoje</span>
            </div>

            <div className="space-y-2">
              {/* Oportunidade 1 */}
              <button
                type="button"
                onClick={() => setShowOpportunityModal('alta_freq')}
                className="w-full p-2.5 rounded-xl bg-[#0D0D0D] hover:bg-[#141414] border border-[#262626] flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400 rotate-45" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#F5F5F5] truncate group-hover:text-white">
                      Clientes com alta frequência e sem assinatura
                    </p>
                    <p className="text-[11px] text-[#737373] truncate">
                      5 clientes | Ticket médio: R$ 210
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#525252] group-hover:text-neutral-300 shrink-0 ml-2" />
              </button>

              {/* Oportunidade 2 */}
              <button
                type="button"
                onClick={() => setShowOpportunityModal('oferta_recusada')}
                className="w-full p-2.5 rounded-xl bg-[#0D0D0D] hover:bg-[#141414] border border-[#262626] flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#F5F5F5] truncate group-hover:text-white">
                      Clientes que já receberam oferta (e não aderiram)
                    </p>
                    <p className="text-[11px] text-[#737373] truncate">
                      3 clientes | Última oferta: ≤ 30 dias
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#525252] group-hover:text-neutral-300 shrink-0 ml-2" />
              </button>

              {/* Oportunidade 3 */}
              <button
                type="button"
                onClick={() => setShowOpportunityModal('inativos')}
                className="w-full p-2.5 rounded-xl bg-[#0D0D0D] hover:bg-[#141414] border border-[#262626] flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#F5F5F5] truncate group-hover:text-white">
                      Clientes inativos (60+ dias)
                    </p>
                    <p className="text-[11px] text-[#737373] truncate">
                      4 clientes | Potencial de reativação: médio
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#525252] group-hover:text-neutral-300 shrink-0 ml-2" />
              </button>
            </div>
          </div>

          {/* Section 3: Plano de Ação (Equipe de Recepção) */}
          <div className="space-y-3 pt-3 border-t border-[#262626]/80">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-amber-400">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Plano de Ação (Equipe de Recepção)</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-[#d4d4d4]">
                <div className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  1
                </div>
                <span className="text-[11px] leading-snug text-[#b0b0b0]">
                  Priorizar os 5 clientes de maior frequência.
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#d4d4d4]">
                <div className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  2
                </div>
                <span className="text-[11px] leading-snug text-[#b0b0b0]">
                  Identificar quem já recebeu oferta e recusou.
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#d4d4d4]">
                <div className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  3
                </div>
                <span className="text-[11px] leading-snug text-[#b0b0b0]">
                  Abordar novamente apenas quem apresenta aderência.
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#d4d4d4]">
                <div className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  4
                </div>
                <span className="text-[11px] leading-snug text-[#b0b0b0]">
                  Registrar o resultado da abordagem no sistema.
                </span>
              </div>
            </div>

            {/* Ver plano completo button */}
            <button
              type="button"
              onClick={() => setShowFullPlanModal(true)}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer mt-3"
            >
              <FileText className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
              <span>Ver plano completo &gt;</span>
            </button>
          </div>

          {/* Section 4: Dica do Capitão */}
          <div className="space-y-2 pt-3 border-t border-[#262626]/80">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-amber-400">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Dica do Capitão</span>
            </div>
            <p className="text-xs text-[#a3a3a3] leading-relaxed">
              Aumente em 15% a conversão de assinaturas focando nos clientes que já compraram pacotes 3x ou mais no último trimestre.
            </p>
            <button
              type="button"
              onClick={() => setShowFullPlanModal(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>Ver análise detalhada</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. MODAL: Detalhes do Cliente / Plano de Abordagem           */}
      {/* ============================================================ */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCustomer.avatarUrl}
                  alt={selectedCustomer.name}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-lg text-white">
                      {selectedCustomer.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800 border border-neutral-700 text-neutral-300">
                      {selectedCustomer.classification}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">{selectedCustomer.phone}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Última Visita</span>
                <span className="text-sm font-bold text-white block mt-0.5">
                  {selectedCustomer.lastVisitText}
                </span>
                <span className="text-[10px] text-neutral-400">{selectedCustomer.frequency}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">LTV Histórico</span>
                <span className="text-sm font-bold text-white block mt-0.5">
                  R$ {selectedCustomer.historicalValue.toLocaleString('pt-BR')}
                </span>
                <span className="text-[10px] text-neutral-400">Via {selectedCustomer.paymentType}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Potencial Assinatura</span>
                <span className="text-sm font-bold text-emerald-400 block mt-0.5">
                  {selectedCustomer.potentialSubscription}
                </span>
                <span className="text-[10px] text-neutral-400">Alta aderência</span>
              </div>
            </div>

            {/* Diagnostic Box */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Diagnóstico Comportamental
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {selectedCustomer.diagnostic}
              </p>
            </div>

            {/* WhatsApp Pitch Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Script de Abordagem WhatsApp Sugerido
                </span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-sans">
                {selectedCustomer.whatsappScript}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-display font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
                <span>Abrir WhatsApp Web</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. MODAL: Plano Completo CRM                                 */}
      {/* ============================================================ */}
      {showFullPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Plano Estratégico de CRM &amp; Retenção
                  </h3>
                  <p className="text-xs text-neutral-400">Diretrizes da Central de Performance Capitão</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFullPlanModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  1. Segmentação e Priorização de Oferta
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Clientes com mais de 3 visitas mensais e sem plano ativo representam a maior alavanca de LTV. Apresentar o plano como um benefício econômico imediato durante o checkout.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  2. Script Padronizado na Recepção
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Treinar a equipe de recepção para consultar o status de CRM no momento em que o cliente chega. Se o potencial for &quot;Alto&quot;, preparar a abordagem ao finalizar o pagamento.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  3. Protocolo de Reativação (60+ dias)
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Enviar mensagens de reativação com cortesias de alto valor percebido (ex: Barboterapia ou Hidratação express) para clientes que ultrapassaram 60 dias sem agendamento.
                </p>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-neutral-800">
              <span className="text-xs text-neutral-500">Capitão CRM • v2.4</span>
              <button
                type="button"
                onClick={() => setShowFullPlanModal(false)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MODAL: Oportunidades Filtradas                            */}
      {/* ============================================================ */}
      {showOpportunityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h3 className="font-display font-bold text-base text-white">
                {showOpportunityModal === 'alta_freq' && 'Clientes com Alta Frequência'}
                {showOpportunityModal === 'oferta_recusada' && 'Reabordagem de Oferta Recusada'}
                {showOpportunityModal === 'inativos' && 'Clientes Inativos (60+ dias)'}
              </h3>
              <button
                type="button"
                onClick={() => setShowOpportunityModal(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-300">
              {showOpportunityModal === 'alta_freq' &&
                'Estes clientes visitam a barbearia pelo menos 3 vezes ao mês e já acumularam gasto suficiente para amortizar um plano recorrente.'}
              {showOpportunityModal === 'oferta_recusada' &&
                'Clientes que recusaram a primeira oferta há mais de 30 dias. Ofereça uma condição especial de degustação com retorno garantido.'}
              {showOpportunityModal === 'inativos' &&
                'Clientes sem visita nos últimos 60 dias. Recomendado envio de mensagem de reativação com convite e cortesia.'}
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowOpportunityModal(null)}
                className="px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs"
              >
                Ver clientes na lista
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
