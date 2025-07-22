'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Lock, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

// Generate deterministic "random" values based on index
const getDeterministicValue = (index: number, seed: number = 1) => {
  const x = Math.sin(index * seed) * 10000
  return x - Math.floor(x)
}

interface LoginPageProps {
  onSuccess?: () => void
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const success = await login(password)
      
      if (success) {
        // Small delay to ensure state is updated
        setTimeout(() => {
          // Call onSuccess callback if provided (for modal mode)
          if (onSuccess) {
            onSuccess()
          } else {
            // Redirect to home page
            router.push('/')
            router.refresh()
          }
        }, 100)
      } else {
        setError('Yanlış şifre! ( Yıldönümümüz askım )')
      }
    } catch {
      setError('Hata oluştu askım lütfen tekrar dene.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen soft-bg flex items-center justify-center p-4">
      {/* Background Hearts Animation - Client Only */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const initialX = getDeterministicValue(i, 1.5) * 1200
            const animateX = (getDeterministicValue(i, 2.3) - 0.5) * 200
            const duration = 8 + getDeterministicValue(i, 3.1) * 4

            return (
              <motion.div
                key={i}
                className="absolute text-pink-300/20"
                initial={{
                  x: initialX,
                  y: 850,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  y: -100,
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                  x: `+=${animateX}`
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm mx-auto"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-romantic-cream p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full sunset-bg mb-4"
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="romantic-heading text-2xl md:text-3xl font-bold text-primary mb-2"
            >
              Özel Giriş
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="romantic-body text-sm text-secondary leading-relaxed px-2"
            >
              Sadece Kalbimdekiler Girebilir
            </motion.p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-romantic-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-romantic-pink focus:border-transparent transition-all duration-300 bg-white/80 text-primary placeholder-muted"
                  placeholder="Şifreyi giriniz..."
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-secondary transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-lg bg-red-50 border border-red-200"
              >
                <p className="text-red-600 text-sm text-center">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !password.trim()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sunset-bg text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Giriş yapılıyor...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Giriş Yap</span>
                </div>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-muted text-sm">
              Sitede ufak tefek sorunlar olabilir, mazur gör kalbimin efendisi.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}