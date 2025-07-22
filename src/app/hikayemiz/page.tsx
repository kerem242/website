'use client'

import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Star, Gift, Camera, Music, Coffee } from 'lucide-react'
import { useEffect, useState } from 'react'

const timelineEvents = [
  {
    id: 1,
    date: 'Şubat 2023',
    title: 'Seni Tandığım İlk Gün',
    description: 'Hani derler ya, hayatımı ikiye ayırabilirim; senden öncesi ve sonrası diye… Ama benim için öyle değil. Ben sensiz hiç yaşamamışım zaten sevgilim, bunu seni ilk gördüğüm anda anlamıştım. Kalbimde tarif edemediğim, bambaşka hisler oluşmuştu ve bu hisler varya yok abi yok anlatamam sadece gösterebilirim. O sınıfa ilk girdiğinde güzelliğine bakakalmıştım, o duru güzelliğin ve en çok da kendine has duruşun beni deli ediyodu resmen. Deli gibi etkilenmiştim senden ve bu etki sen kalbimi sökmeden bitmeyecek meleğimmm.',
    icon: Heart,
    color: 'from-pink-400 to-rose-400',
    position: 'left'
  },
  {
    id: 2,
    date: 'Şubat 2023',
    title: 'İlk Buluşmamız',
    description: 'İlk buluşmamızı asla unutamam, beraber sahile gidip çardağa oturmuştuk ve baya da yağmur yağıyordu beni şemsiyene almıştın ve ilk defa sana o kadar yakın olmuştum, kalbim yerinden çıkacak gibiydi o kadar güzel ve tatlıydın ki gözlerimi senden kaçıramamıştım.Çardakta 4 saat boyunca sohbet etmiştik ve o kadar güzel ve tatlı konuşuyodun ki mıncırasım geliyordu seni.Buluşmadan sonra hemen eve gidip yatakta mutluluktan zıpladığımı hatırlıyorum.Her anı çok güzeldi tıpkı senin gibi birtanem.',
    icon: Coffee,
    color: 'from-amber-400 to-orange-400',
    position: 'right'
  },
  {
    id: 3,
    date: 'Mart 2023',
    title: 'İlk Aşk İtirafı',
    description: 'İlk ben açıklamıştım sana olan hislerimi,iddia yoluyla da olsa ilk ben demiştim seni seviyorum diye.Aslında korkaklık edip yüzüne diyememiştim, bu konuda pişmanım aslında direkt karşına geçip açık açık SENİİ SEVİYORUMMMMMMMMM diye bağırmak isterdim.İlk itiraf bu gibi gözükse de bence ilk itiraf sana o köşe başında dediğim "Çok güzel kokuyorsun" cümlesiydi, hala daha garipserim neden öyle bir şey dedim diye ama hiç pişman değilim.O kokunu her içime çektiğinde aklıma o gün geliyor çünkü.İtiraf ettiğim o günden bu yana aşkımdan hiçbir şey eksilmedi biliyor musun, sana olan aşkım seni her gördüğümde ilk günkü gibi oluyor.Her geçen gün sana daha çok aşık oluyorum bebeğim.',
    icon: Star,
    color: 'from-purple-400 to-pink-400',
    position: 'left'
  },
  {
    id: 4,
    date: 'Mart 2023',
    title: 'İlk Hediyem',
    description: 'Havalar soğumuştu,dershanede konuşurken bana ellerim üşüyo demiştin hatırlıyo musun, sonra sana parmaksız eldiven almıştım çünkü parmaklı eldivenleri sevmiyordun.Yanına gelip direkt vermiştim eldiveni, çünkü içimde çok büyük bir utanç vardı ve biraz da kızarmıştım ta ki sen eldiveni takana kadar, sanki o eldiven sadece ellerini değil kalbimi de ısıtıyor gibiydi.O an içimden, bu sıcaklığı hiç bırakmayacağım diye söz verdim. Ve hala aynı sözü tutuyorum… Sana da her zaman o sıcaklığı hissettirmek istiyorum sevgilim, ömrünün son gününe kadar kalbin hep sımsıcak olsun istiyorum.',
    icon: Gift,
    color: 'from-green-400 to-teal-400',
    position: 'right'
  },
  {
    id: 5,
    date: 'Şubat 2025',
    title: 'İlk Seyahatimiz',
    description: 'Çok fazla gezemedik biliyorum ama bundan sonra çok fazla gezeceğimizden eminim sevgilim.Ama şuana kadar ki ilk seyehatimiz Erciyesti ve turla beraber gitmiştik.Yol boyu yanyana oturup dışarıyı izlemiştik, vardıktan sonra dağın tepesine çıkmıştık, kayıp düşüyordun ve tutmaya çalışıyordum seni ama sen gülmekten ayağa kalkamıyordun.O gülen yüzünü gördükten sonra her şey bitiyordu benim için, öyle güzel gülüyorsun ki sen gülerken ben senin güzelliğinde kayboluyordum.Seni her zaman güldüreceğim sevgilim ne olursa olsun durumumuz zor da olsa her zaman seni mutlu etmek için çabalacağım meleğim.',
    icon: MapPin,
    color: 'from-blue-400 to-cyan-400',
    position: 'left'
  },
  {
    id: 6,
    date: '1 Ocak 2025 ',
    title: 'Özel Anımız',
    description: 'Özel anılarımız çok olsa da buraya yazacağım anı beraber hastaneye gitme anımızdır.O gün daha da iyi anladım bana ne kadar değer verdiğini, iyi günde de kötü günde de benimle olacağını anlamıştım.Hangi hastane anısını soruyorsan niğde de karın ağrım yüzünden gittiğimiz anı, aslında diğer anılarda da çok iyi anladım bana verdiğin değeri, bu değere karşılık olarak sana bir şey gösteremedim bu zamana kadar ama unutma "bu zamana kadar".',
    icon: Music,
    color: 'from-indigo-400 to-purple-400',
    position: 'right'
  },
  {
    id: 7,
    date: '15 Mart 2023',
    title: 'Yıldönümümüz',
    description: 'Dönercide sevgili olmuştuk hatırlıyo musun,biz artık sevgili miyiz diye sormuştum sana sende evet sevgiliyiz demiştin.Hayatım o gün başladı diyebilirim, seninle birlikte olmak çok güzeldi, belki bir şey yapmıyorduk ama her gün burger yiyip net cafede lol yada valo oynamamız çok güzeldi bir nevi obez hayatı yaşıyorduk ama her şeye rağmen çok değerliydi benim için.İkili menüyü tek başına yediğin geldi aklıma, öyle iştahlı yiyorsun ki bazen sanki ben yiyormuşum gibiydi.İlk yemeklerimizde sana bakınca biraz rahatsız oluyordun ama şimdi umurunda bile olmuyor. O kadar hoşuma gidiyor ki artık en küçük hareketin bile beni etkiliyor. Konu biraz dağıldı farkındayım hemen toparlıyorum. 15 Mart 2025… O gün Niğde’ye sana gelmiştim, elimde çiçeklerle. Akşamında sabancının ordaki durakta kedi sevmiştin ve ben video çekmiştim.O video hâlâ galerimde duruyor… Bazen açıp izliyorum, hatta birkaç kez o videoyu izleyerek uyuyakalmışlığım bile var.Bunu okurken belki içinden bir daha yıldönümümüz olur mu ki diye düşünebilirsin, düşünmekte haklısın bu zamana kadar adam gibi değer veremedim sana ama dediğim gibi, bu benim ilk adımım ve son olmayacak. Bana olan inancını kazanmak için köpek gibi çabalayacağım ve bu çabamı sana adım adım göstereceğim sevgilim.',
    icon: Calendar,
    color: 'from-rose-400 to-pink-400',
    position: 'left'
  },
  {
    id: 8,
    date: '8 Ekim 2004',
    title: 'Doğum Günün',
    description: 'Doğum günü diyince aklıma ilk senin o toplu hediyelerle olan fotoğrafın geliyor, sana aldığım her şey pembiş pembişti.Karşına kafan kadar çiçekle çıkmıştım bide çantamda yığınla hediye, sonra beni ücra bir parka götürüp hediyelerini orda açmıştık.Gümüşlerini çok beğenmiştin ama bizim şanssızlık durur mu hiç aldığım bileklik koptu hemen, ha bide yüzük numaran deli etmişti bizi 17 numaraydi ilk aldığımda sonra 13e düşürdüm ordan 9a düşürdük ama çok yakıştı parmağına o zarif ellerine ne yakışmaz ki zaten askımmm.',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    position: 'right'
  }
]

export default function HistoryPage() {
  const [isClient, setIsClient] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    setIsClient(true)
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-rose-50">
      {/* Header Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="romantic-heading text-4xl md:text-6xl font-bold mb-6 text-amber-800">
              Askusumla İlk Anlarımız
            </h1>
            <p className="romantic-body text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
              İlk ve son göz ağrım benim umarım okurken yüzünde tebessüm oluşturabilirim.Atladığım konular yada ordan oraya atlamış olabilirim kusuruma bakmazsın dimi askımmm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 via-amber-300 to-rose-300 rounded-full"></div>

            {/* Timeline events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50, x: event.position === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${event.position === 'left' ? 'justify-start' : 'justify-end'
                    }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-lg`}>
                      <event.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Event card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`w-full max-w-md ${event.position === 'left' ? 'mr-auto pr-16' : 'ml-auto pl-16'
                      }`}
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      {/* Date */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center mb-3"
                      >
                        <Calendar className="w-4 h-4 text-amber-600 mr-2" />
                        <span className="romantic-body text-sm font-medium text-amber-600">
                          {event.date}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <h3 className="romantic-subheading text-xl font-semibold mb-3 text-amber-800">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="romantic-body text-amber-700 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Decorative hearts */}
                      <div className="flex justify-end mt-4 space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          >
                            <Heart className="w-3 h-3 text-pink-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="romantic-heading text-3xl md:text-4xl font-bold mb-8 text-amber-800">
              Gelecek Planlarımız
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Heart,
                  title: 'Tüm Kalbimle Seveceğim',
                  description: 'Hislerin ve düşüncelerin hakkında artık eskisi gibi düşüncesizlik yapmayacağım sevgilim.Her şeyden önce sana öncelik verip seni dinleyeceğim sevgilim, ne olursa olsun.'
                },
                {
                  icon: Camera,
                  title: 'Daha Çok Aktivite',
                  description: 'Eskisi gibi plansız işler yapmayacağım, beraber farklı yerleri gezmek ve zaman geçirmek için çabalayağım.Daha çok zaman ayırıcam daha çok şey katıcam sana sevgilimmm.'
                },
                {
                  icon: Star,
                  title: 'Beraber Çalışıcaz',
                  description: 'Sektörlerimiz aynı,  bana ve sana olabildiğince bu sektörde birşeyler katmaya çalışacağım.Beraber çalışıp yükselicez iyi bir hayat için beraber engelleri aşacağız güzel kızım.Biz beraber olursak karşımızda hiçbir engel duramaz.'
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
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="text-pink-500 mb-4 flex justify-center"
                  >
                    <item.icon className="w-12 h-12" />
                  </motion.div>
                  <h3 className="romantic-subheading text-lg font-semibold mb-3 text-amber-800">
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
              <p className="romantic-body text-lg md:text-xl text-amber-800 leading-relaxed italic mb-4">
                &ldquo;10 gündür konuşmuyoruz farkındayım, ama artık boş laflardan ziyade harekete geçmek istiyorum sevgilim.Bu sadece görünen kısmı bi bu kadar da denizin altında olucak.Aramızdaki ilişkiyi daha çok güçlendireceğim, ilişkimize ve sana sahip çıkacağım.Sen benim herşeyimsin meleğim, benim sensiz bir ömrüm olamaz.&rdquo;
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-pink-500 fill-current mx-auto" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating elements */}
      {isClient && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => {
            // Generate consistent random values for each element
            const randomX = (i * 137.5) % windowDimensions.width // Pseudo-random but consistent
            const randomDuration = 8 + (i * 0.5) % 4 // Pseudo-random duration
            const randomDelay = i * 1

            return (
              <motion.div
                key={i}
                className="absolute text-pink-300/20"
                initial={{
                  x: randomX,
                  y: windowDimensions.height + 50,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  y: -100,
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                  x: randomX + ((i * 23) % 100 - 50) // Consistent pseudo-random offset
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  delay: randomDelay,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-5 h-5 fill-current" />
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}