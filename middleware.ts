import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'romantic-auth-session'

// Protected routes that require authentication
const protectedRoutes = [
  '/',
  '/hikayemiz',
  '/galeri',
  '/ilk-karsilasma'
]

// Public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/api/auth'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // Allow static files, Next.js internals, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') ||
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }
  
  // All other routes are protected by default
  // Get session token from cookies
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)
  
  if (!sessionToken) {
    // No session token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  try {
    // Verify the session token
    jwt.verify(sessionToken.value, JWT_SECRET)
    // Token is valid, allow access
    return NextResponse.next()
  } catch (error) {
    // Invalid token, redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url))
    // Clear the invalid cookie
    response.cookies.delete(SESSION_COOKIE_NAME)
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}