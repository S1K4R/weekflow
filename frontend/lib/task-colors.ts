import type { ColorStyle, TaskColor } from '@/types/planner'

export const colorStyles: Record<TaskColor, ColorStyle> = {
  blue: { dot: 'bg-[#5d8cf5]', line: 'border-l-[#5d8cf5]', text: 'text-[#3d65c0]', bg: 'bg-[#eef3ff]' },
  coral: { dot: 'bg-[#f28f79]', line: 'border-l-[#f28f79]', text: 'text-[#c86450]', bg: 'bg-[#fff1ee]' },
  violet: { dot: 'bg-[#a58af5]', line: 'border-l-[#a58af5]', text: 'text-[#7657d0]', bg: 'bg-[#f5f1ff]' },
  green: { dot: 'bg-[#58b99a]', line: 'border-l-[#58b99a]', text: 'text-[#378b70]', bg: 'bg-[#edf9f5]' },
  amber: { dot: 'bg-[#e8ae55]', line: 'border-l-[#e8ae55]', text: 'text-[#af771e]', bg: 'bg-[#fff8e9]' },
}
