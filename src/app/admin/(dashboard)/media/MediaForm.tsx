'use client'

import { useActionState } from 'react'
import { createMedia, updateMedia } from './actions'
import { Field, TextInput, TextArea, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import type { MdxDocument } from '@/lib/content-manager'

export function MediaForm({ media }: { media?: MdxDocument }) {
  const action = media ? updateMedia : createMedia
  const fm = media?.frontmatter || {}
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <form action={formAction} className="space-y-6">
      {media && <input type="hidden" name="originalSlug" value={media.slug} />}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><TextInput name="title" defaultValue={fm.title as string} required /></Field>
          <Field label="Slug"><TextInput name="slug" defaultValue={fm.slug as string} /></Field>
          <Field label="Type"><TextInput name="type" defaultValue={fm.type as string} required placeholder="Newspaper, Magazine, Awards, Speaking" /></Field>
          <Field label="Publication"><TextInput name="publication" defaultValue={fm.publication as string} required /></Field>
          <Field label="Date"><TextInput name="date" type="date" defaultValue={String(fm.date || '')} /></Field>
        </div>
      </FormSection>
      <FormSection title="Links & Description">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="URL (optional)"><TextInput name="url" defaultValue={fm.url as string} placeholder="https://..." /></Field>
          <Field label="Thumbnail URL (optional)"><TextInput name="thumbnail" defaultValue={fm.thumbnail as string} placeholder="https://..." /></Field>
          <Field label="Description" className="md:col-span-2"><TextArea name="description" defaultValue={fm.description as string} rows={3} /></Field>
        </div>
      </FormSection>
      <FormSection title="Content (MDX)">
        <Field label="MDX Body"><TextArea name="body" defaultValue={media?.body || ''} rows={10} className="font-mono text-xs leading-relaxed" /></Field>
      </FormSection>
      {state?.error && <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">! ERROR — {state.error}</div>}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={media ? 'Save Changes' : 'Create Media'} />
        <CancelButton href="/admin/media" />
      </div>
    </form>
  )
}
