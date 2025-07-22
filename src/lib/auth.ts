import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'romantic-auth-session'

export interface SessionData {
  authenticated: boolean
  timestamp: number
}

export function createSession(): string {
  const sessionData: SessionData = {
    authenticated: true,
    timestamp: Date.now()
  }
  
  return jwt.sign(sessionData, JWT_SECRET, { expiresIn: '24h' })
}

export function verifySession(token: string): SessionData | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionData
    return decoded
  } catch {
    return null
  }
}

export async function getSessionFromCookies(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!sessionToken) {
    return null
  }
  
  return verifySession(sessionToken.value)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSessionFromCookies()
  return session?.authenticated === true
}