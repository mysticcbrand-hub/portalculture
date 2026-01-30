// Componente reutilizable para Schema.org JSON-LD
// Mejora los Rich Snippets en Google

interface SchemaOrgProps {
  type: 'Course' | 'FAQPage' | 'Product' | 'BreadcrumbList'
  data: any
}

export default function SchemaOrg({ type, data }: SchemaOrgProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Schemas predefinidos para Portal Culture
export const schemas = {
  // Para página de cursos individual
  course: (courseName: string, description: string, imageUrl: string) => ({
    name: courseName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Portal Culture',
      sameAs: 'https://portalculture.vercel.app',
    },
    image: imageUrl,
    offers: {
      '@type': 'Offer',
      category: 'Personal Development',
      price: '7.00',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }),

  // Para FAQ en página de acceso
  faq: (questions: Array<{ question: string; answer: string }>) => ({
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }),

  // Para breadcrumbs (navegación)
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
}
