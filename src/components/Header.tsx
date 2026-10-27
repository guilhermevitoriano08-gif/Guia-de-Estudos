/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenNewGoalModal: () => void;
  totalGoals: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNewGoalModal, totalGoals }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Marca com ícone e identidade educacional */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Study<span className="text-indigo-600">Flow</span>
            </span>
            <span className="hidden text-xs text-slate-500 sm:inline sm:ml-2">
              · Gestão de estudos para iniciantes
            </span>
          </div>
        </div>

        {/* Zone 2 & 3: Contador discreto e Ação principal */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 text-xs text-slate-500 md:flex">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-semibold text-slate-700">{totalGoals}</span>
            <span>{totalGoals === 1 ? 'objetivo cadastrado' : 'objetivos cadastrados'}</span>
          </div>

          <button
            type="button"
            onClick={onOpenNewGoalModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Objetivo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
