'use client'

import { useEffect, useRef, useState } from 'react'
import TransitionLink from '@/components/TransitionLink'

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
      className="relative min-h-[80vh] flex items-center justify-center px-5 py-24 md:py-32 overflow-hidden"
    >
      {/* Dramatic Background with Debanding - Epic Finale */}
      <div className="absolute inset-0">
        {/* Elegant radial gradient layers */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 100% 80% at 50% 50%,
                rgba(236, 72, 153, 0.08) 0%,
                rgba(219, 39, 119, 0.05) 15%,
                rgba(190, 24, 93, 0.03) 30%,
                rgba(157, 23, 77, 0.018) 45%,
                rgba(131, 24, 67, 0.01) 60%,
                transparent 75%
              ),
              radial-gradient(
                ellipse 120% 90% at 50% 40%,
                rgba(139, 92, 246, 0.06) 0%,
                rgba(124, 58, 237, 0.04) 20%,
                rgba(109, 40, 217, 0.025) 40%,
                rgba(91, 33, 182, 0.015) 60%,
                rgba(76, 29, 149, 0.008) 80%,
                transparent 100%
              ),
              linear-gradient(180deg, #000000 0%, #050505 50%, #000000 100%)
            `,
          }}
        />
        {/* Premium noise dithering for smooth transitions */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '220px 220px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        {/* Section label */}
        <div 
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-[11px] font-mono text-white/25 tracking-widest">/ 05</span>
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

        {/* CTA Button - Premium Glassmorphism */}
        <div 
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <TransitionLink
            href="https://app-portalculture.vercel.app"
            external
            className="group relative inline-flex items-center"
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="contents"
            >
            {/* Outer glow on hover */}
            <div 
              className="absolute -inset-6 rounded-3xl transition-all duration-700"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                opacity: isHovered ? 1 : 0,
                filter: 'blur(25px)',
              }}
            />
            
            {/* Button */}
            <div 
              className="relative px-10 py-4 rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                background: isHovered 
                  ? 'rgba(255,255,255,0.12)' 
                  : 'rgba(255,255,255,0.06)',
                border: `1px solid ${isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: isHovered 
                  ? '0 20px 50px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.05)' 
                  : '0 4px 20px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Top highlight line */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                }}
              />
              
              <span className="relative flex items-center gap-3 text-white font-medium">
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
            </div>
          </TransitionLink>
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
