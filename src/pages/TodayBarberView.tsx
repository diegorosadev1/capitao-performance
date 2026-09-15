import React, { useState } from 'react';
import {
  Scissors,
  CreditCard,
  Award,
  Package,
  Trophy,
  CheckCircle2,
  Circle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Calendar,
  X,
  Send,
  Users,
  Star,
  Zap,
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
import { UserProfile } from '../types';

interface TodayBarberViewProps {
  currentUser: UserProfile;
  onNavigate: (route: string) => void;
}

export const TodayBarberView: React.FC<TodayBarberViewProps> = ({
  currentUser,
  onNavigate,
}) => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [showImproveModal, setShowImproveModal] = useState(false);
  const [aiQuestionInput, setAiQuestionInput] = useState('');
  const [aiConversation, setAiConversation] = useState<Array<{ sender: 'user' | 'capitao'; text: string }>>([
    {
      sender: 'capitao',
      text: 'Olá, Matheus! Você já atingiu 109,8% da sua meta mensal e está em 2º lugar no ranking da unidade. O que você gostaria de analisar hoje?',
    },
  ]);

  // Evolution chart data matching screenshot exactly: Junho, Julho, Agosto, Setembro
  const evolutionData = [
    { month: 'Junho', faturamento: 18200, label: 'R$ 18.200' },
    { month: 'Julho', faturamento: 19400, label: 'R$ 19.400' },
    { month: 'Agosto', faturamento: 21500, label: 'R$ 21.500' },
    { month: 'Setembro', faturamento: 24150, label: 'R$ 24.150' },
  ];

  // Ranking data matching screenshot exactly
  const rankingList = [
    {
      position: 1,
      name: 'Lucas',
      revenue: 26400,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isCurrentUser: false,
    },
    {
      position: 2,
      name: 'Matheus (Você)',
      revenue: 24150,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isCurrentUser: true,
    },
    {
      position: 3,
      name: 'João',
      revenue: 21800,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      isCurrentUser: false,
    },
    {
      position: 4,
      name: 'Pedro',
      revenue: 19600,
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      isCurrentUser: false,
    },
  ];

  const handleSendAiQuestion = (customText?: string) => {
    const text = customText || aiQuestionInput;
    if (!text.trim()) return;

    setAiConversation((prev) => [...prev, { sender: 'user', text }]);
    setAiQuestionInput('');

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('lucas') || lower.includes('1º') || lower.includes('primeiro')) {
        reply = 'Lucas está com R$ 26.400 e você com R$ 24.150. A diferença é de apenas R$ 2.250! Para assumir o 1º lugar no ranking da unidade, foque em 8 combos com barboterapia e pomada, ou em converter 5 novos assinantes do Clube Silver.';
      } else if (lower.includes('assinatura') || lower.includes('assinaturas')) {
        reply = 'Você já fechou 12 assinaturas (+33% vs mês anterior). Uma técnica eficiente é oferecer a assinatura logo após finalizar o corte, mostrando que ela já paga o próximo atendimento e inclui descontos em produtos.';
      } else if (lower.includes('ticket') || lower.includes('290')) {
        reply = 'Seu ticket médio atual é de R$ 280,81. Falta apenas R$ 9,19 por atendimento para atingir R$ 290 e liberar o 3º desafio com o bônus total de R$ 600. Basta adicionar um óleo para barba ou spray fixador a cada 2 atendimentos.';
      } else {
        reply = 'Seu ritmo é excelente, Matheus! Você é o profissional com maior taxa de crescimento consistente (4º mês consecutivo). Mantenha o foco em pós-venda para fidelizar a carteira.';
      }
      setAiConversation((prev) => [...prev, { sender: 'capitao', text: reply }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
          Meu Desempenho
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Acompanhe sua evolução e saiba onde focar
        </p>
      </div>

      {/* Main Top Grid: Left (Meta mensal + 4 KPIs) & Right (Minha posição) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Section (approx 68% = 8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Card: Minha meta mensal */}
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <h3 className="font-display font-bold text-base text-neutral-100">
                  Minha meta mensal
                </h3>
              </div>
              <span className="text-xs text-neutral-400">
                Ciclo de Setembro 2026
              </span>
            </div>

            {/* 4 Stats side by side */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500">
                  META
                </span>
                <p className="font-display font-bold text-base sm:text-lg text-neutral-100 mt-0.5">
                  R$ 22.000
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500">
                  REALIZADO
                </span>
                <p className="font-display font-bold text-base sm:text-lg text-neutral-100 mt-0.5">
                  R$ 24.150
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500">
                  ATINGIMENTO
                </span>
                <p className="font-display font-bold text-base sm:text-lg text-emerald-400 mt-0.5">
                  109,8%
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500">
                  STATUS
                </span>
                <div className="mt-1">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Meta atingida
                  </span>
                </div>
              </div>
            </div>

            {/* Full Progress Bar */}
            <div className="pt-2">
              <div className="w-full h-2.5 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Under Progress Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
              <span className="text-neutral-300 font-medium">
                Você está <strong className="text-emerald-400 font-bold">R$ 2.150</strong> acima da meta
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-md border border-emerald-800/40 self-start sm:self-auto">
                ▲ +12,4% vs. mês anterior
              </span>
            </div>
          </div>

          {/* Row of 4 Metric Cards under Minha meta mensal */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Card 1: Atendimentos */}
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
                  ATENDIMENTOS
                </span>
                <Scissors className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="mt-2.5">
                <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
                  86
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
                <span className="text-[10px] font-medium text-emerald-400">
                  ▲ +8% vs. mês anterior
                </span>
              </div>
            </div>

            {/* Card 2: Ticket Médio */}
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
                  TICKET MÉDIO
                </span>
                <CreditCard className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="mt-2.5">
                <div className="font-display font-black text-xl sm:text-2xl text-neutral-50 tracking-tight">
                  R$ 280,81
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
                <span className="text-[10px] font-medium text-emerald-400">
                  ▲ +4% vs. mês anterior
                </span>
              </div>
            </div>

            {/* Card 3: Assinaturas */}
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
                  ASSINATURAS
                </span>
                <Award className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="mt-2.5">
                <div className="font-display font-black text-2xl text-neutral-50 tracking-tight">
                  12
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
                <span className="text-[10px] font-medium text-emerald-400">
                  ▲ +33% vs. mês anterior
                </span>
              </div>
            </div>

            {/* Card 4: Produtos */}
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 relative flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
                  PRODUTOS
                </span>
                <Package className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="mt-2.5">
                <div className="font-display font-black text-xl sm:text-2xl text-neutral-50 tracking-tight">
                  R$ 2.480
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-800/80">
                <span className="text-[10px] font-medium text-emerald-400">
                  ▲ +18% vs. mês anterior
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Minha posição (approx 32% = 4 cols) */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-neutral-400" />
              <h3 className="font-display font-bold text-sm text-neutral-100">
                Minha posição
              </h3>
            </div>

            {/* Big Rank Heading */}
            <div className="mt-3">
              <span className="font-display font-black text-3xl text-neutral-50">
                #2
              </span>
              <span className="text-xs text-neutral-400 ml-2">
                no ranking da unidade
              </span>
            </div>

            {/* Ranking list items */}
            <div className="mt-4 space-y-2.5">
              {rankingList.map((item) => (
                <div
                  key={item.name}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    item.isCurrentUser
                      ? 'bg-neutral-800/60 border-emerald-600/40 ring-1 ring-emerald-500/20'
                      : 'bg-neutral-950/50 border-neutral-800/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 text-center font-display font-bold text-xs ${
                        item.position === 1
                          ? 'text-amber-400'
                          : item.position === 2
                          ? 'text-neutral-200'
                          : 'text-neutral-400'
                      }`}
                    >
                      {item.position}
                    </span>
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-6 h-6 rounded-full object-cover border border-neutral-700"
                    />
                    <span
                      className={`text-xs font-display ${
                        item.isCurrentUser
                          ? 'font-bold text-white'
                          : 'font-medium text-neutral-300'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-display ${
                      item.isCurrentUser
                        ? 'font-bold text-emerald-400'
                        : 'font-medium text-neutral-200'
                    }`}
                  >
                    R$ {item.revenue.toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800">
            <button
              onClick={() => onNavigate('ranking')}
              className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Ver ranking completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 3-Card Row: Minha evolução / + Meu foco / Desafios do mês */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Minha evolução */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-neutral-400" />
              <h3 className="font-display font-bold text-base text-neutral-100">
                Minha evolução
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Seu faturamento nos últimos meses
            </p>

            {/* Evolution Area Chart */}
            <div className="h-44 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={evolutionData}
                  margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="barberEvolutionGrad" x1="0" y1="0" x2="0" y2="1">
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
                    domain={[16000, 26000]}
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
                    fill="url(#barberEvolutionGrad)"
                    dot={{ r: 4, fill: '#10b981', strokeWidth: 1, stroke: '#0a0a0a' }}
                    activeDot={{ r: 6, fill: '#fff', stroke: '#10b981', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800">
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
              <span>▲</span>
              <span>Você vem evoluindo pelo 4º mês consecutivo</span>
            </span>
          </div>
        </div>

        {/* Card 2: + Meu foco */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-neutral-100 flex items-center gap-1.5">
                <span>+ Meu foco</span>
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 text-[10px] font-display font-bold text-neutral-300">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Capitão Intelligence
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-display font-bold text-sm text-neutral-100">
                Você já ultrapassou sua meta mensal.
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Para continuar evoluindo, o principal ponto de atenção é aumentar a conversão de assinaturas.
              </p>
            </div>

            {/* Inner box: ASSINATURAS */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400">
                  ASSINATURAS
                </span>
                <Users className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-3xl text-neutral-50">
                  12
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Esse é um dos principais indicadores com potencial de evolução.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowImproveModal(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 hover:text-white font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Ver como melhorar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Desafios do mês */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-display font-bold text-base text-neutral-100">
                Desafios do mês
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Metas individuais e bônus de performance
              </p>
            </div>

            {/* 3 Challenges items matching screenshot */}
            <div className="space-y-3 pt-1">
              {/* Challenge 1 */}
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium text-[11px]">Atingir R$ 22 mil de faturamento</span>
                  </div>
                  <span className="font-display font-bold text-emerald-400 text-[11px]">100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium text-[11px]">Alcançar 10 novas assinaturas</span>
                  </div>
                  <span className="font-display font-bold text-emerald-400 text-[11px]">100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Challenge 3 */}
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Circle className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span className="font-medium text-[11px]">Aumentar ticket médio para R$ 290</span>
                  </div>
                  <span className="font-display font-bold text-neutral-400 text-[11px]">55%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-neutral-400 rounded-full" style={{ width: '55%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-neutral-400 text-[11px]">
              2 de 3 desafios atingidos
            </span>
            <span className="font-display font-semibold text-emerald-400 text-[11px]">
              +R$ 400 bônus garantido
            </span>
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
                    Capitão • Orientação de Desempenho
                  </h3>
                  <p className="text-[10px] text-neutral-400">
                    Dicas personalizadas para Matheus alcançar a liderança
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
                onClick={() => handleSendAiQuestion('Como alcançar o 1º lugar do Lucas?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Passar o Lucas (#1)
              </button>
              <button
                onClick={() => handleSendAiQuestion('Como aumentar meu ticket para R$ 290?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Subir Ticket para R$ 290
              </button>
              <button
                onClick={() => handleSendAiQuestion('Como converter mais assinaturas?')}
                className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap"
              >
                Mais Assinaturas
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                value={aiQuestionInput}
                onChange={(e) => setAiQuestionInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiQuestion()}
                placeholder="Pergunte sobre comissões, dicas de atendimento ou metas..."
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

      {/* MODAL: Ver Como Melhorar (Meu Foco) */}
      {showImproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-base text-neutral-100">
                  Alavancas de Evolução para Matheus
                </h3>
              </div>
              <button
                onClick={() => setShowImproveModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <strong className="text-neutral-100 font-display text-sm block">
                  1. Script de Fechamento de Assinatura
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Ao retirar a capa do cliente: "Você corta o cabelo a cada 15 dias. No Clube Capitão Silver você economiza R$ 50/mês e garante horário prioritário às sextas".
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <strong className="text-neutral-100 font-display text-sm block">
                  2. Cross-selling de Finalizadores
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Aplicar a pomada modeladora durante o corte e explicar como o cliente reproduz em casa. Eleva o ticket de R$ 280 para mais de R$ 300 instantaneamente.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <strong className="text-neutral-100 font-display text-sm block">
                  3. Busca pela Liderança do Ranking
                </strong>
                <p className="text-neutral-400 leading-relaxed">
                  Restam R$ 2.250 para superar Lucas e assumir o troféu de 1º Colocado da Unidade Bom Retiro neste ciclo.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setShowImproveModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 font-display font-bold text-xs"
              >
                Entendido, aplicar hoje
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
