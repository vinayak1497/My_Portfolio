import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Safe initialization of Resend client
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long' },
        { status: 400 }
      )
    }

    console.log('[CONTACT FORM SUBMISSION]', {
      name,
      email,
      subject,
      message,
    })

    if (resend) {
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',

        // Your inbox
        to: 'vinayak.kundar.official@gmail.com',

        // Allows direct reply from Gmail
        replyTo: email,

        subject: `🚀 Portfolio Contact | ${subject}`,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
            <h2 style="color:#2563eb;">
              New Portfolio Contact Submission
            </h2>

            <hr />

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>

            <hr />

            <h3>Message</h3>

            <div style="
              padding:16px;
              background:#f8fafc;
              border-left:4px solid #2563eb;
              white-space:pre-wrap;
            ">
              ${message}
            </div>

            <hr />

            <p style="font-size:12px;color:#666;">
              Sent from Vinayak Kundar Portfolio Contact Form
            </p>
          </div>
        `,
      })

      if (error) {
        console.error('Resend Error:', error)

        return NextResponse.json(
          { error: error.message || 'Failed to send email' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        data,
      })
    }

    // Resend API key not configured
    console.error(
      'RESEND_API_KEY is not configured. Email not sent.'
    )

    return NextResponse.json(
      {
        error:
          'Email service is not configured. Please set RESEND_API_KEY.',
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('Contact API Error:', error)

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal Server Error',
      },
      { status: 500 }
    )
  }
}