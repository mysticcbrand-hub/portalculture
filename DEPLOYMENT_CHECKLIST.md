# 🚀 Checklist de Deployment - Portal Culture SEO

## Pre-Deployment (Antes de hacer git push)

### Assets Visuales
- [ ] **og-image.jpg** creado (1200x630px, <1MB)
- [ ] **twitter-image.jpg** creado (1200x600px, <1MB)
- [ ] Favicons generados:
  - [ ] favicon-16x16.png
  - [ ] favicon-32x32.png
  - [ ] apple-touch-icon.png (180x180px)
  - [ ] icon-192x192.png
  - [ ] icon-512x512.png
  - [ ] safari-pinned-tab.svg (opcional)
- [ ] Todas las imágenes optimizadas con TinyPNG

### Código
- [ ] Build exitoso: `npm run build` ✅
- [ ] No hay errores TypeScript
- [ ] No hay warnings importantes
- [ ] `.env.local` NO está en git (verificar .gitignore)

### SEO Files
- [ ] robots.txt accesible
- [ ] sitemap.xml generándose correctamente
- [ ] manifest.json válido
- [ ] Metadata en todas las páginas

---

## Deployment (Git + Vercel)

### 1. Commit y Push
```bash
cd ~/Desktop/pruebas

# Verificar cambios
git status

# Añadir archivos SEO
git add app/sitemap.ts
git add app/acceso/
git add lib/seo-config.ts
git add lib/analytics.ts
git add app/components/SchemaOrg.tsx
git add public/robots.txt
git add public/manifest.json
git add next.config.js
git add app/layout.tsx

# Si creaste las imágenes, añádelas
git add public/og-image.jpg
git add public/twitter-image.jpg
git add public/icons/

# Commit
git commit -m "feat: Implementación completa de SEO

- Metadata avanzada (Open Graph, Twitter Cards)
- Structured Data (JSON-LD)
- Sitemap.xml dinámico
- robots.txt optimizado
- Performance headers
- Analytics tracking ready
- Página /acceso con Offer Schema
"

# Push
git push origin main
```

### 2. Verificar Deploy en Vercel
- [ ] Build exitoso en Vercel Dashboard
- [ ] No hay errores en logs
- [ ] Deploy time < 3 minutos
- [ ] URL de producción actualizada

---

## Post-Deployment (Después del deploy)

### Testing en Producción

#### 1. URLs Básicas
- [ ] https://portalculture.vercel.app/ carga correctamente
- [ ] https://portalculture.vercel.app/acceso carga correctamente
- [ ] https://portalculture.vercel.app/robots.txt accesible
- [ ] https://portalculture.vercel.app/sitemap.xml accesible
- [ ] https://portalculture.vercel.app/manifest.json accesible

#### 2. Metadata
Abre DevTools (F12) y verifica en `<head>`:
- [ ] `<title>` correcto
- [ ] `<meta name="description">` presente
- [ ] `<meta property="og:title">` presente
- [ ] `<meta property="og:image">` apuntando a og-image.jpg
- [ ] `<meta name="twitter:card">` presente
- [ ] Canonical URL correcto

#### 3. Structured Data
- [ ] Abrir View Source
- [ ] Buscar `application/ld+json`
- [ ] Verificar que hay 3+ scripts JSON-LD
- [ ] Copiar un JSON y validar en https://validator.schema.org/

#### 4. Performance
```bash
# PageSpeed Insights
https://pagespeed.web.dev/

# Pega tu URL y verifica:
```
- [ ] Performance > 85 (móvil)
- [ ] Performance > 90 (desktop)
- [ ] Accessibility > 95
- [ ] Best Practices > 95
- [ ] SEO > 95

#### 5. Social Media Previews

**Facebook Debugger**
```
https://developers.facebook.com/tools/debug/
```
- [ ] Pegar URL principal
- [ ] Click "Scrape Again"
- [ ] Imagen og-image.jpg se ve correctamente
- [ ] Título y descripción correctos
- [ ] No hay errores

**Twitter Card Validator**
```
https://cards-dev.twitter.com/validator
```
- [ ] Pegar URL principal
- [ ] Preview Card se ve correctamente
- [ ] Imagen twitter-image.jpg carga
- [ ] Título y descripción correctos

**LinkedIn Post Inspector**
```
https://www.linkedin.com/post-inspector/
```
- [ ] Pegar URL principal
- [ ] Preview correcto
- [ ] Imagen y texto legibles

#### 6. Mobile Testing
- [ ] Abrir en móvil real (iPhone/Android)
- [ ] PWA installable (aparece "Add to Home Screen")
- [ ] Favicon se ve correctamente
- [ ] Scroll suave funciona
- [ ] CTAs fáciles de clickear

---

## Google Search Console (Cuando tengas dominio)

### Setup Inicial
1. [ ] Ir a https://search.google.com/search-console
2. [ ] Click "Añadir propiedad"
3. [ ] Seleccionar "Dominio"
4. [ ] Copiar TXT record
5. [ ] Añadir en configuración DNS de tu dominio
6. [ ] Verificar

### Después de Verificar
1. [ ] Enviar sitemap:
   - Ir a "Sitemaps"
   - Añadir: `sitemap.xml`
   - Click "Enviar"
   - Esperar 24-48h para indexación

2. [ ] URL Inspection:
   - Inspeccionar URL principal
   - Click "Solicitar indexación"
   - Repetir para /acceso

3. [ ] Configurar preferencias:
   - Propiedad preferida (con/sin www)
   - País de destino: España
   - Idioma: Español

---

## Google Analytics (Opcional pero recomendado)

### Setup
1. [ ] Ir a https://analytics.google.com
2. [ ] Crear cuenta y propiedad
3. [ ] Copiar ID: `G-XXXXXXXXXX`
4. [ ] Añadir a Vercel:
   ```
   Settings → Environment Variables
   NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
   ```
5. [ ] Redeploy
6. [ ] Verificar en GA real-time (navega tu sitio)

### Goals/Conversiones
- [ ] Crear evento: "click_premium_access"
- [ ] Crear evento: "click_waitlist"
- [ ] Crear evento: "completed_typeform"
- [ ] Configurar funnels de conversión

---

## Monitoring (Primera semana)

### Diario
- [ ] Check Vercel logs (errores?)
- [ ] Check Google Analytics (tráfico?)
- [ ] Check Search Console (indexación?)

### Semanal
- [ ] Revisar keywords rankeando
- [ ] Revisar CTR en Search Console
- [ ] Revisar páginas con más impresiones
- [ ] Ajustar titles/descriptions si es necesario

---

## Optimizaciones Futuras

### Contenido SEO
- [ ] Crear página `/templos` con overview
- [ ] Crear landing por templo:
  - [ ] `/templos/atenas` (Sabiduría)
  - [ ] `/templos/ares` (Fortaleza)
  - [ ] `/templos/apolo` (Salud)
  - [ ] `/templos/zeus` (Liderazgo)
  - [ ] `/templos/adonis` (Estética)
- [ ] Crear página `/nova` dedicada al AI Coach
- [ ] Blog section:
  - [ ] `/blog` (listing)
  - [ ] `/blog/[slug]` (posts individuales)

### Link Building
- [ ] Submit a directorios:
  - [ ] Product Hunt
  - [ ] Indie Hackers
  - [ ] Alternatives.so
- [ ] Guest posts en blogs de nicho
- [ ] Colaboraciones con influencers
- [ ] Press release

### Performance
- [ ] Implementar Incremental Static Regeneration
- [ ] Lazy loading de componentes pesados
- [ ] Optimizar imágenes a next/image
- [ ] Implementar Service Worker (PWA completo)

---

## Troubleshooting

### "og-image.jpg no se ve en Facebook"
1. Verificar que la imagen existe en `/public/og-image.jpg`
2. Verificar que el tamaño es 1200x630px
3. Ir a Facebook Debugger y "Scrape Again"
4. Cache puede tomar hasta 24h en limpiar

### "Sitemap no aparece en Search Console"
1. Verificar URL exacta: `https://tudominio.com/sitemap.xml`
2. Abrir sitemap en navegador (debe mostrar XML)
3. Esperar 24-48h después de enviar
4. Si error, revisar logs en Vercel

### "Performance score bajo"
1. Verificar que las imágenes están optimizadas
2. Check bundle size (should be <100KB per route)
3. Verificar que no hay console.logs en producción
4. Considerar dynamic imports para componentes pesados

### "Keywords no rankean"
1. **Paciencia**: SEO toma 2-3 meses mínimo
2. Verificar que Google ha indexado la página
3. Crear más contenido relevante
4. Conseguir backlinks de calidad

---

## Success Metrics

### Mes 1
- [ ] 100+ impresiones/día en Search Console
- [ ] 10+ páginas indexadas
- [ ] CTR > 2%
- [ ] 5+ keywords en Top 100

### Mes 2
- [ ] 500+ impresiones/día
- [ ] 20+ páginas indexadas
- [ ] CTR > 3%
- [ ] 10+ keywords en Top 50

### Mes 3
- [ ] 1000+ impresiones/día
- [ ] CTR > 5%
- [ ] "portal culture" en Top 10
- [ ] 20+ keywords en Top 20
- [ ] 50+ clicks orgánicos/día

---

## Contact & Support

**Desarrollador**: Portal Culture Team
**Email**: mysticcbrand@gmail.com

**Recursos**:
- README_SEO.md - Guía completa
- INSTRUCCIONES_IMAGENES_SEO.md - Crear assets
- SEO_IMPLEMENTATION_SUMMARY.md - Resumen técnico

---

## ✅ Estado Actual

```
[x] Infraestructura SEO completa
[x] Metadata optimizada
[x] Structured Data implementada
[x] Performance optimizado
[x] Analytics tracking ready
[ ] Imágenes sociales (pendiente)
[ ] Dominio custom (pendiente)
[ ] Google Search Console (pendiente)
```

**Next step**: Crear og-image.jpg y twitter-image.jpg, luego deploy! 🚀
