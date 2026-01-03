'use client'

import { useEffect, useRef } from 'react'

interface CreativeCTAProps {
  onCtaClick: () => void
}

export default function CreativeCTA({ onCtaClick }: CreativeCTAProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return
      const scrolled = window.scrollY
      const opacity = Math.min(scrolled / 1000, 1)
      textRef.current.style.opacity = opacity.toString()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-40">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div ref={textRef} className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Section Label */}
        <p className="text-xs font-mono text-white/30 tracking-wider mb-12">/ 04</p>
        
        {/* Main Question */}
        <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-normal leading-tight tracking-normal mb-8 text-white" style={{ transform: 'scaleY(1.15)' }}>
          ¿Listo para
          <br />
          dar el salto?
        </h2>

        {/* Statement */}
        <p className="text-xl md:text-3xl font-light text-white/60 mb-16 leading-relaxed">
          Rodéate de jóvenes con tu misma mentalidad.
          <br />
          <span className="text-white">Construid juntos.</span>
        </p>

        {/* CTA Button - Large and Prominent */}
        <a
          href="/acceso"
          className="group relative px-12 py-6 text-xl font-medium rounded-full
                   border-2 border-white/30 hover:border-white/50
                   transition-all duration-700
                   hover:scale-105 inline-block
                   shadow-[0_0_20px_rgba(255,255,255,0.08)]
                   hover:shadow-[0_0_40px_rgba(255,255,255,0.2),0_0_60px_rgba(220,220,220,0.15),inset_0_1px_0_rgba(255,255,255,0.3)]"
        >
          <span className="relative z-10">Solicitar Acceso Ahora</span>
          
          {/* Animated Chrome Background - Subtle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-gray-100/12 to-white/10
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Chrome Glow Effect - Elegant */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-white/20 
                        opacity-0 group-hover:opacity-50 transition-opacity duration-700 -z-10 scale-125" />
        </a>

        {/* Sub Info */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-mono">
          <span className="text-red-400 font-semibold">⚡ PLAZAS LIMITADAS</span>
          <span className="text-white/40">·</span>
          <span className="text-yellow-400 font-semibold">Precio sube pronto</span>
          <span className="text-white/40">·</span>
          <span className="text-white/40">Asegura tu plaza</span>
        </div>
      </div>
    </section>
  )
}
