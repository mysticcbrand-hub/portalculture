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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-24 opacity-0 animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animationDelay: '0.2s',
            animationFillMode: 'forwards'
          }}
        >
          ¿Cuál prefieres ser?
        </h2>

        {/* Avatars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24">
          {/* Avatar 1 - El que va solo */}
          <div
            className={`avatar-alone-container relative p-8 md:p-12 rounded-3xl border border-white/5 bg-black/60 backdrop-blur-xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100 blur-0' : 'opacity-0 -translate-x-12 scale-90 blur-sm'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Red ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-3xl -z-10" />

            {/* Avatar Figure */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-64 md:w-56 md:h-72">
                <Image
                  src="/avatars/triste.jpg"
                  alt="El que va solo"
                  width={224}
                  height={288}
                  className="w-full h-full object-cover rounded-2xl opacity-30"
                  style={{ 
                    filter: 'grayscale(100%) brightness(0.6) sepia(100%) hue-rotate(-50deg) saturate(300%)',
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-semibold text-white/50 text-center mb-8">
              El que va solo
            </h3>

            {/* Metrics */}
            <div className="space-y-6">
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
            <p className="mt-8 text-base italic text-white/40 pl-4 border-l-2 border-white/10 py-2">
              "Algún día lo conseguiré"
            </p>
          </div>

          {/* Avatar 2 - El que está dentro */}
          <div
            className={`avatar-together-container relative p-8 md:p-12 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.3s',
              boxShadow: '0 0 60px rgba(102, 126, 234, 0.15), 0 0 100px rgba(102, 126, 234, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Blue ambient glow with pulse */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl -z-10 animate-ambient-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)'
              }}
            />

            {/* Particles orbiting */}
            <div className="particles-container absolute inset-0 pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="particle absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    boxShadow: '0 0 10px rgba(102, 126, 234, 0.8)',
                    animation: `orbit 8s linear infinite`,
                    animationDelay: `${i * 1.6}s`
                  }}
                />
              ))}
            </div>

            {/* Avatar Figure */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-64 md:w-56 md:h-72 animate-pulse-avatar">
                <Image
                  src="/avatars/chad.jpg"
                  alt="El que está dentro"
                  width={224}
                  height={288}
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.6)) brightness(1.1) contrast(1.1)',
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
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
              }}
            >
              El que está dentro
            </h3>

            {/* Metrics */}
            <div className="space-y-6">
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
            <p className="mt-8 text-base italic text-white font-medium pl-4 border-l-2 border-green-500/50 py-2 bg-green-500/5">
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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @keyframes ambient-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .animate-ambient-pulse {
          animation: ambient-pulse 4s ease-in-out infinite;
        }

        @keyframes pulse-avatar {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.4));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 40px rgba(102, 126, 234, 0.6));
          }
        }

        .animate-pulse-avatar {
          animation: pulse-avatar 3s ease-in-out infinite;
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .avatar-alone-container:hover {
          transform: scale(0.97);
          background: rgba(0, 0, 0, 0.8);
        }

        .avatar-alone-container:hover svg {
          opacity: 0.2;
        }

        .avatar-together-container:hover {
          transform: scale(1.03);
          box-shadow: 
            0 0 80px rgba(102, 126, 234, 0.3),
            0 0 120px rgba(102, 126, 234, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .avatar-together-container:hover svg {
          filter: drop-shadow(0 0 50px rgba(102, 126, 234, 0.8));
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
        .avatar-alone-container,
        .avatar-together-container,
        .progress-bar,
        .particle {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}
