import React from 'react';
import {
  Shield,
  Key,
  Lock,
  UserCheck,
  History,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Clock,
} from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';

export const SecurityView: React.FC = () => {
  const auditLogs = [
    { id: '1', action: 'Login realizado com sucesso', user: 'Carlos Mendes (Gestor)', ip: '189.40.12.84', time: 'Hoje às 14:31', status: 'success' },
    { id: '2', action: 'Alteração de Meta da Unidade Bom Retiro', user: 'Carlos Mendes (Gestor)', ip: '189.40.12.84', time: 'Hoje às 11:20', status: 'warning' },
    { id: '3', action: 'Importação de Faturamento via Planilha CSV', user: 'Carla Recepção', ip: '177.18.99.12', time: 'Hoje às 09:14', status: 'success' },
    { id: '4', action: 'Tentativa de login com senha incorreta', user: 'usuario.antigo@capitao.com', ip: '201.55.10.4', time: 'Ontem às 22:45', status: 'danger' },
    { id: '5', action: 'Comissão calculada e exportada', user: 'Carlos Mendes (Gestor)', ip: '189.40.12.84', time: 'Ontem às 19:10', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-5 h-5 text-neutral-300" />
          <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-50 tracking-tight">
            Segurança, Acessos & Auditoria
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400">
          Controle de permissões por perfil (RBAC), logs de transações e integridade de dados.
        </p>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Nível de Segurança"
          value="Alto (Ativo)"
          subtext="Autenticação e permissões restritas"
          icon={Lock}
          highlight={true}
        />
        <MetricCard
          label="Perfis Ativos Cadastrados"
          value="4 perfis"
          subtext="Gestor, Líder, Barbeiro e Recepção"
          icon={UserCheck}
        />
        <MetricCard
          label="Último Backup da Base"
          value="Hoje às 04:00"
          subtext="Sincronizado e redundante"
          icon={FileCheck}
        />
      </div>

      {/* Roles & Permissions matrix */}
      <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4">
        <h3 className="font-display font-bold text-base text-neutral-100">
          Matriz de Permissões por Papel (RBAC)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="font-display font-bold text-neutral-100 text-sm flex items-center justify-between">
              <span>Fundador</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-200">Full</span>
            </div>
            <p className="text-neutral-400">Acesso irrestrito a faturamento, comissões, metas, importações e auditoria.</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="font-display font-bold text-neutral-100 text-sm flex items-center justify-between">
              <span>Líder Técnico</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-200">Técnico</span>
            </div>
            <p className="text-neutral-400">Visualização de rankings, feedback da equipe e acompanhamento de metas operacionais.</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="font-display font-bold text-neutral-100 text-sm flex items-center justify-between">
              <span>Barbeiro</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-200">Individual</span>
            </div>
            <p className="text-neutral-400">Acesso exclusivo ao seu próprio faturamento, metas, desafios e ranking público.</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="font-display font-bold text-neutral-100 text-sm flex items-center justify-between">
              <span>Recepção</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-200">Operação</span>
            </div>
            <p className="text-neutral-400">Fila de espera, cadastro de novos clientes, ocupação de cadeiras e importações diárias.</p>
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-neutral-400" />
            <h3 className="font-display font-bold text-base text-neutral-100">
              Logs de Atividades Recentes
            </h3>
          </div>
          <span className="text-xs text-neutral-500">Últimas 24 horas</span>
        </div>

        <div className="divide-y divide-neutral-800/80 text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start sm:items-center gap-3">
                {log.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />}
                {log.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />}
                {log.status === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />}
                <div>
                  <p className="font-medium text-neutral-200">{log.action}</p>
                  <p className="text-[11px] text-neutral-500">
                    Realizado por: <strong className="text-neutral-400">{log.user}</strong> • IP: {log.ip}
                  </p>
                </div>
              </div>
              <span className="text-neutral-500 text-[11px] shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
