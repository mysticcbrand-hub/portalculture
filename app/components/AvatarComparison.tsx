'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Metric {
  name: string
  value: number
  color: 'red' | 'green'
}

const metrics1: Metric[] = [
  { name: 'Motivación', value: 20, color: 'red' },
  { name: 'Progreso', value: 15, color: 'red' },
  { name: 'Constancia', value: 25, color: 'red' },
  { name: 'Network', value: 10, color: 'red' }
]

const metrics2: Metric[] = [
  { name: 'Motivación', value: 95, color: 'green' },
  { name: 'Progreso', value: 90, color: 'green' },
  { name: 'Constancia', value: 95, color: 'green' },
  { name: 'Network', value: 100, color: 'green' }
]

export default function AvatarComparison() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedMetrics1, setAnimatedMetrics1] = useState(metrics1.map(() => 0))
  const [animatedMetrics2, setAnimatedMetrics2] = useState(metrics2.map(() => 0))
  const [cardRotations, setCardRotations] = useState<{ [key: number]: { x: number; y: number } }>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            
            // Animate metrics for Avatar 1 (slow)
            metrics1.forEach((metric, index) => {
              setTimeout(() => {
                animateCounter(setAnimatedMetrics1, index, metric.value, 1500)
              }, index * 200)
            })
            
            // Animate metrics for Avatar 2 (fast with bounce)
            metrics2.forEach((metric, index) => {
              setTimeout(() => {
                animateCounter(setAnimatedMetrics2, index, metric.value, 800)
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
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

  const animateCounter = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    target: number,
    duration: number
  ) => {
    let start = 0
    const increment = target / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setter((prev) => {
          const newValues = [...prev]
          newValues[index] = target
          return newValues
        })
        clearInterval(timer)
      } else {
        setter((prev) => {
          const newValues = [...prev]
          newValues[index] = Math.floor(start)
          return newValues
        })
      }
    }, 16)
  }

  return (
    <section
      ref={sectionRef}
      id="comparacion"
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <h2 
          className="text-4xl md:text-5xl font-semibold text-center mb-24"
          style={{
            background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          ¿Cuál prefieres ser?
        </h2>

        {/* Avatars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Avatar 1 - El que va solo */}
          <div
            onMouseMove={(e) => handleCardMouseMove(e, 1)}
            onMouseLeave={() => handleCardMouseLeave(1)}
            className={`group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 transition-all duration-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${cardRotations[1]?.x || 0}deg) rotateY(${cardRotations[1]?.y || 0}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Avatar Figure */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-64 md:w-56 md:h-72">
                <Image
                  src="/avatars/triste.png"
                  alt="El que va solo"
                  width={280}
                  height={360}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ 
                    filter: 'grayscale(80%) brightness(0.7) opacity(0.5)',
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-semibold text-white/50 text-center mb-8">
              El que va solo
            </h3>

            {/* Metrics */}
            <div className="space-y-5">
              {metrics1.map((metric, index) => (
                <div key={metric.name} className="metric">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/60">{metric.name}</span>
                    <span className="text-sm font-mono text-white/60">
                      {animatedMetrics1[index]}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-800 rounded-full transition-all duration-1500 ease-out"
                      style={{
                        width: isVisible ? `${animatedMetrics1[index]}%` : '0%',
                        opacity: 0.6,
                        transitionDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <p className="mt-8 text-base md:text-lg italic text-white/40 text-center">
              "Algún día lo conseguiré"
            </p>
          </div>

          {/* Avatar 2 - El que está dentro */}
          <div
            onMouseMove={(e) => handleCardMouseMove(e, 2)}
            onMouseLeave={() => handleCardMouseLeave(2)}
            className={`group relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-12 transition-all duration-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${cardRotations[2]?.x || 0}deg) rotateY(${cardRotations[2]?.y || 0}deg)`,
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 60px rgba(102, 126, 234, 0.1)'
            }}
          >
            {/* Avatar Figure */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-64 md:w-56 md:h-72">
                <Image
                  src="/avatars/chad.png"
                  alt="El que está dentro"
                  width={280}
                  height={360}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.4)) brightness(1.05)',
                  }}
                />
              </div>
            </div>

            {/* Title with chrome gradient */}
            <h3 
              className="text-2xl md:text-3xl font-semibold text-center mb-8"
              style={{
                background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              El que está dentro
            </h3>

            {/* Metrics */}
            <div className="space-y-5">
              {metrics2.map((metric, index) => (
                <div key={metric.name} className="metric">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/90">{metric.name}</span>
                    <span className="text-sm font-mono text-white/90 font-semibold">
                      {animatedMetrics2[index]}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all ease-out relative overflow-hidden"
                      style={{
                        width: isVisible ? `${animatedMetrics2[index]}%` : '0%',
                        transitionDuration: '800ms',
                        transitionDelay: `${index * 150}ms`,
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                        boxShadow: '0 0 20px rgba(74, 222, 128, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                        style={{
                          backgroundSize: '200% 100%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <p className="mt-8 text-base md:text-lg italic text-white font-medium text-center">
              "Ya estoy en ello"
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 p-8 md:p-12 bg-white/2 rounded-3xl border border-white/5">
          <p 
            className="text-2xl md:text-3xl font-semibold mb-8"
            style={{
              background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ¿Cuánto tiempo más quieres ser el de la izquierda?
          </p>
          <a
            href="/acceso"
            className="inline-block px-12 py-4 text-lg font-semibold bg-white/5 border border-white/20 rounded-xl text-white transition-all duration-500 hover:scale-105 hover:-translate-y-1"
            style={{
              boxShadow: '0 0 0 rgba(102, 126, 234, 0)',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 60px rgba(102, 126, 234, 0.4), 0 0 100px rgba(102, 126, 234, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 rgba(102, 126, 234, 0)'
            }}
          >
            Transformarme ahora
          </a>
          <p className="text-sm text-white/50 mt-4">
            Plazas limitadas · Acceso gratuito
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* GPU acceleration */
        .group {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}
