import React, { useState } from 'react';
import {
  CalendarCheck,
  Users,
  UserPlus,
  RotateCcw,
  Percent,
  BarChart2,
  Calendar,
  Copy,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ChevronDown,
  Info,
  X,
  Award,
  Crown,
  Check,
} from 'lucide-react';

interface ReceptionistPerformance {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isTopPerformer?: boolean;
  totalVendido: number;
  totalVendidoGrowth: number;
  pacotesValor: number;
  pacotesPercent: number;
  produtosValor: number;
  produtosPercent: number;
  assinaturasValor: number;
  assinaturasPercent: number;
  qtdVendas: number;
  qtdVendasGrowth: number;
  conversao: number;
  conversaoGrowth: number;
  focusArea: string;
  actionItems: string[];
}

export const ReceptionView: React.FC = () => {
  // Period filter
  const [period, setPeriod] = useState<'hoje' | '7dias' | '30dias'>('hoje');

  // Selected receptionist for detailed modal
  const [selectedReceptionist, setSelectedReceptionist] = useState<ReceptionistPerformance | null>(null);
  const [showFullPlanModal, setShowFullPlanModal] = useState<boolean>(false);

  // Receptionists data: Strictly Julia (Top 1 with Crown) and Giovana
  const receptionists: ReceptionistPerformance[] = [
    {
      id: 'rec-1',
      name: 'Julia',
      role: 'Recepção',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isTopPerformer: true,
      totalVendido: 8420,
      totalVendidoGrowth: 14,
      pacotesValor: 4200,
      pacotesPercent: 50,
      produtosValor: 1120,
      produtosPercent: 13,
      assinaturasValor: 3100,
      assinaturasPercent: 37,
      qtdVendas: 42,
      qtdVendasGrowth: 18,
      conversao: 18,
      conversaoGrowth: 4,
      focusArea: 'Manutenção de liderança e treinamento de novas abordagens',
      actionItems: [
        'Compartilhar método de pitch de assinaturas na reunião semanal de equipe',
        'Reforçar sugestão de pacotes premium para clientes recorrentes de barba',
        'Meta do mês: atingir R$ 10.000 em vendas totais (+18%)',
      ],
    },
    {
      id: 'rec-2',
      name: 'Giovana',
      role: 'Recepção',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      isTopPerformer: false,
      totalVendido: 6850,
      totalVendidoGrowth: 8,
      pacotesValor: 3800,
      pacotesPercent: 55,
      produtosValor: 980,
      produtosPercent: 14,
      assinaturasValor: 2070,
      assinaturasPercent: 30,
      qtdVendas: 36,
      qtdVendasGrowth: 11,
      conversao: 15,
      conversaoGrowth: -3,
      focusArea: 'Elevação da taxa de conversão em assinaturas recorrentes',
      actionItems: [
        'Aumentar taxa de oferta de assinaturas no checkout para 100% dos clientes recorrentes',
        'Trabalhar combo corte + produto home care com suporte da líder Julia',
        'Ajustar pitch inicial na chegada do cliente para reduzir perdas no balcão',
      ],
    },
  ];

  return (
    <div className="space-y-6 select-none font-sans">
      {/* ============================================================ */}
      {/* 1. Page Header matching screenshot                          */}
      {/* ============================================================ */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <CalendarCheck className="w-6 h-6 text-[#F5F5F5] shrink-0" />
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
            Recepção & Operação de Entrada
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#737373]">
          Acompanhamento de vendas, pacotes, produtos e assinaturas da recepção.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 2. Top 4 KPI Cards Grid                                      */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Atendimentos Hoje */}
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
                ATENDIMENTOS HOJE
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <Users className="w-4 h-4 text-[#a3a3a3]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5 mt-3 mb-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#F5F5F5] tracking-tight">
                124
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                12%
              </span>
            </div>
          </div>
          <div className="text-xs text-[#737373]">
            vs. dia anterior
          </div>
        </div>

        {/* Card 2: Clientes Novos */}
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
                CLIENTES NOVOS
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <UserPlus className="w-4 h-4 text-[#a3a3a3]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5 mt-3 mb-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#F5F5F5] tracking-tight">
                28
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                18%
              </span>
            </div>
          </div>
          <div className="text-xs text-[#737373]">
            vs. dia anterior
          </div>
        </div>

        {/* Card 3: Clientes Recorrentes */}
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
                CLIENTES RECORRENTES
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <RotateCcw className="w-4 h-4 text-[#a3a3a3]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5 mt-3 mb-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#F5F5F5] tracking-tight">
                96
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                7%
              </span>
            </div>
          </div>
          <div className="text-xs text-[#737373]">
            vs. dia anterior
          </div>
        </div>

        {/* Card 4: Taxa de Comparecimento */}
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#737373]">
                TAXA DE COMPARECIMENTO
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a3a3a3]">
                <Percent className="w-4 h-4 text-[#a3a3a3]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5 mt-3 mb-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#F5F5F5] tracking-tight">
                92,3%
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                2,8%
              </span>
            </div>
          </div>
          <div className="text-xs text-[#737373]">
            vs. semana anterior
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. Main Split View: Left Datatable & Right Intelligence      */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT CARD (8 Columns): Desempenho da Recepção Table         */}
        {/* ============================================================ */}
        <div className="xl:col-span-8 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 shadow-sm space-y-5">
          {/* Header with Title & Date Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <BarChart2 className="w-5 h-5 text-neutral-300" />
              <h2 className="font-display font-bold text-lg text-[#F5F5F5]">
                Desempenho da Recepção
              </h2>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              {/* Period Pills */}
              <div className="inline-flex items-center rounded-xl bg-[#0D0D0D] border border-[#262626] p-1">
                <button
                  type="button"
                  onClick={() => setPeriod('hoje')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    period === 'hoje'
                      ? 'bg-[#1f1f1f] text-amber-400 border border-amber-500/40 shadow-xs'
                      : 'text-[#737373] hover:text-[#F5F5F5]'
                  }`}
                >
                  Hoje
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod('7dias')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    period === '7dias'
                      ? 'bg-[#1f1f1f] text-amber-400 border border-amber-500/40 shadow-xs'
                      : 'text-[#737373] hover:text-[#F5F5F5]'
                  }`}
                >
                  7 dias
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod('30dias')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    period === '30dias'
                      ? 'bg-[#1f1f1f] text-amber-400 border border-amber-500/40 shadow-xs'
                      : 'text-[#737373] hover:text-[#F5F5F5]'
                  }`}
                >
                  30 dias
                </button>
              </div>

              {/* Date Range Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D0D0D] border border-[#262626] text-xs text-[#a3a3a3]">
                <Calendar className="w-3.5 h-3.5 text-[#737373]" />
                <span>01/09/2026 - 30/09/2026</span>
                <Copy className="w-3 h-3 text-[#525252] ml-1" />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-[#262626] bg-[#0D0D0D]/70">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262626] text-[10px] font-display font-bold uppercase tracking-wider text-[#737373]">
                  <th className="py-3 px-4">RECEPCIONISTA</th>
                  <th className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span>TOTAL VENDIDO</span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">PACOTES</th>
                  <th className="py-3 px-4">PRODUTOS</th>
                  <th className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span>ASSINATURAS</span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span>QTD. VENDAS</span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span>CONVERSÃO</span>
                      <Info className="w-3 h-3" />
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">PLANO DE AÇÃO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
                {receptionists.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-[#141414] transition-colors"
                  >
                    {/* Recepcionista with Photo & Top 1 Crown on Julia */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={rec.avatar}
                            alt={rec.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#333333]"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-display font-bold text-sm text-[#F5F5F5]">
                              {rec.name}
                            </span>
                            {rec.isTopPerformer && (
                              <Crown
                                className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 drop-shadow-xs"
                                title="Top 1 Performer do Mês"
                              />
                            )}
                          </div>
                          <span className="text-[11px] text-[#737373] block leading-tight">
                            {rec.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Total Vendido */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-display font-bold text-sm text-[#F5F5F5]">
                        R$ {rec.totalVendido.toLocaleString('pt-BR')}
                      </div>
                      <div className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400 mt-0.5">
                        <ArrowUpRight className="w-3 h-3" />
                        {rec.totalVendidoGrowth}%
                      </div>
                    </td>

                    {/* Pacotes */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#F5F5F5]">
                        R$ {rec.pacotesValor.toLocaleString('pt-BR')}
                      </div>
                      <span className="text-[11px] text-[#737373]">
                        {rec.pacotesPercent}%
                      </span>
                    </td>

                    {/* Produtos */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#F5F5F5]">
                        R$ {rec.produtosValor.toLocaleString('pt-BR')}
                      </div>
                      <span className="text-[11px] text-[#737373]">
                        {rec.produtosPercent}%
                      </span>
                    </td>

                    {/* Assinaturas */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#F5F5F5]">
                        R$ {rec.assinaturasValor.toLocaleString('pt-BR')}
                      </div>
                      <span className="text-[11px] text-[#737373]">
                        {rec.assinaturasPercent}%
                      </span>
                    </td>

                    {/* Qtd. Vendas */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-[#F5F5F5]">
                        {rec.qtdVendas}
                      </div>
                      <div className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400 mt-0.5">
                        <ArrowUpRight className="w-3 h-3" />
                        {rec.qtdVendasGrowth}%
                      </div>
                    </td>

                    {/* Conversão */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-[#F5F5F5]">
                        {rec.conversao}%
                      </div>
                      {rec.conversaoGrowth >= 0 ? (
                        <div className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400 mt-0.5">
                          <ArrowUpRight className="w-3 h-3" />
                          {rec.conversaoGrowth}%
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-rose-400 mt-0.5">
                          <ArrowDownRight className="w-3 h-3" />
                          {Math.abs(rec.conversaoGrowth)}%
                        </div>
                      )}
                    </td>

                    {/* Plano de Ação */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedReceptionist(rec)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-neutral-700 text-xs font-medium text-[#d4d4d4] hover:text-white transition-all cursor-pointer"
                      >
                        <span>Ver detalhes</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#737373] pt-1">
            <span>Mostrando 2 de 2 recepcionistas</span>

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
                  disabled
                  className="w-7 h-7 rounded-lg bg-[#0D0D0D] border border-[#262626] flex items-center justify-center text-[#525252] disabled:opacity-40"
                >
                  ›
                </button>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0D0D0D] border border-[#262626] text-[11px] text-[#a3a3a3]">
                <span>10 por página</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT CARD (4 Columns): Capitão Intelligence & Insights      */}
        {/* ============================================================ */}
        <div className="xl:col-span-4 p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-950 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 fill-amber-400/20 text-amber-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#F5F5F5]">
                Capitão Intelligence
              </h3>
              <p className="text-xs text-[#737373] mt-0.5">
                Análise e plano de ação para melhores resultados.
              </p>
            </div>
          </div>

          {/* Section 1: Resumo do Período */}
          <div className="space-y-3 pt-1 border-t border-[#262626]/80">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-amber-400">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Resumo do Período</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2">
              {/* Total Vendido */}
              <div>
                <div className="font-display font-black text-base sm:text-lg text-[#F5F5F5] tracking-tight">
                  R$ 15.270
                </div>
                <div className="text-[10px] text-[#737373] leading-tight mt-0.5">
                  Total vendido
                </div>
                <div className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-400 mt-1">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  9%
                </div>
              </div>

              {/* Vendas Realizadas */}
              <div>
                <div className="font-display font-black text-base sm:text-lg text-[#F5F5F5] tracking-tight">
                  78
                </div>
                <div className="text-[10px] text-[#737373] leading-tight mt-0.5">
                  Vendas realizadas
                </div>
                <div className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-400 mt-1">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  12%
                </div>
              </div>

              {/* Ticket Médio */}
              <div>
                <div className="font-display font-black text-base sm:text-lg text-[#F5F5F5] tracking-tight">
                  R$ 195
                </div>
                <div className="text-[10px] text-[#737373] leading-tight mt-0.5">
                  Ticket médio
                </div>
                <div className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-400 mt-1">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  4%
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Insights da Recepção */}
          <div className="space-y-3 pt-4 border-t border-[#262626]/80">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-amber-400">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Insights da Recepção</span>
            </div>

            <div className="space-y-3">
              {/* Insight 1: Julia Top 1 */}
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-[#F5F5F5] leading-snug">
                    Julia se destaca no volume de vendas
                  </p>
                  <p className="text-[#8c8c8c] text-[11px] leading-relaxed mt-0.5">
                    Com 42 vendas e 18% de conversão, conquistou a coroa de Top 1 performer do mês.
                  </p>
                </div>
              </div>

              {/* Insight 2: Giovana Potencial */}
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-[#F5F5F5] leading-snug">
                    Giovana tem grande potencial de crescimento
                  </p>
                  <p className="text-[#8c8c8c] text-[11px] leading-relaxed mt-0.5">
                    Possui 15% de conversão e foco em pacotes. Oportunidade de alavancar oferta de assinaturas.
                  </p>
                </div>
              </div>

              {/* Insight 3: Oportunidade em Assinaturas */}
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-[#F5F5F5] leading-snug">
                    Oportunidade em Assinaturas Recorrentes
                  </p>
                  <p className="text-[#8c8c8c] text-[11px] leading-relaxed mt-0.5">
                    Aumentar a oferta no checkout pode acrescentar +R$ 2.400 em receita previsível este mês.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Plano de Ação (Equipe de Recepção) */}
          <div className="space-y-3 pt-4 border-t border-[#262626]/80">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-amber-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Plano de Ação (Equipe de Recepção)</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-[#d4d4d4]">
                <div className="w-4 h-4 rounded border border-amber-500/60 bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-[11px] leading-snug text-[#b0b0b0]">
                  <strong className="text-white">1.</strong> Reforçar oferta de assinatura para clientes frequentes (Julia e Giovana).
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#d4d4d4]">
                <div className="w-4 h-4 rounded border border-amber-500/60 bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-[11px] leading-snug text-[#b0b0b0]">
                  <strong className="text-white">2.</strong> Acompanhar conversão de pacotes e cross-selling de produtos home care.
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#d4d4d4]">
                <div className="w-4 h-4 rounded border border-amber-500/60 bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-[11px] leading-snug text-[#b0b0b0]">
                  <strong className="text-white">3.</strong> Manter o alto desempenho da Julia (compartilhar boas práticas com a equipe).
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#d4d4d4]">
                <div className="w-4 h-4 rounded border border-amber-500/60 bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-[11px] leading-snug text-[#b0b0b0]">
                  <strong className="text-white">4.</strong> Revisar abordagem de vendas no check-in (treinamento curto de 15 min).
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action Button: Ver plano completo */}
          <button
            type="button"
            onClick={() => setShowFullPlanModal(true)}
            className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <Award className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
            <span>Ver plano completo &gt;</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. MODAL: Detalhes da Recepcionista                          */}
      {/* ============================================================ */}
      {selectedReceptionist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedReceptionist.avatar}
                  alt={selectedReceptionist.name}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-lg text-white">
                      {selectedReceptionist.name}
                    </h3>
                    {selectedReceptionist.isTopPerformer && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-500/40 text-amber-400 text-xs font-bold">
                        <Crown className="w-3 h-3 fill-amber-400" />
                        Top 1 Performer
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400">{selectedReceptionist.role} • Central Jardins</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceptionist(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Total Vendido</span>
                <span className="text-base font-bold text-white">
                  R$ {selectedReceptionist.totalVendido.toLocaleString('pt-BR')}
                </span>
                <span className="text-[11px] text-emerald-400 block font-semibold">
                  +{selectedReceptionist.totalVendidoGrowth}% vs anterior
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Vendas Realizadas</span>
                <span className="text-base font-bold text-white">
                  {selectedReceptionist.qtdVendas} atendimentos
                </span>
                <span className="text-[11px] text-emerald-400 block font-semibold">
                  +{selectedReceptionist.qtdVendasGrowth}% volume
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Conversão</span>
                <span className="text-base font-bold text-white">
                  {selectedReceptionist.conversao}%
                </span>
                <span
                  className={`text-[11px] block font-semibold ${
                    selectedReceptionist.conversaoGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {selectedReceptionist.conversaoGrowth >= 0 ? '+' : ''}
                  {selectedReceptionist.conversaoGrowth}% vs média
                </span>
              </div>
            </div>

            {/* Product Mix Breakdown */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-neutral-300 block">
                Composição de Vendas
              </span>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300">Pacotes ({selectedReceptionist.pacotesPercent}%)</span>
                    <span className="font-semibold text-white">
                      R$ {selectedReceptionist.pacotesValor.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${selectedReceptionist.pacotesPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300">Assinaturas ({selectedReceptionist.assinaturasPercent}%)</span>
                    <span className="font-semibold text-white">
                      R$ {selectedReceptionist.assinaturasValor.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${selectedReceptionist.assinaturasPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300">Produtos Home Care ({selectedReceptionist.produtosPercent}%)</span>
                    <span className="font-semibold text-white">
                      R$ {selectedReceptionist.produtosValor.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${selectedReceptionist.produtosPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="space-y-2">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-amber-400 block">
                Ações Recomendadas pelo Capitão
              </span>
              <div className="space-y-2">
                {selectedReceptionist.actionItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setSelectedReceptionist(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. MODAL: Plano Completo da Recepção                         */}
      {/* ============================================================ */}
      {showFullPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Plano de Ação Integrado • Recepção
                  </h3>
                  <p className="text-xs text-neutral-400">Meta: Alcançar R$ 20.000 em vendas e 20% de conversão</p>
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
                  1. Alinhamento de Metas (Julia &amp; Giovana)
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  A equipe conta com 2 recepcionistas chave. Julia lidera com excelência em volume total (R$ 8.420) e taxa de conversão (18%), enquanto Giovana tem alto volume em pacotes e excelente relação com clientes fidelizados.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  2. Treinamento de Conversão de Assinaturas
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Introduzir script de check-out consultivo: ao receber o pagamento do cliente, apresentar o plano mensal com benefício direto de 20% de economia comparado a atendimentos avulsos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  3. Rotina de Monitoramento Diário
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Avaliação às 15:45 de cada dia para verificar o preenchimento de cadeiras e incentivar upsell de produtos home care nos horários de menor fluxo.
                </p>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-neutral-800">
              <span className="text-xs text-neutral-500">Capitão Intelligence • v2.4</span>
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
    </div>
  );
};
