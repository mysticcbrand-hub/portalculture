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
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center intro-container">
      {/* Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="relative logo-container">
          <img
            src="/favicon.ico"
            alt="Portal Culture"
            className="w-20 h-20 object-contain logo-animate"
          />
        </div>

        {/* Portal Culture Text */}
        <h2 className="mt-8 text-xl md:text-2xl font-light tracking-[0.3em] chrome-gradient-text text-animate">
          PORTAL CULTURE
        </h2>
      </div>

      <style jsx>{`
        .intro-container {
          animation: fadeOut 0.8s cubic-bezier(0.23, 1, 0.32, 1) 2.5s forwards;
        }

        .logo-container {
          position: relative;
        }

        .logo-container::before {
          content: '';
          position: absolute;
          inset: -10px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(192, 192, 192, 0.1) 40%,
            transparent 70%
          );
          opacity: 0;
          animation: glowPulse 2s cubic-bezier(0.23, 1, 0.32, 1) 1s infinite;
        }

        .logo-animate {
          filter: drop-shadow(0 0 20px rgba(192, 192, 192, 0.3));
          animation: 
            logoFadeIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards,
            logoBreath 4s cubic-bezier(0.23, 1, 0.32, 1) 1s infinite;
          opacity: 0;
        }

        .text-animate {
          animation: textFadeIn 1s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards;
          opacity: 0;
        }

        @keyframes logoFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes textFadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logoBreath {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(192, 192, 192, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(192, 192, 192, 0.5));
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
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
