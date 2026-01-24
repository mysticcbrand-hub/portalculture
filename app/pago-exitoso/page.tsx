'use client'

import { useEffect, useState } from 'react'

export default function PagoExitoso() {
  const [mounted, setMounted] = useState(false)
  const [showTick, setShowTick] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Staggered animations
    const tickTimer = setTimeout(() => setShowTick(true), 400)
    const contentTimer = setTimeout(() => setShowContent(true), 800)
    
    // Force default cursor on this page
    document.body.style.cursor = 'auto'
    
    return () => {
      clearTimeout(tickTimer)
      clearTimeout(contentTimer)
      document.body.style.cursor = ''
    }
  }, [])

  const handleContinue = () => {
    window.location.href = 'https://discord.gg/dgB4d5UzFr'
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6" style={{ cursor: 'auto' }}>
      {/* Subtle ambient glow */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        
        {/* Glassmorphic Euro Icon with Tick */}
        <div 
          className={`
            relative mb-10
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
        >
          {/* Outer glow ring */}
          <div 
            className={`
              absolute inset-0 rounded-full
              transition-all duration-1000 delay-200
              ${showTick ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
              transform: 'scale(1.8)',
              filter: 'blur(20px)',
            }}
          />
          
          {/* Main glassmorphic container */}
          <div 
            className="
              relative w-28 h-28 md:w-32 md:h-32
              rounded-full
              bg-gradient-to-b from-white/[0.12] to-white/[0.04]
              border border-white/[0.1]
              backdrop-blur-2xl
              shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]
              flex items-center justify-center
              overflow-hidden
            "
          >
            {/* Inner subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent" />
            
            {/* Euro symbol */}
            <span 
              className={`
                relative text-5xl md:text-6xl font-light text-white/90
                transition-all duration-700 ease-out
                ${showTick ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
              `}
            >
              €
            </span>
            
            {/* Animated checkmark - appears after euro fades */}
            <svg 
              className={`
                absolute w-14 h-14 md:w-16 md:h-16
                transition-all duration-700 ease-out
                ${showTick ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
              `}
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M5 13l4 4L19 7" 
                stroke="rgb(34, 197, 94)"
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={showTick ? 'animate-draw-check' : ''}
                style={{
                  strokeDasharray: 24,
                  strokeDashoffset: showTick ? 0 : 24,
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.65, 0, 0.35, 1) 0.2s',
                }}
              />
            </svg>
          </div>
          
          {/* Success ring animation */}
          <div 
            className={`
              absolute inset-0 rounded-full border-2 border-green-500/50
              transition-all duration-1000 ease-out
              ${showTick ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}
            `}
          />
        </div>
        
        {/* Text content */}
        <div 
          className={`
            transition-all duration-700 ease-out
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3 tracking-tight">
            Pago exitoso
          </h1>
          <p className="text-white/50 text-base md:text-lg mb-10 font-light">
            Bienvenido a Portal Culture
          </p>
        </div>
        
        {/* CTA Button */}
        <button
          onClick={handleContinue}
          className={`
            group relative px-8 py-4 md:px-10 md:py-4
            bg-white text-black
            text-base font-medium
            rounded-full
            overflow-hidden
            cursor-pointer
            transition-all duration-500 ease-out
            hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]
            active:scale-[0.98]
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            transitionDelay: showContent ? '100ms' : '0ms',
          }}
        >
          {/* Hover shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          
          <span className="relative z-10 flex items-center gap-2">
            Continuar
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
        
        {/* Subtle footer note */}
        <p 
          className={`
            mt-8 text-xs text-white/30 font-light
            transition-all duration-700 delay-300
            ${showContent ? 'opacity-100' : 'opacity-0'}
          `}
        >
          Tu acceso está listo
        </p>
      </div>
      
      <style jsx>{`
        @keyframes draw-check {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-draw-check {
          animation: draw-check 0.6s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards;
        }
      `}</style>
    </main>
  )
}
