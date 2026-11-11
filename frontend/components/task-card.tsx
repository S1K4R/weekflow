import type { Task } from '@/types/planner'
import { colorStyles } from '@/lib/task-colors'

type TaskCardProps = { task: Task; onToggle: (id: string) => void }

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const style = colorStyles[task.color]

  return (
    <div className={`group relative flex items-start gap-2.5 rounded-lg border-l-[3px] bg-white/75 px-3 py-2.5 shadow-[0_1px_2px_rgba(43,38,30,0.03)] transition hover:bg-white hover:shadow-[0_5px_15px_rgba(43,38,30,0.06)] ${style.line}`}>
      <button type="button" onClick={() => onToggle(task.id)} aria-label={task.is_completed ? `Marcar ${task.title} como pendiente` : `Completar ${task.title}`} className={`mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border transition ${task.is_completed ? `${style.dot} border-transparent` : 'border-[#d7d4cf] bg-white hover:border-[#a5a09a]'}`}>
        {task.is_completed && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </button>
      <span className={`text-[13px] leading-5 transition ${task.is_completed ? 'text-[#aaa7a1] line-through' : 'text-[#45433f]'}`}>{task.title}</span>
      <span className={`ml-auto mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} aria-label={`Categoría ${task.color}`} />
    </div>
  )
}
