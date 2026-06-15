'use client'

import { useActionState, useState } from 'react'
import { createNote, updateNote } from './actions'
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import { ImageUpload } from '@/components/admin/ImageUpload'
import type { MdxDocument } from '@/lib/content-manager'

const subjects = [
  { value: 'os', label: 'Operating Systems' },
  { value: 'dbms', label: 'Database Management Systems' },
  { value: 'cn', label: 'Computer Networks' },
  { value: 'ai', label: 'Artificial Intelligence' },
  { value: 'toc', label: 'Theory of Computation' },
  { value: 'software-engineering', label: 'Software Engineering' },
]

export function NoteForm({ note }: { note?: MdxDocument }) {
  const action = note ? updateNote : createNote
  const fm = note?.frontmatter || {}
  const [state, formAction, pending] = useActionState(action, undefined)
  const initialType = String(fm.type || 'mdx')
  const [noteType, setNoteType] = useState(initialType)
  const [fileUrl, setFileUrl] = useState(String(fm.fileUrl || ''))

  return (
    <form action={formAction} className="space-y-6">
      {note && <input type="hidden" name="originalSlug" value={note.slug} />}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><TextInput name="title" defaultValue={fm.title as string} required /></Field>
          <Field label="Slug"><TextInput name="slug" defaultValue={fm.slug as string} /></Field>
          <Field label="Subject">
            <Select name="subject" defaultValue={fm.subject as string || 'os'}>
              {subjects.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </Select>
          </Field>
          <Field label="Description" className="md:col-span-2"><TextArea name="description" defaultValue={fm.description as string} rows={2} /></Field>
        </div>
      </FormSection>
      <FormSection title="Metadata">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Order"><TextInput name="order" type="number" min={0} defaultValue={String(fm.order || 0)} /></Field>
          <Field label="Type">
            <Select name="type" defaultValue={initialType} onChange={(e) => setNoteType(e.target.value)}>
              <option value="mdx">MDX Note</option>
              <option value="pdf">PDF Document</option>
            </Select>
          </Field>
          <Field label="Status"><Checkbox name="published" label="Published" defaultChecked={fm.published !== false} /></Field>
        </div>
      </FormSection>

      {/* PDF Upload Section — shown only when type is pdf */}
      {noteType === 'pdf' && (
        <FormSection title="PDF Document">
          <div className="space-y-3">
            <Field label="Upload PDF">
              <ImageUpload
                currentUrl={fileUrl}
                folder="portfolio/notes"
                label="Choose PDF File"
                onUpload={(url) => setFileUrl(url)}
              />
            </Field>
            <input type="hidden" name="fileUrl" value={fileUrl} />
            <Field label="Preview Text (optional)">
              <TextArea
                name="body"
                defaultValue={note?.body || ''}
                rows={6}
                className="font-mono text-xs leading-relaxed"
                placeholder="Optional preview text shown when PDF cannot be rendered inline..."
              />
            </Field>
          </div>
        </FormSection>
      )}

      {/* MDX Content Section — shown only when type is mdx */}
      {noteType === 'mdx' && (
        <FormSection title="Content (MDX)">
          <Field label="MDX Body">
            <TextArea name="body" defaultValue={note?.body || ''} rows={20} className="font-mono text-xs leading-relaxed" />
          </Field>
        </FormSection>
      )}

      {state?.error && <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">! ERROR — {state.error}</div>}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={note ? 'Save Changes' : 'Create Note'} />
        <CancelButton href="/admin/notes" />
      </div>
    </form>
  )
}
