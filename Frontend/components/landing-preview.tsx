import { CalendarDays, Check, ChevronLeft, ChevronRight } from 'lucide-react'

const sampleTasks = [
  { label: 'Review pull requests', done: true },
  { label: 'Plan next week', done: false },
  { label: 'Call the dentist', done: false },
  { label: 'Go for a run', done: true },
]

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function LandingPreview() {
  return (
    <section aria-label="App preview" className="mx-auto w-full max-w-xl pb-24">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Today</p>
            <p className="text-2xl font-semibold tracking-tight text-card-foreground">Saturday</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground" aria-hidden="true">
            <span className="rounded-md p-1.5"><ChevronLeft className="size-4" /></span>
            <span className="rounded-md p-1.5"><CalendarDays className="size-4" /></span>
            <span className="rounded-md p-1.5"><ChevronRight className="size-4" /></span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1 text-center" aria-hidden="true">
          {week.map((day, index) => (
            <span
              key={day}
              className={
                index === 5
                  ? 'rounded-md bg-foreground py-2 text-xs font-medium text-background'
                  : 'rounded-md py-2 text-xs text-muted-foreground'
              }
            >
              {day}
            </span>
          ))}
        </div>

        <ul className="mt-6 flex flex-col divide-y divide-border">
          {sampleTasks.map((task) => (
            <li key={task.label} className="flex items-center gap-3 py-3">
              <span
                className={
                  task.done
                    ? 'flex size-5 items-center justify-center rounded-full bg-foreground text-background'
                    : 'size-5 rounded-full border border-border'
                }
                aria-hidden="true"
              >
                {task.done && <Check className="size-3" strokeWidth={3} />}
              </span>
              <span
                className={
                  task.done ? 'text-sm text-muted-foreground line-through' : 'text-sm text-card-foreground'
                }
              >
                {task.label}
                {task.done && <span className="sr-only"> (completed)</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
