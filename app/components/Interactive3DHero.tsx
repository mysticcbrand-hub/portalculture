'use client'

import { useEffect, useRef, useState } from 'react'

interface Interactive3DHeroProps {
  onCtaClick?: () => void
}

export default function Interactive3DHero({ onCtaClick }: Interactive3DHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const portalRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Calcular rotación del portal basado en mouse
  const portalRotateX = mousePosition.y * 15
  const portalRotateY = -mousePosition.x * 15
  const portalScale = 1 + scrollY * 0.001

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-24 overflow-hidden">
      {/* Background oscuro profundo */}
      <div className="absolute inset-0 bg-black">
        {/* Estrellas de fondo */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-blue-900/10" />
      </div>

      {/* Portal 3D Central */}
      <div
        ref={portalRef}
        className="relative z-10 transition-all duration-300 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${portalRotateX}deg) rotateY(${portalRotateY}deg) scale(${Math.max(0.5, 1 - scrollY * 0.0008)}) translateZ(${scrollY * -0.5}px)`,
          transformStyle: 'preserve-3d',
          opacity: Math.max(0, 1 - scrollY * 0.002)
        }}
      >
        {/* Anillos del portal */}
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
          {/* Anillo exterior */}
          <div
            className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin-slow"
            style={{
              animation: 'spin 20s linear infinite',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(50px)'
            }}
          />

          {/* Anillo medio */}
          <div
            className="absolute inset-8 rounded-full border-2 border-blue-500/40"
            style={{
              animation: 'spin 15s linear infinite reverse',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(30px)'
            }}
          />

          {/* Anillo interior */}
          <div
            className="absolute inset-16 rounded-full border border-cyan-500/50"
            style={{
              animation: 'spin 10s linear infinite',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)'
            }}
          />

          {/* Centro del portal - efecto vórtice */}
          <div className="absolute inset-20 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-radial from-purple-600/40 via-blue-600/30 to-transparent"
              style={{
                animation: 'pulse 3s ease-in-out infinite',
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-conic from-purple-500/20 via-blue-500/20 to-purple-500/20"
              style={{
                animation: 'spin 5s linear infinite',
              }}
            />
          </div>

          {/* Partículas orbitando */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 360
            const radius = 150 + (i % 3) * 30
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateX(${radius}px) translateZ(${(i % 3) * 20}px)`,
                  animation: `orbit ${10 + (i % 3) * 5}s linear infinite`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.3 + (i % 3) * 0.2,
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}
              />
            )
          })}
        </div>

        {/* Glow effect del portal */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
            animation: 'glow 4s ease-in-out infinite'
          }}
        />
      </div>

      {/* Texto que emerge desde el portal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4"
        style={{
          transform: `translate(-50%, -50%) translateZ(${100 + scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})`,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-out'
        }}
      >
        {/* Label */}
        <div className="mb-8">
          <span className="font-mono text-xs tracking-wider text-white/40">/ 01</span>
        </div>

        {/* Headline principal */}
        <h1
          className="font-display text-[clamp(3rem,10vw,8rem)] font-normal leading-[1.1] tracking-tight mb-6"
          style={{
            transform: 'scaleY(1.15)',
            textShadow: '0 0 40px rgba(147, 51, 234, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)'
          }}
        >
          <span
            className="block text-white opacity-0 animate-slide-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            Entra al
          </span>
          <span
            className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent opacity-0 animate-slide-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            Portal.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
        >
          La comunidad n.º1 donde jóvenes ambiciosos como tú transforman su vida.
        </p>

        {/* CTA */}
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
        >
          <a
            href="/acceso"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-medium overflow-hidden rounded-full
                     border border-white/20 hover:border-purple-500/50
                     transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <span className="relative z-10 text-white">Solicitar Acceso</span>
            <svg
              className="w-5 h-5 relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/30 opacity-0 group-hover:opacity-60 transition-opacity duration-700 -z-10 scale-150" />
          </a>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 mt-6 text-xs font-mono text-white/30 tracking-wider">
            <span>+15HR VALOR</span>
            <span>·</span>
            <span>4.9/5 ★</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#beneficios"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 cursor-pointer group"
        style={{
          opacity: Math.max(0, 1 - scrollY * 0.005)
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-white/30 tracking-wider group-hover:text-white/60 transition-colors duration-300">
            ATRAVIESA EL PORTAL
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent group-hover:from-purple-500/80 transition-all duration-300" />
        </div>
      </a>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(var(--radius, 150px)) translateZ(0px); }
          to { transform: rotate(360deg) translateX(var(--radius, 150px)) translateZ(0px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}
