import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  Target,
  AlertTriangle,
  Award,
  Sparkles,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  UserCheck,
  CheckCircle2,
  X,
  Send,
  HelpCircle,
  FileText,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Professional } from '../types';
import { MOCK_PROFESSIONALS } from '../mock/professionals';

interface LeaderViewProps {
  onSelectProfessional: (prof: Professional) => void;
  onNavigate: (route: string) => void;
}

interface TeamMemberPerformance {
  id: string;
  name: string;
  avatarUrl: string;
  revenue: number;
  target: number;
  percentage: number;
  status: 'acima' | 'no_ritmo' | 'atencao';
  statusLabel: string;
}

export const LeaderView: React.FC<LeaderViewProps> = ({
  onSelectProfessional,
  onNavigate,
}) => {
  // Interactive modal states
  const [showAiModal, setShowAiModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedMemberDetail, setSelectedMemberDetail] = useState<TeamMemberPerformance | null>(null);
  const [showActionDetail, setShowActionDetail] = useState<string | null>(null);
  const [aiQuestionInput, setAiQuestionInput] = useState('');
  const [aiConversation, setAiConversation] = useState<Array<{ sender: 'user' | 'capitao'; text: string }>>([
    {
      sender: 'capitao',
      text: 'Olá! Estou analisando os dados da sua equipe: estamos em 94,2% da meta com R$ 61.800 faturados e um GAP de R$ 3.800. Como posso te apoiar com o time hoje?',
    },
  ]);

  // Team monthly evolution chart data matching screenshot (Maio to Setembro R$ 61.800)
  const evolutionData = [
    { month: 'Maio', faturamento: 46200 },
    { month: 'Junho', faturamento: 50400 },
    { month: 'Julho', faturamento: 55800 },
    { month: 'Agosto', faturamento: 58200 },
    { month: 'Setembro', faturamento: 61800 },
  ];

  // Team members list matching screenshot exactly
  const teamList: TeamMemberPerformance[] = [
    {
      id: 'prof-lucas',
      name: 'Lucas',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      revenue: 26400,
      target: 22000,
      percentage: 120,
      status: 'acima',
      statusLabel: 'Acima',
    },
    {
      id: 'prof-matheus',
      name: 'Matheus',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      revenue: 24150,
      target: 22000,
      percentage: 110,
      status: 'acima',
      statusLabel: 'Acima',
    },
    {
      id: 'prof-joao',
      name: 'João',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      revenue: 21800,
      target: 22000,
      percentage: 99,
      status: 'no_ritmo',
      statusLabel: 'No ritmo',
    },
    {
      id: 'prof-pedro',
      name: 'Pedro',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      revenue: 17200,
      target: 20000,
      percentage: 86,
      status: 'atencao',
      statusLabel: 'Atenção',
    },
    {
      id: 'prof-carlos',
      name: 'Carlos',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      revenue: 14980,
      target: 18000,
      percentage: 83,
      status: 'atencao',
      statusLabel: 'Atenção',
    },
    {
      id: 'prof-rafael',
      name: 'Rafael',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      revenue: 13850,
      target: 16000,
      percentage: 87,
      status: 'no_ritmo',
      statusLabel: 'No ritmo',
    },
  ];

  // Professionals needing attention list matching screenshot
  const attentionList = [
    {
      id: 'prof-pedro',
      name: 'Pedro',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      targetPercent: '86% da meta',
      reason: 'Muito abaixo do esperado no mês',
    },
    {
      id: 'prof-joao',
      name: 'João',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      targetPercent: '99% da meta',
      reason: 'Próximo da meta, mas perdeu ritmo',
    },
    {
      id: 'prof-carlos',
      name: 'Carlos',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      targetPercent: '83% da meta',
      reason: 'Baixa conversão em assinaturas',
    },
  ];

  const handleOpenMemberDetail = (member: TeamMemberPerformance) => {
    // Find matching mock professional or create one for detail view
    const matched = MOCK_PROFESSIONALS.find(
      (p) => p.name.toLowerCase().includes(member.name.toLowerCase())
    );
    if (matched) {
      onSelectProfessional(matched);
    } else {
      setSelectedMemberDetail(member);
    }
  };

  const handleSendAiQuestion = (customText?: string) => {
    const text = customText || aiQuestionInput;
    if (!text.trim()) return;

    setAiConversation((prev) => [...prev, { sender: 'user', text }]);
    setAiQuestionInput('');

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('pedro')) {
        reply = 'Pedro está com 86% da meta (R$ 17.200 de R$ 20.000). Para atingir 100%, ele precisa de R$ 2.800 em 5 dias úteis (cerca de R$ 560/dia ou 5 atendimentos diários com combo). Sugiro agendar uma conversa rápida de alinhamento com ele hoje.';
      } else if (lower.includes('joão') || lower.includes('joao')) {
        reply = 'João está a apenas 1% de bater a meta (R$ 21.800 de R$ 22.000). Faltam apenas R$ 200, o que equivale a 2 cortes ou 1 combo de barba e corte. Vale encorajá-lo para fechar hoje ainda!';
      } else if (lower.includes('assinatura')) {
        reply = 'A conversão em assinaturas da equipe está em 28 novas adesões. Se Carlos e Pedro converterem 2 clientes cada nesta semana, a equipe supera o GAP de R$ 3.800 com previsibilidade de receita para o próximo mês.';
      } else {
        reply = 'A equipe está com ótimo momentum, crescendo pelo 4º mês consecutivo. Para eliminar o GAP de R$ 3.800, a maior alavanca é focar no ticket médio dos 3 profissionais que estão abaixo da meta.';
      }
      setAiConversation((prev) => [...prev, { sender: 'capitao', text: reply }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div>
        <span className="text-[10px] font-display font-bold uppercase tracking-widest text-neutral-400">
          OPERAÇÃO & GESTÃO
        </span>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight mt-0.5">
          Minha Equipe
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mt-1 leading-relaxed">
          Acompanhe a performance da sua equipe e saiba onde sua equipe precisa de atenção
        </p>
      </div>

      {/* 5 KPI Metric Cards Row matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Profissionais */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
              PROFISSIONAIS
            </span>
            <Users className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
              6
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Cadeiras ativas
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="text-[10px] font-medium text-neutral-400">
              +0 vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 2: Faturamento Realizado */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
              FATURAMENTO REALIZADO
            </span>
            <DollarSign className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
              R$ 61.800
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Meta: R$ 65.600
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
              ▲ +8,7% vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 3: Atingimento da Meta */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
              ATINGIMENTO DA META
            </span>
            <Target className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
              94,2%
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Ritmo consolidado
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
              ▲ +2,1% vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 4: Desvio do Esperado */}
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/50 relative flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-rose-300">
              DESVIO DO ESPERADO
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2.5">
            <div className="font-display font-black text-2xl text-rose-400 tracking-tight">
              R$ 3.800
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              GAP para a meta
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-rose-900/40">
            <span className="text-[10px] font-medium text-rose-300">
              -1,2% vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 5: Novas Assinaturas */}
        <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between">
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
              Clube Capitão
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
              ▲ +16,7% vs. mês anterior
            </span>
          </div>
        </div>
      </div>

      {/* Row: Meta da Equipe & Evolução da Equipe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Meta da equipe (approx 60% = 7 cols) */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between space-y-5">
          <div>
            <div className="pb-1">
              <h3 className="font-display font-bold text-base text-neutral-100">
                Meta da equipe
              </h3>
              <p className="text-xs text-neutral-400">
                Veja como estamos em relação à meta do mês
              </p>
            </div>

            {/* 4 Stats side by side */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500">
                  META
                </span>
                <p className="font-display font-bold text-base sm:text-lg text-neutral-100 mt-0.5">
                  R$ 65.600
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500">
                  REALIZADO
                </span>
                <p className="font-display font-bold text-base sm:text-lg text-neutral-100 mt-0.5">
                  R$ 61.800
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500">
                  PROJEÇÃO
                </span>
                <p className="font-display font-bold text-base sm:text-lg text-neutral-100 mt-0.5">
                  R$ 63.900
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-rose-400">
                  GAP
                </span>
                <p className="font-display font-bold text-base sm:text-lg text-rose-400 mt-0.5">
                  -R$ 3.800
                </p>
              </div>
            </div>

            {/* Progress Bar with label */}
            <div className="mt-5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-medium">Progresso Atual</span>
                <span className="font-display font-bold text-neutral-100">94,2%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                  style={{ width: '94.2%' }}
                />
              </div>
            </div>
          </div>

          {/* Bottom notification alert banner */}
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>A equipe está abaixo do ritmo necessário para atingir a meta</span>
            </div>
            <button
              onClick={() => setShowPlanModal(true)}
              className="px-3 py-1 rounded-lg border border-rose-800/60 bg-rose-950/40 text-rose-300 hover:text-white hover:bg-rose-900/40 text-xs font-medium transition-all self-end sm:self-auto"
            >
              Atenção no ritmo da equipe
            </button>
          </div>
        </div>

        {/* Right: Evolução da equipe (approx 40% = 5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-neutral-400" />
                <h3 className="font-display font-bold text-base text-neutral-100">
                  Evolução da equipe
                </h3>
              </div>
              <p className="text-xs text-neutral-400">
                Faturamento total da equipe nos últimos meses
              </p>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-neutral-800 border border-neutral-700 font-display font-bold text-xs text-neutral-100">
              R$ 61.800
            </div>
          </div>

          {/* Evolution Area Chart */}
          <div className="h-44 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={evolutionData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="teamEvolutionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis
                  dataKey="month"
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
                  domain={[40000, 68000]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    borderColor: '#404040',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: number) => [`R$ ${val.toLocaleString('pt-BR')}`, 'Faturamento']}
                />
                <Area
                  type="monotone"
                  dataKey="faturamento"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#teamEvolutionGrad)"
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 1, stroke: '#0a0a0a' }}
                  activeDot={{ r: 6, fill: '#fff', stroke: '#10b981', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom badge */}
          <div className="pt-2 border-t border-neutral-800">
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
              <span>▲</span>
              <span>A equipe vem evoluindo pelo 4º mês consecutivo</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3-Card Section: Performance da equipe / Quem precisa de atenção? / Capitão Análise */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Performance da equipe (Table - 6 cols) */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4">
          <div>
            <h3 className="font-display font-bold text-base text-neutral-100">
              Performance da equipe
            </h3>
            <p className="text-xs text-neutral-400">
              Veja o desempenho de cada profissional e acompanhe o progresso
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-2">PROFISSIONAL</th>
                  <th className="py-2.5 px-2">REALIZADO</th>
                  <th className="py-2.5 px-2">META</th>
                  <th className="py-2.5 px-2">%</th>
                  <th className="py-2.5 px-2">STATUS</th>
                  <th className="py-2.5 px-2 text-right">AÇÃO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {teamList.map((row) => (
                  <tr key={row.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={row.avatarUrl}
                          alt={row.name}
                          className="w-6 h-6 rounded-full object-cover border border-neutral-700"
                        />
                        <span className="font-display font-medium text-neutral-100">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 font-display font-medium text-neutral-200">
                      R$ {row.revenue.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-2.5 px-2 text-neutral-400">
                      R$ {row.target.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-2.5 px-2 font-display font-semibold text-neutral-100">
                      {row.percentage}%
                    </td>
                    <td className="py-2.5 px-2">
                      {row.status === 'acima' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Acima
                        </span>
                      )}
                      {row.status === 'no_ritmo' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          No ritmo
                        </span>
                      )}
                      {row.status === 'atencao' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          Atenção
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <button
                        onClick={() => handleOpenMemberDetail(row)}
                        className="text-[11px] font-semibold text-neutral-300 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 2: Quem precisa de atenção? (3 cols) */}
        <div className="lg:col-span-3 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h3 className="font-display font-bold text-sm text-neutral-100">
                Quem precisa de atenção?
              </h3>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Acompanhe os profissionais que estão abaixo do ritmo esperado
            </p>

            {/* List of 3 professionals */}
            <div className="mt-4 space-y-3">
              {attentionList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    const found = teamList.find((t) => t.id === item.id);
                    if (found) handleOpenMemberDetail(found);
                  }}
                  className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.avatarUrl}
                        alt={item.name}
                        className="w-6 h-6 rounded-full object-cover border border-neutral-700"
                      />
                      <span className="font-display font-semibold text-xs text-neutral-100">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-display font-bold text-rose-400">
                      {item.targetPercent}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-snug">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800">
            <button
              onClick={() => onNavigate('profissionais')}
              className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1"
            >
              <span>Ver todos os profissionais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Capitão - Análise da equipe (3 cols) */}
        <div className="lg:col-span-3 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-300">
                Capitão — Análise da equipe
              </h3>
            </div>

            <p className="font-display font-bold text-xs text-neutral-100 leading-relaxed">
              A equipe está próxima da meta, mas precisa acelerar para garantir o resultado.
            </p>

            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                O CAPITÃO IDENTIFICOU:
              </span>
              <ul className="space-y-1.5 text-[11px] text-neutral-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>2 profissionais acima da meta</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">!</span>
                  <span>Desaceleração de 1 profissional</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Baixa conversão em assinaturas do time</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setShowPlanModal(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm uppercase tracking-wider"
          >
            <span>Gerar plano de ação</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Horizontal Section: Próximas Ações matching screenshot */}
      <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-base text-neutral-100">
              Próximas ações
            </h3>
            <p className="text-xs text-neutral-400">
              Foque nos pontos que mais podem gerar resultado
            </p>
          </div>

          <button
            onClick={() => setShowAiModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 text-xs font-display font-bold tracking-wide transition-all self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Perguntar ao Capitão</span>
          </button>
        </div>

        {/* 3 Horizontal Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Action 1 */}
          <div
            onClick={() => {
              setShowActionDetail('pedro');
              setShowPlanModal(true);
            }}
            className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-center justify-between gap-3 hover:border-neutral-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0 group-hover:text-white">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-neutral-100 group-hover:text-white">
                  Acompanhar Pedro
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Performance abaixo do ritmo
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors shrink-0" />
          </div>

          {/* Action 2 */}
          <div
            onClick={() => {
              setShowActionDetail('joao');
              setShowPlanModal(true);
            }}
            className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-center justify-between gap-3 hover:border-neutral-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0 group-hover:text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-neutral-100 group-hover:text-white">
                  Conversar com João
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Quase na meta, mas perdeu ritmo
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors shrink-0" />
          </div>

          {/* Action 3 */}
          <div
            onClick={() => onNavigate('assinaturas')}
            className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-center justify-between gap-3 hover:border-neutral-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0 group-hover:text-white">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-neutral-100 group-hover:text-white">
                  Revisar conversão de assinaturas
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Identificar profissionais com baixa conversão
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors shrink-0" />
          </div>
        </div>
      </div>

      {/* Floating Action Button (Bottom Right) */}
      <button
        onClick={() => setShowAiModal(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-all border border-amber-300/40"
      >
        <Sparkles className="w-4 h-4 text-neutral-950" />
        <span>+ Perguntar ao Capitão</span>
      </button>

      {/* MODAL: Perguntar ao Capitão */}
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
                    Capitão • Assistente da Equipe
                  </h3>
                  <p className="text-[10px] text-neutral-400">
                    Orientação estratégica para liderança e ritmo de bancada
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
                onClick={() => handleSendAiQuestion('Como acelerar Pedro para bater a meta?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Acelerar Pedro
              </button>
              <button
                onClick={() => handleSendAiQuestion('O que falar com o João hoje?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Feedback p/ João
              </button>
              <button
                onClick={() => handleSendAiQuestion('Como zerar o GAP de R$ 3.800?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Zerar GAP de R$ 3.800
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                value={aiQuestionInput}
                onChange={(e) => setAiQuestionInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiQuestion()}
                placeholder="Pergunte sobre feedback, ritmo ou metas da equipe..."
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

      {/* MODAL: Plano de Ação da Equipe */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-neutral-300" />
                <h3 className="font-display font-bold text-base text-neutral-100">
                  Plano de Ação para Recuperação do Ritmo
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowPlanModal(false);
                  setShowActionDetail(null);
                }}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-neutral-300">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <strong className="text-neutral-100 font-display text-sm block">
                  1. Alinhamento com Pedro (Falta R$ 2.800)
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Realizar bate-papo de 10 minutos hoje após o almoço. Identificar se o gargalo é volume de clientes ou venda de adicionais (barboterapia e pomadas). Oferecer suporte de encaixes da recepção.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <strong className="text-neutral-100 font-display text-sm block">
                  2. Impulso Final com João (Falta R$ 200)
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  João está em 99% da meta. Um incentivo rápido no início do turno garantirá que ele bata a meta ainda hoje, aumentando a moral de toda a bancada.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <strong className="text-neutral-100 font-display text-sm block">
                  3. Campanha Relâmpago de Assinaturas
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Orientar a equipe a oferecer o Clube Silver aos clientes da tarde. Cada nova adesão adiciona receita recorrente imediata e reduz diretamente o GAP da unidade.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowPlanModal(false);
                  setShowActionDetail(null);
                }}
                className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 font-display font-bold text-xs"
              >
                Aplicar Plano
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
