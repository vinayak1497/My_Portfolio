import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_LOGIN = '/admin/login'
const ADMIN_ROOT = '/admin'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith(ADMIN_ROOT)
  const isLoginPage = pathname === ADMIN_LOGIN
  const isApiRoute = pathname.startsWith('/api/admin')

  if (!isAdminRoute && !isApiRoute) {
    return NextResponse.next()
  }

  if (isLoginPage) {
    return NextResponse.next()
  }

  const session = request.cookies.get('admin_session')

  if (!session || session.value !== 'authenticated') {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
