'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScroll - Premium smooth scrolling like ciridae.com
 * Uses Lenis for buttery smooth scroll experience
 * Disabled on mobile for better native scroll performance
 */
export default function SmoothScroll() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile/touch device - disable Lenis for native scroll
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia('(hover: none)').matches || 
                           window.matchMedia('(pointer: coarse)').matches ||
                           window.innerWidth < 768
      setIsMobile(isTouchDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Don't initialize Lenis on mobile - native scroll is smoother
    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile)
    }

    // Initialize Lenis with correct configuration (desktop only)
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  return null
}
