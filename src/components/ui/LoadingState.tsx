import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Carregando dados da operação...',
  subtext = 'Sincronizando métricas e performance em tempo real',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <Loader2 className="w-8 h-8 text-neutral-400 animate-spin mb-3" />
      <p className="font-display font-medium text-sm text-neutral-200">{message}</p>
      {subtext && <p className="text-xs text-neutral-500 mt-1">{subtext}</p>}
    </div>
  );
};
