'use client'

import { cn } from '@/lib/utils'
import { FILTERS, type Filter } from '@/lib/todo'

type TodoFooterProps = {
  activeCount: number
  completedCount: number
  filter: Filter
  onFilterChange: (filter: Filter) => void
  onClearCompleted: () => void
}

export function TodoFooter({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <footer className="flex flex-col gap-4 border-t border-border pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p aria-live="polite">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
      </p>

      <nav aria-label="Filter tasks" className="flex items-center gap-1">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            aria-pressed={filter === value}
            className={cn(
              'rounded-full px-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              filter === value ? 'bg-foreground text-background' : 'hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-left transition-colors hover:text-foreground focus-visible:underline focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 sm:text-right"
      >
        Clear completed
      </button>
    </footer>
  )
}
