'use client'

import { useEffect, useRef, useState } from 'react'

const benefits = [
  {
    number: '01',
    title: '5 Cursos Exclusivos',
    description: 'Formación que no encontrarás en ningún otro sitio',
  },
  {
    number: '02',
    title: 'Desafíos',
    description: 'Compite con otras personas y gana premios',
  },
  {
    number: '03',
    title: 'Sistema de Niveles',
    description: 'Progresa, desbloquea recompensas, destaca',
  },
  {
    number: '04',
    title: 'Valor Diario',
    description: 'Cada miembro aporta valor cada día',
  },
  {
    number: '05',
    title: 'Red de Contactos',
    description: 'Rodéate de gente ambiciosa',
  },
]

export default function CreativeBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)

  return (
    <section id="beneficios" ref={sectionRef} className="py-40 px-6 relative overflow-hidden">
      <div ref={benefitsRef} className="max-w-7xl mx-auto relative z-10">
        {/* Header - Asymmetric */}
        <div className="mb-32">
          <p className="text-xs font-mono text-white/30 tracking-wider mb-4">/ 02</p>
          <h2 className="font-display text-5xl md:text-7xl font-normal tracking-normal text-white" style={{ transform: 'scaleY(1.15)' }}>
            Dentro
          </h2>
        </div>

        {/* Benefits List - Minimal & Spacious */}
        <div className="space-y-1">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-t border-white/5 py-8 cursor-pointer
                       transition-all duration-500 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-8">
                {/* Number */}
                <span className="font-mono text-sm text-white/20 group-hover:text-white/60 
                               transition-colors duration-500 mt-2">
                  {benefit.number}
                </span>

                {/* Title */}
                <div className="flex-1">
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-2
                               transition-all duration-500 group-hover:translate-x-4">
                    {benefit.title}
                  </h3>
                  <p className={`text-lg text-white/40 max-w-2xl transition-all duration-500
                              ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    {benefit.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Hover Line */}
              <div className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-white/0 via-white/50 to-white/0
                            transition-all duration-700 ${hoveredIndex === index ? 'w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA Text */}
        <div className="mt-32 max-w-2xl">
          <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed">
            No es solo contenido.{' '}
            <span className="text-white">Es una comunidad que te impulsa</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
