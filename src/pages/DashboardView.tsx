import React, { useState } from 'react';
import {
  DollarSign,
  Target,
  TrendingUp,
  AlertTriangle,
  Award,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Download,
  CheckCircle2,
  FileText,
  X,
  Send,
  Eye,
  Plus,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Professional } from '../types';

interface DashboardViewProps {
  onNavigate: (route: string) => void;
  onSelectProfessional: (prof: Professional) => void;
}

interface ProfessionalRow {
  id: string;
  pos: number;
  name: string;
  avatarUrl: string;
  revenue: number;
  target: number;
  targetPercentage: number;
  status: 'acima' | 'no_ritmo' | 'atencao';
  statusLabel: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
}) => {
  // Modal states
  const [showAiModal, setShowAiModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showActionPlanModal, setShowActionPlanModal] = useState(false);
  const [selectedActionDetail, setSelectedActionDetail] = useState<string | null>(null);
  const [aiQuestionInput, setAiQuestionInput] = useState('');
  const [aiConversation, setAiConversation] = useState<Array<{ sender: 'user' | 'capitao'; text: string }>>([
    {
      sender: 'capitao',
      text: 'Olá! Sou o assistente de inteligência do Capitão. Analisei os números da Unidade Jardins: estamos R$ 6.160 abaixo do ritmo projetado para a meta de R$ 103.000. Como posso te apoiar agora?',
    },
  ]);

  // Chart data: 30 days evolution matching screenshot curve
  const performanceData = [
    { day: '01', realizado: 3400, meta: 3433, projecao: 3400 },
    { day: '03', realizado: 10200, meta: 10300, projecao: 10200 },
    { day: '06', realizado: 19500, meta: 20600, projecao: 19500 },
    { day: '09', realizado: 29800, meta: 30900, projecao: 29800 },
    { day: '12', realizado: 41200, meta: 41200, projecao: 41200 },
    { day: '15', realizado: 51800, meta: 51500, projecao: 51800 },
    { day: '18', realizado: 61400, meta: 61800, projecao: 61400 },
    { day: '21', realizado: 71000, meta: 72100, projecao: 71000 },
    { day: '23', realizado: 87420, meta: 82400, projecao: 87420 },
    { day: '26', realizado: null, meta: 89200, projecao: 91600 },
    { day: '28', realizado: null, meta: 96100, projecao: 94200 },
    { day: '30', realizado: null, meta: 103000, projecao: 96840 },
  ];

  // Professional rows exactly matching the screenshot
  const professionalsTable: ProfessionalRow[] = [
    {
      id: 'prof-lucas',
      pos: 1,
      name: 'Lucas',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      revenue: 26400,
      target: 22000,
      targetPercentage: 120,
      status: 'acima',
      statusLabel: '✓ Acima',
    },
    {
      id: 'prof-matheus',
      pos: 2,
      name: 'Matheus',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      revenue: 24150,
      target: 22000,
      targetPercentage: 110,
      status: 'acima',
      statusLabel: '✓ Acima',
    },
    {
      id: 'prof-joao',
      pos: 3,
      name: 'João',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      revenue: 21800,
      target: 22000,
      targetPercentage: 99,
      status: 'no_ritmo',
      statusLabel: 'No ritmo',
    },
    {
      id: 'prof-pedro',
      pos: 4,
      name: 'Pedro',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      revenue: 17200,
      target: 20000,
      targetPercentage: 86,
      status: 'atencao',
      statusLabel: 'Atenção',
    },
    {
      id: 'prof-everton',
      pos: 5,
      name: 'Everton',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      revenue: 14980,
      target: 18000,
      targetPercentage: 83,
      status: 'atencao',
      statusLabel: 'Atenção',
    },
    {
      id: 'prof-rafael',
      pos: 6,
      name: 'Rafael',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      revenue: 13850,
      target: 16000,
      targetPercentage: 87,
      status: 'no_ritmo',
      statusLabel: 'No ritmo',
    },
  ];

  const handleSendAiQuestion = (customText?: string) => {
    const query = customText || aiQuestionInput;
    if (!query.trim()) return;

    setAiConversation((prev) => [...prev, { sender: 'user', text: query }]);
    setAiQuestionInput('');

    setTimeout(() => {
      let response = '';
      if (query.toLowerCase().includes('recuperar') || query.toLowerCase().includes('pedro') || query.toLowerCase().includes('atenção')) {
        response = 'Para recuperar Pedro, Carlos e Rafael: 1) Redistribuir 15 novos agendamentos da recepção; 2) Estimular combo barba terapia + corte; 3) Pedro precisa apenas de mais 4 atendimentos para voltar a 95% da meta.';
      } else if (query.toLowerCase().includes('meta') || query.toLowerCase().includes('103')) {
        response = 'Para bater os R$ 103.000 faltam R$ 6.160 em relação ao ritmo projetado (ou R$ 15.580 no total restante). Se cada barbeiro realizar 1 upgrade de serviço por dia nos próximos 7 dias, cobrimos o gap.';
      } else if (query.toLowerCase().includes('assinatura')) {
        response = 'O Clube Capitão já conta com 28 novas adesões no mês. Identificamos 27 clientes frequentes com potencial imediato para conversão em planos recorrentes.';
      } else {
        response = 'Analisando os indicadores da unidade: terças e quartas têm ocupação 18% abaixo do pico de fim de semana. Oferecer hidratação cortesia nesses dias eleva o fluxo e a conversão.';
      }
      setAiConversation((prev) => [...prev, { sender: 'capitao', text: response }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Page Title Section exactly matching screenshot */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-neutral-400">
            VISÃO GERAL
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight mt-0.5">
            Visão Geral
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mt-1 leading-relaxed">
            Acompanhe os principais indicadores da sua barbearia e veja o que está funcionando e o que precisa de atenção para atingir a meta
          </p>
        </div>

        {/* Action Controls matching screenshot */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
          <span className="text-xs text-neutral-400 pr-1">
            Última atualização: 23/09/2026 - 14:32
          </span>

          <button
            onClick={() => onNavigate('relatorios')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-200 hover:text-white hover:border-neutral-700 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>Gerar relatório</span>
          </button>

          <button
            onClick={() => setShowActionPlanModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-display font-bold tracking-wider transition-all shadow-sm"
          >
            <span>+ Plano de Ação</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards Row exactly matching image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: FATURAMENTO REALIZADO */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
              FATURAMENTO REALIZADO
            </span>
            <DollarSign className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
              R$ 87.420
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Meta: R$ 103.000
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
              +8.7% vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 2: ATINGIMENTO DA META */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
              ATINGIMENTO DA META
            </span>
            <Target className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
              84,9%
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Projeção: R$ 96.840
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-800/30">
              -10.1% vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 3: PROJEÇÃO NO RITMO ATUAL */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
              PROJEÇÃO NO RITMO ATUAL
            </span>
            <TrendingUp className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
              R$ 96.840
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Falta: R$ 6.160
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-800/30">
              -5.2% vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 4: ABAIXO DO ESPERADO */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-rose-400">
              ABAIXO DO ESPERADO
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-rose-400 tracking-tight">
              R$ 6.160
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Gap atual para a meta
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-800/30">
              -8.2% vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 5: NOVAS ASSINATURAS */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
              NOVAS ASSINATURAS
            </span>
            <Award className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
              28
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Meta: 35
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
              +16.7% vs. mês anterior
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left 8 cols, Right 4 cols matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN (approx 8 cols on lg) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Card 1: Desempenho da barbearia */}
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <div>
                <h3 className="font-display font-bold text-base text-neutral-100">
                  Desempenho da barbearia
                </h3>
                <p className="text-xs text-neutral-400">
                  Faturamento dos últimos 30 dias
                </p>
              </div>

              {/* Legend matching screenshot */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <span className="w-3 h-0.5 bg-cyan-400" />
                  <span>Realizado</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="w-3 border-t-2 border-dashed border-neutral-500" />
                  <span>Meta</span>
                </div>
                <div className="px-2.5 py-0.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 font-display font-bold text-xs">
                  R$ 87.420 <span className="text-[10px] text-neutral-400 font-normal">/ Meta R$ 103.000</span>
                </div>
              </div>
            </div>

            {/* Area & Line Chart */}
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="cyanFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="#737373"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#262626' }}
                  />
                  <YAxis
                    stroke="#737373"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                    domain={[0, 110000]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#171717',
                      borderColor: '#404040',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val: number, name: string) => [
                      `R$ ${val?.toLocaleString('pt-BR')}`,
                      name === 'realizado' ? 'Realizado' : name === 'meta' ? 'Meta' : 'Projeção',
                    ]}
                  />
                  {/* Target dashed line */}
                  <Line
                    type="monotone"
                    dataKey="meta"
                    stroke="#737373"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  {/* Projected curve line */}
                  <Line
                    type="monotone"
                    dataKey="projecao"
                    stroke="#22d3ee"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    dot={false}
                  />
                  {/* Realized solid filled curve */}
                  <Area
                    type="monotone"
                    dataKey="realizado"
                    stroke="#22d3ee"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#cyanFill)"
                    dot={{ r: 3, fill: '#22d3ee', strokeWidth: 1, stroke: '#0a0a0a' }}
                    activeDot={{ r: 5, fill: '#fff', stroke: '#22d3ee', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Inner Alert notification banner matching screenshot */}
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-rose-400 block">
                  A barbearia está 15,1% abaixo da meta no período.
                </span>
                <span className="text-neutral-400 block text-[11px]">
                  O ritmo atual precisa acelerar em R$ 6.160 para alcançar o resultado esperado.
                </span>
              </div>
              <button
                onClick={() => onNavigate('inteligencia')}
                className="text-xs font-semibold text-rose-300 hover:text-rose-100 flex items-center gap-1 self-end sm:self-auto shrink-0"
              >
                <span>Ver detalhes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Plano de ação */}
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 text-xs font-bold">+</span>
                  <h3 className="font-display font-bold text-base text-neutral-100">
                    Plano de ação
                  </h3>
                </div>
                <p className="text-xs text-neutral-400">
                  Para recuperar o ritmo da meta
                </p>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Prioridade
              </span>
            </div>

            {/* 3 Steps Columns matching screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex flex-col justify-between space-y-3 hover:border-neutral-700 transition-all">
                <div className="space-y-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-300 font-display font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-display font-bold text-xs text-neutral-100 leading-snug">
                    Aumentar conversão de assinaturas
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    27 clientes apresentam comportamento compatível com assinatura.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('assinaturas')}
                  className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 pt-1"
                >
                  <span>Ver estratégia</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex flex-col justify-between space-y-3 hover:border-neutral-700 transition-all">
                <div className="space-y-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-300 font-display font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-display font-bold text-xs text-neutral-100 leading-snug">
                    Recuperar performance de 3 profissionais
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Pedro, Carlos e Rafael estão abaixo do ritmo esperado.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('profissionais')}
                  className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 pt-1"
                >
                  <span>Ver profissionais</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex flex-col justify-between space-y-3 hover:border-neutral-700 transition-all">
                <div className="space-y-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-300 font-display font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-display font-bold text-xs text-neutral-100 leading-snug">
                    Trabalhar ticket médio
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Identificar serviços/compras que estão reduzindo o ticket.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedActionDetail('ticket');
                    setShowActionPlanModal(true);
                  }}
                  className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 pt-1"
                >
                  <span>Ver detalhes</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Performance dos profissionais (Table matching screenshot) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-neutral-800 flex items-center justify-center text-[10px] text-neutral-400">
                  👥
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-neutral-100">
                    Performance dos profissionais
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Veja quem está acima, no ritmo ou abaixo da meta.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('profissionais')}
                className="text-xs text-neutral-300 hover:text-white font-medium flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Ver ranking completo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-[10px] bg-neutral-950/30">
                    <th className="py-2.5 px-3 w-10 text-center">POS</th>
                    <th className="py-2.5 px-3">PROFISSIONAL</th>
                    <th className="py-2.5 px-3">FATURAMENTO</th>
                    <th className="py-2.5 px-3">META</th>
                    <th className="py-2.5 px-3">%</th>
                    <th className="py-2.5 px-3 text-right pr-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {professionalsTable.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-neutral-800/30 transition-colors cursor-pointer"
                      onClick={() => onNavigate('profissionais')}
                    >
                      <td className="py-3 px-3 text-center">
                        <span className="w-6 h-6 rounded-md bg-neutral-800 text-neutral-300 font-display font-bold text-xs inline-flex items-center justify-center">
                          {row.pos}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={row.avatarUrl}
                            alt={row.name}
                            className="w-7 h-7 rounded-full object-cover border border-neutral-700"
                          />
                          <span className="font-display font-medium text-neutral-100">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-display font-bold text-neutral-100">
                        R$ {row.revenue.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-3 font-display text-neutral-400">
                        R$ {row.target.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-3 font-display font-semibold text-neutral-200">
                        {row.targetPercentage}%
                      </td>
                      <td className="py-3 px-3 text-right pr-4">
                        {row.status === 'acima' && (
                          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                            ✓ Acima
                          </span>
                        )}
                        {row.status === 'no_ritmo' && (
                          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                            No ritmo
                          </span>
                        )}
                        {row.status === 'atencao' && (
                          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-400 border border-rose-800/40">
                            Atenção
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (approx 4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: O que o Capitão está vendo */}
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4 shadow-xl">
            <div>
              <h3 className="font-display font-bold text-sm text-neutral-100">
                O que o Capitão está vendo
              </h3>
              <p className="text-[11px] text-neutral-400">
                3 pontos exigem atenção
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Item 1 */}
              <div
                onClick={() => onNavigate('assinaturas')}
                className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-rose-400 shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-neutral-200 group-hover:text-white transition-colors">
                      Assinaturas
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      20% abaixo do esperado.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-200 transition-colors shrink-0" />
              </div>

              {/* Item 2 */}
              <div
                onClick={() => {
                  setSelectedActionDetail('ticket');
                  setShowActionPlanModal(true);
                }}
                className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-neutral-200 group-hover:text-white transition-colors">
                      Ticket médio
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Queda de 7% nos últimos 7 dias.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-200 transition-colors shrink-0" />
              </div>

              {/* Item 3 */}
              <div
                onClick={() => onNavigate('profissionais')}
                className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-neutral-200 group-hover:text-white transition-colors">
                      Profissionais
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      2 profissionais estão puxando o resultado para cima.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-200 transition-colors shrink-0" />
              </div>
            </div>
          </div>

          {/* Card 2: Resumo para a reunião */}
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4 shadow-xl">
            <div>
              <h3 className="font-display font-bold text-sm text-neutral-100">
                Resumo para a reunião
              </h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                O que você precisa saber antes do alinhamento com sua equipe
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Section 1: Resultado */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                  <span>●</span> Resultado
                </span>
                <ul className="mt-1 space-y-1 text-neutral-300 text-[11px] pl-3 border-l border-neutral-800">
                  <li>• 84,9% da meta</li>
                  <li>• Projeção abaixo do objetivo</li>
                  <li>• Gap atual de R$ 6.160</li>
                </ul>
              </div>

              {/* Section 2: Pontos positivos */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span>●</span> Pontos positivos
                </span>
                <ul className="mt-1 space-y-1 text-neutral-300 text-[11px] pl-3 border-l border-neutral-800">
                  <li>• 2 profissionais acima da meta</li>
                  <li>• +16,7% em novas assinaturas</li>
                </ul>
              </div>

              {/* Section 3: Pontos de atenção */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <span>●</span> Pontos de atenção
                </span>
                <ul className="mt-1 space-y-1 text-neutral-300 text-[11px] pl-3 border-l border-neutral-800">
                  <li>• 3 profissionais abaixo do ritmo</li>
                  <li>• Ticket médio em queda</li>
                  <li>• Conversão de assinaturas abaixo do potencial</li>
                </ul>
              </div>

              {/* Section 4: Perguntas para o time */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1">
                  <span>💬</span> Perguntas para o time
                </span>
                <ul className="mt-1 space-y-1 text-neutral-400 text-[11px] pl-3 border-l border-neutral-800">
                  <li>• Por que as assinaturas estão abaixo?</li>
                  <li>• O que está acontecendo com o ticket médio?</li>
                  <li>• O que os profissionais acima da meta estão fazendo diferente?</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800">
              <button
                onClick={() => setShowMeetingModal(true)}
                className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1"
              >
                <span>Ver resumo da reunião</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: CAPITÃO INTELLIGENCE */}
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-3 shadow-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-display font-bold uppercase tracking-widest text-amber-300">
                CAPITÃO INTELLIGENCE
              </span>
            </div>

            <h4 className="font-display font-bold text-sm text-neutral-100 leading-snug">
              Sua barbearia tem potencial para crescer mais.
            </h4>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Identificamos 3 oportunidades de ação imediata que podem colocar a sua barbearia de volta no ritmo para bater a meta.
            </p>

            <button
              onClick={() => onNavigate('inteligencia')}
              className="w-full mt-2 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <span>Ver análise completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button exactly matching screenshot (Bottom Right) */}
      <button
        onClick={() => setShowAiModal(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-all border border-amber-300/40"
      >
        <Sparkles className="w-4 h-4 text-neutral-950" />
        <span>+ Perguntar ao Capitão</span>
      </button>

      {/* MODAL: Perguntar ao Capitão (AI Interactive Assistant) */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-neutral-950 font-black">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-neutral-100">
                    Capitão • Assistente de Performance
                  </h3>
                  <p className="text-[10px] text-neutral-400">
                    Inteligência treinada nas métricas de Barbearia Premium
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Body */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              {aiConversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-neutral-100 text-neutral-950 font-medium'
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto text-[11px]">
              <button
                onClick={() => handleSendAiQuestion('Como recuperar Pedro, Carlos e Rafael?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Recuperar 3 profissionais
              </button>
              <button
                onClick={() => handleSendAiQuestion('Qual o plano para bater os R$ 103.000?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Plano p/ R$ 103.000
              </button>
              <button
                onClick={() => handleSendAiQuestion('Como converter mais assinaturas hoje?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Mais assinaturas
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                value={aiQuestionInput}
                onChange={(e) => setAiQuestionInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiQuestion()}
                placeholder="Pergunte sobre faturamento, barbeiros, metas ou estratégias..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
              <button
                onClick={() => handleSendAiQuestion()}
                className="p-2.5 rounded-xl bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Resumo Completo para a Reunião */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-neutral-300" />
                <h3 className="font-display font-bold text-base text-neutral-100">
                  Briefing da Reunião Matinal (Alinhamento)
                </h3>
              </div>
              <button
                onClick={() => setShowMeetingModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <strong className="text-neutral-100 block mb-1">Abertura & Reconhecimento:</strong>
                Parabenizar Lucas (120% da meta) e Matheus (110%) pelo desempenho exemplar em conversão de combos de corte + barba.
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <strong className="text-neutral-100 block mb-1">Foco de Aceleração (R$ 6.160 restantes):</strong>
                Restam 5 dias úteis de Setembro. Cada cadeira precisa produzir em média R$ 300 a mais por dia (equivalente a 2 cortes adicionais ou 1 combo + 1 pomada).
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <strong className="text-neutral-100 block mb-1">Apoio a Pedro, Carlos e Rafael:</strong>
                A recepção vai priorizar o direcionamento de encaixes e clientes sem preferência para esses 3 profissionais até sexta-feira.
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setShowMeetingModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 font-display font-bold text-xs"
              >
                Entendido, Fechar Briefing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Plano de Ação Estratégico */}
      {showActionPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-neutral-300" />
                <h3 className="font-display font-bold text-base text-neutral-100">
                  Plano de Ação Executivo: Setembro 2026
                </h3>
              </div>
              <button
                onClick={() => setShowActionPlanModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-100">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-xs">1</span>
                  <span>Aumentar Conversão em Assinaturas</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Oferecer o Clube Silver (R$ 119,90) para clientes que cortam a cada 15 dias. Gera receita imediata e retém o cliente nos meses seguintes com previsibilidade de fluxo de caixa.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-100">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-xs">2</span>
                  <span>Recuperação de Performance (Pedro, Carlos, Rafael)</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Líder técnico Rodrigo fará alinhamento individual de 15 minutos com cada um para identificar gargalos (pontualidade, tempo médio de cadeira ou baixa conversão de adicionais).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-100">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-xs">3</span>
                  <span>Elevação de Ticket Médio (+R$ 12 por atendimento)</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Combos de corte + barba terapia aumentam o ticket médio de R$ 90 para R$ 160. Cada cliente que aceita o upgrade adiciona R$ 70 de receita bruta imediata à cadeira.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowActionPlanModal(false);
                  onNavigate('metas');
                }}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-display font-bold text-xs"
              >
                Ajustar Metas
              </button>
              <button
                onClick={() => setShowActionPlanModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 font-display font-bold text-xs hover:bg-white"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
