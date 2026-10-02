'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('klipss-user')

    if (!storedUser) {
      return
    }

    try {
      const user = JSON.parse(storedUser)

      if (user.id !== undefined && user.id !== null) {
        router.replace('/dashboard')
      }
    } catch (error) {
      console.error('Could not read stored user:', error)
    }
  }, [router])

  return null
}