'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Metric {
  name: string
  value: number
}

const metrics1: Metric[] = [
  { name: 'Motivación', value: 20 },
  { name: 'Progreso', value: 15 },
  { name: 'Constancia', value: 25 },
  { name: 'Network', value: 10 }
]

const metrics2: Metric[] = [
  { name: 'Motivación', value: 95 },
  { name: 'Progreso', value: 90 },
  { name: 'Constancia', value: 95 },
  { name: 'Network', value: 100 }
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
            
            // Animate metrics for Avatar 1
            metrics1.forEach((metric, index) => {
              setTimeout(() => {
                animateCounter(setAnimatedMetrics1, index, metric.value, 1500)
              }, index * 200)
            })
            
            // Animate metrics for Avatar 2
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
            className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-300 ease-out overflow-hidden hover:scale-[1.02]"
            style={{
              transform: `perspective(1000px) rotateX(${cardRotations[1]?.x || 0}deg) rotateY(${cardRotations[1]?.y || 0}deg) scale(${cardRotations[1] ? 1.02 : 1})`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease-out'
            }}
          >
            {/* Background image with effects - same as course cards */}
            <div className="absolute inset-0 opacity-35 md:opacity-20 group-hover:opacity-45 md:group-hover:opacity-30 transition-opacity duration-500">
              <Image 
                src="/avatars/triste.png" 
                alt="" 
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-semibold text-white/60 text-center mb-8 mt-[450px] md:mt-[520px]">
                El que va solo
              </h3>

              {/* Metrics */}
              <div className="space-y-5">
                {metrics1.map((metric, index) => (
                  <div key={metric.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/60">{metric.name}</span>
                      <span className="text-sm font-mono text-white/60">
                        {animatedMetrics1[index]}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-all duration-1500 ease-out"
                        style={{
                          width: isVisible ? `${animatedMetrics1[index]}%` : '0%',
                          opacity: 0.7,
                          transitionDelay: `${index * 200}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <p className="mt-8 text-base italic text-white/50 text-center">
                "Algún día lo conseguiré"
              </p>
            </div>
          </div>

          {/* Avatar 2 - El que está dentro */}
          <div
            onMouseMove={(e) => handleCardMouseMove(e, 2)}
            onMouseLeave={() => handleCardMouseLeave(2)}
            className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-300 ease-out overflow-hidden hover:scale-[1.05]"
            style={{
              transform: `perspective(1000px) rotateX(${cardRotations[2]?.x || 0}deg) rotateY(${cardRotations[2]?.y || 0}deg) scale(${cardRotations[2] ? 1.05 : 1})`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease-out'
            }}
          >
            {/* Background image with effects - same as course cards */}
            <div className="absolute inset-0 opacity-35 md:opacity-20 group-hover:opacity-45 md:group-hover:opacity-30 transition-opacity duration-500">
              <Image 
                src="/avatars/chad.png" 
                alt="" 
                fill
                className="object-cover"
                style={{ 
                  objectPosition: 'center center',
                  transform: 'scale(1.5) translateY(20%)',
                  transformOrigin: 'center center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Title with chrome gradient */}
              <h3 
                className="text-2xl md:text-3xl font-semibold text-center mb-8 mt-[450px] md:mt-[520px]"
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
                  <div key={metric.name}>
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
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                          style={{ backgroundSize: '200% 100%' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <p className="mt-8 text-base italic text-white font-medium text-center">
                "Ya estoy en ello"
              </p>
            </div>
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
            className="inline-block px-12 py-4 text-lg font-semibold bg-white/5 border border-white/20 rounded-xl text-white transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:border-white/40"
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
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}
