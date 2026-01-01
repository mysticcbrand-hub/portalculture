'use client'

import { useEffect, useState, useRef } from 'react'

export default function LoadingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden'
    
    // Add class to body for content fade-in coordination
    document.body.classList.add('intro-loading')

    // Aggressive video play attempts
    let playAttempts = 0
    const maxAttempts = 10
    
    const tryPlayVideo = () => {
      const video = videoRef.current
      if (!video) return
      
      playAttempts++
      
      video.play().catch(() => {
        // Keep trying if not reached max attempts
        if (playAttempts < maxAttempts) {
          setTimeout(tryPlayVideo, 100)
        }
      })
    }

    // Start playing immediately and retry aggressively
    const playInterval = setInterval(() => {
      if (videoRef.current && videoRef.current.paused) {
        tryPlayVideo()
      }
    }, 100)

    // Hide intro after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      clearInterval(playInterval)
      // Remove loading class to trigger content fade-in
      document.body.classList.remove('intro-loading')
      setTimeout(() => {
        document.body.style.overflow = 'unset'
      }, 800)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearInterval(playInterval)
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
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="metadata"
          className="logo-video"
          loop
          onLoadedMetadata={(e) => {
            e.currentTarget.play().catch(() => {})
          }}
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => {})
          }}
          onCanPlayThrough={(e) => {
            e.currentTarget.play().catch(() => {})
          }}
          onSuspend={(e) => {
            // Try to resume if suspended
            setTimeout(() => e.currentTarget.play().catch(() => {}), 50)
          }}
          onStalled={(e) => {
            // Try to resume if stalled
            e.currentTarget.load()
            setTimeout(() => e.currentTarget.play().catch(() => {}), 50)
          }}
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
          width: clamp(200px, 50vw, 280px);
          height: clamp(200px, 50vw, 280px);
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
