/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lightbulb, ChevronRight, X } from 'lucide-react';

const TIPS = [
  {
    title: 'Fracione metas complexas',
    desc: 'Em vez de "Aprender Programação", prefira "Escrever 3 condicionais if/else em 25 minutos". Metas específicas reduzem a ansiedade de começar.',
  },
  {
    title: 'Consistência vence a intensidade',
    desc: 'Estudar 30 minutos todos os dias é muito mais eficiente do que 5 horas seguidas uma vez na semana.',
  },
  {
    title: 'Celebre cada objetivo concluído',
    desc: 'Ao marcar uma meta como concluída, seu cérebro libera dopamina e fortalece o hábito do aprendizado.',
  },
  {
    title: 'Defina prazos possíveis',
    desc: 'Estime o tempo com margem de segurança. Ter um prazo claro evita a procrastinação sem gerar sobrecarga.',
  },
];

export const StudentTips: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const currentTip = TIPS[currentTipIndex];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-amber-50/60 p-4 sm:p-5 shadow-2xs">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Dica para Estudantes Iniciantes
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">
                {currentTipIndex + 1} de {TIPS.length}
              </span>
            </div>
            <h4 className="mt-1 text-sm font-semibold text-slate-900">
              {currentTip.title}
            </h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-2xl">
              {currentTip.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleNextTip}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100/60 transition-colors"
            title="Próxima dica"
          >
            <span>Próxima</span>
            <ChevronRight className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-600 transition-colors"
            aria-label="Ocultar dicas"
            title="Ocultar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
