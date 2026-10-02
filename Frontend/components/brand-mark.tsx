import Link from 'next/link'
import { Check } from 'lucide-react'

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2 text-foreground" aria-label="Klipss home">
      <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold tracking-tight">Klipss</span>
    </Link>
  )
}
