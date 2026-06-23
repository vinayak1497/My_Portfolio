'use client'

import { useState } from 'react'
import { EmulatorWindow } from '@/components/shared/EmulatorWindow'
import { RetroButton } from '@/components/shared/RetroButton'
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { ContactPageJsonLd } from '@/components/shared/JsonLd'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const [statusMsg, setStatusMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        const data = await res.json()
        setStatus('error')
        setStatusMsg(data.error || 'Failed to send message.')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setStatusMsg('Network error. Please try again.')
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-6">
      <ContactPageJsonLd />

      <header className="mb-6 border-b-2 border-primary pb-3">
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase flex items-center gap-3">
          <Mail
            size={32}
            className="text-tertiary-container"
            aria-hidden="true"
          />
          Contact
        </h1>

        <p className="text-body-lg text-on-surface-variant mt-2">
          Establish communications with Trainer Vinayak. Submit query
          parameters below.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <EmulatorWindow
          title="COMMS_CONSOLE.exe"
          statusText={status.toUpperCase()}
        >
          {status === 'success' ? (
            <div className="p-8 text-center space-y-4">
              <div
                className="w-16 h-16 bg-secondary/10 text-secondary border-2 border-secondary flex items-center justify-center mx-auto rounded-sm animate-bounce"
                aria-hidden="true"
              >
                <CheckCircle2 size={36} />
              </div>

              <h2 className="font-mono text-headline-sm font-bold text-primary uppercase">
                COMMS CONNECTED!
              </h2>

              <p className="font-mono text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                Your message has been transmitted successfully. Trainer Vinayak
                will respond at his earliest convenience.
              </p>

              <div className="pt-2">
                <RetroButton
                  variant="primary"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Broadcast
                </RetroButton>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-4 md:p-6 space-y-4 font-mono text-xs"
            >
              {status === 'error' && (
                <div
                  className="p-3 border-2 border-secondary bg-red-50 text-secondary flex items-center gap-2 font-bold mb-4"
                  role="alert"
                >
                  <AlertCircle size={16} aria-hidden="true" />
                  <span>ERROR: {statusMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="font-bold text-primary block uppercase"
                  >
                    Trainer Name:
                  </label>

                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="ENTER YOUR NAME"
                    className="w-full px-3 py-2 border-2 border-primary bg-surface font-bold focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/30 uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="font-bold text-primary block uppercase"
                  >
                    Direct Address (Email):
                  </label>

                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="ENTER EMAIL ADDRESS"
                    className="w-full px-3 py-2 border-2 border-primary bg-surface font-bold focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/30 uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="font-bold text-primary block uppercase"
                >
                  Broadcast Frequency (Subject):
                </label>

                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                    })
                  }
                    placeholder="SELECT SUBJECT MATTER"
                    className="w-full px-3 py-2 border-2 border-primary bg-surface font-bold focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/30 uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="font-bold text-primary block uppercase"
                >
                  Telemetry Payload (Message):
                </label>

                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  placeholder="WRITE YOUR MESSAGE CONTEXT HERE..."
                  className="w-full px-3 py-2 border-2 border-primary bg-surface font-bold focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/30 uppercase resize-none"
                />
              </div>

              <div className="pt-2">
                <RetroButton
                  type="submit"
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={status === 'loading'}
                >
                  <Send size={14} aria-hidden="true" />
                  {status === 'loading'
                    ? 'TRANSMITTING...'
                    : 'TRANSMIT SIGNAL'}
                </RetroButton>
              </div>
            </form>
          )}
        </EmulatorWindow>
      </div>
    </div>
  )
}