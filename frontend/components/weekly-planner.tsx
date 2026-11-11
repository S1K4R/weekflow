'use client'

import { useEffect, useMemo, useState } from 'react'
import { CircleHelp, MoreHorizontal, Search, Settings2, Sparkles, Sun } from 'lucide-react'
import { CategoryLegend } from '@/components/category-legend'
import { DayColumn } from '@/components/day-column'
import { PlannerHeader } from '@/components/planner-header'
import type { PlannerDay, Task } from '@/types/planner'

const API_BASE_URL = 'http://localhost:8080/api'

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function WeeklyPlanner() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [tasks, setTasks] = useState<Task[]>([])
  const [showCompleted, setShowCompleted] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // 1. Cargar tareas desde el backend en Go
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tasks`)
        if (res.ok) {
          const data = await res.json()
          setTasks(data || [])
        } else {
          console.error('Error al obtener tareas:', res.statusText)
        }
      } catch (error) {
        console.error('Error de red al conectar con Go:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // Calcular dinámicamente los 7 días de la semana (Lunes a Domingo)
  const weekDays = useMemo<PlannerDay[]>(() => {
    const todayStr = formatDateKey(new Date())
    const dayOfWeek = currentDate.getDay()
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

    const monday = new Date(currentDate)
    monday.setDate(currentDate.getDate() + distanceToMonday)

    const dayNames = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM']

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      const key = formatDateKey(d)

      return {
        key,
        name: dayNames[i],
        date: d.getDate(),
        today: key === todayStr,
        weekend: i === 5 || i === 6,
      }
    })
  }, [currentDate])

  const changeWeek = (weeks: number) => {
    setCurrentDate((prev) => {
      const next = new Date(prev)
      next.setDate(prev.getDate() + weeks * 7)
      return next
    })
  }

  const setToday = () => setCurrentDate(new Date())

  // 2. Alternar estado completado mediante PATCH al backend
  const toggleTask = async (id: string) => {
    // Actualización optimista en la interfaz
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, is_completed: !task.is_completed } : task))
    )

    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
        method: 'PATCH',
      })
      if (!res.ok) {
        console.error('No se pudo actualizar el estado en el servidor')
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error)
    }
  }

  // 3. Crear nueva tarea mediante POST al backend
  const addTask = async (day: string, title: string) => {
    const newTask: Task = {
      id: String(Date.now() + Math.random()),
      title,
      target_date: day,
      is_completed: false,
      color: 'blue',
      position: tasks.filter((task) => task.target_date === day).length + 1,
    }

    // Actualización local para respuesta instantánea
    setTasks((current) => [...current, newTask])

    try {
      const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      })
      if (!res.ok) {
        console.error('No se pudo guardar la tarea en el servidor')
      }
    } catch (error) {
      console.error('Error al guardar tarea en Go:', error)
    }
  }

  const completed = tasks.filter((task) => task.is_completed).length
  const visibleTasks = useMemo(
    () => tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase())),
    [tasks, search]
  )

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#45433f]">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#33312e] text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#33312e]">weekflow</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Buscar tareas"
            className="rounded-lg p-2 text-[#85817b] transition hover:bg-white hover:text-[#45433f]"
          >
            <Search className="h-[17px] w-[17px]" />
          </button>
          <button
            type="button"
            aria-label="Ayuda"
            className="hidden rounded-lg p-2 text-[#85817b] transition hover:bg-white hover:text-[#45433f] sm:block"
          >
            <CircleHelp className="h-[17px] w-[17px]" />
          </button>
          <button
            type="button"
            aria-label="Ajustes"
            className="rounded-lg p-2 text-[#85817b] transition hover:bg-white hover:text-[#45433f]"
          >
            <Settings2 className="h-[17px] w-[17px]" />
          </button>
          <div className="ml-2 h-7 w-7 rounded-full bg-[#e8c1a8] ring-2 ring-white" aria-label="Perfil de usuario" />
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-6 pb-10 lg:px-12">
        <PlannerHeader
          currentDate={currentDate}
          onPrevWeek={() => changeWeek(-1)}
          onNextWeek={() => changeWeek(1)}
          onToday={setToday}
        />

        {searchOpen && (
          <div className="mb-5 flex max-w-sm items-center gap-2 rounded-lg border border-[#e1ded8] bg-white px-3 py-2">
            <Search className="h-4 w-4 text-[#aaa7a1]" />
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar en tu semana…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#aaa7a1]"
            />
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <p className="text-[12px] text-[#aaa7a1]">
            <span className="font-medium text-[#716d66]">
              {completed} de {tasks.length}
            </span>{' '}
            tareas completadas
          </p>
          <button
            type="button"
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-[12px] text-[#8c8881] transition hover:text-[#45433f]"
          >
            {showCompleted ? 'Ocultar completadas' : 'Mostrar completadas'}
          </button>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="grid min-w-[980px] grid-cols-7 divide-x divide-[#e8e5e0] overflow-hidden rounded-xl border border-[#e8e5e0] bg-[#f3f2ef]">
            {isLoading ? (
              <div className="col-span-7 flex justify-center py-20 text-sm text-[#aaa7a1]">
                Cargando tareas desde el servidor Go...
              </div>
            ) : (
              weekDays.map((day) => (
                <DayColumn
                  key={day.key}
                  day={day}
                  tasks={visibleTasks
                    .filter((task) => task.target_date === day.key && (showCompleted || !task.is_completed))
                    .sort((a, b) => a.position - b.position)}
                  onToggle={toggleTask}
                  onAdd={addTask}
                />
              ))
            )}
          </div>
        </div>

        <footer className="mt-5 flex items-center justify-between text-[11px] text-[#aaa7a1]">
          <CategoryLegend />
          <div className="hidden items-center gap-1.5 sm:flex">
            <Sun className="h-3.5 w-3.5" /> Semana tranquila, paso a paso <MoreHorizontal className="ml-1 h-3.5 w-3.5" />
          </div>
        </footer>
      </section>
    </main>
  )
}