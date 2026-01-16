'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function HeroPremium() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      
      {/* ============================================
          BACKGROUND LAYER - Depth & Atmosphere
          ============================================ */}
      
      {/* Base gradient - very subtle warm tones */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(30, 27, 38, 0.6) 0%, transparent 60%)',
        }}
      />
      
      {/* Primary glow orb - top center, responds to mouse */}
      <div 
        className="absolute w-[800px] h-[600px] -top-[200px] left-1/2 -translate-x-1/2 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(120, 119, 198, 0.15) 0%, rgba(74, 73, 129, 0.05) 40%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translate(calc(-50% + ${mousePosition.x * 20}px), ${mousePosition.y * 10}px)`,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      
      {/* Secondary accent glow - bottom right */}
      <div 
        className="absolute w-[600px] h-[400px] -bottom-[100px] -right-[200px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(100, 100, 140, 0.2) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ============================================
          CONTENT LAYER
          ============================================ */}
      
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Navigation spacer */}
        <div className="h-20 md:h-24" />
        
        {/* Main content - centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          
          {/* Status badge */}
          <div 
            className={`
              mb-8 md:mb-10
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="
              inline-flex items-center gap-2.5 
              px-4 py-2 
              rounded-full 
              bg-white/[0.03] 
              border border-white/[0.06]
              backdrop-blur-2xl
              shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_2px_4px_rgba(0,0,0,0.1)]
            ">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/80 animate-ping" style={{ animationDuration: '2s' }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[11px] md:text-xs text-white/50 font-medium tracking-wide">
                Acceso por invitación
              </span>
            </div>
          </div>

          {/* Logo mark */}
          <div 
            className={`
              mb-6 md:mb-8
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}
            `}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="
              relative w-16 h-16 md:w-20 md:h-20
              rounded-2xl md:rounded-3xl
              bg-gradient-to-b from-white/[0.08] to-white/[0.02]
              border border-white/[0.08]
              backdrop-blur-xl
              shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_8px_32px_rgba(0,0,0,0.3)]
              flex items-center justify-center
              overflow-hidden
            ">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
              {/* Logo */}
              <Image 
                src="/logo.png" 
                alt="Portal" 
                width={40} 
                height={40}
                className="relative z-10 w-8 h-8 md:w-10 md:h-10 object-contain opacity-90"
              />
            </div>
          </div>

          {/* Main headline */}
          <h1 
            className={`
              text-center mb-5 md:mb-6
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '300ms' }}
          >
            <span 
              className="
                block text-[clamp(2.5rem,8vw,5.5rem)] 
                font-normal tracking-[0.02em] leading-[0.95]
                text-white
              "
              style={{
                fontFamily: "'Fuente Display', 'Scotch Display', Georgia, serif",
              }}
            >
              PORTAL CULTURE
            </span>
          </h1>

          {/* Tagline */}
          <p 
            className={`
              text-center text-white/40 
              text-sm md:text-base lg:text-lg 
              font-light tracking-wide
              max-w-md md:max-w-lg
              leading-relaxed
              mb-10 md:mb-12
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '450ms' }}
          >
            La comunidad exclusiva donde jóvenes ambiciosos 
            <span className="text-white/70"> construyen su mejor versión</span>
          </p>

          {/* CTA Group */}
          <div 
            className={`
              flex flex-col sm:flex-row items-center gap-4
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '600ms' }}
          >
            {/* Primary CTA */}
            <a
              href="/acceso"
              className="
                group relative
                inline-flex items-center gap-2.5
                px-7 py-3.5
                rounded-full
                bg-white text-black
                font-medium text-sm
                tracking-wide
                transition-all duration-300 ease-out
                hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]
                active:scale-[0.98]
              "
            >
              <span>Solicitar acceso</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* Secondary CTA */}
            <a
              href="#descubrir"
              className="
                inline-flex items-center gap-2
                px-6 py-3.5
                rounded-full
                text-white/60 hover:text-white/90
                font-medium text-sm
                tracking-wide
                transition-all duration-300
                hover:bg-white/[0.03]
              "
            >
              <span>Descubrir más</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>

          {/* Social proof - subtle */}
          <div 
            className={`
              mt-12 md:mt-16
              flex items-center gap-4 text-[11px] md:text-xs text-white/30
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="flex -space-x-1.5">
              {[1,2,3,4,5].map(i => (
                <div 
                  key={i} 
                  className="
                    w-6 h-6 rounded-full 
                    bg-gradient-to-br from-white/10 to-white/[0.02]
                    border border-white/[0.08]
                    shadow-sm
                  " 
                />
              ))}
            </div>
            <span className="text-white/40">+500 miembros activos</span>
          </div>
        </div>

        {/* Bottom section - scroll hint */}
        <div 
          className={`
            absolute bottom-8 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-2
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="
            w-6 h-10 
            rounded-full 
            border border-white/[0.08]
            flex items-start justify-center 
            pt-2
          ">
            <div 
              className="w-1 h-2 rounded-full bg-white/30"
              style={{
                animation: 'scrollPulse 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

      </div>

      {/* Glassmorphism floating cards - decorative depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Card 1 - top left */}
        <div 
          className={`
            absolute -top-10 -left-20 md:top-20 md:left-[10%]
            w-48 md:w-64 h-32 md:h-40
            rounded-3xl
            bg-gradient-to-br from-white/[0.04] to-white/[0.01]
            border border-white/[0.05]
            backdrop-blur-xl
            transform rotate-12
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{ 
            transitionDelay: '400ms',
            transform: `rotate(12deg) translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out',
          }}
        />
        
        {/* Card 2 - bottom right */}
        <div 
          className={`
            absolute -bottom-10 -right-20 md:bottom-32 md:right-[8%]
            w-56 md:w-72 h-36 md:h-44
            rounded-3xl
            bg-gradient-to-br from-white/[0.03] to-transparent
            border border-white/[0.04]
            backdrop-blur-xl
            transform -rotate-6
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{ 
            transitionDelay: '600ms',
            transform: `rotate(-6deg) translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out',
          }}
        />

        {/* Small accent card - right side */}
        <div 
          className={`
            hidden md:block
            absolute top-1/3 right-[5%]
            w-24 h-24
            rounded-2xl
            bg-gradient-to-br from-white/[0.05] to-white/[0.02]
            border border-white/[0.06]
            backdrop-blur-xl
            transform rotate-[20deg]
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ 
            transitionDelay: '800ms',
            transform: `rotate(20deg) translate(${mousePosition.x * -8}px, ${mousePosition.y * 8}px)`,
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { 
            transform: translateY(0); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(6px); 
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  )
}
