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
      <div className="relative flex items-center justify-center logo-wrapper">
        <img
          src="/favicon.ico"
          alt="Portal Culture"
          className="w-32 h-32 md:w-40 md:h-40 object-contain logo-base"
        />
        <div className="absolute inset-0 gold-overlay mix-blend-overlay"></div>
      </div>

      <style jsx>{`
        .intro-container {
          animation: fadeOut 0.8s cubic-bezier(0.23, 1, 0.32, 1) 2.5s forwards;
        }

        .logo-wrapper {
          opacity: 0;
          animation: logoFadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.2s forwards;
        }

        .logo-base {
          filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.6));
          animation: glowTransition 2s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards;
        }

        .gold-overlay {
          opacity: 0;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
          pointer-events: none;
          animation: goldFadeIn 1.5s cubic-bezier(0.23, 1, 0.32, 1) 1s forwards;
          width: 100%;
          height: 100%;
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

        @keyframes goldFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.85;
          }
        }

        @keyframes glowTransition {
          0% {
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.6));
          }
          100% {
            filter: 
              drop-shadow(0 0 50px rgba(255, 215, 0, 0.9))
              drop-shadow(0 0 80px rgba(255, 165, 0, 0.6))
              drop-shadow(0 0 120px rgba(255, 215, 0, 0.3));
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
