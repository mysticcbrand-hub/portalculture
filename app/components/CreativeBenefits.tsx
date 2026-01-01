'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const benefits = [
  {
    number: '01',
    title: '5 Cursos Exclusivos',
    description: 'Formación premium que transforma tu mentalidad y resultados',
    icon: '📚',
    color: 'from-blue-500/20 to-purple-500/20',
    glow: 'group-hover:shadow-blue-500/20'
  },
  {
    number: '02',
    title: 'Desafíos Semanales',
    description: 'Compite, crece y gana premios junto a la comunidad',
    icon: '🏆',
    color: 'from-yellow-500/20 to-orange-500/20',
    glow: 'group-hover:shadow-yellow-500/20'
  },
  {
    number: '03',
    title: 'Sistema de Niveles',
    description: 'Progresa, desbloquea recompensas exclusivas y destaca',
    icon: '⚡',
    color: 'from-purple-500/20 to-pink-500/20',
    glow: 'group-hover:shadow-purple-500/20'
  },
  {
    number: '04',
    title: 'Valor Diario',
    description: 'Cada miembro aporta. Crecimiento colectivo real y medible',
    icon: '💎',
    color: 'from-cyan-500/20 to-blue-500/20',
    glow: 'group-hover:shadow-cyan-500/20'
  },
  {
    number: '05',
    title: 'Red de Contactos',
    description: 'Rodéate de personas ambiciosas que van en tu dirección',
    icon: '🤝',
    color: 'from-green-500/20 to-emerald-500/20',
    glow: 'group-hover:shadow-green-500/20'
  },
  {
    number: '06',
    title: 'Acceso de Por Vida',
    description: 'Accede gratis. Beneficios para siempre. Sin cuotas',
    icon: '∞',
    color: 'from-white/10 to-gray-500/20',
    glow: 'group-hover:shadow-white/20'
  }
]

export default function CreativeBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="beneficios" className="py-32 px-6 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 relative">
          <p className="text-[10px] md:text-xs font-mono text-white/30 tracking-wider mb-3 md:mb-4">/ 02 BENEFICIOS</p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent px-4">
            Dentro de Portal Culture
          </h2>
          <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed px-4">
            No es solo contenido. Es una <span className="text-white font-semibold">experiencia completa</span> diseñada para tu crecimiento
          </p>

          {/* Floating Rocks in Benefits Section - Hidden on mobile */}
          <div
            className="hidden md:block absolute top-[420px] right-[calc(66.666%-100px)] w-[180px] h-[180px] pointer-events-none z-20"
            style={{
              transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
              transition: 'transform 0.4s ease-out',
              filter: 'drop-shadow(0 35px 70px rgba(0, 0, 0, 0.4)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
            }}
          >
            <Image
              src="/roca_pequeña.png"
              alt=""
              fill
              className="object-contain"
              style={{ filter: 'brightness(1.1) contrast(1.1)' }}
            />
          </div>

          <div
            className="hidden md:block absolute top-32 left-[5%] w-[150px] h-[150px] pointer-events-none"
            style={{
              transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
              transition: 'transform 0.5s ease-out',
              filter: 'drop-shadow(0 35px 70px rgba(0, 0, 0, 0.4)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
            }}
          >
            <Image
              src="/roca_pequeña2.png"
              alt=""
              fill
              className="object-contain"
              style={{ filter: 'brightness(1.1) contrast(1.1)' }}
            />
          </div>
        </div>

        {/* Premium Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative p-8 rounded-2xl border border-white/10 
                         bg-gradient-to-br ${benefit.color}
                         backdrop-blur-xl
                         hover:border-white/30 hover:scale-[1.02]
                         transition-all duration-700 ease-out
                         shadow-2xl ${benefit.glow}
                         ${index === 5 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 
                             group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-2xl -z-10`} />

              {/* Number Badge */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-xs text-white/30 group-hover:text-white/60 
                               transition-colors duration-500 tracking-wider">
                  {benefit.number}
                </span>
                <div className="text-4xl transform group-hover:scale-110 transition-transform duration-500">
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white group-hover:text-white 
                             transition-all duration-500">
                  {benefit.title}
                </h3>
                <p className="text-white/60 leading-relaxed group-hover:text-white/80 
                            transition-colors duration-500">
                  {benefit.description}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0
                             transition-all duration-700 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="text-center mt-20 p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed">
            <span className="text-white font-semibold">100% gratuito</span>.{' '}
            <span className="text-white font-semibold">Valor infinito</span>.{' '}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-bold">
              Cambia tu vida hoy
            </span>.
          </p>
        </div>
      </div>
    </section>
  )
}
