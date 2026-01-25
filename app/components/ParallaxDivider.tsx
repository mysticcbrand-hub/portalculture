'use client'

import { useEffect, useRef, useState } from 'react'

export default function ParallaxDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how far into view the element is
      const startPoint = windowHeight
      const endPoint = -rect.height
      const currentPosition = rect.top
      
      // Progress from 0 (just entering) to 1 (just leaving)
      const progress = 1 - (currentPosition - endPoint) / (startPoint - endPoint)
      const clampedProgress = Math.max(0, Math.min(1, progress))
      
      setScrollProgress(clampedProgress)
      setIsInView(rect.top < windowHeight && rect.bottom > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate transforms based on scroll
  const lineScale = 0.3 + scrollProgress * 0.7
  const lineOpacity = Math.sin(scrollProgress * Math.PI) * 0.8
  const rotateX = 60 - scrollProgress * 60
  const translateZ = -100 + scrollProgress * 100
  const glowIntensity = Math.sin(scrollProgress * Math.PI) * 30

  return (
    <div 
      ref={containerRef}
      className="relative h-[30vh] flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#030303]" />
      
      {/* 3D Line container */}
      <div 
        className="relative w-full flex items-center justify-center"
        style={{
          transform: `rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Main horizontal line */}
        <div 
          className="relative h-px w-full max-w-4xl mx-auto"
          style={{
            transform: `scaleX(${lineScale})`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Line gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,${lineOpacity * 0.3}) 20%,
                rgba(255,255,255,${lineOpacity}) 50%,
                rgba(255,255,255,${lineOpacity * 0.3}) 80%,
                transparent 100%
              )`,
            }}
          />
          
          {/* Glow effect */}
          <div 
            className="absolute inset-0 -top-4 -bottom-4"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,${lineOpacity * 0.1}) 30%,
                rgba(255,255,255,${lineOpacity * 0.2}) 50%,
                rgba(255,255,255,${lineOpacity * 0.1}) 70%,
                transparent 100%
              )`,
              filter: `blur(${glowIntensity}px)`,
            }}
          />
          
          {/* Center bright point */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,${lineOpacity}) 0%, transparent 70%)`,
              filter: `blur(${2 + glowIntensity * 0.2}px)`,
              transform: `scale(${1 + scrollProgress * 2})`,
            }}
          />
        </div>
      </div>

      {/* Ambient particles */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${20 + i * 15}%`,
                top: `${40 + Math.sin(i) * 20}%`,
                opacity: lineOpacity * 0.5,
                transform: `translateY(${(scrollProgress - 0.5) * 40 * (i % 2 === 0 ? 1 : -1)}px)`,
                filter: 'blur(1px)',
                transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
