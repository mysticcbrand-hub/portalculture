# 🎯 Portal Culture - Premium Landing Page

Una landing page **ÉPICA** y **PREMIUM** para Portal Culture, la comunidad exclusiva donde jóvenes ambiciosos se transforman. Diseñada con estética chrome metálica, efectos 3D impresionantes, animaciones de nivel Apple, y una intro de carga cinematográfica.

## ✨ Características Destacadas

### 🎨 Diseño Premium
- **Chrome Aesthetics**: Gradientes plateados/metálicos en todo el sitio
- **Glassmorphism**: Efectos de cristal con backdrop blur
- **Dark Theme**: Fondo negro con elementos brillantes

### 🎭 Interacciones Avanzadas
- **3D Card Hover**: Rotación 3D siguiendo el mouse con spotlight dinámico
- **Magnetic Buttons**: Botones con efecto magnético (80px radius)
- **Parallax Effects**: Esfera 3D que sigue el cursor
- **Chrome Border Animation**: Bordes animados en hover
- **Ripple Effect**: Efecto de onda al hacer click

### 🎬 Animaciones Premium
- **Scroll Animations**: Fade-in y slide-up con Intersection Observer
- **Staggered Entrance**: Animaciones escalonadas para las cards
- **Timeline Shimmer**: Línea de tiempo con gradiente animado
- **Float Animation**: Iconos flotantes sutiles
- **60 FPS Performance**: Optimizado con GPU acceleration

### 📱 Responsive Excellence
- Diseño totalmente adaptativo
- Optimizaciones específicas para mobile
- Touch targets de 44x44px mínimo
- Efectos 3D reducidos en dispositivos móviles

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
npm run build
npm start
```

## 📦 Estructura del Proyecto

```
.
├── app/
│   ├── components/
│   │   ├── Hero.tsx              # Hero con esfera 3D y CTA magnético
│   │   ├── BenefitCards.tsx      # 5 cards con efectos 3D premium
│   │   ├── Timeline.tsx          # Timeline horizontal animada
│   │   ├── FinalCTA.tsx          # CTA final con efectos masivos
│   │   ├── Footer.tsx            # Footer minimalista refinado
│   │   └── Modal.tsx             # Modal glassmorphic con formulario
│   ├── globals.css               # Estilos globales y animaciones custom
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── tailwind.config.ts            # Configuración de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
└── package.json                  # Dependencias del proyecto
```

## 🎨 Secciones

### 1. **Hero**
- Esfera 3D metálica con efecto parallax
- Headline con chrome gradient
- Botón CTA con efecto magnético (80px radius)
- Badge de "Comunidad Activa"
- Social proof indicators

### 2. **Beneficios** (5 Cards Premium)
Cada card incluye:
- **3D Hover Effect**: Rotación máxima 12° siguiendo el mouse
- **Spotlight**: Radial gradient que sigue el cursor
- **Chrome Border**: Borde animado en hover
- **Outer Glow**: Expansión de sombra chrome
- **Icon Animation**: Iconos con float y glow effects

Los 5 beneficios:
1. 🎓 5 Cursos Exclusivos
2. 📹 Llamadas Semanales
3. 🏆 Sistema de Niveles
4. ⚡ Valor Diario
5. 👥 Red de Contactos

### 3. **Cómo Funciona**
- Timeline horizontal (desktop) / vertical (mobile)
- 3 pasos con círculos glassmorphic
- Números grandes con chrome gradient
- Línea conectora con shimmer animation
- Hover effects en cada paso

### 4. **CTA Final**
- Botón extra premium con efectos masivos
- Spotlight background
- Counter animado de miembros
- Trust indicators
- Glow azul/cyan en hover

### 5. **Footer**
- Diseño ultra minimalista
- Links a redes sociales
- Hover effects sutiles
- Chrome border top

### 6. **Modal**
- Backdrop con blur 10px
- Contenido glassmorphic
- Formulario con validación
- Input fields con chrome border en focus
- Animación slide-in desde abajo

## 🎯 Efectos Especiales

### Chrome Gradients
```css
background: linear-gradient(135deg, #C0C0C0, #E8E8E8, #A8A8A8, #F5F5F5, #C0C0C0);
```

### 3D Transform
```css
transform: perspective(1000px) rotateX(12deg) rotateY(12deg) scale3d(1.05, 1.05, 1.05) translateZ(20px);
```

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.02);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.05);
```

## 🎨 Paleta de Colores

- **Background**: `#000000` (Negro puro)
- **Chrome Silver**: `#C0C0C0`
- **Chrome Light**: `#E8E8E8`
- **Chrome Dark**: `#A8A8A8`
- **Chrome Bright**: `#F5F5F5`
- **Blue Accent**: `rgba(100, 150, 255, 0.4)` (para CTAs)
- **Cyan Accent**: `rgba(100, 200, 255, 0.2)` (para glows)

## ⚡ Optimizaciones de Performance

- `will-change: transform, opacity` en elementos animados
- `transform: translateZ(0)` para GPU acceleration
- `backface-visibility: hidden` para evitar flickering
- Intersection Observer con thresholds inteligentes
- `prefers-reduced-motion` support

## 🛠 Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React Hooks** - Estado y efectos
- **CSS Custom Properties** - Variables dinámicas
- **Intersection Observer** - Scroll animations

## 📝 Lenguaje y Tono

- Español de España, natural y directo
- Tono para jóvenes 18-30 años
- Aspiracional pero alcanzable
- Tuteo ("tú" no "usted")
- Expresiones auténticas

## 🎯 Objetivo

Crear una experiencia web que transmita:

> "JODER. Esto es INCREÍBLE. Nunca he visto algo así. Quiero estar dentro YA."

La web debe sentirse como un **producto de lujo tech** - piensa Apple, Tesla, productos premium que te hacen pensar "esto es otra liga".

## ✅ Checklist de Calidad

- ✅ Chrome effects plateados/metálicos (NO ROSAS)
- ✅ 3D hover perfecto en todas las cards
- ✅ Spotlight sigue el mouse suavemente
- ✅ Animaciones a 60fps
- ✅ Magnetic buttons funcionando
- ✅ Parallax suave en hero
- ✅ Modal slide-in perfecto
- ✅ Form con validación
- ✅ Responsive en todos los breakpoints
- ✅ Scroll animations con Intersection Observer
- ✅ Glows sutiles pero visibles
- ✅ Chrome gradients correctos
- ✅ Spacing generoso y consistente
- ✅ Typography jerárquica

## 📱 Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🎪 Demo Local

Accede a [http://localhost:3000](http://localhost:3000) para ver:

- Hero con esfera 3D animada
- Cards con efectos 3D al mover el mouse
- Timeline con shimmer animation
- Botones con efecto magnético
- Modal glassmorphic

**¡Mueve el mouse sobre los elementos para ver la magia! ✨**

## 📄 Licencia

© 2025 Cada Card - Todos los derechos reservados

---

**Hecho con 🔥 para crear la landing page más ÉPICA y PREMIUM de España**
