import { cookies } from 'next/headers'
import { redirect, usePathname } from 'next/navigation'

export function UserAuthChecker({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
