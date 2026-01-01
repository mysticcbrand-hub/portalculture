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
          // Mobile: Elegant text animation (instant load)
          <div className="mobile-logo-text">
            <div className="logo-text-line">PORTAL</div>
            <div className="logo-text-line delay">CULTURE</div>
            <div className="logo-underline"></div>
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

        .mobile-logo-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .logo-text-line {
          font-size: clamp(32px, 8vw, 48px);
          font-weight: 700;
          color: white;
          letter-spacing: 0.1em;
          opacity: 0;
          animation: fadeSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .logo-text-line.delay {
          animation-delay: 0.3s;
        }

        .logo-underline {
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, white, transparent);
          animation: expandLine 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
        }

        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandLine {
          0% {
            width: 0;
          }
          100% {
            width: 200px;
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
