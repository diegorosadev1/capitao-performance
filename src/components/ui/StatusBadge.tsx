import React from 'react';

type BadgeStatus =
  | 'ativo'
  | 'inativo'
  | 'em_atendimento'
  | 'folga'
  | 'novo'
  | 'recorrente'
  | 'atingida'
  | 'em_andamento'
  | 'em_risco'
  | 'concluido'
  | 'alerta'
  | 'baixo'
  | 'medio'
  | 'alto';

interface StatusBadgeProps {
  status: BadgeStatus | string;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'ativo':
      case 'atingida':
      case 'concluido':
        return {
          text: label || 'Ativo',
          className: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40',
          dotColor: 'bg-emerald-400',
        };
      case 'em_atendimento':
        return {
          text: label || 'Em Atendimento',
          className: 'bg-neutral-800/90 text-neutral-200 border-neutral-700',
          dotColor: 'bg-neutral-300 animate-pulse',
        };
      case 'folga':
        return {
          text: label || 'Folga',
          className: 'bg-neutral-900 text-neutral-400 border-neutral-800',
          dotColor: 'bg-neutral-500',
        };
      case 'novo':
        return {
          text: label || 'Novo',
          className: 'bg-neutral-100 text-neutral-900 font-semibold border-neutral-200',
          dotColor: 'bg-neutral-900',
        };
      case 'recorrente':
        return {
          text: label || 'Recorrente',
          className: 'bg-neutral-800 text-neutral-200 border-neutral-700',
          dotColor: 'bg-neutral-400',
        };
      case 'em_andamento':
        return {
          text: label || 'Em Andamento',
          className: 'bg-neutral-800/80 text-neutral-300 border-neutral-700/60',
          dotColor: 'bg-neutral-400',
        };
      case 'em_risco':
      case 'alerta':
      case 'alto':
        return {
          text: label || (status === 'alto' ? 'Risco Alto' : 'Em Risco'),
          className: 'bg-rose-950/30 text-rose-300 border-rose-800/40',
          dotColor: 'bg-rose-400',
        };
      case 'medio':
        return {
          text: label || 'Médio',
          className: 'bg-amber-950/30 text-amber-300 border-amber-800/40',
          dotColor: 'bg-amber-400',
        };
      case 'baixo':
        return {
          text: label || 'Baixo',
          className: 'bg-emerald-950/30 text-emerald-300 border-emerald-800/40',
          dotColor: 'bg-emerald-400',
        };
      case 'inativo':
        return {
          text: label || 'Inativo',
          className: 'bg-neutral-900 text-neutral-500 border-neutral-800',
          dotColor: 'bg-neutral-600',
        };
      default:
        return {
          text: label || status,
          className: 'bg-neutral-800 text-neutral-300 border-neutral-700',
          dotColor: 'bg-neutral-400',
        };
    }
  };

  const config = getBadgeConfig();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border whitespace-nowrap ${config.className} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dotColor}`} />
      {config.text}
    </span>
  );
};
