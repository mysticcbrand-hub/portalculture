'use client'

import { useEffect, useState } from 'react'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden'
    
    // Add class to body for content fade-in coordination
    document.body.classList.add('intro-loading')

    // Hide intro after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Remove loading class to trigger content fade-in
      document.body.classList.remove('intro-loading')
      setTimeout(() => {
        document.body.style.overflow = 'unset'
      }, 800)
    }, 2500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
      document.body.classList.remove('intro-loading')
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center intro-container">
      {/* Logo Container - Centered */}
      <div className="relative flex items-center justify-center">
        <img
          src="/favicon.ico"
          alt="Portal Culture"
          className="w-32 h-32 md:w-40 md:h-40 object-contain logo-animate"
        />
      </div>

      <style jsx>{`
        .intro-container {
          animation: fadeOut 0.8s cubic-bezier(0.23, 1, 0.32, 1) 2.5s forwards;
        }

        .logo-animate {
          opacity: 0;
          animation: logoFadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.2s forwards;
          filter: 
            drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))
            drop-shadow(0 0 30px rgba(255, 255, 255, 0.2))
            drop-shadow(0 0 45px rgba(255, 255, 255, 0.15))
            drop-shadow(0 0 60px rgba(255, 255, 255, 0.1))
            drop-shadow(0 0 80px rgba(255, 255, 255, 0.08))
            drop-shadow(0 0 100px rgba(255, 255, 255, 0.05))
            drop-shadow(0 0 120px rgba(255, 255, 255, 0.03));
        }

        @keyframes logoFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  )
}
