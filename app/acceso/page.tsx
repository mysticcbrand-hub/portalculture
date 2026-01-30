import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo-config'
import AccesoClient from './AccesoClient'

// SEO Metadata optimizada para conversión
export const metadata: Metadata = generatePageMetadata({
  title: 'Acceso Inmediato - Portal Culture',
  description: '¿Listo para transformarte? Únete a Portal Culture hoy. Acceso inmediato por solo 7€ o únete gratis a la lista de espera. 5 Templos, AI Coach, Discord exclusivo.',
  keywords: [
    'acceso portal culture',
    'unirse portal culture',
    'comunidad premium',
    'precio portal culture',
    'membresía desarrollo personal',
  ],
  path: '/acceso',
})

// Structured Data para Offer
const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  name: 'Acceso Inmediato Portal Culture',
  description: 'Acceso completo a la comunidad exclusiva de desarrollo personal con 5 templos, AI Coach y Discord privado',
  price: '7.00',
  priceCurrency: 'EUR',
  availability: 'https://schema.org/InStock',
  url: 'https://portalculture.vercel.app/acceso',
  seller: {
    '@type': 'Organization',
    name: 'Portal Culture',
  },
  itemOffered: {
    '@type': 'Service',
    name: 'Portal Culture Membership',
    description: 'Acceso de por vida a 5 cursos premium, AI Coach personalizado, comunidad Discord exclusiva',
  },
}

export default function AccesoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <AccesoClient />
    </>
  )
}
