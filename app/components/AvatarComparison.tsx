'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface CardRotation {
  [key: number]: { x: number; y: number }
}

export default function AvatarComparison() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [cardRotations, setCardRotations] = useState<CardRotation>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 25
    const rotateY = (centerX - x) / 25

    setCardRotations(prev => ({
      ...prev,
      [cardId]: { x: rotateX, y: rotateY }
    }))
  }

  const handleCardMouseLeave = (cardId: number) => {
    setCardRotations(prev => ({
      ...prev,
      [cardId]: { x: 0, y: 0 }
    }))
  }

  const stats = {
    before: [
      { label: 'Confianza', value: 25, color: 'from-red-500 to-red-600' },
      { label: 'Disciplina', value: 20, color: 'from-red-500 to-red-600' },
      { label: 'Progreso', value: 15, color: 'from-red-500 to-red-600' },
      { label: 'Red social', value: 10, color: 'from-red-500 to-red-600' },
    ],
    after: [
      { label: 'Confianza', value: 95, color: 'from-green-400 to-green-600' },
      { label: 'Disciplina', value: 90, color: 'from-green-400 to-green-600' },
      { label: 'Progreso', value: 92, color: 'from-green-400 to-green-600' },
      { label: 'Red social', value: 98, color: 'from-green-400 to-green-600' },
    ],
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-4 md:px-6 py-32 md:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        
        {/* Grain */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Label */}
        <div className="mb-12">
          <span className="font-mono text-xs tracking-wider text-white/30">/ 05</span>
        </div>

        {/* Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.1] tracking-tight mb-6" style={{ transform: 'scaleY(1.1)' }}>
            <span className="block text-white">¿Cuál prefieres</span>
            <span className="block text-white/60">ser?</span>
          </h2>
          
          <p className="text-white/60 text-lg leading-relaxed">
            Una comunidad que te impulsa puede transformar tu vida por completo. <br className="hidden md:block" />
            El apoyo colectivo no es opcional. Es tu ventaja competitiva.
          </p>
        </div>

        {/* Comparison Grid - Square Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          
          {/* BEFORE Card */}
          <div
            className={`group relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            onMouseMove={(e) => handleCardMouseMove(e, 1)}
            onMouseLeave={() => handleCardMouseLeave(1)}
          >
            <div
              className="relative aspect-square p-8 md:p-10 rounded-2xl border border-white/10 
                       bg-white/[0.02] backdrop-blur-xl
                       hover:bg-white/[0.04] hover:border-red-500/30
                       transition-all duration-500 ease-out overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateX(${cardRotations[1]?.x || 0}deg) rotateY(${cardRotations[1]?.y || 0}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >

              {/* Content */}
              <div className="relative h-full flex flex-col">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 w-fit mb-6">
                  <span className="text-2xl">😔</span>
                  <span className="text-sm font-mono text-red-400">ANTES</span>
                </div>

                {/* Avatar - Full size with vignette - usando img nativo para evitar Next.js processing */}
                <div className="absolute inset-0 -z-10 overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
                  <img
                    src="/avatars/triste.png"
                    alt="Antes"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'grayscale(100%)',
                      opacity: 0.4,
                      pointerEvents: 'none'
                    }}
                  />
                  
                  {/* Dark vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 mb-6 text-center">
                  Solo. Sin rumbo.
                </h3>

                {/* Stats */}
                <div className="space-y-4 flex-1">
                  {stats.before.map((stat, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/50">{stat.label}</span>
                        <span className="text-sm font-mono text-white/30">{stat.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ 
                            width: isVisible ? `${stat.value}%` : '0%',
                            transitionDelay: `${idx * 100}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer note */}
                <p className="text-xs text-white/30 text-center mt-6">
                  Sin apoyo, el progreso es lento y solitario
                </p>
              </div>
            </div>
          </div>

          {/* AFTER Card */}
          <div
            className={`group relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            onMouseMove={(e) => handleCardMouseMove(e, 2)}
            onMouseLeave={() => handleCardMouseLeave(2)}
          >
            <div
              className="relative aspect-square p-8 md:p-10 rounded-2xl border border-white/10 
                       bg-white/[0.02] backdrop-blur-xl
                       hover:bg-white/[0.04] hover:border-green-500/30
                       transition-all duration-500 ease-out overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateX(${cardRotations[2]?.x || 0}deg) rotateY(${cardRotations[2]?.y || 0}deg) scale(${cardRotations[2] ? 1.02 : 1})`,
                transformStyle: 'preserve-3d',
              }}
            >


              {/* Content */}
              <div className="relative h-full flex flex-col">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 w-fit mb-6">
                  <span className="text-2xl">🔥</span>
                  <span className="text-sm font-mono text-green-400">DESPUÉS</span>
                </div>

                {/* Avatar - Full size with vignette - usando img nativo para evitar Next.js processing */}
                <div className="absolute inset-0 -z-10 overflow-hidden flex items-end justify-center" style={{ backgroundColor: 'transparent', paddingBottom: '15%' }}>
                  <img
                    src="/avatars/chad.png"
                    alt="Después"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center bottom',
                      opacity: 0.4,
                      transform: 'scale(1.8)',
                      pointerEvents: 'none'
                    }}
                  />
                  
                  {/* Dark vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                  Imparable. En comunidad.
                </h3>

                {/* Stats */}
                <div className="space-y-4 flex-1">
                  {stats.after.map((stat, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/70">{stat.label}</span>
                        <span className="text-sm font-mono text-green-400">{stat.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                          style={{ 
                            width: isVisible ? `${stat.value}%` : '0%',
                            transitionDelay: `${idx * 100 + 200}ms`
                          }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer note */}
                <p className="text-xs text-green-400/70 text-center mt-6 font-medium">
                  Con comunidad, el crecimiento se multiplica ×10
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div 
          className={`text-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-2xl mx-auto p-10 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              La diferencia está en la comunidad
            </h3>
            <p className="text-white/60 mb-8">
              No es solo acceso. Es tener personas que entienden tu lucha, te empujan cuando flaqueas y celebran tus victorias.
            </p>
            <a
              href="/acceso"
              className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold 
                       bg-white/5 border border-white/20 rounded-full text-white 
                       transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
            >
              Solicitar acceso
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
