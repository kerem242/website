// 📝 PHOTO CAPTIONS CONFIGURATION
// ================================
// Edit the descriptions below to change what appears under each photo
// The photo filenames should match your actual files in /public/images/

export interface PhotoCaption {
  filename: string     // Exact filename in /public/images/
  title: string        // Photo title (shown as heading)
  description: string  // Caption/description (shown below photo)
}

// 🎯 EDIT YOUR PHOTO DESCRIPTIONS HERE:
// ====================================
export const photoCaptions: PhotoCaption[] = [
  {
    filename: 'ilk fotomuz.jpg',
    title: 'İlk Fotoğrafımız',
    description: 'Birlikte çektiğimiz ilk fotoğraf. O anki mutluluğumuz gözlerimizden okunuyor.'
  },
  {
    filename: 'ilk defa kar yağdı.jpg',
    title: 'İlk Kar Yağışı',
    description: 'Birlikte yaşadığımız ilk kar yağışı. Soğukta bile kalbimiz sıcacıktı.'
  },
  {
    filename: 'taktığım ilk toka.jpg',
    title: 'İlk Hediyem',
    description: 'Sana aldığım ilk hediye olan toka. Saçlarında ne kadar güzel duruyordu.'
  },
  {
    filename: 'uçağa bindik.jpg',
    title: 'İlk Seyahatimiz',
    description: 'Birlikte yaptığımız ilk seyahat. Heyecanımız ve mutluluğumuz tavanlardaydı.'
  }
  // Add more photo descriptions here as needed
  // {
  //   filename: 'your-photo-name.jpg',
  //   title: 'Photo Title',
  //   description: 'Your beautiful description or memory about this photo'
  // }
]

// Function to get caption for a specific photo
export function getCaptionByFilename(filename: string): PhotoCaption | undefined {
  return photoCaptions.find(caption => caption.filename === filename)
}

// Function to get all captions
export function getAllCaptions(): PhotoCaption[] {
  return photoCaptions
}

// 💡 HOW TO ADD NEW PHOTO DESCRIPTIONS:
// =====================================
// 1. Add your photo to /public/images/ folder
// 2. Add a new entry to the photoCaptions array above:
//    {
//      filename: 'exact-filename.jpg',  // Must match file in /public/images/
//      title: 'Your Photo Title',
//      description: 'Your story or memory about this photo. This can be as long as you want.'
//    }

// 📝 TIPS FOR WRITING DESCRIPTIONS:
// =================================
// - Keep titles short and descriptive
// - Descriptions can be longer and tell the story behind the photo
// - Use emotional language to make it personal and romantic
// - Include details about what was happening, how you felt, etc.