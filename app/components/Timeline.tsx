'use client'

import { useEffect, useRef, useState } from 'react'

interface TimelineStep {
  number: number
  title: string
  description: string
}

const steps: TimelineStep[] = [
  {
    number: 1,
    title: 'Solicita',
    description: 'Deja tu email',
  },
  {
    number: 2,
    title: 'Verifica',
    description: 'Pasa las pruebas de acceso',
  },
  {
    number: 3,
    title: 'Entra',
    description: 'Únete a la comunidad',
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className={`text-4xl md:text-5xl font-bold text-center chrome-gradient-text mb-24 fade-in-up ${isVisible ? 'visible' : ''}`}>
          Cómo entrar
        </h2>

        {/* Timeline - Desktop */}
        <div className="hidden md:flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 relative">
              {/* Timeline Step */}
              <div className={`timeline-step fade-in-up ${isVisible ? 'visible' : ''} stagger-${index + 1}`}>
                {/* Circle */}
                <div className="timeline-circle mb-6">
                  <span className="text-6xl font-bold chrome-gradient-text">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-lg opacity-70">
                  {step.description}
                </p>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-[60px] left-[60%] w-[calc(100%-120px)] h-[2px]">
                  <div className="timeline-line w-full h-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-12">
          {steps.map((step, index) => (
            <div key={step.number} className={`flex flex-col items-center text-center fade-in-up ${isVisible ? 'visible' : ''} stagger-${index + 1}`}>
              {/* Circle */}
              <div className="timeline-circle mb-6">
                <span className="text-6xl font-bold chrome-gradient-text">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-lg opacity-70">
                {step.description}
              </p>

              {/* Vertical Line */}
              {index < steps.length - 1 && (
                <div className="mt-12 w-[2px] h-16">
                  <div className="timeline-line w-full h-full" style={{ 
                    background: 'linear-gradient(180deg, transparent 0%, rgba(192, 192, 192, 0.5) 50%, transparent 100%)',
                    backgroundSize: '100% 200%'
                  }}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Optional Callout */}
        <div className={`mt-20 text-center fade-in-up ${isVisible ? 'visible' : ''} stagger-4`}>
          <p className="text-sm opacity-40">
            ¿Sin tiempo?{' '}
            <a href="#cta" className="link-underline opacity-60 hover:opacity-100">
              Desbloquea acceso instantáneo
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
