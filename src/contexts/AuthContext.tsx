'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (password: string) => Promise<boolean>
  logout: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check authentication status on mount and when cookies change
  useEffect(() => {
    checkAuthStatus()
    
    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-state-change') {
        checkAuthStatus()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const checkAuthStatus = async () => {
    try {
      // For static export, we'll check if we have a session cookie directly
      // by trying to access document.cookie (client-side only)
      if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';')
        const sessionCookie = cookies.find(cookie => 
          cookie.trim().startsWith('romantic-auth-session=')
        )
        
        if (sessionCookie) {
          // Try to verify with server if possible, otherwise assume valid
          try {
            const response = await fetch('/api/auth/verify', {
              method: 'GET',
              credentials: 'include'
            })
            
            if (response.ok) {
              setIsAuthenticated(true)
            } else {
              setIsAuthenticated(false)
            }
          } catch {
            // If verification endpoint fails (static export), assume cookie is valid
            setIsAuthenticated(true)
          }
        } else {
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
    } catch {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (password: string): Promise<boolean> => {
    setError(null)
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        // Trigger storage event for multi-tab sync
        localStorage.setItem('auth-state-change', Date.now().toString())
        // Force router refresh to update middleware
        router.refresh()
        return true
      } else {
        setError('Yanlış şifre! Tekrar deneyin.')
        return false
      }
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      // Call server logout endpoint
      await fetch('/api/auth', {
        method: 'DELETE',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always update client state
      setIsAuthenticated(false)
      setError(null)
      // Trigger storage event for multi-tab sync
      localStorage.setItem('auth-state-change', Date.now().toString())
      // Force router refresh and redirect
      router.push('/login')
      router.refresh()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="romantic-body text-secondary">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}