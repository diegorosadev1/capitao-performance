import React from 'react';
import { Search, Calendar, Store, Filter } from 'lucide-react';
import { MOCK_UNITS } from '../../mock/units';

interface FilterBarProps {
  selectedPeriod: string;
  onSelectPeriod: (period: string) => void;
  selectedUnit: string;
  onSelectUnit: (unitId: string) => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  showUnitFilter?: boolean;
  extraControls?: React.ReactNode;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedPeriod,
  onSelectPeriod,
  selectedUnit,
  onSelectUnit,
  searchTerm,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  showUnitFilter = true,
  extraControls,
}) => {
  const periods = [
    { id: 'hoje', label: 'Hoje' },
    { id: 'semana', label: 'Esta Semana' },
    { id: 'mes', label: 'Setembro / Mês' },
    { id: 'ultimos_30', label: 'Últimos 30 Dias' },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
          <Calendar className="w-3.5 h-3.5 text-neutral-400 ml-2 shrink-0" />
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPeriod(p.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedPeriod === p.id
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Unit Selector */}
        {showUnitFilter && (
          <div className="flex items-center gap-1.5 bg-neutral-950 px-2.5 py-1.5 rounded-lg border border-neutral-800 text-xs">
            <Store className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <select
              value={selectedUnit}
              onChange={(e) => onSelectUnit(e.target.value)}
              className="bg-transparent text-neutral-200 text-xs focus:outline-none cursor-pointer pr-1"
            >
              <option value="todas" className="bg-neutral-900 text-white">
                Todas as Unidades
              </option>
              {MOCK_UNITS.map((unit) => (
                <option
                  key={unit.id}
                  value={unit.id}
                  className="bg-neutral-900 text-white"
                >
                  {unit.name} ({unit.status === 'ativa' ? 'Ativa' : 'Implantação'})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onSearchChange && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>
        )}
        {extraControls}
      </div>
    </div>
  );
};
