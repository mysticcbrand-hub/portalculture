'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface NewHeroProps {
  onCtaClick: () => void
}

export default function NewHero({ onCtaClick }: NewHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Editorial Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="relative w-full h-full"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <Image
            src="/hero-editorial.jpg"
            alt="Portal Culture"
            fill
            className="object-cover opacity-40"
            style={{ filter: 'grayscale(100%) contrast(1.2)' }}
            priority
          />
        </div>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full backdrop-blur-sm mb-8 animate-fadeIn">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs md:text-sm font-mono text-white/60 uppercase tracking-widest">
            Plazas Limitadas
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fadeInUp">
          <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            PORTAL
          </span>
          <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            CULTURE
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white/70 font-light mb-4 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Comunidad exclusiva de élite
        </p>
        
        <p className="text-base md:text-lg text-white/50 mb-12 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          Desarrollo personal · Networking premium · Acceso a cursos exclusivos
        </p>

        {/* CTA Button */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={onCtaClick}
            className="group relative px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-semibold text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
          >
            <span className="relative z-10">Solicitar Acceso Ahora</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <span className="text-red-400 font-semibold">⚡ PLAZAS LIMITADAS</span>
            <span className="text-white/30">·</span>
            <span className="text-yellow-400">Precio sube pronto</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </section>
  )
}
