import React, { useState } from 'react';
import {
  LayoutGrid,
  Users,
  Scissors,
  DollarSign,
  UserCheck,
  CreditCard,
  Sparkles,
  BarChart3,
  FileText,
  Settings,
  MapPin,
  ChevronDown,
  ArrowDown,
  X,
  Headset,
} from 'lucide-react';
import { UserRole } from '../../types';
import logoImg from '../../assets/images/logo.png';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  userRole: UserRole;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  selectedUnit?: string;
  onSelectUnit?: (unit: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
  selectedUnit = 'Unidade Jardins',
  onSelectUnit,
}) => {
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [currentUnitName, setCurrentUnitName] = useState(selectedUnit);

  const units = [
    'Unidade Jardins',
    'Unidade Bom Retiro',
    'Unidade Alphaville',
    'Unidade Itaim Bibi',
  ];

  // Navigation structure matching the screenshot precisely
  const navSections = [
    {
      title: 'OPERAÇÃO',
      items: [
        { id: 'dashboard', label: 'Visão Geral', icon: LayoutGrid },
      ],
    },
    {
      title: 'GESTÃO',
      items: [
        { id: 'lider', label: 'Minha Equipe', icon: Users, badge: 'LÍDER', badgeType: 'neutral' },
        { id: 'hoje', label: 'Meu Desempenho', icon: Scissors, badge: 'BARBEIRO', badgeType: 'neutral' },
        { id: 'metas', label: 'Faturamento', icon: DollarSign },
        { id: 'profissionais', label: 'Profissionais', icon: Scissors, badge: '1 ATENÇÃO', badgeType: 'warning' },
        { id: 'clientes', label: 'Clientes', icon: UserCheck, badge: '439 RISCO', badgeType: 'danger' },
        { id: 'recepcao', label: 'Recepção', icon: Headset, badge: 'NOVO', badgeType: 'success' },
        { id: 'assinaturas', label: 'Assinaturas', icon: CreditCard },
      ],
    },
    {
      title: 'INTELIGÊNCIA',
      items: [
        { id: 'inteligencia', label: 'Capitão Intelligence', icon: Sparkles, badge: '3', badgeType: 'count' },
      ],
    },
    {
      title: 'ANÁLISES',
      items: [
        { id: 'performance', label: 'Indicadores', icon: BarChart3 },
        { id: 'relatorios', label: 'Relatórios', icon: FileText },
        { id: 'importar', label: 'CONFIGURAÇÕES', icon: Settings },
      ],
    },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    onCloseMobile();
  };

  const content = (
    <div className="flex h-full flex-col justify-between overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-neutral-800">
      <div className="space-y-4">
        {/* Brand Header inside Mobile Drawer */}
        <div className="lg:hidden px-2 pt-1 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Selector: Parent component background (bg-neutral-900/40 border border-neutral-800/90) */}
        <div className="px-0.5 relative">
          <button
            onClick={() => setShowUnitDropdown(!showUnitDropdown)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 text-xs text-neutral-200 hover:border-neutral-700 transition-all text-left shadow-sm"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
              <span className="font-medium truncate text-xs">{currentUnitName}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-1">
              <span className="text-[10px] font-medium text-neutral-400 bg-neutral-950/80 px-2 py-0.5 rounded-md border border-neutral-800/80">
                84,9% meta
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </div>
          </button>

          {showUnitDropdown && (
            <div className="absolute left-0.5 right-0.5 mt-1.5 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100 text-xs">
              {units.map((unit) => (
                <button
                  key={unit}
                  onClick={() => {
                    setCurrentUnitName(unit);
                    if (onSelectUnit) onSelectUnit(unit);
                    setShowUnitDropdown(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-neutral-800 transition-colors ${
                    currentUnitName === unit ? 'text-white font-semibold bg-neutral-800/50' : 'text-neutral-400'
                  }`}
                >
                  <span>{unit}</span>
                  {currentUnitName === unit && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="space-y-4 pt-1">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <h2 className="px-2.5 text-[10px] font-display font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                {section.title}
              </h2>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-neutral-900/80 text-amber-400 font-medium shadow-sm border border-amber-500/70'
                          : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-amber-400' : 'text-neutral-400'
                          }`}
                        />
                        <span className="tracking-tight">{item.label}</span>
                      </div>

                      {/* Badges exactly styled as screenshot */}
                      {item.badge && (
                        <>
                          {item.badgeType === 'neutral' && (
                            <span className="text-[9px] font-display font-bold px-2 py-0.5 rounded-full tracking-wider uppercase bg-neutral-800/70 border border-neutral-700/60 text-neutral-300">
                              {item.badge}
                            </span>
                          )}
                          {item.badgeType === 'warning' && (
                            <span className="text-[9px] font-display font-bold px-2 py-0.5 rounded-full tracking-wider uppercase border border-amber-500/50 bg-amber-950/30 text-amber-400">
                              {item.badge}
                            </span>
                          )}
                          {item.badgeType === 'danger' && (
                            <span className="text-[9px] font-display font-bold px-2 py-0.5 rounded-full tracking-wider uppercase border border-rose-500/50 bg-rose-950/30 text-rose-400">
                              {item.badge}
                            </span>
                          )}
                          {item.badgeType === 'success' && (
                            <span className="text-[9px] font-display font-bold px-2 py-0.5 rounded-full tracking-wider uppercase border border-emerald-500/50 bg-emerald-950/30 text-emerald-400">
                              {item.badge}
                            </span>
                          )}
                          {item.badgeType === 'count' && (
                            <span className="w-5 h-5 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-[10px] font-bold flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Pinned Area */}
      <div className="space-y-2.5 pt-4">
        {/* Card 1: Ritmo do Mês (bg-neutral-900/40 border border-neutral-800/90) */}
        <div className="p-3.5 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-200">Ritmo do Mês</span>
            <span className="font-bold text-rose-500 flex items-center gap-0.5">
              <span>-R$ 6.160</span>
              <ArrowDown className="w-3 h-3 text-rose-500 stroke-[3]" />
            </span>
          </div>
          
          {/* Progress bar with white fill matching screenshot */}
          <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-neutral-100 rounded-full transition-all duration-500"
              style={{ width: '72%' }}
            />
          </div>

          <div className="text-[11px] text-neutral-400">
            72% da meta
          </div>
        </div>

        {/* Card 2: Capitão Pro */}
        <div className="p-3 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            {/* Authentic Capitão Logo */}
            <img
              src={logoImg}
              alt="Capitão Pro"
              className="w-9 h-9 rounded-xl object-contain shadow-sm shrink-0"
            />
            <div>
              <p className="font-display font-bold text-neutral-100 text-xs leading-tight">
                Capitão Pro
              </p>
              <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                Central de Inteligência
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950/80 px-2 py-0.5 rounded-md border border-neutral-800/80">
            v2.4
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-neutral-800/80 bg-neutral-950 h-[calc(100vh-4rem)] sticky top-16">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-68 bg-neutral-950 border-r border-neutral-800 shadow-2xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
