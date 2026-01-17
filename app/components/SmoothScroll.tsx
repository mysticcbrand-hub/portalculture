'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScroll - Premium smooth scrolling like ciridae.com
 * Uses Lenis for buttery smooth scroll experience
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with correct configuration
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
    }
  }, [])

  return null
}
