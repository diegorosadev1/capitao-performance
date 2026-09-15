import React, { useState } from 'react';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Eye,
  Trash2,
  Loader2,
} from 'lucide-react';
import { MOCK_IMPORT_BATCHES } from '../mock/imports';
import { ImportBatch } from '../types';
import { Modal } from '../components/ui/Modal';
import { ProgressBar } from '../components/ui/ProgressBar';

export const ImportView: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<ImportBatch | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeFileName, setActiveFileName] = useState('');

  const handleStartImport = (batch: ImportBatch) => {
    setSelectedBatch(batch);
    setStep(1);
    setActiveFileName(`planilha_${batch.type}_setembro_2026.xlsx`);
  };

  const simulateStepAdvance = (nextStep: 2 | 3 | 4 | 5 | 6, delay = 1200) => {
    setIsProcessing(true);
    setStep(nextStep);
    setTimeout(() => {
      setIsProcessing(false);
    }, delay);
  };

  const stepLabels = [
    { num: 1, label: 'Arquivo' },
    { num: 2, label: 'Upload' },
    { num: 3, label: 'Validação' },
    { num: 4, label: 'Preview' },
    { num: 5, label: 'Confirmação' },
    { num: 6, label: 'Concluído' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileSpreadsheet className="w-5 h-5 text-neutral-300" />
          <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
            Central de Importação de Planilhas
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400">
          Substituição gradual das planilhas manuais da barbearia por importações estruturadas para o banco de dados.
        </p>
      </div>

      {/* Cards de Tipos de Importação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_IMPORT_BATCHES.map((batch) => (
          <div
            key={batch.id}
            className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  Planilha Excel / CSV
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-neutral-100 mb-1">
                {batch.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {batch.description}
              </p>

              {batch.lastImportedAt && (
                <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800/80 text-[11px] text-neutral-500 mb-4">
                  Última sincronização: {batch.lastImportedAt}
                </div>
              )}
            </div>

            <button
              onClick={() => handleStartImport(batch)}
              className="w-full py-2.5 px-3 rounded-lg bg-neutral-100 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 shadow"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Importar {batch.title}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Interactive 6-step Import Wizard Modal */}
      {selectedBatch && (
        <Modal
          isOpen={!!selectedBatch}
          onClose={() => setSelectedBatch(null)}
          title={`Assistente de Importação: ${selectedBatch.title}`}
          subtitle="Siga as 6 etapas do fluxo para carregar e validar os dados da sua planilha."
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 overflow-x-auto gap-2">
              {stepLabels.map((s) => (
                <div key={s.num} className="flex items-center gap-2 shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full font-display font-bold text-xs flex items-center justify-center ${
                      step === s.num
                        ? 'bg-neutral-100 text-neutral-950'
                        : step > s.num
                        ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                        : 'bg-neutral-950 text-neutral-600 border border-neutral-800'
                    }`}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      step === s.num ? 'text-neutral-100' : 'text-neutral-500'
                    }`}
                  >
                    {s.label}
                  </span>
                  {s.num < 6 && <span className="text-neutral-700 mx-1">→</span>}
                </div>
              ))}
            </div>

            {/* Step 1: Selecionar Arquivo */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-neutral-800 rounded-xl p-8 text-center bg-neutral-950/40 hover:border-neutral-600 transition-colors cursor-pointer">
                  <UploadCloud className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                  <p className="font-display font-semibold text-sm text-neutral-200">
                    Clique para selecionar ou arraste o arquivo aqui
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Formatos aceitos: .XLSX, .XLS ou .CSV (até 25MB)
                  </p>
                  <div className="mt-4 inline-block px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-300">
                    Arquivo mock: <strong>{activeFileName}</strong>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedBatch(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => simulateStepAdvance(2, 1000)}
                    className="px-5 py-2.5 rounded-lg bg-neutral-100 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2"
                  >
                    <span>Carregar Arquivo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Upload */}
            {step === 2 && (
              <div className="py-8 text-center space-y-4">
                <Loader2 className="w-10 h-10 text-neutral-300 animate-spin mx-auto" />
                <h4 className="font-display font-bold text-base text-neutral-100">
                  Enviando arquivo para o servidor...
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Transferindo <strong>{activeFileName}</strong> (1.4 MB) de forma segura.
                </p>
                <div className="max-w-xs mx-auto pt-2">
                  <ProgressBar percentage={isProcessing ? 65 : 100} showPercentageText={false} />
                </div>
                {!isProcessing && (
                  <button
                    onClick={() => simulateStepAdvance(3, 1400)}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-neutral-100 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-white"
                  >
                    Avançar para Validação dos Dados
                  </button>
                )}
              </div>
            )}

            {/* Step 3: Validando Dados */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <h4 className="font-display font-semibold text-sm text-neutral-200">
                    Relatório da Análise de Integridade:
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Estrutura de colunas compatível com o schema do Supabase.</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>98 linhas analisadas. Zero CPFs ou registros duplicados.</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Formato de valores monetários e datas reconhecidos.</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 rounded-lg bg-neutral-100 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2"
                  >
                    <span>Ver Prévia dos Registros</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-display font-semibold text-sm text-neutral-200 mb-2">
                    Prévia dos Dados Mapeados (Primeiras 4 linhas)
                  </h4>
                  <div className="w-full overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-400 text-[11px] uppercase">
                          {selectedBatch.sampleColumns.map((col, i) => (
                            <th key={i} className="py-2.5 px-3 whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60">
                        {selectedBatch.samplePreview.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-neutral-900/40">
                            {selectedBatch.sampleColumns.map((col, cIdx) => (
                              <td
                                key={cIdx}
                                className="py-2 px-3 text-neutral-300 whitespace-nowrap"
                              >
                                {row[col] ?? '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="px-5 py-2.5 rounded-lg bg-neutral-100 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2"
                  >
                    <span>Avançar para Confirmação</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Confirmar Importação */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-2">
                  <FileCheck className="w-10 h-10 text-neutral-200 mx-auto mb-1" />
                  <h4 className="font-display font-bold text-base text-neutral-100">
                    Pronto para Sincronizar
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Ao confirmar, os registros do arquivo <strong>{activeFileName}</strong> serão inseridos e recalcularão os faturamentos e metas em tempo real.
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setStep(4)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => simulateStepAdvance(6, 1500)}
                    className="px-6 py-2.5 rounded-lg bg-neutral-100 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow"
                  >
                    <span>Confirmar e Importar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Importação Concluída */}
            {step === 6 && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-xl text-neutral-100">
                  Importação Concluída com Sucesso!
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Todos os registros foram importados e sincronizados com a Unidade Bom Retiro. Os indicadores do Dashboard já refletem essas métricas.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedBatch(null)}
                    className="px-6 py-2.5 rounded-lg bg-neutral-100 text-neutral-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-white"
                  >
                    Concluir e Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
