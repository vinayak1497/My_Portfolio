'use client'

import { useActionState } from 'react'
import { createLeadership, updateLeadership } from './actions'
import { Field, TextInput, TextArea, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import type { MdxDocument } from '@/lib/content-manager'

export function LeadershipForm({ leadership }: { leadership?: MdxDocument }) {
  const action = leadership ? updateLeadership : createLeadership
  const fm = leadership?.frontmatter || {}
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <form action={formAction} className="space-y-6">
      {leadership && <input type="hidden" name="originalSlug" value={leadership.slug} />}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><TextInput name="title" defaultValue={fm.title as string} required /></Field>
          <Field label="Slug"><TextInput name="slug" defaultValue={fm.slug as string} /></Field>
          <Field label="Organization"><TextInput name="organization" defaultValue={fm.organization as string} required /></Field>
          <Field label="Role"><TextInput name="role" defaultValue={fm.role as string} /></Field>
        </div>
      </FormSection>
      <FormSection title="Timeline">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Start Date"><TextInput name="startDate" type="date" defaultValue={String(fm.startDate || '')} /></Field>
          <Field label="End Date (optional)"><TextInput name="endDate" type="date" defaultValue={String(fm.endDate || '')} /></Field>
        </div>
      </FormSection>
      <FormSection title="Impact & Metrics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Impact"><TextInput name="impact" defaultValue={fm.impact as string} placeholder="e.g. 500+ Lives Impacted" /></Field>
          <Field label="Initiative Type"><TextInput name="initiativeType" defaultValue={fm.initiativeType as string} placeholder="e.g. Technical Workshop" /></Field>
          <Field label="People Impacted"><TextInput name="peopleImpacted" type="number" defaultValue={String(fm.peopleImpacted || '')} /></Field>
          <Field label="Events Conducted"><TextInput name="eventsConducted" type="number" defaultValue={String(fm.eventsConducted || '')} /></Field>
          <Field label="Volunteers Managed"><TextInput name="volunteersManaged" type="number" defaultValue={String(fm.volunteersManaged || '')} /></Field>
          <Field label="XP"><TextInput name="xp" type="number" defaultValue={String(fm.xp || '')} /></Field>
        </div>
      </FormSection>
      <FormSection title="Content (MDX)">
        <Field label="MDX Body"><TextArea name="body" defaultValue={leadership?.body || ''} rows={10} className="font-mono text-xs leading-relaxed" /></Field>
      </FormSection>
      {state?.error && <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">! ERROR — {state.error}</div>}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={leadership ? 'Save Changes' : 'Create Leadership'} />
        <CancelButton href="/admin/leadership" />
      </div>
    </form>
  )
}
