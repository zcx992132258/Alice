import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req })
  const isAuthenticated = !!token
  if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated)
    return NextResponse.redirect(new URL('/', req.url))

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
    },
  })

  return authMiddleware(req, event)
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
