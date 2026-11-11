'use client'

import { useMemo, useState } from 'react'
import { CircleHelp, MoreHorizontal, Search, Settings2, Sparkles, Sun } from 'lucide-react'
import { CategoryLegend } from '@/components/category-legend'
import { DayColumn } from '@/components/day-column'
import { PlannerHeader } from '@/components/planner-header'
import { plannerDays, seedTasks } from '@/lib/planner-data'
import type { Task } from '@/types/planner'

export function WeeklyPlanner() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks)
  const [showCompleted, setShowCompleted] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const completed = tasks.filter((task) => task.is_completed).length
  const visibleTasks = useMemo(() => tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase())), [tasks, search])
  const toggleTask = (id: string) => setTasks((current) => current.map((task) => task.id === id ? { ...task, is_completed: !task.is_completed } : task))
  const addTask = (day: string, title: string) => setTasks((current) => [...current, { 
    id: String(Date.now() + Math.random()),
    title,
    target_date: day,
    is_completed:false,
    color: 'blue',
    position: current.filter((task) => task.target_date === day).length +1,
  }
  ])

  return <main className="min-h-screen bg-[#f8f7f4] text-[#45433f]"><header className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-12"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#33312e] text-white"><Sparkles className="h-4 w-4" /></div><span className="text-[15px] font-semibold tracking-[-0.02em] text-[#33312e]">weekflow</span></div><div className="flex items-center gap-1.5"><button type="button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Buscar tareas" className="rounded-lg p-2 text-[#85817b] transition hover:bg-white hover:text-[#45433f]"><Search className="h-[17px] w-[17px]" /></button><button type="button" aria-label="Ayuda" className="hidden rounded-lg p-2 text-[#85817b] transition hover:bg-white hover:text-[#45433f] sm:block"><CircleHelp className="h-[17px] w-[17px]" /></button><button type="button" aria-label="Ajustes" className="rounded-lg p-2 text-[#85817b] transition hover:bg-white hover:text-[#45433f]"><Settings2 className="h-[17px] w-[17px]" /></button><div className="ml-2 h-7 w-7 rounded-full bg-[#e8c1a8] ring-2 ring-white" aria-label="Perfil de usuario" /></div></header><section className="mx-auto max-w-[1440px] px-6 pb-10 lg:px-12"><PlannerHeader />{searchOpen && <div className="mb-5 flex max-w-sm items-center gap-2 rounded-lg border border-[#e1ded8] bg-white px-3 py-2"><Search className="h-4 w-4 text-[#aaa7a1]" /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar en tu semana…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#aaa7a1]" /></div>}<div className="mb-4 flex items-center justify-between"><p className="text-[12px] text-[#aaa7a1]"><span className="font-medium text-[#716d66]">{completed} de {tasks.length}</span> tareas completadas</p><button type="button" onClick={() => setShowCompleted(!showCompleted)} className="text-[12px] text-[#8c8881] transition hover:text-[#45433f]">{showCompleted ? 'Ocultar completadas' : 'Mostrar completadas'}</button></div><div className="overflow-x-auto pb-4"><div className="grid min-w-[980px] grid-cols-7 divide-x divide-[#e8e5e0] overflow-hidden rounded-xl border border-[#e8e5e0] bg-[#f3f2ef]">{plannerDays.map((day) => <DayColumn key={day.key} day={day} tasks={visibleTasks.filter((task) => task.target_date === day.key && (showCompleted || !task.is_completed)).sort((a, b) => a.position - b.position)} onToggle={toggleTask} onAdd={addTask} />)}</div></div><footer className="mt-5 flex items-center justify-between text-[11px] text-[#aaa7a1]"><CategoryLegend /><div className="hidden items-center gap-1.5 sm:flex"><Sun className="h-3.5 w-3.5" /> Semana tranquila, paso a paso <MoreHorizontal className="ml-1 h-3.5 w-3.5" /></div></footer></section></main>
}
