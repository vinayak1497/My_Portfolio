import { NextResponse, type NextRequest } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const adminSession = request.cookies.get('admin_session')
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'portfolio'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const ext = file.name.split('.').pop()?.toLowerCase()
    const isPdf = file.type === 'application/pdf' || ext === 'pdf'

    if (isPdf && file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid PDF: incorrect MIME type' }, { status: 400 })
    }

    console.log('[UPLOAD API]', {
      filename: file.name,
      mimeType: file.type,
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      folder,
    })

    const url = await uploadToCloudinary(file, folder)

    return NextResponse.json({
      url,
      filename: file.name,
      mimeType: file.type,
    })
  } catch (error) {
    console.error('[UPLOAD API ERROR]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
