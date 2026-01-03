'use client'

import { useEffect, useRef } from 'react'

interface CreativeHeroProps {
  onCtaClick?: () => void
}

export default function CreativeHero({ onCtaClick }: CreativeHeroProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const xMove = (clientX / innerWidth - 0.5) * 20
      const yMove = (clientY / innerHeight - 0.5) * 20
      
      textRef.current.style.transform = `translate(${xMove}px, ${yMove}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-6 py-24 md:py-32">
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        {/* Animated Mesh Gradient Blobs */}
        <div className="absolute inset-0">
          {/* Blob 1 - Burnt Orange/Brown */}
          <div 
            className="absolute w-[900px] h-[900px] rounded-full blur-[140px] opacity-25"
            style={{
              background: 'radial-gradient(circle, #c2410c 0%, transparent 70%)',
              top: '-10%',
              left: '15%',
              animation: 'meshFloat1 20s ease-in-out infinite',
            }}
          />
          
          {/* Blob 2 - Blue */}
          <div 
            className="absolute w-[750px] h-[750px] rounded-full blur-[120px] opacity-28"
            style={{
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
              bottom: '0%',
              right: '10%',
              animation: 'meshFloat2 18s ease-in-out infinite',
            }}
          />
          
          {/* Blob 3 - Muted Teal */}
          <div 
            className="absolute w-[650px] h-[650px] rounded-full blur-[100px] opacity-18"
            style={{
              background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)',
              top: '35%',
              right: '25%',
              animation: 'meshFloat3 22s ease-in-out infinite',
            }}
          />
          
          {/* Blob 4 - Deep Slate Blue */}
          <div 
            className="absolute w-[550px] h-[550px] rounded-full blur-[90px] opacity-20"
            style={{
              background: 'radial-gradient(circle, #1e40af 0%, transparent 70%)',
              bottom: '25%',
              left: '5%',
              animation: 'meshFloat4 24s ease-in-out infinite',
            }}
          />
        </div>
        
        {/* Depth overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        
        {/* Grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -100px) scale(1.15); }
          66% { transform: translate(-40px, 80px) scale(0.95); }
        }
        
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-80px, 90px) scale(1.1); }
          66% { transform: translate(50px, -60px) scale(0.92); }
        }
        
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(90px, 50px) scale(1.12); }
          66% { transform: translate(-60px, -80px) scale(0.9); }
        }
        
        @keyframes meshFloat4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, -90px) scale(1.18); }
          66% { transform: translate(70px, 60px) scale(0.88); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Label */}
        <div className="mb-12">
          <span className="font-mono text-xs tracking-wider text-white/30">
            / 01
          </span>
        </div>

        {/* Large Statement */}
        <div ref={textRef} className="transition-transform duration-300 ease-out mb-12 md:mb-16">
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-normal leading-[1.1] tracking-normal mb-6 md:mb-8" style={{ transform: 'scaleY(1.15)' }}>
            <span className="block text-white">Entra al</span>
            <span className="block text-white">Portal.</span>
          </h1>
        </div>

        {/* Subtext */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/70 font-light">
            La comunidad gratis n.º1 donde jóvenes ambiciosos como tú transforman su vida.
          </p>
        </div>

        {/* CTA & Stats - Centrados */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <a
            href="/acceso"
            className="group relative px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium overflow-hidden rounded-full
                     border border-white/20 hover:border-white/40
                     transition-all duration-500
                     hover:scale-[1.02] inline-block"
          >
            <span className="relative z-10">Solicitar Acceso</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-gray-200/10 to-white/8 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-full blur-xl bg-white/15 opacity-0 group-hover:opacity-60
                          transition-opacity duration-700 -z-10 scale-150" />
          </a>
          
          <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-mono text-white/40 tracking-wider">
            <span className="whitespace-nowrap">+15HR VALOR</span>
            <span>·</span>
            <span className="whitespace-nowrap">4.9/5 ★</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Bottom Center */}
      <a 
        href="#beneficios"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-white/30 tracking-wider group-hover:text-white/60 transition-colors duration-300">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 via-white/15 to-transparent group-hover:from-white/50 transition-all duration-300" />
        </div>
      </a>
    </section>
  )
}
