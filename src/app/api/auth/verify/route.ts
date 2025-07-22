import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'romantic-auth-session'

export const dynamic = 'force-static'

export async function GET(request: NextRequest) {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)
    
    if (!sessionToken) {
      return NextResponse.json(
        { authenticated: false, message: 'No session token' },
        { status: 401 }
      )
    }
    
    // Verify the session token
    const sessionData = verifySession(sessionToken.value)
    
    if (sessionData && sessionData.authenticated) {
      return NextResponse.json({ authenticated: true })
    } else {
      return NextResponse.json(
        { authenticated: false, message: 'Invalid session' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { authenticated: false, message: 'Verification failed' },
      { status: 500 }
    )
  }
}