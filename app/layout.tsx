import type { Metadata, Viewport } from 'next'
import './globals.css'
import PageTransition from '@/components/PageTransition'
import { seoConfig } from '@/lib/seo-config'

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: seoConfig.siteUrl,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    siteName: seoConfig.siteName,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: seoConfig.defaultTitle,
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: seoConfig.twitter,
    creator: seoConfig.twitter,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: ['/twitter-image.jpg'],
  },
  
  // PWA & Mobile
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: seoConfig.siteName,
  },
  
  // Verification (añadir cuando tengas las cuentas)
  verification: {
    google: 'tu-codigo-google-search-console',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
  
  // Canonical
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  
  // Additional
  category: 'Education',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: seoConfig.brandColor,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD Structured Data
  const organizationSchema = JSON.stringify(seoConfig.organization)
  const websiteSchema = JSON.stringify(seoConfig.website)
  const educationalSchema = JSON.stringify(seoConfig.educationalOrganization)

  return (
    <html lang="es">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/logo-3d.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/FONDO_HERO.jpg" as="image" />
        
        {/* DNS Prefetch & Preconnect */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Favicons - Multi-size for all devices */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#000000" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: educationalSchema }}
        />
      </head>
      <body>
        <PageTransition />
        {children}
      </body>
    </html>
  )
}
