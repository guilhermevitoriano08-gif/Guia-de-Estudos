/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Calendar,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  CircleDashed,
  AlertTriangle,
} from 'lucide-react';
import { Goal, GoalStatus } from '../types/goal';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onRequestDelete: (goal: Goal) => void;
  onStatusChange: (goalId: string, newStatus: GoalStatus) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onRequestDelete,
  onStatusChange,
}) => {
  // Formatação de data em pt-BR
  const formatDeadline = (dateStr: string) => {
    if (!dateStr) return 'Sem prazo';
    try {
      const [year, month, day] = dateStr.split('-');
      if (!year || !month || !day) return dateStr;
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  // Verificação de prazo (atrasado, hoje, futuro)
  const getDeadlineStatus = (dateStr: string, status: GoalStatus) => {
    if (!dateStr || status === 'concluido') return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = dateStr.split('-');
    const deadlineDate = new Date(Number(year), Number(month) - 1, Number(day));
    deadlineDate.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
      (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      return {
        label: `Atrasado há ${Math.abs(diffDays)} dia(s)`,
        isOverdue: true,
      };
    }
    if (diffDays === 0) {
      return {
        label: 'Vence hoje!',
        isToday: true,
      };
    }
    if (diffDays <= 3) {
      return {
        label: `Faltam ${diffDays} dia(s)`,
        isSoon: true,
      };
    }
    return null;
  };

  const deadlineAlert = getDeadlineStatus(goal.deadline, goal.status);

  // Mapeamento de status para rótulo e estilo
  const statusConfig: Record<
    GoalStatus,
    { label: string; icon: React.ReactNode; textClass: string; bgClass: string }
  > = {
    nao_iniciado: {
      label: 'Não iniciado',
      icon: <CircleDashed className="h-3.5 w-3.5" />,
      textClass: 'text-slate-600',
      bgClass: 'bg-slate-100',
    },
    em_andamento: {
      label: 'Em andamento',
      icon: <Clock className="h-3.5 w-3.5" />,
      textClass: 'text-amber-700',
      bgClass: 'bg-amber-50',
    },
    concluido: {
      label: 'Concluído',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      textClass: 'text-emerald-700',
      bgClass: 'bg-emerald-50',
    },
  };

  const currentStatus = statusConfig[goal.status];

  return (
    <article
      className={`group flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-xs transition-all hover:shadow-md ${
        goal.status === 'concluido'
          ? 'border-emerald-200/70 bg-emerald-50/20'
          : 'border-slate-200/80 hover:border-slate-300'
      }`}
    >
      <div>
        {/* Cabeçalho do cartão: Status e Ações */}
        <div className="flex items-start justify-between gap-3">
          {/* Status com rótulo descritivo e ícone */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${currentStatus.bgClass} ${currentStatus.textClass}`}
          >
            {currentStatus.icon}
            <span>{currentStatus.label}</span>
          </div>

          {/* Botões de Ação: Editar e Excluir */}
          <div className="flex items-center gap-1 opacity-90 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onEdit(goal)}
              title="Editar objetivo"
              aria-label={`Editar ${goal.title}`}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onRequestDelete(goal)}
              title="Excluir objetivo"
              aria-label={`Excluir ${goal.title}`}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Título do Objetivo */}
        <h3
          className={`mt-3 text-base font-semibold leading-snug tracking-tight ${
            goal.status === 'concluido'
              ? 'text-slate-700 line-through decoration-emerald-500/50'
              : 'text-slate-900'
          }`}
        >
          {goal.title}
        </h3>

        {/* Descrição */}
        <p className="mt-2 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
          {goal.description || (
            <span className="italic text-slate-400">Sem descrição detalhada.</span>
          )}
        </p>
      </div>

      {/* Rodapé do cartão: Prazo e Atualização de Status Rápida */}
      <div className="mt-5 border-t border-slate-100 pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Data do Prazo */}
          <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Prazo: {formatDeadline(goal.deadline)}</span>
          </div>

          {/* Alerta de Prazo se aplicável */}
          {deadlineAlert && (
            <div
              className={`flex items-center gap-1 font-medium ${
                deadlineAlert.isOverdue
                  ? 'text-rose-600'
                  : deadlineAlert.isToday
                  ? 'text-amber-600'
                  : 'text-slate-600'
              }`}
            >
              <AlertTriangle className="h-3 w-3" />
              <span>{deadlineAlert.label}</span>
            </div>
          )}
        </div>

        {/* Seletor rápido de transição de status para facilitar o fluxo de estudo */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-1 text-xs">
          <span className="px-2 font-medium text-slate-500">Mudar status:</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onStatusChange(goal.id, 'nao_iniciado')}
              className={`rounded-lg px-2 py-1 transition-all ${
                goal.status === 'nao_iniciado'
                  ? 'bg-white font-semibold text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Não iniciado
            </button>
            <button
              type="button"
              onClick={() => onStatusChange(goal.id, 'em_andamento')}
              className={`rounded-lg px-2 py-1 transition-all ${
                goal.status === 'em_andamento'
                  ? 'bg-amber-100 font-semibold text-amber-800 shadow-xs'
                  : 'text-slate-500 hover:text-amber-700'
              }`}
            >
              Em andamento
            </button>
            <button
              type="button"
              onClick={() => onStatusChange(goal.id, 'concluido')}
              className={`rounded-lg px-2 py-1 transition-all ${
                goal.status === 'concluido'
                  ? 'bg-emerald-100 font-semibold text-emerald-800 shadow-xs'
                  : 'text-slate-500 hover:text-emerald-700'
              }`}
            >
              Concluído
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
