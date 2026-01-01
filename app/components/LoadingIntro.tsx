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
      {/* Logo 3D Video - Centered */}
      <div className="relative flex items-center justify-center logo-wrapper">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="logo-video"
          onLoadedData={(e) => {
            console.log('Video loaded and playing')
            e.currentTarget.play()
          }}
          onError={(e) => console.error('Video error:', e)}
        >
          <source src="/logo-3d.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </div>

      <style jsx>{`
        .intro-container {
          animation: fadeOut 1s cubic-bezier(0.4, 0, 0.2, 1) 2.5s forwards;
        }

        .logo-wrapper {
          opacity: 0;
          animation: logoRise 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        }

        .logo-video {
          width: 280px;
          height: 280px;
          object-fit: contain;
        }

        @keyframes logoRise {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
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
