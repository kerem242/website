import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images')
    
    // Check if the images directory exists
    if (!fs.existsSync(imagesDirectory)) {
      return NextResponse.json({ images: [] })
    }

    // Read all files from the images directory
    const files = fs.readdirSync(imagesDirectory)
    
    // Filter for image files (jpg, jpeg, png, gif, webp)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    // Create image objects with metadata
    const images = imageFiles.map((filename, index) => {
      const name = path.parse(filename).name
      
      // Generate a title from filename (remove extension and format)
      const title = name
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      return {
        id: index + 1,
        src: `/images/${filename}`,
        alt: title,
        title: title,
        description: ` ${title}`,
        filename: filename
      }
    })

    // Sort images by filename for consistent ordering
    images.sort((a, b) => a.filename.localeCompare(b.filename))

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error reading images directory:', error)
    return NextResponse.json({ images: [] }, { status: 500 })
  }
}