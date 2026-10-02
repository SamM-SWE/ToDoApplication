'use client'

import {
  useEffect,
  useState
} from 'react'

import { useRouter } from 'next/navigation'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const [authenticated, setAuthenticated] =
    useState(false)


  useEffect(() => {

    const storedUser =
      localStorage.getItem('klipss-user')


    // ============================================
    // NO USER = NOT LOGGED IN
    // ============================================

    if (!storedUser) {

      console.log(
        'No logged-in user. Redirecting...'
      )

      router.replace('/login')

      return
    }


    try {

      const user =
        JSON.parse(storedUser)


      // ============================================
      // MAKE SURE USER HAS AN ID
      // ============================================

      if (
        user.id === undefined ||
        user.id === null
      ) {

        console.log(
          'Invalid stored user.'
        )

        router.replace('/login')

        return
      }


      // ============================================
      // USER IS LOGGED IN
      // ============================================

      console.log(
        'Authenticated user:',
        user
      )


      setAuthenticated(true)


    } catch (error) {

      console.error(
        'Could not read logged-in user:',
        error
      )


      router.replace('/login')

    }

  }, [router])


  // ============================================
  // DON'T SHOW DASHBOARD UNTIL CHECK FINISHES
  // ============================================

  if (!authenticated) {

    return (
      <div className="min-h-dvh bg-background" />
    )

  }


  // ============================================
  // USER IS AUTHENTICATED
  // ============================================

  return (
    <>
      {children}
    </>
  )
}