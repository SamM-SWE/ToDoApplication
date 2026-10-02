'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Todo } from '@/lib/todo'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, title: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onRename }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)

  function commit() {
    const title = draft.trim()
    if (title) onRename(todo.id, title)
    else setDraft(todo.title)
    setIsEditing(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing || event.keyCode === 229) return
      commit()
    } else if (event.key === 'Escape') {
      setDraft(todo.title)
      setIsEditing(false)
    }
  }

  return (
    <li className="group flex items-center gap-3 py-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'not completed' : 'completed'}`}
        onClick={() => onToggle(todo.id)}
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          todo.completed
            ? 'border-foreground bg-foreground text-background'
            : 'border-muted-foreground/40 hover:border-foreground',
        )}
      >
        {todo.completed && <Check className="size-3" strokeWidth={3} aria-hidden="true" />}
      </button>

      {isEditing ? (
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          aria-label="Edit task"
          className="flex-1 border-b border-foreground bg-transparent text-base text-foreground focus:outline-none"
        />
      ) : (
        <span
          onDoubleClick={() => {
            setDraft(todo.title)
            setIsEditing(true)
          }}
          className={cn(
            'flex-1 cursor-default select-none text-base transition-colors',
            todo.completed ? 'text-muted-foreground line-through' : 'text-foreground',
          )}
        >
          {todo.title}
        </span>
      )}

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
        className="flex size-7 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100 max-sm:opacity-100"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </li>
  )
}
