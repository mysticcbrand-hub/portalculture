'use client'

import { useEffect, useState, useRef } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
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

  // Progreso del scroll en el hero (0 a 1)
  const progress = Math.min(1, scrollY / windowHeight)
  
  // Opacidades calculadas para cada elemento
  const titleOpacity = 1 - progress * 1.5
  const questionOpacity = Math.max(0, Math.min(1, (progress - 0.2) * 3))
  const descOpacity = Math.max(0, Math.min(1, (progress - 0.4) * 3))
  const ctaOpacity = Math.max(0, Math.min(1, (progress - 0.6) * 3))

  return (
    <section 
      ref={heroRef}
      className="relative bg-black"
      style={{ height: '250vh' }}
    >
      {/* Fondo negro puro */}
      <div className="fixed inset-0 bg-black -z-10" />

      {/* Contenido sticky */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Contenedor principal */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          
          {/* Título principal */}
          <div
            className="transition-transform duration-100 ease-out flex flex-col items-center"
            style={{
              opacity: Math.max(0, titleOpacity),
              transform: `translateY(${progress * -60}px) scale(${1 - progress * 0.1})`,
            }}
          >
            {/* Texto superior */}
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/40 tracking-wide mb-1">
              Entra al
            </p>
            
            {/* PORTAL - limpio y elegante */}
            <h1 className="font-display text-[clamp(4rem,18vw,12rem)] font-medium tracking-[-0.02em] leading-[0.85] text-white">
              Portal<span className="text-white/30">.</span>
            </h1>
          </div>

          {/* Pregunta provocadora */}
          <div
            className="mt-10 transition-transform duration-100 ease-out"
            style={{
              opacity: questionOpacity,
              transform: `translateY(${(1 - questionOpacity) * 40}px)`,
            }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white/70 font-light">
              ¿De verdad quieres seguir solo?
            </p>
          </div>

          {/* Descripción */}
          <div
            className="mt-6 transition-transform duration-100 ease-out"
            style={{
              opacity: descOpacity,
              transform: `translateY(${(1 - descOpacity) * 40}px)`,
            }}
          >
            <p className="text-base md:text-lg text-white/40 font-light max-w-lg mx-auto leading-relaxed">
              La comunidad donde jóvenes ambiciosos construyen 
              la mejor versión de sí mismos. Juntos.
            </p>
          </div>

          {/* CTA */}
          <div
            className="mt-10 transition-transform duration-100 ease-out"
            style={{
              opacity: ctaOpacity,
              transform: `translateY(${(1 - ctaOpacity) * 40}px)`,
            }}
          >
            <a
              href="/acceso"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]"
            >
              <span>Solicitar Acceso</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* Info adicional */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/25 font-mono tracking-wide">
              <span>+15h de valor</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>4.9★</span>
            </div>
          </div>

        </div>

        {/* Indicador de scroll */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500"
          style={{ opacity: progress < 0.1 ? 1 : 0 }}
        >
          <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>

      </div>
    </section>
  )
}
