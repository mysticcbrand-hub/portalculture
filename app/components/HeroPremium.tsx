'use client'

import { useEffect, useState, useRef } from 'react'
import TransitionLink from '@/components/TransitionLink'

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

  // Scroll-based animations
  const scrollProgress = Math.min(1, scrollY / 600)
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768
  const contentBlur = isMobileDevice ? scrollProgress * 4 : scrollProgress * 8
  const contentOpacity = 1 - scrollProgress * 0.7
  const contentY = scrollProgress * -50
  const contentScale = 1 - scrollProgress * 0.05
  
  // Parallax for background image
  const bgY = scrollY * 0.4
  const bgScale = 1 + scrollProgress * 0.1

  return (
    <section ref={heroRef} className="relative min-h-screen bg-black overflow-hidden">
      
      {/* ============================================
          BACKGROUND IMAGE with parallax & overlays
          ============================================ */}
      
      {/* Main background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${bgY}px) scale(${bgScale})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img 
          src="/FONDO_HERO.jpg" 
          alt=""
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.4) contrast(1.1)',
          }}
        />
      </div>

      {/* Dark gradient overlay - bottom to top */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to top,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.95) 10%,
            rgba(0, 0, 0, 0.7) 30%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.3) 70%,
            rgba(0, 0, 0, 0.5) 100%
          )`,
        }}
      />

      {/* Radial vignette */}
      <div 
        className="absolute inset-0 z-[2]"
        style={{
          background: `radial-gradient(
            ellipse 80% 80% at 50% 50%,
            transparent 0%,
            transparent 40%,
            rgba(0, 0, 0, 0.4) 70%,
            rgba(0, 0, 0, 0.8) 100%
          )`,
        }}
      />


      {/* High-quality noise dithering for anti-banding */}
      <div 
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          mixBlendMode: 'soft-light',
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
            <span className="font-mono text-xs tracking-wider text-white/40">/ 01</span>
          </div>

          {/* Main headline - BIGGER & BOLDER */}
          <h1 
            className={`
              text-center mb-6 md:mb-8
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '300ms' }}
          >
            <span 
              ref={titleRef}
              className="
                liquid-chrome-text
                block text-[clamp(3.5rem,12vw,9rem)] 
                font-normal tracking-[-0.02em] leading-[0.85]
                relative cursor-default
              "
              style={{
                fontFamily: "'Fuente Display', 'Scotch Display', Georgia, serif",
              }}
              onMouseEnter={() => {
                if (window.matchMedia('(hover: none)').matches) return
                setIsHoveringTitle(true)
              }}
              onMouseLeave={() => setIsHoveringTitle(false)}
              onMouseMove={(e) => {
                if (window.matchMedia('(hover: none)').matches) return
                if (!titleRef.current) return
                const rect = titleRef.current.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                titleRef.current.style.setProperty('--chrome-x', `${x}%`)
                titleRef.current.style.setProperty('--chrome-y', `${y}%`)
              }}
            >
              {/* Base text with text shadow for depth */}
              <span 
                className="relative z-10 transition-all duration-300"
                style={{
                  color: isHoveringTitle ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.95)',
                  textShadow: '0 4px 40px rgba(0,0,0,0.6), 0 0 80px rgba(255,255,255,0.1)',
                }}
              >
                PORTAL
                <br />
                CULTURE
              </span>
              
              {/* Chrome reflection layer - follows cursor */}
              <span 
                className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `
                    radial-gradient(
                      circle 300px at var(--chrome-x, 50%) var(--chrome-y, 50%),
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
                PORTAL
                <br />
                CULTURE
              </span>
              
              {/* Bright core highlight */}
              <span 
                className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `
                    radial-gradient(
                      circle 120px at var(--chrome-x, 50%) var(--chrome-y, 50%),
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
                PORTAL
                <br />
                CULTURE
              </span>
            </span>
          </h1>

          {/* Divider line */}
          <div 
            className={`
              w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
            `}
            style={{ transitionDelay: '400ms' }}
          />

          {/* Tagline */}
          <p 
            className={`
              text-center text-white/50 
              text-base md:text-lg lg:text-xl 
              font-light tracking-wide
              max-w-lg md:max-w-xl
              leading-relaxed
              mb-12 md:mb-14
              transition-all duration-1000 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '450ms' }}
          >
            La comunidad exclusiva donde jóvenes ambiciosos 
            <span className="text-white/80"> construyen su mejor versión</span>
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
            {/* Primary CTA - Glassmorphism style */}
            <TransitionLink
              href="https://app-portalculture.vercel.app"
              external
              className="
                group relative
                inline-flex items-center gap-2.5
                px-10 py-4
                rounded-full
                font-medium text-sm
                tracking-wide
                transition-all duration-500 ease-out
                active:scale-[0.98]
                overflow-hidden
              "
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Top highlight line */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              {/* Shine sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <span className="relative text-white">Solicitar acceso</span>
              <svg 
                className="w-4 h-4 relative text-white transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </TransitionLink>

            {/* Secondary CTA */}
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
                hover:bg-white/[0.06]
                border border-white/[0.08] hover:border-white/[0.15]
                backdrop-blur-sm
                cursor-pointer
              "
            >
              <span>Descubrir más</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>
          </div>

          {/* Scroll indicator */}
          <div 
            className={`
              absolute bottom-8 left-1/2 -translate-x-1/2
              flex flex-col items-center gap-2
              transition-all duration-1000
              ${mounted ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ transitionDelay: '800ms' }}
          >
            <span className="text-white/30 text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full h-3 bg-white/60"
                style={{
                  animation: 'scrollIndicator 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes scrollIndicator {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
