import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export async function GET() {
  try {
    const karsiImagesDirectory = path.join(process.cwd(), 'public', 'images karsı')
    
    // Check if the karsı images directory exists
    if (!fs.existsSync(karsiImagesDirectory)) {
      return NextResponse.json({ images: [] })
    }

    // Read all files from the karsı images directory
    const files = fs.readdirSync(karsiImagesDirectory)
    
    // Filter for image files (jpg, jpeg, png, gif, webp)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    // Create image objects with metadata, specifically for numbered files
    const images = imageFiles
      .map((filename) => {
        const name = path.parse(filename).name
        
        // Extract number from filename (e.g., "1" from "1.jpg")
        const numberMatch = name.match(/^(\d+)$/)
        const number = numberMatch ? parseInt(numberMatch[1], 10) : 999
        
        return {
          id: number,
          src: `/images karsı/${filename}`,
          alt: `İlk karşılaşma fotoğrafı ${number}`,
          title: `Anı ${number}`,
          description: `İlk karşılaşmamızdan özel bir an`,
          filename: filename,
          order: number
        }
      })
      // Sort by the number in filename (1.jpg, 2.jpg, 3.jpg, 4.jpg)
      .sort((a, b) => a.order - b.order)
      // Only return the first 4 images
      .slice(0, 4)

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error reading karsı images directory:', error)
    return NextResponse.json({ images: [] }, { status: 500 })
  }
}