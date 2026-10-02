'use client'

import { useState } from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  addDays,
  formatLongDate,
  fromDateKey,
  relativeDayTitle,
  startOfWeek,
  toDateKey,
} from '@/lib/date'

type DateNavigatorProps = {
  todayKey: string
  selectedKey: string
  daysWithTasks: Set<string>
  onSelect: (key: string) => void
}

const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'narrow' })

export function DateNavigator({ todayKey, selectedKey, daysWithTasks, onSelect }: DateNavigatorProps) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const ready = todayKey !== ''
  const isToday = selectedKey === todayKey
  const weekStart = ready ? startOfWeek(selectedKey) : ''
  const week = ready ? Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)) : []

  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {ready ? formatLongDate(selectedKey) : '\u00a0'}
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground">
            {ready ? relativeDayTitle(todayKey, selectedKey) : 'Today'}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {ready && !isToday && (
            <Button variant="ghost" size="sm" onClick={() => onSelect(todayKey)}>
              Today
            </Button>
          )}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger
              disabled={!ready}
              render={<Button variant="ghost" size="icon" aria-label="Pick a date" />}
            >
              <CalendarIcon className="size-4" aria-hidden="true" />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              {ready && (
                <Calendar
                  mode="single"
                  selected={fromDateKey(selectedKey)}
                  defaultMonth={fromDateKey(selectedKey)}
                  onSelect={(date) => {
                    if (!date) return
                    onSelect(toDateKey(date))
                    setCalendarOpen(false)
                  }}
                  modifiers={{
                    hasTasks: (date) => daysWithTasks.has(toDateKey(date)),
                  }}
                  modifiersClassNames={{
                    hasTasks: 'font-semibold underline decoration-muted-foreground underline-offset-4',
                  }}
                />
              )}
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous day"
            disabled={!ready}
            onClick={() => onSelect(addDays(selectedKey, -1))}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next day"
            disabled={!ready}
            onClick={() => onSelect(addDays(selectedKey, 1))}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <nav aria-label="Week" className="grid grid-cols-7 gap-1">
        {ready
          ? week.map((key) => {
              const date = fromDateKey(key)
              const selected = key === selectedKey
              const today = key === todayKey
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelect(key)}
                  aria-current={selected ? 'date' : undefined}
                  aria-label={formatLongDate(key)}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-md py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    selected
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  <span className="font-mono uppercase">{weekdayFormatter.format(date)}</span>
                  <span className={cn('text-sm font-medium', today && !selected && 'text-foreground')}>
                    {date.getDate()}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-1 rounded-full',
                      daysWithTasks.has(key)
                        ? selected
                          ? 'bg-background'
                          : 'bg-muted-foreground'
                        : 'bg-transparent',
                    )}
                  />
                </button>
              )
            })
          : Array.from({ length: 7 }, (_, i) => <div key={i} className="h-[62px]" />)}
      </nav>
    </header>
  )
}
