export interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  description: string
  filename?: string
}

// Async function to fetch images from API
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const response = await fetch('/api/images', {
      cache: 'no-store' // Ensure fresh data on each request
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch images')
    }
    
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    // Return fallback images if API fails
    return [
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
    ]
  }
}

// Synchronous function for client-side usage (fallback)
export function getGalleryImagesSync(): GalleryImage[] {
  return [
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
  ]
}