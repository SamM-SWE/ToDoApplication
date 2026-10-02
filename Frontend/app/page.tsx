import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { buttonVariants } from '@/components/ui/button'
import { LandingPreview } from '@/components/landing-preview'
import { LandingFeatures } from '@/components/landing-features'
import { AuthRedirect } from '@/components/auth-redirect'

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">

      {/* Checks if user is already logged in */}
      <AuthRedirect />

      <header className="px-6 py-6">

        <nav
          className="mx-auto flex w-full max-w-5xl items-center justify-between"
          aria-label="Main"
        >

          <BrandMark />

          <div className="flex items-center gap-2">

            <Link
              href="/login"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              Log in
            </Link>

            <Link
              href="/login?mode=signup"
              className={buttonVariants({
                size: 'sm',
              })}
            >
              Get started
            </Link>

          </div>

        </nav>

      </header>


      <main className="flex-1 px-6">

        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 pb-16 pt-16 text-center sm:pt-24">

          <p className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            A calm place for your tasks
          </p>


          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Focus on what matters today.
          </h1>


          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            A minimal to-do list that keeps each day simple.
            Plan ahead, jump to any date, and clear your list
            without the clutter.
          </p>


          <div className="flex flex-col items-center gap-3 sm:flex-row">

            <Link
              href="/login?mode=signup"
              className={buttonVariants({
                size: 'lg',
                className: 'px-4',
              })}
            >
              Start for free

              <ArrowRight aria-hidden="true" />
            </Link>


            <Link
              href="/login"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
                className: 'px-4',
              })}
            >
              I have an account
            </Link>

          </div>

        </section>


        <LandingPreview />

        <LandingFeatures />

      </main>


      <footer className="border-t border-border px-6 py-8">

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">

          <BrandMark />

          <p>
            © 2026 Klipss. Made for quiet productivity.
          </p>

        </div>

      </footer>

    </div>
  )
}