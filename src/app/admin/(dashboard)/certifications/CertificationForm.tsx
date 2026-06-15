'use client'

import { useActionState, useState } from 'react'
import { createCertification, updateCertification } from './actions'
import { Field, TextInput, TextArea, Select, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import { ImageUpload } from '@/components/admin/ImageUpload'
import type { MdxDocument } from '@/lib/content-manager'

const rarities = ['common', 'rare', 'epic', 'legendary']
const categories = ['certification', 'workshop', 'seminar', 'internship', 'hackathon', 'achievement']

export function CertificationForm({ certification }: { certification?: MdxDocument }) {
  const action = certification ? updateCertification : createCertification
  const fm = certification?.frontmatter || {}
  const [state, formAction, pending] = useActionState(action, undefined)

  const [pdfUrl, setPdfUrl] = useState(String(fm.pdfUrl || ''))
  const skillsValue = Array.isArray(fm.skills) ? (fm.skills as string[]).join(', ') : (fm.skills as string || '')

  return (
    <form action={formAction} className="space-y-6">
      {certification && <input type="hidden" name="originalSlug" value={certification.slug} />}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><TextInput name="title" defaultValue={fm.title as string} required /></Field>
          <Field label="Slug"><TextInput name="slug" defaultValue={fm.slug as string} /></Field>
          <Field label="Issuer"><TextInput name="issuer" defaultValue={fm.issuer as string} required /></Field>
          <Field label="Rarity">
            <Select name="rarity" defaultValue={fm.rarity as string || 'common'}>
              {rarities.map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
            </Select>
          </Field>
          <Field label="Category">
            <Select name="category" defaultValue={fm.category as string || 'certification'}>
              {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </Select>
          </Field>
          <Field label="Issue Date"><TextInput name="date" type="date" defaultValue={String(fm.date || '')} /></Field>
        </div>
      </FormSection>
      <FormSection title="Skills & Hours">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Skills (comma-separated)"><TextInput name="skills" defaultValue={skillsValue} placeholder="Cloud Computing, GCP, AI" /></Field>
          <Field label="Hours"><TextInput name="hours" type="number" defaultValue={String(fm.hours || '')} /></Field>
        </div>
      </FormSection>
      <FormSection title="PDF Upload">
        <div className="space-y-4">
          <Field label="Upload Certificate PDF">
            <ImageUpload
              currentUrl={pdfUrl}
              folder="portfolio/certifications"
              label="Choose PDF File"
              accept=".pdf,application/pdf"
              onUpload={(url) => setPdfUrl(url)}
            />
          </Field>
          <input type="hidden" name="pdfUrl" value={pdfUrl} />
        </div>
      </FormSection>

      <FormSection title="Credentials & Media">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Credential ID"><TextInput name="credentialId" defaultValue={fm.credentialId as string} /></Field>
          <Field label="Credential URL"><TextInput name="credentialUrl" defaultValue={fm.credentialUrl as string} /></Field>
          <Field label="Image URL"><TextInput name="imageUrl" defaultValue={fm.imageUrl as string} /></Field>
        </div>
      </FormSection>
      <FormSection title="Content (MDX)">
        <Field label="MDX Body"><TextArea name="body" defaultValue={certification?.body || ''} rows={10} className="font-mono text-xs leading-relaxed" /></Field>
      </FormSection>
      {state?.error && <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">! ERROR — {state.error}</div>}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={certification ? 'Save Changes' : 'Create Certification'} />
        <CancelButton href="/admin/certifications" />
      </div>
    </form>
  )
}
