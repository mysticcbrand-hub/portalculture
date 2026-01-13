'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface MorphingHeroProps {
  onCtaClick?: () => void
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export default function MorphingHero({ onCtaClick }: MorphingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)

  // Texto principal dividido en letras
  const mainText = "Portal."
  const letters = mainText.split('')

  // Colores del gradiente orgánico
  const gradientColors = [
    { color: 'rgba(99, 102, 241, 0.4)', x: 0.2, y: 0.3 },   // Indigo
    { color: 'rgba(139, 92, 246, 0.35)', x: 0.8, y: 0.2 },  // Violet  
    { color: 'rgba(59, 130, 246, 0.3)', x: 0.5, y: 0.7 },   // Blue
    { color: 'rgba(6, 182, 212, 0.25)', x: 0.1, y: 0.8 },   // Cyan
  ]

  // Mouse tracking suave
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Canvas para partículas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Actualizar y dibujar partículas
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // Gravedad sutil
        p.vx *= 0.99 // Fricción
        p.vy *= 0.99
        p.life -= 1

        if (p.life <= 0) return false

        const alpha = (p.life / p.maxLife) * 0.8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace('1)', `${alpha})`)
        ctx.fill()

        return true
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Crear partículas en hover
  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5
      const velocity = 2 + Math.random() * 4
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        life: 60 + Math.random() * 30,
        maxLife: 90,
        size: 3 + Math.random() * 4,
        color: color
      })
    }
    particlesRef.current = [...particlesRef.current, ...newParticles]
  }, [])

  // Efecto de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Animación del tiempo para efectos
  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current += 0.02
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0b]"
    >
      {/* SVG Filters para efecto líquido */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Filtro de distorsión líquida */}
          <filter id="liquid">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01" 
              numOctaves="3" 
              result="noise"
              seed="1"
            >
              <animate 
                attributeName="baseFrequency" 
                dur="20s" 
                values="0.01;0.015;0.01" 
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="8" 
              xChannelSelector="R" 
              yChannelSelector="G"
            />
          </filter>

          {/* Filtro glow suave */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Filtro de morphing más intenso para hover */}
          <filter id="liquid-hover">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.03" 
              numOctaves="2" 
              result="noise"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="15"
            />
          </filter>
        </defs>
      </svg>

      {/* Mesh Gradient Orgánico Animado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-[#0f0f12] to-[#0a0a0b]" />
        
        {/* Formas orgánicas animadas */}
        {gradientColors.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen will-change-transform"
            style={{
              width: `${600 + i * 150}px`,
              height: `${600 + i * 150}px`,
              background: `radial-gradient(ellipse at center, ${blob.color} 0%, transparent 70%)`,
              left: `${blob.x * 100 + Math.sin(timeRef.current + i) * 5 + (mousePosition.x - 0.5) * 20}%`,
              top: `${blob.y * 100 + Math.cos(timeRef.current + i * 0.7) * 5 + (mousePosition.y - 0.5) * 20}%`,
              transform: 'translate(-50%, -50%)',
              filter: 'blur(80px)',
              animation: `meshFloat${i + 1} ${18 + i * 4}s ease-in-out infinite`,
              opacity: 0.8,
            }}
          />
        ))}

        {/* Overlay de profundidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/50" />
        
        {/* Grain texture sutil */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Líneas de luz sutiles */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)
            `,
            backgroundSize: '100% 100%',
            animation: 'lightSweep 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Canvas para partículas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        {/* Label minimalista */}
        <div 
          className={`mb-8 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
            / 01
          </span>
        </div>

        {/* Título con efecto líquido */}
        <div className="mb-6">
          {/* "Entra al" - línea superior */}
          <h1 
            className={`font-display text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[1] tracking-[-0.03em] text-white/90 mb-2 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '400ms',
              filter: 'url(#liquid)',
            }}
          >
            Entra al
          </h1>

          {/* "Portal." - palabra principal con letras interactivas */}
          <div 
            className={`flex flex-wrap transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {letters.map((letter, index) => (
              <span
                key={index}
                className="relative inline-block cursor-default select-none"
                onMouseEnter={(e) => {
                  setHoveredLetter(index)
                  const rect = e.currentTarget.getBoundingClientRect()
                  createParticles(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    index % 2 === 0 ? 'rgba(139, 92, 246, 1)' : 'rgba(59, 130, 246, 1)'
                  )
                }}
                onMouseLeave={() => setHoveredLetter(null)}
                style={{
                  filter: hoveredLetter === index ? 'url(#liquid-hover)' : 'url(#liquid)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: hoveredLetter === index 
                    ? 'scale(1.1) translateY(-8px)' 
                    : 'scale(1) translateY(0)',
                  animation: `breathe ${3 + index * 0.2}s ease-in-out infinite`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <span 
                  className={`font-display text-[clamp(4rem,15vw,12rem)] font-semibold leading-[0.9] tracking-[-0.04em] inline-block transition-all duration-500 ${
                    hoveredLetter === index 
                      ? 'text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-blue-400 to-cyan-400' 
                      : 'text-white'
                  }`}
                  style={{
                    textShadow: hoveredLetter === index 
                      ? '0 0 60px rgba(139, 92, 246, 0.5), 0 0 120px rgba(59, 130, 246, 0.3)' 
                      : '0 0 40px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {letter}
                </span>

                {/* Glow bajo la letra en hover */}
                <div 
                  className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-full h-8 rounded-full transition-all duration-500 ${
                    hoveredLetter === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Subtítulo */}
        <p 
          className={`text-lg md:text-xl lg:text-2xl text-white/50 font-light leading-relaxed max-w-2xl mb-12 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          La comunidad nº1 donde jóvenes ambiciosos<br className="hidden md:block" />
          <span className="text-white/70">transforman su vida.</span>
        </p>

        {/* CTA y Stats */}
        <div 
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          {/* Botón CTA */}
          <a
            href="/acceso"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-medium text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{
                   background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
                 }} />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{
                   background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                   animation: 'shimmer 2s infinite',
                 }} />

            <span className="relative z-10">Solicitar Acceso</span>
            <svg 
              className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>

            {/* Border glow on hover */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{
                   boxShadow: 'inset 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
                 }} />
          </a>

          {/* Stats */}
          <div className="flex items-center gap-6 text-xs font-mono text-white/30 tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
              <span>+2.8K MIEMBROS</span>
            </div>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="hidden sm:inline">4.9★ VALORACIÓN</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          33% { transform: translate(-45%, -55%) scale(1.1) rotate(5deg); }
          66% { transform: translate(-55%, -45%) scale(0.95) rotate(-5deg); }
        }
        
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          33% { transform: translate(-55%, -45%) scale(1.05) rotate(-8deg); }
          66% { transform: translate(-45%, -55%) scale(1.1) rotate(8deg); }
        }
        
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          33% { transform: translate(-48%, -52%) scale(1.15) rotate(10deg); }
          66% { transform: translate(-52%, -48%) scale(0.9) rotate(-10deg); }
        }
        
        @keyframes meshFloat4 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          33% { transform: translate(-52%, -48%) scale(0.95) rotate(-6deg); }
          66% { transform: translate(-48%, -52%) scale(1.08) rotate(6deg); }
        }

        @keyframes breathe {
          0%, 100% { 
            transform: scale(1) translateY(0);
          }
          50% { 
            transform: scale(1.02) translateY(-2px);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes lightSweep {
          0%, 100% { opacity: 0.02; transform: translateX(-100%); }
          50% { opacity: 0.04; transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
