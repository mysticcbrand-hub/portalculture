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
          animation: 
            logoFadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.2s forwards,
            colorTransition 2s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards;
          filter: 
            drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))
            brightness(1);
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

        @keyframes colorTransition {
          0% {
            filter: 
              drop-shadow(0 0 30px rgba(255, 255, 255, 0.6))
              brightness(1.2)
              hue-rotate(0deg)
              saturate(1);
          }
          50% {
            filter: 
              drop-shadow(0 0 50px rgba(255, 215, 0, 0.8))
              drop-shadow(0 0 80px rgba(255, 215, 0, 0.4))
              brightness(1.5)
              hue-rotate(45deg)
              saturate(1.5);
          }
          100% {
            filter: 
              drop-shadow(0 0 60px rgba(255, 215, 0, 0.7))
              drop-shadow(0 0 100px rgba(255, 215, 0, 0.3))
              brightness(1.3)
              hue-rotate(40deg)
              saturate(1.4);
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
