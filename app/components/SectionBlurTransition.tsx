'use client'

import { useEffect, useState } from 'react'

/**
 * SectionBlurTransition
 * Adds a subtle blur overlay at the top of sections that fades in/out based on scroll
 * Creates smooth transitions between sections like the hero blur effect
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

  // Only show after scrolling past the hero
  const showBlur = scrollY > 300
  const blurOpacity = Math.min(1, (scrollY - 300) / 400)

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-40 transition-opacity duration-500"
      style={{
        opacity: showBlur ? blurOpacity * 0.8 : 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)',
        backdropFilter: showBlur ? 'blur(8px)' : 'blur(0px)',
        WebkitBackdropFilter: showBlur ? 'blur(8px)' : 'blur(0px)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
      }}
    />
  )
}
