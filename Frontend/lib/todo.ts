export type Todo = {
  id: string
  title: string
  completed: boolean
  date?: string
}

export type Filter = 'all' | 'active' | 'completed'

export const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export const INITIAL_TODOS: Todo[] = [
  { id: '1', title: 'Review pull requests', completed: false },
  { id: '2', title: 'Plan the week ahead', completed: false },
  { id: '3', title: 'Morning run', completed: true },
]
