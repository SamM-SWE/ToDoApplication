import { CalendarDays, Feather, ListChecks } from 'lucide-react'

const features = [
  {
    icon: ListChecks,
    title: 'One list per day',
    description: 'Every day starts fresh, so you only see what matters right now.',
  },
  {
    icon: CalendarDays,
    title: 'Plan any date',
    description: 'Jump to tomorrow or next month with the calendar and plan ahead.',
  },
  {
    icon: Feather,
    title: 'Nothing extra',
    description: 'No labels, no projects, no noise. Just add, check off, and move on.',
  },
]

export function LandingFeatures() {
  return (
    <section aria-labelledby="features-heading" className="mx-auto w-full max-w-5xl pb-24">
      <h2 id="features-heading" className="sr-only">
        Features
      </h2>
      <div className="grid gap-10 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <h3 className="font-medium text-foreground">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
