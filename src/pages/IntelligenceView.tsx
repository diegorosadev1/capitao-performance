import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Scissors,
  CreditCard,
  Target,
  Send,
  Paperclip,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Zap,
  X,
  FileText,
  Clock,
  MessageSquare,
  Bot,
} from 'lucide-react';

interface IntelligenceViewProps {
  onNavigate?: (route: string) => void;
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      sender: 'ai' | 'user';
      text?: string;
      isDetailedAnalysis?: boolean;
      time: string;
    }>
  >([
    {
      id: 'msg-initial',
      sender: 'ai',
      isDetailedAnalysis: true,
      time: '15:47',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showActionPlanModal, setShowActionPlanModal] = useState(false);
  const [planConfirmedToast, setPlanConfirmedToast] = useState<string | null>(null);

  const suggestedPrompts = [
    'Por que estamos abaixo da meta?',
    'Quem precisa de atenção?',
    'Quais clientes devo reativar?',
    'Qual o potencial de assinaturas?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user' as const,
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = '';
      const lower = query.toLowerCase();

      if (lower.includes('abaixo da meta') || lower.includes('meta')) {
        aiText =
          'O gap atual de R$ 6.160 em relação ao ritmo projetado deve-se principalmente à taxa de ocupação das terças e quartas-feiras (-18% vs média) e a 3 barbeiros que precisam acelerar ticket médio com venda de produtos. Se cada profissional realizar 1 venda adicional de pós-barba/pomada por dia, cobrimos 100% da diferença até o fim do mês.';
      } else if (lower.includes('quem precisa') || lower.includes('atenção') || lower.includes('barbeiro')) {
        aiText =
          'Felipe Rocha (74,2% da meta), Rafael Lima (71,1%) e Bruno Costa (55,0%) são os 3 profissionais prioritários. O principal ponto a calibrar com eles é o tempo médio de cadeira e oferta do pacote de barba terapia em dias de menor movimento.';
      } else if (lower.includes('reativar') || lower.includes('clientes')) {
        aiText =
          'Temos 439 clientes em risco de churn. Destes, recomendo atuar imediatamente nos 58 clientes VIP com histórico de gasto superior a R$ 380. Uma mensagem personalizada no WhatsApp com cortesia de hidratação recupera historicamente 34% dessa base.';
      } else {
        aiText =
          'Identificamos 27 clientes com perfil de alta propensão para o Clube de Assinaturas. Converter apenas 12 desses clientes já garante R$ 3.588 em MRR recorrente adicional para a Unidade Jardins.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai' as const,
          text: aiText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleConfirmPlan = () => {
    setShowActionPlanModal(false);
    setPlanConfirmedToast('Plano de ação operacional gerado e compartilhado com os líderes!');
    setTimeout(() => setPlanConfirmedToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {planConfirmedToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{planConfirmedToast}</span>
        </div>
      )}

      {/* Top Header Section matching screenshot */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold shadow-lg shrink-0">
            <Sparkles className="w-6 h-6 text-neutral-950 fill-neutral-950" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
              CAPITÃO INTELLIGENCE
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Inteligência operacional para transformar dados em decisões.
            </p>
          </div>
        </div>

        {/* Top Right Badges */}
        <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dados sincronizados há 15 min</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800 text-neutral-300 text-xs">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <span>Analisando 1.840 clientes • 6 profissionais • 1 unidade</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Diagnóstico da operação (5 of 12 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 space-y-4 shadow-xl h-full flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header Box */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-sm sm:text-base text-neutral-100">
                    Diagnóstico da operação
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Principais pontos que precisam da sua atenção.
                  </p>
                </div>
              </div>

              {/* Card 1: RETENÇÃO */}
              <div
                onClick={() => onNavigate && onNavigate('clientes')}
                className="rounded-xl p-4 bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-rose-400 shrink-0">
                    <Users className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold text-rose-400 uppercase tracking-wider block">
                      Retenção
                    </span>
                    <h3 className="font-display font-bold text-sm text-neutral-100 mt-0.5 group-hover:text-rose-300 transition-colors">
                      439 clientes em risco
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Clientes sem retorno dentro do comportamento esperado.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-200 transition-colors shrink-0" />
              </div>

              {/* Card 2: PERFORMANCE */}
              <div
                onClick={() => onNavigate && onNavigate('profissionais')}
                className="rounded-xl p-4 bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
                    <Scissors className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold text-amber-400 uppercase tracking-wider block">
                      Performance
                    </span>
                    <h3 className="font-display font-bold text-sm text-neutral-100 mt-0.5 group-hover:text-amber-300 transition-colors">
                      3 profissionais abaixo do ritmo
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Gap de R$ 9.450 na meta proporcional do mês.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-200 transition-colors shrink-0" />
              </div>

              {/* Card 3: ASSINATURAS */}
              <div
                onClick={() => onNavigate && onNavigate('assinaturas')}
                className="rounded-xl p-4 bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold text-amber-400 uppercase tracking-wider block">
                      Assinaturas
                    </span>
                    <h3 className="font-display font-bold text-sm text-neutral-100 mt-0.5 group-hover:text-amber-300 transition-colors">
                      Oportunidade de conversão
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Clientes frequentes utilizando pacotes ou pagamento avulso.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-200 transition-colors shrink-0" />
              </div>
            </div>

            {/* Bottom Card: PRIORIDADE RECOMENDADA */}
            <div className="mt-4 p-4 rounded-xl bg-neutral-950/40 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-display font-bold text-amber-400 uppercase tracking-wider">
                  Prioridade Recomendada
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Atuar primeiro nos clientes de maior valor em risco e nos profissionais com maior gap para a meta.
              </p>
              <button
                onClick={() => setShowActionPlanModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
              >
                <span>Gerar plano de ação</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Capitão Intelligence Chat / Agent Box (7 of 12 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 shadow-xl flex flex-col justify-between h-full space-y-4">
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-sm sm:text-base text-neutral-100">
                    Capitão Intelligence
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Seu assistente de gestão, sempre com você.
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/80 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>IA Análise em tempo real</span>
              </span>
            </div>

            {/* Chat Body */}
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div className="max-w-md rounded-2xl bg-neutral-800 border border-neutral-700 p-3.5 text-xs text-neutral-100">
                        {msg.text}
                        <span className="block text-[10px] text-neutral-400 mt-1 text-right">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                }

                // AI Message: Full Detailed Analysis exactly matching the user's screenshot
                return (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>

                    <div className="w-full space-y-2">
                      <div className="rounded-2xl bg-neutral-950/70 border border-neutral-800/80 p-4 sm:p-5 text-xs text-neutral-200 space-y-3.5 leading-relaxed shadow-lg">
                        {msg.isDetailedAnalysis ? (
                          <>
                            <p className="text-neutral-200 font-medium">
                              A unidade realizou <strong>R$ 87.420</strong> e está projetando <strong>R$ 96.840</strong>, ficando <strong>R$ 6.160 abaixo do ritmo</strong> necessário para atingir a meta de R$ 103.000.
                            </p>

                            <div className="space-y-2 pt-1">
                              <span className="font-semibold text-neutral-300 block">
                                Os principais pontos identificados são:
                              </span>

                              <div className="space-y-2 text-neutral-300">
                                <div className="flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                    1
                                  </span>
                                  <p>
                                    <strong className="text-neutral-100">3 profissionais</strong> estão abaixo do ritmo proporcional da meta. (Felipe Rocha, Rafael Lima e Bruno Costa têm um gap conjunto de R$ 9.450).
                                  </p>
                                </div>

                                <div className="flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                    2
                                  </span>
                                  <p>
                                    <strong className="text-neutral-100">439 clientes</strong> estão fora da janela esperada de retorno. (58 são clientes VIP com gasto médio &gt; R$ 380).
                                  </p>
                                </div>

                                <div className="flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                    3
                                  </span>
                                  <p>
                                    <strong className="text-neutral-100">Existem clientes frequentes</strong> utilizando pacotes ou pagamento avulso que apresentam potencial de assinatura. (Potencial de R$ 8.100/mês em MRR imediato).
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-300 text-xs">
                              <span className="font-semibold text-amber-300">💡 Minha recomendação:</span>{' '}
                              priorizar os clientes de maior valor em risco e os profissionais com maior gap de performance.
                            </div>

                            {/* Action Buttons matching screenshot */}
                            <div className="pt-2 flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => onNavigate && onNavigate('profissionais')}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1"
                              >
                                <span>Ver profissionais</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => onNavigate && onNavigate('clientes')}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1"
                              >
                                <span>Ver clientes</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => onNavigate && onNavigate('assinaturas')}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1"
                              >
                                <span>Ver oportunidades de assinatura</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => setShowActionPlanModal(true)}
                                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs transition-colors flex items-center gap-1 shadow"
                              >
                                <span>Gerar plano de ação</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <p className="text-neutral-200 font-sans leading-relaxed">
                            {msg.text}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500 block text-right pr-2">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-neutral-400 animate-pulse pl-11">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Capitão Intelligence está processando métricas...</span>
                </div>
              )}
            </div>

            {/* Suggested Prompts Pills matching screenshot */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950/70 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium transition-colors whitespace-nowrap shadow-sm"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>

              {/* Chat Input Bar matching screenshot */}
              <div className="flex items-center gap-2 rounded-xl bg-neutral-950 border border-neutral-800 p-1.5 focus-within:border-neutral-700 transition-colors">
                <button
                  onClick={() => alert('Anexo de planilha ou relatório CSV da operação')}
                  className="p-2 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/60 transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Digite sua pergunta sobre a operação..."
                  className="flex-1 bg-transparent text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none px-2"
                />

                <button
                  onClick={() => handleSendMessage()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
                >
                  <span>Enviar</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Próximas ações recomendadas matching screenshot */}
      <div className="rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/40 flex items-center justify-center">
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h2 className="font-display font-bold text-sm sm:text-base text-neutral-100">
              Próximas ações recomendadas
            </h2>
            <p className="text-xs text-neutral-400">
              Com base na análise atual da operação.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 01 */}
          <div
            onClick={() => onNavigate && onNavigate('clientes')}
            className="rounded-xl p-4 bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-sm text-neutral-500">
                01
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/60 border border-rose-800/50 text-rose-400 uppercase tracking-wider">
                Alta
              </span>
            </div>

            <h3 className="font-display font-bold text-xs sm:text-sm text-neutral-200 group-hover:text-white transition-colors leading-snug">
              Reativar clientes de maior valor em risco
            </h3>

            <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Impacto: Alto • Clientes</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-200 transition-colors" />
            </div>
          </div>

          {/* Card 02 */}
          <div
            onClick={() => onNavigate && onNavigate('profissionais')}
            className="rounded-xl p-4 bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-sm text-neutral-500">
                02
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 border border-amber-800/50 text-amber-400 uppercase tracking-wider">
                Média
              </span>
            </div>

            <h3 className="font-display font-bold text-xs sm:text-sm text-neutral-200 group-hover:text-white transition-colors leading-snug">
              Analisar os 3 profissionais abaixo do ritmo
            </h3>

            <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Impacto: Médio • Profissionais</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-200 transition-colors" />
            </div>
          </div>

          {/* Card 03 */}
          <div
            onClick={() => onNavigate && onNavigate('assinaturas')}
            className="rounded-xl p-4 bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-sm text-neutral-500">
                03
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 border border-amber-800/50 text-amber-400 uppercase tracking-wider">
                Média
              </span>
            </div>

            <h3 className="font-display font-bold text-xs sm:text-sm text-neutral-200 group-hover:text-white transition-colors leading-snug">
              Abordar clientes com alta frequência e potencial de assinatura
            </h3>

            <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Impacto: Médio • Assinaturas</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-200 transition-colors" />
            </div>
          </div>

          {/* Card 04 */}
          <div
            onClick={() => onNavigate && onNavigate('dashboard')}
            className="rounded-xl p-4 bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-sm text-neutral-500">
                04
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 uppercase tracking-wider">
                Baixa
              </span>
            </div>

            <h3 className="font-display font-bold text-xs sm:text-sm text-neutral-200 group-hover:text-white transition-colors leading-snug">
              Acompanhar evolução da meta nos próximos 7 dias
            </h3>

            <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Impacto: Baixo • Geral</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan Modal */}
      {showActionPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-neutral-100">
                    Plano de Ação Operacional Integrado
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Capitão Intelligence • 3 Frentes Prioritárias
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowActionPlanModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Plan steps */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center text-[10px]">1</span>
                    Frente Retenção (VIPs)
                  </span>
                  <span className="text-[10px] text-neutral-500">Prazo: 48h</span>
                </div>
                <p className="text-neutral-300 leading-relaxed pl-6">
                  Disparo de mensagens WhatsApp para os 58 clientes VIP atrasados há mais de 30 dias com benefício de retorno.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center text-[10px]">2</span>
                    Frente Barbeiros (Alinhamento Individual)
                  </span>
                  <span className="text-[10px] text-neutral-500">Prazo: Amanhã 10:00</span>
                </div>
                <p className="text-neutral-300 leading-relaxed pl-6">
                  Reunião com Felipe Rocha, Rafael Lima e Bruno Costa para definir meta diária de vendas de produtos e barba terapia.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px]">3</span>
                    Frente Assinaturas (Recepção & Caixa)
                  </span>
                  <span className="text-[10px] text-neutral-500">Prazo: Imediato</span>
                </div>
                <p className="text-neutral-300 leading-relaxed pl-6">
                  Ativação de roteiro de abordagem na finalização do pagamento para os 27 clientes com perfil de alta propensão.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowActionPlanModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold"
              >
                Fechar
              </button>
              <button
                onClick={handleConfirmPlan}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-display font-bold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Aplicar Plano na Operação</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
