'use client'

import { useEffect, useState, useRef } from 'react'

export default function HeroStatement() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(1000)
  const [isMounted, setIsMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    setWindowHeight(window.innerHeight)
    
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Scroll progress (0 to 1) over the hero section
  const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 1.2)))
  
  // Animation values - más suaves
  const titleScale = 1 - progress * 0.15
  const titleY = progress * -80
  const titleOpacity = 1 - progress * 2

  // Secondary content appears as title fades
  const secondaryOpacity = Math.max(0, Math.min(1, (progress - 0.3) * 3))
  const secondaryY = Math.max(0, (1 - (progress - 0.3) * 3) * 40)

  return (
    <section 
      ref={heroRef}
      className="relative bg-black"
      style={{ height: '250vh' }}
    >
      {/* Fondo con gradientes animados premium */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        {/* Gradient orbs animados */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #1a1a2e 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
            animation: 'float1 20s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #16213e 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
            animation: 'float2 25s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #0f3460 0%, transparent 70%)',
            top: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float3 18s ease-in-out infinite',
          }}
        />
        
        {/* Grid pattern sutil */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
        
        {/* Grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      {/* Contenido sticky */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Badge superior - solo visible al inicio */}
        <div 
          className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-20"
          style={{
            opacity: isMounted ? Math.max(0, 1 - progress * 3) : 0,
            transform: `translateX(-50%) translateY(${isMounted ? 0 : -20}px)`,
            transition: 'opacity 0.5s, transform 0.8s ease-out',
          }}
        >
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-xs md:text-sm text-white/60 font-medium tracking-wide">
              Plazas limitadas — Acceso exclusivo
            </span>
          </div>
        </div>

        {/* MAIN STATEMENT - El impacto visual */}
        <div 
          className="relative text-center px-4 z-10"
          style={{
            opacity: Math.max(0, titleOpacity),
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            transition: 'transform 0.1s linear',
          }}
        >
          {/* Pre-título elegante */}
          <div 
            className="mb-6 md:mb-8"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: `translateY(${isMounted ? 0 : 20}px)`,
              transition: 'all 1s ease-out 0.2s',
            }}
          >
            <span className="inline-block px-4 py-1.5 text-[10px] md:text-xs text-white/50 font-medium tracking-[0.4em] uppercase border-b border-white/10">
              Bienvenido al
            </span>
          </div>
          
          {/* PORTAL - Tipografía masiva */}
          <h1 
            className="relative font-display font-bold tracking-[-0.04em] leading-[0.8] text-white select-none"
            style={{
              fontSize: 'clamp(4.5rem, 20vw, 16rem)',
              opacity: isMounted ? 1 : 0,
              transform: `translateY(${isMounted ? 0 : 30}px)`,
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            {/* Glow effect detrás */}
            <span 
              className="absolute inset-0 blur-[60px] opacity-20 pointer-events-none"
              aria-hidden="true"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              PORTAL
            </span>
            {/* Texto principal con gradiente sutil */}
            <span 
              className="relative"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #999999 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PORTAL
            </span>
          </h1>
          
          {/* Línea divisoria elegante */}
          <div 
            className="flex items-center justify-center gap-4 my-8 md:my-10"
            style={{
              opacity: isMounted ? 1 : 0,
              transition: 'opacity 1s ease-out 0.5s',
            }}
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          
          {/* Tagline */}
          <p 
            className="text-base md:text-xl lg:text-2xl text-white/50 font-light tracking-wide max-w-xl mx-auto"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: `translateY(${isMounted ? 0 : 20}px)`,
              transition: 'all 1s ease-out 0.7s',
            }}
          >
            La comunidad donde el{' '}
            <span className="text-white/90 font-medium">1%</span>{' '}
            se construye
          </p>
        </div>

        {/* SECONDARY CONTENT - Aparece al scrollear */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none"
          style={{
            opacity: secondaryOpacity,
            transform: `translateY(${secondaryY}px)`,
          }}
        >
          <div className="text-center max-w-2xl mx-auto pointer-events-auto">
            {/* Headline secundario */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white/90 leading-tight mb-6">
              Donde jóvenes ambiciosos
              <span className="block font-semibold text-white mt-2">
                se transforman
              </span>
            </h2>
            
            {/* Descripción */}
            <p className="text-sm md:text-base text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
              5 templos. Mentoría AI 24/7. Una comunidad que te empuja a ser mejor cada día.
            </p>
            
            {/* CTA Premium */}
            <a
              href="/acceso"
              className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full overflow-hidden text-black font-semibold text-sm md:text-base tracking-wide transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 50px -10px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.1)',
              }}
            >
              {/* Shine effect on hover */}
              <div 
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
              />
              <span className="relative z-10">Solicitar Acceso</span>
              <svg 
                className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            
            {/* Social proof */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/30">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10" />
                  ))}
                </div>
                <span>+500 miembros</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span>★ 4.9/5</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ 
            opacity: isMounted ? Math.max(0, 1 - progress * 5) : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <span className="text-[9px] text-white/30 font-medium tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-4 bg-white/60"
              style={{
                animation: 'scrollLine 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -50px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.05); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateX(-50%) translate(0, 0); }
          50% { transform: translateX(-50%) translate(20px, -30px); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
