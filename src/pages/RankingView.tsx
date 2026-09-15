import React from 'react';
import { Trophy, Award, Flame, TrendingUp, Info } from 'lucide-react';
import { RankingList } from '../components/ui/RankingList';
import { MOCK_PROFESSIONALS } from '../mock/professionals';
import { Professional } from '../types';

interface RankingViewProps {
  onSelectProfessional: (prof: Professional) => void;
}

export const RankingView: React.FC<RankingViewProps> = ({
  onSelectProfessional,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-neutral-300" />
            <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
              Ranking de Performance Geral
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            Acompanhamento em tempo real da competitividade e produtividade da equipe da barbearia.
          </p>
        </div>

        {/* Informative badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
          <Info className="w-4 h-4 text-neutral-400 shrink-0" />
          <span>Premiação do 1º lugar ao final de Setembro</span>
        </div>
      </div>

      {/* Main Ranking Podiums & Table Component */}
      <RankingList
        professionals={MOCK_PROFESSIONALS}
        onSelectProfessional={onSelectProfessional}
      />
    </div>
  );
};
