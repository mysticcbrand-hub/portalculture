# 🎨 Prompts para Generar Imágenes SEO con IA

Si quieres usar IA (ChatGPT, Midjourney, DALL-E, etc.) para generar las imágenes, usa estos prompts optimizados:

---

## 📱 og-image.jpg (Open Graph - 1200x630px)

### Prompt Recomendado:

```
Create a premium social media preview image, 1200x630px, for "Portal Culture" - an exclusive personal development community.

Design specifications:
- Pure black background (#000000)
- Minimalist and premium aesthetic
- Glass morphism effects (subtle frosted glass elements)
- Central focus: "PORTAL CULTURE" logo/wordmark in white, modern sans-serif font
- Below logo: "Entra al Portal. Cambia tu Vida." in elegant typography
- Subtle grid lines or geometric patterns in white with 5-10% opacity
- Clean, modern, luxurious feel
- High contrast: white text on black background
- Leave 50px margin on all sides (safe zone)
- Style: Ultra-minimalist, premium, Apple-like design
- No photos, no people, pure typography and geometric elements

Color palette:
- Primary: #000000 (background)
- Secondary: #FFFFFF (text and accents)
- Subtle gradients: white with 5% opacity for depth

The image should look expensive, exclusive, and professional. Think Apple, Tesla, or luxury tech brand aesthetic.
```

### Prompt Alternativo (Más Simple):

```
Design a minimalist Open Graph image (1200x630px) for "Portal Culture" personal development community.

Requirements:
- Solid black background
- "PORTAL CULTURE" in large white bold text, centered
- Tagline below: "Entra al Portal. Cambia tu Vida"
- Subtle white grid pattern overlay (5% opacity)
- Premium, luxurious, minimalist aesthetic
- High contrast, modern, clean design
```

---

## 🐦 twitter-image.jpg (Twitter Card - 1200x600px)

### Prompt:

```
Create a Twitter/X Card image, 1200x600px, for "Portal Culture" community.

Same style as the Open Graph image but adjusted for 2:1 horizontal ratio:
- Pure black background (#000000)
- "PORTAL CULTURE" wordmark in white, centered
- Shorter tagline: "Transformación Real. Comunidad Premium."
- Minimalist glass morphism effects
- Subtle geometric patterns in white (5% opacity)
- Premium, luxurious, modern aesthetic
- Leave 40px margin on sides
- High contrast white on black
- Style: Ultra-minimalist, Apple-inspired

Elements to include:
- Large readable text (visible even at small sizes)
- Subtle depth with light gradients
- Professional and exclusive feel
```

---

## 🎯 Variaciones (Si quieres probar diferentes estilos)

### Opción 1: Con Elementos 3D
```
Same as above but add subtle 3D floating geometric shapes (cubes, spheres) in dark grey with white edges, creating depth. Keep it minimal - max 3-4 shapes, very subtle.
```

### Opción 2: Con Gradiente
```
Same as above but replace solid black with a subtle radial gradient: center is very dark grey (#0a0a0a), edges are pure black (#000000). Adds premium depth.
```

### Opción 3: Con Líneas Futuristas
```
Same as above but add thin white lines (1-2px) creating a subtle grid or circuit-board pattern in the background. Opacity 3-5%. Gives tech/futuristic vibe.
```

---

## 🖼️ Favicons (opcional)

### Prompt para Icon:

```
Create a simple, bold icon for "Portal Culture" that works at small sizes (16x16px to 512x512px).

Requirements:
- Monogram or abstract symbol
- Can be letter "P" stylized or a portal/gateway symbol
- Simple geometric shape
- High contrast
- Works in both white on black AND black on white
- Recognizable at tiny sizes
- Modern, minimal, professional

Deliverables:
- Square canvas
- Transparent background (PNG)
- Vector-style (clean edges, no gradients)
- Multiple sizes: 16x16, 32x32, 180x180, 512x512
```

---

## 🛠️ Herramientas IA Recomendadas

### Para Imágenes de Texto (Open Graph, Twitter)

1. **ChatGPT + DALL-E 3** (Más fácil)
   - Copia el prompt
   - Pega en ChatGPT
   - Descarga la imagen
   - Redimensiona en Canva si es necesario

2. **Midjourney** (Mejor calidad)
   ```
   /imagine [pega el prompt aquí] --ar 19:10 --style raw --v 6
   ```

3. **Leonardo.ai** (Gratis)
   - Pega el prompt
   - Selecciona "Graphic Design" preset
   - Generate

### Para Favicons

1. **Favicon.io** - Genera desde texto
   ```
   https://favicon.io/favicon-generator/
   ```
   - Escribe "PC" o "P"
   - Background: Black
   - Font: Bold, modern
   - Descarga todos los tamaños

2. **RealFaviconGenerator**
   ```
   https://realfavicongenerator.net/
   ```
   - Sube cualquier imagen
   - Genera todos los tamaños automáticamente

---

## ✅ Checklist Post-Generación

Después de generar las imágenes con IA:

### og-image.jpg
- [ ] Tamaño exacto: 1200x630px
- [ ] Peso < 1MB
- [ ] Formato: JPG (alta calidad)
- [ ] Texto legible (prueba en 300x157px)
- [ ] Alto contraste
- [ ] Logo/texto no cortado en bordes

### twitter-image.jpg
- [ ] Tamaño exacto: 1200x600px
- [ ] Peso < 1MB
- [ ] Formato: JPG
- [ ] Texto legible en timeline
- [ ] Diseño coherente con og-image

### Favicons (si creaste)
- [ ] Múltiples tamaños generados
- [ ] Formato: PNG con transparencia
- [ ] Simple y reconocible
- [ ] Funciona en blanco y negro

---

## 🎨 Ejemplo de Workflow con ChatGPT

1. **Genera la imagen**
   ```
   Tú: [Pega el prompt de og-image]
   ChatGPT: [Genera imagen]
   ```

2. **Refina si es necesario**
   ```
   Tú: "Haz el texto más grande y centrado"
   ChatGPT: [Genera versión mejorada]
   ```

3. **Descarga**
   - Click derecho → Guardar imagen como
   - Nombre: `og-image.jpg`

4. **Optimiza**
   - Ve a https://tinypng.com
   - Sube la imagen
   - Descarga versión optimizada

5. **Coloca en proyecto**
   ```bash
   cp ~/Downloads/og-image.jpg ~/Desktop/pruebas/public/
   ```

6. **Repite para Twitter**
   - Usa el prompt de twitter-image
   - Guarda como `twitter-image.jpg`

---

## 🚨 Errores Comunes a Evitar

❌ **Texto muy pequeño**
→ Debe ser legible a 300px de ancho

❌ **Colores de bajo contraste**
→ Usa blanco puro (#FFFFFF) sobre negro puro (#000000)

❌ **Elementos cortados en los bordes**
→ Deja mínimo 50px de margen

❌ **Demasiados elementos**
→ Menos es más. Minimalismo premium.

❌ **Tamaño incorrecto**
→ Verifica dimensiones exactas

❌ **Peso excesivo**
→ Optimiza en TinyPNG (objetivo: <500KB)

---

## 💡 Tips Pro

### Consistencia Visual
Ambas imágenes (og-image y twitter-image) deben:
- Usar la misma paleta de colores
- Mismo estilo tipográfico
- Misma sensación/mood
- Reconocibles como parte de la misma marca

### Testing
Después de subirlas:
1. Abre en móvil y desktop
2. Verifica que se ven nítidas
3. Prueba compartir en WhatsApp (preview pequeño)
4. Testea en Facebook Debugger

### Backup
Guarda versiones de alta resolución:
- `og-image-hd.png` (por si necesitas ajustes)
- Guarda también el prompt usado (para futuras variaciones)

---

## 📞 ¿Necesitas Ayuda?

Si ChatGPT/DALL-E no genera exactamente lo que quieres:

1. **Refina el prompt**:
   - "Haz el texto más grande"
   - "Usa un fondo más oscuro"
   - "Añade más espacio en blanco"

2. **Prueba Canva** (más control manual):
   - Plantilla custom: 1200x630px
   - Añade texto manualmente
   - Exporta como JPG

3. **Contratar diseñador** (última opción):
   - Fiverr/Upwork: $10-30 USD
   - Proporciona este documento como brief

---

## ✅ Resultado Final Esperado

Cuando termines, deberías tener:

```
public/
├── og-image.jpg          ✅ (1200x630px, <1MB)
├── twitter-image.jpg     ✅ (1200x600px, <1MB)
└── icons/
    ├── favicon-32x32.png     ⚠️ (opcional)
    ├── apple-touch-icon.png  ⚠️ (opcional)
    └── icon-192x192.png      ⚠️ (opcional)
```

Luego:
```bash
git add public/og-image.jpg public/twitter-image.jpg
git commit -m "feat: Add SEO social media images"
git push origin main
```

**¡Y listo! SEO 100% completo** 🎉

---

**Tiempo estimado**: 15-20 minutos
**Dificultad**: Fácil
**Costo**: Gratis (con ChatGPT/Canva)

¡Manos a la obra! 🚀
