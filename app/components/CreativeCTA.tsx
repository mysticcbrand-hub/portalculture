'use client'

import { useEffect, useRef, useState } from 'react'

interface CreativeCTAProps {
  onCtaClick: () => void
}

export default function CreativeCTA({ onCtaClick }: CreativeCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center px-5 py-24 md:py-32"
    >
      {/* Subtle accent glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.015) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        {/* Section label */}
        <div 
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-[11px] font-mono text-white/25 tracking-widest">/ 06</span>
        </div>

        {/* Main heading */}
        <h2 
          className={`text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight leading-[1.1] transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          ¿Listo para
          <br />
          <span className="text-white/60">dar el salto?</span>
        </h2>

        {/* Subtext */}
        <p 
          className={`text-lg md:text-xl text-white/40 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Rodéate de jóvenes con tu misma mentalidad.
        </p>

        {/* CTA Button - Glassmorphism */}
        <div 
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="https://app-portalculture.vercel.app"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center"
          >
            {/* Button glow on hover */}
            <div 
              className="absolute -inset-4 rounded-3xl transition-all duration-500"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
                opacity: isHovered ? 1 : 0,
                filter: 'blur(20px)',
              }}
            />
            
            {/* Button */}
            <div 
              className="relative px-8 py-4 rounded-2xl border transition-all duration-300"
              style={{
                background: isHovered 
                  ? 'rgba(255,255,255,0.08)' 
                  : 'rgba(255,255,255,0.04)',
                borderColor: isHovered 
                  ? 'rgba(255,255,255,0.15)' 
                  : 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovered 
                  ? '0 20px 40px -20px rgba(0,0,0,0.5)' 
                  : 'none',
              }}
            >
              <span className="flex items-center gap-3 text-white font-medium">
                Solicitar acceso
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </a>
        </div>

        {/* Trust indicators */}
        <div 
          className={`mt-16 flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 text-white/25 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
            <span>100% gratuito</span>
          </div>
          <div className="flex items-center gap-2 text-white/25 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
            <span>Proceso activo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
