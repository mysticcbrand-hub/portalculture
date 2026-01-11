'use client'

import { useEffect, useRef, useState } from 'react'

interface CardRotation {
  [key: number]: { x: number; y: number }
}

export default function AICoachSection() {
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
    const rotateX = (y - centerY) / 30
    const rotateY = (centerX - x) / 30

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

  const features = [
    {
      id: 1,
      icon: '🧠',
      title: 'Conocimiento científico',
      description: 'Entrenado con Atomic Habits, Huberman Lab y estrategias probadas',
    },
    {
      id: 2,
      icon: '💪',
      title: 'Planes personalizados',
      description: 'Adaptado a tu nivel, contexto y objetivos específicos',
    },
    {
      id: 3,
      icon: '⚡',
      title: 'Respuestas al instante',
      description: 'Disponible 24/7 cuando más lo necesites',
    },
    {
      id: 4,
      icon: '🔥',
      title: 'Motivación real',
      description: 'No solo teoría. Energía y accountability en cada mensaje',
    },
  ]

  return (
    <section 
      ref={sectionRef}
      id="nova"
      className="relative min-h-screen flex items-center px-4 md:px-6 py-32 md:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        {/* Grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Label */}
        <div className="mb-12">
          <span className="font-mono text-xs tracking-wider text-white/30">/ 04</span>
        </div>

        {/* Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.1] tracking-tight mb-6" style={{ transform: 'scaleY(1.1)' }}>
            <span className="block text-white">Tu coach.</span>
            <span className="block text-white/60">Tu comunidad.</span>
          </h2>
          
          <div className="space-y-4 text-white/60 text-lg leading-relaxed">
            <p>
              NOVA no es un bot cualquiera. Es tu mentor del desarrollo colectivo entrenado con libros y cientos de horas de conocimiento de las mejores estrategias para ti.
            </p>
            <p>
              Responde con sistemas reales, pasos accionables y la energía que necesitas para transformar tu vida.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const rotation = cardRotations[feature.id] || { x: 0, y: 0 }
            
            return (
              <div
                key={feature.id}
                className={`group relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseMove={(e) => handleCardMouseMove(e, feature.id)}
                onMouseLeave={() => handleCardMouseLeave(feature.id)}
              >
                {/* Card */}
                <div
                  className="relative h-full p-8 rounded-2xl border border-white/10 
                           bg-white/[0.02] backdrop-blur-xl
                           hover:bg-white/[0.04] hover:border-white/20
                           transition-all duration-500 ease-out"
                  style={{
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 
                             opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-2xl -z-10"
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-5xl mb-6">
                      {feature.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/50 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Chat Preview - Centered */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Main Chat Card */}
          <div
            className="group relative p-8 md:p-10 rounded-2xl border border-white/10 
                     bg-white/[0.02] backdrop-blur-xl
                     hover:bg-white/[0.04] hover:border-white/20
                     transition-all duration-500"
            onMouseMove={(e) => handleCardMouseMove(e, 99)}
            onMouseLeave={() => handleCardMouseLeave(99)}
            style={{
              transform: `perspective(1000px) rotateX(${cardRotations[99]?.x || 0}deg) rotateY(${cardRotations[99]?.y || 0}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Glow */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 
                       opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-2xl -z-10"
            />

            {/* Header */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/ai.png" 
                    alt="NOVA AI" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-3 border-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">NOVA</h3>
                <p className="text-sm text-white/40">Activo ahora</p>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-5">
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl rounded-tr-sm px-5 py-4 max-w-[80%]">
                  <p className="text-base text-white/90">
                    Oye Nova, ¿cómo puedo ganar músculo rápido?
                  </p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex justify-start">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%]">
                  <p className="text-base text-white/90 leading-relaxed">
                    Escucha bien 👉 ¡Olvídate de los atajos! Ganar músculo rápido existe, pero requiere un enfoque BRUTAL y consistente. No es magia, es ciencia y disciplina. 😤
                    <br /><br />
                    La verdad directa es que necesitas un triple ataque: entrenamiento INTENSO, nutrición CALCULADA y descanso PRIORITARIO. ¿Estás dispuesto a comprometerte con los tres? 💥
                    <br /><br />
                    Aquí tienes el protocolo de choque en 5 pasos:
                    <br /><br />
                    <strong>Entrenamiento de Fuerza:</strong> 3-4 veces por semana. Enfócate en ejercicios compuestos (sentadillas, peso muerto, press de banca, dominadas). Sobrecarga progresiva SEMANAL. Aumenta el peso, las repeticiones o las series. 💪
                  </p>
                  <span className="inline-block mt-3 text-xs text-white/30">Hace 1s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a
            href="/acceso"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-medium overflow-hidden rounded-full
                     bg-white/5 border border-white/10 hover:border-white/20
                     transition-all duration-500 hover:scale-[1.02]"
          >
            <span className="relative z-10">Accede a NOVA</span>
            <svg 
              className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/20 opacity-0 group-hover:opacity-60
                          transition-opacity duration-700 -z-10 scale-150" />
          </a>

          <p className="mt-6 text-sm text-white/30 font-mono tracking-wide">
            +1,000 conversaciones transformadoras
          </p>
        </div>
      </div>
    </section>
  )
}
