'use client'

import { useEffect, useRef, useState } from 'react'

interface FinalCTAProps {
  onCtaClick: () => void
}

export default function FinalCTA({ onCtaClick }: FinalCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      
      if (distance < 120) {
        const strength = (120 - distance) / 120
        targetX = distanceX * strength * 0.35
        targetY = distanceY * strength * 0.35
      } else {
        targetX = 0
        targetY = 0
      }
    }

    const animate = () => {
      if (!btnRef.current) return
      
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      
      const scale = targetX !== 0 || targetY !== 0 ? 1.03 : 1
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
      className="relative py-32 md:py-40 px-6 overflow-hidden"
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Radial gradient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-white/[0.03] via-transparent to-transparent opacity-80" />
        
        {/* Subtle animated orbs */}
        <div 
          className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            animation: 'float 18s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section indicator */}
        <div className={`mb-8 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-xs font-medium tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
            /06
          </span>
        </div>

        {/* Headline with glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-white/5 rounded-full scale-150 opacity-50" />
          <h2 className={`relative text-4xl md:text-5xl lg:text-6xl font-bold fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 40%, #ffffff 60%, rgba(255,255,255,0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ¿Listo para dar el salto?
          </h2>
        </div>

        {/* Subline */}
        <p className={`text-lg md:text-xl lg:text-2xl text-white/50 mb-14 max-w-2xl mx-auto leading-relaxed fade-in-up ${isVisible ? 'visible' : ''} stagger-1`}>
          Rodéate de jóvenes con tu misma mentalidad. Construid juntos.
        </p>

        {/* Premium Glassmorphism CTA Button */}
        <div className={`mb-10 fade-in-up ${isVisible ? 'visible' : ''} stagger-2`}>
          <a
            ref={btnRef}
            href="https://app-portalculture.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 magnetic-btn"
          >
            {/* Outer glow on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            
            {/* Button container */}
            <div className="relative px-10 py-5 md:px-14 md:py-6 rounded-2xl overflow-hidden
                          bg-white/[0.04] backdrop-blur-2xl
                          border border-white/[0.08]
                          shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
                          group-hover:bg-white/[0.08] group-hover:border-white/[0.15]
                          group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15),0_0_60px_rgba(255,255,255,0.1)]
                          transition-all duration-500 ease-out">
              
              {/* Top highlight line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />
              
              {/* Inner subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <span className="font-semibold text-base md:text-lg text-white tracking-wide">
                  Solicitar Acceso
                </span>
                <svg 
                  className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </a>
        </div>

        {/* Micro text with glassmorphism pill */}
        <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full 
                        bg-white/[0.02] backdrop-blur-xl border border-white/[0.05]
                        fade-in-up ${isVisible ? 'visible' : ''} stagger-3`}>
          <span className="flex items-center gap-1.5 text-xs text-white/40">
            <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
            100% gratuito
          </span>
          <span className="w-px h-3 bg-white/10" />
          <span className="text-xs text-white/40">Proceso de selección activo</span>
        </div>

        {/* Premium Trust indicators */}
        <div className={`mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-6 fade-in-up ${isVisible ? 'visible' : ''} stagger-4`}>
          {[
            { icon: 'check', text: 'Proceso verificado', color: 'emerald' },
            { icon: 'mail', text: 'Respuesta en 24h', color: 'blue' },
            { icon: 'star', text: 'Sin compromiso', color: 'amber' },
          ].map((item, index) => (
            <div 
              key={index}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                        bg-white/[0.02] backdrop-blur-xl border border-white/[0.04]
                        hover:bg-white/[0.04] hover:border-white/[0.08]
                        transition-all duration-300"
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center
                            ${item.color === 'emerald' ? 'bg-emerald-500/10' : ''}
                            ${item.color === 'blue' ? 'bg-blue-500/10' : ''}
                            ${item.color === 'amber' ? 'bg-amber-500/10' : ''}`}>
                {item.icon === 'check' && (
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {item.icon === 'mail' && (
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                )}
                {item.icon === 'star' && (
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes for float animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </section>
  )
}
