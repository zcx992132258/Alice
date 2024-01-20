import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const userStoreCookie = req.cookies.get('userStore')?.value
  const user = userStoreCookie?.length ? JSON.parse(userStoreCookie) : null
  const isGoLogin = req.nextUrl.pathname.startsWith('/login')
  if (user) {
    if (user.token) {
      if (isGoLogin)
        return NextResponse.redirect(new URL('/', req.url))
    }
  }
  if (!isGoLogin && !user)
    return NextResponse.redirect(new URL('/login', req.url))
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
