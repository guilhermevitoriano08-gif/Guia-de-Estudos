/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Clock, CheckCircle2, CircleDashed } from 'lucide-react';
import { GoalStatsSummary } from '../types/goal';

interface GoalStatsProps {
  stats: GoalStatsSummary;
  onFilterChange?: (status: 'todos' | 'nao_iniciado' | 'em_andamento' | 'concluido') => void;
  activeFilter?: string;
}

export const GoalStats: React.FC<GoalStatsProps> = ({
  stats,
  onFilterChange,
  activeFilter = 'todos',
}) => {
  const completionRate =
    stats.total > 0 ? Math.round((stats.concluido / stats.total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Barra de progresso geral */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Seu Progresso de Aprendizagem
            </h2>
            <p className="text-xs text-slate-500">
              Pequenos passos constantes constroem grandes conquistas educacionais.
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-indigo-600 tabular-nums">
              {completionRate}%
            </span>
            <span className="text-xs text-slate-500">concluído</span>
          </div>
        </div>

        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Cartões de contagem rápida */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {/* Total */}
        <button
          type="button"
          onClick={() => onFilterChange && onFilterChange('todos')}
          className={`flex flex-col rounded-xl border p-4 text-left transition-all ${
            activeFilter === 'todos'
              ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500'
              : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-medium">Total de Objetivos</span>
            <Target className="h-4 w-4 text-indigo-600" />
          </div>
          <span className="mt-2 text-2xl font-bold text-slate-900 tabular-nums">
            {stats.total}
          </span>
          <span className="mt-0.5 text-xs text-slate-400">
            {stats.total === 1 ? 'meta registrada' : 'metas registradas'}
          </span>
        </button>

        {/* Não Iniciados */}
        <button
          type="button"
          onClick={() => onFilterChange && onFilterChange('nao_iniciado')}
          className={`flex flex-col rounded-xl border p-4 text-left transition-all ${
            activeFilter === 'nao_iniciado'
              ? 'border-slate-500 bg-slate-100/70 ring-1 ring-slate-500'
              : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-medium">Não Iniciados</span>
            <CircleDashed className="h-4 w-4 text-slate-500" />
          </div>
          <span className="mt-2 text-2xl font-bold text-slate-800 tabular-nums">
            {stats.naoIniciado}
          </span>
          <span className="mt-0.5 text-xs text-slate-400">aguardando início</span>
        </button>

        {/* Em Andamento */}
        <button
          type="button"
          onClick={() => onFilterChange && onFilterChange('em_andamento')}
          className={`flex flex-col rounded-xl border p-4 text-left transition-all ${
            activeFilter === 'em_andamento'
              ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-500'
              : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-xs font-medium text-slate-600">Em Andamento</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <span className="mt-2 text-2xl font-bold text-amber-600 tabular-nums">
            {stats.emAndamento}
          </span>
          <span className="mt-0.5 text-xs text-slate-400">em foco agora</span>
        </button>

        {/* Concluídos */}
        <button
          type="button"
          onClick={() => onFilterChange && onFilterChange('concluido')}
          className={`flex flex-col rounded-xl border p-4 text-left transition-all ${
            activeFilter === 'concluido'
              ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500'
              : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-xs font-medium text-slate-600">Concluídos</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <span className="mt-2 text-2xl font-bold text-emerald-600 tabular-nums">
            {stats.concluido}
          </span>
          <span className="mt-0.5 text-xs text-slate-400">objetivos atingidos</span>
        </button>
      </div>
    </div>
  );
};
