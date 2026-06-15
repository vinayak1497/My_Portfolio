import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})



function sanitizePublicId(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function uploadToCloudinary(
  file: File,
  folder: string = 'portfolio'
): Promise<string> {
  if (!file) {
    throw new Error('No file provided')
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  const isPdf = ext === 'pdf' || file.type === 'application/pdf'

  const allowedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ]

  if (isPdf && file.type !== 'application/pdf') {
    throw new Error(
      `Invalid PDF upload. Expected application/pdf but received "${file.type}".`
    )
  }

  if (!isPdf && !allowedImageTypes.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`)
  }

  const MAX_SIZE_MB = 10

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`)
  }

  console.log('[CLOUDINARY UPLOAD]', {
    filename: file.name,
    mimeType: file.type,
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    isPdf,
    folder,
  })

  const buffer = Buffer.from(await file.arrayBuffer())

  // Include .pdf extension in the public_id so Cloudinary's secure_url naturally ends with .pdf
  const baseId = sanitizePublicId(file.name)
  const publicId = isPdf ? `${baseId}.pdf` : baseId

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      public_id: publicId,
      resource_type: isPdf ? 'raw' as const : 'image' as const,
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      invalidate: true,
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('[CLOUDINARY ERROR]', error)
          reject(new Error(error.message))
          return
        }

        const uploadResult = result as UploadApiResponse

        const finalUrl = uploadResult.secure_url

        console.log('[UPLOAD RESULT]', {
          secure_url: finalUrl,
          public_id: uploadResult.public_id,
          resource_type: uploadResult.resource_type,
          format: uploadResult.format,
        })

        if (!finalUrl || !finalUrl.startsWith('http')) {
          reject(new Error('Cloudinary did not return a valid secure_url'))
          return
        }

        resolve(finalUrl)
      }
    )

    uploadStream.end(buffer)
  })
}

export async function deleteFromCloudinary(url: string): Promise<void> {
  const extracted = extractPublicId(url)

  if (!extracted) {
    console.warn('[CLOUDINARY DELETE] Unable to extract public ID:', url)
    return
  }

  const resourceType = url.includes('/raw/upload/')
    ? 'raw'
    : 'image'

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      extracted.publicId,
      {
        resource_type: resourceType,
        invalidate: true,
      },
      (error) => {
        if (error) {
          reject(new Error(error.message))
        } else {
          resolve()
        }
      }
    )
  })
}

function extractPublicId(
  url: string
): { publicId: string; format: string } | null {
  // Raw URL with extension: .../raw/upload/v123/portfolio/file.pdf
  const rawWithExt = url.match(
    /\/raw\/upload\/(?:v\d+\/)?(.+?)\.([a-zA-Z0-9]+)$/
  )
  if (rawWithExt) {
    return { publicId: rawWithExt[1], format: rawWithExt[2] }
  }

  // Raw URL without extension: .../raw/upload/v123/portfolio/file
  // Cloudinary raw secure_url may omit the extension
  const rawNoExt = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/)
  if (rawNoExt) {
    const rawId = rawNoExt[1]
    const dotIndex = rawId.lastIndexOf('.')
    if (dotIndex !== -1) {
      return { publicId: rawId.slice(0, dotIndex), format: rawId.slice(dotIndex + 1) }
    }
    return { publicId: rawId, format: '' }
  }

  const imageMatch = url.match(
    /\/image\/upload\/(?:v\d+\/)?(.+?)\.([a-zA-Z0-9]+)$/
  )

  if (imageMatch) {
    return {
      publicId: imageMatch[1],
      format: imageMatch[2],
    }
  }

  return null
}

export function getCloudinaryConfig() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  }
}
