'use client'

import { useRouter } from 'next/navigation'

import { TodoApp } from '@/components/todo-app'
import { BrandMark } from '@/components/brand-mark'


export default function TodayPage() {

  const router = useRouter()


  // ============================================
  // LOG OUT
  // ============================================

  function handleLogout() {

    console.log(
      'Logging user out...'
    )


    // ============================================
    // THIS IS THE ONLY ACTION THAT LOGS USER OUT
    // ============================================

    localStorage.removeItem(
      'klipss-user'
    )


    // ============================================
    // RETURN TO LOGIN
    // ============================================

    router.replace('/login')

  }


  return (

    <main className="min-h-dvh bg-background px-6 py-10 sm:py-16">

      <div className="mx-auto flex w-full max-w-lg flex-col gap-10">


        {/* ======================================
            NAVIGATION
        ====================================== */}

        <nav
          className="flex items-center justify-between"
          aria-label="App"
        >

          <BrandMark />


          <button

            type="button"

            onClick={
              handleLogout
            }

            className="text-sm text-muted-foreground transition-colors hover:text-foreground"

          >

            Sign out

          </button>


        </nav>



        {/* ======================================
            TODO APPLICATION
        ====================================== */}

        <TodoApp />



        <p className="text-center text-xs text-muted-foreground">

          Double-click a task to edit it

        </p>


      </div>

    </main>

  )
}