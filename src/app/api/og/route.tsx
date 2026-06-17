import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Vinayak Kundar'
    const category = searchParams.get('category') || 'PORTFOLIO'

    const [ibmBold, spaceMono] = await Promise.all([
      fetch(
        'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdvfu.woff'
      ).then((res) => res.arrayBuffer()).catch(() => null),
      fetch(
        'https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRYEF8RXi4EwQ.woff'
      ).then((res) => res.arrayBuffer()).catch(() => null),
    ])

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#06241f',
            fontFamily: '"IBM Plex Sans", sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.08) 50%)',
              backgroundSize: '100% 4px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              background: '#1e3a34',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              right: 16,
              bottom: 16,
              border: '2px solid #aecdc4',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 80px',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 18,
                color: '#ae2f33',
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: 12,
                textTransform: 'uppercase',
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: '#fff8f1',
                textAlign: 'center',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                maxWidth: 800,
                fontFamily: '"Space Mono", monospace',
                textTransform: 'uppercase',
              }}
            >
              {title.length > 60 ? title.substring(0, 60) + '...' : title}
            </div>
            <div
              style={{
                width: 100,
                height: 3,
                background: '#ae2f33',
                marginTop: 24,
                marginBottom: 24,
              }}
            />
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 16,
                color: '#86a49c',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              VK_OS v1.0 — VINAYAK KUNDAR
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: '#ae2f33',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'IBM Plex Sans',
            data: ibmBold || new ArrayBuffer(0),
            weight: 700,
            style: 'normal',
          },
          {
            name: 'Space Mono',
            data: spaceMono || new ArrayBuffer(0),
            weight: 400,
            style: 'normal',
          },
        ],
      }
    )
  } catch {
    return new Response('Failed to generate OG image', { status: 500 })
  }
}
