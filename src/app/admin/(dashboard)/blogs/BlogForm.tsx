'use client'

import { useActionState } from 'react'
import { createBlog, updateBlog } from './actions'
import { Field, TextInput, TextArea, Checkbox, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import type { MdxDocument } from '@/lib/content-manager'

export function BlogForm({ blog }: { blog?: MdxDocument }) {
  const action = blog ? updateBlog : createBlog
  const fm = blog?.frontmatter || {}
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <form action={formAction} className="space-y-6">
      {blog && <input type="hidden" name="originalSlug" value={blog.slug} />}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><TextInput name="title" defaultValue={fm.title as string} required /></Field>
          <Field label="Slug"><TextInput name="slug" defaultValue={fm.slug as string} /></Field>
          <Field label="Description" className="md:col-span-2"><TextArea name="description" defaultValue={fm.description as string} rows={2} /></Field>
        </div>
      </FormSection>
      <FormSection title="Metadata">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Date"><TextInput name="date" type="date" defaultValue={String(fm.date || '')} /></Field>
          <Field label="Tags (comma-separated)"><TextInput name="tags" defaultValue={(fm.tags as string[])?.join(', ') || ''} /></Field>
          <Field label="Status"><Checkbox name="published" label="Published" defaultChecked={fm.published !== false} /></Field>
        </div>
      </FormSection>
      <FormSection title="Content (MDX)">
        <Field label="MDX Body"><TextArea name="body" defaultValue={blog?.body || ''} rows={20} className="font-mono text-xs leading-relaxed" /></Field>
      </FormSection>
      {state?.error && <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">! ERROR — {state.error}</div>}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={blog ? 'Save Changes' : 'Create Blog'} />
        <CancelButton href="/admin/blogs" />
      </div>
    </form>
  )
}
