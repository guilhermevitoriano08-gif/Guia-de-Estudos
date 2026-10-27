/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Plus, Filter, Sparkles, FolderOpen, RefreshCcw } from 'lucide-react';
import { Goal, GoalFilter, GoalStatus } from '../types/goal';
import { GoalCard } from './GoalCard';

interface GoalListProps {
  goals: Goal[];
  onEditGoal: (goal: Goal) => void;
  onRequestDeleteGoal: (goal: Goal) => void;
  onStatusChange: (goalId: string, newStatus: GoalStatus) => void;
  onOpenNewGoalModal: () => void;
  activeFilter: GoalFilter;
  onFilterChange: (filter: GoalFilter) => void;
  onResetStarters: () => void;
}

export const GoalList: React.FC<GoalListProps> = ({
  goals,
  onEditGoal,
  onRequestDeleteGoal,
  onStatusChange,
  onOpenNewGoalModal,
  activeFilter,
  onFilterChange,
  onResetStarters,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtragem combinada: status + busca por texto
  const filteredGoals = goals.filter((goal) => {
    const matchesFilter =
      activeFilter === 'todos' ? true : goal.status === activeFilter;

    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      goal.title.toLowerCase().includes(term) ||
      goal.description.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  return (
    <section className="space-y-6">
      {/* Barra de controle: Filtros de status e Busca */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Abas de filtro interativas */}
        <div className="flex items-center gap-1 overflow-x-auto rounded-xl bg-slate-200/60 p-1 text-xs">
          <button
            type="button"
            onClick={() => onFilterChange('todos')}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-medium transition-all ${
              activeFilter === 'todos'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos ({goals.length})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('nao_iniciado')}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-medium transition-all ${
              activeFilter === 'nao_iniciado'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Não iniciados
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('em_andamento')}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-medium transition-all ${
              activeFilter === 'em_andamento'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Em andamento
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('concluido')}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-medium transition-all ${
              activeFilter === 'concluido'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Concluídos
          </button>
        </div>

        {/* Campo de pesquisa de objetivos */}
        <div className="relative min-w-[240px] sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por objetivo ou tema..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Exibição dos Cartões ou Estados Vazios */}
      {goals.length === 0 ? (
        /* Estado vazio geral: quando não há nenhum objetivo salvo */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FolderOpen className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900">
            Nenhum objetivo cadastrado ainda
          </h3>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Você ainda não tem metas de estudo ativas. Crie seu primeiro objetivo para
            começar a organizar sua rotina de estudos com clareza e foco.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenNewGoalModal}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Cadastrar Primeiro Objetivo</span>
            </button>

            <button
              type="button"
              onClick={onResetStarters}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              title="Carregar exemplos para estudantes iniciantes"
            >
              <RefreshCcw className="h-4 w-4 text-slate-500" />
              <span>Carregar Exemplos Iniciais</span>
            </button>
          </div>
        </div>
      ) : filteredGoals.length === 0 ? (
        /* Estado vazio filtrado: quando a busca ou filtro não retorna itens */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-slate-800">
            Nenhum objetivo encontrado
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-500">
            {searchTerm
              ? `Nenhum objetivo corresponde à busca "${searchTerm}". Tente outras palavras-chave ou limpe a busca.`
              : `Não há objetivos na categoria "${
                  activeFilter === 'nao_iniciado'
                    ? 'Não iniciados'
                    : activeFilter === 'em_andamento'
                    ? 'Em andamento'
                    : 'Concluídos'
                }".`}
          </p>

          <div className="mt-4 flex gap-2">
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                Limpar pesquisa
              </button>
            )}
            {activeFilter !== 'todos' && (
              <button
                type="button"
                onClick={() => onFilterChange('todos')}
                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
              >
                Ver todos os objetivos
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Grade de cartões de objetivos */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={onEditGoal}
              onRequestDelete={onRequestDeleteGoal}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
};
