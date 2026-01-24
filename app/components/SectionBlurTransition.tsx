'use client'

import { useEffect, useState } from 'react'

/**
 * SectionBlurTransition - Apple-style
 * Clean fade at top when scrolling, no halation effect
 */
export default function SectionBlurTransition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Start showing after hero
  const showEffect = scrollY > 400
  const opacity = Math.min(1, Math.max(0, (scrollY - 400) / 300))

  if (!showEffect) return null

  return (
    <>
      {/* Clean gradient fade - no blur, just darkening */}
      {/* Positioned below notch area on iPhone (env safe-area) */}
      <div 
        className="fixed left-0 right-0 pointer-events-none z-40"
        style={{
          top: 'env(safe-area-inset-top, 0px)',
          height: '120px',
          opacity: opacity * 0.6,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
          transition: 'opacity 0.3s ease-out',
        }}
      />
      
      {/* Subtle blur layer - very gentle */}
      <div 
        className="fixed left-0 right-0 pointer-events-none z-[39]"
        style={{
          top: 'env(safe-area-inset-top, 0px)',
          height: '80px',
          opacity: opacity * 0.5,
          backdropFilter: 'blur(4px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(4px) saturate(1.2)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          transition: 'opacity 0.3s ease-out',
        }}
      />
    </>
  )
}
