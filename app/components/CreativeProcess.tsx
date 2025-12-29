'use client'

import { useEffect, useRef, useState } from 'react'

export default function CreativeProcess() {
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [isClicking, setIsClicking] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="py-40 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Process Steps */}
          <div className="space-y-12">
            <div>
              <p className="text-xs font-mono text-white/30 tracking-wider mb-4">/ 03</p>
              <h2 className="font-display text-4xl md:text-6xl font-normal tracking-normal text-white" style={{ transform: 'scaleY(1.15)' }}>
                El Proceso
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Solicita', desc: 'Deja tu email' },
                { title: 'Verifica', desc: 'Pasa las pruebas de acceso' },
                { title: 'Entra', desc: 'Únete a la comunidad' },
              ].map((step, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => {
                    setActiveStep(index)
                    setIsClicking(true)
                    setTimeout(() => setIsClicking(false), 300)
                  }}
                  className={`relative pl-12 cursor-pointer transition-all duration-500 ${
                    activeStep === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  {/* Step Indicator */}
                  <div className={`absolute left-0 top-0 w-8 h-8 rounded-full border-2 
                                flex items-center justify-center font-mono text-xs
                                transition-all duration-500 ${
                                  activeStep === index
                                    ? 'border-white bg-white text-black scale-110'
                                    : 'border-white/20 text-white/40'
                                }`}>
                    {index + 1}
                  </div>

                  {/* Connecting Line */}
                  {index < 2 && (
                    <div className="absolute left-4 top-8 w-px h-12 bg-white/10" />
                  )}

                  <h3 className="text-3xl font-medium mb-2">{step.title}</h3>
                  <p className="text-white/50">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Círculo Simple */}
          <div className="relative h-[600px] flex items-center justify-center pointer-events-none">
            <div className={`relative w-96 h-96 transition-transform duration-300 ${
              isClicking ? 'scale-95' : hoveredStep !== null ? 'scale-105' : 'scale-100'
            }`}>
              {/* Círculo base */}
              <div className="absolute inset-0 rounded-full border border-white/10" />

              {/* Progress ring */}
              <svg className="absolute inset-0 -rotate-90" width="384" height="384" viewBox="0 0 384 384">
                <circle
                  cx="192"
                  cy="192"
                  r="180"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
                <circle
                  cx="192"
                  cy="192"
                  r="180"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 180}`}
                  strokeDashoffset={`${2 * Math.PI * 180 * (1 - (activeStep + 1) / 3)}`}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke-dashoffset 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                />
              </svg>

              {/* Glow en hover */}
              {hoveredStep !== null && (
                <div className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(255,255,255,0.15)]" />
              )}

              {/* Número central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[8rem] font-bold text-white">
                  {activeStep + 1}
                </span>
              </div>

              {/* Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      activeStep === i ? 'bg-white w-8' : 'bg-white/30 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
