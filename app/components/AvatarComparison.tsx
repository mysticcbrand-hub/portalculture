'use client'

import { useEffect, useRef, useState } from 'react'

export default function AvatarComparison() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before')

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

  const transformations = [
    { before: 'Dudas constantes', after: 'Claridad mental', icon: '🧠' },
    { before: 'Sin dirección', after: 'Propósito definido', icon: '🎯' },
    { before: 'Solo en el camino', after: 'Comunidad real', icon: '👥' },
    { before: 'Potencial dormido', after: 'Acción diaria', icon: '⚡' },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-5 py-24 md:py-32"
    >
      {/* Minimal background */}
      <div className="absolute inset-0 bg-[#030303]">
        {/* Subtle center glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* Section label */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-[11px] font-mono text-white/25 tracking-widest">/ 05</span>
        </div>

        {/* Main heading */}
        <h2 
          className={`text-center text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          La transformación
        </h2>
        
        <p 
          className={`text-center text-white/40 text-lg mb-14 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Lo que cambia cuando decides empezar
        </p>

        {/* Toggle tabs */}
        <div 
          className={`flex justify-center mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('before')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'before'
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Antes
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'after'
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Después
            </button>
          </div>
        </div>

        {/* Cards */}
        <div 
          className={`space-y-3 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {transformations.map((item, index) => (
            <div
              key={index}
              className="group relative"
              style={{ 
                transitionDelay: `${350 + index * 50}ms`,
              }}
            >
              {/* Card */}
              <div 
                className={`relative p-5 rounded-2xl border transition-all duration-500 ${
                  activeTab === 'after'
                    ? 'bg-white/[0.03] border-white/[0.08]'
                    : 'bg-white/[0.015] border-white/[0.04]'
                }`}
                style={{
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-500 ${
                      activeTab === 'after'
                        ? 'bg-white/[0.06]'
                        : 'bg-white/[0.03]'
                    }`}
                    style={{
                      filter: activeTab === 'after' ? 'blur(0px)' : 'blur(0.5px)',
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p 
                      className={`text-base md:text-lg font-medium transition-all duration-500 ${
                        activeTab === 'after' ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {activeTab === 'before' ? item.before : item.after}
                    </p>
                  </div>

                  {/* Status indicator */}
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      activeTab === 'after' 
                        ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]' 
                        : 'bg-white/20'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p 
          className={`text-center text-white/20 text-sm mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Basado en la experiencia de +200 miembros
        </p>
      </div>
    </section>
  )
}
