'use client'

import { useActionState } from 'react'
import { createHackathon, updateHackathon } from './actions'
import { Field, TextInput, TextArea, Select, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import type { MdxDocument } from '@/lib/content-manager'

const categories = ['Regional', 'State', 'National', 'International']

export function HackathonForm({ hackathon }: { hackathon?: MdxDocument }) {
  const action = hackathon ? updateHackathon : createHackathon
  const fm = hackathon?.frontmatter || {}
  const [state, formAction, pending] = useActionState(action, undefined)

  const technologiesValue = Array.isArray(fm.technologies) ? (fm.technologies as string[]).join(', ') : (fm.technologies as string || '')

  return (
    <form action={formAction} className="space-y-6">
      {hackathon && <input type="hidden" name="originalSlug" value={hackathon.slug} />}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><TextInput name="title" defaultValue={fm.title as string} required /></Field>
          <Field label="Slug"><TextInput name="slug" defaultValue={fm.slug as string} /></Field>
          <Field label="Position"><TextInput name="position" defaultValue={fm.position as string} required placeholder="Winner, Finalist, Top 15..." /></Field>
          <Field label="Category">
            <Select name="category" defaultValue={fm.category as string || 'Regional'}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Project Name"><TextInput name="projectName" defaultValue={fm.projectName as string} /></Field>
          <Field label="Prize (optional)"><TextInput name="prize" defaultValue={fm.prize as string} placeholder="e.g. ₹10,000" /></Field>
        </div>
      </FormSection>
      <FormSection title="Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Team Size"><TextInput name="teamSize" type="number" min={1} defaultValue={String(fm.teamSize || '')} /></Field>
          <Field label="Date"><TextInput name="date" type="date" defaultValue={String(fm.date || '')} /></Field>
          <Field label="Technologies (comma-separated)" className="md:col-span-2"><TextInput name="technologies" defaultValue={technologiesValue} placeholder="Python, React, TensorFlow" /></Field>
        </div>
      </FormSection>
      <FormSection title="Content (MDX)">
        <Field label="MDX Body"><TextArea name="body" defaultValue={hackathon?.body || ''} rows={10} className="font-mono text-xs leading-relaxed" /></Field>
      </FormSection>
      {state?.error && <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">! ERROR — {state.error}</div>}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={hackathon ? 'Save Changes' : 'Create Hackathon'} />
        <CancelButton href="/admin/hackathons" />
      </div>
    </form>
  )
}
