'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

export function TodoInput({ onAdd }: { onAdd: (title: string) => void }) {
  const [value, setValue] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = value.trim()
    if (!title) return
    onAdd(title)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-border pb-3">
      <label htmlFor="new-todo" className="sr-only">
        Add a new task
      </label>
      <input
        id="new-todo"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="What needs to be done?"
        autoComplete="off"
        className="flex-1 bg-transparent py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Add task"
        className="flex size-8 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-20"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </form>
  )
}
