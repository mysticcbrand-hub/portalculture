'use client'

import { useEffect, useState, useRef } from 'react'

export default function HeroPremium() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)
  const [isHoveringTitle, setIsHoveringTitle] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized 0-1 for smoother calculations
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Scroll-based animations - reduced blur on mobile for smoother performance
  const scrollProgress = Math.min(1, scrollY / 600)
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768
  const contentBlur = isMobileDevice ? scrollProgress * 4 : scrollProgress * 8 // Reduced blur on mobile
  const contentOpacity = 1 - scrollProgress * 0.7
  const contentY = scrollProgress * -50
  const contentScale = 1 - scrollProgress * 0.05

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      
      {/* Interactive gradient accent - follows mouse */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(
            ellipse 60% 50% at ${50 + (mousePosition.x - 0.5) * 10}% ${40 + (mousePosition.y - 0.5) * 10}%,
            rgba(99, 102, 241, 0.06) 0%,
            rgba(120, 95, 248, 0.03) 40%,
            transparent 70%
          )`,
        }}
      />

      {/* ============================================
          CONTENT LAYER - with scroll blur effect
          ============================================ */}
      
      <div 
        className="relative z-10 min-h-screen flex flex-col"
        style={{
          filter: `blur(${contentBlur}px)`,
          opacity: contentOpacity,
          transform: `translateY(${contentY}px) scale(${contentScale})`,
          transition: 'filter 0.1s ease-out, opacity 0.1s ease-out',
        }}
      >
        
        {/* Navigation spacer */}
        <div className="h-20 md:h-24" />
        
        {/* Main content - centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-6 pb-16 md:pb-20">
          
          {/* Section indicator */}
          <div 
            className={`
              mb-8 md:mb-10
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <span className="font-mono text-xs tracking-wider text-white/30">/ 01</span>
          </div>

          {/* Main headline - Liquid Chrome Effect */}
          <h1 
            className={`
              text-center mb-5 md:mb-6
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '300ms' }}
          >
            <span 
              ref={titleRef}
              className="
                liquid-chrome-text
                block text-[clamp(2.5rem,8vw,5.5rem)] 
                font-normal tracking-[0.01em] leading-[0.95]
                relative cursor-default
              "
              style={{
                fontFamily: "'Fuente Display', 'Scotch Display', Georgia, serif",
              }}
              onMouseEnter={() => {
                // Skip chrome effect on mobile
                if (window.matchMedia('(hover: none)').matches) return
                setIsHoveringTitle(true)
              }}
              onMouseLeave={() => setIsHoveringTitle(false)}
              onMouseMove={(e) => {
                // Skip chrome effect on mobile
                if (window.matchMedia('(hover: none)').matches) return
                if (!titleRef.current) return
                const rect = titleRef.current.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                titleRef.current.style.setProperty('--chrome-x', `${x}%`)
                titleRef.current.style.setProperty('--chrome-y', `${y}%`)
              }}
            >
              {/* Base text */}
              <span 
                className="relative z-10 transition-all duration-300"
                style={{
                  color: isHoveringTitle ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.9)',
                }}
              >
                PORTAL CULTURE
              </span>
              
              {/* Chrome reflection layer - follows cursor */}
              <span 
                className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `
                    radial-gradient(
                      circle 250px at var(--chrome-x, 50%) var(--chrome-y, 50%),
                      rgba(255, 255, 255, 1) 0%,
                      rgba(230, 230, 250, 0.9) 8%,
                      rgba(200, 200, 230, 0.7) 18%,
                      rgba(160, 160, 200, 0.4) 35%,
                      rgba(120, 120, 160, 0.1) 55%,
                      transparent 70%
                    )
                  `,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  opacity: isHoveringTitle ? 1 : 0,
                }}
              >
                PORTAL CULTURE
              </span>
              
              {/* Bright core highlight */}
              <span 
                className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `
                    radial-gradient(
                      circle 100px at var(--chrome-x, 50%) var(--chrome-y, 50%),
                      rgba(255, 255, 255, 1) 0%,
                      rgba(255, 255, 255, 0.5) 30%,
                      transparent 60%
                    )
                  `,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  opacity: isHoveringTitle ? 0.8 : 0,
                  filter: 'blur(0.5px)',
                }}
              >
                PORTAL CULTURE
              </span>
            </span>
          </h1>

          {/* Divider line */}
          <div 
            className={`
              w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
            `}
            style={{ transitionDelay: '400ms' }}
          />

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
            {/* Primary CTA - with 3D effect */}
            <a
              href="https://app-portalculture.vercel.app"
              className="
                group relative
                inline-flex items-center gap-2.5
                px-8 py-4
                rounded-full
                bg-white text-black
                font-medium text-sm
                tracking-wide
                transition-all duration-300 ease-out
                hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_10px_40px_rgba(255,255,255,0.15)]
                active:scale-[0.98]
                overflow-hidden
              "
              style={{ perspective: '500px' }}
              onMouseMove={(e) => {
                // Skip 3D effect on mobile (touch devices)
                if (window.matchMedia('(hover: none)').matches) return
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                e.currentTarget.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotateY(0) rotateX(0) scale(1)'
              }}
            >
              {/* Shine sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              <span className="relative">Solicitar acceso</span>
              <svg 
                className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* Secondary CTA - scrolls to benefits section */}
            <button
              onClick={() => {
                const section = document.getElementById('beneficios')
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="
                group inline-flex items-center gap-2
                px-6 py-3.5
                rounded-full
                text-white/50 hover:text-white/80
                font-medium text-sm
                tracking-wide
                transition-all duration-300
                hover:bg-white/[0.04]
                border border-transparent hover:border-white/[0.06]
                cursor-pointer
              "
            >
              <span>Descubrir más</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Social proof - subtle with hover effect */}
          <div 
            className={`
              group/social mt-14 md:mt-16
              flex items-center gap-3 text-[11px] md:text-xs
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              cursor-default
            `}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="
              flex items-center justify-center w-10 h-10 rounded-full 
              bg-white/[0.04] border border-white/[0.08]
              transition-all duration-500
              group-hover/social:bg-white/[0.06] group-hover/social:border-white/[0.12]
              group-hover/social:shadow-[0_0_20px_rgba(255,255,255,0.05)]
            ">
              <svg 
                className="w-5 h-5 text-white/50 transition-all duration-500 group-hover/social:text-white/70 group-hover/social:scale-110" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="
                text-white/60 font-medium
                transition-all duration-500
                group-hover/social:text-white/80
              ">
                +500 horas de valor
              </span>
              <span className="text-white/30 transition-colors duration-500 group-hover/social:text-white/40">
                en contenido exclusivo
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`
            absolute bottom-8 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-3
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ 
            transitionDelay: '1000ms',
            opacity: mounted ? Math.max(0, 1 - scrollProgress * 3) : 0,
          }}
        >
          <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent overflow-hidden">
            <div 
              className="w-full h-3 bg-white/50"
              style={{
                animation: 'scrollDown 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { 
            transform: translateY(-12px);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% { 
            transform: translateY(32px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
