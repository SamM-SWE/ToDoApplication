'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type Mode = 'login' | 'signup'

const inputClass =
  'h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40'

export function AuthForm({ initialMode }: { initialMode: Mode }) {
  const router = useRouter()

  const [mode, setMode] = useState<Mode>(initialMode)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const isSignup = mode === 'signup'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setPending(true)
    setError('')

    const formData = new FormData(event.currentTarget)

    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')

    const endpoint = isSignup
      ? 'https://todoapplicationbackend-befs.onrender.com/api/userservices/register'
      : 'https://todoapplicationbackend-befs.onrender.com/api/userservices/login'

    const requestBody = isSignup
      ? {
          name,
          email,
          password,
        }
      : {
          email,
          password,
        }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa('user:root'),
        },

        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid email or password.')
        } else if (response.status === 400) {
          setError('Please check the information you entered.')
        } else if (response.status === 500) {
          setError('The server encountered an error.')
        } else {
          setError('Something went wrong. Please try again.')
        }

        return
      }

      const user = await response.json()

      console.log('USER RETURNED FROM SPRING:', user)
      console.log('USER ID RETURNED FROM SPRING:', user.id)

      // Make sure Spring actually returned an ID
      if (user.id === undefined || user.id === null) {
        console.error('Spring response does not contain an ID.')

        setError('Login succeeded, but user ID was not returned.')

        return
      }

      const userData = {
        id: Number(user.id),
        name: String(user.name ?? ''),
        email: String(user.email ?? ''),
      }

      // Remove any old stored user
      localStorage.removeItem('klipss-user')

      // Store the NEW user including their ID
      localStorage.setItem(
        'klipss-user',
        JSON.stringify(userData)
      )

      // Verify it was stored
      console.log(
        'USER SAVED TO LOCAL STORAGE:',
        localStorage.getItem('klipss-user')
      )

      router.push('/dashboard')
    } catch (error) {
      console.error('Request failed:', error)

      setError('Unable to connect to the server.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {isSignup
            ? 'Create your account'
            : 'Welcome back'}
        </h1>

        <p className="text-sm text-muted-foreground">
          {isSignup
            ? 'Start planning your days in seconds.'
            : 'Log in to see your tasks for today.'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        {isSignup && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Ada Lovelace"
              className={inputClass}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              isSignup
                ? 'new-password'
                : 'current-password'
            }
            required
            minLength={1}
            placeholder="Password"
            className={inputClass}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full"
          disabled={pending}
        >
          {pending
            ? 'One moment...'
            : isSignup
              ? 'Create account'
              : 'Log in'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {isSignup
          ? 'Already have an account?'
          : 'New to Klipss?'}

        {' '}

        <button
          type="button"
          onClick={() => {
            setMode(
              isSignup
                ? 'login'
                : 'signup'
            )

            setError('')
          }}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {isSignup
            ? 'Log in'
            : 'Create an account'}
        </button>
      </p>

    </div>
  )
}