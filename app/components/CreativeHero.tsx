'use client'

import { useEffect, useRef } from 'react'

interface CreativeHeroProps {
  onCtaClick: () => void
}

export default function CreativeHero({ onCtaClick }: CreativeHeroProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const xMove = (clientX / innerWidth - 0.5) * 20
      const yMove = (clientY / innerHeight - 0.5) * 20
      
      textRef.current.style.transform = `translate(${xMove}px, ${yMove}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-6 py-32">
      {/* Background Image - Solo en Hero */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/imagenweb1.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Label */}
        <div className="mb-12">
          <span className="font-mono text-xs tracking-wider text-white/30">
            / 01
          </span>
        </div>

        {/* Large Statement */}
        <div ref={textRef} className="transition-transform duration-300 ease-out mb-16">
          <h1 className="font-display text-[clamp(2.5rem,9vw,7rem)] font-normal leading-[1.15] tracking-normal mb-8" style={{ transform: 'scaleY(1.15)' }}>
            <span className="block text-white">Entra al</span>
            <span className="block text-white">Portal.</span>
          </h1>
        </div>

        {/* Subtext */}
        <div className="max-w-2xl mb-16">
          <p className="text-xl md:text-2xl leading-relaxed text-white/70 font-light">
            La comunidad gratis n.º1 donde jóvenes ambiciosos como tú transforman su vida.
          </p>
        </div>

        {/* CTA & Stats - Centrados */}
        <div className="flex flex-col items-center gap-6">
          <a
            href="https://app-portalculture.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 text-base font-medium overflow-hidden rounded-full
                     border border-white/20 hover:border-white/40
                     transition-all duration-500
                     hover:scale-[1.02] inline-block"
          >
            <span className="relative z-10">Solicitar Acceso</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-gray-200/10 to-white/8 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-full blur-xl bg-white/15 opacity-0 group-hover:opacity-60
                          transition-opacity duration-700 -z-10 scale-150" />
          </a>
          
          <div className="flex items-center gap-4 text-xs font-mono text-white/40 tracking-wider">
            <span className="whitespace-nowrap">+15HR VALOR</span>
            <span>·</span>
            <span className="whitespace-nowrap">4.9/5 ★</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Bottom Center */}
      <a 
        href="#beneficios"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-white/30 tracking-wider group-hover:text-white/60 transition-colors duration-300">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 via-white/15 to-transparent group-hover:from-white/50 transition-all duration-300" />
        </div>
      </a>
    </section>
  )
}
