'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Menu, X, Camera, Clock, BookOpen, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const navigationItems = [
  { name: 'Ana Sayfa', href: '/', icon: Heart },
  { name: 'Galeri', href: '/galeri', icon: Camera },
  { name: 'Anılarımız', href: '/hikayemiz', icon: Clock },
  { name: 'İyi Ki Varsın', href: '/ilk-karsilasma', icon: BookOpen },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Hide header on login page
  if (pathname === '/login') {
    return null
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-pink-500"
              >
                <Heart className="w-8 h-8 fill-current" />
              </motion.div>
              <span className="romantic-heading text-xl font-bold text-pink-600">
                Çağla & Kerem
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300",
                    "text-amber-700 hover:text-pink-600 hover:bg-pink-50",
                    "group relative overflow-hidden"
                  )}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-4 h-4" />
                  </motion.div>
                  <span className="romantic-body font-medium">{item.name}</span>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-200/50 to-amber-200/50 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Logout Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navigationItems.length * 0.1 + 0.3 }}
              onClick={handleLogout}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300",
                "text-red-600 hover:text-red-700 hover:bg-red-50",
                "group relative overflow-hidden"
              )}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <LogOut className="w-4 h-4" />
              </motion.div>
              <span className="romantic-body font-medium">Çıkış</span>
              
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-200/50 to-red-300/50 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-pink-200/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                      "text-amber-700 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-amber-50",
                      "group"
                    )}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="romantic-body font-medium text-lg">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Logout Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigationItems.length * 0.1 }}
              >
                <button
                  onClick={async () => {
                    setIsMenuOpen(false)
                    await handleLogout()
                  }}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 w-full",
                    "text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100",
                    "group"
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LogOut className="w-5 h-5" />
                  </motion.div>
                  <span className="romantic-body font-medium text-lg">Çıkış</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hearts decoration */}
      {isClient && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                scale: 0
              }}
              animate={{
                y: -100,
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.header>
  )
}