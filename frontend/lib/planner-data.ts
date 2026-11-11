import type { PlannerDay, Task } from '@/types/planner'

export const seedTasks: Task[] = [
  { id: '1', title: 'Reunión de proyecto', target_date: '2026-11-10', is_completed: false, color: 'blue', position: 1 },
  { id: '2', title: 'Revisar propuesta de diseño', target_date: '2026-11-10', is_completed: false, color: 'violet', position: 2 },
  { id: '3', title: 'Enviar informe semanal', target_date: '2026-11-10', is_completed: true, color: 'coral', position: 3 },
  { id: '4', title: 'Planificar contenido', target_date: '2026-11-11', is_completed: false, color: 'green', position: 1 },
  { id: '5', title: 'Llamada con equipo', target_date: '2026-11-11', is_completed: false, color: 'blue', position: 2 },
  { id: '6', title: 'Comprar ingredientes', target_date: '2026-11-12', is_completed: false, color: 'amber', position: 1 },
  { id: '7', title: 'Clase de yoga', target_date: '2026-11-12', is_completed: true, color: 'violet', position: 2 },
  { id: '8', title: 'Leer 20 páginas', target_date: '2026-11-13', is_completed: false, color: 'coral', position: 1 },
  { id: '9', title: 'Preparar presentación', target_date: '2026-11-14', is_completed: false, color: 'blue', position: 1 },
  { id: '10', title: 'Tiempo con familia', target_date: '2026-11-15', is_completed: false, color: 'green', position: 1 },
]

export const plannerDays: PlannerDay[] = [
  { key: '2026-11-09', name: 'LUN', date: 9 },
  { key: '2026-11-10', name: 'MAR', date: 10, today: true },
  { key: '2026-11-11', name: 'MIÉ', date: 11 },
  { key: '2026-11-12', name: 'JUE', date: 12 },
  { key: '2026-11-13', name: 'VIE', date: 13 },
  { key: '2026-11-14', name: 'SÁB', date: 14, weekend: true },
  { key: '2026-11-15', name: 'DOM', date: 15, weekend: true },
]
