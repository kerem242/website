import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'

export const dynamic = 'force-static'

const SESSION_COOKIE_NAME = 'romantic-auth-session'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Hardcoded password for static deployment
    const correctPassword = '1503'
    
    // Check if the provided password matches
    if (password === correctPassword) {
      // Create session token
      const sessionToken = createSession()
      
      // Create response with success
      const response = NextResponse.json({ success: true })
      
      // Set session cookie
      response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      })
      
      return response
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  
  // Clear the session cookie
  response.cookies.delete(SESSION_COOKIE_NAME)
  
  return response
}