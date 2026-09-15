import React, { useState } from 'react';
import { FileText, Download, Calendar, DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';

export const ReportsView: React.FC = () => {
  const [reportType, setReportType] = useState('dre');

  // DRE Simplificada da Barbearia (Demonstrativo de Resultado do Exercício)
  const dreData = [
    { item: 'Receita Bruta com Serviços de Barbearia', value: 80270, type: 'credit' },
    { item: 'Receita Bruta com Produtos Home Care (Pomadas/Óleos)', value: 7180, type: 'credit' },
    { item: '(=) Receita Operacional Bruta Total', value: 87450, type: 'total_bold' },
    { item: '(-) Comissões dos Barbeiros (Média 46%)', value: -40227, type: 'debit' },
    { item: '(-) Custo de Produtos e Insumos Utilizados', value: -5247, type: 'debit' },
    { item: '(=) Lucro Bruto Operacional (Margem de Contribuição)', value: 41976, type: 'subtotal' },
    { item: '(-) Custos Fixos (Aluguel, Energia, Recepção, Software)', value: -18500, type: 'debit' },
    { item: '(-) Marketing e Captação de Novos Clientes', value: -3200, type: 'debit' },
    { item: '(=) Resultado Operacional Líquido Estimado', value: 20276, type: 'net_profit' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-neutral-300" />
            <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
              Relatórios & DRE Gerencial
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            Análise financeira e operacional consolidada com demonstrativo de resultado por competência.
          </p>
        </div>

        <button
          onClick={() => alert('Download do relatório em PDF iniciado!')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Baixar Relatório (PDF)</span>
        </button>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Receita Bruta Total"
          value="R$ 87.450"
          subtext="Setembro 2026"
          icon={DollarSign}
          highlight={true}
        />
        <MetricCard
          label="Margem Bruta pós Comissões"
          value="48,0%"
          subtext="R$ 41.976 após repasse de equipe"
          icon={TrendingUp}
        />
        <MetricCard
          label="Resultado Líquido Estimado"
          value="R$ 20.276"
          subtext="Margem líquida de 23,2%"
        />
      </div>

      {/* DRE Table */}
      <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <h3 className="font-display font-bold text-base text-neutral-100">
            DRE Gerencial Simplificada (Competência: Setembro 2026)
          </h3>
          <span className="text-xs text-neutral-500">Valores em R$</span>
        </div>

        <div className="divide-y divide-neutral-800/80 text-xs sm:text-sm">
          {dreData.map((row, idx) => (
            <div
              key={idx}
              className={`py-3 flex items-center justify-between ${
                row.type === 'net_profit'
                  ? 'bg-neutral-950 px-4 rounded-xl border border-neutral-700 font-bold text-neutral-50'
                  : row.type === 'total_bold'
                  ? 'font-bold text-neutral-100 bg-neutral-950/40 px-2'
                  : row.type === 'subtotal'
                  ? 'font-semibold text-neutral-200'
                  : 'text-neutral-300'
              }`}
            >
              <span>{row.item}</span>
              <span
                className={`font-display ${
                  row.value < 0 ? 'text-neutral-400' : 'text-neutral-100 font-semibold'
                }`}
              >
                {row.value < 0
                  ? `- R$ ${Math.abs(row.value).toLocaleString('pt-BR')}`
                  : `R$ ${row.value.toLocaleString('pt-BR')}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
