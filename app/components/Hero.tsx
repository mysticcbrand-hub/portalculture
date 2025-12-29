'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroProps {
  onCtaClick: () => void
}

export default function Hero({ onCtaClick }: HeroProps) {
  const sphereRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Parallax effect for 3D sphere - Ultra smooth
  useEffect(() => {
    let animationFrameId: number
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 50
      targetY = (e.clientY / window.innerHeight - 0.5) * 50
    }

    const animate = () => {
      if (!sphereRef.current) return
      
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1
      
      sphereRef.current.style.transform = `
        translate(-50%, -50%)
        translate3d(${currentX}px, ${currentY}px, 0)
      `
      
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Magnetic button effect - Apple smooth
  useEffect(() => {
    let animationFrameId: number
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current) return
      
      const rect = btnRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      
      // Magnetic radius: 100px
      if (distance < 100) {
        const strength = (100 - distance) / 100
        targetX = distanceX * strength * 0.4
        targetY = distanceY * strength * 0.4
      } else {
        targetX = 0
        targetY = 0
      }
    }

    const animate = () => {
      if (!btnRef.current) return
      
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15
      
      const scale = targetX !== 0 || targetY !== 0 ? 1.05 : 1
      btnRef.current.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`
      
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* 3D Chrome Sphere Background */}
      <div ref={sphereRef} className="hero-3d">
        <div className="sphere"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                      bg-white/5 border border-white/10 mb-8 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm opacity-80">Comunidad Activa</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 
                     chrome-gradient-text animate-fadeIn leading-tight">
          Entra al Portal.<br />Cambia tu vida
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-12 opacity-70 max-w-3xl mx-auto 
                    animate-fadeIn leading-relaxed">
          La comunidad exclusiva donde jóvenes ambiciosos se transforman. 
          Desafíos, formación premium, y conexiones que aceleran tu crecimiento.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn">
          <a
            ref={btnRef}
            href="https://app.portalculture.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-5 px-12 
                     font-semibold text-lg text-white magnetic-btn
                     rounded-2xl
                     transition-all duration-500 inline-block"
          >
            <span className="relative z-10">Solicitar Acceso Ahora</span>
          </a>
          
          <a
            href="#beneficios"
            className="py-5 px-12 rounded-2xl font-semibold text-lg
                     border border-white/20 hover:border-white/40
                     transition-all duration-300 hover:bg-white/5"
          >
            Ver Beneficios
          </a>
        </div>

        {/* Social Proof */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 opacity-60">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
            <span className="text-sm">+15Hr de Valor</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">Valoración 4.9/5</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 opacity-40" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
