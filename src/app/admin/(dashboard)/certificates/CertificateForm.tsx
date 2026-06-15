'use client'

import { useActionState, useState } from 'react'
import { createCertificate, updateCertificate } from './actions'
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import { ImageUpload } from '@/components/admin/ImageUpload'
import type { MdxDocument } from '@/lib/content-manager'

const categories = ['certification', 'internship', 'workshop', 'seminar', 'hackathon', 'achievement']

export function CertificateForm({ certificate }: { certificate?: MdxDocument }) {
  const action = certificate ? updateCertificate : createCertificate
  const fm = certificate?.frontmatter || {}
  const [state, formAction, pending] = useActionState(action, undefined)

  const [pdfUrl, setPdfUrl] = useState(String(fm.certificatePdfUrl || ''))
  const thumbnailUrl = String(fm.thumbnailUrl || '')
  const issuer = String(fm.issuer || '')
  const skillsValue = Array.isArray(fm.skills) ? (fm.skills as string[]).join(', ') : (fm.skills as string || '')

  const pdfFolder = issuer ? `portfolio/certificates/${issuer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}` : 'portfolio/certificates'

  return (
    <form action={formAction} className="space-y-6">
      {certificate && <input type="hidden" name="originalSlug" value={certificate.slug} />}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><TextInput name="title" defaultValue={fm.title as string} required /></Field>
          <Field label="Slug"><TextInput name="slug" defaultValue={fm.slug as string} /></Field>
          <Field label="Issuer"><TextInput name="issuer" defaultValue={issuer} required /></Field>
          <Field label="Category">
            <Select name="category" defaultValue={String(fm.category || 'certification')}>
              {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </Select>
          </Field>
          <Field label="Issue Date"><TextInput name="issueDate" type="date" defaultValue={String(fm.issueDate || '')} /></Field>
        </div>
      </FormSection>

      <FormSection title="Skills & Hours">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Skills (comma-separated)"><TextInput name="skills" defaultValue={skillsValue} placeholder="Cloud Computing, AWS, Python" /></Field>
          <Field label="Hours"><TextInput name="hours" type="number" defaultValue={String(fm.hours || '')} /></Field>
        </div>
      </FormSection>

      <FormSection title="PDF Upload">
        <div className="space-y-4">
          <Field label="Upload Certificate PDF">
            <ImageUpload
              currentUrl={pdfUrl}
              folder={pdfFolder}
              label="Choose PDF File"
              accept=".pdf,application/pdf"
              onUpload={(url) => setPdfUrl(url)}
            />
          </Field>
          <input type="hidden" name="certificatePdfUrl" value={pdfUrl} />
          <Field label="Thumbnail URL (optional, Cloudinary generates)">
            <TextInput name="thumbnailUrl" defaultValue={thumbnailUrl} placeholder="Auto-generated thumbnail URL" />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Credentials">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Credential ID"><TextInput name="credentialId" defaultValue={fm.credentialId as string} /></Field>
          <Field label="Verification URL"><TextInput name="verificationUrl" defaultValue={fm.verificationUrl as string} /></Field>
        </div>
      </FormSection>

      <FormSection title="Visibility">
        <div className="flex gap-6">
          <Checkbox name="featured" label="Featured Certificate" defaultChecked={fm.featured === true} />
          <Checkbox name="published" label="Published" defaultChecked={fm.published !== false} />
        </div>
      </FormSection>

      <FormSection title="Content (MDX)">
        <Field label="MDX Body">
          <TextArea name="body" defaultValue={certificate?.body || ''} rows={8} className="font-mono text-xs leading-relaxed" />
        </Field>
      </FormSection>

      {state?.error && <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">! ERROR — {state.error}</div>}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={certificate ? 'Save Changes' : 'Create Certificate'} />
        <CancelButton href="/admin/certificates" />
      </div>
    </form>
  )
}
