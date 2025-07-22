'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles, Star, ArrowDown, Camera } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Generate deterministic "random" values based on index
const getDeterministicValue = (index: number, seed: number = 1) => {
  const x = Math.sin(index * seed) * 10000
  return x - Math.floor(x)
}

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-rose-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background Animation - Client Only */}
        <div className="absolute inset-0 overflow-hidden">
          {isClient && (
            <>
              {/* Floating Hearts */}
              {[...Array(15)].map((_, i) => {
                const initialX = getDeterministicValue(i, 1.5) * 1200
                const animateX = (getDeterministicValue(i, 2.3) - 0.5) * 200
                const duration = 8 + getDeterministicValue(i, 3.1) * 4

                return (
                  <motion.div
                    key={i}
                    className="absolute text-pink-300/20"
                    initial={{
                      x: initialX,
                      y: 800,
                      scale: 0,
                      rotate: 0
                    }}
                    animate={{
                      y: -100,
                      scale: [0, 1, 0.8, 1, 0],
                      rotate: [0, 180, 360],
                      x: `+=${animateX}`
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-6 h-6 fill-current" />
                  </motion.div>
                )
              })}

              {/* Sparkles */}
              {[...Array(20)].map((_, i) => {
                const initialX = getDeterministicValue(i, 4.2) * 1200
                const initialY = getDeterministicValue(i, 5.7) * 800
                const duration = 3 + getDeterministicValue(i, 6.1) * 2

                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-amber-300/30"
                    initial={{
                      x: initialX,
                      y: initialY,
                      scale: 0,
                      rotate: 0
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                )
              })}
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-16"
          >
            <motion.h1
              className="romantic-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: "linear-gradient(45deg, #FF69B4, #FFD700, #FF1493, #FFA500)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Güzel Meleğim 
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-pink-500 fill-current animate-pulse" />
                <Heart className="w-12 h-12 text-rose-500 fill-current animate-pulse" style={{ animationDelay: '0.5s' }} />
                <Heart className="w-8 h-8 text-pink-500 fill-current animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </motion.div>
          </motion.div>

          {/* Romantic Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-12"
          >
            <p className="romantic-body text-xl md:text-2xl text-amber-800 leading-relaxed mb-6 max-w-3xl mx-auto">
              “Bu site, bana olan inancını yeniden kazanmak ve seni ne kadar çok sevdiğimi hissettirebilmek için attığım ilk adım. Umarım beğenirsin kuzummm”
            </p>

          </motion.div>
        </div>
      </section>

      {/* Interactive Navigation Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-pink-50 via-amber-50 to-rose-50">
        <div className="max-w-6xl mx-auto">
          {/* Main Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Hikayelerimiz Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href="/hikayemiz" className="block">
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-2xl p-6 md:p-8 h-56 flex flex-col items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <motion.div
                      animate={{
                        backgroundPosition: ["100% 100%", "0% 0%"],
                      }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='20,0 40,30 0,30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px"
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      <motion.h3
                        className="text-4xl md:text-5xl font-bold text-white mb-3 leading-none"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(255,255,255,0.5)",
                            "0 0 30px rgba(255,255,255,0.8)",
                            "0 0 20px rgba(255,255,255,0.5)"
                          ]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Sana Olan Her Hissim
                      </motion.h3>

                      <motion.p
                        className="text-white/90 text-lg md:text-xl font-medium"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        İlk Günden Bu Yana
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Floating Sparkles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-white/25"
                        style={{
                          left: `${15 + (i % 4) * 25}%`,
                          top: `${15 + Math.floor(i / 4) * 35}%`
                        }}
                        animate={{
                          scale: [0, 1, 0.5, 1, 0],
                          rotate: [0, 180, 360],
                          opacity: [0, 1, 0.7, 1, 0]
                        }}
                        transition={{
                          duration: 4 + (i * 0.3),
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Galerimiz Card */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href="/galeri" className="block">
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 rounded-2xl p-6 md:p-8 h-56 flex flex-col items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <motion.div
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "60px 60px"
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      <motion.h3
                        className="text-4xl md:text-5xl font-bold text-white mb-3 leading-none"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(255,255,255,0.5)",
                            "0 0 30px rgba(255,255,255,0.8)",
                            "0 0 20px rgba(255,255,255,0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Galerimiz
                      </motion.h3>

                      <motion.p
                        className="text-white/90 text-lg md:text-xl font-medium"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        Birlikte çektiğimiz fotoğraflar
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Floating Camera Icons */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-white/20"
                        style={{
                          left: `${20 + (i % 3) * 30}%`,
                          top: `${20 + Math.floor(i / 3) * 40}%`
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 360],
                          y: [0, -20, 0]
                        }}
                        transition={{
                          duration: 3 + (i * 0.5),
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        <Camera className="w-5 h-5" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Text with Arrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.p
              className="romantic-body text-2xl md:text-3xl text-secondary font-medium mb-8"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Biraz daha kaydır bakalım güzellik
            </motion.p>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-8 h-8 text-accent mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Love Message Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="romantic-heading text-4xl md:text-5xl font-bold mb-8 text-amber-800">
                Seni Çok Seviyorum
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Heart,
                  title: "Sevgi",
                  description: "Bugüne kadar sana sevgimi hak ettiğin gibi gösteremediğim için özür dilerim. Bundan sonra hissettiklerimi göstermek için ne gerekiyorsa yapacağım."
                },
                {
                  icon: Star,
                  title: "Güven ve İnan",
                  description: "Bu zamana kadar güvenini ve inancını kırdım, biliyorum. Ama artık her şeyi düzeltmek ve sana layık olmak için adam gibi çabalayacağıma söz veriyorum."
                },
                {
                  icon: Sparkles,
                  title: "Geleceğimiz İçin Çaba",
                  description: "Bu adımdan sonra her şeyi bizim için, güzel geleceğimiz için yapacağım,hayalini kurduğumuz hayat için."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="text-pink-500 mb-4 flex justify-center"
                  >
                    <item.icon className="w-12 h-12" />
                  </motion.div>
                  <h3 className="romantic-subheading text-xl font-semibold mb-3 text-amber-800">
                    {item.title}
                  </h3>
                  <p className="romantic-body text-amber-700">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-pink-200 to-amber-200 rounded-3xl p-8 shadow-lg"
            >
              <p className="romantic-body text-lg md:text-xl text-amber-800 leading-relaxed italic">
                &ldquo;“Buraya bir not düşmek istiyorum. Evet, biliyorum şu an sevgili değiliz ve sana ‘sevgilim’ diye hitap etmek belki doğru olmaz ama ben içimdeki bu duygularla sana sadece Çağla diyemem. Çünkü sen benim için sadece çağla olamazsın,sen benim kalbimin sahibisin ben sana aşkım demeden duramam güzel kızım benim.”&rdquo;
              </p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6"
              >
                <Heart className="w-8 h-8 text-pink-500 fill-current mx-auto" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
