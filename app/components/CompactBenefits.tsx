'use client'

import { useState } from 'react'

const benefits = [
  {
    number: '01',
    title: '5 Cursos Exclusivos',
    description: 'Contenido premium diseñado por expertos en desarrollo personal y crecimiento profesional.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Comunidad Elite',
    description: 'Networking con emprendedores, inversores y profesionales de alto nivel. Discord privado.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Desafíos Semanales',
    description: 'Retos diseñados para sacar tu máximo potencial. Competencias, premios y reconocimiento.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

export default function CompactBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm md:text-base font-mono text-white/40 uppercase tracking-widest mb-4">
            Lo que obtienes
          </p>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Acceso Premium
            </span>
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group cursor-pointer transition-all duration-500 ${
                hoveredIndex === index ? 'scale-105' : hoveredIndex !== null ? 'scale-95 opacity-50' : ''
              }`}
            >
              {/* Card */}
              <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                {/* Number */}
                <div className="text-6xl font-bold text-white/10 mb-4 group-hover:text-white/20 transition-colors">
                  {benefit.number}
                </div>

                {/* Icon */}
                <div className="mb-6 text-white/60 group-hover:text-white transition-colors">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-white/50 uppercase tracking-wide">Miembros</div>
          </div>
          <div className="text-center border-l border-r border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">5</div>
            <div className="text-sm text-white/50 uppercase tracking-wide">Cursos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-sm text-white/50 uppercase tracking-wide">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  )
}
