'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check localStorage for login status
    const loginStatus = localStorage.getItem('isLoggedIn')
    const loginTimestamp = localStorage.getItem('loginTimestamp')
    
    if (loginStatus === 'true' && loginTimestamp) {
      // Check if login is still valid (24 hours)
      const now = Date.now()
      const loginTime = parseInt(loginTimestamp)
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (now - loginTime < twentyFourHours) {
        setIsLoggedIn(true)
      } else {
        // Login expired, clear localStorage
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('loginTimestamp')
        setIsLoggedIn(false)
      }
    } else {
      setIsLoggedIn(false)
    }
    
    setIsLoading(false)
  }, [])

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        // Set login status in localStorage
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('loginTimestamp', Date.now().toString())
        setIsLoggedIn(true)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      // Clear server-side session
      await fetch('/api/auth', {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear client-side storage
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('loginTimestamp')
      setIsLoggedIn(false)
      router.push('/login')
    }
  }

  const redirectToLogin = () => {
    router.push('/login')
  }

  return {
    isLoggedIn,
    isLoading,
    login,
    logout,
    redirectToLogin
  }
}