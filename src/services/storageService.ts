/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Goal, GoalFormData } from '../types/goal';

const STORAGE_KEY = 'studyflow_goals_v1';

// Objetivos iniciais para demonstrar a aplicação para estudantes iniciantes
const INITIAL_STARTER_GOALS: Goal[] = [
  {
    id: 'starter-1',
    title: 'Compreender os conceitos básicos de variáveis e funções',
    description: 'Assistir às duas primeiras aulas e praticar a criação de 3 funções simples com anotações no caderno.',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'em_andamento',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'starter-2',
    title: 'Montar cronograma semanal de 45 minutos diários',
    description: 'Definir horários fixos de segunda a sexta para manter a consistência sem sobrecarga.',
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'concluido',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'starter-3',
    title: 'Resolver a primeira lista de 5 exercícios práticos',
    description: 'Colocar a mão na massa resolvendo os desafios propostos na plataforma antes de avançar para o próximo tema.',
    deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'nao_iniciado',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const storageService = {
  /**
   * Obtém todos os objetivos salvos no localStorage.
   * Se for a primeira visita, inicializa com objetivos de exemplo acolhedores.
   */
  getGoals(): Goal[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Inicializa com dados de exemplo na primeira visita para guiar o estudante iniciante
        this.saveGoals(INITIAL_STARTER_GOALS);
        return INITIAL_STARTER_GOALS;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  },

  /**
   * Salva a lista completa de objetivos no localStorage.
   */
  saveGoals(goals: Goal[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
      console.error('Erro ao gravar objetivos no localStorage:', error);
    }
  },

  /**
   * Cadastra um novo objetivo de estudo.
   */
  createGoal(data: GoalFormData): Goal {
    const goals = this.getGoals();
    const newGoal: Goal = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `goal-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: data.title.trim(),
      description: data.description.trim(),
      deadline: data.deadline,
      status: data.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedGoals = [newGoal, ...goals];
    this.saveGoals(updatedGoals);
    return newGoal;
  },

  /**
   * Atualiza os dados de um objetivo existente.
   */
  updateGoal(id: string, data: Partial<GoalFormData>): Goal | null {
    const goals = this.getGoals();
    const index = goals.findIndex((g) => g.id === id);
    if (index === -1) return null;

    const existing = goals[index];
    const updated: Goal = {
      ...existing,
      ...data,
      title: data.title !== undefined ? data.title.trim() : existing.title,
      description: data.description !== undefined ? data.description.trim() : existing.description,
      updatedAt: new Date().toISOString(),
    };

    goals[index] = updated;
    this.saveGoals(goals);
    return updated;
  },

  /**
   * Remove um objetivo pelo ID.
   */
  deleteGoal(id: string): boolean {
    const goals = this.getGoals();
    const filtered = goals.filter((g) => g.id !== id);
    if (filtered.length !== goals.length) {
      this.saveGoals(filtered);
      return true;
    }
    return false;
  },

  /**
   * Limpa todos os dados ou reseta para os objetivos iniciais (útil para testes).
   */
  resetToStarters(): Goal[] {
    this.saveGoals(INITIAL_STARTER_GOALS);
    return INITIAL_STARTER_GOALS;
  },

  /**
   * Limpa todos os objetivos.
   */
  clearAll(): void {
    this.saveGoals([]);
  },
};
