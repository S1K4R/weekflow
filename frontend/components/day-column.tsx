import type { PlannerDay, Task } from '@/types/planner'
import { AddTask } from '@/components/add-task'
import { TaskCard } from '@/components/task-card'

type DayColumnProps = { day: PlannerDay; tasks: Task[]; onToggle: (id: string) => void; onAdd: (day: string, title: string) => void }

export function DayColumn({ day, tasks, onToggle, onAdd }: DayColumnProps) {
  return <section className={`min-h-[540px] p-3.5 ${day.weekend ? 'bg-[#f1f0ed]/70' : ''}`}><header className="mb-5 flex items-center justify-between px-1"><div className="flex items-baseline gap-2"><span className={`text-[11px] font-semibold tracking-[0.12em] ${day.today ? 'text-[#557dd7]' : 'text-[#9a9690]'}`}>{day.name}</span><span className={`text-[22px] font-semibold tracking-[-0.04em] ${day.today ? 'text-[#557dd7]' : 'text-[#5c5954]'}`}>{day.date}</span></div>{day.today && <span className="rounded-full bg-[#e5edff] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#557dd7]">Hoy</span>}</header><div className="flex flex-col gap-2">{tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} />)}</div><AddTask day={day.key} onAdd={onAdd} /></section>
}
