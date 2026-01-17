'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const benefits = [
  {
    number: '01',
    title: '5 Cursos Exclusivos',
    description: 'Formación premium que transforma tu mentalidad y resultados',
    icon: '/icons/CURSOS.png',
    color: 'from-blue-500/20 to-purple-500/20',
    glow: 'group-hover:shadow-blue-500/20'
  },
  {
    number: '02',
    title: 'Desafíos Semanales',
    description: 'Compite, crece y gana premios junto a la comunidad',
    icon: '/icons/DESAFIOS.png',
    color: 'from-yellow-500/20 to-orange-500/20',
    glow: 'group-hover:shadow-yellow-500/20'
  },
  {
    number: '03',
    title: 'Sistema de Niveles',
    description: 'Progresa, desbloquea recompensas exclusivas y destaca',
    icon: '/icons/NIVELES.png',
    color: 'from-purple-500/20 to-pink-500/20',
    glow: 'group-hover:shadow-purple-500/20'
  },
  {
    number: '04',
    title: 'Valor Diario',
    description: 'Cada miembro aporta. Crecimiento colectivo real y medible',
    icon: '/icons/VALOR.png',
    color: 'from-cyan-500/20 to-blue-500/20',
    glow: 'group-hover:shadow-cyan-500/20'
  },
  {
    number: '05',
    title: 'Red de Contactos',
    description: 'Rodéate de personas ambiciosas que van en tu dirección',
    icon: '/icons/REDDECONTACTOS.png',
    color: 'from-green-500/20 to-emerald-500/20',
    glow: 'group-hover:shadow-green-500/20'
  },
  {
    number: '06',
    title: 'Acceso de Por Vida',
    description: 'Accede ahora. Beneficios para siempre. Sin cuotas',
    icon: '/icons/ACCESO.png',
    color: 'from-white/10 to-gray-500/20',
    glow: 'group-hover:shadow-white/20'
  }
]

export default function CreativeBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cardRotations, setCardRotations] = useState<{ [key: number]: { x: number; y: number } }>({})
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

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

  // Swoosh up animation estilo Apple
  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        const cardRect = card.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const cardTop = cardRect.top

        // Calcular cuando la card entra en vista desde abajo
        // progress va de 1 (abajo) a 0 (completamente en vista)
        const triggerPoint = windowHeight * 0.8 // Empieza cuando está 80% abajo
        const progress = Math.max(0, Math.min(1, (cardTop - triggerPoint) / (windowHeight * 0.3)))

        if (cardTop < windowHeight && cardTop > -cardRect.height) {
          // Swoosh effect: viene desde abajo con blur
          const translateY = progress * 60 // Se mueve 60px desde abajo
          const opacity = 1 - progress * 0.8 // Fade in
          const blur = progress * 8 // Blur que desaparece
          const scale = 0.95 + (1 - progress) * 0.05 // Slight scale up

          card.style.transform = `translateY(${translateY}px) scale(${scale})`
          card.style.opacity = opacity.toString()
          card.style.filter = `blur(${blur}px)`
          card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out, filter 0.6s ease-out'
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Call inicial

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = x / rect.width
    const yPercent = y / rect.height

    const rotateY = (xPercent - 0.5) * 10
    const rotateX = (0.5 - yPercent) * 10

    setCardRotations((prev) => ({
      ...prev,
      [index]: { x: rotateX, y: rotateY },
    }))
  }

  const handleCardMouseLeave = (index: number) => {
    setCardRotations((prev) => ({
      ...prev,
      [index]: { x: 0, y: 0 },
    }))
  }

  return (
    <section ref={sectionRef} id="beneficios" className="py-32 px-6 relative overflow-hidden">
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
            className="hidden md:block absolute -top-20 right-[10%] w-[200px] h-[200px] pointer-events-none"
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
            className="hidden lg:block absolute top-[270px] left-[calc(0%-70px)] w-[150px] h-[150px] pointer-events-none z-20"
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
          {benefits.map((benefit, index) => {
            const rotation = cardRotations[index] || { x: 0, y: 0 }
            
            return (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => {
                setHoveredIndex(null)
                handleCardMouseLeave(index)
              }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              className={`group relative p-8 rounded-2xl border border-white/10 
                         bg-gradient-to-br ${benefit.color}
                         backdrop-blur-xl
                         hover:border-white/30
                         transition-all duration-200 ease-out
                         shadow-2xl ${benefit.glow}
                         ${index === 5 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center bottom',
                willChange: 'transform, opacity, filter'
              }}
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
                <div className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-500">
                  <Image 
                    src={benefit.icon} 
                    alt={benefit.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
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
          )})}
        </div>

        {/* Bottom Statement - Premium Card */}
        <button 
          onClick={() => {
            const nextSection = document.getElementById('cursos')
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="
            group relative w-full mt-16 py-5 md:py-6 px-6 md:px-8 rounded-xl 
            bg-white/[0.03]
            border border-white/[0.06]
            backdrop-blur-xl
            overflow-hidden
            transition-all duration-500 ease-out
            hover:border-white/[0.12]
            hover:bg-white/[0.05]
            cursor-pointer
          "
        >
          {/* Animated gradient background on hover */}
          <div 
            className="
              absolute inset-0 opacity-0 group-hover:opacity-100
              transition-opacity duration-700
            "
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
            }}
          />
          
          {/* Shine effect on hover */}
          <div 
            className="
              absolute inset-0 -translate-x-full group-hover:translate-x-full
              transition-transform duration-1000 ease-in-out
            "
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
            }}
          />
          
          {/* Top accent line */}
          <div 
            className="
              absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3
              bg-gradient-to-r from-transparent via-white/30 to-transparent
              group-hover:w-2/3 group-hover:via-white/50
              transition-all duration-500
            "
          />
          
          {/* Content - centered */}
          <p className="relative z-10 text-lg md:text-xl text-white/60 group-hover:text-white/80 transition-colors duration-500 text-center">
            <span className="text-white/90 font-medium">Valor infinito</span>.{' '}
            <span className="font-medium text-white/70 group-hover:text-white/90 transition-colors duration-500">
              Cambia tu vida hoy
            </span>
            <svg className="inline-block w-4 h-4 ml-2 opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </p>
        </button>
      </div>
    </section>
  )
}
