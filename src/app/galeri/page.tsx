'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ChevronLeft, ChevronRight, Camera, Loader2 } from 'lucide-react'
// import Image from 'next/image' // Removed for static export compatibility
import { type GalleryImage } from '@/lib/getImages'

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({})
  const [photos, setPhotos] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  // Load photos with captions from configuration
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true)
        // Try to fetch from API first
        const response = await fetch('/api/images')
        if (response.ok) {
          const data = await response.json()
          setPhotos(data.images || [])
        } else {
          // Use the existing photos with editable captions
          setPhotos([
            {
              id: 1,
              src: '/images/ilk fotomuz.jpg',
              alt: 'İlk fotoğrafımız',
              title: 'İlk Fotoğrafımız',
              description: 'Birlikte çektiğimiz ilk fotoğraf. O anki mutluluğumuz gözlerimizden okunuyor.'
            },
            {
              id: 2,
              src: '/images/ilk defa kar yağdı.jpg',
              alt: 'İlk defa kar yağdı',
              title: 'İlk Kar Yağışı',
              description: 'Birlikte yaşadığımız ilk kar yağışı. Soğukta bile kalbimiz sıcacıktı.'
            },
            {
              id: 3,
              src: '/images/taktığım ilk toka.jpg',
              alt: 'Taktığım ilk toka',
              title: 'İlk Hediyem',
              description: 'Sana aldığım ilk hediye olan toka. Saçlarında ne kadar güzel duruyordu.'
            },
            {
              id: 4,
              src: '/images/uçağa bindik.jpg',
              alt: 'Uçağa bindik',
              title: 'İlk Seyahatimiz',
              description: 'Birlikte yaptığımız ilk seyahat. Heyecanımız ve mutluluğumuz tavanlardaydı.'
            }
          ])
        }
      } catch (error) {
        console.error('Error loading photos:', error)
        // Set fallback photos
        setPhotos([
          {
            id: 1,
            src: '/images/ilk fotomuz.jpg',
            alt: 'İlk fotoğrafımız',
            title: 'İlk Fotoğrafımız',
            description: 'Birlikte çektiğimiz ilk fotoğraf. O anki mutluluğumuz gözlerimizden okunuyor.'
          },
          {
            id: 2,
            src: '/images/ilk defa kar yağdı.jpg',
            alt: 'İlk defa kar yağdı',
            title: 'İlk Kar Yağışı',
            description: 'Birlikte yaşadığımız ilk kar yağışı. Soğukta bile kalbimiz sıcacıktı.'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPhotos()
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const openLightbox = (photoId: number) => {
    const index = photos.findIndex((photo: GalleryImage) => photo.id === photoId)
    setCurrentIndex(index)
    setSelectedPhoto(photoId)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const nextIndex = (currentIndex + 1) % photos.length
    setCurrentIndex(nextIndex)
    setSelectedPhoto(photos[nextIndex].id)
  }

  const prevPhoto = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    setCurrentIndex(prevIndex)
    setSelectedPhoto(photos[prevIndex].id)
  }

  const handleImageError = (photoId: number) => {
    setImageError(prev => ({ ...prev, [photoId]: true }))
  }

  return (
    <div className="min-h-screen soft-bg">
      {/* Header Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="romantic-heading text-4xl md:text-6xl font-bold mb-6 text-primary">
              Anılarımızın Galerisi
            </h1>
            <p className="romantic-body text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Hayatımdaki en değerli anılar her zaman seninleydi bitanem. Ne kadar zaman geçerse geçsin asla unutmayacağım ve sana da unutturmayacağım.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
                <p className="romantic-body text-secondary">Fotoğraflar yükleniyor...</p>
              </div>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-pink-400 mx-auto mb-4 opacity-50" />
              <h3 className="romantic-subheading text-xl font-semibold mb-2 text-primary">
                Henüz fotoğraf yok
              </h3>
              <p className="romantic-body text-secondary">
                Fotoğraflar /public/images klasörüne eklendiğinde burada görünecek.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo: GalleryImage, index: number) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(photo.id)}
                >
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {/* Photo Container */}
                    <div className="relative aspect-square overflow-hidden">
                      {!imageError[photo.id] ? (
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={() => handleImageError(photo.id)}
                        />
                      ) : (
                        // Fallback placeholder when image fails to load
                        <div className="w-full h-full bg-gradient-to-br from-pink-200 via-amber-200 to-rose-200 flex items-center justify-center">
                          <div className="text-center p-6">
                            <Camera className="w-12 h-12 text-pink-400 mx-auto mb-3 opacity-60" />
                            <p className="text-pink-600 font-medium text-sm">Fotoğraf Yüklenecek</p>
                            <p className="text-xs text-pink-500 mt-1">{photo.title}</p>
                          </div>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/30 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="bg-white/90 rounded-full p-3"
                        >
                          <Heart className="w-6 h-6 text-pink-500" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Photo Info */}
                    <div className="p-4">
                      <h3 className="romantic-subheading text-lg font-semibold mb-2 text-primary">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-60 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation buttons */}
            {photos.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    prevPhoto()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-60 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    nextPhoto()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-60 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </>
            )}

            {/* Photo content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Large Photo */}
              <div className="relative aspect-video bg-gray-100">
                {!imageError[photos[currentIndex]?.id] ? (
                  <img
                    src={photos[currentIndex]?.src || ''}
                    alt={photos[currentIndex]?.alt || ''}
                    className="w-full h-full object-contain"
                    onError={() => handleImageError(photos[currentIndex]?.id)}
                  />
                ) : (
                  // Fallback for lightbox
                  <div className="w-full h-full bg-gradient-to-br from-pink-200 via-amber-200 to-rose-200 flex items-center justify-center">
                    <div className="text-center p-12">
                      <Camera className="w-24 h-24 text-pink-400 mx-auto mb-6 opacity-50" />
                      <p className="text-pink-600 font-medium text-xl">Fotoğraf Yüklenecek</p>
                      <p className="text-pink-500 mt-2">{photos[currentIndex]?.title}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Photo details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="romantic-subheading text-2xl font-semibold mb-2 text-primary">
                      {photos[currentIndex]?.title}
                    </h3>
                    <p className="romantic-body text-secondary">
                      {photos[currentIndex]?.description}
                    </p>
                  </div>
                </div>

                {/* Photo counter */}
                <div className="flex justify-center">
                  <span className="romantic-body text-sm text-muted">
                    {currentIndex + 1} / {photos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hearts decoration */}
      {isClient && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/20"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                scale: 0
              }}
              animate={{
                y: -100,
                scale: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}