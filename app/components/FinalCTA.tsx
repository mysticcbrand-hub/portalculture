'use client'

import { useEffect, useRef, useState } from 'react'

interface FinalCTAProps {
  onCtaClick: () => void
}

export default function FinalCTA({ onCtaClick }: FinalCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [memberCount] = useState(247) // Could be dynamic

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Magnetic button effect - Apple smooth
  useEffect(() => {
    let animationFrameId: number
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current) return
      
      const rect = btnRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      
      // Magnetic radius: 100px
      if (distance < 100) {
        const strength = (100 - distance) / 100
        targetX = distanceX * strength * 0.4
        targetY = distanceY * strength * 0.4
      } else {
        targetX = 0
        targetY = 0
      }
    }

    const animate = () => {
      if (!btnRef.current) return
      
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15
      
      const scale = targetX !== 0 || targetY !== 0 ? 1.05 : 1
      btnRef.current.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`
      
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section 
      id="cta"
      ref={sectionRef} 
      className="relative py-40 px-6 overflow-hidden"
    >
      {/* Background Spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent opacity-50"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold chrome-gradient-text mb-6 fade-in-up ${isVisible ? 'visible' : ''}`}>
          ¿Listo para dar el salto?
        </h2>

        {/* Subline */}
        <p className={`text-xl md:text-2xl opacity-70 mb-12 fade-in-up ${isVisible ? 'visible' : ''} stagger-1`}>
          Rodéate de jóvenes con tu misma mentalidad. Construid juntos.
        </p>

        {/* Premium CTA Button */}
        <div className={`mb-8 fade-in-up ${isVisible ? 'visible' : ''} stagger-2`}>
          <a
            ref={btnRef}
            href="https://app.portalculture.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-5 px-12 
                     font-semibold text-lg text-white magnetic-btn
                     rounded-2xl
                     transition-all duration-500 inline-block"
          >
            <span className="relative z-10">Solicitar Acceso Ahora</span>
            
            {/* Arrow icon */}
            <svg 
              className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Micro text */}
        <p className={`text-sm opacity-50 fade-in-up ${isVisible ? 'visible' : ''} stagger-3`}>
          100% gratuito · Proceso de selección activo
        </p>

        {/* Trust indicators */}
        <div className={`mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60 fade-in-up ${isVisible ? 'visible' : ''} stagger-4`}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Proceso verificado</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-sm">Respuesta en 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">Sin compromiso</span>
          </div>
        </div>
      </div>
    </section>
  )
}
