// SEO Configuration for Portal Culture
// Centraliza toda la configuración de SEO para fácil mantenimiento

export const seoConfig = {
  // Información base
  siteName: 'Portal Culture',
  siteUrl: 'https://portalculture.vercel.app', // Cambiar cuando tengas dominio custom
  defaultTitle: 'Portal Culture - Entra al Portal. Cambia tu Vida',
  defaultDescription: 'La comunidad exclusiva donde jóvenes ambiciosos se transforman. Desafíos, formación premium, y conexiones que aceleran tu crecimiento personal.',
  
  // Social Media
  twitter: '@portalculture', // Cambiar por tu handle real
  instagram: '@portalculture', // Cambiar por tu handle real
  
  // Brand Identity
  brandColor: '#000000',
  accentColor: '#FFFFFF',
  
  // Imágenes por defecto (Open Graph, Twitter Cards)
  defaultOgImage: '/og-image.jpg', // Crear esta imagen
  defaultTwitterImage: '/twitter-image.jpg', // Crear esta imagen
  
  // Keywords principales
  keywords: [
    'comunidad exclusiva',
    'desarrollo personal',
    'crecimiento personal',
    'jóvenes ambiciosos',
    'formación premium',
    'networking profesional',
    'cursos de desarrollo personal',
    'coach personal AI',
    'transformación personal',
    'comunidad de emprendedores',
    'portal culture',
    'templos de conocimiento',
    'atenas ares apolo zeus adonis',
    'NOVA AI coach',
  ],
  
  // Structured Data
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Portal Culture',
    url: 'https://portalculture.vercel.app',
    logo: 'https://portalculture.vercel.app/logo-3d-frame.png',
    sameAs: [
      // Añadir tus redes sociales reales
      'https://instagram.com/portalculture',
      'https://twitter.com/portalculture',
      // 'https://linkedin.com/company/portalculture',
      // 'https://youtube.com/@portalculture',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'mysticcbrand@gmail.com',
      contactType: 'Customer Service',
      availableLanguage: ['Spanish', 'English'],
    },
  },
  
  // WebSite Schema
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Portal Culture',
    url: 'https://portalculture.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://portalculture.vercel.app/buscar?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
  
  // EducationalOrganization Schema
  educationalOrganization: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Portal Culture',
    description: 'Comunidad exclusiva de desarrollo personal con cursos premium, AI Coach y networking.',
    url: 'https://portalculture.vercel.app',
    logo: 'https://portalculture.vercel.app/logo-3d-frame.png',
    offers: {
      '@type': 'Offer',
      category: 'Personal Development',
      priceCurrency: 'EUR',
      price: '7.00',
      availability: 'https://schema.org/InStock',
      url: 'https://portalculture.vercel.app/acceso',
    },
  },
}

// Helper para generar metadata de páginas
export function generatePageMetadata({
  title,
  description,
  keywords,
  ogImage,
  twitterImage,
  path = '',
  noIndex = false,
}: {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  twitterImage?: string
  path?: string
  noIndex?: boolean
}) {
  const pageTitle = title 
    ? `${title} | ${seoConfig.siteName}` 
    : seoConfig.defaultTitle
    
  const pageDescription = description || seoConfig.defaultDescription
  const pageKeywords = keywords 
    ? [...seoConfig.keywords, ...keywords] 
    : seoConfig.keywords
  const pageUrl = `${seoConfig.siteUrl}${path}`
  const pageOgImage = ogImage || seoConfig.defaultOgImage
  const pageTwitterImage = twitterImage || ogImage || seoConfig.defaultTwitterImage

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.join(', '),
    authors: [{ name: seoConfig.siteName }],
    creator: seoConfig.siteName,
    publisher: seoConfig.siteName,
    
    // Robots
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    
    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: seoConfig.siteName,
      images: [
        {
          url: pageOgImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitter,
      creator: seoConfig.twitter,
      title: pageTitle,
      description: pageDescription,
      images: [pageTwitterImage],
    },
    
    // Canonical
    alternates: {
      canonical: pageUrl,
    },
    
    // Additional
    metadataBase: new URL(seoConfig.siteUrl),
  }
}
