import { NextRequest, NextResponse } from 'next/server'

const loginList = ['/login', '/register']
export default async function middleware(req: NextRequest) {
  const userStoreCookie = req.cookies.get('userStore')?.value

  const user = userStoreCookie?.length ? JSON.parse(JSON.parse(userStoreCookie)) : null
  const isGoLogin = loginList.includes(req.nextUrl.pathname)
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
