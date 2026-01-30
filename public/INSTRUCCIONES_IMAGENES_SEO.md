# 🎨 Guía para Crear Imágenes SEO

## Imágenes Necesarias para Social Media

### 1. **og-image.jpg** (Open Graph - Facebook, LinkedIn, WhatsApp)
**Dimensiones**: 1200 x 630 px

**Contenido**:
- Logo de Portal Culture (centrado o arriba)
- Tagline: "Entra al Portal. Cambia tu Vida"
- Fondo negro (#000000) con efectos glassmorphism
- Elementos visuales premium (líneas, grids sutiles)
- Texto grande y legible (mínimo 40px)

**Herramientas**:
- Canva: https://www.canva.com/create/social-media/
- Figma: Template "Open Graph"
- Photoshop: 1200x630px, 72dpi

**Checklist**:
- [ ] Texto legible en móvil (preview en 300x157px)
- [ ] Logo visible y nítido
- [ ] Contraste alto (texto blanco sobre negro)
- [ ] Sin texto cortado en los bordes
- [ ] Peso < 1MB (optimizar con TinyPNG)

---

### 2. **twitter-image.jpg** (Twitter/X Cards)
**Dimensiones**: 1200 x 600 px (ratio 2:1)

**Contenido**:
- Similar al og-image pero más horizontal
- Logo de Portal Culture
- Tagline corto
- Handle @portalculture (cuando lo tengas)

**Diferencia con og-image**:
- Más ancho, menos alto
- Se ve mejor en timeline horizontal

---

### 3. **Favicons** (Iconos del navegador)

Ya tienes iconos en `/public/icons/`, pero verifica que tengas estos tamaños:

**Necesarios**:
- `favicon-16x16.png` (16x16px)
- `favicon-32x32.png` (32x32px)
- `apple-touch-icon.png` (180x180px)
- `safari-pinned-tab.svg` (vector, mono-color)
- `icon-192x192.png` (192x192px - Android)
- `icon-512x512.png` (512x512px - Android)

**Contenido**:
- Logo simplificado de Portal Culture
- Fondo transparente O negro
- Forma simple y reconocible

**Herramientas**:
- Favicon Generator: https://realfavicongenerator.net/
- Sube tu logo y descarga todos los tamaños

---

## Cómo Crear las Imágenes (Paso a Paso)

### Opción 1: Canva (Más Fácil)

1. **Ve a Canva**
   ```
   https://www.canva.com
   ```

2. **Crear diseño custom**
   - Click "Crear diseño"
   - Custom dimensions: 1200 x 630 px

3. **Diseño sugerido**:
   ```
   [Fondo Negro #000000]
   
   ┌─────────────────────────────────┐
   │                                 │
   │         [Logo Portal]           │
   │                                 │
   │   ENTRA AL PORTAL.              │
   │   CAMBIA TU VIDA.               │
   │                                 │
   │   La comunidad exclusiva donde  │
   │   jóvenes ambiciosos se         │
   │   transforman                   │
   │                                 │
   └─────────────────────────────────┘
   ```

4. **Elementos a añadir**:
   - Gradiente sutil (negro a gris oscuro)
   - Líneas decorativas (blancas, 10% opacity)
   - Efecto blur en algún elemento (glassmorphism)
   - Logo nítido y visible

5. **Exportar**:
   - Formato: JPG
   - Calidad: Alta
   - Nombre: `og-image.jpg`

6. **Repetir para Twitter**:
   - Cambiar dimensiones a 1200 x 600 px
   - Ajustar layout si es necesario
   - Exportar como `twitter-image.jpg`

---

### Opción 2: Figma (Más Control)

1. **Crear nuevo frame**: 1200 x 630 px

2. **Estructura de capas**:
   ```
   Frame (1200x630)
   ├── Background (Negro #000000)
   ├── Grain Texture (opcional, 5% opacity)
   ├── Gradiente (Radial, centro, blanco 5% opacity)
   ├── Grid Lines (opcional, decorativo)
   ├── Logo (PNG importado)
   ├── Título (Oswald Bold, 64px, white)
   └── Subtítulo (IBM Plex Mono, 24px, white 70%)
   ```

3. **Exportar**:
   - File → Export
   - Format: JPG
   - Quality: 90%

---

### Opción 3: IA (Rápido)

**Usa el logo actual y pide a ChatGPT/Claude**:
```
"Crea una imagen 1200x630px para Open Graph de Portal Culture.
Fondo negro premium, logo centrado, tagline 'Entra al Portal. Cambia tu Vida',
estilo glassmorphism minimalista"
```

Luego descarga y optimiza con TinyPNG.

---

## Ubicación Final

Una vez creadas, coloca las imágenes en:
```
public/
├── og-image.jpg          ← Open Graph
├── twitter-image.jpg     ← Twitter Card
└── icons/
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── safari-pinned-tab.svg
    ├── icon-192x192.png
    └── icon-512x512.png
```

---

## Verificación

Después de subir las imágenes:

1. **Facebook Debugger**
   ```
   https://developers.facebook.com/tools/debug/
   ```
   Pega tu URL y click "Scrape Again"

2. **Twitter Card Validator**
   ```
   https://cards-dev.twitter.com/validator
   ```
   Verifica que se vea correctamente

3. **LinkedIn Inspector**
   ```
   https://www.linkedin.com/post-inspector/
   ```
   Valida el preview

---

## Template de Texto Sugerido

### Para og-image.jpg:
```
PORTAL CULTURE

Entra al Portal.
Cambia tu Vida.

La comunidad exclusiva donde
jóvenes ambiciosos se transforman
```

### Para twitter-image.jpg:
```
PORTAL CULTURE

Transformación Real. Comunidad Premium.

5 Templos | AI Coach | Discord
```

---

## Herramientas de Optimización

Después de crear las imágenes:

1. **TinyPNG** - Reduce peso sin perder calidad
   ```
   https://tinypng.com
   ```

2. **Squoosh** - Convertir a WebP/AVIF
   ```
   https://squoosh.app
   ```

3. **ImageOptim** (Mac) - Optimización local
   ```
   brew install --cask imageoptim
   ```

---

## Checklist Final

Antes de deployar:

- [ ] og-image.jpg existe (1200x630, < 1MB)
- [ ] twitter-image.jpg existe (1200x600, < 1MB)
- [ ] Todos los favicons generados
- [ ] Imágenes optimizadas (TinyPNG)
- [ ] Texto legible en preview pequeño
- [ ] Logo visible y nítido
- [ ] Testear en Facebook Debugger
- [ ] Testear en Twitter Validator
- [ ] Deploy a Vercel
- [ ] Verificar en producción

---

¿Necesitas ayuda con el diseño? Puedo:
1. Generarte un prompt detallado para IA
2. Explicarte paso a paso en Canva
3. Darte un template de Figma

¡Las imágenes son CRÍTICAS para SEO en redes sociales! 🎨
