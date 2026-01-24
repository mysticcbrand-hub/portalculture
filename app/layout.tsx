import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portal Culture - Entra al Portal. Cambia tu vida',
  description: 'La comunidad exclusiva donde jóvenes ambiciosos se transforman. Desafíos, formación premium, y conexiones que aceleran tu crecimiento.',
  keywords: 'comunidad exclusiva, networking, cursos premium, desarrollo personal, jóvenes ambiciosos, portal culture',
  authors: [{ name: 'Portal Culture' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Preload intro videos for instant playback */}
        <link rel="preload" href="/logo-3d-mobile.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/logo-3d.mp4" as="video" type="video/mp4" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
