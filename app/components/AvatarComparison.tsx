'use client'

import { useEffect, useRef, useState } from 'react'

export default function AvatarComparison() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

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

  // Handle slider drag
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  // Before/After traits
  const traits = [
    { before: 'Confusión', after: 'Claridad', beforeValue: 25, afterValue: 90 },
    { before: 'Soledad', after: 'Comunidad', beforeValue: 20, afterValue: 85 },
    { before: 'Estancamiento', after: 'Crecimiento', beforeValue: 30, afterValue: 95 },
    { before: 'Dudas', after: 'Acción', beforeValue: 35, afterValue: 88 },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-5 py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#030303]">
        {/* Gradient that shifts with slider */}
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, 
              rgba(239,68,68,${0.03 * (1 - sliderPosition/100)}) 0%, 
              transparent 50%,
              rgba(34,197,94,${0.05 * (sliderPosition/100)}) 100%
            )`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section label */}
        <div 
          className={`text-center mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-[11px] font-mono text-white/25 tracking-widest">/ 05</span>
        </div>

        {/* Heading */}
        <h2 
          className={`text-center text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          La transformación
        </h2>
        
        <p 
          className={`text-center text-white/40 text-lg mb-16 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Desliza para ver el cambio
        </p>

        {/* Interactive Comparison Slider */}
        <div 
          className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div 
            ref={sliderRef}
            className="relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* BEFORE Side (Left) */}
            <div 
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-[#0a0a0a] to-[#0a0a0a] border border-white/[0.04]" />
              
              {/* Before content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                {/* Header */}
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-red-400 text-xs font-medium uppercase tracking-wider">Antes</span>
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium text-white/60 mb-2">Sin dirección</h3>
                  <p className="text-white/30 text-sm max-w-xs">Días que pasan sin propósito, potencial sin desbloquear</p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  {traits.map((trait, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">{trait.before}</span>
                        <span className="text-white/20">{trait.beforeValue}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500/50 to-red-400/30 rounded-full transition-all duration-500"
                          style={{ width: `${trait.beforeValue}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AFTER Side (Right) */}
            <div 
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 0 0 ${sliderPosition}%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-emerald-950/30 via-[#0a0a0a] to-[#0a0a0a] border border-white/[0.06]" />
              
              {/* After content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                {/* Header */}
                <div className="text-right">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Después</span>
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">Con propósito</h3>
                  <p className="text-white/50 text-sm max-w-xs ml-auto">Claridad, comunidad y crecimiento constante</p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  {traits.map((trait, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">{trait.after}</span>
                        <span className="text-emerald-400/80">{trait.afterValue}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500/70 to-emerald-400/50 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                          style={{ width: `${trait.afterValue}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DIVIDER LINE - The main interactive element */}
            <div 
              className="absolute top-0 bottom-0 w-1 -translate-x-1/2 z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Glow behind line */}
              <div 
                className="absolute inset-0 w-8 -translate-x-1/2"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  filter: 'blur(8px)',
                }}
              />
              
              {/* Main line */}
              <div className="absolute inset-0 w-0.5 bg-white/40 -translate-x-1/2" />
              
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div 
                  className="w-12 h-12 rounded-full border-2 border-white/30 bg-black/80 backdrop-blur-xl flex items-center justify-center transition-transform duration-200 hover:scale-110"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.1)',
                  }}
                >
                  <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Instruction hint */}
            <div 
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 transition-opacity duration-500 ${
                isDragging ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <svg className="w-4 h-4 text-white/40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span className="text-white/40 text-xs">Arrastra para comparar</span>
            </div>
          </div>
        </div>

        {/* Bottom stats summary */}
        <div 
          className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { value: '+200', label: 'Miembros activos' },
            { value: '92%', label: 'Reportan claridad' },
            { value: '4.9', label: 'Satisfacción' },
            { value: '24h', label: 'Tiempo de respuesta' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-semibold text-white mb-1">{stat.value}</div>
              <div className="text-white/30 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
