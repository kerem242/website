'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Clock, MapPin, Eye, Smile, Sparkles, ArrowDown } from 'lucide-react'
// import Image from 'next/image' // Removed for static export compatibility
import { type KarsiImage } from '@/lib/getKarsiImages'

export default function MeetingStoryPage() {
  const [karsiPhotos, setKarsiPhotos] = useState<KarsiImage[]>([])
  const [photosLoaded, setPhotosLoaded] = useState(false)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  // Fetch karsı photos on component mount
  useEffect(() => {
    const fetchKarsiPhotos = async () => {
      try {
        const response = await fetch('/api/karsi-images')
        if (response.ok) {
          const data = await response.json()
          setKarsiPhotos(data.images || [])
        }
      } catch (error) {
        console.error('Error fetching karsı photos:', error)
      } finally {
        setPhotosLoaded(true)
      }
    }

    fetchKarsiPhotos()
  }, [])

  const handleImageError = (photoId: number) => {
    setImageErrors(prev => ({ ...prev, [photoId]: true }))
  }

  // Helper function to get photo by order (1, 2, 3, 4)
  const getPhotoByOrder = (order: number) => {
    return karsiPhotos.find(photo => photo.order === order)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-rose-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/20"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
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
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="romantic-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-amber-800">
                Seni Çok Sevdiğimi Anla Diye...
            </h1>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-lg">
                <Heart className="w-16 h-16 text-pink-500 fill-current animate-pulse" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="romantic-body text-xl md:text-2xl text-amber-700 leading-relaxed mb-12"
            >
              
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col items-center"
            >
              <p className="romantic-body text-amber-600 mb-4">Aşşağı kaydır ve keyfine bak kuzum</p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-6 h-6 text-pink-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Sections */}
      <div className="relative">
        {/* Section 1: The Day */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-pink-200 via-amber-200 to-rose-200 rounded-3xl p-8 shadow-lg flex items-center justify-center aspect-square overflow-hidden">
                  {photosLoaded && getPhotoByOrder(1) && !imageErrors[1] ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden min-h-[200px]">
                      <img
                        src={getPhotoByOrder(1)!.src}
                        alt={getPhotoByOrder(1)!.alt}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={() => handleImageError(1)}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Clock className="w-24 h-24 text-pink-400 mx-auto mb-4 opacity-70" />
                      <p className="text-pink-600 font-medium text-lg">O Özel Gün</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="romantic-heading text-3xl md:text-4xl font-bold mb-6 text-amber-800">
                    Gözlerini İlk Gördüğüm An
                  </h2>
                  <p className="romantic-body text-lg text-amber-700 leading-relaxed mb-6">
                    Türkçe dersinde güya arkadakileri kaldırmak için gelmiştin ama yalan, benim için gelmiştin biliyorum.Kalemi uzattığında kafama kaldırıp gözlerine baktım ve o an utançtan ayağa kalkamamıştım bi an. 
                  </p>
                  <p className="romantic-body text-lg text-amber-700 leading-relaxed">
                    Ayağa kalktım ve gözgöze geldik ve ilk kez o kadar yakından bakmıştım gözlerine, gözlerinin içi parlıyordu minnos kızımın, çok güzeldi be gözlerin, o gözler parlasın diye ömrümü veririm sana ömrümü.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: The Place */}
        <section className="py-20 px-4 bg-gradient-to-r from-rose-100/50 via-pink-100/50 to-amber-100/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row-reverse items-center gap-12"
            >
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-3xl p-8 shadow-lg flex items-center justify-center aspect-square overflow-hidden">
                  {photosLoaded && getPhotoByOrder(2) && !imageErrors[2] ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden min-h-[200px]">
                      <img
                        src={getPhotoByOrder(2)!.src}
                        alt={getPhotoByOrder(2)!.alt}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={() => handleImageError(2)}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <MapPin className="w-24 h-24 text-purple-400 mx-auto mb-4 opacity-70" />
                      <p className="text-purple-600 font-medium text-lg">O Özel Yer</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="romantic-heading text-3xl md:text-4xl font-bold mb-6 text-amber-800">
                    Ne Kadar Yesek De Obez Olamadık
                  </h2>
                  <p className="romantic-body text-lg text-amber-700 leading-relaxed mb-6">
                    Her ders bitişinde pattis ve burgir yemeye giderdik güzel kızımla, dudakların mayonez olurdu ama farketmeden konuşmaya devam ederdin.Yemek yemeni de izlemeyi çok özledim birtanemm.
                  </p>
                  <p className="romantic-body text-lg text-amber-700 leading-relaxed">
                    İlk doğum günü hediyemi de burda vermiştin bana, çok mutlu olup sımsıkı sarılmıştım sana. Sana sımsıkı sarılmayı çok özledim sevgilim.DAYANAMIYORUM SENSİZLİĞE NOLUR AFFET BENİ.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: First Sight */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 rounded-3xl p-8 shadow-lg flex items-center justify-center aspect-square overflow-hidden">
                  {photosLoaded && getPhotoByOrder(3) && !imageErrors[3] ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden min-h-[200px]">
                      <img
                        src={getPhotoByOrder(3)!.src}
                        alt={getPhotoByOrder(3)!.alt}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={() => handleImageError(3)}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Eye className="w-24 h-24 text-orange-400 mx-auto mb-4 opacity-70" />
                      <p className="text-orange-600 font-medium text-lg">İlk Bakış</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="romantic-heading text-3xl md:text-4xl font-bold mb-6 text-amber-800">
                    Kedileri Severken Ayrı Bi Güzeldin Kızım
                  </h2>
                  <p className="romantic-body text-lg text-amber-700 leading-relaxed mb-6">
                    Sokakta kedi görünce hemen koşup sevmen o kadar çok hoşuma gidiyor ki, isterse dünya yansın gene de koşa koşa kedi sevmeye giderdin.Kedileri severken videonu çekmeyi çok severdim ,tatlı kızım benim hayvanları çok sever, migrostan mama alıp vermiştin yavru kedilere senin o ponçik kalbini yerim essek. 
                  </p>
                  <p className="romantic-body text-lg text-amber-700 leading-relaxed">
                    Merhametli bir insansın ve bu beni sana daha çok bağlıyor.O temiz kalbinde tekrardan olmak istiyorum, affet beni sevgilim.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: First Words */}
        <section className="py-20 px-4 bg-gradient-to-r from-rose-100/50 via-pink-100/50 to-amber-100/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row-reverse items-center gap-12"
            >
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-green-200 via-teal-200 to-blue-200 rounded-3xl p-8 shadow-lg flex items-center justify-center aspect-square overflow-hidden">
                  {photosLoaded && getPhotoByOrder(4) && !imageErrors[4] ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden min-h-[200px]">
                      <img
                        src={getPhotoByOrder(4)!.src}
                        alt={getPhotoByOrder(4)!.alt}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={() => handleImageError(4)}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Smile className="w-24 h-24 text-teal-400 mx-auto mb-4 opacity-70" />
                      <p className="text-teal-600 font-medium text-lg">İlk Sözler</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="romantic-heading text-3xl md:text-4xl font-bold mb-6 text-amber-800">
                    Bana Kattıkların
                  </h2>
                  <p className="romantic-body text-lg text-amber-700 leading-relaxed mb-6">
                    Seninle tanıştığım ilk günden beri üstümde çok büyük bir emeğin var sevgilim. Bana her konuda destek olup bana eksik yönlerimi gösterdin ama ben ciddiye almadım. Çok pişmanım keşke seni o an anlayabilseydim, kötülüğümü değil de iyiliğimi düşündüğünü anlayabilseydim.
                  </p>
                  <p className="romantic-body text-lg text-amber-700 leading-relaxed">
                    Sen başıma gelen en güzel olaysın be kızım, sensiz aldığım her nefes zulüm bana, sen bana başka hiç kimsenin katamadığı, kazandıramadığı şeyleri kazandırdın. Sen bana hayatımın anlamını kazandırdın.HAYATIMIN ANLAMI SENİ ÇOOKK SEVİYORUMMM.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Section: The Beginning */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="romantic-heading text-3xl md:text-5xl font-bold mb-8 text-amber-800">
                Affet Beni Güzelim 
              </h2>
              
              <div className="bg-gradient-to-r from-pink-200 via-amber-200 to-rose-200 rounded-3xl p-8 md:p-12 shadow-lg mb-12">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-6"
                >
                  <Sparkles className="w-16 h-16 text-pink-500 mx-auto" />
                </motion.div>
                
                <p className="romantic-body text-lg md:text-xl text-amber-800 leading-relaxed italic mb-6">
                  &ldquo;Sen bana inanana kadar çaba göstermeye devam edeceğim,gerekirse her şeyi öğrenirim, yeri gelir kendimi ateşe atarım ama sen bana inanana kadar vazgeçmeyeceğim.Ya biz, biz oluruz ya da ben hiç olmam.  &rdquo;
                </p>
                                <p className="romantic-body text-lg md:text-xl text-amber-800 leading-relaxed italic mb-6">
                  &ldquo;Beni korkutan yokluğun değil ki. Beni korkutan yokluğuna alışmak.  &rdquo;
                </p>
                
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Heart className="w-12 h-12 text-pink-500 fill-current mx-auto" />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className="romantic-accent text-xl font-medium"
              >
                Telif Hakları Aşkım Tarafından Alınmıştır.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
              scale: 0,
              rotate: 0
            }}
            animate={{ 
              y: -100,
              scale: [0, 1, 0],
              rotate: [0, 360],
              x: `+=${Math.random() * 150 - 75}`
            }}
            transition={{ 
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-5 h-5 fill-current" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}