export interface KarsiImage {
  id: number
  src: string
  alt: string
  title: string
  description: string
  filename?: string
  order: number
}

// Async function to fetch karsı images from API
export async function getKarsiImages(): Promise<KarsiImage[]> {
  try {
    const response = await fetch('/api/karsi-images', {
      cache: 'no-store' // Ensure fresh data on each request
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch karsı images')
    }
    
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Error fetching karsı images:', error)
    // Return empty array if API fails - component will fallback to icons
    return []
  }
}

// Synchronous function for client-side usage (fallback)
export function getKarsiImagesSync(): KarsiImage[] {
  return [
    {
      id: 1,
      src: '/images karsı/1.jpg',
      alt: 'İlk karşılaşma fotoğrafı 1',
      title: 'Anı 1',
      description: 'İlk karşılaşmamızdan özel bir an',
      order: 1
    },
    {
      id: 2,
      src: '/images karsı/2.jpg',
      alt: 'İlk karşılaşma fotoğrafı 2',
      title: 'Anı 2',
      description: 'İlk karşılaşmamızdan özel bir an',
      order: 2
    },
    {
      id: 3,
      src: '/images karsı/3.jpg',
      alt: 'İlk karşılaşma fotoğrafı 3',
      title: 'Anı 3',
      description: 'İlk karşılaşmamızdan özel bir an',
      order: 3
    },
    {
      id: 4,
      src: '/images karsı/4.jpg',
      alt: 'İlk karşılaşma fotoğrafı 4',
      title: 'Anı 4',
      description: 'İlk karşılaşmamızdan özel bir an',
      order: 4
    }
  ]
}