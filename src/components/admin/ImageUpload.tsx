'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { normalizePdfUrl } from '@/lib/utils'

interface ImageUploadProps {
  currentUrl?: string
  folder?: string
  label?: string
  accept?: string
  onUpload: (url: string) => void
}

export function ImageUpload({
  currentUrl,
  folder = 'portfolio',
  label = 'Upload File',
  accept = 'image/*,.pdf',
  onUpload,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string>()

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')

    if (isPdf && file.type !== 'application/pdf') {
      setError('Invalid PDF file (incorrect MIME type)')
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File too large (max 10MB)')
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    setUploading(true)
    setError(undefined)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await res.json()
      onUpload(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="font-mono text-[10px] tracking-wider uppercase px-3 py-2 border border-[#00ff66]/30 text-[#00ff66] hover:bg-[#00ff66]/5 transition-all disabled:opacity-40"
        >
          {uploading ? 'UPLOADING...' : `[ ${label} ]`}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFile}
          className="hidden"
        />
        {currentUrl && (
          <span className="font-mono text-[#00ff66]/40 text-[10px] truncate max-w-[200px]">
            {currentUrl.split('/').pop()}
          </span>
        )}
      </div>
      {error && (
        <p className="font-mono text-[#ff0040] text-[10px] tracking-wider">{error}</p>
      )}
      {currentUrl && (
        <div className="mt-1">
          {currentUrl.match(/\.pdf$/i) ? (
            <a
              href={normalizePdfUrl(currentUrl)}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[#0088ff] text-[10px] underline hover:text-[#0088ff]/80"
            >
              View PDF &rarr;
            </a>
          ) : (
            <Image
              src={currentUrl}
              alt="Preview"
              width={200}
              height={120}
              className="max-w-[200px] max-h-[120px] border border-[#00ff66]/20 object-cover"
              style={{ width: 'auto', height: 'auto' }}
              unoptimized
            />
          )}
        </div>
      )}
    </div>
  )
}
