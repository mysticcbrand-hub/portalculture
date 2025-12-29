'use client'

import { useEffect, useRef, useState } from 'react'

interface Benefit {
  title: string
  description: string
  icon: JSX.Element
}

const benefits: Benefit[] = [
  {
    title: '5 Cursos Exclusivos',
    description: 'Formación que no encontrarás en ningún otro sitio',
    icon: (
      <svg className="w-12 h-12 icon-glow" fill="none" stroke="url(#chrome-gradient)" strokeWidth="1.5" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="chrome-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C0C0C0" />
            <stop offset="50%" stopColor="#E8E8E8" />
            <stop offset="100%" stopColor="#A8A8A8" />
          </linearGradient>
        </defs>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: 'Desafíos',
    description: 'Compite con otras personas y gana premios',
    icon: (
      <svg className="w-12 h-12 icon-glow" fill="none" stroke="url(#chrome-gradient)" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
  {
    title: 'Sistema de Niveles',
    description: 'Progresa, desbloquea recompensas, destaca',
    icon: (
      <svg className="w-12 h-12 icon-glow" fill="none" stroke="url(#chrome-gradient)" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: 'Valor Diario',
    description: 'Cada miembro aporta valor cada día. Crecimiento colectivo real',
    icon: (
      <svg className="w-12 h-12 icon-glow" fill="none" stroke="url(#chrome-gradient)" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Red de Contactos',
    description: 'Rodéate de gente ambiciosa que va en tu dirección',
    icon: (
      <svg className="w-12 h-12 icon-glow" fill="none" stroke="url(#chrome-gradient)" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
]

export default function BenefitCards() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target as HTMLDivElement)
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards(prev => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  // 3D hover effect with mouse tracking - Apple-level smooth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect()
    
    // Calculate relative position (0 to 1)
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    // Calculate rotation (max 12 degrees)
    const rotateY = (x - 0.5) * 12
    const rotateX = (0.5 - y) * 12
    
    // Calculate slight translation for depth
    const translateX = (x - 0.5) * 8
    const translateY = (y - 0.5) * 8
    
    // Calculate spotlight position
    const glowX = x * 100
    const glowY = y * 100
    
    // Apply transformations with smooth transition + scale up
    card.style.transition = 'box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateX(${translateX}px)
      translateY(${translateY}px)
      translateZ(30px)
      scale3d(1.05, 1.05, 1.05)
    `
    
    // Update CSS variables for spotlight
    card.style.setProperty('--mouse-x', `${glowX}%`)
    card.style.setProperty('--mouse-y', `${glowY}%`)
  }

  const handleMouseEnter = (card: HTMLDivElement) => {
    // Add scale up on hover for better responsiveness
    card.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
  }

  const handleMouseLeave = (card: HTMLDivElement) => {
    card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateX(0)
      translateY(0)
      translateZ(0)
      scale3d(1, 1, 1)
    `
  }

  return (
    <section id="beneficios" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 fade-in-up visible">
          <h2 className="text-4xl md:text-5xl font-bold chrome-gradient-text mb-4">
            Lo que obtienes dentro
          </h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto">
            Cinco pilares que transformarán tu forma de crecer y conectar
          </p>
        </div>

        {/* Benefits Grid - Bento Box Style - Properly Aligned */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {/* Card 1 - 5 Cursos Exclusivos - TALL (Left) */}
          <div
            ref={(el) => { cardsRef.current[0] = el }}
            className={`benefit-card cursor-pointer fade-in-up ${
              visibleCards.has(0) ? 'visible' : ''
            } stagger-1 md:col-span-6 lg:col-span-4 lg:row-span-2`}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          >
            <div className="mb-6 icon-float">
              {benefits[0].icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 chrome-gradient-text">
              {benefits[0].title}
            </h3>
            <p className="text-base opacity-80 leading-relaxed">
              {benefits[0].description}
            </p>
          </div>

          {/* Card 2 - Desafíos - WIDE (Top Right) */}
          <div
            ref={(el) => { cardsRef.current[1] = el }}
            className={`benefit-card cursor-pointer fade-in-up ${
              visibleCards.has(1) ? 'visible' : ''
            } stagger-2 md:col-span-6 lg:col-span-5`}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          >
            <div className="mb-6 icon-float">
              {benefits[1].icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 chrome-gradient-text">
              {benefits[1].title}
            </h3>
            <p className="text-base opacity-80 leading-relaxed">
              {benefits[1].description}
            </p>
          </div>

          {/* Card 3 - Sistema de Niveles - SQUARE (Top Right Corner) */}
          <div
            ref={(el) => { cardsRef.current[2] = el }}
            className={`benefit-card cursor-pointer fade-in-up ${
              visibleCards.has(2) ? 'visible' : ''
            } stagger-3 md:col-span-3 lg:col-span-3`}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          >
            <div className="mb-6 icon-float">
              {benefits[2].icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 chrome-gradient-text">
              {benefits[2].title}
            </h3>
            <p className="text-base opacity-80 leading-relaxed">
              {benefits[2].description}
            </p>
          </div>

          {/* Card 4 - Valor Diario - WIDE (Middle Right) */}
          <div
            ref={(el) => { cardsRef.current[3] = el }}
            className={`benefit-card cursor-pointer fade-in-up ${
              visibleCards.has(3) ? 'visible' : ''
            } stagger-4 md:col-span-3 lg:col-span-5`}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          >
            <div className="mb-6 icon-float">
              {benefits[3].icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 chrome-gradient-text">
              {benefits[3].title}
            </h3>
            <p className="text-base opacity-80 leading-relaxed">
              {benefits[3].description}
            </p>
          </div>

          {/* Card 5 - Red de Contactos - MEDIUM (Bottom Right) */}
          <div
            ref={(el) => { cardsRef.current[4] = el }}
            className={`benefit-card cursor-pointer fade-in-up ${
              visibleCards.has(4) ? 'visible' : ''
            } stagger-5 md:col-span-6 lg:col-span-3`}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          >
            <div className="mb-6 icon-float">
              {benefits[4].icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 chrome-gradient-text">
              {benefits[4].title}
            </h3>
            <p className="text-base opacity-80 leading-relaxed">
              {benefits[4].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
