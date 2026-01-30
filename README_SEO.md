# 🚀 Guía de SEO - Portal Culture

## ✅ Implementado

### 1. **Infraestructura Básica**
- ✅ `robots.txt` - Configurado para permitir crawling
- ✅ `sitemap.xml` - Dinámico con Next.js
- ✅ `manifest.json` - PWA ready
- ✅ Structured Data (JSON-LD) - Organization, Website, Educational

### 2. **Metadata Avanzada**
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards (large image)
- ✅ Canonical URLs
- ✅ Keywords optimizados
- ✅ Metadata específica por página

### 3. **Performance**
- ✅ Image optimization (AVIF, WebP)
- ✅ Compression activada
- ✅ Headers de seguridad y cache
- ✅ DNS prefetch para fonts
- ✅ Preload de recursos críticos

### 4. **Rich Snippets**
- ✅ Offer Schema (página /acceso)
- ✅ FAQ Schema (ready to use)
- ✅ Course Schema (template creado)
- ✅ Breadcrumb Schema (template creado)

### 5. **Analytics & Tracking**
- ✅ Helper de analytics creado
- ✅ Event tracking en CTAs
- ⏳ Implementar Google Analytics ID

---

## 🎯 Próximos Pasos (Cuando tengas dominio custom)

### 1. **Cambiar URLs**
En `lib/seo-config.ts`, cambia:
```typescript
siteUrl: 'https://portalculture.com', // Tu dominio real
```

En `app/sitemap.ts`, actualiza el baseUrl.

### 2. **Verificación de Propietarios**
- [ ] Google Search Console
- [ ] Bing Webmaster Tools
- [ ] Añadir códigos en `layout.tsx` → `verification`

### 3. **Google Analytics**
```bash
# Añadir a .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Luego en `layout.tsx`:
```tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
    <script dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `
    }} />
  </>
)}
```

### 4. **Crear Imágenes para Social Media**
- [ ] `/public/og-image.jpg` (1200x630px) - Open Graph
- [ ] `/public/twitter-image.jpg` (1200x600px) - Twitter Card
- [ ] Usar logo + tagline premium
- [ ] Fondo negro con efectos glassmorphism

**Recomendación**: Usa Figma o Canva con estas specs:
- 1200x630px para Open Graph
- Texto grande y legible
- Logo de Portal Culture
- Tagline: "Entra al Portal. Cambia tu Vida"
- Fondo negro premium con elementos visuales

### 5. **Actualizar Social Media**
En `lib/seo-config.ts`:
```typescript
twitter: '@tu_handle_real',
instagram: '@tu_handle_real',
```

Añade en `sameAs`:
```typescript
sameAs: [
  'https://instagram.com/portalculture',
  'https://twitter.com/portalculture',
  'https://tiktok.com/@portalculture',
  'https://youtube.com/@portalculture',
],
```

---

## 📊 Cómo Verificar el SEO

### 1. **Google Search Console**
1. Ve a https://search.google.com/search-console
2. Añade tu dominio
3. Verifica propiedad (meta tag o DNS)
4. Envía sitemap: `https://tudominio.com/sitemap.xml`

### 2. **Testing Tools**

**Rich Results Test**
```
https://search.google.com/test/rich-results
```
Pega tu URL y verifica que los schemas se detecten.

**PageSpeed Insights**
```
https://pagespeed.web.dev/
```
Objetivo: >90 en móvil y desktop.

**Open Graph Debugger**
```
https://www.opengraph.xyz/
```
Verifica cómo se ve al compartir en redes.

**Twitter Card Validator**
```
https://cards-dev.twitter.com/validator
```
Verifica preview de Twitter.

### 3. **Comandos Útiles**

Verificar robots.txt:
```
curl https://portalculture.vercel.app/robots.txt
```

Verificar sitemap:
```
curl https://portalculture.vercel.app/sitemap.xml
```

Verificar metadata:
```bash
curl -s https://portalculture.vercel.app | grep -i "meta.*og:"
```

---

## 🎨 Keywords Principal

### Primarias (Alta Prioridad)
- portal culture
- comunidad desarrollo personal
- transformación personal jóvenes
- cursos premium desarrollo personal
- coach personal AI

### Secundarias
- networking jóvenes ambiciosos
- comunidad exclusiva emprendedores
- formación premium online
- NOVA AI coach
- templos conocimiento

### Long-tail (Conversión)
- "cómo mejorar mi vida personal"
- "comunidad exclusiva desarrollo personal españa"
- "cursos premium transformación personal"
- "AI coach personalizado"
- "unirse comunidad emprendedores"

---

## 📝 Contenido para SEO (Recomendaciones)

### Blog Posts Futuros
1. **"Los 5 Pilares del Desarrollo Personal" (Templos)**
   - Keywords: desarrollo personal, crecimiento personal
   - Link interno a cada templo

2. **"Cómo la IA Puede Acelerar tu Transformación Personal"**
   - Keywords: AI coach, transformación personal con IA
   - Link a NOVA

3. **"Por Qué las Comunidades Exclusivas Funcionan"**
   - Keywords: comunidad exclusiva, networking premium
   - Link a /acceso

4. **"De la Procrastinación a la Acción: Guía Completa"**
   - Keywords: productividad, hábitos, desarrollo personal
   - CTA a unirse

### Landing Pages Adicionales
- `/templos` - Overview de los 5 templos
- `/nova` - Página dedicada al AI Coach
- `/comunidad` - Casos de éxito, testimonios
- `/recursos` - Contenido gratuito (lead magnet)

---

## 🔗 Link Building Strategy

### Interno
- Cada sección debe linkar a `/acceso`
- Blog posts interlinkeados
- Breadcrumbs en todas las páginas

### Externo (Cuando tengas dominio)
1. **Guest Posts**
   - Blogs de desarrollo personal
   - Comunidades de emprendedores
   - Medios especializados

2. **Colaboraciones**
   - Podcasts de crecimiento personal
   - YouTubers de productividad
   - Influencers de desarrollo personal

3. **Directorios**
   - Product Hunt
   - Indie Hackers
   - Reddit (r/selfimprovement, r/productivity)

4. **Press Release**
   - Lanzamiento oficial de Portal Culture
   - Milestone: 100, 500, 1000 miembros

---

## 🚨 Checklist Pre-Launch

### Técnico
- [ ] Dominio custom configurado
- [ ] SSL activo (HTTPS)
- [ ] Google Search Console verificado
- [ ] Google Analytics instalado
- [ ] Sitemap enviado a Google
- [ ] Robots.txt accesible

### Contenido
- [ ] og-image.jpg creado (1200x630)
- [ ] twitter-image.jpg creado (1200x600)
- [ ] Favicons generados (todos los tamaños)
- [ ] Metadata revisada en todas las páginas
- [ ] Alt text en todas las imágenes
- [ ] H1, H2, H3 correctamente estructurados

### Social
- [ ] Cuentas de redes sociales creadas
- [ ] Handles actualizados en seo-config.ts
- [ ] Open Graph testeado
- [ ] Twitter Cards testeado

### Performance
- [ ] Lighthouse score >90
- [ ] Core Web Vitals en verde
- [ ] Imágenes optimizadas (WebP/AVIF)
- [ ] Lazy loading implementado

---

## 📈 Métricas a Monitorear

### Search Console
- Impresiones
- Clicks
- CTR
- Posición promedio
- Keywords que rankean

### Analytics
- Tráfico orgánico
- Bounce rate
- Tiempo en página
- Conversión de visitas a /acceso
- Fuentes de tráfico

### Conversión
- % visitantes que ven /acceso
- % que hacen click en "Acceso Inmediato"
- % que completan Typeform
- Tasa de aprobación waitlist

---

## 💡 Tips Avanzados

### 1. **Contenido Dinámico**
Cuando tengas blog, usa:
```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    path: `/blog/${params.slug}`,
  })
}
```

### 2. **Imagen por Defecto Dinámica**
Genera OG images on-the-fly con Vercel OG:
```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Portal Culture'
  
  return new ImageResponse(
    (
      <div style={{ /* tu diseño */ }}>
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

### 3. **Internacionalización (Futuro)**
Si expandes a otros idiomas:
```typescript
// next.config.js
i18n: {
  locales: ['es', 'en'],
  defaultLocale: 'es',
},
```

---

## 🎯 Objetivos SEO 3 Meses

### Mes 1
- [ ] 100 impresiones/día en Search Console
- [ ] 10+ keywords indexadas
- [ ] Top 3 páginas rankeando en Top 50

### Mes 2
- [ ] 500 impresiones/día
- [ ] 50+ keywords indexadas
- [ ] Top 5 páginas en Top 20

### Mes 3
- [ ] 1000+ impresiones/día
- [ ] 100+ keywords indexadas
- [ ] Página principal en Top 10 para "portal culture"
- [ ] 5-10% CTR orgánico

---

**Última actualización**: Enero 2025
**Responsable**: Portal Culture Team

¡El SEO es un maratón, no un sprint! 🚀
