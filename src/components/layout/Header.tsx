import React, { useState } from 'react';
import {
  Menu,
  Bell,
  ChevronDown,
  Shield,
  Scissors,
  Users,
  Compass,
  LogOut,
  Calendar,
  Sparkles,
  X,
  Bot,
  Send,
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import { UserAvatar } from '../ui/UserAvatar';
import { MOCK_USERS } from '../../mock/users';
import logoImg from '../../assets/images/logo.png';

interface HeaderProps {
  currentUser: UserProfile;
  onSwitchUser: (user: UserProfile) => void;
  onOpenMobileMenu: () => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSwitchUser,
  onOpenMobileMenu,
  onNavigate,
  onLogout,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUnitMenu, setShowUnitMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState('Unidade Jardins');
  const [selectedMonth, setSelectedMonth] = useState('Setembro 2026');

  const units = [
    'Unidade Jardins',
    'Unidade Bom Retiro',
    'Unidade Alphaville',
    'Unidade Itaim Bibi',
  ];

  const months = [
    'Setembro 2026',
    'Agosto 2026',
    'Julho 2026',
    'Junho 2026',
  ];

  const roleLabels: Record<UserRole, { label: string; icon: React.ElementType }> = {
    gestor: { label: 'Fundador', icon: Shield },
    barbeiro: { label: 'Barbeiro', icon: Scissors },
    recepcao: { label: 'Recepção', icon: Users },
    lider: { label: 'Líder Técnico', icon: Compass },
  };

  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setAiResponse(
      `Analisando dados da ${selectedUnit} para ${selectedMonth}: O faturamento acumulado está em R$ 87.450 (72% da meta). Para bater o objetivo do mês, a equipe precisa de um ritmo diário de R$ 3.850. Recomendação prioritária: ativar campanhas de retorno para os 439 clientes em risco de churn.`
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-neutral-800/80 bg-neutral-950 px-3 sm:px-5">
        {/* Left Side: Brand Logo, Unit Selector & Consolidated Status */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
          {/* Mobile Menu Trigger */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo & Name - matching image */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <img
              src={logoImg}
              alt="Capitão"
              className="w-10 h-10 rounded-xl object-contain shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-xs tracking-wider text-neutral-100 uppercase">
                  CAPITÃO
                </span>
                <span className="text-amber-400 font-bold">•</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium tracking-tight">
                Central de Performance
              </p>
            </div>
          </div>

          {/* Subtle Vertical Divider */}
          <div className="hidden md:block h-6 w-px bg-neutral-800/80 mx-1 shrink-0" />

          {/* Unit Selector Pill & Status Note */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative shrink-0">
              <button
                onClick={() => setShowUnitMenu(!showUnitMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/90 hover:border-neutral-700 transition-all text-xs font-medium text-neutral-200 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate max-w-[120px] sm:max-w-none">{selectedUnit}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              </button>

              {showUnitMenu && (
                <div className="absolute left-0 mt-1.5 w-48 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  {units.map((unit) => (
                    <button
                      key={unit}
                      onClick={() => {
                        setSelectedUnit(unit);
                        setShowUnitMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-neutral-800 transition-colors ${
                        selectedUnit === unit ? 'text-white font-semibold bg-neutral-800/50' : 'text-neutral-400'
                      }`}
                    >
                      <span>{unit}</span>
                      {selectedUnit === unit && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[11px] text-neutral-400 hidden xl:inline truncate">
              Diagnóstico diário consolidado às 15:45
            </span>
          </div>
        </div>

        {/* Right Side: Month Selector, Perguntar ao Capitão, Bell, User Profile (Import removed) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Month Selector Pill */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowDateMenu(!showDateMenu)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/90 hover:border-neutral-700 transition-all text-xs font-medium text-neutral-200 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{selectedMonth}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
            </button>

            {showDateMenu && (
              <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                {months.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMonth(m);
                      setShowDateMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-neutral-800 transition-colors ${
                      selectedMonth === m ? 'text-white font-semibold bg-neutral-800/50' : 'text-neutral-400'
                    }`}
                  >
                    <span>{m}</span>
                    {selectedMonth === m && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Perguntar ao Capitão Button - Amber border and text pill */}
          <button
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-amber-500 bg-neutral-950/80 hover:bg-amber-400/10 text-xs font-display font-semibold text-amber-400 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Perguntar ao Capitão</span>
          </button>

          {/* Notifications simulation with pink/rose dot */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors relative"
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-neutral-800/90 bg-neutral-900/95 p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-3">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Notificações Operacionais
                  </span>
                  <span className="text-[10px] text-neutral-400">Hoje</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                    <p className="font-semibold text-neutral-200">Meta mensal em 72%</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Gap atual de -R$ 6.160 para o ritmo ideal de Setembro.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                    <p className="font-semibold text-neutral-200">Alerta de Churn</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      439 clientes em risco de abandono identificados pelo Capitão.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Switcher Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 sm:gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-xl hover:bg-neutral-900/70 transition-all text-left"
            >
              <UserAvatar
                src={currentUser.avatarUrl}
                name={currentUser.name}
                size="sm"
              />
              <div className="hidden sm:block text-left">
                <p className="font-display font-bold text-xs text-neutral-100 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                  {roleLabels[currentUser.role]?.label || 'Gestor Geral'}
                </p>
                <p className="text-[10px] text-neutral-400 leading-tight truncate max-w-[110px]">
                  Bom Retiro (Matriz)
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-0.5" />
            </button>

            {/* Profile Dropdown Menu - EXACTLY matching the screenshot */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-neutral-800/90 bg-neutral-900/95 p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
                <div className="px-2 py-1.5 text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  SIMULAR PERFIL DE ACESSO
                </div>

                <div className="space-y-1">
                  {MOCK_USERS.map((user) => {
                    const Icon = roleLabels[user.role]?.icon || Shield;
                    const isSelected = user.id === currentUser.id;
                    return (
                      <button
                        key={user.id}
                        onClick={() => {
                          onSwitchUser(user);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-neutral-800/70 border border-neutral-700/60 shadow-sm text-white'
                            : 'hover:bg-neutral-800/50 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                            <Icon className="w-4 h-4 shrink-0" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-display font-semibold text-xs truncate text-neutral-100">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-neutral-400">
                              {roleLabels[user.role]?.label}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white shrink-0 mr-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 mt-2 border-t border-neutral-800/80">
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-950/20 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Sair da Sessão</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* AI Assistant Modal triggered by Perguntar ao Capitão */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl rounded-3xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-neutral-100">
                    Capitão Intelligence
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Pergunte qualquer métrica ou diagnóstico operacional em tempo real
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setAiResponse(null);
                  setAiQuestion('');
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAskAi} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ex: Como acelerar o faturamento desta semana?"
                  className="w-full pl-4 pr-12 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!aiQuestion.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-amber-400 text-neutral-950 disabled:opacity-40 hover:bg-amber-300 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {aiResponse && (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-display font-bold text-amber-400">
                  <Bot className="w-4 h-4" />
                  <span>Diagnóstico do Capitão:</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {aiResponse}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 text-[11px] text-neutral-500">
              <span>Sugestões: &quot;Top barbeiros em faturamento&quot; • &quot;Clientes em risco de churn&quot;</span>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  onNavigate('inteligencia');
                }}
                className="text-amber-400 hover:underline font-semibold"
              >
                Abrir Central Completa →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
