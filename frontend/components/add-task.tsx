'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

type AddTaskProps = { day: string; onAdd: (day: string, title: string) => void }

export function AddTask({ day, onAdd }: AddTaskProps) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const submit = () => { if (!value.trim()) return; onAdd(day, value.trim()); setValue(''); setEditing(false) }

  if (editing) return <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-[#dedbd5] bg-white p-1.5 shadow-sm"><input autoFocus value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.nativeEvent.isComposing || event.keyCode === 229) return; if (event.key === 'Enter') submit(); if (event.key === 'Escape') setEditing(false) }} placeholder="Nueva tarea…" className="min-w-0 flex-1 bg-transparent px-2 text-[13px] text-[#45433f] outline-none placeholder:text-[#aaa7a1]" /><button type="button" onClick={() => setEditing(false)} aria-label="Cancelar"><X className="h-4 w-4 text-[#aaa7a1]" /></button></div>

  return <button type="button" onClick={() => setEditing(true)} className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[12px] text-[#aaa7a1] transition hover:bg-white hover:text-[#77736d]"><Plus className="h-3.5 w-3.5" /> Añadir tarea</button>
}
