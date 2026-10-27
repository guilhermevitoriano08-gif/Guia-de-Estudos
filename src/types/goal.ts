/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GoalStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string; // formato YYYY-MM-DD
  status: GoalStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type GoalFormData = Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>;

export type GoalFilter = 'todos' | GoalStatus;

export interface GoalStatsSummary {
  total: number;
  naoIniciado: number;
  emAndamento: number;
  concluido: number;
}
