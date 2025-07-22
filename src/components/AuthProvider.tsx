'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import LoginPage from './LoginPage'

interface AuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Public routes that don't require authentication
  const publicRoutes = ['/login']
  const isPublicRoute = publicRoutes.includes(pathname)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isPublicRoute) {
        // Show login modal immediately for protected routes
        setShowLogin(true)
      } else if (isAuthenticated && pathname === '/login') {
        // If logged in and on login page, redirect to home
        router.push('/')
      } else if (isAuthenticated) {
        // User is logged in, hide login modal
        setShowLogin(false)
      }
    }
  }, [isAuthenticated, isLoading, isPublicRoute, pathname, router])

  const handleLoginSuccess = () => {
    setShowLogin(false)
    // Redirect to home page after successful login
    if (pathname === '/login') {
      router.push('/')
    }
  }

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen soft-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="romantic-body text-secondary">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Show login modal for protected routes when not authenticated
  if (showLogin && !isAuthenticated && !isPublicRoute) {
    return <LoginPage onSuccess={handleLoginSuccess} />
  }

  // Show login page for /login route
  if (pathname === '/login' && !isAuthenticated) {
    return <LoginPage onSuccess={handleLoginSuccess} />
  }

  // Show protected content for authenticated users
  return <>{children}</>
}