'use client'

import { useEffect, useState, useRef } from 'react'

interface RevealHeroProps {
  onCtaClick?: () => void
}

export default function RevealHero({ onCtaClick }: RevealHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      if (!heroRef.current) return
      
      const rect = heroRef.current.getBoundingClientRect()
      const heroHeight = heroRef.current.offsetHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / (heroHeight * 0.6)))
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calcular opacidades basadas en el progreso del scroll
  const titleOpacity = isLoaded ? 1 : 0
  const questionOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.15) * 4))
  const subtitleOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.35) * 4))
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.55) * 4))

  return (
    <>
      <section 
        ref={heroRef}
        className="relative min-h-[180vh] bg-black"
      >
        {/* Fondo con ambiente acogedor */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Base oscura */}
          <div className="absolute inset-0 bg-[#050507]" />
          
          {/* Gradiente cálido sutil - genera sensación acogedora */}
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] opacity-[0.07]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(120, 100, 180, 0.5) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
          />
          
          {/* Luz superior cinematográfica */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-[0.04]"
            style={{
              background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.3) 0%, transparent 70%)',
            }}
          />

          {/* Viñeta cinematográfica */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)',
            }}
          />

          {/* Grain sutil */}
          <div 
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Contenido fijo centrado */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none"
             style={{ 
               opacity: scrollProgress > 0.9 ? 1 - ((scrollProgress - 0.9) * 10) : 1 
             }}>
          
          <div className="text-center px-6 max-w-4xl mx-auto pointer-events-auto">
            
            {/* Label minimalista */}
            <div 
              className="mb-8 transition-all duration-1000"
              style={{
                opacity: titleOpacity * 0.4,
                transform: `translateY(${isLoaded ? 0 : 20}px)`,
                transitionDelay: '200ms'
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
                / 01
              </span>
            </div>

            {/* Título principal - SIEMPRE VISIBLE */}
            <h1 
              className="font-display text-[clamp(3rem,12vw,9rem)] font-semibold leading-[0.95] tracking-[-0.03em] mb-8 transition-all duration-1000"
              style={{
                opacity: titleOpacity,
                transform: `translateY(${isLoaded ? 0 : 30}px)`,
                transitionDelay: '400ms'
              }}
            >
              <span className="text-white">Portal</span>
              <span className="text-white/60">.</span>
            </h1>

            {/* Pregunta provocadora - REVEAL 1 */}
            <div 
              className="mb-6 transition-all duration-700 ease-out"
              style={{
                opacity: questionOpacity,
                transform: `translateY(${20 - questionOpacity * 20}px)`,
              }}
            >
              <p className="text-xl md:text-2xl text-white/70 font-light">
                ¿De verdad quieres seguir solo?
              </p>
            </div>

            {/* Subtítulo - REVEAL 2 */}
            <div 
              className="mb-12 transition-all duration-700 ease-out"
              style={{
                opacity: subtitleOpacity,
                transform: `translateY(${20 - subtitleOpacity * 20}px)`,
              }}
            >
              <p className="text-base md:text-lg text-white/40 font-light max-w-xl mx-auto leading-relaxed">
                La comunidad donde jóvenes ambiciosos<br className="hidden sm:block" />
                transforman su vida. Juntos.
              </p>
            </div>

            {/* CTA con Glassmorphism - REVEAL 3 */}
            <div 
              className="transition-all duration-700 ease-out"
              style={{
                opacity: ctaOpacity,
                transform: `translateY(${20 - ctaOpacity * 20}px) scale(${0.95 + ctaOpacity * 0.05})`,
              }}
            >
              {/* Card glassmorphism */}
              <div className="inline-block p-8 rounded-3xl backdrop-blur-xl border border-white/[0.08] bg-white/[0.02] shadow-2xl">
                
                <a
                  href="/acceso"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium text-white rounded-full transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 24px -8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="tracking-wide">Solicitar Acceso</span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 opacity-60 group-hover:opacity-100" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                {/* Stats minimalistas */}
                <div className="flex items-center justify-center gap-6 mt-6 text-[11px] font-mono text-white/25 tracking-wider">
                  <span>+15HR VALOR</span>
                  <span className="text-white/10">·</span>
                  <span>4.9/5 ★</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Indicador de scroll - Solo visible al inicio */}
        <div 
          className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700"
          style={{
            opacity: scrollProgress < 0.1 ? (isLoaded ? 1 : 0) : Math.max(0, 1 - scrollProgress * 5),
            transform: `translateY(${isLoaded ? 0 : 20}px)`,
            transitionDelay: '1000ms',
            pointerEvents: scrollProgress > 0.1 ? 'none' : 'auto'
          }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase">
            Scroll para descubrir
          </span>
          <div className="relative w-6 h-10 rounded-full border border-white/10 flex justify-center pt-2">
            <div 
              className="w-1 h-2 bg-white/30 rounded-full animate-scroll-hint"
            />
          </div>
        </div>

        {/* Barra de progreso sutil */}
        <div className="fixed top-0 left-0 right-0 h-px bg-white/5 z-50">
          <div 
            className="h-full bg-gradient-to-r from-white/20 to-white/10 transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

      </section>

      {/* Estilos */}
      <style jsx>{`
        @keyframes scroll-hint {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }
        
        .animate-scroll-hint {
          animation: scroll-hint 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
