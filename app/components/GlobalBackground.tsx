'use client'

import { useEffect, useState } from 'react'

export default function GlobalBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Normalize scroll for gradient shift (subtle movement)
  const scrollNorm = Math.min(1, scrollY / 5000)

  return (
    <div className="fixed inset-0 -z-10 bg-[#030303]">
      {/* Primary gradient - subtle purple/indigo, shifts with scroll */}
      <div 
        className="absolute inset-0 transition-all duration-[2000ms] ease-out"
        style={{
          background: `radial-gradient(
            ellipse 100% 80% at ${50 + scrollNorm * 10}% ${30 + scrollNorm * 20}%,
            rgba(99, 102, 241, 0.08) 0%,
            rgba(107, 100, 245, 0.06) 15%,
            rgba(120, 95, 248, 0.04) 30%,
            rgba(139, 92, 246, 0.025) 45%,
            rgba(150, 90, 245, 0.01) 60%,
            transparent 80%
          )`,
        }}
      />
      
      {/* Secondary gradient - warm accent at bottom */}
      <div 
        className="absolute inset-0 transition-all duration-[2000ms] ease-out"
        style={{
          background: `radial-gradient(
            ellipse 80% 50% at ${30 - scrollNorm * 15}% ${90 - scrollNorm * 10}%,
            rgba(168, 85, 247, 0.05) 0%,
            rgba(160, 88, 245, 0.03) 25%,
            rgba(150, 90, 242, 0.015) 50%,
            transparent 70%
          )`,
        }}
      />

      {/* Tertiary - subtle teal accent */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 60% 40% at 80% 60%,
            rgba(45, 212, 191, 0.03) 0%,
            rgba(45, 212, 191, 0.015) 30%,
            transparent 60%
          )`,
        }}
      />

      {/* High-quality noise dithering for anti-banding */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 70% 70% at 50% 50%,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.2) 100%
          )`,
        }}
      />
    </div>
  )
}
