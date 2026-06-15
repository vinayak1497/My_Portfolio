'use client'

import { useActionState } from 'react'
import { createProject, updateProject } from './actions'
import { Field, TextInput, TextArea, Checkbox, SubmitButton, CancelButton, FormSection } from '@/components/admin/AdminFormFields'
import { ImageUpload } from '@/components/admin/ImageUpload'
import type { MdxDocument } from '@/lib/content-manager'

interface ProjectFormProps {
  project?: MdxDocument
}

export function ProjectForm({ project }: ProjectFormProps) {
  const action = project ? updateProject : createProject
  const fm = project?.frontmatter || {}
  const stats = (fm.stats as Record<string, number>) || {}

  const [state, formAction, pending] = useActionState(action, undefined)
  const bodyValue = project?.body || ''

  return (
    <form action={formAction} className="space-y-6">
      {project && (
        <input type="hidden" name="originalSlug" value={project.slug} />
      )}

      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title">
            <TextInput
              name="title"
              defaultValue={fm.title as string}
              placeholder="My Awesome Project"
              required
            />
          </Field>
          <Field label="Slug (auto-generated from title)">
            <TextInput
              name="slug"
              defaultValue={fm.slug as string}
              placeholder="my-awesome-project"
            />
          </Field>
          <Field label="Category" className="md:col-span-2">
            <TextInput
              name="category"
              defaultValue={fm.category as string}
              placeholder="e.g. AgriTech / IoT"
              required
            />
          </Field>
          <Field label="Description" className="md:col-span-2">
            <TextArea
              name="description"
              defaultValue={fm.description as string}
              placeholder="Brief project description..."
              rows={3}
              required
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Metadata">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Level (1-100)">
            <TextInput
              name="level"
              type="number"
              min={1}
              max={100}
              defaultValue={String(fm.level || 50)}
            />
          </Field>
          <Field label="Date">
            <TextInput
              name="date"
              type="date"
              defaultValue={String(fm.date || '')}
            />
          </Field>
          <Field label="Featured">
            <Checkbox
              name="featured"
              label="Mark as featured project"
              defaultChecked={!!fm.featured}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Tech Stack">
        <Field label="Technologies (comma-separated)">
          <TextInput
            name="techStack"
            defaultValue={(fm.techStack as string[])?.join(', ') || ''}
            placeholder="Python, MQTT, Vue.js, TensorFlow"
          />
        </Field>
      </FormSection>

      <FormSection title="Links & Media">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="GitHub URL">
            <TextInput
              name="githubUrl"
              defaultValue={fm.githubUrl as string}
              placeholder="https://github.com/..."
            />
          </Field>
          <Field label="Live URL">
            <TextInput
              name="liveUrl"
              defaultValue={fm.liveUrl as string}
              placeholder="https://..."
            />
          </Field>
          <Field label="Thumbnail Image" className="md:col-span-2">
            <TextInput
              name="thumbnail"
              defaultValue={fm.thumbnail as string}
              placeholder="https://res.cloudinary.com/..."
            />
          </Field>
          <Field label="Upload Thumbnail" className="md:col-span-2">
            <ImageUpload
              folder="portfolio/projects"
              onUpload={(url) => {
                const input = document.querySelector('input[name="thumbnail"]') as HTMLInputElement
                if (input) input.value = url
              }}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Stats">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Complexity (0-100)">
            <TextInput
              name="complexity"
              type="number"
              min={0}
              max={100}
              defaultValue={String(stats.complexity || 50)}
            />
          </Field>
          <Field label="Impact (0-100)">
            <TextInput
              name="impact"
              type="number"
              min={0}
              max={100}
              defaultValue={String(stats.impact || 50)}
            />
          </Field>
          <Field label="Innovation (0-100)">
            <TextInput
              name="innovation"
              type="number"
              min={0}
              max={100}
              defaultValue={String(stats.innovation || 50)}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Content (MDX)">
        <Field label="MDX Body">
          <TextArea
            name="body"
            defaultValue={bodyValue}
            placeholder="# Your project content here..."
            rows={15}
            className="font-mono text-xs leading-relaxed"
          />
        </Field>
      </FormSection>

      {state?.error && (
        <div className="font-mono text-[#ff0040] text-xs tracking-wider border border-[#ff0040]/30 bg-[#ff0040]/5 p-3">
          ! ERROR — {state.error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <SubmitButton pending={pending} label={project ? 'Save Changes' : 'Create Project'} />
        <CancelButton href="/admin/projects" />
      </div>
    </form>
  )
}
