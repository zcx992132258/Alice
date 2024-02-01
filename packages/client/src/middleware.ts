import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const userStoreCookie = req.cookies.get('userStore')?.value

  const user = userStoreCookie?.length ? JSON.parse(JSON.parse(userStoreCookie)) : null
  const isGoLogin = req.nextUrl.pathname.startsWith('/login')
  if (user?.state) {
    if (user?.state.token) {
      if (isGoLogin)
        return NextResponse.redirect(new URL('/', req.url))
    }
  }
  if (!user?.state.token && !isGoLogin)
    return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
