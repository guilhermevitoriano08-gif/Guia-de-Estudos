/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { GoalStats } from './components/GoalStats';
import { GoalList } from './components/GoalList';
import { GoalFormModal } from './components/GoalFormModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { StudentTips } from './components/StudentTips';
import { Footer } from './components/Footer';
import { storageService } from './services/storageService';
import { Goal, GoalFilter, GoalFormData, GoalStatus } from './types/goal';
import { CheckCircle2, Info } from 'lucide-react';

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeFilter, setActiveFilter] = useState<GoalFilter>('todos');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<{
    message: string;
    type: 'success' | 'info';
  } | null>(null);

  // Carrega os objetivos do localStorage na montagem
  useEffect(() => {
    const loaded = storageService.getGoals();
    setGoals(loaded);
  }, []);

  // Exibe toast temporário de confirmação de ação
  const showFeedback = (message: string, type: 'success' | 'info' = 'success') => {
    setFeedbackToast({ message, type });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3500);
  };

  // Estatísticas calculadas dinamicamente
  const stats = useMemo(() => {
    return {
      total: goals.length,
      naoIniciado: goals.filter((g) => g.status === 'nao_iniciado').length,
      emAndamento: goals.filter((g) => g.status === 'em_andamento').length,
      concluido: goals.filter((g) => g.status === 'concluido').length,
    };
  }, [goals]);

  // Abertura do modal de criação
  const handleOpenCreateModal = () => {
    setEditingGoal(null);
    setIsFormModalOpen(true);
  };

  // Abertura do modal de edição
  const handleOpenEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsFormModalOpen(true);
  };

  // Salvar (Criar ou Editar)
  const handleSubmitGoalForm = (data: GoalFormData) => {
    if (editingGoal) {
      const updated = storageService.updateGoal(editingGoal.id, data);
      if (updated) {
        setGoals((prev) =>
          prev.map((g) => (g.id === updated.id ? updated : g))
        );
        showFeedback('Objetivo de estudo atualizado com sucesso!');
      }
    } else {
      const created = storageService.createGoal(data);
      setGoals((prev) => [created, ...prev]);
      showFeedback('Novo objetivo cadastrado! Bons estudos!');
    }
    setEditingGoal(null);
  };

  // Requisição de exclusão (abre o modal de confirmação)
  const handleRequestDelete = (goal: Goal) => {
    setDeletingGoal(goal);
  };

  // Confirmação efetiva da exclusão
  const handleConfirmDelete = (goalId: string) => {
    const success = storageService.deleteGoal(goalId);
    if (success) {
      setGoals((prev) => prev.filter((g) => g.id !== goalId));
      showFeedback('Objetivo removido com sucesso.', 'info');
    }
    setDeletingGoal(null);
  };

  // Atualização rápida de status diretamente do cartão
  const handleStatusChange = (goalId: string, newStatus: GoalStatus) => {
    const updated = storageService.updateGoal(goalId, { status: newStatus });
    if (updated) {
      setGoals((prev) =>
        prev.map((g) => (g.id === updated.id ? updated : g))
      );
      if (newStatus === 'concluido') {
        showFeedback('Parabéns! Você concluiu um objetivo de estudo! 🎉');
      } else {
        showFeedback('Status do objetivo atualizado.');
      }
    }
  };

  // Restaurar dados de exemplo para testes
  const handleResetStarters = () => {
    const starters = storageService.resetToStarters();
    setGoals(starters);
    showFeedback('Objetivos de exemplo carregados.');
  };

  // Limpar todos os dados
  const handleClearAll = () => {
    storageService.clearAll();
    setGoals([]);
    showFeedback('Todos os objetivos foram limpos.', 'info');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      {/* Barra de Navegação Superior */}
      <Header
        onOpenNewGoalModal={handleOpenCreateModal}
        totalGoals={stats.total}
      />

      {/* Conteúdo Principal */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 space-y-8">
        {/* Banner de acolhimento e dicas para estudantes iniciantes */}
        <StudentTips />

        {/* Resumo de Metas e Estatísticas */}
        <GoalStats
          stats={stats}
          activeFilter={activeFilter}
          onFilterChange={(filter) => setActiveFilter(filter)}
        />

        {/* Lista de Objetivos com Filtros, Busca e Cartões */}
        <GoalList
          goals={goals}
          onEditGoal={handleOpenEditModal}
          onRequestDeleteGoal={handleRequestDelete}
          onStatusChange={handleStatusChange}
          onOpenNewGoalModal={handleOpenCreateModal}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onResetStarters={handleResetStarters}
        />
      </main>

      {/* Rodapé com informações de persistência local */}
      <Footer
        onResetStarters={handleResetStarters}
        onClearAll={handleClearAll}
      />

      {/* Modal de Formulário (Criar / Editar) */}
      <GoalFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingGoal(null);
        }}
        onSubmit={handleSubmitGoalForm}
        initialGoal={editingGoal}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingGoal)}
        goal={deletingGoal}
        onClose={() => setDeletingGoal(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast de feedback acolhedor */}
      {feedbackToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg animate-in slide-in-from-bottom-5 duration-200"
        >
          {feedbackToast.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <Info className="h-4 w-4 text-indigo-300" />
          )}
          <span>{feedbackToast.message}</span>
        </aside>
      )}
    </div>
  );
}
