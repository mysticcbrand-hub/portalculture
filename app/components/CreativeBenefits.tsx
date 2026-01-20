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
  
  // Mobile smooth carousel state
  const [isMobile, setIsMobile] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [dragState, setDragState] = useState({ x: 0, y: 0, startX: 0, startY: 0 })
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  // Swoosh up animation estilo Apple - OPTIMIZED for mobile
  useEffect(() => {
    // Check if mobile for simpler animations
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    
    const handleScroll = () => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        const cardRect = card.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const cardTop = cardRect.top

        // Calcular cuando la card entra en vista desde abajo
        const triggerPoint = windowHeight * 0.85 // Start earlier for smoother entrance
        const progress = Math.max(0, Math.min(1, (cardTop - triggerPoint) / (windowHeight * 0.25)))

        if (cardTop < windowHeight && cardTop > -cardRect.height) {
          if (isMobile) {
            // MOBILE: Simple fade + subtle translateY only (no blur, no scale - smoother)
            const translateY = progress * 30 // Less movement on mobile
            const opacity = 1 - progress * 0.6

            card.style.transform = `translateY(${translateY}px)`
            card.style.opacity = opacity.toString()
            card.style.filter = 'none' // No blur on mobile - causes jank
            card.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out'
          } else {
            // DESKTOP: Full effect
            const translateY = progress * 50
            const opacity = 1 - progress * 0.7
            const blur = progress * 4 // Reduced blur
            const scale = 0.97 + (1 - progress) * 0.03

            card.style.transform = `translateY(${translateY}px) scale(${scale})`
            card.style.opacity = opacity.toString()
            card.style.filter = `blur(${blur}px)`
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease-out'
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Call inicial

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Skip 3D effect on mobile/touch devices for better performance
    if (window.matchMedia('(hover: none)').matches) return
    
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

  // Smooth swipe handlers - addictive and elegant
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    const touch = e.touches[0]
    setIsDragging(true)
    setDragState({
      x: 0,
      y: 0,
      startX: touch.clientX,
      startY: touch.clientY
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isMobile) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragState.startX
    const deltaY = touch.clientY - dragState.startY
    setDragState(prev => ({ ...prev, x: deltaX, y: deltaY }))
  }

  const handleTouchEnd = () => {
    if (!isMobile) return
    setIsDragging(false)
    
    const threshold = 80 // Lower threshold for smoother feel
    
    if (dragState.x < -threshold) {
      // Swipe left - next (with loop)
      if (currentCardIndex < benefits.length - 1) {
        setCurrentCardIndex(prev => prev + 1)
      } else {
        // Loop back to first
        setCurrentCardIndex(0)
      }
    } else if (dragState.x > threshold) {
      // Swipe right - previous (with loop)
      if (currentCardIndex > 0) {
        setCurrentCardIndex(prev => prev - 1)
      } else {
        // Loop to last
        setCurrentCardIndex(benefits.length - 1)
      }
    }
    
    setDragState({ x: 0, y: 0, startX: 0, startY: 0 })
  }

  const goToCard = (index: number) => {
    setCurrentCardIndex(index)
    setDragState({ x: 0, y: 0, startX: 0, startY: 0 })
  }

  return (
    <section ref={sectionRef} id="beneficios" className="py-12 md:py-32 px-5 md:px-6 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 relative">
          <p className="text-[10px] md:text-xs font-mono text-white/30 tracking-wider mb-3 md:mb-4">/ 02 BENEFICIOS</p>
          <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent px-4">
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

        {/* Mobile: Elegant Swipe Carousel - Desktop: Grid */}
        {isMobile ? (
          <div className="relative mb-8 px-4">
            {/* Progress bars - Top (like Stories) */}
            <div className="flex gap-1.5 mb-5">
              {benefits.map((_, index) => (
                <div 
                  key={index}
                  className="flex-1 h-1 bg-white/15 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => goToCard(index)}
                >
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{
                      width: index < currentCardIndex ? '100%' : index === currentCardIndex ? '100%' : '0%',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Swipeable Card - with proper overflow handling */}
            <div 
              className="relative h-[420px] rounded-3xl overflow-hidden bg-black/20"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                // Ensure nothing bleeds outside - extra padding
                clipPath: 'inset(0 0 0 0 round 1.5rem)',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
              }}
            >
              {/* Cards container with 3D perspective */}
              <div 
                className="flex h-full"
                style={{ 
                  transform: `translateX(calc(-${currentCardIndex * 100}% + ${isDragging ? dragState.x : 0}px))`,
                  transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {benefits.map((benefit, index) => {
                  const isActive = index === currentCardIndex
                  const offset = index - currentCardIndex
                  
                  // Calculate 3D transforms based on drag and position
                  const dragRotation = isDragging && isActive ? dragState.x / 30 : 0
                  const dragScale = isDragging && isActive ? 1 - Math.abs(dragState.x) / 2000 : 1
                  const parallaxY = isDragging && isActive ? -Math.abs(dragState.x) / 20 : 0
                  
                  return (
                  <div key={index} className="w-full h-full flex-shrink-0 px-1">
                    <div 
                      className="relative w-full h-full rounded-3xl overflow-hidden"
                      style={{
                        background: `linear-gradient(145deg, 
                          rgba(255,255,255,0.12) 0%, 
                          rgba(255,255,255,0.06) 50%,
                          rgba(0,0,0,0.15) 100%)`,
                        boxShadow: `0 ${25 + Math.abs(dragRotation) * 2}px ${50 + Math.abs(dragRotation) * 3}px -12px rgba(0, 0, 0, ${0.5 + Math.abs(dragRotation) * 0.01}), inset 0 1px 0 rgba(255,255,255,0.1)`,
                        transform: `
                          perspective(1200px) 
                          rotateY(${dragRotation}deg) 
                          scale(${dragScale})
                          translateZ(${isActive ? 0 : offset * -50}px)
                        `,
                        transformStyle: 'preserve-3d',
                        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
                      }}
                    >
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-60`} />
                      
                      {/* Glass shine effect - enhanced */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 30%, transparent 60%)',
                        }}
                      />
                      
                      {/* Border glow with subtle animation */}
                      <div className="absolute inset-0 rounded-3xl border border-white/15 transition-all duration-300" />
                      
                      {/* Inner shadow for depth */}
                      <div 
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)',
                        }}
                      />

                      {/* Content with parallax */}
                      <div 
                        className="relative z-10 h-full flex flex-col p-7"
                        style={{
                          transform: `translateY(${parallaxY}px)`,
                          transition: isDragging ? 'none' : 'transform 0.4s ease-out',
                        }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <span 
                            className="text-7xl font-black leading-none"
                            style={{
                              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              transform: `translateX(${dragRotation * 0.5}px)`,
                              transition: isDragging ? 'none' : 'transform 0.4s ease-out',
                            }}
                          >
                            {benefit.number}
                          </span>
                          <div 
                            className="w-16 h-16 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
                            style={{
                              transform: `translateX(${-dragRotation * 0.3}px)`,
                              transition: isDragging ? 'none' : 'transform 0.4s ease-out',
                            }}
                          >
                            <Image 
                              src={benefit.icon} 
                              alt={benefit.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Main content - Bottom */}
                        <div className="space-y-4">
                          <h3 className="text-3xl font-bold text-white leading-tight">
                            {benefit.title}
                          </h3>
                          <p className="text-lg text-white/85 leading-relaxed">
                            {benefit.description}
                          </p>
                          
                          {/* Swipe hint */}
                          <div className="flex items-center justify-center gap-2 pt-4 text-white/40">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <span className="text-sm">Desliza</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
            
            {/* Counter */}
            <div className="text-center mt-5">
              <span className="text-sm text-white/50 font-medium">
                {currentCardIndex + 1} de {benefits.length}
              </span>
            </div>
          </div>
        ) : (
          // Desktop Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 max-w-[92%] md:max-w-none mx-auto">
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
                className={`group relative p-5 md:p-8 rounded-xl md:rounded-2xl border border-white/10 
                           bg-gradient-to-br ${benefit.color}
                           backdrop-blur-xl
                           hover:border-white/30
                           transition-all duration-200 ease-out
                           shadow-xl md:shadow-2xl ${benefit.glow}
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
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <span className="font-mono text-[10px] md:text-xs text-white/30 group-hover:text-white/60 
                                 transition-colors duration-500 tracking-wider">
                    {benefit.number}
                  </span>
                  <div className="w-9 h-9 md:w-12 md:h-12 transform group-hover:scale-110 transition-transform duration-500">
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
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-white 
                               transition-all duration-500">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed group-hover:text-white/80 
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
        )}

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
