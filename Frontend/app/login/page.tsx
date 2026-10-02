import type { Metadata } from 'next'

import { BrandMark } from '@/components/brand-mark'
import { AuthForm } from '@/components/auth-form'
import { AuthRedirect } from '@/components/auth-redirect'


export const metadata: Metadata = {
  title: 'Log in — Klipss',
  description:
    'Log in or create an account to plan your day.',
}


export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    mode?: string
  }>
}) {

  const { mode } = await searchParams


  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-16">

      {/* Already logged in? Go to dashboard */}
      <AuthRedirect />


      <div className="flex w-full max-w-sm flex-col gap-8">

        <div className="flex justify-center">
          <BrandMark />
        </div>


        <AuthForm
          initialMode={
            mode === 'signup'
              ? 'signup'
              : 'login'
          }
        />

      </div>

    </main>
  )
}