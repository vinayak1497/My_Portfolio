'use client'

import { useActionState } from 'react'
import { createInternship, updateInternship } from './actions'
import { Field, TextInput, TextArea, Select, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import type { MdxDocument } from '@/lib/content-manager'

const statuses = ['Completed', 'In Progress', 'Archived']

export function InternshipForm({ internship }: { internship?: MdxDocument }) {
  const action = internship ? updateInternship : createInternship
  const fm = internship?.frontmatter || {}
  const [state, formAction, pending] = useActionState(action, undefined)

  const skillsValue = Array.isArray(fm.skills) ? (fm.skills as string[]).join(', ') : (fm.skills as string || '')

  return (
    <form action={formAction} className="space-y-6">
      {internship && <input type="hidden" name="originalSlug" value={internship.slug} />}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><TextInput name="title" defaultValue={fm.title as string} required /></Field>
          <Field label="Slug"><TextInput name="slug" defaultValue={fm.slug as string} /></Field>
          <Field label="Company"><TextInput name="company" defaultValue={fm.company as string} required /></Field>
          <Field label="Status">
            <Select name="status" defaultValue={fm.status as string || 'Completed'}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
        </div>
      </FormSection>
      <FormSection title="Timeline">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Duration"><TextInput name="duration" defaultValue={fm.duration as string} placeholder="e.g. 3 Months" /></Field>
          <Field label="Start Date"><TextInput name="startDate" type="date" defaultValue={String(fm.startDate || '')} /></Field>
          <Field label="End Date"><TextInput name="endDate" type="date" defaultValue={String(fm.endDate || '')} /></Field>
        </div>
      </FormSection>
      <FormSection title="Skills & Hours">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Skills (comma-separated)"><TextInput name="skills" defaultValue={skillsValue} placeholder="React, Node.js, MongoDB" /></Field>
          <Field label="Hours"><TextInput name="hours" type="number" defaultValue={String(fm.hours || '')} /></Field>
        </div>
      </FormSection>
      <FormSection title="Certificate">
        <Field label="Certificate URL"><TextInput name="certificateUrl" defaultValue={fm.certificateUrl as string} placeholder="https://..." /></Field>
      </FormSection>
      <FormSection title="Content (MDX)">
        <Field label="MDX Body"><TextArea name="body" defaultValue={internship?.body || ''} rows={10} className="font-mono text-xs leading-relaxed" /></Field>
      </FormSection>
      {state?.error && <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">! ERROR — {state.error}</div>}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={internship ? 'Save Changes' : 'Create Internship'} />
        <CancelButton href="/admin/internships" />
      </div>
    </form>
  )
}
