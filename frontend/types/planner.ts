export const taskColors = ['blue', 'coral', 'violet', 'green', 'amber'] as const

export type TaskColor = (typeof taskColors)[number]

export type Task = {
  id: string
  title: string
  target_date: string
  is_completed: boolean
  color: TaskColor
  position: number
}

export type PlannerDay = {
  key: string
  name: string
  date: number
  today?: boolean
  weekend?: boolean
}

export type ColorStyle = {
  dot: string
  line: string
  text: string
  bg: string
}
