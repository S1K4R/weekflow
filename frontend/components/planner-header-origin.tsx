'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function PlannerHeader() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const changeWeek = (weeks: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + weeks * 7)
    setCurrentDate(newDate)
  }

  const setToday = () => {
    setCurrentDate(new Date())
  }

  const monthName = currentDate.toLocaleString('es-ES', { month: 'long' })
  const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)
  const year = currentDate.getFullYear()

  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#aaa7a1]">
          Tu semana
        </p>
        <h1 className="text-[30px] font-semibold tracking-[-0.04em] text-[#33312e]">
          {formattedMonth} <span className="font-normal text-[#aaa7a1]">{year}</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={setToday}
          className="rounded-lg border border-[#e1ded8] bg-white px-3.5 py-2 text-[12px] font-medium text-[#62605a] shadow-[0_1px_2px_rgba(0,0,0,.02)] transition hover:border-[#c9c5bd]"
        >
          Hoy
        </button>
        <div className="flex items-center rounded-lg border border-[#e1ded8] bg-white">
          <button
            type="button"
            onClick={() => changeWeek(-1)}
            aria-label="Semana anterior"
            className="border-r border-[#e9e6e1] p-2 text-[#8b8780] transition hover:bg-[#f8f7f4]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => changeWeek(1)}
            aria-label="Semana siguiente"
            className="p-2 text-[#8b8780] transition hover:bg-[#f8f7f4]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}