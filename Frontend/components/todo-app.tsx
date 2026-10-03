'use client'

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react'

import { DateNavigator } from '@/components/date-navigator'
import { TodoInput } from '@/components/todo-input'
import { TodoItem } from '@/components/todo-item'
import { TodoFooter } from '@/components/todo-footer'

import { toDateKey } from '@/lib/date'
import { type Filter, type Todo } from '@/lib/todo'

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'Nothing planned for this day.',
  active: 'All caught up.',
  completed: 'No completed tasks yet.',
}

const subscribe = () => () => {}

const getTodayKey = () => toDateKey(new Date())

const getServerTodayKey = () => ''

// ==================================================
// API CONFIGURATION
// ==================================================

// TEMPORARY: local testing only.
// Use the SAME Basic Auth credentials that work in Postman.
const BASIC_AUTH_USERNAME =
  process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME!

const BASIC_AUTH_PASSWORD =
  process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD!

const API_URL =
  'https://todoapplicationbackend-befs.onrender.com/api'

const AUTH_HEADERS = {
  Authorization:
    'Basic ' +
    btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`),

  'Content-Type': 'application/json',
}

type LoggedInUser = {
  id: number
  name: string
  email: string
}

export function TodoApp() {
  const todayKey = useSyncExternalStore(
    subscribe,
    getTodayKey,
    getServerTodayKey
  )

  const [todos, setTodos] = useState<Todo[]>([])

  const [filter, setFilter] =
    useState<Filter>('all')

  const [pickedKey, setPickedKey] =
    useState<string | null>(null)

  const [currentUser, setCurrentUser] =
    useState<LoggedInUser | null>(null)

  const selectedKey =
    pickedKey ?? todayKey

  const dateOf = (todo: Todo) =>
    todo.date ?? todayKey

  // ==================================================
  // GET LOGGED-IN USER
  // ==================================================

  useEffect(() => {
    const storedUser =
      localStorage.getItem('klipss-user')

    console.log(
      'LOCAL STORAGE USER:',
      storedUser
    )

    if (!storedUser) {
      console.error(
        'No logged-in user found.'
      )

      return
    }

    try {
      const parsedUser =
        JSON.parse(storedUser)

      console.log(
        'PARSED USER:',
        parsedUser
      )

      if (
        parsedUser.id === undefined ||
        parsedUser.id === null
      ) {
        console.error(
          'User ID is missing from localStorage.'
        )

        return
      }

      const user: LoggedInUser = {
        id: Number(parsedUser.id),
        name: String(parsedUser.name ?? ''),
        email: String(parsedUser.email ?? ''),
      }

      console.log(
        'CURRENT USER:',
        user
      )

      console.log(
        'CURRENT USER ID:',
        user.id
      )

      setCurrentUser(user)
    } catch (error) {
      console.error(
        'Failed to read user:',
        error
      )
    }
  }, [])

  // ==================================================
  // GET CURRENT USER'S NOTES
  // ==================================================

  useEffect(() => {
    if (!currentUser) {
      return
    }

    async function getTodos() {
      try {
        console.log(
          'Getting notes for user:',
          currentUser!.id
        )

        const response = await fetch(
          `${API_URL}/getNotes/${currentUser!.id}`,
          {
            method: 'GET',
            headers: AUTH_HEADERS,
          }
        )

        console.log(
          'GET NOTES STATUS:',
          response.status
        )

        if (!response.ok) {
          const errorText =
            await response.text()

          console.error(
            'GET NOTES FAILED:',
            response.status,
            errorText
          )

          return
        }

        const data =
          await response.json()

        console.log(
          'NOTES FROM SPRING:',
          data
        )

        const convertedTodos: Todo[] =
          data.map((task: any) => ({
            id: String(task.id),
            title: task.note,
            date: task.dateAdded,
            completed: task.completed,
          }))

        setTodos(convertedTodos)
      } catch (error) {
        console.error(
          'Failed to get notes:',
          error
        )
      }
    }

    getTodos()
  }, [currentUser])

  // ==================================================
  // ADD NOTE
  // ==================================================

  async function addTodo(
    noteText: string
  ) {
    if (!currentUser) {
      console.error(
        'Cannot add note: no user loaded.'
      )

      return
    }

    console.log(
      'ADDING NOTE FOR USER:',
      currentUser.id
    )

    const newNoteBody = {
      note: noteText,
      userId: currentUser.id,
      completed: false,
      dateAdded: selectedKey,
      dateDue: null,
    }

    console.log(
      'POST BODY:',
      newNoteBody
    )

    try {
      const response = await fetch(
        `${API_URL}/addNote`,
        {
          method: 'POST',

          headers: AUTH_HEADERS,

          body: JSON.stringify(
            newNoteBody
          ),
        }
      )

      console.log(
        'ADD NOTE STATUS:',
        response.status
      )

      if (!response.ok) {
        const errorText =
          await response.text()

        console.error(
          'ADD NOTE FAILED:',
          response.status,
          errorText
        )

        return
      }

      const createdTask =
        await response.json()

      console.log(
        'CREATED NOTE:',
        createdTask
      )

      console.log(
        'CREATED NOTE USER ID:',
        createdTask.userId
      )

      const newTodo: Todo = {
        id: String(createdTask.id),

        title:
          createdTask.note,

        date:
          createdTask.dateAdded ??
          selectedKey,

        completed:
          createdTask.completed,
      }

      setTodos(previous => [
        ...previous,
        newTodo,
      ])
    } catch (error) {
      console.error(
        'Failed to create note:',
        error
      )
    }
  }

  // ==================================================
  // UPDATE NOTE
  // ==================================================

  async function updateTodo(
    todo: Todo
  ) {
    if (!currentUser) {
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/changeNote/${todo.id}`,
        {
          method: 'PUT',

          headers: AUTH_HEADERS,

          body: JSON.stringify({
            note: todo.title,
            dateAdded: todo.date,
            completed: todo.completed,
            userId: currentUser.id,
          }),
        }
      )

      console.log(
        'UPDATE NOTE STATUS:',
        response.status
      )

      if (!response.ok) {
        const errorText =
          await response.text()

        console.error(
          'UPDATE NOTE FAILED:',
          response.status,
          errorText
        )

        return
      }

      const updatedTask =
        await response.json()

      console.log(
        'UPDATED NOTE:',
        updatedTask
      )
    } catch (error) {
      console.error(
        'Failed to update note:',
        error
      )
    }
  }

  // ==================================================
  // DELETE NOTE
  // ==================================================

  async function deleteTodo(
    id: string
  ) {
    try {
      const response = await fetch(
        `${API_URL}/deleteNote/${id}`,
        {
          method: 'DELETE',
          headers: AUTH_HEADERS,
        }
      )

      console.log(
        'DELETE NOTE STATUS:',
        response.status
      )

      if (!response.ok) {
        const errorText =
          await response.text()

        console.error(
          'DELETE NOTE FAILED:',
          response.status,
          errorText
        )

        return
      }

      setTodos(previous =>
        previous.filter(
          todo =>
            todo.id !== id
        )
      )
    } catch (error) {
      console.error(
        'Failed to delete note:',
        error
      )
    }
  }

  // ==================================================
  // FILTERING
  // ==================================================

  const dayTodos =
    todos.filter(
      todo =>
        dateOf(todo) ===
        selectedKey
    )

  const activeCount =
    dayTodos.filter(
      todo =>
        !todo.completed
    ).length

  const completedCount =
    dayTodos.length -
    activeCount

  const visibleTodos =
    dayTodos.filter(
      todo =>
        filter === 'all'
          ? true
          : filter === 'active'
            ? !todo.completed
            : todo.completed
    )

  const daysWithTasks =
    new Set(
      todos.map(dateOf)
    )

  // ==================================================
  // TOGGLE
  // ==================================================

  function toggleTodo(
    id: string
  ) {
    const todo =
      todos.find(
        todo =>
          todo.id === id
      )

    if (!todo) {
      return
    }

    const updatedTodo = {
      ...todo,

      completed:
        !todo.completed,
    }

    setTodos(previous =>
      previous.map(
        todo =>
          todo.id === id
            ? updatedTodo
            : todo
      )
    )

    updateTodo(updatedTodo)
  }

  // ==================================================
  // RENAME
  // ==================================================

  function renameTodo(
    id: string,
    title: string
  ) {
    const todo =
      todos.find(
        todo =>
          todo.id === id
      )

    if (!todo) {
      return
    }

    const updatedTodo = {
      ...todo,
      title,
    }

    setTodos(previous =>
      previous.map(
        todo =>
          todo.id === id
            ? updatedTodo
            : todo
      )
    )

    updateTodo(updatedTodo)
  }

  // ==================================================
  // CLEAR COMPLETED
  // ==================================================

  async function clearCompleted() {
    const completedTodos =
      todos.filter(
        todo =>
          todo.completed &&
          dateOf(todo) ===
            selectedKey
      )

    for (
      const todo
      of completedTodos
    ) {
      await deleteTodo(
        todo.id
      )
    }
  }

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="flex flex-col gap-10">

      <DateNavigator
        todayKey={
          todayKey
        }

        selectedKey={
          selectedKey
        }

        daysWithTasks={
          daysWithTasks
        }

        onSelect={(key) =>
          setPickedKey(
            key === todayKey
              ? null
              : key
          )
        }
      />

      <section
        aria-label="Task list"
        className="flex flex-col gap-4"
      >

        <TodoInput
          onAdd={addTodo}
        />

        {visibleTodos.length > 0 ? (
          <ul className="divide-y divide-border">

            {visibleTodos.map(
              todo => (
                <TodoItem
                  key={
                    todo.id
                  }

                  todo={
                    todo
                  }

                  onToggle={
                    toggleTodo
                  }

                  onDelete={
                    deleteTodo
                  }

                  onRename={
                    renameTodo
                  }
                />
              )
            )}

          </ul>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {
              EMPTY_MESSAGES[
                filter
              ]
            }
          </p>
        )}

        {dayTodos.length > 0 && (
          <TodoFooter
            activeCount={
              activeCount
            }

            completedCount={
              completedCount
            }

            filter={
              filter
            }

            onFilterChange={
              setFilter
            }

            onClearCompleted={
              clearCompleted
            }
          />
        )}

      </section>

    </div>
  )
}