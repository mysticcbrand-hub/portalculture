'use client'

import { useEffect, useState, useRef } from 'react'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
    }
    setIsMobile(checkMobile())

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden'
    
    // Add class to body for content fade-in coordination
    document.body.classList.add('intro-loading')

    // Only try to play video on desktop
    let playInterval: NodeJS.Timeout | undefined
    
    if (!checkMobile() && videoRef.current) {
      const tryPlayVideo = () => {
        const video = videoRef.current
        if (video && video.paused) {
          video.play().catch(() => {})
        }
      }

      // Start playing immediately and retry
      playInterval = setInterval(tryPlayVideo, 100)
    }

    // Hide intro after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (playInterval) clearInterval(playInterval)
      // Remove loading class to trigger content fade-in
      document.body.classList.remove('intro-loading')
      setTimeout(() => {
        document.body.style.overflow = 'unset'
      }, 800)
    }, 2500)

    return () => {
      clearTimeout(timer)
      if (playInterval) clearInterval(playInterval)
      document.body.style.overflow = 'unset'
      document.body.classList.remove('intro-loading')
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center intro-container">
      {/* Logo - Video on desktop, animated logo on mobile */}
      <div className="relative flex items-center justify-center logo-wrapper">
        {isMobile ? (
          // Mobile: Simple animated logo (instant load)
          <div className="mobile-logo">
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="140" cy="140" r="100" stroke="white" strokeWidth="2" opacity="0.3" className="pulse-ring" />
              <circle cx="140" cy="140" r="70" fill="white" opacity="0.9" className="pulse-core" />
              <text x="140" y="155" fontSize="48" fill="black" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">PC</text>
            </svg>
          </div>
        ) : (
          // Desktop: Full video
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="logo-video"
            loop
            onLoadedMetadata={(e) => e.currentTarget.play().catch(() => {})}
            onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
          >
            <source src="/logo-3d.mp4" type="video/mp4" />
          </video>
        )}
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
          width: clamp(200px, 50vw, 280px);
          height: clamp(200px, 50vw, 280px);
          object-fit: contain;
        }

        .mobile-logo {
          width: clamp(200px, 50vw, 280px);
          height: clamp(200px, 50vw, 280px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pulse-ring {
          animation: pulseRing 2s ease-in-out infinite;
          transform-origin: center;
        }

        .pulse-core {
          animation: pulseCore 2s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes pulseRing {
          0%, 100% {
            r: 100;
            opacity: 0.3;
          }
          50% {
            r: 110;
            opacity: 0.5;
          }
        }

        @keyframes pulseCore {
          0%, 100% {
            r: 70;
            opacity: 0.9;
          }
          50% {
            r: 75;
            opacity: 1;
          }
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
