'use client'

import { useEffect, useState } from 'react'

interface FinalCTAProps {
  onCtaClick: () => void
}

export default function FinalCTA({ onCtaClick }: FinalCTAProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = document.getElementById('final-cta')
      if (!section) return
      
      const rect = section.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="final-cta" className="relative py-32 md:py-48 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
            Últimas Plazas Disponibles
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            ¿Listo para
          </span>
          <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            transformarte?
          </span>
        </h2>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
          Únete a la comunidad más exclusiva de desarrollo personal y lleva tu vida al siguiente nivel.
        </p>

        {/* CTA Button */}
        <div className="mb-8">
          <button
            onClick={onCtaClick}
            className="group relative px-12 md:px-16 py-5 md:py-6 text-lg md:text-xl font-bold text-black bg-white rounded-full overflow-hidden transition-all hover:scale-110 hover:shadow-2xl hover:shadow-white/30"
          >
            <span className="relative z-10 flex items-center gap-3">
              Solicitar Acceso Ahora
              <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Urgency Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base">
          <span className="text-red-400 font-semibold">⚡ PLAZAS LIMITADAS</span>
          <span className="text-white/30">·</span>
          <span className="text-yellow-400 font-semibold">Precio sube pronto</span>
          <span className="text-white/30">·</span>
          <span className="text-white/40">Asegura tu plaza</span>
        </div>

        {/* Social Proof */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-black flex items-center justify-center text-white/50 font-bold text-xs">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-semibold">5.0</span>
              </div>
              <p className="text-white/50 text-sm">
                Más de 500 miembros satisfechos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
