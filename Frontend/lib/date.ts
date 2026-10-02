export function toDateKey(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromDateKey(key: string) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(key: string, days: number) {
  const date = fromDateKey(key)
  date.setDate(date.getDate() + days)
  return toDateKey(date)
}

export function startOfWeek(key: string) {
  const date = fromDateKey(key)
  const mondayOffset = (date.getDay() + 6) % 7
  return addDays(key, -mondayOffset)
}

export function dayDifference(fromKey: string, toKey: string) {
  const ms = fromDateKey(toKey).getTime() - fromDateKey(fromKey).getTime()
  return Math.round(ms / 86_400_000)
}

export function formatLongDate(key: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(fromDateKey(key))
}

export function relativeDayTitle(todayKey: string, key: string) {
  const diff = dayDifference(todayKey, key)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(fromDateKey(key))
}
