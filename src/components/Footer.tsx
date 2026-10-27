/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotateCcw, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onResetStarters: () => void;
  onClearAll: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetStarters, onClearAll }) => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="flex items-center gap-1 text-slate-700 font-medium">
            StudyFlow · Feito para apoiar sua jornada de estudos
            <Heart className="h-3.5 w-3.5 text-rose-500 inline fill-rose-500" />
          </p>
          <p className="text-slate-400">
            Armazenamento 100% local no seu navegador via localStorage. Seus dados continuam aqui após atualizar a página.
          </p>
        </div>

        {/* Ferramentas de teste e gerenciamento */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onResetStarters}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            title="Recarrega metas de exemplo para testes"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Recarregar Exemplos</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Deseja realmente limpar todos os objetivos para testar o estado vazio?')) {
                onClearAll();
              }
            }}
            className="rounded-lg px-2.5 py-1.5 text-slate-400 hover:text-rose-600 transition-colors"
            title="Limpar todos os objetivos para testar estado vazio"
          >
            Limpar tudo
          </button>
        </div>
      </div>
    </footer>
  );
};
