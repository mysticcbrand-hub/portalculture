'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Card {
  id: number
  title: string
  description: string
  image: string
  features: string[]
}

const cards: Card[] = [
  {
    id: 1,
    title: 'Discord Exclusivo',
    description: 'Acceso inmediato a nuestra comunidad privada',
    image: '/discord-preview.jpg', // Placeholder - reemplazar con tu captura
    features: [
      'Chat 24/7 con miembros activos',
      'Canales especializados por tema',
      'Eventos semanales en vivo',
      'Networking con emprendedores',
    ],
  },
  {
    id: 2,
    title: '5 Cursos Premium',
    description: 'Contenido exclusivo valorado en +$500',
    image: '/courses-preview.jpg', // Placeholder - reemplazar con tu captura
    features: [
      'Mindset de Alto Rendimiento',
      'Productividad Extrema',
      'Finanzas Personales',
      'Networking & Influencia',
    ],
  },
  {
    id: 3,
    title: 'Desafíos & Gamificación',
    description: 'Sistema de progreso que te mantiene motivado',
    image: '/challenges-preview.jpg', // Placeholder - reemplazar con tu captura
    features: [
      'Retos semanales con premios',
      'Sistema de niveles y XP',
      'Leaderboard competitivo',
      'Insignias y logros desbloqueables',
    ],
  },
]

export default function WhatYouGet() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-mono text-xs tracking-wider text-white/30 mb-4 block">
            / 02
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[1.1] tracking-normal mb-6">
            <span className="block text-white">Lo que</span>
            <span className="block text-white">obtienes</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl">
            Acceso instantáneo a todo. Sin límites, sin esperas.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
              style={{
                perspective: '1000px',
              }}
            >
              <div
                className="relative h-full transition-all duration-500 ease-out"
                style={{
                  transform: hoveredCard === card.id 
                    ? 'rotateX(5deg) rotateY(-5deg) translateY(-10px)' 
                    : 'rotateX(0) rotateY(0) translateY(0)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Card */}
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:bg-white/8 group-hover:border-white/20">
                  
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                    {/* Image */}
                    {card.id === 1 && (
                      <Image
                        src="/discord-preview.jpg"
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    {/* Placeholder for cards 2 and 3 */}
                    {card.id !== 1 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-20">
                          {card.id === 2 && '📚'}
                          {card.id === 3 && '🎮'}
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Hover Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Number */}
                    <div className="text-sm font-mono text-white/30 mb-3">
                      0{card.id}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 mb-6 text-sm md:text-base">
                      {card.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {card.features.map((feature, idx) => (
                        <li 
                          key={idx}
                          className="flex items-start gap-2 text-white/50 text-sm group-hover:text-white/70 transition-colors"
                        >
                          <span className="text-white/30 mt-1">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shine Effect on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
                      backgroundSize: '200% 200%',
                      animation: hoveredCard === card.id ? 'shine 2s ease-in-out' : 'none',
                    }}
                  />
                </div>

                {/* 3D Shadow */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    transform: 'translateZ(-50px)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-white/40 text-sm md:text-base mb-2">
            + Acceso de por vida · Sin pagos recurrentes · Sin trucos
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  )
}
